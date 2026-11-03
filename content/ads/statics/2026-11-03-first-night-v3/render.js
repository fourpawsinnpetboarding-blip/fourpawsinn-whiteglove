const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const ph=(n)=>fs.readFileSync(path.join(__dirname,"photos",n)).toString("base64");
const ads=[
 {id:"AD61-NOT-WITH-YOUR-KID",a:"NOT WITH",b:"YOUR KID.",sub:"You'd never leave them for a week with people they've never met. So let your dog meet us first.",c:"TRY 1 NIGHT",d:"FIRST.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"couch-husky.jpg",pos:"30% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60},
 {id:"AD66-FIRST-SLEEPOVER",a:"FIRST",b:"SLEEPOVER.",sub:"Your kid had one. Give your dog one too, before the holiday trip.",c:"1 NIGHT.",d:"FROM $60.",tag:"BEFORE THE HOLIDAYS  •  MIRAMAR",photo:"puppy-bed.jpg",pos:"30% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60},
 {id:"AD67-MEET-THE-SITTER",a:"MEET THE",b:"SITTER FIRST.",sub:"You would for your kid. Do it for your dog: one night before you travel.",c:"THEN TRAVEL",d:"CALM.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"kneel-indoor.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60},
 {id:"AD68-FIRST-NIGHT-ON-CHRISTMAS",a:"FIRST NIGHT",b:"ON CHRISTMAS?",sub:"New place, new faces, and you're gone for days. Do it the right way.",c:"1 NIGHT NOW.",d:"FROM $60.",tag:"BEFORE THE HOLIDAYS  •  MIRAMAR",photo:"hug-white-dog.jpg",pos:"35% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60},
 {id:"AD69-NEW-DOG-NOT-ON-HOLIDAYS",a:"NEW DOG?",b:"NOT ON HOLIDAYS.",sub:"Holiday spots go to dogs who have stayed with us before.",c:"BOOK 1 NIGHT",d:"NOW.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"yard-lab.jpg",pos:"78% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60},
 {id:"AD70-A-WEEK-ON-DAY-ONE",a:"A WEEK AWAY",b:"ON DAY ONE?",sub:"You'd never do that to your kid. Start your dog with one night.",c:"START WITH",d:"1 NIGHT.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"lab-pool.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST NIGHT",bs:60}
];
const html=(x)=>`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${F("DMSans-normal.woff2")}) format("woff2");font-weight:100 1000;}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#FAF7F3;font-family:"DM Sans";color:#353532;position:relative;overflow:hidden}
.left{position:absolute;left:56px;top:120px;width:560px}
.big{font-size:132px;font-family:"Inter Display","Inter";font-weight:900;line-height:.86;letter-spacing:-.015em;word-spacing:.08em;transform:scaleX(.84);transform-origin:left;white-space:nowrap;text-transform:uppercase}
.hl{display:inline-block;position:relative;z-index:1}
.hl:before{content:"";position:absolute;left:-18px;right:-14px;top:42%;bottom:-6px;background:#E6A0A3;z-index:-1}
.sub{max-width:510px;text-wrap:balance;font-weight:800;font-size:50px;line-height:1.08;margin:34px 0 40px;letter-spacing:-.01em}
.mid{font-size:104px}
.tag{display:inline-block;margin-top:26px;font-weight:800;font-size:27px;letter-spacing:.06em;background:#fff;padding:10px 18px;border-radius:999px;border:3px solid #353532}
.rule{width:80px;height:4px;background:#353532;margin:48px 0 18px}
.by{font-size:26px;font-weight:600}.by b{font-weight:800;font-size:30px}
.ph{position:absolute;right:44px;top:120px;width:430px;height:800px;border:8px solid #353532;border-radius:48px;box-shadow:16px 16px 0 #353532;overflow:hidden;background:#ddd}
.ph img{width:100%;height:100%;object-fit:cover;object-position:78% 50%}
.btn{position:absolute;left:46px;right:46px;bottom:110px;height:150px;background:#E6A0A3;border:8px solid #353532;border-radius:999px;box-shadow:12px 12px 0 #353532;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:74px;letter-spacing:.04em;color:#353532}
</style></head><body>
<div class="left">
<div class="big" style="${x.s1?`font-size:${x.s1}px`:""}"><span>${x.a}</span></div><div class="big" style="${x.s1?`font-size:${x.s1}px`:""}"><span class="hl">${x.b}</span></div>
<div class="sub">${x.sub}</div>
<div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}"><span>${x.c}</span></div><div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}"><span class="hl">${x.d}</span></div>
<div class="tag">${x.tag}</div>
<div class="rule"></div><div class="by">A family run home by<br><b>Four Paws Inn</b></div>
</div>
<div class="ph"><img src="data:image/jpeg;base64,${ph(x.photo)}" style="object-position:${x.pos||"50% 50%"}"></div>
<div class="btn" style="font-size:${x.bs||74}px">${x.btn||"SEND YOUR DATES"}</div>
</body></html>`;
(async()=>{fs.mkdirSync(path.join(__dirname,"png"),{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const x of ads){await p.setContent(html(x),{waitUntil:"load"});await p.waitForTimeout(200);await p.evaluate(()=>{document.querySelectorAll(".big").forEach(e=>{let f=parseFloat(getComputedStyle(e).fontSize);const span=e.querySelector("span");while((span.getBoundingClientRect().right>548)&&f>40){f-=2;e.style.fontSize=f+"px";}});});await p.screenshot({path:path.join(__dirname,"png",x.id+".png")});}
await b.close();console.log("ok")})();
