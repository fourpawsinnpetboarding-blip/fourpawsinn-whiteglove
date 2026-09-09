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
 * Two subcommands:
 *   node scripts/weekly-pipeline.js scan
 *     Reads content/inbox/ + content/copy/ + content/reviews/, matches raw
 *     material to each day in config/slate.json by the naming convention
 *     in content/README.md, composites what it can composite without a
 *     model call (carousel, review card, funny static, transformation-if-
 *     images), and writes content/generated/week-manifest.json.
 *
 *   node scripts/weekly-pipeline.js overlay <day> "<hook text>"
 *     For video days (Mon house-yard-reel, Wed dog-moment-reel) that need
 *     a text overlay Claude just wrote: burns it onto frame one via
 *     ffmpeg. Requires ffmpeg installed locally (`brew install ffmpeg` on
 *     the Mac). Updates the manifest entry for that day.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { loadSlate, loadFormat, ROOT } = require("./lib/config");
const { compositeTextSlide } = require("./lib/compose");
const { parseCsv } = require("./lib/csv");

const INBOX = path.join(ROOT, "content", "inbox");
const COPY = path.join(ROOT, "content", "copy");
const REVIEWS_CSV = path.join(ROOT, "content", "reviews", "google-business-reviews.csv");
const REVIEWS_USED = path.join(ROOT, "content", "reviews", "used.json");
const FOUNDER_REF = path.join(ROOT, "content", "founder-reference", "alex-reference.mp4");
const GENERATED = path.join(ROOT, "content", "generated");
const MANIFEST_PATH = path.join(GENERATED, "week-manifest.json");

const VIDEO_EXT = /\.(mp4|mov)$/i;
const IMAGE_EXT = /\.(jpe?g|png|heic|heif|webp)$/i;

function ensureDirs() {
  for (const d of [INBOX, COPY, path.dirname(REVIEWS_CSV), path.dirname(FOUNDER_REF), GENERATED]) {
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

async function resolveReviewCard(files) {
  if (!fs.existsSync(REVIEWS_CSV)) {
    return {
      status: "missing",
      reason: "content/reviews/google-business-reviews.csv does not exist. Alex needs to export reviews from the Google Business Profile dashboard and save it there. Real recurring manual step, Google has no live API pull for a business this size.",
    };
  }
  const rows = parseCsv(fs.readFileSync(REVIEWS_CSV, "utf8"));
  const used = loadUsedReviews();
  const next = rows.find((r) => !used.includes(r.review_text));
  if (!next) {
    return { status: "missing", reason: `content/reviews/google-business-reviews.csv has ${rows.length} review(s), all already used. Export fresh reviews from Google Business Profile.` };
  }
  const dogPhoto = next.dog_name
    ? files.find((f) => f.toLowerCase().includes(next.dog_name.toLowerCase()) && IMAGE_EXT.test(f))
    : null;
  return { status: "ready-to-compose", review: next, dogPhotoPath: dogPhoto ? path.join(INBOX, dogPhoto) : null };
}

async function composeReviewCard(review, dogPhotoPath) {
  const outDir = path.join(GENERATED, "review-cards");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "sat-review.jpg");
  const text = `"${review.review_text}"\n— ${review.reviewer_name}${review.dog_name ? " and " + review.dog_name : ""}`;
  await compositeTextSlide({
    text,
    outPath,
    backgroundImagePath: dogPhotoPath || undefined,
    fontSize: 48,
    maxCharsPerLine: 30,
  });
  return outPath;
}

function resolveFounderTalkingHead() {
  if (!fs.existsSync(FOUNDER_REF)) {
    return {
      status: "missing",
      reason: "content/founder-reference/alex-reference.mp4 does not exist. Alex needs to film one clean reference clip, good light, plain background, neutral delivery, once.",
    };
  }
  return {
    status: "reference-ready-avatar-unconfirmed",
    rawPath: FOUNDER_REF,
    reason: "reference clip exists, but Higgsfield's talking-head/lip-sync capability from a reference video is unconfirmed (see config/formats/founder-talking-head.json). Until confirmed, this is real footage only, filmed by Alex.",
  };
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
      case "review-card": {
        const r = await resolveReviewCard(files);
        if (r.status === "ready-to-compose") {
          r.assetPath = await composeReviewCard(r.review, r.dogPhotoPath);
          r.status = "ready-needs-caption";
        }
        result = r;
        break;
      }
      case "founder-talking-head":
        result = resolveFounderTalkingHead();
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

  const escaped = hookText.replace(/:/g, "\\:").replace(/'/g, "\\'");
  const drawtext = `drawtext=text='${escaped}':fontcolor=white:fontsize=64:box=1:boxcolor=black@0.5:boxborderw=20:x=(w-text_w)/2:y=120:enable='between(t,0,4)'`;

  execFileSync("ffmpeg", ["-y", "-i", entry.rawPath, "-vf", drawtext, "-codec:a", "copy", outPath], { stdio: "inherit" });

  entry.assetPath = outPath;
  entry.status = "ready-needs-final-review";
  entry.hookText = hookText;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Overlaid video written to ${outPath}`);
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
  } else {
    console.error(`Unknown command "${cmd}". Use "scan" or "overlay".`);
    process.exit(1);
  }
})().catch((err) => {
  console.error("weekly-pipeline failed:", err);
  process.exit(1);
});
