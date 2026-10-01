/*
 * Full vertical reel (1080x1920) assembled entirely from real B-roll stills,
 * for a day with no filmed footage. Sibling to render.js: that script makes
 * overlay graphics for a video Alex films and edits himself; this one builds
 * the finished motion video itself, Ken Burns zoom per photo, hook and
 * captions burned in, so there is nothing left for Alex to edit beyond
 * reviewing it.
 *
 * Usage: node scripts/video-assets/photo-reel.js <date>
 * Reads content/video/<date>/photo-reels.json, stills come from
 * content/inbox/ (same drop location as every other raw asset).
 *
 * Output: content/video/<date>/photo-reels/<id>.mp4
 */
const fs = require("fs");
const path = require("path");
const { composePhotoReelFromStills } = require("../lib/photo-reel");

const ROOT = path.resolve(__dirname, "..", "..");
const INBOX = path.join(ROOT, "content", "inbox");

function main() {
  const date = process.argv[2];
  if (!date) {
    console.error("Usage: node scripts/video-assets/photo-reel.js <date>");
    process.exit(1);
  }

  const batchDir = path.join(ROOT, "content", "video", date);
  const planPath = path.join(batchDir, "photo-reels.json");
  if (!fs.existsSync(planPath)) {
    console.error(`No plan found at ${planPath}. Write it first (see scripts/video-assets/photo-reel-README section or copy an existing batch).`);
    process.exit(1);
  }
  const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const outDir = path.join(batchDir, "photo-reels");
  fs.mkdirSync(outDir, { recursive: true });

  for (const reel of plan.reels) {
    const stillPaths = reel.stills.map((f) => path.join(INBOX, f));
    const missing = stillPaths.filter((p) => !fs.existsSync(p));
    if (missing.length) {
      console.error(`Reel "${reel.id}": missing still(s) in content/inbox/: ${missing.map((p) => path.basename(p)).join(", ")}. Skipped, nothing built.`);
      continue;
    }

    // Hook burns on the first segment; captions[i] (if given) burns on
    // segment i for the rest. Either array entry can be blank for no text.
    const captions = stillPaths.map((_, i) => (i === 0 ? reel.hook : (reel.captions && reel.captions[i]) || null));

    const reelOutDir = path.join(outDir, reel.id);
    const assembled = composePhotoReelFromStills(stillPaths, reelOutDir, {
      secondsPerPhoto: reel.secondsPerPhoto || 3,
      captions,
    });
    const finalPath = path.join(outDir, `${reel.id}.mp4`);
    fs.copyFileSync(assembled, finalPath);
    console.log(`${reel.id}: ${stillPaths.length} photo(s) -> ${finalPath}`);
  }
}

main();
