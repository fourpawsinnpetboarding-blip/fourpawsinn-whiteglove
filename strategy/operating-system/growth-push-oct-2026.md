# Growth push: 3x creative testing (Alex, Oct 23, 2026)

Alex: "We have credit on Higgsfield. Make story posts with it, better reels using Amanda's face with lip sync and better hooks. If we need footage from Higgsfield, use it. Trending videos, use it. Test different creatives. Push the volume we try times two, times three. Push on the gas."

## The math
- Higgsfield balance Oct 23: **1,648 credits**. A 5 second AI clip costs **35 credits** (seedance 2.5). That is about 47 clips.
- Weekly cap (Alex, Oct 23: "do not overkill the credits, just a few"): **3 AI clips a week, about 105 credits**, plus Amanda lip sync. The balance lasts months, not weeks. The extra test volume comes from free text hook versions, not credits.
- Today: 7 reels a week at noon. Target: **21 reel tests a week** (3x).

## Where the 3x goes (what changed vs the ask, and why)
1. **Volume goes into Trial Reels, not the feed.** A Trial Reel (Instagram shows it to non followers only) doesn't touch follower reach, and our feed is at 8th percentile engagement. So each noon reel gets 2 extra hook versions as Trial Reels: 7 feed + 14 trials = 21 tests a week. The winning hook becomes the next week's feed reel. Changed because 21 feed posts a week would train Meta that our followers ignore us.
2. **Credits buy hooks, not whole videos.** One 5 second AI opener (a person, a moment, a feeling) cut onto real footage of our dogs. 35 credits per test instead of 150+ for a full AI reel. Added because the first 3 seconds decide views.
3. **No AI dogs.** AI redraws dogs and our rule is real dogs only. AI plays the people (the parent at work, at the airport, on the couch); our footage plays the dogs. Every reel with AI people says "Dramatization with AI actors. Real dogs, real home." in the caption.
4. **Amanda lip sync:** Amanda is adding her own voice to Higgsfield (Alex, Oct 23). Codex still pulls her door clip. 5 scripts approved (`content/video/amanda-voice/scripts-v1.md`).
5. **Trending effects:** Higgsfield's viral gallery has nothing on brand for dog boarding today (only "Skatedog", rejected: it shows an AI dog used as a skateboard). Recheck weekly.

## First batch (Oct 23, 105 credits)
| Test | AI hook clip (Higgsfield job) | Real footage body | On screen hook |
|---|---|---|---|
| T1 Bored at 2 PM | Woman at office desk checks phone, worried then smiles (9142796e) | Our dogs playing in the yard and pool | "You at 2 PM." then "Your dog at 2 PM." |
| T2 Airport relief | Man at airport gate, worry turns to relief watching his phone (6e8bdc20) | Daily video style clips of dogs | "When the daily video comes in." |
| T3 Couch laugh | Woman on couch at night laughs at her phone (18c4b8ae) | Funny real dog moments | "Every night at 7 PM, this happens." |
Note: T3's time line must match the real video update time. Confirm with Amanda before it posts; otherwise use "Every night, this happens."

## Weekly loop
1. Friday: pick 3 concepts, make 1 AI hook each (about 105 credits) plus 2 free text hook versions per noon reel.
2. Codex posts the 2 trial versions 48 hours before each noon slot (Trial Reels can't go through Eden).
3. 24 hours later: read average watch time and the retention graph. Winner goes to the feed, loser goes on the "tried, lost" list in `strategy/operating-system/hook-lab.md`.
4. Monday scoreboard: credits spent, tests run, best hook, cost per winning hook.

## Clip status (Oct 23, 16:15 UTC)
- T1 office 2 PM: DONE. Eden link https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/0c2f5a47-89fd-4edd-afc9-0aa2620a4682.mp4
- T2 airport: blocked by Higgsfield's content filter too (flagged nsfw). Filtered jobs were refunded: balance 1,613, so only T1 cost credits (35).
- T3 couch: blocked by Higgsfield's content filter (flagged nsfw on a harmless prompt). Not regenerated: Alex capped credits at a few clips. Retry next week with a reworded prompt if T1 or T2 wins.
- Amanda's custom voice: not in Higgsfield yet (only the stock preset voice also named "Amanda", which is NOT her). Waiting on Alex.

Lesson: seedance 2.5's filter flags realistic "person looking at phone" prompts. Next week, try kling3_0 or simpler prompts (no facial emotion words), preflight with get_cost, and keep to 3 clips.
