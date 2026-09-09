const sharp = require("sharp");

const WIDTH = 1080;
const HEIGHT = 1350;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Wraps text to a max character width per line, simple greedy wrap.
// Good enough for short slide copy, not a full typesetting engine.
function wrapText(text, maxCharsPerLine) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function textSvg({ text, fontSize = 64, fill = "#ffffff", maxCharsPerLine = 24, startY = null }) {
  const lines = wrapText(text, maxCharsPerLine);
  const lineHeight = fontSize * 1.25;
  const totalHeight = lines.length * lineHeight;
  const y0 = startY !== null ? startY : (HEIGHT - totalHeight) / 2 + fontSize;

  const tspans = lines
    .map((line, i) => `<tspan x="${WIDTH / 2}" y="${y0 + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  return Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}">
      <style>
        .t { font-family: 'Helvetica', 'Arial', sans-serif; font-weight: 700; font-size: ${fontSize}px; fill: ${fill}; text-anchor: middle; }
      </style>
      <text class="t">${tspans}</text>
    </svg>
  `);
}

// Solid branded background plate. Swap for a real designed background image
// by pointing backgroundImagePath at a file instead of using this default.
async function brandBackground({ color = "#1f3a5f" } = {}) {
  return sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: color },
  })
    .jpeg()
    .toBuffer();
}

async function compositeTextSlide({ backgroundImagePath, backgroundColor, text, outPath, fontSize, fill, maxCharsPerLine, startY }) {
  const base = backgroundImagePath
    ? sharp(backgroundImagePath).resize(WIDTH, HEIGHT, { fit: "cover" })
    : sharp(await brandBackground({ color: backgroundColor }));

  const overlay = textSvg({ text, fontSize, fill, maxCharsPerLine, startY });

  await base
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(outPath);

  return outPath;
}

module.exports = { compositeTextSlide, wrapText, WIDTH, HEIGHT };
