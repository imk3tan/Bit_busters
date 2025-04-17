// express setup
const { name } = require('ejs');
const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let pn='SkillSwap';
// Import the Nodemailer library
const nodemailer = require('nodemailer');

// files and folders setups
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,'/public')));

// import database connection fro database.js folder
const connection = require('./utils/donnect_db.js');
// const getData = require('./utils/function.js');
const { configDotenv } = require('dotenv');
const { rejects } = require('assert');


// Create a transporter object
const transporter = nodemailer.createTransport({
    host:process.env.EMAILHOST,
    port: 465,
    secure: true, // use SSL
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    }
  });

// website port setup
app.listen(port,()=>{
    console.log("You are online");
    console.log("App is listing on port: ",port);
});

//.................................... Use express-session middleware......................
app.use(session({
  secret: process.env.SECRETKEY, // Secret key used to sign the session ID cookie
  resave: false, // Whether to save the session data if no changes are made
  saveUninitialized: false // Whether to save uninitialized sessions
}));


// ......................... multer setup....................
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // save to uploads/ folder
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + path.extname(file.originalname);
      cb(null, uniqueName); // unique file name
    }
  });
  
const upload = multer({ storage: storage });
  
  // Create uploads folder if it doesn't exist (optional safety)
if (!fs.existsSync('public/uploads')) {
    fs.mkdirSync('public/uploads');
}


// ..................... index page of the site ................
app.get('/',async (req,res)=>{
    let checkE=await getDoubleData('email','password','users');
    let checkp=await getSingleData('profilename','users');
    let flag1=writeemail(checkE);
    let flag2=writeprofilename(checkp);
    res.render("layouts/index.ejs",{pn});
});

//....................... for the login and register varification ......................
app.post('/check',async (req,res)=>{
    let email=req.body.email;
    let passw=req.body.password;
    req.session.email=email;
    if (passw==null){
        let otp= generate6DigitOTP();
        req.session.otp=otp;
        let mess=messageCreate(process.env.EMAIL,email,'Email Verification From Mentorship',`Your One time password is - ${req.session.otp}`);
        sendMessage(mess);
        // read field text file 
        fs.readFile('./utils/data_in/skills_list.json',async function(err, data) { 
            if (err) throw err; 
            let field = JSON.parse(data);
            res.render("layouts/sign_up.ejs",{email,field,pn});
        });
    }
    else{
        let data=await getData('users','email',req.session.email);
        if(data.length > 0){
            if(data[0].password==passw){
                let url=`/user/${data[0].id}`;
                res.redirect(url);
            }
            else{
                res.send("May you entered wrong password");
            }
        }
        else{
            res.send("May You entered wrong email.");
        }
        
    }
});

// ..................... checking data and storing data into the database.................
app.post('/check1',async (req,res)=>{
    let id=await uuidv4();
    req.session.userid=id;
    if(parseInt(req.session.otp)==parseInt(req.body.otp)){
        let flag=await savedata(req.body,req.session.email,id);
        if(flag==true){
            res.redirect('/');
        }
        else{
            res.send(err);
        }
    }
    else{
        res.send("Wrong Otp Entered.");
    }
});

// ...................... user page router ..................................
app.get('/user/:id',async(req,res)=>{
    let userdata=await getData('users','id',req.params.id);
    fs.readFile('./utils/data_in/skills_list.json',async function(err, data) { 
        if (err) throw err; 
        let field = JSON.parse(data);
        let profilename=await getSingleData('profilename','users');
        let skill=userdata[0].skillshave.split(',');
        let wants=userdata[0].skillwant.split(',');
        let allmentor=await getSingleData('*',"users");
        let connec=await getData('connections','reciverid',req.params.id);
        let sugess=getsugesstion(wants,allmentor);
        let dataToShow=await setconn(connec);
        res.render('layouts/user.ejs',{userdata:userdata[0],field,profilename,allmentor,skill,wants,sugess,pn,dataToShow});
    });
});
async function getData(table,key,value){
    let q=`select * from ${table} where ${key}="${value}";`;
    return new Promise((resolve,rejects)=>{
        connection.query(q,async(err,results)=>{
            if(err){
                console.log(err);
                rejects(err);
            }
            if(results){
                resolve(results);
            }
        });
    })
    
}
// ......................... User Setting page router .............................
app.get('/user/set/:id',async(req,res)=>{
    let userdata=await getData('users','id',req.params.id);
    let profilename=await getSingleData('profilename','users');
    let skill=userdata[0].skillshave.split(',');
    let wants=userdata[0].skillwant.split(',');
    let allmentor=await getSingleData('*',"users");
    res.render('layouts/setting.ejs',{userdata:userdata[0],profilename,allmentor,skill,wants,pn});
});

// ......................... Save image in folder ...........................
app.post('/upload/:id/img', upload.single('userimg'),async(req, res)=>{
    let flag=await updatevalue('users','profileimage',`/uploads/${req.file.filename}`,'id',req.params.id);
    if(flag==true){
        let url=`/user/set/${req.params.id}`;
        res.redirect(url);
    }
    else{
        res.send('something is wrong');
    }
 });

// ......................... for the connection ...........
app.get('/connect/:sid/:rid',async(req,res)=>{
    console.log(req.params.sid);
    console.log(req.params.rid);
    let flag=await setConne(req.params.sid,req.params.rid);
    if(flag==true){
        let url=`/user/${req.params.sid}`;
        res.redirect(url);
    }
    
});

















 app.use(async (err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(err);
    next(err);
   });

//    ........................ set the connect data ..........................
const setconn=async(conn)=>{
    let data=[];
    // console.log(conn);
    let allmentor=await getSingleData('*',"users");
    for(let i of conn){
        for(let j of allmentor){
            if(i.senderid==j.id){
                data.push(j);
            }
        }
    }
    return data;
}
//    ......................... functions for add connections......................
const setConne=async(sid,rid)=>{
    let q=`insert into connections values("${uuidv4()}","${sid}","${rid}","p");`;
    return new Promise((resolve,rejects)=>{
        connection.query(q,async(err,result)=>{
            if(err){
                rejects(err);
            }
            if(result){
                resolve(true);
            }
            
        });
    }); 
}
// ............................ function for the save data to the database...............

const savedata=async(data,email,id)=>{
    return new Promise((resolve,rejects)=>{
        let q=`insert into users values("${id}","${data.name}","${data.profilename}","${email}","${data.password}","${data.gender}","${data.AllSkillHave}","${data.AllSkillWant}","${data.language}","https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=");`;
        connection.query(q,async(err,result)=>{
            if(err){
                rejects(err);
            }
            if(result){
                resolve(true);
            }
        });
    });
}

// ..............................function for update value in database .....................
const updatevalue=async(table,col,val,key='id',value)=>{
    return new Promise ((resolve,rejects)=>{
        let q=`UPDATE ${table} SET ${col}="${val}" WHERE ${key}='${value}';`;
        connection.query(q,async(err,result)=>{
            if(err){
                rejects(err);
            }
            if(result){
                resolve(true);
            }
        })
    })
}

// ..............................function for get single column from database......
const getSingleData=async(col,table)=>{
    return new Promise((resolve,rejects)=>{
        let q=`select ${col} from ${table} ;`;
        connection.query(q,async(err,result)=>{
            if(err){
                rejects(err);
            }
            if(result){
                resolve(result);
            }
        });
    });
}

// ..............................function for get double column from database......
const getDoubleData=async(col1,col2,table)=>{
    return new Promise((resolve,rejects)=>{
        let q=`select ${col1},${col2} from ${table} ;`;
        connection.query(q,async(err,result)=>{
            if(err){
                rejects(err);
            }
            if(result){
                resolve(result);
            }
        });
    });
}
// ..............................function for write in file ......
const writeemail=async(data)=>{
    return new Promise ((resolve,rejects)=>{
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFile("public/js/email.json", jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file', err);
                rejects(err);
            } else {
                console.log('Data written to file');
                resolve(true);
            }
        });
    });
}
const writeprofilename=async(data)=>{
    return new Promise ((resolve,rejects)=>{
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFile("public/js/username.json", jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file', err);
                rejects(err);
            } else {
                console.log('Data written to file');
                resolve(true);
            }
        });
    });
}

// .................................Email message creator ....................
// Configure the mailoptions object
function messageCreate(from,to,subject,text){
    const mailOptions = {
        from:from,
        to: to,
        subject:subject,
        text: text
      };
    
      return(mailOptions);
}
// Send the email
let sendMessage=async (mail)=>{
    return new Promise((resolve,rejects)=>{
        transporter.sendMail(mail, function(error, info){
            if (error) {
              console.log('Error:', error);
              rejects(error);
            } else {
              console.log('Email sent:', info.response);
              resolve(true);
            }
          });
    });
};

// .....................................function for genrate one time password ..................
function generate6DigitOTP() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // .................................. function for get suggestions .............................

  let getsugesstion=(skills,alldata)=>{
    let sugested=[];
    for(let d of alldata){
        let check=d.skillshave.split(',');
        for(let c of check){
            for(let s of skills){
                if(c==s || c=='Python' && s=='Python programming'){
                    sugested.push(d);
                }
                
            }

        }

    }
    return sugested;
  }























// // ................................  chatting router code


// const http = require("http");
// const socketio = require("socket.io");
// const { default: Filter } =import("bad-words");
// const {
//   generateMessage,
//   generateLocationMessage,
// } = require("./utils/messages");

// const {
//   addUser,
//   removeUser,
//   getUser,
//   getUsersInRoom,
// } = require("./utils/user");

// // initialize http server
// const server = http.createServer(app);
// // initialize socketio
// const io = socketio(server);

// // define paths for express config
// const publicDirectoryPath = path.join(__dirname, "../public");

// // setup static directory to serve
// app.use(express.static(publicDirectoryPath));

// // let count = 0;

// // server (emit) -> client (receive) - countUpdated
// // client (emit) -> server (receive) - increment

// // let's listen for new connections
// io.on("connection", (socket) => {
//   console.log("New WebSocket connection");

//   // socket.emit("message", generateMessage("Welcome!"));
//   // socket.broadcast.emit("message", "A new user has joined!");

//   socket.on("join", ({ username, room }, callback) => {
//     // specifically emit event according to room name eg: no one can check whats going on in another room
//     const { error, user } = addUser({ id: socket.id, username, room });

//     if (error) {
//       return callback(error);
//     }

//     socket.join(room);
//     socket.emit("message", generateMessage("Admin", "Welcome!"));
//     socket.broadcast
//       .to(user.room)
//       .emit("message", generateMessage("Admin", `${user.username} has joined`));
//     io.to(user.room).emit("roomData", {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });
//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const filter = new Filter();

//     const user = getUser(socket.id);

//     if (!user) {
//       return callback("You are not authenticated");
//     }

//     // if (filter.isProfane(message)) {
//     //   return callback("Profanity is not allowed!");
//     // }

//     io.to(user.room).emit("message", generateMessage(user.username, message));
//     callback();
//   });

//   //   socket.emit("countUpdated", count);

//   //   socket.on("increment", () => {
//   //     count++;
//   // notify only the current connection
//   // socket.emit("countUpdated", count);

//   // notify all connections
//   //     io.emit("countUpdated", count);
//   //   });

//   socket.on("disconnect", () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         generateMessage("Admin", `${user.username} has left`)
//       );
//       io.to(user.room).emit("roomData", {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });
//     }
//   });

//   socket.on("sendLocation", (coords, callback) => {
//     const user = getUser(socket.id);

//     if (!user) {
//       return callback("You are not authenticated");
//     }

//     io.to(user.room).emit(
//       "locationMessage",
//       generateLocationMessage(
//         user.username,
//         `https://google.com/maps?q=${coords.Latitude},${coords.Longitude}`
//       )
//     );
//     callback();
//   });
// });



// app.get('/chat',(req,res)=>{
//   res.render('layouts/chatConfig.ejs');
// })
// app.post('/user/chat/page/on',(req,res)=>{
//     res.render('layouts/chat.ejs',{username:req.session.username,room:req.session.room});
//   })
