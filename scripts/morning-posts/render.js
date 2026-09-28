/*
 * Morning post renderer for Four Paws Inn.
 *
 * Reads content/morning/<week>/week.json and renders every slide to a
 * 1080x1350 PNG with headless Chromium. Output lands in
 * content/morning/<week>/png/<day>-<nn>.png, plus a contact sheet
 * (contact-sheet.png) so the whole week can be reviewed in one image.
 *
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/morning-posts/render.js 2026-09-28
 *
 * Slide types: hook, point, stat, quote, wall, cta. Wrap a word in
 * *asterisks* inside a title to set it in the accent serif.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const W = 1080;
const H = 1350;

const THEMES = {
  dark: { bg: "#15342B", fg: "#F3ECDF", accent: "#F4A63A", soft: "rgba(243,236,223,0.72)", card: "rgba(243,236,223,0.07)", line: "rgba(243,236,223,0.18)" },
  cream: { bg: "#F3ECDF", fg: "#15342B", accent: "#C8691C", soft: "rgba(21,52,43,0.72)", card: "#FFFFFF", line: "rgba(21,52,43,0.16)" },
  gold: { bg: "#F4A63A", fg: "#15342B", accent: "#15342B", soft: "rgba(21,52,43,0.8)", card: "rgba(255,255,255,0.35)", line: "rgba(21,52,43,0.22)" },
};

// Fonts are embedded as base64 so rendering never depends on network access.
const fontData = (f) => fs.readFileSync(path.join(__dirname, "fonts", f)).toString("base64");
const FONT_CSS = [
  ["Bricolage Grotesque", "normal", "200 800", "BricolageGrotesque-normal.woff2"],
  ["Instrument Serif", "normal", "400", "InstrumentSerif-normal.woff2"],
  ["Instrument Serif", "italic", "400", "InstrumentSerif-italic.woff2"],
]
  .map(([fam, style, weight, file]) => `@font-face{font-family:"${fam}";font-style:${style};font-weight:${weight};src:url(data:font/woff2;base64,${fontData(file)}) format("woff2")}`)
  .join("");

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, "<br>");

const PAW = `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true"><g fill="currentColor"><ellipse cx="32" cy="42" rx="14" ry="12"/><ellipse cx="14" cy="26" rx="6" ry="8"/><ellipse cx="26" cy="15" rx="6" ry="8"/><ellipse cx="38" cy="15" rx="6" ry="8"/><ellipse cx="50" cy="26" rx="6" ry="8"/></g></svg>`;

function frame(t, inner, { counter, source, pawClass = "" }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px}
body{background:${t.bg};color:${t.fg};font-family:"Bricolage Grotesque",sans-serif;position:relative;overflow:hidden}
.grain{position:absolute;inset:0;opacity:.07;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.top{position:absolute;top:72px;left:88px;right:88px;display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
.top .brand{display:flex;align-items:center;gap:14px}
.top .brand i{display:block;width:30px;height:30px;color:${t.accent}}
.top .count{font-weight:500;letter-spacing:.12em;color:${t.soft}}
.bottom{position:absolute;bottom:64px;left:88px;right:88px;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:${t.soft};border-top:2px solid ${t.line};padding-top:22px}
.stage{position:absolute;top:170px;bottom:150px;left:88px;right:88px;display:flex;flex-direction:column;justify-content:center}
em{font-family:"Instrument Serif",serif;font-style:italic;font-weight:400;color:${t.accent};letter-spacing:-.01em}
.kicker{display:inline-block;align-self:flex-start;font-size:24px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:12px 22px;border:2px solid ${t.accent};color:${t.accent};border-radius:999px;margin-bottom:44px}
.h1{font-size:118px;line-height:.98;font-weight:800;letter-spacing:-.035em}
.h1 em{font-size:1.08em}
.sub{font-size:46px;line-height:1.25;margin-top:44px;color:${t.soft};font-weight:500;max-width:880px}
.num{font-family:"Instrument Serif",serif;font-style:italic;font-size:250px;line-height:.8;color:${t.accent};margin-bottom:36px}
.h2{font-size:92px;line-height:1.02;font-weight:800;letter-spacing:-.03em}
.body{font-size:48px;line-height:1.3;margin-top:40px;font-weight:500;color:${t.soft};max-width:900px}
.stat{font-size:210px;line-height:.9;font-weight:800;letter-spacing:-.05em;color:${t.accent}}
.statlabel{font-size:64px;line-height:1.08;font-weight:700;letter-spacing:-.02em;margin-top:26px}
.vs{margin-top:56px;display:flex;align-items:baseline;gap:26px;padding:34px 40px;background:${t.card};border-radius:28px;font-size:42px;line-height:1.25;font-weight:500}
.vs b{font-size:74px;font-weight:800;letter-spacing:-.03em;white-space:nowrap}
.qmark{font-family:"Instrument Serif",serif;font-size:360px;line-height:.55;color:${t.accent};height:150px}
.qhead{font-size:78px;line-height:1.02;font-weight:800;letter-spacing:-.03em;margin-bottom:90px}
.qtext{font-family:"Instrument Serif",serif;font-size:62px;line-height:1.16}
.stars{color:${t.accent};font-size:44px;letter-spacing:.14em;margin-top:48px}
.who{font-size:36px;font-weight:700;margin-top:14px}
.who span{font-weight:500;color:${t.soft}}
.wall{display:flex;flex-direction:column;gap:26px;margin-top:40px}
.wcard{background:${t.card};border-radius:28px;padding:34px 40px;border:2px solid ${t.line}}
.wcard p{font-family:"Instrument Serif",serif;font-size:42px;line-height:1.18}
.wcard div{margin-top:16px;font-size:26px;font-weight:700;letter-spacing:.06em}
.wcard div b{color:${t.accent};letter-spacing:.1em;margin-right:10px}
.wtitle{font-size:84px;line-height:1;font-weight:800;letter-spacing:-.03em}
.btn{margin-top:60px;align-self:flex-start;display:flex;align-items:center;gap:20px;background:${t.fg};color:${t.bg};font-size:40px;font-weight:700;padding:30px 46px;border-radius:999px}
.fine{margin-top:34px;font-size:34px;font-weight:500;color:${t.soft}}
.bigpaw{position:absolute;right:-120px;bottom:120px;width:520px;height:520px;color:${t.fg};opacity:.06;transform:rotate(-18deg)}
.bigpaw.hide{display:none}
</style></head><body>
<div class="grain"></div>
<div class="bigpaw ${pawClass}">${PAW}</div>
<div class="top"><div class="brand"><i>${PAW}</i>Four Paws Inn</div><div class="count">${esc(counter || "Miramar, FL")}</div></div>
<div class="stage">${inner}</div>
<div class="bottom"><div>@fourpawsinnpetboarding</div><div>${source ? "Source: " + esc(source) : "fourpawsinn.co"}</div></div>
</body></html>`;
}

function slideHtml(s, counter) {
  const t = THEMES[s.theme] || THEMES.dark;
  let inner = "";
  switch (s.type) {
    case "hook":
      inner = `${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ""}<div class="h1">${rich(s.title)}</div>${s.sub ? `<div class="sub">${rich(s.sub)}</div>` : ""}`;
      break;
    case "point":
      inner = `${s.num ? `<div class="num">${esc(s.num)}</div>` : ""}<div class="h2">${rich(s.title)}</div>${s.body ? `<div class="body">${rich(s.body)}</div>` : ""}`;
      break;
    case "stat":
      inner = `${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ""}<div class="stat">${esc(s.stat)}</div><div class="statlabel">${rich(s.label)}</div>${s.vs ? `<div class="vs"><b>${esc(s.vs.value)}</b><span>${rich(s.vs.label)}</span></div>` : ""}${s.sub ? `<div class="sub">${rich(s.sub)}</div>` : ""}`;
      break;
    case "quote":
      inner = `${s.head ? `<div class="qhead">${rich(s.head)}</div>` : ""}<div class="qmark">&ldquo;</div><div class="qtext">${rich(s.quote)}</div><div class="stars">★★★★★</div><div class="who">${esc(s.name)} <span>· Google review</span></div>`;
      break;
    case "wall":
      inner = `<div class="wtitle">${rich(s.title)}</div><div class="wall">${s.quotes
        .map((q) => `<div class="wcard"><p>&ldquo;${esc(q.text)}&rdquo;</p><div><b>★★★★★</b>${esc(q.name)}</div></div>`)
        .join("")}</div>`;
      break;
    case "cta":
      inner = `${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ""}<div class="h1">${rich(s.title)}</div>${s.body ? `<div class="sub">${rich(s.body)}</div>` : ""}<div class="btn">${esc(s.button || "Send us your dates")} →</div>${s.fine ? `<div class="fine">${rich(s.fine)}</div>` : ""}`;
      break;
    default:
      throw new Error(`Unknown slide type: ${s.type}`);
  }
  return frame(t, inner, { counter, source: s.source, pawClass: ["wall", "quote", "stat"].includes(s.type) ? "hide" : "" });
}

async function main() {
  const week = process.argv[2];
  if (!week) throw new Error("Pass the week folder name, e.g. 2026-09-28");
  const dir = path.join(__dirname, "..", "..", "content", "morning", week);
  const plan = JSON.parse(fs.readFileSync(path.join(dir, "week.json"), "utf8"));
  const out = path.join(dir, "png");
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const rendered = [];
  for (const post of plan.posts) {
    const n = post.slides.length;
    post.files = [];
    for (let i = 0; i < n; i++) {
      const counter = n > 1 ? `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}` : null;
      await page.setContent(slideHtml(post.slides[i], counter), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(out, `${post.day.toLowerCase()}-${String(i + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      post.files.push(path.relative(dir, file));
      rendered.push({ day: post.day, file });
    }
  }

  // Contact sheet: one row per post, scaled thumbnails.
  const thumbs = plan.posts
    .map(
      (p) => `<div class="row"><div class="lbl"><b>${esc(p.day)}</b><br>${esc(p.date)}<br>${esc(p.format)}</div>${p.files
        .map((f) => `<img src="data:image/png;base64,${fs.readFileSync(path.join(dir, f)).toString("base64")}">`)
        .join("")}</div>`
    )
    .join("");
  await page.setViewportSize({ width: 1900, height: 400 });
  await page.setContent(
    `<html><body style="margin:0;background:#111;font-family:sans-serif;color:#eee;padding:20px">${thumbs}<style>.row{display:flex;gap:12px;align-items:center;margin-bottom:16px}.lbl{width:150px;font-size:18px;line-height:1.4}img{width:216px;height:270px;border-radius:6px}</style></body></html>`,
    { waitUntil: "load" }
  );
  await page.screenshot({ path: path.join(dir, "contact-sheet.png"), fullPage: true });
  await browser.close();

  fs.writeFileSync(path.join(dir, "week.json"), JSON.stringify(plan, null, 2) + "\n");
  console.log(`Rendered ${rendered.length} slides for ${plan.posts.length} posts into ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
