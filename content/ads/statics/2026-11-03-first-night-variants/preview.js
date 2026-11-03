const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const logo=fs.readFileSync(path.join(__dirname,"../../../brand/logo-icon-square-1080.png")).toString("base64");
const A=`Never boarded your dog before? Don't make the holiday trip their first night away.<br><br>Book one night with us now. Your dog gets to know our home and our team, and we get to know your dog. Then your trip feels easy for both of you.<br><br>Your dog stays in a real home in Miramar. No kennels. One video update each day.<br><br>Send us a date for their first night.`;
const B=`The best time for your dog's first night away is before your trip.<br><br>One night now. A calm holiday later. A family run home in Miramar with 230+ Google reviews.<br><br>Send us a date for their first night.`;
const items=[["../2026-11-03-give-us-1-night/png/AD52-GIVE-US-1-NIGHT.png",A],["png/AD55-DONT-WAIT-FOR-THE-TRIP.png",A],["png/AD56-1-NIGHT-NOW.png",B],["png/AD57-FIRST-TIME-BOARDING.png",A],["png/AD58-TRY-US-THIS-WEEK.png",B],["png/AD59-HOLIDAYS-FILL-UP.png",A]];
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
<div class="hd">Book their first night now.</div>
<div class="tx"><b>fourpawsinn</b> ${txt}</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1000}});
for(const [img,txt] of items){await p.setContent(html(img,txt),{waitUntil:"load"});await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,"previews",path.basename(img).replace(".png","-feed.png")),fullPage:true});}
await b.close();console.log("ok")})();
