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
| AD07-KENNEL-VS-HOME-CutA | Contrast | Your dog doesn't need a kennel while you travel. They need a home. At Four Paws Inn, dogs stay cage free in a real home in Miramar. They play outside every hour. You get photos and videos every day. Tap to check your dates. |
| AD08-NO-UPDATES-CutA | Pain: worry on the trip | Going away soon? You should not spend your trip wondering how your dog is doing. We send photo and video updates every day. So you can relax. Tap to check your dates. |
| AD09-ASK-5-QUESTIONS-CutA | Guide with questions | Before you book any boarding, ask these 5 questions. Is it cage free? How often do dogs go outside? Will I get photos and videos? How do you add new dogs to the group? Can I read real reviews? Our answers: yes, every hour, every day, slowly, and 230+ on Google. Tap to check your dates. |
| AD10-WHAT-DO-YOU-WANT-CutA | Self convince checklist | What do you want for your dog while you're away? A real home. Play outside every hour. Photos and videos every day. A team that learns their name and habits. If you checked all four, send us your dates. |
| AD11-60-A-DAY-STACK-CutA | Value stack, price shown | $60 a day for dogs under 50 lb. Here is what's in it: a real home, outside play every hour, daily photo and video updates, beds and supplies, supervised pool time, and a slow intro to the group. Pick up before 10 AM and your last day is free. Tap to check your dates. |
| AD12-ONE-NIGHT-FIRST-CutA | First overnight offer | Nervous about your dog's first stay? Start with one night. Your dog learns the house, the pack and our team. So the big trip feels familiar. Tap to check your dates. |
| AD13-REVIEWS-PROOF-CutA | Proof | Don't take our word for it. 4.9 stars from 230+ dog parents in Miramar and Pembroke Pines. Read the reviews, then tap to check your dates. |

Fact check: every claim is in `fourpawsinn/business-facts.md` (cage free home, outside every hour, daily photo and video updates, beds and supplies, supervised pool, slow group intro, $60 / $75 / $80, last day free before 10 AM, first overnight wording, 230+ reviews). No dog counts, no safety or health claims, no dashes.

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
