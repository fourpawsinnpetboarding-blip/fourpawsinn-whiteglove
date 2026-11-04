// Builds contact-sheet.png from the FINAL png/ files so the sheet always matches the ads.
const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const d=path.join(__dirname,"png");const f=fs.readdirSync(d).filter(x=>x.endsWith(".png")).sort();
const h=`<body style="margin:0;background:#ddd;display:flex;flex-wrap:wrap;gap:12px;padding:12px;font:700 18px sans-serif">${f.map(x=>`<div><img style="width:420px;display:block" src="data:image/png;base64,${fs.readFileSync(path.join(d,x)).toString("base64")}"><div style="padding:4px 0">${x.replace(".png","")}</div></div>`).join("")}</body>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1788,height:1000}});await p.setContent(h);await p.screenshot({path:path.join(__dirname,"contact-sheet.png"),fullPage:true});await b.close();console.log("contact ok")})();
