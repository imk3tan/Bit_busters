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
let changeset_1=document.getElementById('changeset_1');
let change=document.getElementById('change');
let forMySkills=document.getElementById('forMySkills');
let forFindMatch=document.getElementById("forFindMatch");
let forMentors=document.getElementById("forMentors");
let forSetting=document.getElementById('forSetting');

window.addEventListener('load',()=>{
    mentors_butt.style.background="white";
});

changeset_1.addEventListener("click",()=>{
    change.style.background='';
    changeset_1.style.background='white';
    my_skills_butt.style.background="";
    find_match_butt.style.background="";
    mentors_butt.style.background="";
    forMySkills.style.display='none';
    forSetting.style.display='flex';
    forFindMatch.style.display='none';
    forMentors.style.display='none';
});
change.addEventListener("click",()=>{
    change.style.background='white';
    changeset_1.style.background='';
    my_skills_butt.style.background="";
    find_match_butt.style.background="";
    mentors_butt.style.background="";
    forMySkills.style.display='none';
    forSetting.style.display='flex';
    forFindMatch.style.display='none';
    forMentors.style.display='none';
});
my_skills_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="white";
    find_match_butt.style.background="";
    change.style.background='';
    changeset_1.style.background='';
    mentors_butt.style.background="";
    forMySkills.style.display='flex';
    forSetting.style.display='none';
    forFindMatch.style.display='none';
    forMentors.style.display='none';
});
find_match_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="";
    find_match_butt.style.background=" white";
    change.style.background='';
    changeset_1.style.background='';
    mentors_butt.style.background="";
    forMySkills.style.display='none';
    forFindMatch.style.display='flex';
    forSetting.style.display='none';
    forMentors.style.display='none';
});
mentors_butt.addEventListener("click",()=>{
    my_skills_butt.style.background="";
    find_match_butt.style.background="";
    mentors_butt.style.background=" white";
    change.style.background='';
    changeset_1.style.background='';
    forMySkills.style.display='none';
    forFindMatch.style.display='none';
    forSetting.style.display='none';
    forMentors.style.display='flex';
});

// ......................... serch .............................


let takeskillwant2=document.getElementById('takeskillwant2');
let content=document.getElementById('content').children;

takeskillwant2.addEventListener("input",(event)=>{
    for(let i of content){
        let n=event.target.value.length;
        let charr=i.children[2].textContent.split(',');
        for (let j of charr){
            if(j.slice(0,n)==event.target.value){
                i.style.display='flex';
                i.classList.add('flexclass');
                break;
            }
            else if(i.children[1].textContent.slice(0,n)==event.target.value){
                i.style.display='flex';
                break;
            }
            else{
                i.style.display='none';
            }
            
        }
    }
})





