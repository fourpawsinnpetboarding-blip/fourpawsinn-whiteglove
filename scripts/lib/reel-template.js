const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { compositeTextSlide } = require("./compose");
const { drawtextArg } = require("./photo-reel");

const WIDTH = 1080;
const HEIGHT = 1920;

// Every segment composer below outputs VIDEO ONLY (no audio stream). Audio
// is added once, at the very end, as a single synthesized silent track
// across the whole assembled reel - this is a text-overlay-only template
// (no voiceover yet), and keeping audio out of the per-segment files avoids
// needing an audio crossfade (acrossfade) to match each video xfade.

async function textCardSegment({ text, backgroundColor, backgroundImagePath, outPath, seconds, fontSize, maxCharsPerLine }) {
  const cardPath = outPath.replace(/\.mp4$/, ".jpg");
  await compositeTextSlide({ text, backgroundColor, backgroundImagePath, outPath: cardPath, fontSize, maxCharsPerLine, width: WIDTH, height: HEIGHT });
  execFileSync(
    "ffmpeg",
    ["-y", "-loop", "1", "-t", String(seconds), "-i", cardPath, "-vf", "fps=30,format=yuv420p", "-an", "-c:v", "libx264", outPath],
    { stdio: "inherit" }
  );
  return outPath;
}

// Captions burn onto each segment independently, before the crossfade blends
// neighboring segments together. Left unguarded, two different captions
// double-expose into an illegible overlap for the whole transition window
// (found by actually extracting a mid-crossfade frame, not by inspecting the
// filter graph). fadeInGuard/fadeOutGuard hide the text during the part of
// THIS segment's own local timeline that will be crossfaded with a neighbor,
// so only one caption is ever visible at a time. Pass 0 on whichever side has
// no neighbor (the reel's first and last segment).
function captionEnableClause(seconds, fadeInGuard, fadeOutGuard) {
  if (!fadeInGuard && !fadeOutGuard) return null;
  return `between(t,${fadeInGuard},${seconds - fadeOutGuard})`;
}

// Ken Burns zoom on a real still, same proven recipe as scripts/lib/photo-reel.js
// (the zoompan "d" option must equal the segment's total frame count, not 1,
// or the filter resets its zoom every frame and nothing visibly moves).
function stillSegment({ stillPath, outPath, seconds, captionText, fontSize, fadeInGuard = 0, fadeOutGuard = 0 }) {
  const frames = seconds * 30;
  const enable = captionEnableClause(seconds, fadeInGuard, fadeOutGuard);
  const caption = captionText ? `,${drawtextArg(captionText, { fontSize, enable })}` : "";
  const vf = `scale=2400:-2,zoompan=z='min(zoom+0.0015,1.15)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${WIDTH}x${HEIGHT}:fps=30,format=yuv420p${caption}`;
  // The output-side -t is load-bearing, not redundant with the input-side one:
  // zoompan's "d" holds the zoom level for d output frames PER INPUT FRAME
  // EVENT, and a looped static image still produces one such event per input
  // frame period. Without an output -t to cap the muxer, ffmpeg tries to
  // generate frames*frames of output before stopping on its own (found by
  // watching a "3 second" clip fail to finish after 2+ minutes, not by
  // reading the filter docs).
  execFileSync("ffmpeg", ["-y", "-framerate", "30", "-loop", "1", "-t", String(seconds), "-i", stillPath, "-vf", vf, "-t", String(seconds), "-an", "-c:v", "libx264", outPath], { stdio: "inherit" });
  return outPath;
}

// Real motion clip, trimmed to a fixed duration with an optional caption.
function videoClipSegment({ videoPath, outPath, seconds, captionText, fontSize, fadeInGuard = 0, fadeOutGuard = 0 }) {
  const enable = captionEnableClause(seconds, fadeInGuard, fadeOutGuard);
  const caption = captionText ? `,${drawtextArg(captionText, { fontSize, enable })}` : "";
  const vf = `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT},fps=30,setsar=1,format=yuv420p${caption}`;
  execFileSync("ffmpeg", ["-y", "-i", videoPath, "-t", String(seconds), "-vf", vf, "-an", "-c:v", "libx264", outPath], { stdio: "inherit" });
  return outPath;
}

// Chains N same-format (resolution/fps/pix_fmt) video-only segments with a
// crossfade between each consecutive pair, then adds one synthesized silent
// audio track across the full result. Offsets follow the standard ffmpeg
// xfade chaining formula: each new offset is the running chain duration
// minus the crossfade length, and the running duration shrinks by the
// crossfade length every time two segments merge.
function chainWithCrossfade(segmentPaths, segmentSeconds, outPath, { transitionSeconds = 0.5 } = {}) {
  if (segmentPaths.length < 2) {
    throw new Error("chainWithCrossfade needs at least 2 segments");
  }
  const inputs = segmentPaths.flatMap((p) => ["-i", p]);
  const filters = [];
  let cum = segmentSeconds[0];
  let prevLabel = "0:v";
  for (let i = 1; i < segmentPaths.length; i++) {
    const offset = cum - transitionSeconds;
    const outLabel = i === segmentPaths.length - 1 ? "outv" : `x${i}`;
    filters.push(`[${prevLabel}][${i}:v]xfade=transition=fade:duration=${transitionSeconds}:offset=${offset}[${outLabel}]`);
    cum = cum + segmentSeconds[i] - transitionSeconds;
    prevLabel = outLabel;
  }
  const videoOnlyPath = outPath.replace(/\.mp4$/, "-video-only.mp4");
  execFileSync(
    "ffmpeg",
    ["-y", ...inputs, "-filter_complex", filters.join(";"), "-map", "[outv]", "-c:v", "libx264", videoOnlyPath],
    { stdio: "inherit" }
  );

  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoOnlyPath, "-f", "lavfi", "-t", String(cum), "-i", "anullsrc=r=44100:cl=stereo", "-t", String(cum), "-c:v", "copy", "-c:a", "aac", "-shortest", outPath],
    { stdio: "inherit" }
  );
  fs.unlinkSync(videoOnlyPath);
  return { outPath, totalSeconds: cum };
}

module.exports = { textCardSegment, stillSegment, videoClipSegment, chainWithCrossfade, WIDTH, HEIGHT };
