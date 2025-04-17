let toggel_right=document.getElementById("toggel_right");
let toggel_box=document.getElementById("toggel_box1");
let slider=document.getElementById('slider');
let toggel_left=document.getElementById('toggel_left');

toggel_right.addEventListener("click",()=>{
    slider.style.marginLeft='50%';
    toggel_right.style.display='none';
    toggel_left.style.display='flex';
});

toggel_left.addEventListener("click",()=>{
    slider.style.marginLeft='0';
    toggel_right.style.display='flex';
    toggel_left.style.display='none';
});





//........................................... email input verify...........................

let email1=document.getElementById('email1');
let signupbutt=document.getElementById('signupbutt');
let err1=document.getElementById("err1");
email1.addEventListener("input",async (event)=>{
    let data=await getjsondata();
    for(let d of data){
        if(event.target.value==d.email){
            signupbutt.innerHTML=`<button disabled style="margin-top: 2rem;">Sign Up</button>`;
            err1.style.display='flex';
            break;
        }
        else{
            signupbutt.innerHTML=`<button style="margin-top: 2rem;">Sign Up</button>`;
            err1.style.display='none';
        }
    }
})



// .............................email and pass verify ..........................
let email=document.getElementById('email');
let err=document.getElementById('err001');
let signinbutt=document.getElementById('signinbutt');
email.addEventListener("input",async (event)=>{
    let data=await getjsondata();
    for(let d of data){
        if(event.target.value==d.email.slice(0,event.target.value.length)){
            signinbutt.innerHTML=`<button>Sign In</button>`;
            err.style.display='none';
            break;
        }
        else{
            signinbutt.innerHTML=`<button disabled >Sign In</button>`;
            err.style.display='flex';
        }
    }
});

let word=document.getElementById('password');
let errr002=document.getElementById('errr002');
word.addEventListener("input",async (event)=>{
    let data=await getjsondata();
    for(let d of data){
        if(event.target.value==d.password.slice(0,event.target.value.length)){
            if(d.email==email.value){
                signinbutt.innerHTML=`<button>Sign In</button>`;
                errr002.style.display='none';
                break;
            }
            else{ 
                signinbutt.innerHTML=`<button disabled >Sign In</button>`;
                errr002.style.display='flex';
            }
        }
        else{
            signinbutt.innerHTML=`<button disabled >Sign In</button>`;
            errr002.style.display='flex';
        }
    }
});


async function getjsondata(){  
    return new Promise ((resolve,reject)=>{
        fetch('js/email.json')
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        });
    })
}