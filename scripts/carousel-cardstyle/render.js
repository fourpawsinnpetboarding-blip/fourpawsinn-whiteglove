/*
 * Card style carousel renderer for Four Paws Inn (Alex, Oct 23, 2026).
 *
 * Style reference: the goviralish.com sales page Alex liked. White cards with a
 * thick charcoal border and a hard offset shadow, highlighter bars behind key
 * words, spaced uppercase eyebrow labels, bold lead-in sentences, pill buttons.
 * Recolored to the Four Paws Inn palette. Real photos only, placed as they are
 * (never redrawn).
 *
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js content/carousels/<folder>
 * Reads <folder>/slides.json, writes <folder>/png/NN.png (1080x1350) and contact-sheet.png.
 *
 * Text markup: ==word== highlight bar, *word* serif italic, **word** bold.
 * Slide fields: eyebrow, title, titleSize, lead, body, list[], listSize, photo, quote, quoteSize, by, button, note, swipe.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const W = 1080;
const H = 1350;
const C = { cream: "#FAF7F3", pink: "#E6A0A3", charcoal: "#353532", white: "#FFFFFF" };

const font = (f) => fs.readFileSync(path.join(__dirname, "..", "morning-posts", "fonts", f)).toString("base64");
const FONTS = `
@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${font("DMSans-normal.woff2")}) format("woff2");font-weight:100 1000;}
@font-face{font-family:"Source Serif 4";font-style:italic;src:url(data:font/woff2;base64,${font("SourceSerif4-italic.woff2")}) format("woff2");font-weight:200 900;}
`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = (s) =>
  esc(s)
    .replace(/==(.+?)==/g, '<span class="hl">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

function slideHtml(s, i, n, dir) {
  const photo = s.photo
    ? `<div class="photo"><img src="data:image/jpeg;base64,${fs.readFileSync(path.join(dir, s.photo)).toString("base64")}"></div>`
    : "";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${C.cream};font-family:"DM Sans";color:${C.charcoal};display:flex;align-items:center;justify-content:center}
.card{width:960px;height:1180px;justify-content:${s.photo ? "flex-start" : "center"};background:${C.white};border:7px solid ${C.charcoal};border-radius:44px;box-shadow:18px 18px 0 ${C.charcoal};padding:64px 64px 56px;display:flex;flex-direction:column;gap:30px;position:relative}
.eyebrow{display:flex;align-items:center;gap:18px;align-self:center;font-weight:800;font-size:30px;letter-spacing:.24em;text-transform:uppercase}
.eyebrow:before{content:"";width:16px;height:16px;border-radius:50%;background:${C.charcoal}}
.eyebrow span{background:${C.pink};padding:6px 14px}
h1{font-weight:800;font-size:${s.titleSize || (s.photo ? 82 : 96)}px;line-height:1.08;letter-spacing:-.005em;text-align:center}
em{font-family:"Source Serif 4";font-style:italic;font-weight:700;letter-spacing:-.01em}
.hl{background:linear-gradient(transparent 52%, ${C.pink} 52%);padding:0 6px}
.lead{font-size:${s.photo ? 44 : 54}px;line-height:1.3;letter-spacing:.005em}
.body{font-size:${s.photo ? 38 : 46}px;line-height:1.4;letter-spacing:.005em;color:rgba(53,53,50,.86)}
.list{font-size:${s.listSize || 48}px;letter-spacing:.005em;line-height:1.3;display:flex;flex-direction:column;gap:18px}
.list div{padding-left:58px;position:relative}
.list div b.n{position:absolute;left:0;top:0}
.photo{border:7px solid ${C.charcoal};border-radius:32px;box-shadow:14px 14px 0 ${C.charcoal};overflow:hidden;flex:1;min-height:380px;max-height:680px}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
.quote{font-family:"Source Serif 4";font-style:italic;font-weight:600;font-size:${s.quoteSize || 56}px;line-height:1.2;text-align:center}
.by{font-size:30px;text-align:center;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.btn{align-self:center;background:${C.pink};border:7px solid ${C.charcoal};border-radius:999px;box-shadow:12px 12px 0 ${C.charcoal};padding:30px 70px;font-weight:850;font-size:48px}
.note{text-align:center;font-family:"Source Serif 4";font-style:italic;font-size:32px;color:rgba(53,53,50,.75)}
.foot{position:absolute;left:64px;right:64px;bottom:-78px;display:flex;justify-content:space-between;font-size:26px;font-weight:700;letter-spacing:.08em}
.swipe{position:absolute;right:56px;bottom:40px;font-weight:800;font-size:30px}
</style></head><body><div class="card">
${s.eyebrow ? `<div class="eyebrow"><span>${esc(s.eyebrow)}</span></div>` : ""}
${s.title ? `<h1>${mark(s.title)}</h1>` : ""}
${s.quote ? `<div class="quote">${mark(s.quote)}</div>` : ""}
${s.by ? `<div class="by">${esc(s.by)}</div>` : ""}
${photo}
${s.lead ? `<div class="lead">${mark(s.lead)}</div>` : ""}
${s.body ? `<div class="body">${mark(s.body)}</div>` : ""}
${s.list ? `<div class="list">${s.list.map((l, k) => `<div><b class="n">${k + 1}.</b>${mark(l)}</div>`).join("")}</div>` : ""}
${s.button ? `<div class="btn">${esc(s.button)} &rarr;</div>` : ""}
${s.note ? `<div class="note">${mark(s.note)}</div>` : ""}
${s.swipe ? `<div class="swipe">Swipe &rarr;</div>` : ""}
<div class="foot"><span>FOUR PAWS INN</span><span>${i + 1} / ${n}</span></div>
</div></body></html>`;
}

(async () => {
  const dir = path.resolve(process.argv[2]);
  const slides = JSON.parse(fs.readFileSync(path.join(dir, "slides.json"), "utf8")).slides;
  const out = path.join(dir, "png");
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const files = [];
  for (let i = 0; i < slides.length; i++) {
    await page.setContent(slideHtml(slides[i], i, slides.length, dir), { waitUntil: "load" });
    const f = path.join(out, String(i + 1).padStart(2, "0") + ".png");
    await page.screenshot({ path: f });
    files.push(f);
  }
  const imgs = files.map((f) => `<img src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}">`).join("");
  await page.setViewportSize({ width: 1800, height: 1500 });
  await page.setContent(`<body style="margin:0;background:#ddd;display:flex;flex-wrap:wrap;gap:10px;padding:10px">${imgs.replace(/<img /g, '<img style="width:345px" ')}</body>`);
  await page.screenshot({ path: path.join(dir, "contact-sheet.png"), fullPage: true });
  await browser.close();
  console.log("rendered", files.length);
})();
