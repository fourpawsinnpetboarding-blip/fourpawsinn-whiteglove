# Morning post engine (7:30 AM slot)

One Four Paws Inn post per day, every day, at 7:30 AM Eastern on Instagram and Facebook. Claude owns this slot end to end: plan, write, design, render, upload, schedule. Codex owns the 6:30 PM slot. Neither touches the other's slot.

Approved by Alex on 2026-09-28 as a standing exception to the "draft only" rule in `CLAUDE.md` section 10. It covers this slot only. Every other rule still applies.

## Goal

Qualified boarding inquiries. Every post must either make a stranger trust us as the authority on dogs, or give a pet parent a reason to send their dates.

## Weekly mix (7 posts)

Aim for 3 carousels and 4 statics. Rotate through these pillars:

1. **Parent psychology.** Take a real parenting pain point (school drop off, first sleepover, guilt, school friends, routines) and translate it to pet parents. Source material: the Eden notes "Creators to Watch", "Top 2 Reverse Engineering", "Research batch — guilt, solidarity, emotional inheritance" in the Four Paws Inn workspace.
2. **Dog behavior science.** Teach something real. Cite the source on the slide and in the caption (AKC, ASPCA, AVMA, VCA, PBS NOVA). If you cannot name a credible source, do not post the fact.
3. **Fun facts.** Built for saves and shares.
4. **Reviews.** Real Google review text only, quoted word for word (trimming with "..." is fine). First name plus last initial.
5. **Review wall.** Three short quotes on one image, usually Sunday.

## Hard rules

- Read `fourpawsinn/business-facts.md` first. Never invent a policy, price, availability or care detail.
- No claims about a dog's health, safety guarantees, or medical outcomes.
- No em dashes or stray hyphens in any copy. 3rd grade reading level.
- Default CTA: "If you're near Miramar or Pembroke Pines and need boarding, send us your dates and tell us about your dog."
- Before planning, list what Codex has scheduled at 6:30 PM that week (`eden_list_scheduled_posts`) and do not repeat its topics or reviewers.
- Read `content/morning/ledger.json`. Do not repeat a topic, fact or reviewer used in the last 8 weeks. Append the new week when done.
- Design: the evergreen, cream and marigold system in `render.js`. Do not copy the Codex pink and cream look.

## Steps

1. **Reviews.** The CSV is gitignored. Restore it if missing:
   `git show 2c6194c:content/reviews/google-business-reviews.csv > content/reviews/google-business-reviews.csv`
   (Refresh from a new Google Business export when Alex provides one.)
2. **Plan and write** `content/morning/<monday-date>/week.json`. Copy the shape of `content/morning/2026-09-28/week.json`. Slide types: `hook`, `point`, `stat`, `quote`, `wall`, `cta`. Themes: `dark`, `cream`, `gold`. Wrap one word in `*asterisks*` for the accent serif.
3. **Render.**
   `NODE_PATH=$(npm root -g) node scripts/morning-posts/render.js <monday-date>`
   Then open `content/morning/<monday-date>/contact-sheet.png` and look at every slide at full size. Fix overflow or collisions before uploading.
4. **Upload.** For each PNG, call `eden_prepare_scheduling_media_upload` (image/png, exact byte size), then PUT the file to the returned `uploadUrl` with curl and `Content-Type: image/png`. Signed URLs expire in 15 minutes, so upload in batches of about 7.
5. **Schedule.** `eden_schedule_post` in workspace `1c2438f9-e773-4786-a8cb-121504399872`, schedule `6a07d7c7-8da0-4018-9b7f-6db1e423f3cd`, platforms instagram and facebook, `scheduledAtIso` = `<date>T07:30:00-04:00` (use `-05:00` after daylight saving ends on the first Sunday of November), idempotency key `fpi-morning-<date>`.
6. **Record.** Write each `edenPostId` into `week.json`, append the week to `ledger.json`, commit, push.
7. **Report to Alex.** One line per day, the contact sheet, and the Eden link to cancel anything he does not like.

## Why HTML to PNG and not Higgsfield

Text heavy graphics come out exact and on brand every time with HTML, and rendering costs nothing. Save Higgsfield credits for motion and B roll. Fonts are embedded from `scripts/morning-posts/fonts/`, so rendering never depends on network access.
