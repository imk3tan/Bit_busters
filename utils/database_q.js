const { createConnection } = require('mysql2');

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '21092003',
  database: 'mentorship',
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ' + error.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});


//   connection.query('use mentorship;', (err, results) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(results);
//   });

// let userdata=`create table users(
// id varchar(50) primary key,
// fullname varchar(100),
// profilename varchar(200) unique,
// email varchar(300) unique,
// password varchar(100),
// gender varchar(20),
// skillshave varchar(4000),
// skillwant varchar(4000),
// language varchar(2000) default 'Hindi,English',
// profileImage varchar(200) default null
// );`;

// let connection =`create table connections(
//   id varchar(100) primary key,
//   senderid varchar(100) not null,
//   reciverid varchar(100) not null,
//   validation varchar(100) default null
//   );`;
dataset=[
  "Python programming",
  "JavaScript",
  "HTML/CSS",
  "SQL",
  "Data analysis",
  "Machine learning",
  "Cloud computing",
  "Cybersecurity",
  "Mobile app development",
  "Web development",
  "Network configuration",
  "UI/UX design",
  "Graphic design",
  "Video editing",
  "Photo editing",
  "3D modeling",
  "AutoCAD",
  "Blockchain development",
  "IT support",
  "Software testing",
  "API integration",
  "Game development",
  "Robotics",
  "Embedded systems",
  "Excel advanced functions",
  "Public speaking",
  "Technical writing",
  "Copywriting",
  "Active listening",
  "Presentation design",
  "Podcast hosting",
  "Interviewing",
  "Debate",
  "Storytelling",
  "Business communication",
  "Blogging",
  "Persuasion",
  "Negotiation",
  "Email etiquette",
  "Multilingual fluency",
  "Drawing",
  "Painting",
  "Photography",
  "Singing",
  "Songwriting",
  "Playing guitar",
  "Playing piano",
  "Sculpting",
  "Creative writing",
  "Poetry",
  "Acting",
  "Dance choreography",
  "Calligraphy",
  "Fashion design",
  "Interior design",
  "Project management",
  "Time management",
  "Strategic planning",
  "Budgeting",
  "Conflict resolution",
  "Delegation",
  "Team building",
  "Risk management",
  "Agile methodologies",
  "Scrum management",
  "Hiring and recruiting",
  "Performance reviews",
  "Stakeholder management",
  "Resource allocation",
  "Operational efficiency",
  "Market research",
  "SEO",
  "SEM",
  "Social media marketing",
  "Branding",
  "Content marketing",
  "Sales funnel creation",
  "Email marketing",
  "Affiliate marketing",
  "Conversion rate optimization",
  "Product management",
  "Pricing strategy",
  "CRM software usage",
  "E-commerce",
  "Dropshipping",
  "Financial forecasting",
  "Accounting",
  "Bookkeeping",
  "Tax preparation",
  "Investing",
  "Stock trading",
  "Budget creation",
  "Cost analysis",
  "Financial auditing",
  "Loan management",
  "Curriculum design",
  "Lesson planning",
  "Classroom management",
  "Tutoring",
  "Learning management systems (LMS)",
  "Educational psychology",
  "Training and development",
  "Online course creation",
  "Instructional design",
  "Special education",
  "Laboratory techniques",
  "Research design",
  "Data collection",
  "Statistical analysis",
  "Technical documentation",
  "Hypothesis testing",
  "Scientific writing",
  "Literature reviews",
  "Environmental analysis",
  "Chemistry knowledge",
  "First aid",
  "CPR",
  "Nutrition planning",
  "Personal training",
  "Yoga instruction",
  "Mental health first aid",
  "Massage therapy",
  "Meditation coaching",
  "Physical therapy",
  "Sports coaching",
  "Baking",
  "Grilling",
  "Food presentation",
  "Menu planning",
  "Meal prepping",
  "Knife skills",
  "Mixology",
  "Nutrition balancing",
  "International cuisines",
  "Food safety",
  "Gardening",
  "Carpentry",
  "Plumbing",
  "Electrical wiring",
  "Home organization",
  "DIY crafts",
  "Sewing",
  "Knitting",
  "Interior decorating",
  "Home budgeting",
  "Empathy",
  "Conflict resolution",
  "Team collaboration",
  "Cultural awareness",
  "Leadership",
  "Emotional intelligence",
  "Patience",
  "Coaching",
  "Mediation",
  "Networking",
  "Goal setting",
  "Prioritization",
  "Scheduling",
  "Digital file management",
  "Workflow optimization",
  "Multitasking",
  "Attention to detail",
  "Time tracking",
  "Record keeping",
  "Calendar management",
  "Problem-solving",
  "Logical reasoning",
  "Root cause analysis",
  "SWOT analysis",
  "Competitive analysis",
  "Process improvement",
  "Decision making",
  "Trend analysis",
  "Forecast modeling",
  "Troubleshooting",
  "Legal research",
  "Document drafting",
  "Contract negotiation",
  "Compliance auditing",
  "Policy writing",
  "Notary services",
  "Filing systems",
  "Office administration",
  "Scheduling appointments",
  "Record archiving",
  "Adaptability",
  "Resilience",
  "Creativity",
  "Open-mindedness",
  "Self-motivation",
  "Work ethic",
  "Curiosity",
  "Initiative",
  "Integrity",
  "Stress management",
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese (Mandarin)",
  "Japanese",
  "Russian",
  "Portuguese",
  "Arabic",
  "ASL (Sign Language)",
  "Microsoft Excel",
  "Microsoft Word",
  "PowerPoint",
  "Google Workspace",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Final Cut Pro",
  "Canva",
  "QuickBooks",
  "Salesforce",
  "Troubleshooting",
  "Helpdesk support",
  "Customer onboarding",
  "Complaint resolution",
  "Upselling",
  "Live chat handling",
  "CRM management",
  "Loyalty program management",
  "Feedback collection",
  "Product demonstrations",
  "Goal tracking",
  "Journaling",
  "Mindfulness",
  "Habit building",
  "Self-reflection",
  "Speed reading",
  "Memory improvement",
  "Focus training",
  "Financial literacy",
  "Language learning",
  "Proposal writing",
  "Invoicing",
  "Portfolio building",
  "Client communication",
  "Freelance marketing",
  "Time estimation",
  "Business registration",
  "Branding yourself",
  "Pricing services",
  "Passive income strategy",
  "Trip planning",
  "Budget travel",
  "Navigation",
  "Cultural etiquette",
  "Backpacking",
  "Language basics for travel",
  "Travel blogging",
  "Photography on the go",
  "Travel budgeting",
  "Safety abroad",
  "Voiceover acting",
  "DJing",
  "Drone operation",
  "Podcast production",
  "Stand-up comedy",
  "Chess strategy",
  "Magic tricks",
  "Event planning",
  "Escape room design",
  "Survival skills",
  "Bartending",
  "Animal training",
  "Soap making",
  "Leather crafting",
  "Origami",
  "Call center operations",
  "Charity fundraising",
  "Modeling",
  "Cosplay design",
  "Thrifting",
  "Car maintenance",
  "Welding",
  "Locksmithing",
  "Tarot reading",
  "Beekeeping",
  "Foraging",
  "Archery",
  "Sailing",
  "Ice skating",
  "Rock climbing",
  "Fire safety",
  "Snowboarding",
  "Fly fishing",
  "Drone photography",
  "Podcast editing",
  "3D printing",
  "Coding for kids",
  "Smart home setup",
  "Resume writing",
  "Career coaching",
  "Language translation",
  "Typing speed (WPM)",
  "Proofreading",
  "Grant writing",
  "Virtual assistance",
  "none"
]

let skillh=()=>{
  let n=Math.floor(Math.random()*5)+1;
  let skillshave="";
  for(let i=0;i<n;i++){
    var item = dataset[Math.floor(Math.random()*dataset.length)];
    skillshave+=item+",";
  }
  return skillshave;
}

let skillw=()=>{
  let n=Math.floor(Math.random()*5)+1;
  let skillwant='';
  for(let i=0;i<n;i++){
    var item = dataset[Math.floor(Math.random()*dataset.length)];
    skillwant+=item+",";
  }
  return skillwant;
}

let id=()=>{
  let ids=0;
  for(let i=0;i<10;i++){
    let n=Math.floor(Math.random()*9);
    ids*=10;
    ids+=n;
  }
  return ids;
}
female_names = [
  "Abigail", "Bella", "Chloe", "Daisy", "Ella",
  "Fiona", "Grace", "Hannah", "Isla", "Jasmine",
  "Kylie", "Layla", "Mia", "Nora", "Olivia",
  "Peyton", "Quinn", "Ruby", "Sophia", "Taylor",
  "Uma", "Violet", "Willow", "Ximena", "Zoe"
];

male_names = [
  "Aaron", "Brandon", "Caleb", "Dylan", "Ethan",
  "Finn", "Gavin", "Hunter", "Ian", "Jack",
  "Kevin", "Logan", "Mason", "Noah", "Owen",
  "Parker", "Quentin", "Ryan", "Samuel", "Tyler",
  "Uriah", "Victor", "Wyatt", "Xander", "Zachary"
];

for(let i=0;i<50;i++){
  let n=Math.floor(Math.random()*2);
  if(n==0){
    var name = male_names[Math.floor(Math.random()*male_names.length)];
    var gender='M';
  }else{
    var name=female_names[Math.floor(Math.random())*female_names.length];
    var gender='F';
  }
  var username=name+'-'+Math.floor(Math.random()*1000);
  var email=username+'z'+Math.floor(Math.random()*100)+'@gmail.com';
  var password=name+'@'+Math.floor(Math.random()*100000);
  let q=`INSERT INTO users VALUES ('${id()}', '${name}', '${username}', '${email}', '${password}', '${gender}', '${skillh()}', '${skillw()}', 'English,Spanish', 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=');`;

  connection.query(q, (err, results) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(results);
      });
}
