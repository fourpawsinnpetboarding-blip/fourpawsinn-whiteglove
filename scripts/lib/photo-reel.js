const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { wrapText } = require("./compose");

const WIDTH = 1080;
const HEIGHT = 1920;

// Burns a caption onto a clip with a dark contrast box behind it, same
// legibility recipe proven out in scripts/build-simba-spot.js: wrap first
// (an unwrapped long line runs off both edges of a 1080-wide frame), and use
// a typographic apostrophe rather than trying to escape a literal single
// quote inside ffmpeg's single-quoted filter string.
function drawtextArg(text, opts = {}) {
  const lines = wrapText(text, opts.maxCharsPerLine || 20);
  const escaped = lines
    .map((l) => l.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019").replace(/%/g, "\\%"))
    .join("\n");
  const y = opts.y || "(h-text_h)/2";
  return `drawtext=text='${escaped}':fontcolor=white:fontsize=${opts.fontSize || 60}:line_spacing=10:box=1:boxcolor=black@0.55:boxborderw=24:x=(w-text_w)/2:y=${y}`;
}

// One still, one Ken Burns segment. The zoompan "d" option must equal the
// segment's total frame count, not 1: with d=1 the filter re-resets its zoom
// accumulator every output frame on a looped single-image input and nothing
// visibly moves. Confirmed by actually extracting and comparing first/last
// frames, not by reading the filter docs.
function composePhotoReelSegment(stillPath, outPath, seconds, { captionText, fontSize } = {}) {
  const frames = seconds * 30;
  const caption = captionText ? `,${drawtextArg(captionText, { fontSize })}` : "";
  const vf = `scale=8000:-2,zoompan=z='min(zoom+0.0015,1.15)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${WIDTH}x${HEIGHT}:fps=30,format=yuv420p${caption}`;
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-framerate", "30", "-loop", "1", "-t", String(seconds), "-i", stillPath,
      "-f", "lavfi", "-t", String(seconds), "-i", "anullsrc=r=44100:cl=stereo",
      "-vf", vf,
      "-t", String(seconds),
      "-c:v", "libx264", "-c:a", "aac", "-shortest",
      outPath,
    ],
    { stdio: "inherit" }
  );
}

// Assembles a full vertical reel from a sequence of real stills: each gets
// Ken Burns motion (optionally its own caption), then every segment concats
// into one video. `captions`, when given, is parallel to stillPaths - an
// empty/missing entry means that segment carries no text.
function composePhotoReelFromStills(stillPaths, outDir, { secondsPerPhoto = 3, captions = [], fontSize } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  const segmentPaths = stillPaths.map((stillPath, i) => {
    const segPath = path.join(outDir, `photo-${i + 1}.mp4`);
    composePhotoReelSegment(stillPath, segPath, secondsPerPhoto, { captionText: captions[i], fontSize });
    return segPath;
  });
  const listPath = path.join(outDir, "concat-list.txt");
  fs.writeFileSync(listPath, segmentPaths.map((p) => `file '${p}'`).join("\n") + "\n");
  const outPath = path.join(outDir, "photo-reel.mp4");
  execFileSync("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", outPath], { stdio: "inherit" });
  return outPath;
}

module.exports = { composePhotoReelFromStills, composePhotoReelSegment, drawtextArg, WIDTH, HEIGHT };
