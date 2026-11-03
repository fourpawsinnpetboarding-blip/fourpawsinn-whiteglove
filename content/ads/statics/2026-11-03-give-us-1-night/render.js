const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const photo=fs.readFileSync(path.join(__dirname,"photos/yard-lab.jpg")).toString("base64");
const ads=[
 {id:"AD52-GIVE-US-1-NIGHT",a:"GIVE US",b:"1 NIGHT.",sub:"For dogs who have<br>never boarded.",c:"SEE THEM",d:"SETTLE IN.",tag:"FIRST OVERNIGHT  •  MIRAMAR, FL"},
 {id:"AD53-NO-KENNELS-EVER",a:"NO KENNELS.",b:"EVER.",s1:94,sub:"Your dog stays in<br>a real home.",c:"230+ GOOGLE",d:"REVIEWS.",s2:86,tag:"4.9 STARS  •  MIRAMAR, FL"},
 {id:"AD54-STAY-IN-YOUR-CAR",a:"STAY IN",b:"YOUR CAR.",s1:112,sub:"Drop off takes<br>seconds.",c:"WE COME",d:"TO YOU.",tag:"CURBSIDE  •  7 DAYS A WEEK"}
];
const html=(x)=>`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${F("DMSans-normal.woff2")}) format("woff2");font-weight:100 1000;}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#FAF7F3;font-family:"DM Sans";color:#353532;position:relative;overflow:hidden}
.left{position:absolute;left:56px;top:120px;width:560px}
.big{font-size:132px;font-family:"Inter Display","Inter";font-weight:900;line-height:.86;letter-spacing:-.015em;word-spacing:.08em;transform:scaleX(.84);transform-origin:left;white-space:nowrap;text-transform:uppercase}
.hl{display:inline-block;position:relative;z-index:1}
.hl:before{content:"";position:absolute;left:-18px;right:-14px;top:42%;bottom:-6px;background:#E6A0A3;z-index:-1}
.sub{font-weight:800;font-size:50px;line-height:1.08;margin:34px 0 40px;letter-spacing:-.01em}
.mid{font-size:104px}
.tag{display:inline-block;margin-top:26px;font-weight:800;font-size:27px;letter-spacing:.06em;background:#fff;padding:10px 18px;border-radius:999px;border:3px solid #353532}
.rule{width:80px;height:4px;background:#353532;margin:48px 0 18px}
.by{font-size:26px;font-weight:600}.by b{font-weight:800;font-size:30px}
.ph{position:absolute;right:44px;top:120px;width:430px;height:800px;border:8px solid #353532;border-radius:48px;box-shadow:16px 16px 0 #353532;overflow:hidden;background:#ddd}
.ph img{width:100%;height:100%;object-fit:cover;object-position:78% 50%}
.btn{position:absolute;left:46px;right:46px;bottom:110px;height:150px;background:#E6A0A3;border:8px solid #353532;border-radius:999px;box-shadow:12px 12px 0 #353532;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:74px;letter-spacing:.04em;color:#353532}
</style></head><body>
<div class="left">
<div class="big" style="${x.s1?`font-size:${x.s1}px`:""}">${x.a}</div><div class="big" style="${x.s1?`font-size:${x.s1}px`:""}"><span class="hl">${x.b}</span></div>
<div class="sub">${x.sub}</div>
<div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}">${x.c}</div><div class="big mid" style="${x.s2?`font-size:${x.s2}px`:""}"><span class="hl">${x.d}</span></div>
<div class="tag">${x.tag}</div>
<div class="rule"></div><div class="by">A family run home by<br><b>Four Paws Inn</b></div>
</div>
<div class="ph"><img src="data:image/jpeg;base64,${photo}"></div>
<div class="btn">SEND YOUR DATES</div>
</body></html>`;
(async()=>{fs.mkdirSync(path.join(__dirname,"png"),{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const x of ads){await p.setContent(html(x),{waitUntil:"load"});await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,"png",x.id+".png")});}
await b.close();console.log("ok")})();
