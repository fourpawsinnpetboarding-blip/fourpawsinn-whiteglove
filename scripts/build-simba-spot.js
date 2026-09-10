#!/usr/bin/env node
/*
 * One-off assembly for the Simba case study :30 spot. Not part of the
 * generalized weekly pipeline, this is a bespoke build from a hand-given
 * shot list. Vertical 1080x1920, text overlay only, no voiceover, no
 * music, 3 seconds per segment.
 *
 * Currently building 8 of 10 shots: 4 (grass photo, white pitbull) and 5
 * (grass pack photo) are not on file yet, skipped per instruction rather
 * than filled with anything else. Re-run once those two exist.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { compositeTextSlide } = require("./lib/compose");

const ROOT = path.resolve(__dirname, "..");
const DOGS_DIR = path.join(ROOT, "content", "reviews", "dogs", "simba");
const OUT_DIR = path.join(ROOT, "content", "generated", "simba-spot");
const CARDS_DIR = path.join(OUT_DIR, "cards");
const SEGMENTS_DIR = path.join(OUT_DIR, "segments");

const WIDTH = 1080;
const HEIGHT = 1920;
const SEG_SECONDS = 3;

const PATIO_STILL = path.join(DOGS_DIR, "patio-still.jpg");
const PATIO_MOTION = path.join(DOGS_DIR, "Subtle-natural-motion-only-The-dog-brea.mp4");
const POOL_MOTION = path.join(DOGS_DIR, "Subtle-natural-motion-only-The-water-ge.mp4");

for (const d of [OUT_DIR, CARDS_DIR, SEGMENTS_DIR]) fs.mkdirSync(d, { recursive: true });

function drawtextArg(text, opts = {}) {
  // Simple JS wrap, matches the compositor's own wrap so on-image and
  // on-video text look the same across the spot.
  const words = text.split(/\s+/);
  const maxChars = opts.maxCharsPerLine || 20;
  const lines = [];
  let cur = "";
  for (const w of words) {
    const cand = cur ? `${cur} ${w}` : w;
    if (cand.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else cur = cand;
  }
  if (cur) lines.push(cur);
  const escaped = lines.map((l) => l.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019").replace(/%/g, "\\%")).join("\n");
  return `drawtext=text='${escaped}':fontcolor=white:fontsize=${opts.fontSize || 64}:line_spacing=10:box=1:boxcolor=black@0.55:boxborderw=24:x=(w-text_w)/2:y=(h-text_h)/2`;
}

// --- still-image segments (text card or photo + text), 3s each --------

async function buildStillSegment({ id, text, backgroundImagePath, backgroundColor, fontSize = 68, maxCharsPerLine = 18 }) {
  const cardPath = path.join(CARDS_DIR, `${id}.jpg`);
  await compositeTextSlide({
    text,
    outPath: cardPath,
    backgroundImagePath,
    backgroundColor,
    fontSize,
    maxCharsPerLine,
    width: WIDTH,
    height: HEIGHT,
  });

  const segPath = path.join(SEGMENTS_DIR, `${id}.mp4`);
  execFileSync("ffmpeg", [
    "-y",
    "-loop", "1", "-t", String(SEG_SECONDS), "-i", cardPath,
    "-f", "lavfi", "-t", String(SEG_SECONDS), "-i", "anullsrc=r=44100:cl=stereo",
    "-vf", "fps=30,format=yuv420p",
    "-c:v", "libx264", "-c:a", "aac", "-shortest",
    segPath,
  ], { stdio: "inherit" });
  return segPath;
}

// --- video segments (motion clip + text overlay), trimmed to 3s -------

function buildVideoSegment({ id, text, sourcePath, fontSize = 60 }) {
  const segPath = path.join(SEGMENTS_DIR, `${id}.mp4`);
  const drawtext = drawtextArg(text, { fontSize });
  const vf = `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT},fps=30,setsar=1,${drawtext}`;
  execFileSync("ffmpeg", [
    "-y",
    "-i", sourcePath,
    "-f", "lavfi", "-t", String(SEG_SECONDS), "-i", "anullsrc=r=44100:cl=stereo",
    "-t", String(SEG_SECONDS),
    "-vf", vf,
    "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "libx264", "-c:a", "aac",
    segPath,
  ], { stdio: "inherit" });
  return segPath;
}

async function main() {
  const segments = [];

  segments.push(await buildStillSegment({ id: "01-black", text: "Nobody would take this dog.", backgroundColor: "#000000" }));
  segments.push(await buildStillSegment({ id: "02-patio-still", text: "German Shepherd. Too big. Too loud.", backgroundImagePath: PATIO_STILL }));
  segments.push(buildVideoSegment({ id: "03-patio-motion", text: "Every place said no.", sourcePath: PATIO_MOTION }));
  // shots 4 and 5 skipped, no source photo on file yet
  segments.push(buildVideoSegment({ id: "06-pool-motion", text: "Look who isn't scared.", sourcePath: POOL_MOTION }));
  segments.push(await buildStillSegment({ id: "07-text", text: "Most places stay safe by turning dogs away.", backgroundColor: "#1f3a5f" }));
  segments.push(await buildStillSegment({ id: "08-text", text: "We stay safe by how we run the house.", backgroundColor: "#1f3a5f" }));
  segments.push(await buildStillSegment({ id: "09-patio-still", text: "We don't pick easy dogs.", backgroundImagePath: PATIO_STILL }));
  segments.push(
    await buildStillSegment({
      id: "10-end",
      text: "We built a place where every dog is easy. Tell us about your dog. Four Paws Inn, Miramar.",
      backgroundColor: "#0f2440",
      fontSize: 52,
      maxCharsPerLine: 22,
    })
  );

  const listPath = path.join(OUT_DIR, "concat-list.txt");
  fs.writeFileSync(listPath, segments.map((s) => `file '${s}'`).join("\n") + "\n");

  const outPath = path.join(OUT_DIR, "simba-spot-8of10.mp4");
  execFileSync("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", outPath], { stdio: "inherit" });

  console.log(`\nBuilt ${segments.length} of 10 shots (4 and 5 skipped, no source photo yet).`);
  console.log(`Output: ${outPath}`);
}

main().catch((err) => {
  console.error("build-simba-spot failed:", err);
  process.exit(1);
});
