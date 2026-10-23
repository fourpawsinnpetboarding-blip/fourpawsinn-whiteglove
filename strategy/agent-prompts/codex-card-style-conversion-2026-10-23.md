# Codex: convert your scheduled 4 PM posts to the card style (Alex, Oct 23, 2026)

Alex: "Any content we have scheduled for the future that you created, I want back and changed to this style." Claude converted all 9 of its 7:30 AM posts (Oct 24 to Nov 1). Do the same for your 4:00 PM posts. Pull branch `claude/tool-identification-nd2ifl` first.

## Your posts to convert (Eden schedule 6a07d7c7, Instagram + Facebook)
| Air (ET) | Post id | Now |
|---|---|---|
| Fri Oct 23, 4 PM | db5b2577-184c-40d6-a1e3-2905f707a09a | 4 photo carousel, zoomies |
| Sat Oct 24, 4 PM | 8ec1b3d2-936c-4cbf-88ae-1e7a24c1df42 | single image, exotic pets |
| Sun Oct 25, 4 PM | e45d87f0-2996-495b-83ee-3d390bd7ee28 | single image, coming back |
| Mon Oct 26, 4 PM | b70ef370-e1a4-4ae1-ab2f-ffe2b210f1cb | 6 slide carousel, slow intro |
| Tue Oct 27, 4 PM | 62eca356-dd0f-4101-ad5e-5aa8a648ae0d | single image, no extra fees |
| Wed Oct 28, 4 PM | 68ed4a22-f047-4da8-8055-16853a636fca | 7 slide carousel, packing |
| Thu Oct 29, 4 PM | 988ad39b-e161-44aa-ab88-168b8354deed | single image, sleepaway camp |
Run `eden_list_scheduled_posts` (status scheduled) to confirm the ids and catch any later ones. Leave reels (videos) alone. Only statics and carousels change.

## Exactly what Claude did (copy it)
1. **Read the old post** with `eden_list_scheduled_posts` mode full and postId. Keep the topic and the caption idea.
2. **Make a folder** `content/carousels/YYYY-MM-DD-slug/` with a `slides.json`:
   ```json
   {"post_id": "<eden id>", "caption": "...", "slides": [
     {"eyebrow": "Short label", "title": "Headline with ==*one key word*==.", "photo": "../../brand/maps-photos/yard-run.jpg", "lead": "**Bold first line.** Plain rest.", "swipe": true},
     {"eyebrow": "Real Google review", "quote": "Exact words from the review.", "by": "First name, last initial.", "photo": "...", "button": "Send us your dates"}
   ]}
   ```
   Markup: `==word==` pink highlighter, `*word*` serif italic, `**word**` bold. Fields: eyebrow, title, titleSize, lead, body, list, listSize, photo, quote, quoteSize, by, button, note, swipe.
3. **Render:** `NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js content/carousels/<folder>`. It writes `png/NN.png` (1080x1350) and `contact-sheet.png`.
4. **QA the contact sheet:** no half empty cards, one or two highlighted words per slide, text readable at phone size, the photo matches the headline, single image posts show "MIRAMAR, FL" in the footer (automatic).
5. **Export JPEG** (`ffmpeg -i png/01.png -q:v 2 jpg/01.jpg`), host each with `eden_prepare_scheduling_media_upload` then an HTTP PUT of the file to the returned uploadUrl (Content-Type image/jpeg).
6. **Swap into the same post** with `eden_update_scheduled_post` (postId, new `text`, new `media` array of the publicUrls with width 1080, height 1350). Same time, same platforms. Do not cancel and recreate.
7. Save the hosted URLs back into `slides.json` as `"hosted": [...]`, commit, push, and mark your Eden row Done.

## Rules that still apply
- Real photos only, never redrawn. Shared photos: `content/brand/maps-photos/`, `content/carousels/2026-10-23-five-questions/photos/`, `content/brand/apple-maps-cover-yard-1600x1040.jpg`. Add new real photos to the folder you use.
- Review quotes word for word from `content/reviews/google-business-reviews.csv`. Trim with "..." only, never reword. Skip any part that says "safe", or "pics" or "pictures" (the offer is one daily video).
- Facts from `fourpawsinn/business-facts.md`. No dashes, no health or safety claims, no dog counts, no discounts.
- Drop off and pick up windows: 9 AM to 12 PM or 4 PM to 6:30 PM. Meet and greets: Tuesdays 9 AM to 7 PM, always optional.

## Examples to open
- 7 slide carousel: `content/carousels/2026-10-23-five-questions/`
- Reviews carousel: `content/carousels/2026-11-01-happy-parents/`
- Single image: `content/carousels/2026-10-29-craig-review/`
- Text only slides: `content/carousels/2026-10-28-head-tilt/` (slides 2 to 4)
- Full spec: `content/statics/static-baseline-system.md` section 9.
