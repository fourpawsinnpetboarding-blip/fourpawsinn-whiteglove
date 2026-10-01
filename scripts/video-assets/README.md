# Video asset pack

Graphics and captions for Four Paws Inn vertical videos. Claude builds these so Alex only cuts footage and records.

1. Write `content/video/<date>/videos.json` (copy `content/video/2026-09-28/videos.json`). Mark one word per title with `*asterisks*` for the pink highlight.
2. Run `NODE_PATH=$(npm root -g) node scripts/video-assets/render.js <date>`.
3. Output in `content/video/<date>/assets/`, per video:
   - `-title.png` see through hook card for the first shot, placed clear of the Reels buttons
   - `-end.png` full frame end card with the call to action, for the last 2 to 3 seconds
   - `-cover.png` thumbnail, text kept inside the 4:5 grid crop
   - `.srt` captions, one per short sentence, timed at a normal speaking pace
4. Upload the `.srt` files to the Google Drive batch folder. Send the PNGs to Alex in chat.
5. Captions are timed to the script, not the recording. Alex nudges them to match the final audio in his editor.

Brand rules: `fourpawsinn/business-facts.md` (Visual identity).

## No filmed footage? photo-reel.js builds the whole video

The flow above assumes Alex has a raw clip to cut. When there's no filmed footage but real B-roll stills are on hand, `photo-reel.js` builds the finished reel itself: a slow Ken Burns zoom per photo (ffmpeg, no AI-generated motion), hook burned on the first photo, an optional caption per photo after that. There's nothing left for Alex to edit, just review.

1. Drop the stills in `content/inbox/` (same place every other raw asset goes).
2. Write `content/video/<date>/photo-reels.json`:
   ```json
   {
     "reels": [
       {
         "id": "mon-yard",
         "stills": ["mon-yard-01.jpg", "mon-yard-02.jpg", "mon-yard-03.jpg"],
         "hook": "Rain or shine, the pack still plays.",
         "captions": ["", "Everybody's welcome at the pool.", ""],
         "secondsPerPhoto": 3
       }
     ]
   }
   ```
   `stills` order is playback order. `hook` always burns on the first photo. `captions` is optional and parallel to `stills`; a blank entry means no text on that photo. `secondsPerPhoto` defaults to 3.
3. Run `node scripts/video-assets/photo-reel.js <date>`.
4. Output: `content/video/<date>/photo-reels/<id>.mp4`, ready to upload to Eden as a draft. A missing still is reported by filename and that reel is skipped, never built with a substitute.

This does not render the branded title/end/cover cards `render.js` makes, those assume a separate edit step this flow skips. If Alex wants the cream/pink/charcoal brand treatment on a photo-reel too, that's a follow-up, not yet built.

## Case study reel: the full template, one dog's real story

`case-study-reel.js` is the reusable template for a proper multi-slide case study: text cards, real B-roll of one dog (stills with Ken Burns motion, real video clips as-is), a review-card segment quoting that dog's actual Google review, and real crossfade transitions between every segment, not hard cuts.

1. Write `content/video/<date>/case-study-reels.json`:
   ```json
   {
     "secondsPerSegment": 3,
     "reviewSeconds": 5,
     "transitionSeconds": 0.5,
     "reels": [
       {
         "id": "simba-case-study",
         "dogName": "Simba",
         "segments": [
           { "kind": "text", "text": "Nobody would take this dog.", "backgroundColor": "#000000" },
           { "kind": "photo", "file": "patio-still.jpg", "caption": "German Shepherd. Too big. Too loud." },
           { "kind": "video", "file": "some-clip.mp4", "caption": "Every place said no." },
           { "kind": "review" },
           { "kind": "video", "file": "another-clip.mp4", "caption": "Look who isn't scared." },
           { "kind": "text", "text": "We built a place where every dog is easy. Tell us about your dog. Four Paws Inn, Miramar." }
         ]
       }
     ]
   }
   ```
   `photo`/`video` files resolve under `content/reviews/dogs/<dogName>/`. The `review` segment pulls that dog's actual review from `content/reviews/google-business-reviews.csv`, verbatim, but only when `permission_signed` is true for that row. **Never two `text`-or-`review` segments back to back** - their captions are pre-baked into a static image for the segment's full duration and can't be time-guarded around a crossfade the way a photo or video caption can, so they'll double-expose into an illegible blur during the transition between them.
2. Run `node scripts/video-assets/case-study-reel.js <date>`.
3. Output: `content/video/<date>/case-study-reels/<id>.mp4`. **If the review isn't signed yet, the file is named `<id>-PREVIEW-NOT-FOR-POSTING.mp4` and a placeholder card stands in for the real quote.** Get the client's written permission, flip `permission_signed` to `true` for that row, and re-run - the filename drops the suffix the moment a real signed quote is available.
4. No voiceover yet, text overlay only. A real voiceover track (Alex records and uploads it) is a planned follow-up, not built.

### How the transitions actually work (for whoever extends this next)

Every segment renders as its own small video-only file first (`scripts/lib/reel-template.js`), all 1080x1920/30fps/yuv420p so they're interchangeable. `chainWithCrossfade` then stitches them with ffmpeg's `xfade` filter, standard chaining math: each new crossfade's offset is the running total duration minus the crossfade length, and the running total shrinks by the crossfade length every time two segments merge. A single synthesized silent audio track gets added once, at the end, across the whole result - there's no per-segment audio to crossfade since this template has no voiceover yet.

Captions burn into a photo or video segment's own local timeline, independent of its neighbors. Left alone, two different captions overlap into a blur for the whole crossfade window - this was caught by actually extracting a mid-transition frame and looking at it, not by reading the filter graph. The fix: each caption gets hidden during whichever edge of its segment will be crossfaded (`fadeInGuard`/`fadeOutGuard` in `reel-template.js`), so only one caption is ever on screen at a time. That guard doesn't exist for `text`/`review` cards because their text is baked into a still image for the segment's entire duration, not drawn by a time-aware filter - hence the "never adjacent" rule above instead of a real fix.
