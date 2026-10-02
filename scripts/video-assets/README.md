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

## Multiply a finished video into hook variants

Real footage only. The code adds text hooks and end cards; it never generates dogs, people or the home.

1. Write `content/video/<date>/videos.json` with one entry per text hook (leave `script` empty).
2. Render the cards: `NODE_PATH=$(npm root -g) node scripts/video-assets/render.js <date>`
3. Build the videos: `scripts/video-assets/multiply.sh <date> <body.mov> [original-hook.mov]`
4. Output lands in `content/video/<date>/out/` (gitignored). Upload to Drive READY TO POST, then into Meta as one flexible ad per concept.
