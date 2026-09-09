#!/usr/bin/env node
/*
 * Deterministic half of the photo pipeline. This script does NOT write
 * captions and does NOT talk to Eden. It only does the mechanical work
 * that does not need a model call: reject bad files, convert HEIC,
 * resize, strip metadata, and leave a manifest for the Claude Code
 * orchestration step (see scripts/run-photo-pipeline.md) to pick up.
 *
 * Why split this way: writing the Report Card caption and calling Eden's
 * scheduler both need a live, authenticated model/tool session. That only
 * exists inside a running Claude Code process (interactively, or headless
 * via `claude -p`). A bare Node script has no portable Eden credential to
 * call the scheduler with, so it should not pretend to.
 *
 * Run: node scripts/photo-pipeline.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const convertHeic = require("heic-convert");

const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "content", "inbox");
const REJECTED = path.join(ROOT, "content", "rejected");
const PROCESSED = path.join(ROOT, "content", "generated", "processed");
const MANIFEST_PATH = path.join(ROOT, "content", "generated", "pending.json");

const AI_NAME_PATTERN = /gemini|generated|midjourney|dall-?e|stable ?diffusion|\bai\b/i;
const IMAGE_EXT = /\.(jpe?g|png|heic|heif|webp)$/i;

const INSTAGRAM_WIDTH = 1080;
const INSTAGRAM_HEIGHT = 1350; // 4:5

function ensureDirs() {
  for (const dir of [INBOX, REJECTED, PROCESSED, path.dirname(MANIFEST_PATH)]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`Manifest at ${MANIFEST_PATH} is corrupt, starting fresh. (${err.message})`);
    return [];
  }
}

function saveManifest(entries) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(entries, null, 2) + "\n");
}

async function readAsJpegBuffer(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    const inputBuffer = fs.readFileSync(filePath);
    return convertHeic({ buffer: inputBuffer, format: "JPEG", quality: 0.92 });
  }
  return fs.readFileSync(filePath);
}

async function processOne(filename, results) {
  const srcPath = path.join(INBOX, filename);

  if (!IMAGE_EXT.test(filename)) {
    results.skipped.push({ filename, reason: "not an image file" });
    return;
  }

  if (AI_NAME_PATTERN.test(filename)) {
    const dest = path.join(REJECTED, filename);
    fs.renameSync(srcPath, dest);
    results.rejected.push({ filename, reason: "filename matches AI-generated pattern, never posts to Four Paws account" });
    return;
  }

  let jpegBuffer;
  try {
    jpegBuffer = await readAsJpegBuffer(srcPath);
  } catch (err) {
    results.failed.push({ filename, reason: `could not read/convert: ${err.message}` });
    return;
  }

  const outName = path.basename(filename, path.extname(filename)) + ".jpg";
  const outPath = path.join(PROCESSED, outName);

  try {
    // .jpeg() with no explicit .withMetadata() call drops EXIF (GPS included)
    // by default. That is the point: no location data leaves the machine.
    await sharp(jpegBuffer)
      .rotate() // apply EXIF orientation before metadata is dropped
      .resize(INSTAGRAM_WIDTH, INSTAGRAM_HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({ quality: 90 })
      .toFile(outPath);
  } catch (err) {
    results.failed.push({ filename, reason: `resize/strip failed: ${err.message}` });
    return;
  }

  results.processed.push({
    sourceFilename: filename,
    sourcePath: srcPath,
    processedPath: outPath,
    processedAt: new Date().toISOString(),
    width: INSTAGRAM_WIDTH,
    height: INSTAGRAM_HEIGHT,
    status: "awaiting_caption_and_upload",
  });
}

async function main() {
  ensureDirs();

  const results = { processed: [], rejected: [], skipped: [], failed: [] };
  const files = fs.readdirSync(INBOX).filter((f) => !f.startsWith("."));

  for (const filename of files) {
    await processOne(filename, results);
  }

  if (results.processed.length > 0) {
    const manifest = loadManifest();
    saveManifest(manifest.concat(results.processed));
  }

  console.log(JSON.stringify(results, null, 2));

  console.log(`\n${results.processed.length} image(s) processed and waiting in content/generated/pending.json.`);
  console.log(`${results.rejected.length} rejected (AI-pattern filename match).`);
  if (results.failed.length > 0) {
    console.log(`${results.failed.length} failed, see "failed" above.`);
  }
  if (results.processed.length > 0) {
    console.log(`Next: run the orchestration step (scripts/run-photo-pipeline.md) in Claude Code to caption, upload, and draft these to Eden.`);
  }
}

main().catch((err) => {
  console.error("photo-pipeline failed:", err);
  process.exit(1);
});
