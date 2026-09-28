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
 * Slide types: hook, point, stat, quote, wall, cta. Themes: cream, pink,
 * charcoal. Optional per slide "layout": a, b or c to vary the accent shapes.
 * Wrap a word in *asterisks* to italicize it with a highlight bar.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const W = 1080;
const H = 1350;

// Four Paws Inn brand palette (approved 2026-09-28): cream #FAF7F3, pink #E6A0A3, charcoal #353532.
// Pink is for shapes, highlights and accents. Text is always charcoal or cream so it stays readable.
const BRAND = { cream: "#FAF7F3", pink: "#E6A0A3", charcoal: "#353532" };
const THEMES = {
  cream: { bg: BRAND.cream, fg: BRAND.charcoal, accent: BRAND.pink, ink: BRAND.charcoal, mark: BRAND.pink, soft: "rgba(53,53,50,0.78)", card: "#FFFFFF", line: "rgba(53,53,50,0.14)", btnBg: BRAND.charcoal, btnFg: BRAND.cream, kickBg: BRAND.pink, kickFg: BRAND.charcoal, shape: BRAND.pink },
  pink: { bg: BRAND.pink, fg: BRAND.charcoal, accent: BRAND.charcoal, ink: BRAND.charcoal, mark: BRAND.cream, soft: "rgba(53,53,50,0.85)", card: "rgba(250,247,243,0.6)", line: "rgba(53,53,50,0.2)", btnBg: BRAND.charcoal, btnFg: BRAND.cream, kickBg: BRAND.cream, kickFg: BRAND.charcoal, shape: BRAND.cream },
  charcoal: { bg: BRAND.charcoal, fg: BRAND.cream, accent: BRAND.pink, ink: BRAND.pink, mark: "transparent", soft: "rgba(250,247,243,0.78)", card: "rgba(250,247,243,0.07)", line: "rgba(250,247,243,0.18)", btnBg: BRAND.pink, btnFg: BRAND.charcoal, kickBg: BRAND.pink, kickFg: BRAND.charcoal, shape: BRAND.pink },
};
// Older week files used these names.
THEMES.dark = THEMES.charcoal;
THEMES.gold = THEMES.pink;

// Fonts are embedded as base64 so rendering never depends on network access.
const fontData = (f) => fs.readFileSync(path.join(__dirname, "fonts", f)).toString("base64");
const FONT_CSS = [
  ["Source Serif 4", "normal", "200 900", "SourceSerif4-normal.woff2"],
  ["Source Serif 4", "italic", "200 900", "SourceSerif4-italic.woff2"],
  ["DM Sans", "normal", "100 1000", "DMSans-normal.woff2"],
]
  .map(([fam, style, weight, file]) => `@font-face{font-family:"${fam}";font-style:${style};font-weight:${weight};src:url(data:font/woff2;base64,${fontData(file)}) format("woff2")}`)
  .join("");

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, "<br>");

const PAW = `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true"><g fill="currentColor"><ellipse cx="32" cy="42" rx="14" ry="12"/><ellipse cx="14" cy="26" rx="6" ry="8"/><ellipse cx="26" cy="15" rx="6" ry="8"/><ellipse cx="38" cy="15" rx="6" ry="8"/><ellipse cx="50" cy="26" rx="6" ry="8"/></g></svg>`;

function frame(t, inner, { counter, source, layout = "a" }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px}
body{background:${t.bg};color:${t.fg};font-family:"DM Sans",sans-serif;position:relative;overflow:hidden}
.serif{font-family:"Source Serif 4",serif}
.blob{position:absolute;border-radius:50%;background:${t.shape}}
.blob.b1{width:300px;height:300px;right:-90px;top:-90px}
.blob.b2{width:170px;height:170px;left:-60px;bottom:210px;opacity:.55}
.arc{position:absolute;left:-220px;bottom:-260px;width:620px;height:620px;border-radius:50%;border:3px solid ${t.shape};opacity:.8}
.top{position:absolute;top:72px;left:88px;right:88px;display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;z-index:2}
.top .brand{display:flex;align-items:center;gap:14px}
.top .brand i{display:block;width:30px;height:30px;color:${t.ink}}
.bottom .count{margin-left:28px;padding-left:28px;border-left:2px solid ${t.line};font-weight:700;letter-spacing:.1em;color:${t.fg}}
.bottom{position:absolute;bottom:64px;left:88px;right:88px;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:${t.soft};border-top:2px solid ${t.line};padding-top:22px;z-index:2}
.stage{position:absolute;top:170px;bottom:150px;left:88px;right:88px;display:flex;flex-direction:column;justify-content:center;z-index:2}
h1,h2,.h1,.h2,.stat,.qhead,.wtitle,.statlabel{font-family:"Source Serif 4",serif}
em{font-style:italic;color:${t.fg};background:linear-gradient(transparent 62%, ${t.mark} 62%, ${t.mark} 92%, transparent 92%);padding:0 .06em}
.kicker{display:inline-block;align-self:flex-start;font-size:24px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:14px 24px;background:${t.kickBg};color:${t.kickFg};border-radius:999px;margin-bottom:44px}
.h1{font-size:112px;line-height:1.02;font-weight:800;letter-spacing:-.02em}
.sub{font-size:44px;line-height:1.3;margin-top:44px;color:${t.soft};font-weight:500;max-width:880px}
.num{font-family:"Source Serif 4",serif;font-style:italic;font-weight:700;font-size:200px;line-height:.85;color:${t.ink};margin-bottom:30px;display:flex;align-items:center;gap:30px}
.num::after{content:"";flex:1;height:4px;background:${t.shape};border-radius:4px;max-width:360px}
.h2{font-size:88px;line-height:1.04;font-weight:800;letter-spacing:-.02em}
.body{font-size:46px;line-height:1.35;margin-top:40px;font-weight:500;color:${t.soft};max-width:900px}
.stat{font-size:200px;line-height:.92;font-weight:800;letter-spacing:-.03em;color:${t.ink}}
.statlabel{font-size:64px;line-height:1.1;font-weight:700;margin-top:26px}
.vs{margin-top:56px;display:flex;align-items:baseline;gap:26px;padding:34px 40px;background:${t.card};border-radius:28px;font-size:40px;line-height:1.3;font-weight:500;border:2px solid ${t.line}}
.vs b{font-family:"Source Serif 4",serif;font-size:72px;font-weight:800;white-space:nowrap}
.qmark{font-family:"Source Serif 4",serif;font-weight:800;font-size:320px;line-height:.55;color:${t.ink === "#353532" ? t.shape : t.ink};height:140px}
.qhead{font-size:80px;line-height:1.04;font-weight:800;letter-spacing:-.02em;margin-bottom:80px}
.qtext{font-family:"Source Serif 4",serif;font-style:italic;font-weight:600;font-size:54px;line-height:1.3}
.qcard{background:${t.card};border-radius:36px;padding:56px 56px 50px;border:2px solid ${t.line}}
.stars{color:${t.ink === "#353532" ? t.shape : t.ink};font-size:44px;letter-spacing:.14em;margin-top:40px}
.who{font-size:34px;font-weight:700;margin-top:12px}
.who span{font-weight:500;color:${t.soft}}
.wall{display:flex;flex-direction:column;gap:24px;margin-top:44px}
.wcard{background:${t.card};border-radius:28px;padding:32px 40px;border:2px solid ${t.line}}
.wcard p{font-family:"Source Serif 4",serif;font-style:italic;font-weight:600;font-size:40px;line-height:1.28}
.wcard div{margin-top:16px;font-size:26px;font-weight:700;letter-spacing:.06em}
.wcard div b{color:${t.ink === "#353532" ? t.shape : t.ink};letter-spacing:.1em;margin-right:10px}
.wtitle{font-size:88px;line-height:1.02;font-weight:800;letter-spacing:-.02em}
.btn{margin-top:60px;align-self:flex-start;display:flex;align-items:center;gap:20px;background:${t.btnBg};color:${t.btnFg};font-size:38px;font-weight:700;padding:28px 46px;border-radius:999px}
.fine{margin-top:34px;font-size:34px;font-weight:500;color:${t.soft}}
.hide{display:none}
</style></head><body>
<div class="blob b1"></div>
<div class="blob b2 ${layout === "a" ? "" : "hide"}"></div>
<div class="arc ${layout === "c" ? "" : "hide"}"></div>
<div class="top"><div class="brand"><i>${PAW}</i>Four Paws Inn</div></div>
<div class="stage">${inner}</div>
<div class="bottom"><div>@fourpawsinnpetboarding</div><div>${source ? "Source: " + esc(source) : "fourpawsinn.co"}${counter ? `<span class="count">${esc(counter)}</span>` : ""}</div></div>
</body></html>`;
}

function slideHtml(s, counter) {
  const t = THEMES[s.theme] || THEMES.cream;
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
      inner = `${s.head ? `<div class="qhead">${rich(s.head)}</div>` : ""}<div class="qcard"><div class="qmark">&ldquo;</div><div class="qtext">${rich(s.quote)}</div><div class="stars">★★★★★</div><div class="who">${esc(s.name)} <span>· Google review</span></div></div>`;
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
  return frame(t, inner, { counter, source: s.source, layout: s.layout || { hook: "a", point: "c", stat: "b", quote: "b", wall: "b", cta: "a" }[s.type] });
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
