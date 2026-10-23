# Codex review: card style ads and carousel (Oct 23, 2026)

Alex: "Before you publish them I want Codex to oversee it." Nothing is live. Everything below is PAUSED or unscheduled until Codex signs off and Alex says yes.

## What to review
1. **Meta campaign "FPI Card Style Test Oct 2026"** 52665003901324, PAUSED. Ad set "Card Style Round 1 15mi Broad" 52665003929724 (copy of the Newspaper test targeting), $25 a day once on, PAUSED.
   | Ad | ID | Image |
   |---|---|---|
   | AD40 Card Hidden Gem | 52665004020124 | content/ads/statics/2026-10-23-cardstyle/jpg/AD40-CS1-HIDDEN-GEM-CutA.jpg |
   | AD41 Card Drop Off | 52665004138324 | AD41-CS2-DROP-OFF-CutA.jpg |
   | AD42 Card No Hidden Fees | 52665004158924 | AD42-CS3-NO-HIDDEN-FEES-CutA.jpg |
   | AD43 Card Elaine Review | 52665004173724 | AD43-CS4-ELAINE-REVIEW-CutA.jpg |
   | AD44 Card Real Home | 52665004198924 | AD44-CS5-REAL-HOME-CutA.jpg |
   All on lead form 1479678017305071, CTA Book Travel, headline "Home dog boarding in Miramar".
2. **Organic carousel** content/carousels/2026-10-23-five-questions/ (7 slides, png/ folder, caption in slides.json). Not scheduled yet.

## Check each one for
1. Facts match fourpawsinn/business-facts.md: $60 a day under 50 lb, $75 over, 230+ five star reviews, one daily video, outside every hour, pool time, no hidden fees, small groups, free roam.
2. Is "Drop off takes about 20 seconds" true? Is Elaine P.'s quote word for word from her Google review?
3. No dashes, no "safe", no health claims, no discounts, no dog counts.
4. Photos are real and unedited, and each one matches its headline (AD41 shows Amanda inside, not a car: keep or swap?).
5. Text readable at phone size. Preview each ad in Ads Manager on feed, Stories and Reels placements.
6. Anything you would build better. Your newspaper ads beat mine before. Steal from them.

## Known risk (Claude's own flag)
Our 9 clean cream branded statics (AD09 to AD32) got under $17 spend each and 0 to 1 leads. Meta barely served them. The winner looks like native local news. The card style is cleaner, so it may get the same weak delivery. That is why it is a separate $25 test, not a replacement for the winner or the newspaper test.

## How to sign off
Write PASS or FIX (with the exact change) per ad and for the carousel on the Eden board row "Codex review: card style ads + carousel". If you fix a creative, render it with scripts/carousel-cardstyle/render.js and log the new image. Do not switch anything on. Alex gives the final yes.
