# Reel covers and the profile grid (Alex, Oct 23, 2026)

Alex: "I want a very intentional reel, especially the cover image. It must be clean. A card in our new format for the cover, so the profile reads like a message or a story line."

## Rule: every noon reel gets a card style cover
1. Make it in `content/covers/<week>/slides.json` with `"story": true` (1080x1920). One slide per reel: eyebrow, a title of 6 words or fewer with one highlighted word, one real photo.
2. The card sits inside the center 1080x1440, so the 3:4 profile grid crop shows the whole card. Never put text in the top or bottom 240 px.
3. Render: `NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js content/covers/<week>`
4. Host the JPEG on Eden and attach it with `eden_update_scheduled_post`, `perPlatform.instagram.coverUrl` and `perPlatform.facebook.coverUrl` (same URL). The video itself is unchanged.
5. Wed and Sat carousels already lead with a card, so the whole grid matches.

## The look, spelled out (Alex, Oct 27: for Codex and anyone new)
1. Cream background, #FAF7F3.
2. One white card in the middle with rounded corners, a thick charcoal border (#353532) and a hard offset shadow down and to the right. No soft blur.
3. Eyebrow at the top of the card: a small dot, then a short UPPERCASE label in spaced letters on a pink (#E6A0A3) bar. 2 to 4 words, for example "SUPERVISED POOL TIME", "WATCH TILL THE END".
4. Headline: big, bold, charcoal, 6 words or fewer. One key word in italic serif with a pink highlight bar behind it, for example "Tiny dog. Big *pool*." Markup in slides.json: ==*pool*==.
5. A real still frame from the reel in a rounded frame with the same border and shadow. Never AI.
6. Footer under the card: "FOUR PAWS INN" left, "MIRAMAR, FL" right, small spaced capitals.
7. No reel publishes without its cover attached. Check the grid at phone size before air time.

## Rule: the grid reads as one page
- Same frame on every tile: cream page, white card, charcoal border and shadow, eyebrow on top, bold title, photo below.
- No photo repeats within 9 tiles (one screen of the profile).
- The 9 visible titles should read as a set of questions a nervous dog parent asks: who watches my dog, how does drop off work, what's included, is my dog too shy. Plan the week's titles together before rendering.
- Build `grid-preview.png` (3 by 3, newest top left, 3:4 crops) and check it before scheduling.

## Week of Oct 24
Covers attached to reels b667ea3c (Oct 24), 8cb51a58 (Oct 25), cbcca856 (Oct 26), b6ba9f2a (Oct 27), a948e36a (Oct 29), 4d7d0309 (Oct 30), 7afb9b9a (Nov 1). Carousels Oct 28 (Happy parents) and Oct 31 (Pickup moment).

## Cover rows on the Eden board (Alex, Oct 27)
Every noon reel gets one "Cover:" row on the Eden board: date, post id, suggested eyebrow and title. Codex corrects the words there; Claude renders, attaches and marks it Done before air time. The daily board check adds a row for any reel in the next 7 days that has none.
