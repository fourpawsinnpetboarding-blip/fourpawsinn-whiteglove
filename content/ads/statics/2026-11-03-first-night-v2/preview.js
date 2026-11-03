const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const F=(n)=>fs.readFileSync(path.join(__dirname,"../../../../scripts/morning-posts/fonts",n)).toString("base64");
const logo=fs.readFileSync(path.join(__dirname,"../../../brand/logo-icon-square-1080.png")).toString("base64");
const A=`Would you leave your kid with strangers for a week, in a house they've never seen? No. So don't do it to your dog.<br><br>Holiday spots at Four Paws Inn go to dogs who have stayed with us before. New dogs start with one night.<br><br>One night is all it takes. They meet us, sleep here, and get picked up. They learn you always come back. The next time, they walk in like it's their second home. That's what our regulars do.<br><br>One night starts at $60. Your dog is worth it.<br><br>Send us a date for their first night. Holiday spots are going fast.`;
const B=`Call our bluff. Give us one night.<br><br>One on one time first. A slow intro to the group when they're ready. A video update so you can watch them settle in.<br><br>Going away for the holidays? This is the night that matters most. Holiday spots go to dogs who already know us.<br><br>From $60. Send us a date.`;
const items=[["png/AD60-STRANGERS-FOR-A-WEEK.png",A],["png/AD61-NOT-YOUR-KID.png",A],["png/AD62-ITS-60.png",A],["png/AD63-NO-NEW-DOGS-ON-HOLIDAYS.png",A],["png/AD64-CALL-OUR-BLUFF.png",B],["png/AD65-DID-NOT-WANT-TO-LEAVE.png",B]];
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
<div class="hd">Your dog\'s first night, before the holidays.</div>
<div class="tx"><b>fourpawsinn</b> ${txt}</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1000}});
for(const [img,txt] of items){await p.setContent(html(img,txt),{waitUntil:"load"});await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,"previews",path.basename(img).replace(".png","-feed.png")),fullPage:true});}
await b.close();console.log("ok")})();
