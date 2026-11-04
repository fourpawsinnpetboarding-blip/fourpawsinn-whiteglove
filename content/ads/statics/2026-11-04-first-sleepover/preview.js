const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const logo=fs.readFileSync(path.join(__dirname,"../../../brand/logo-icon-square-1080.png")).toString("base64");
const A=`Give your dog a first sleepover before the holiday rush.<br><br>One night with us is an easy way to start. Your dog meets Amanda and our team, explores the house and yard, plays, and sleeps over. You get a video update so you can see how it's going.<br><br>Holiday weeks fill up fast, so now is the time. When you travel, your dog has already been here.<br><br>Four Paws Inn is a family run home in Miramar with 230+ Google reviews.<br><br>One night is $60 for dogs under 50 lb with pick up before 10 AM. Other rates apply for bigger dogs, puppies and later pick ups.<br><br>A first night does not reserve a holiday spot. A deposit holds your dates.<br><br>Send us a date for their first sleepover.`;
const B=`New to Four Paws Inn? Start with one night.<br><br>Your dog gets to know Amanda, our home and our team, and you get to see how they do. Then the big holiday trip feels easier.<br><br>Holiday weeks fill up fast, so now is a good time to try us.<br><br>Four Paws Inn is a family run home in Miramar with 230+ Google reviews.<br><br>One night is $60 for dogs under 50 lb with pick up before 10 AM. Other rates apply for bigger dogs, puppies and later pick ups.<br><br>A first night does not reserve a holiday spot. A deposit holds your dates.<br><br>Send us a date.`;
const items=[["png/AD73-FIRST-SLEEPOVER.png",A],["png/AD74-MEET-US-FIRST.png",A],["png/AD75-MEET-THE-SITTER.png",A],["png/AD76-BEAT-THE-HOLIDAY-RUSH.png",A],["png/AD77-NEW-TO-US.png",B],["png/AD78-START-SMALL.png",B],["png/AD79-SECOND-HOME.png",A],["png/AD80-PRACTICE-NIGHT.png",B]];
const html=(img,txt)=>`<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${F("DMSans-normal.woff2")}) format("woff2");font-weight:100 1000;}
*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;background:#fff;font-family:"Inter","DM Sans";color:#111}
.top{display:flex;align-items:center;gap:22px;padding:26px 30px}.av{width:76px;height:76px;border-radius:50%;border:2px solid #ddd;overflow:hidden}.av img{width:100%}
.nm{font-weight:700;font-size:32px}.sp{font-size:26px;color:#555}.dots{margin-left:auto;font-size:40px}
.img img{width:1080px;display:block}
.cta{display:flex;justify-content:space-between;align-items:center;background:#E6A0A3;padding:28px 34px;font-weight:700;font-size:32px;color:#353532}
.icons{padding:22px 30px;font-size:40px;letter-spacing:22px}
.hd{padding:0 30px 10px;font-weight:800;font-size:32px}
.tx{padding:0 30px 40px;font-size:30px;line-height:1.38}.tx b{font-weight:700}
</style></head><body><div class="top"><div class="av"><img src="data:image/png;base64,${logo}"></div><div><div class="nm">fourpawsinn</div><div class="sp">Sponsored</div></div><div class="dots">⋯</div></div>
<div class="img"><img src="data:image/png;base64,${fs.readFileSync(path.join(__dirname,img)).toString("base64")}"></div>
<div class="cta"><span>Get quote</span><span>›</span></div>
<div class="icons">♡ ◯ ➤</div>
<div class="hd">Give your dog a first sleepover. 230+ Google reviews.</div>
<div class="tx"><b>fourpawsinn</b> ${txt}</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1000}});
for(const [img,txt] of items){await p.setContent(html(img,txt),{waitUntil:"load"});await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,"previews",path.basename(img).replace(".png","-feed.png")),fullPage:true});}
await b.close();console.log("ok")})();
