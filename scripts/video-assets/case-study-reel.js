/*
 * Multi-segment case study reel template: text cards, real B-roll stills
 * (Ken Burns motion) and real video clips of one dog, crossfade transitions
 * between segments, and a review-card segment quoting that dog's actual
 * Google review, verbatim, from a parent who gave signed permission.
 *
 * This is the reusable template Alex asked to slowly build on. Sibling to
 * photo-reel.js (no review, no transitions) and render.js (overlay graphics
 * only, for footage Alex edits himself): this one is the full production,
 * finished reel in one pass, built around one specific dog's story.
 *
 * Usage: node scripts/video-assets/case-study-reel.js <date>
 * Reads content/video/<date>/case-study-reels.json. B-roll for each dog
 * comes from content/reviews/dogs/<dogName>/, review text from
 * content/reviews/google-business-reviews.csv.
 *
 * Output: content/video/<date>/case-study-reels/<id>.mp4
 * A review with no signed permission gets a placeholder card instead of
 * invented or borrowed words, and the whole reel is renamed with a
 * "-PREVIEW-NOT-FOR-POSTING" suffix so it can never be mistaken for a
 * finished, postable asset.
 */
const fs = require("fs");
const path = require("path");
const { parseCsv } = require("../lib/csv");
const { compositeTextSlide } = require("../lib/compose");
const { textCardSegment, stillSegment, videoClipSegment, chainWithCrossfade } = require("../lib/reel-template");

const ROOT = path.resolve(__dirname, "..", "..");
const DOGS_DIR = path.join(ROOT, "content", "reviews", "dogs");
const REVIEWS_CSV = path.join(ROOT, "content", "reviews", "google-business-reviews.csv");
const WIDTH = 1080;
const HEIGHT = 1920;

function isPermissionSigned(row) {
  return /^(true|yes)$/i.test((row.permission_signed || "").trim());
}

// Finds this dog's review. Prefers a signed row if more than one review
// mentions the same dog; otherwise returns the first match with signed:false
// so the caller can build an honest placeholder instead of using it.
function findReview(dogName) {
  if (!fs.existsSync(REVIEWS_CSV)) return null;
  const rows = parseCsv(fs.readFileSync(REVIEWS_CSV, "utf8"));
  const matches = rows.filter((r) => (r.dog_name || "").trim().toLowerCase() === dogName.trim().toLowerCase());
  if (matches.length === 0) return null;
  const signed = matches.find(isPermissionSigned);
  return { row: signed || matches[0], signed: Boolean(signed) };
}

async function reviewCardSegment({ dogName, outPath, seconds }) {
  const found = findReview(dogName);
  let text;
  let signed;
  if (found && found.signed) {
    const r = found.row;
    text = `"${r.review_text}"\n\n${r.reviewer_name}, ${r.dog_name}'s parent`;
    signed = true;
  } else {
    text = `[Review pending. ${dogName}'s parent has not signed permission yet. Swap in their real words once they do, never before.]`;
    signed = false;
  }
  await compositeTextSlide({ text, outPath: outPath.replace(/\.mp4$/, ".jpg"), fontSize: 44, maxCharsPerLine: 28, width: WIDTH, height: HEIGHT, backgroundColor: "#1f3a5f" });
  require("child_process").execFileSync(
    "ffmpeg",
    ["-y", "-loop", "1", "-t", String(seconds), "-i", outPath.replace(/\.mp4$/, ".jpg"), "-vf", "fps=30,format=yuv420p", "-an", "-c:v", "libx264", outPath],
    { stdio: "inherit" }
  );
  return { outPath, signed };
}

function resolveDogDir(dogName) {
  const match = fs.readdirSync(DOGS_DIR, { withFileTypes: true }).find((d) => d.isDirectory() && d.name.toLowerCase() === dogName.toLowerCase());
  if (!match) throw new Error(`No B-roll folder for "${dogName}" in ${DOGS_DIR} (case-insensitive match checked).`);
  return path.join(DOGS_DIR, match.name);
}

async function buildReel(reel, { secondsPerSegment, reviewSeconds, transitionSeconds }, outDir) {
  const dogDir = resolveDogDir(reel.dogName);
  const segDir = path.join(outDir, reel.id, "segments");
  fs.mkdirSync(segDir, { recursive: true });

  const n = reel.segments.length;
  let anySegmentUnsigned = false;
  const segPaths = [];
  const segSeconds = [];

  for (let i = 0; i < n; i++) {
    const s = reel.segments[i];
    const isTextLike = s.kind === "text" || s.kind === "review";
    const fadeInGuard = i === 0 || (reel.segments[i - 1].kind === "text" || reel.segments[i - 1].kind === "review") ? 0 : transitionSeconds;
    const fadeOutGuard = i === n - 1 || (reel.segments[i + 1].kind === "text" || reel.segments[i + 1].kind === "review") ? 0 : transitionSeconds;
    const outPath = path.join(segDir, `${i + 1}-${s.kind}.mp4`);

    if (s.kind === "text") {
      await textCardSegment({ text: s.text, backgroundColor: s.backgroundColor || "#1f3a5f", outPath, seconds: secondsPerSegment });
      segPaths.push(outPath);
      segSeconds.push(secondsPerSegment);
    } else if (s.kind === "photo") {
      const stillPath = path.join(dogDir, s.file);
      if (!fs.existsSync(stillPath)) throw new Error(`Reel "${reel.id}": missing photo ${stillPath}`);
      stillSegment({ stillPath, outPath, seconds: secondsPerSegment, captionText: s.caption, fadeInGuard, fadeOutGuard });
      segPaths.push(outPath);
      segSeconds.push(secondsPerSegment);
    } else if (s.kind === "video") {
      const videoPath = path.join(dogDir, s.file);
      if (!fs.existsSync(videoPath)) throw new Error(`Reel "${reel.id}": missing video ${videoPath}`);
      videoClipSegment({ videoPath, outPath, seconds: secondsPerSegment, captionText: s.caption, fadeInGuard, fadeOutGuard });
      segPaths.push(outPath);
      segSeconds.push(secondsPerSegment);
    } else if (s.kind === "review") {
      const { signed } = await reviewCardSegment({ dogName: reel.dogName, outPath, seconds: reviewSeconds });
      if (!signed) anySegmentUnsigned = true;
      segPaths.push(outPath);
      segSeconds.push(reviewSeconds);
    } else {
      throw new Error(`Reel "${reel.id}": unknown segment kind "${s.kind}"`);
    }

    if (isTextLike && i > 0 && (reel.segments[i - 1].kind === "text" || reel.segments[i - 1].kind === "review")) {
      console.warn(`Reel "${reel.id}": segments ${i} and ${i + 1} are both text/review back to back. Their captions will double-expose during the crossfade, this template doesn't guard that case. Reorder them or accept a rough transition there.`);
    }
  }

  const finalName = anySegmentUnsigned ? `${reel.id}-PREVIEW-NOT-FOR-POSTING.mp4` : `${reel.id}.mp4`;
  const finalPath = path.join(outDir, finalName);
  const { totalSeconds } = chainWithCrossfade(segPaths, segSeconds, finalPath, { transitionSeconds });
  return { finalPath, totalSeconds, anySegmentUnsigned };
}

async function main() {
  const date = process.argv[2];
  if (!date) {
    console.error("Usage: node scripts/video-assets/case-study-reel.js <date>");
    process.exit(1);
  }
  const batchDir = path.join(ROOT, "content", "video", date);
  const planPath = path.join(batchDir, "case-study-reels.json");
  if (!fs.existsSync(planPath)) {
    console.error(`No plan found at ${planPath}.`);
    process.exit(1);
  }
  const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const outDir = path.join(batchDir, "case-study-reels");
  fs.mkdirSync(outDir, { recursive: true });

  const defaults = {
    secondsPerSegment: plan.secondsPerSegment || 3,
    reviewSeconds: plan.reviewSeconds || 5,
    transitionSeconds: plan.transitionSeconds || 0.5,
  };

  for (const reel of plan.reels) {
    const { finalPath, totalSeconds, anySegmentUnsigned } = await buildReel(reel, defaults, outDir);
    console.log(`${reel.id}: ${totalSeconds}s -> ${finalPath}`);
    if (anySegmentUnsigned) {
      console.log(`  NOT FOR POSTING: review permission isn't signed yet for ${reel.dogName}. Get that first, then re-run.`);
    }
  }
}

main().catch((err) => {
  console.error("case-study-reel failed:", err);
  process.exit(1);
});
