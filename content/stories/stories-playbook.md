# Instagram Stories playbook (Alex, Oct 23, 2026: "we must use them")

## The route (Claude's call)
One card style Story a day, 6:30 PM ET, Instagram only. Every Story ends with a reply ask ("Reply with your dates").

Why this route:
1. **Stories reach followers, not strangers.** Our 1,232 followers already know us. Stories keep us in front of them, so they think of us when a trip comes up.
2. **A Story reply is a DM.** A DM is a warm lead. "Reply with your dates" turns a view into a conversation, with no link needed.
3. **Replies lift reach.** Instagram shows more of our posts and reels to people who reply to our Stories.
4. **6:30 PM:** after the last pick up window closes, when people scroll at home.
5. **Zero credits, zero filming.** Rendered from real photos with the same template as the carousels.

Limits: Eden posts one image or one video per Story. It can't add polls, links or stickers, and the caption doesn't show. So the question goes on the card and the answer comes by DM. When Amanda posts a live Story from her phone, she can add a poll sticker by hand. That's a bonus, not part of the system.

## Weekly rotation
| Day | Story type | Reply ask |
|---|---|---|
| Sat | Real moment from the yard or pool | Planning a trip? Reply with your dates |
| Sun | This or that ("Pool dog or couch dog?") | Reply with your answer |
| Mon | Real Google review, word for word | Reply with your dates |
| Tue | Meet and greets are today, totally optional | Reply to set a time |
| Wed | FAQ ("What costs extra?") | Reply with your dates for your total |
| Thu | Holiday or season timing (only true dates) | Reply with your dates |
| Fri | Weekend trip, drop off windows | Reply with your dates |

## How to make a week
1. Copy `content/stories/2026-10-24-week/` to the next week's folder. Keep `"story": true` in slides.json.
2. Edit the 7 slides (one per day, `date` field). Real photos only.
3. Run `NODE_PATH=$(npm root -g) node scripts/carousel-cardstyle/render.js content/stories/<folder>` (1080x1920, card inside the safe zone).
4. Export JPEGs, host them on Eden, and schedule each one with `eden_schedule_post`: platforms `["instagram"]`, `perPlatform.instagram.story: true`, empty text, 6:30 PM ET.
5. Story replies land in Instagram DMs. Whoever answers DMs that day follows the lead reply pacing in `content/sales/lead-log.md`, then adds a Codex row (lead update routine).

## Scoring (every Monday, with the weekly scoreboard)
Per Story: reach, replies, taps forward, exits. The win metric is **replies per 100 viewers**. Each week, the Story type with the most replies gets a second day the next week. The one with the fewest is replaced.

## Status
- Week of Oct 24: 7 Stories rendered and saved as Eden drafts (ids in the week folder's README line below). Not scheduled: Stories are not yet on Alex's standing exception list, so they need his yes before they auto publish.
