#!/usr/bin/env node
/*
 * Deterministic half of the weekly content machine. Mirrors the split from
 * the single-photo pipeline: this script does raw-material detection and
 * mechanical asset composition. It does NOT write captions or scripts and
 * does NOT talk to Eden — those need a live, authenticated Claude Code
 * session (see scripts/run-week.md), for the same reason established in
 * the single-photo build: there is no portable Eden credential a bare
 * script can hold.
 *
 * Three subcommands:
 *   node scripts/weekly-pipeline.js scan
 *     Reads content/inbox/ + content/copy/ + content/reviews/, matches raw
 *     material to each day in config/slate.json by the naming convention
 *     in content/README.md, composites what it can composite without a
 *     model call (the Tuesday carousel, the Saturday case study review
 *     card, funny static, transformation-if-images), and writes
 *     content/generated/week-manifest.json.
 *
 *   node scripts/weekly-pipeline.js overlay <day> "<hook text>"
 *     For video days (Mon house-yard-reel, Wed dog-moment-reel) that need
 *     a text overlay Claude just wrote: burns it onto frame one via
 *     ffmpeg. Requires ffmpeg installed locally (`brew install ffmpeg` on
 *     the Mac). Updates the manifest entry for that day.
 *
 *   node scripts/weekly-pipeline.js casestudy <day> "<problem text>" "<result text>"
 *     For Saturday's case study reel: assembles opening B-roll, the
 *     composited review card, and closing B-roll into one video via
 *     ffmpeg, burning the problem line onto the opening and the result
 *     plus CTA onto the closing. See config/formats/case-study-reel.json.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { loadSlate, loadFormat, ROOT } = require("./lib/config");
const { compositeTextSlide, wrapText } = require("./lib/compose");
const { parseCsv } = require("./lib/csv");

const INBOX = path.join(ROOT, "content", "inbox");
const COPY = path.join(ROOT, "content", "copy");
const REVIEWS_CSV = path.join(ROOT, "content", "reviews", "google-business-reviews.csv");
const REVIEWS_USED = path.join(ROOT, "content", "reviews", "used.json");
const REVIEWS_DOGS_DIR = path.join(ROOT, "content", "reviews", "dogs");
const GENERATED = path.join(ROOT, "content", "generated");
const MANIFEST_PATH = path.join(GENERATED, "week-manifest.json");

const VIDEO_EXT = /\.(mp4|mov)$/i;
const IMAGE_EXT = /\.(jpe?g|png|heic|heif|webp)$/i;

function ensureDirs() {
  for (const d of [INBOX, COPY, path.dirname(REVIEWS_CSV), GENERATED]) {
    fs.mkdirSync(d, { recursive: true });
  }
}

function listInbox() {
  return fs.readdirSync(INBOX).filter((f) => !f.startsWith("."));
}

function findByPrefix(files, prefix, extRegex) {
  return files.filter((f) => f.toLowerCase().startsWith(prefix) && extRegex.test(f));
}

function findLatestCopyFile(prefix) {
  if (!fs.existsSync(COPY)) return null;
  const matches = fs
    .readdirSync(COPY)
    .filter((f) => f.toLowerCase().startsWith(prefix) && f.endsWith(".md"))
    .sort();
  return matches.length ? path.join(COPY, matches[matches.length - 1]) : null;
}

function hasFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// --- per-day resolvers -----------------------------------------------

function resolveHouseYardReel(files) {
  const matches = findByPrefix(files, "mon-", VIDEO_EXT);
  if (matches.length === 0) {
    return { status: "missing", reason: "no file named mon-*.mp4 or mon-*.mov in content/inbox/. Alex needs to film or supply a house/yard clip." };
  }
  return { status: "ready-needs-hook", rawPath: path.join(INBOX, matches[0]), note: "video found, waiting for hook text then `overlay mon \"<hook>\"`" };
}

function resolveDogMomentReel(files) {
  const matches = findByPrefix(files, "wed-", VIDEO_EXT);
  if (matches.length === 0) {
    return { status: "missing", reason: "no file named wed-*.mp4 or wed-*.mov in content/inbox/. Alex needs to film or supply a raw dog clip." };
  }
  return { status: "ready-needs-hook", rawPath: path.join(INBOX, matches[0]), note: "video found, waiting for one-line text then `overlay wed \"<line>\"`" };
}

function resolveFunnyStatic(files) {
  const matches = findByPrefix(files, "thu-", IMAGE_EXT);
  if (matches.length === 0) {
    return { status: "missing", reason: "no file named thu-*.jpg (or .png/.heic) in content/inbox/. Any ordinary photo works, the caption does the joke." };
  }
  return { status: "ready-needs-caption", rawPath: path.join(INBOX, matches[0]) };
}

async function resolveTransformation(files) {
  const day1 = files.find((f) => /^fri-.*-day1\.(jpe?g|png|heic|heif|mp4|mov)$/i.test(f));
  const day5 = files.find((f) => /^fri-.*-day5\.(jpe?g|png|heic|heif|mp4|mov)$/i.test(f));
  if (!day1 || !day5) {
    return {
      status: "missing",
      reason: "need both fri-<slug>-day1.* and fri-<slug>-day5.* in content/inbox/, same dog, days apart. This is the hardest raw material to have on hand, it needs a plan across days, not a single moment.",
    };
  }
  const isImagePair = IMAGE_EXT.test(day1) && IMAGE_EXT.test(day5);
  if (!isImagePair) {
    return { status: "ready-needs-hook", rawPath: [path.join(INBOX, day1), path.join(INBOX, day5)], note: "video pair found, side-by-side video composition needs ffmpeg, not yet built, do by hand for now" };
  }
  const sharp = require("sharp");
  const outDir = path.join(GENERATED, "transformation");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "fri-transformation.jpg");
  const [imgA, imgB] = await Promise.all([
    sharp(path.join(INBOX, day1)).resize(540, 1350, { fit: "cover" }).toBuffer(),
    sharp(path.join(INBOX, day5)).resize(540, 1350, { fit: "cover" }).toBuffer(),
  ]);
  await sharp({ create: { width: 1080, height: 1350, channels: 3, background: "#1f3a5f" } })
    .composite([
      { input: imgA, left: 0, top: 0 },
      { input: imgB, left: 540, top: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(outPath);
  return { status: "ready-needs-caption", assetPath: outPath };
}

function resolvePainPointCarousel() {
  const copyFile = findLatestCopyFile("tue-");
  if (!copyFile) {
    return { status: "missing", reason: "no content/copy/tue-<slug>.md found. Needs 6 lines: the fear, four answer beats, the ask." };
  }
  const lines = fs
    .readFileSync(copyFile, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 6) {
    return { status: "missing", reason: `${path.basename(copyFile)} has ${lines.length} line(s), needs 6 (fear, 4 answer beats, ask).` };
  }
  return { status: "ready-to-compose", copyFile, lines: lines.slice(0, 6) };
}

async function composeCarousel(lines) {
  const outDir = path.join(GENERATED, "carousels", "tue");
  fs.mkdirSync(outDir, { recursive: true });
  const paths = [];
  for (let i = 0; i < lines.length; i++) {
    const outPath = path.join(outDir, `slide-${i + 1}.jpg`);
    await compositeTextSlide({
      text: lines[i],
      outPath,
      fontSize: i === 0 || i === lines.length - 1 ? 72 : 56,
      backgroundColor: i === lines.length - 1 ? "#0f2440" : "#1f3a5f",
    });
    paths.push(outPath);
  }
  return paths;
}

function loadUsedReviews() {
  if (!fs.existsSync(REVIEWS_USED)) return [];
  try {
    return JSON.parse(fs.readFileSync(REVIEWS_USED, "utf8"));
  } catch {
    return [];
  }
}

function saveUsedReviews(list) {
  fs.writeFileSync(REVIEWS_USED, JSON.stringify(list, null, 2) + "\n");
}

function isPermissionSigned(row) {
  const v = (row.permission_signed || "").trim().toLowerCase();
  return v === "true" || v === "yes";
}

function findBrollFiles(dogName) {
  const dir = fs.readdirSync(REVIEWS_DOGS_DIR, { withFileTypes: true }).find(
    (d) => d.isDirectory() && d.name.toLowerCase() === dogName.toLowerCase()
  );
  if (!dir) return [];
  const dogDir = path.join(REVIEWS_DOGS_DIR, dir.name);
  return fs
    .readdirSync(dogDir)
    .filter((f) => !f.startsWith(".") && (VIDEO_EXT.test(f) || IMAGE_EXT.test(f)))
    .sort()
    .map((f) => path.join(dogDir, f));
}

// Replaces the retired review-card resolver. Only ever builds from a
// permission-signed row with real B-roll on file for that specific dog.
// Every row that does not qualify is reported by name, not silently
// dropped and never substituted.
function resolveCaseStudyReel() {
  if (!fs.existsSync(REVIEWS_CSV)) {
    return {
      status: "missing",
      reason: "content/reviews/google-business-reviews.csv does not exist. Alex needs to export reviews from the Google Business Profile dashboard and save it there.",
    };
  }
  fs.mkdirSync(REVIEWS_DOGS_DIR, { recursive: true });

  const rows = parseCsv(fs.readFileSync(REVIEWS_CSV, "utf8"));
  const used = loadUsedReviews();

  // Full pass first: classify every unused row, so a review skipped for
  // lacking permission or B-roll is reported even when it sits after the
  // one row that does qualify. Order in the CSV should never hide a gap.
  const skipped = [];
  let candidate = null;

  for (const row of rows) {
    if (used.includes(row.review_text)) continue;

    if (!isPermissionSigned(row)) {
      skipped.push({ reviewer: row.reviewer_name, dog: row.dog_name, reason: "no signed permission flag in the CSV" });
      continue;
    }
    if (!row.dog_name) {
      skipped.push({ reviewer: row.reviewer_name, dog: row.dog_name, reason: "no dog_name in the CSV row, cannot match a B-roll folder" });
      continue;
    }
    const broll = findBrollFiles(row.dog_name);
    if (broll.length === 0) {
      skipped.push({ reviewer: row.reviewer_name, dog: row.dog_name, reason: `no B-roll found in content/reviews/dogs/${row.dog_name}/` });
      continue;
    }

    if (!candidate) candidate = { review: row, brollFiles: broll };
  }

  if (candidate) {
    return { status: "ready-to-compose", review: candidate.review, brollFiles: candidate.brollFiles, skipped };
  }

  const reasons = skipped.map((s) => `${s.reviewer} (${s.dog || "no dog name"}): ${s.reason}`).join("; ");
  return {
    status: "missing",
    reason: skipped.length
      ? `no eligible review this week. Skipped: ${reasons}`
      : `content/reviews/google-business-reviews.csv has ${rows.length} review(s), all already used.`,
    skipped,
  };
}

async function composeCaseStudyCard(review) {
  const outDir = path.join(GENERATED, "case-study", "card");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "review-card.jpg");
  const text = `"${review.review_text}"\n— ${review.reviewer_name} and ${review.dog_name}`;
  await compositeTextSlide({
    text,
    outPath,
    fontSize: 44,
    maxCharsPerLine: 28,
    width: 1080,
    height: 1920,
  });
  return outPath;
}

function resolveFounderTalkingHead(files) {
  // No avatar/lip-sync path exists (confirmed, see config/formats/founder-
  // talking-head.json). This is real footage only, filmed by Alex, monthly
  // rather than weekly. Same naming convention as the other video formats.
  const matches = findByPrefix(files, "sun-", VIDEO_EXT);
  if (matches.length === 0) {
    return {
      status: "missing",
      reason: "no file named sun-*.mp4 or sun-*.mov in content/inbox/. Real footage only, filmed by Alex. This is a monthly format, not every week, so missing most weeks is expected.",
    };
  }
  return { status: "ready-needs-caption", rawPath: path.join(INBOX, matches[0]) };
}

// --- scan --------------------------------------------------------------

async function scan() {
  ensureDirs();
  const files = listInbox();
  const slate = loadSlate();
  const manifest = { generatedAt: new Date().toISOString(), days: {} };

  for (const slot of slate.feedPosts) {
    let result;
    switch (slot.format) {
      case "house-yard-reel":
        result = resolveHouseYardReel(files);
        break;
      case "dog-moment-reel":
        result = resolveDogMomentReel(files);
        break;
      case "funny-static":
        result = resolveFunnyStatic(files);
        break;
      case "transformation":
        result = await resolveTransformation(files);
        break;
      case "pain-point-carousel": {
        const r = resolvePainPointCarousel();
        if (r.status === "ready-to-compose") {
          r.assetPaths = await composeCarousel(r.lines);
          r.status = "ready-needs-caption";
        }
        result = r;
        break;
      }
      case "case-study-reel": {
        const r = resolveCaseStudyReel();
        if (r.status === "ready-to-compose") {
          r.cardImagePath = await composeCaseStudyCard(r.review);
          r.status = "ready-needs-script";
        }
        result = r;
        break;
      }
      case "founder-talking-head":
        result = resolveFounderTalkingHead(files);
        break;
      default:
        result = { status: "missing", reason: `no resolver for format "${slot.format}"` };
    }
    manifest.days[slot.day] = { format: slot.format, time: slot.time, platforms: slot.platforms, ...result };
  }

  manifest.ffmpegAvailable = hasFfmpeg();
  manifest.stories = { automated: false, reason: slate.stories.note };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(JSON.stringify(manifest, null, 2));

  const filled = Object.values(manifest.days).filter((d) => d.status.startsWith("ready")).length;
  const missing = Object.values(manifest.days).filter((d) => d.status === "missing");
  console.log(`\n${filled}/7 day(s) have raw material or a composed asset ready.`);
  if (missing.length) {
    console.log(`${missing.length} day(s) cannot be filled:`);
    for (const [day, d] of Object.entries(manifest.days)) {
      if (d.status === "missing") console.log(`  ${day} (${d.format}): ${d.reason}`);
    }
  }
  console.log(`\nNext: run scripts/run-week.md in Claude Code to write captions/hooks, run any needed overlay pass, upload to Eden, and draft the schedule.`);
}

// --- overlay (video text burn-in) --------------------------------------

function overlay(day, hookText) {
  ensureDirs();
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("No manifest found. Run `node scripts/weekly-pipeline.js scan` first.");
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const entry = manifest.days[day];
  if (!entry || !entry.rawPath) {
    console.error(`No raw video on file for ${day}. Run scan first.`);
    process.exit(1);
  }
  if (!hasFfmpeg()) {
    console.error("ffmpeg not found. Install it once with `brew install ffmpeg` on the Mac, then re-run this command. Not implemented in this sandbox, no ffmpeg present here.");
    process.exit(1);
  }

  const outDir = path.join(GENERATED, "video", day);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "overlaid.mp4");

  // Wrap first: a long hook at a fixed font size will run off both edges of
  // frame one otherwise (found by testing this against a real 1080-wide
  // clip, not a hypothetical). ~18 chars/line keeps it inside frame at
  // fontsize 56 on a 1080px-wide vertical video.
  const lines = wrapText(hookText, 18);
  const escapedLines = lines.map((l) => l.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019").replace(/%/g, "\\%"));
  const text = escapedLines.join("\n");
  const drawtext = `drawtext=text='${text}':fontcolor=white:fontsize=56:line_spacing=8:box=1:boxcolor=black@0.5:boxborderw=20:x=(w-text_w)/2:y=100:enable='between(t,0,4)'`;

  execFileSync("ffmpeg", ["-y", "-i", entry.rawPath, "-vf", drawtext, "-codec:a", "copy", outPath], { stdio: "inherit" });

  entry.assetPath = outPath;
  entry.status = "ready-needs-final-review";
  entry.hookText = hookText;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Overlaid video written to ${outPath}`);
}

// --- casestudy (case study reel assembly) -------------------------------

function ffprobeValue(filePath, args) {
  const raw = execFileSync("ffprobe", args.concat([filePath]), { encoding: "utf8" }).trim();
  return raw;
}

function hasAudioStream(filePath) {
  const out = ffprobeValue(filePath, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0"]);
  return out.length > 0;
}

function getDurationSeconds(filePath) {
  const out = ffprobeValue(filePath, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0"]);
  const seconds = parseFloat(out);
  return Number.isFinite(seconds) ? seconds : 5;
}

function drawtextArg(text, opts = {}) {
  const lines = wrapText(text, opts.maxCharsPerLine || 20);
  const escaped = lines.map((l) => l.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019").replace(/%/g, "\\%")).join("\n");
  const y = opts.y || "100";
  const enable = opts.enable ? `:enable='${opts.enable}'` : "";
  return `drawtext=text='${escaped}':fontcolor=white:fontsize=${opts.fontSize || 52}:line_spacing=8:box=1:boxcolor=black@0.5:boxborderw=20:x=(w-text_w)/2:y=${y}${enable}`;
}

// Assembles opening B-roll -> review card -> closing B-roll into one reel.
// Normalizes every segment to 1080x1920/30fps/44.1kHz stereo before concat,
// synthesizing silent audio for any video segment that has none, so the
// concat filter never chokes on a channel-layout mismatch mid-run.
function casestudy(day, problemText, resultText) {
  ensureDirs();
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("No manifest found. Run `node scripts/weekly-pipeline.js scan` first.");
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const entry = manifest.days[day];
  if (!entry || !entry.brollFiles || !entry.cardImagePath) {
    console.error(`No case study material on file for ${day}. Run scan first.`);
    process.exit(1);
  }
  if (!hasFfmpeg()) {
    console.error("ffmpeg not found. Install it once with `brew install ffmpeg` on the Mac, then re-run this command.");
    process.exit(1);
  }

  const openBroll = entry.brollFiles[0];
  const closeBroll = entry.brollFiles[1] || entry.brollFiles[0];
  const cardDuration = 5;

  const outDir = path.join(GENERATED, "case-study", day);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "case-study-reel.mp4");

  const inputs = ["-i", openBroll, "-loop", "1", "-t", String(cardDuration), "-i", entry.cardImagePath, "-i", closeBroll];

  const openHasAudio = hasAudioStream(openBroll);
  const closeHasAudio = hasAudioStream(closeBroll);
  const openDuration = getDurationSeconds(openBroll);
  const closeDuration = getDurationSeconds(closeBroll);

  // A looped still image (input 1, the review card) NEVER has an audio
  // stream of its own, ffmpeg's image2 path is video-only. Found this by
  // actually running the assembly, not by inspecting the filter graph:
  // referencing [1:a] failed with "matches no streams". So the card
  // always gets a synthesized silent track, on top of the open/close
  // segments getting one only when they lack real audio.
  let nextInputIndex = 3;
  inputs.push("-f", "lavfi", "-t", String(cardDuration), "-i", "anullsrc=r=44100:cl=stereo");
  const cardSilentIdx = nextInputIndex++;

  let openSilentIdx = null;
  if (!openHasAudio) {
    inputs.push("-f", "lavfi", "-t", String(openDuration), "-i", "anullsrc=r=44100:cl=stereo");
    openSilentIdx = nextInputIndex++;
  }
  let closeSilentIdx = null;
  if (!closeHasAudio) {
    inputs.push("-f", "lavfi", "-t", String(closeDuration), "-i", "anullsrc=r=44100:cl=stereo");
    closeSilentIdx = nextInputIndex++;
  }

  const filters = [];
  filters.push(
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,${drawtextArg(problemText, { y: 140, enable: "between(t,0,4)" })}[v0]`
  );
  filters.push(`[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1[v1]`);
  filters.push(
    `[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,${drawtextArg(resultText, { y: "h-260", enable: "between(t,0,5)" })}[v2]`
  );

  filters.push(openHasAudio ? `[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0]` : `[${openSilentIdx}:a]aformat=sample_rates=44100:channel_layouts=stereo[a0]`);
  filters.push(`[${cardSilentIdx}:a]aformat=sample_rates=44100:channel_layouts=stereo[a1]`);
  filters.push(closeHasAudio ? `[2:a]aformat=sample_rates=44100:channel_layouts=stereo[a2]` : `[${closeSilentIdx}:a]aformat=sample_rates=44100:channel_layouts=stereo[a2]`);

  filters.push(`[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[outv][outa]`);

  const filterComplex = filters.join(";");

  execFileSync(
    "ffmpeg",
    ["-y", ...inputs, "-filter_complex", filterComplex, "-map", "[outv]", "-map", "[outa]", "-c:v", "libx264", "-c:a", "aac", outPath],
    { stdio: "inherit" }
  );

  entry.assetPath = outPath;
  entry.status = "ready-needs-final-review";
  entry.problemText = problemText;
  entry.resultText = resultText;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Case study reel assembled: ${outPath}`);
}

// --- entry ---------------------------------------------------------------

const [, , cmd, ...args] = process.argv;

(async () => {
  if (cmd === "scan" || !cmd) {
    await scan();
  } else if (cmd === "overlay") {
    const [day, hookText] = args;
    if (!day || !hookText) {
      console.error('Usage: node scripts/weekly-pipeline.js overlay <day> "<hook text>"');
      process.exit(1);
    }
    overlay(day, hookText);
  } else if (cmd === "casestudy") {
    const [day, problemText, resultText] = args;
    if (!day || !problemText || !resultText) {
      console.error('Usage: node scripts/weekly-pipeline.js casestudy <day> "<problem text>" "<result text>"');
      process.exit(1);
    }
    casestudy(day, problemText, resultText);
  } else {
    console.error(`Unknown command "${cmd}". Use "scan", "overlay", or "casestudy".`);
    process.exit(1);
  }
})().catch((err) => {
  console.error("weekly-pipeline failed:", err);
  process.exit(1);
});
