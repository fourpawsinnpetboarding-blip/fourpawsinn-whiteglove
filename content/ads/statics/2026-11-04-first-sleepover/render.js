const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const logo=fs.readFileSync(path.join(__dirname,'photos/logo.png')).toString('base64');
const ph=(n)=>fs.readFileSync(path.join(__dirname,"photos",n)).toString("base64");
const ads=[
 {id:"AD73-FIRST-SLEEPOVER",a:"FIRST",b:"SLEEPOVER.",sub:"Give your dog a first sleepover before the holiday rush.",c:"1 NIGHT.",d:"FROM $60.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"h03-lab.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD74-MEET-US-FIRST",a:"MEET US",b:"FIRST.",sub:"You'd want your kid to meet a new sitter first. It helps your dog too.",c:"TRY 1 NIGHT",d:"FIRST.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"couch-husky.jpg",pos:"30% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD75-MEET-THE-SITTER",a:"MEET THE",b:"SITTER FIRST.",sub:"One night with us before you travel, so the big trip feels easier.",c:"THEN TRAVEL",d:"CALM.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"lab-pool.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD76-BEAT-THE-HOLIDAY-RUSH",a:"BEAT THE",b:"HOLIDAY RUSH.",sub:"Give your dog a first sleepover now, while the calendar is calm.",c:"BOOK",d:"1 NIGHT.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"hug-white-dog.jpg",pos:"35% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD77-NEW-TO-US",a:"NEW",b:"TO US?",sub:"Start with one night. Your dog gets to know our home and our team.",c:"WE'D LOVE",d:"TO MEET THEM.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"yard-lab.jpg",pos:"78% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD78-START-SMALL",a:"A WEEK AWAY",b:"ON DAY ONE?",sub:"Start with one night first. It can make the big trip easier.",c:"START",d:"SMALL.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"kneel-indoor.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD79-SECOND-HOME",a:"THEIR",b:"SECOND HOME.",sub:"One night now, so your dog already knows us when the holidays come.",c:"COME",d:"SAY HI.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"h08.jpg",pos:"50% 50%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56},
 {id:"AD80-PRACTICE-NIGHT",a:"PRACTICE",b:"NIGHT.",sub:"New dogs start with one night before the holidays. A fun first stay.",c:"FROM",d:"$60.",tag:"FIRST NIGHT FROM $60  •  MIRAMAR",photo:"amanda-poster.jpg",pos:"50% 60%",btn:"BOOK THEIR FIRST SLEEPOVER",bs:56}
];
const html=(x)=>`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${F("DMSans-normal.woff2")}) format("woff2");font-weight:100 1000;}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#FAF7F3;font-family:"DM Sans";color:#353532;position:relative;overflow:hidden}
.left{position:absolute;left:56px;top:140px;width:560px}
.big{font-size:132px;font-family:"Inter Display","Inter";font-weight:900;line-height:.86;letter-spacing:-.015em;word-spacing:.08em;transform:scaleX(.84);transform-origin:left;white-space:nowrap;text-transform:uppercase}
.hl{display:inline-block;position:relative;z-index:1}
.hl:before{content:"";position:absolute;left:-18px;right:-14px;top:42%;bottom:-6px;background:#E6A0A3;z-index:-1}
.sub{max-width:510px;text-wrap:balance;font-weight:800;font-size:50px;line-height:1.08;margin:34px 0 40px;letter-spacing:-.01em}
.mid{font-size:104px}
.tag{display:inline-block;margin-top:26px;font-weight:800;font-size:27px;letter-spacing:.06em;background:#fff;padding:10px 18px;border-radius:999px;border:3px solid #353532}
.rule{width:80px;height:4px;background:#353532;margin:48px 0 18px}
.by{font-size:24px;font-weight:600;display:flex;flex-direction:column;gap:4px}.by b{font-weight:800;font-size:30px}.stars{font-size:34px;letter-spacing:.06em;color:#353532}.stars b{font-size:34px}
.ph{position:absolute;right:44px;top:190px;width:430px;height:780px;border:8px solid #353532;border-radius:48px;box-shadow:16px 16px 0 #353532;overflow:hidden;background:#ddd}
.ph img{width:100%;height:100%;object-fit:cover;object-position:78% 50%}
.brand{position:absolute;left:52px;top:40px;display:flex;align-items:center;gap:14px;font-weight:900;font-size:30px;letter-spacing:.14em}.brand img{width:62px;height:62px;border-radius:50%;border:3px solid #353532;background:#fff}
.badge{position:absolute;right:30px;top:58px;width:458px;background:#fff;border:6px solid #353532;border-radius:22px;box-shadow:10px 10px 0 #353532;padding:14px 10px 12px;text-align:center;z-index:5}.badge .st{font-size:46px;font-weight:900;color:#353532;letter-spacing:.04em;line-height:1}.badge .st b{font-size:52px}.badge .rv{font-weight:900;font-size:30px;letter-spacing:.06em;margin-top:6px}
.proofx{position:absolute;left:46px;right:46px;bottom:232px;text-align:center;font-weight:700;font-size:25px;letter-spacing:.03em;padding:14px 0;border-top:3px solid #353532;border-bottom:3px solid #353532;white-space:nowrap}.proof b{font-weight:900}.proof .st{color:#353532;letter-spacing:.04em;font-size:28px}
.btn{position:absolute;left:46px;right:46px;bottom:64px;height:146px;background:#E6A0A3;border:8px solid #353532;border-radius:999px;box-shadow:12px 12px 0 #353532;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:74px;letter-spacing:.04em;color:#353532}
</style></head><body>
<div class="brand"><img src="data:image/png;base64,${logo}"><span>FOUR PAWS INN</span></div>
<div class="left">
<div class="big" style="${x.s1?`font-size:${x.s1}px`:""}"><span>${x.a}</span></div><div class="big" style="${x.s1?`font-size:${x.s1}px`:""}"><span class="hl">${x.b}</span></div>
<div class="sub">${x.sub}</div>
<div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}"><span>${x.c}</span></div><div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}"><span class="hl">${x.d}</span></div>
<div class="tag">${x.tag}</div>

</div>
<div class="ph"><img src="data:image/jpeg;base64,${ph(x.photo)}" style="object-position:${x.pos||"50% 50%"}"></div>
<div class="badge"><div class="st">★★★★★</div><div class="rv">230+ GOOGLE REVIEWS</div></div>
<div class="btn" style="font-size:${x.bs||74}px">${x.btn||"SEND YOUR DATES"}</div>
</body></html>`;
(async()=>{fs.mkdirSync(path.join(__dirname,"png"),{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const x of ads){await p.setContent(html(x),{waitUntil:"load"});await p.waitForTimeout(200);await p.evaluate(()=>{document.querySelectorAll(".big").forEach(e=>{let f=parseFloat(getComputedStyle(e).fontSize);const span=e.querySelector("span");while((span.getBoundingClientRect().right>548)&&f>40){f-=2;e.style.fontSize=f+"px";}});});await p.screenshot({path:path.join(__dirname,"png",x.id+".png")});}
await b.close();console.log("ok")})();
