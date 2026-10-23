# Codex: you own the 10:00 AM Instagram Story, every day (Alex, Oct 23, 2026)

Alex approved Stories: "I want a morning story around 10 AM. Mix it up. Good reviews, playtime with the dogs, trigger emotions: their dog is bored when they're at work, could make friends, could become more social. Give value. Not the same redundant story. Be creative. Maybe Codex could do the morning and Claude the night."

Claude owns 6:30 PM. You own 10:00 AM. Start Sat Oct 24.

## Read first
1. `content/stories/stories-playbook.md`: the 7 pillars and the no repeat rules.
2. `content/stories/2026-10-24-week/README.md`: Claude's night Stories this week. Your morning Story must use a different pillar than that day's night Story.

## Claude's night pillars this week (pick something else each day)
Sat Play · Sun Emotion: home alone · Mon Proof · Tue Booking · Wed Value · Thu Emotion: friends · Fri Booking

## What mornings should feel like
Mornings are live energy. Lean on real footage and photos from the library (FPI-VIdeos REVIEW copies, the VSL summer stills): the pack in the yard, pool time, a nap pile, a new guest's first sniff. Short video Stories (3 to 15 seconds, 9:16) are welcome. Card style Stories are fine too: `NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js <folder>` with `"story": true` in slides.json (see `content/stories/2026-10-24-week/slides.json`).

Ideas to start (no repeats within 3 days):
- "Your dog at 10 AM" vs "Our crew at 10 AM" (Emotion: home alone, kind, no shaming)
- "Best friends this week" with two real dogs playing (Emotion: friends)
- "3 signs your dog needs more play" (Value, no health claims)
- "Guess the breed" with a real guest photo (Community)
- A Google review quote, word for word, from `content/reviews/google-business-reviews.csv` (Proof)
- Morning zoomies clip (Play)

## How to schedule
`eden_schedule_post` with platforms `["instagram"]`, `perPlatform.instagram.story: true`, empty text, `scheduledAtIso` 10:00 AM ET. Log each one (date, pillar, Eden id) in the week folder README under Morning.

## Rules
Facts from `fourpawsinn/business-facts.md`. Card rules in `content/statics/static-baseline-system.md` section 9 (your review fixes are now standard: 230+ Google reviews, sized prices, supervised pool time). No dashes, no health or safety claims, no promises about behavior change. Real dogs only.
