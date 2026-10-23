# Reel covers and the profile grid (Alex, Oct 23, 2026)

Alex: "I want a very intentional reel, especially the cover image. It must be clean. A card in our new format for the cover, so the profile reads like a message or a story line."

## Rule: every noon reel gets a card style cover
1. Make it in `content/covers/<week>/slides.json` with `"story": true` (1080x1920). One slide per reel: eyebrow, a title of 6 words or fewer with one highlighted word, one real photo.
2. The card sits inside the center 1080x1440, so the 3:4 profile grid crop shows the whole card. Never put text in the top or bottom 240 px.
3. Render: `NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js content/covers/<week>`
4. Host the JPEG on Eden and attach it with `eden_update_scheduled_post`, `perPlatform.instagram.coverUrl` and `perPlatform.facebook.coverUrl` (same URL). The video itself is unchanged.
5. Wed and Sat carousels already lead with a card, so the whole grid matches.

## Rule: the grid reads as one page
- Same frame on every tile: cream page, white card, charcoal border and shadow, eyebrow on top, bold title, photo below.
- No photo repeats within 9 tiles (one screen of the profile).
- The 9 visible titles should read as a set of questions a nervous dog parent asks: who watches my dog, how does drop off work, what's included, is my dog too shy. Plan the week's titles together before rendering.
- Build `grid-preview.png` (3 by 3, newest top left, 3:4 crops) and check it before scheduling.

## Week of Oct 24
Covers attached to reels b667ea3c (Oct 24), 8cb51a58 (Oct 25), cbcca856 (Oct 26), b6ba9f2a (Oct 27), a948e36a (Oct 29), 4d7d0309 (Oct 30), 7afb9b9a (Nov 1). Carousels Oct 28 (Happy parents) and Oct 31 (Pickup moment).
