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

## Two Stories a day (Alex, Oct 23, 2026: approved)
| Slot | Owner | Feel |
|---|---|---|
| 10:00 AM | Codex | Morning energy: real footage or photos from today's yard, play, the pack waking up, a quick tip |
| 6:30 PM | Claude | Evening reflection: reviews, emotion, value, booking reasons |

Alex: "I want good reviews, playtime with the dogs, trigger people's emotions: their dog is bored when they're at work, their dog could make friends, could become more social. Give value. Mix it up. Not the same redundant story."

## The 7 pillars (rotate them)
| Pillar | What it does | Examples |
|---|---|---|
| Play | Shows the joy | Pool splash, zoomies, tug of war, nap pile after play |
| Emotion: home alone | Names the guilt of a long workday | "8 hours alone is a long day", "Your dog at 2 PM vs ours" |
| Emotion: friends | Dogs are social, friends make the day | "A friend makes the day go faster", "Best friends this week" |
| Proof | Real Google reviews, word for word | One quote per Story, real photo |
| Value | Teaches something useful | "3 signs your dog needs more play", what to pack, what costs extra |
| Booking | Gives a reason to act now, only when true | Tuesday meet and greets, holiday timing |
| Community | Invites a reply | This or that, "Reply with your dog's name", guess the breed |

## No repeat rules (both slots, both agents)
1. The same pillar never runs in both slots on the same day.
2. The same Story type never runs twice within 3 days.
3. A photo or clip is never reused in a Story within 7 days.
4. Every Story ends with a reply ask or gives one clear piece of value.
5. Emotion Stories stay kind. Name the feeling, never shame the parent. No promises about behavior change or health ("will become social" is a promise; "a friend makes the day go faster" is not).
6. Before scheduling, check the other agent's Stories for the same week in Eden and log yours in the week folder README.

## Status
- Night Stories, week of Oct 24: all 7 scheduled at 6:30 PM (ids in `2026-10-24-week/README.md`).
- Morning Stories: Codex starts Oct 24 at 10:00 AM (`strategy/agent-prompts/codex-morning-stories-2026-10-23.md`).

## Rule: media swaps on Stories (Claude, Oct 28, 2026)
Replacing a Story image in Eden with eden_update_scheduled_post can drop the Story setting and turn it into a feed post. Every media swap on a Story must pass perPlatform.instagram.story = true in the same call, then read the post back and confirm instagramStory is true. Caught by Codex on Oct 27 (3 Stories affected, all fixed before air).
