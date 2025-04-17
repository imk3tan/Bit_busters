let mess=document.getElementById('mess');
    let messagebox=document.getElementById('messagebox');
    let closemess=document.getElementById('closemess');
    mess.addEventListener("click",()=>{
        messagebox.style.display="flex";
    });
    closemess.addEventListener("click",()=>{
        messagebox.style.display='none';
    });
    let mess1=document.getElementById('mess1');
    let messagebox1=document.getElementById('messagebox1');
    let closemess1=document.getElementById('closemess1');
    mess1.addEventListener("click",()=>{
        messagebox1.style.display="flex";
    });
    closemess1.addEventListener("click",()=>{
        messagebox1.style.display='none';
    });
    let mess2=document.getElementById('mess2');
    let messagebox2=document.getElementById('messagebox2');
    let closemess2=document.getElementById('closemess2');
    mess2.addEventListener("click",()=>{
        messagebox2.style.display="flex";
    });
    closemess2.addEventListener("click",()=>{
        messagebox2.style.display='none';
    });

let my_skills_butt=document.getElementById("my_skills_butt");
let find_match_butt=document.getElementById("find_match_butt");
let mentors_butt=document.getElementById("mentors_butt");
let message_but=document.getElementById('message_but');
let forMySkills=document.getElementById('forMySkills');
let forFindMatch=document.getElementById("forFindMatch");
let forMentors=document.getElementById("forMentors");
let forMessage33=document.getElementById('forMessage33');

window.addEventListener('load',()=>{
    mentors_butt.style.background="white";
});
my_skills_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="white";
    find_match_butt.style.background="";
    mentors_butt.style.background="";
    message_but.style.background="";
    forMessage33.style.display='none';
    forMySkills.style.display='flex';
    forFindMatch.style.display='none';
    forMentors.style.display='none';
});
find_match_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="";
    find_match_butt.style.background=" white";
    mentors_butt.style.background="";
    message_but.style.background="";
    forMessage33.style.display='none';
    forMySkills.style.display='none';
    forFindMatch.style.display='flex';
    forMentors.style.display='none';
});
mentors_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="";
    find_match_butt.style.background="";
    mentors_butt.style.background=" white";
    message_but.style.background="";
    forMessage33.style.display='none';
    forMySkills.style.display='none';
    forFindMatch.style.display='none';
    forMentors.style.display='flex';
});
message_but.addEventListener("click",()=>{
    my_skills_butt.style.background="";
    find_match_butt.style.background="";
    mentors_butt.style.background="";
    message_but.style.background=" white";
    forMessage33.style.display='flex';
    forMySkills.style.display='none';
    forFindMatch.style.display='none';
    forMentors.style.display='none';
});

// ......................... serch .............................






