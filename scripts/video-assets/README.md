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
