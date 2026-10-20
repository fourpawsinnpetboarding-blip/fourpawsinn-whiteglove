# Static ad concepts: Round 2 statics (whiteboard style)

Source: Alex, Oct 15 2026. He flagged a Hormozi Acquisition.com static ("You can never convince someone. You can only guide them through questions...") and asked for this style and others in the Meta static image campaign.

Images: `content/ads/statics/2026-10-15/` (1080 x 1350, 4:5 feed). Contact sheet: `contact-sheet.jpg` in the same folder.
Renderer: `python3 scripts/static-ads/render.py` (all) or `python3 scripts/static-ads/render.py AD09` (one).

## Why this style

Hormozi's ad is three parts: a small audience label, one big statement, and a stick figure doodle that shows the idea in one second. It looks hand made, so it reads as a note, not an ad. The doodles carry the idea, which is why we can draw them in code without breaking the rule against AI images of dogs, people or the home.

The principle in his headline is the brief: do not push "book now". Ask questions so the dog parent convinces themselves. AD09 and AD10 do that directly.

Brand: same cream, pink and charcoal, same wordmark bar and handle. One change: headlines use a hand lettered font (Amatic SC) instead of Source Serif, because the hand made look is what is being tested. If the style wins, keep it as an approved ad variant in `fourpawsinn/business-facts.md`.

## The 7 ads

Headline (all): Check your dog's boarding dates
CTA: Book now (same lead form as Static Reviews, "Fall and Holiday Boarding 2026")

| File | Angle | Primary text |
|---|---|---|
| AD07-KENNEL-VS-HOME-CutA | Contrast | Your dog doesn't need a kennel while you travel. They need a home. At Four Paws Inn, dogs stay cage free in a real home in Miramar. They play outside every hour. You get a video every day. Tap to check your dates. |
| AD08-NO-UPDATES-CutA | Pain: worry on the trip | Going away soon? You should not spend your trip wondering how your dog is doing. We send video update every day. So you can relax. Tap to check your dates. |
| AD09-ASK-5-QUESTIONS-CutA | Guide with questions | Before you book any boarding, ask these 5 questions. Is it cage free? How often do dogs go outside? Will I get a daily video? How do you add new dogs to the group? Can I read real reviews? Our answers: yes, every hour, every day, slowly, and 230+ on Google. Tap to check your dates. |
| AD10-WHAT-DO-YOU-WANT-CutA | Self convince checklist | What do you want for your dog while you're away? A real home. Play outside every hour. A video every day. A team that learns their name and habits. If you checked all four, send us your dates. |
| AD11-60-A-DAY-STACK-CutA | Value stack, price shown | $60 a day for dogs under 50 lb. Here is what's in it: a real home, outside play every hour, a daily video update, beds and supplies, supervised pool time, and a slow intro to the group. Pick up before 10 AM and your last day is free. Tap to check your dates. |
| AD12-ONE-NIGHT-FIRST-CutA | First overnight offer | Nervous about your dog's first stay? Start with one night. Your dog learns the house, the pack and our team. So the big trip feels familiar. Tap to check your dates. |
| AD13-REVIEWS-PROOF-CutA | Proof | Don't take our word for it. 4.9 stars from 230+ dog parents in Miramar and Pembroke Pines. Read the reviews, then tap to check your dates. |

Fact check: every claim is in `fourpawsinn/business-facts.md` (cage free home, outside every hour, a daily video update, beds and supplies, supervised pool, slow group intro, $60 / $75 / $80, last day free before 10 AM, first overnight wording, 230+ reviews). No dog counts, no safety or health claims, no dashes.

## Launch plan (needs Alex's yes)

Baseline to beat: Static Reviews CPL (cost per lead: spend divided by leads) about $18 to $20 over the last 2 weeks (scoreboard Oct 12: $17.66).

Recommended: new ad set "Statics R2 Whiteboard" inside the main campaign "New Dog Ad Vid/Image", copy of the live ad set's targeting, $20 a day, all 7 ads, 7 days. Static Reviews keeps running untouched, so its learning does not reset.
Judge on day 7: CTR (click through rate) first, then CPL. Any ad under $20 CPL with 3+ leads stays. Anything over $34 CPL after $35 spend is paused. The winner gets Cut B (new headline, same layout).

Who builds: Claude through Windsor after Alex approves, same as Round 1 (`strategy/reports/meta-round1-build.md`). Images are hosted on Eden public URLs for the upload.

## Next styles to test (Round 3 backlog)

1. Real photo plus handwritten note: a real frame from our footage with a marker style caption. Needs frames from the footage library.
2. iPhone Notes screenshot: "Things I wish I knew before boarding my dog", written by Alex.
3. Real Google review screenshot: real reviews only, with the reviewer's name cropped. Alex picks the reviews.
4. Founder card: Alex's real photo with one line in quotes, Hormozi ad layout.
5. This vs that table: "What $60 a day gets you", two columns, no competitor names.
6. Holiday urgency: only with real open dates from Amanda, never invented scarcity.

---

# Set 2 (Oct 15 2026, later): reviews first, authority, new styles

Alex's direction: lead with reviews, best rated and testimonials (top performer, and Hormozi's top two: reviews and proof of authority), then test new styles. At least 25 statics in the campaign.

Renderer: `python3 scripts/static-ads/render2.py` (imports render.py). Same output folder. Contact sheet covers all 23.

## Audit of what is running (Windsor, last 30 days, Oct 15)

| Ad | Type | Spend | Leads | CPL | CTR | Freq |
|---|---|---|---|---|---|---|
| Static Reviews | the only static | $1,085 | 57 | $19.04 | 2.9% | 1.19 |
| Video Introductions | video | $54.92 | 2 | $27.46 | 3.9% | 1.07 |
| R1 C4 Drop off (paused) | video | $75.45 | 8 | $9.43 | 7.1% | 1.11 |

Read:
1. Static Reviews is the workhorse: 57 of the account's leads. Keep it running, do not edit it (edits restart learning).
2. Its live copy is out of date and breaks current rules: "173 five-star reviews" (now 230+), "$60/night" (we charge by day), "safe haven" and "stress-free" (no safety claims), "limited spots available" and "Limited Spots Left This Month!" headline (invented scarcity). Fix by duplicating, not editing: AD29 is the refreshed version, plus a straight duplicate of the same image with corrected copy (Codex, below).
3. One static against the whole account is the gap. Meta has nothing else to rotate to when it fatigues.

## Eden research: what long running statics do (Meta Ad Library via Eden)

Run days are the proof: brands only keep paying for winners.
- Rating number as the headline: Runna "rated 4.9/5 ... from over 100k reviews" (143 days, 238 variations), Milan Laser "4.9 average rating" (28 days, 8 variations), Symple "Rated 4.9 over 3,600+ Reviews", Monos "50,000+ 5-star reviews" (201 days). This is AD21, AD23, AD29.
- Single customer quote with stars: Athlean-X and Gorilla Mind lead with one quote and five stars (60 and 95 days). This is AD14, AD15, AD17, AD18.
- Founder or expert story in plain words: Uproot Clean's "I'm Danny, 19 years repairing washers" statics run 150 to 225 days. This is AD22 now, and the Codex founder card next.
- Blunt contrast line: The Farmer's Dog "Dog food should be food, not burnt brown balls" (200 days). This is AD07 and AD28.
No local boarding competitor in the index runs statics long enough to learn from; the patterns above transfer.

## Set 2 ads (AD14 to AD29)

Headline (all): Check your dog's boarding dates. CTA and form same as Static Reviews.

| File | Group | Primary text |
|---|---|---|
| AD14-REVIEW-NO-CRATE | Review | "I didn't want my dog crated." That's what Marietta told us. At Four Paws Inn, dogs stay cage free in a real home in Miramar. 4.9 stars from 230+ Google reviews. Tap to check your dates. |
| AD15-REVIEW-PHOTO-CAGELESS | Review | Mark watched the daily videos while he was away. He could see his dog having a great time playing with the other dogs, in a real home, no cages. Read the 230+ reviews, then tap to check your dates. |
| AD16-REVIEW-WALL | Review | 230+ dog parents in Miramar and Pembroke Pines left us a Google review. 4.9 stars. Here are a few. Tap to check your dates. |
| AD17-REVIEW-FIRST-TIME | Review | First time boarding your dog? It was Freddy's first time too. Here is what he said after. Tap to check your dates and tell us about your dog. |
| AD18-REVIEW-DIDNT-WANT-TO-LEAVE | Review | "Pups did not want to leave at all." Elaine, Google review. Cage free home boarding in Miramar. Tap to check your dates. |
| AD19-REVIEW-DAILY-VIDEOS | Review | You get video update every day your dog is with us. Here is what dog parents say about them. Tap to check your dates. |
| AD20-REVIEW-WE-WILL-BE-BACK | Review | The line we read most in our reviews: "We'll definitely be back." Tap to check your dates. |
| AD21-RATING-BADGE-PHOTO | Proof | 4.9 stars from 230+ dog parents on Google. Cage free home boarding in Miramar. Tap to check your dates. |
| AD22-AUTHORITY-EXPERIENCE | Authority | Who watches your dog matters. Our team has spent thousands of hours with every kind of breed and personality, and has managed packs of dogs for years. Every new dog gets a slow, careful intro. Tap to check your dates. |
| AD23-AUTHORITY-NUMBERS | Proof | 4.9 stars. 230+ Google reviews. Outside to play every hour. A video update every day. Tap to check your dates. |
| AD24-NOTES-APP | New style | Before you board your dog, check these boxes. Cage free. Outside more than twice a day. A daily video. Real reviews. Last day free if you pick up before 10 AM. We check every one. Tap to check your dates. |
| AD25-COMPARE-TABLE | New style | Before you book any boarding, compare. Here is what we include. Ask the other place the same questions. Then send us your dates. |
| AD26-PHOTO-THEIR-TRIP | New style | Your trip can be fun for your dog too. Cage free, in a real home, outside to play every hour. Tap to check your dates. |
| AD27-HOLIDAY-DATES | New style | Thanksgiving, Christmas and New Year dates go first every year. Send us yours now. New dog? Book one overnight first, so the big stay feels familiar. Tap to check your dates. |
| AD28-PHOTO-NOT-A-KENNEL | New style | This is the yard. Not a kennel run. Dogs go outside to play every hour. Tap to check your dates. |
| AD29-STATIC-REVIEWS-REFRESH | Review refresh | 4.9 stars from 230+ Google reviews. Cage free home boarding in Miramar. Outside to play every hour. A daily video update. $60 a day for dogs under 50 lb, and your last day is free if you pick up before 10 AM. Tap to check your dates. |

Rules checked: quotes are word for word from `content/reviews/google-business-reviews.csv` (spelling kept as written), first name and last initial only, no dog counts, no safety or health claims, no invented scarcity, no dashes. Photos are real library frames (`content/ads/statics/photos`, clip id in the file name).
Flag: AD28 shows a team member from LIB-0003. Alex confirms the person is fine to feature (staff waivers cover employees; no children in any frame).

## Campaign roster: 30 statics

| # | Source | Ads |
|---|---|---|
| 1 | Keep live | Static Reviews (untouched) |
| 23 | Claude | AD07 to AD29 |
| 6 | Codex | Static Reviews duplicate with corrected copy; 2 real Google review screenshots; founder card with Alex's real photo; 2 photo statics from the best SSD stills |

## Launch plan (needs Alex's yes)

New ad set "Statics R3 Oct 2026" inside "New Dog Ad Vid/Image", same targeting as the live ad set, $30 a day, 7 days. Static Reviews stays in its own ad set untouched.
Judge day 7: keep any ad under $20 CPL with 3+ leads; pause anything over $34 CPL after $35 spend; winners get a Cut B.
Built by Claude through Windsor after Alex approves. Images hosted on Eden public URLs.

## Not used, and why
- Higgsfield: our rules ban AI images of dogs, people, the home and yards. Real photos and code drawn doodles beat abstract AI art for a local service. Use Higgsfield only for motion versions of a winning static later.
- Canva: not connected in this session (needs authorization in claude.ai connector settings). Not needed for this batch.

## LAUNCHED Oct 17 2026 (Alex: "Launch")

Existing ad set "New Dog Ad -Vid/Image" (52586440814124), same budget, next to Static Reviews. All ACTIVE. Copy uses the qualifying formula (who it is for, price up front, paid first overnight, Amanda texts back). Form 1479678017305071. UTMs on every ad.

| Ad | Meta ad ID |
|---|---|
| AD14 No crate (Marietta) | 52663260923724 |
| AD15 Mark review + photo | 52663260926124 |
| AD18 Did not want to leave (Elaine) | 52663260943924 |
| AD29 Static Reviews refresh | 52663260949724 |
| AD21 4.9 badge + photo | 52663260962724 |
| AD22 Thousands of hours | 52663260967724 |
| AD09 Ask 5 questions | 52663261010724 |
| AD31 Allison, shy dog (Codex) | 52663259410524 |
| AD32 Yesenia, updates (Codex) | 52663259421924 |

Pending: AD34, AD35 (corrupted files, Codex re-saving), AD30, AD33 (unfinished).
Review Oct 24 (day 7): judge by cost per booked stay, then CPL. Pause any ad over $34 CPL after $35 spend.

## Correction Oct 17 2026 (Alex): no mandatory paid overnight

Alex: "I do NOT want a mandatory paid overnight for new dogs." Removed "Every new dog starts with one paid overnight so the house feels familiar." from all 9 launched ads. Nothing put in its place. All 9 PAUSED, ad text edited in place (same ad IDs, no duplicates), waiting for Alex's OK to turn back on. Budget, targeting and other ads untouched. Images contain no overnight wording.
New creatives: AD14 4730492243863158, AD15 1622411866026750, AD18 1086703484152825, AD29 2216369892263102, AD21 1644912667081513, AD22 1137980245797330, AD09 1809544196835141, AD31 2008503049835424, AD32 2030307790967150.
The qualifying formula is now: hook, who it is for, price up front, "Tap to check your dates. Amanda will text you back."

## Oct 17 2026, second correction (Alex): no discounts, no free days, 3 copy angles

Removed every free or discount line. AD29 image re-rendered without "last day free" (new image uploaded). Ads stay PAUSED until Codex finishes the GHL cleanup row and Alex approves.
Copy test, 3 sets of 3 (same images, different body):
- Set 1 TRUST (AD14, AD18, AD31): 230+ Google reviews, real home, cage free, outside every hour, a daily video daily, price.
- Set 2 PREMIUM CARE (AD15, AD22, AD32): no kennel run, our home, real beds, every stay planned around your dog's energy and routine, price.
- Set 3 NOT THE CHEAPEST (AD29, AD21, AD09): "We are not the cheapest boarding in Miramar. We are the place families come back to." Price, "If that fits your dog, tap to check your dates."

## Oct 17 2026: 9 ads back ON (Alex: "On now")
All 9 re-enabled with the approved 3 angle copy, no discount or free wording. Second dog $5 a day off stays as a price (Alex). Review Oct 24.

## Oct 17 2026: copy enhanced live (Alex: "enhance them with the updated context")
Added: no hidden fees, the price you see is the price you pay, small groups on purpose, one on one bond first, slow intro for shy dogs, curbside hand off (most families never leave their seat). No "safe" wording. Same 3 angles, same ad IDs, all still ACTIVE.

## Set 3 replacements (AD36 to AD38), built Oct 17, HELD for Wed Oct 21
Alex: "Only swap bad performing ad creatives." Renderer: scripts/static-ads/render3.py. Preview: content/ads/statics/2026-10-15/set3-preview.jpg
- AD36 No hidden fees: two receipts (other places: $50 a night plus extra play, toy time, required baths; ours: $60 a day, nothing added at pick up). No competitor named.
- AD37 Curbside: "Pull up. Text us. We bring your dog to your car." Most families never leave their seat. In and out in about 20 seconds. Real curbside photo LIB-0027 (Alex's son, approved Oct 17; woman cropped out).
- AD38 Sketchbook slow intro: one on one, quiet time, small group only when ready.
Swap rule for Oct 21: an ad is "bad" if it spent $35+ with 0 leads, or its CPL is over $34. Only those get replaced, one new ad per bad ad. If no ad is bad, nothing is swapped and these wait.
- AD28 cleared (Alex, Oct 17: the young man is his son, approved for ads). Can join the next round.
