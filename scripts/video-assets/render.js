/*
 * Video asset pack for Four Paws Inn vertical videos (1080x1920).
 *
 * For each video in content/video/<batch>/videos.json it writes:
 *   <id>-title.png   transparent overlay, hook in a cream card, upper third
 *   <id>-end.png     full frame end card with the call to action
 *   <id>-cover.png   full frame cover, text kept inside the 4:5 grid crop
 *   <id>.srt         captions timed to the script at a natural speaking pace
 *
 * Usage: NODE_PATH=$(npm root -g) node scripts/video-assets/render.js 2026-09-28
 * Brand rules: fourpawsinn/business-facts.md (Visual identity).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const W = 1080, H = 1920;
const C = { cream: "#FAF7F3", pink: "#E6A0A3", charcoal: "#353532" };
const fontDir = path.join(__dirname, "..", "morning-posts", "fonts");
const font = (f) => fs.readFileSync(path.join(fontDir, f)).toString("base64");
const FONTS = `@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:200 900;src:url(data:font/woff2;base64,${font("SourceSerif4-normal.woff2")})}
@font-face{font-family:"Source Serif 4";font-style:italic;font-weight:200 900;src:url(data:font/woff2;base64,${font("SourceSerif4-italic.woff2")})}
@font-face{font-family:"DM Sans";font-weight:100 1000;src:url(data:font/woff2;base64,${font("DMSans-normal.woff2")})}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
const PAW = `<svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="currentColor"><ellipse cx="32" cy="42" rx="14" ry="12"/><ellipse cx="14" cy="26" rx="6" ry="8"/><ellipse cx="26" cy="15" rx="6" ry="8"/><ellipse cx="38" cy="15" rx="6" ry="8"/><ellipse cx="50" cy="26" rx="6" ry="8"/></g></svg>`;

const base = (body, bg) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;background:${bg};overflow:hidden}
body{font-family:"DM Sans",sans-serif;color:${C.charcoal};position:relative}
h1{font-family:"Source Serif 4",serif;font-weight:800;letter-spacing:-.02em;line-height:1.04}
em{font-style:italic;background:linear-gradient(transparent 62%,${C.pink} 62%,${C.pink} 92%,transparent 92%);padding:0 .06em}
.brand{display:flex;align-items:center;gap:14px;font-size:34px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.brand i{width:40px;height:40px;display:block}
.kicker{display:inline-block;font-size:34px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:14px 26px;background:${C.pink};border-radius:999px}
.btn{display:inline-block;background:${C.charcoal};color:${C.cream};font-size:44px;font-weight:700;padding:30px 50px;border-radius:999px}
.blob{position:absolute;border-radius:50%;background:${C.pink}}
</style></head><body>${body}</body></html>`;

// Hook card sits in the upper third, clear of the Reels UI on the right and bottom.
const titleHtml = (v) => base(`<div style="position:absolute;top:300px;left:70px;right:170px;background:${C.cream};border-radius:40px;padding:48px 52px;box-shadow:0 12px 40px rgba(0,0,0,.18)">
<div class="brand" style="color:${C.charcoal};font-size:28px;margin-bottom:26px"><i style="color:${C.pink}">${PAW}</i>Four Paws Inn</div>
<h1 style="font-size:92px">${rich(v.hook)}</h1></div>`, "transparent");

const endHtml = (v) => base(`<div class="blob" style="width:420px;height:420px;right:-140px;top:-140px"></div>
<div class="blob" style="width:220px;height:220px;left:-80px;bottom:420px;opacity:.5"></div>
<div style="position:absolute;top:120px;left:90px" class="brand"><i style="color:${C.pink}">${PAW}</i>Four Paws Inn</div>
<div style="position:absolute;top:560px;left:90px;right:140px">
<h1 style="font-size:120px">${rich(v.endTitle)}</h1>
<p style="font-size:52px;line-height:1.3;margin-top:48px;color:rgba(53,53,50,.8)">${esc(v.endSub)}</p>
<div class="btn" style="margin-top:70px">Send us your dates →</div></div>
<div style="position:absolute;bottom:360px;left:90px;font-size:40px;font-weight:500;color:rgba(53,53,50,.8)">@fourpawsinnpetboarding · fourpawsinn.co</div>`, C.cream);

// Instagram grid shows the middle 1080x1350, so all text lives between y 285 and 1635.
const coverHtml = (v) => base(`<div class="blob" style="width:360px;height:360px;right:-120px;top:230px"></div>
<div style="position:absolute;top:380px;left:90px" class="brand"><i style="color:${C.pink}">${PAW}</i>Four Paws Inn</div>
<div style="position:absolute;top:720px;left:90px;right:120px"><div class="kicker">${esc(v.coverKicker)}</div>
<h1 style="font-size:124px;margin-top:44px">${rich(v.coverTitle)}</h1></div>`, C.cream);

function srt(script) {
  // One caption per short sentence. Long sentences split into balanced chunks of 6 words or fewer.
  const sentences = script.match(/[^.?!]+[.?!]+/g).map((x) => x.trim().split(/\s+/));
  const chunks = [];
  for (const words of sentences) {
    const n = Math.ceil(words.length / 6);
    const size = Math.ceil(words.length / n);
    for (let i = 0; i < words.length; i += size) chunks.push(words.slice(i, i + size));
  }
  const ts = (s) => { const ms = Math.round(s * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; };
  let t = 0.3;
  return chunks.map((c, i) => { const d = Math.max(1.1, c.length / 2.6); const s = `${i + 1}\n${ts(t)} --> ${ts(t + d)}\n${c.join(" ")}\n`; t += d; return s; }).join("\n");
}

(async () => {
  const batch = process.argv[2];
  const dir = path.join(__dirname, "..", "..", "content", "video", batch);
  const plan = JSON.parse(fs.readFileSync(path.join(dir, "videos.json"), "utf8"));
  const out = path.join(dir, "assets");
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  for (const v of plan.videos) {
    for (const [kind, html, transparent] of [["title", titleHtml(v), true], ["end", endHtml(v), false], ["cover", coverHtml(v), false]]) {
      await p.setContent(html, { waitUntil: "load" });
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, `${v.id}-${kind}.png`), omitBackground: transparent });
    }
    fs.writeFileSync(path.join(out, `${v.id}.srt`), srt(v.script));
  }
  await b.close();
  console.log(fs.readdirSync(out).join("\n"));
})();
