# Video engine (14 reels a week, Claude + Codex)

Two agents, one footage library, one shared pre-production table, zero duplicates. Claude makes 7 reels a week, Codex makes 7. Same rules for both. This file is the source of truth; Codex reads it too.

## Slots (never post in the other agent's slot)

| Agent | Reel slot | Existing static slot |
| --- | --- | --- |
| Claude | 12:00 PM ET daily | 7:30 AM |
| Codex | 4:00 PM ET daily | 6:30 PM |

Both post to the Four Paws Inn Eden workspace `1c2438f9-e773-4786-a8cb-121504399872`, schedule `6a07d7c7-8da0-4018-9b7f-6db1e423f3cd`, Instagram + Facebook.

## The two shared sources of truth

1. **Eden table "Video Pre-production (Claude + Codex)"**, item id `39fb5997-3885-4fcc-a2b4-1802dfb7b035`. Every reel gets ONE row before it is edited. Columns: Owner, Status (Idea, Scripted, Needs footage, Edited, Scheduled, Posted), Air date, Pillar, Hook, Clips used, Eden post id, Notes.
2. **Eden scheduler** (`eden_list_scheduled_posts`, statuses scheduled + posted, limit 100). What actually went out.

## Dedupe rules (check BOTH sources before writing a row)

- No two reels within 8 weeks share the same **hook** or the same **core idea**, whoever made them.
- No two reels within 8 weeks share the same **hero clip** (the main 3 seconds after the hook). B roll may repeat after 4 weeks if the hook and idea are different.
- Same Google reviewer quoted at most once every 8 weeks across both agents.
- Pillar split to keep lanes apart. Claude leads: How it works, Prep and policies, Dog behavior, Founder. Codex leads: Reviews, Day in the life, Parent psychology. Either may cross lanes if the table shows the lane is empty that week.
- If the other agent already has a row for an idea (any status), do not make it. Pick another.

## Weekly cycle

| Day | Who | Step |
| --- | --- | --- |
| Friday | Both | Read the table + Eden queue. Add 7 rows each at Status "Scripted": hook, 30 second script, shot list. Rows with no usable library footage go to "Needs footage". |
| Saturday | Alex | One combined shot list (all "Needs footage" rows) goes to whoever films. |
| Sunday | Amanda or staff | Film the shot list. Upload ORIGINAL files to Drive RAW via the Drive app. Never text, AirDrop compressed, or WhatsApp. |
| Sunday night | Both | Log new clips in the footage library (below). Edit own 7. Status "Edited". |
| Monday | Both | Schedule own 7 in own slot. Write the Eden post id into the row. Status "Scheduled". |
| Next Monday | Both | Pull analytics. Mark "Posted". Note watch time and leads in Notes. Winners become ad tests. |

## Footage library

Tools: `scripts/video-assets/stitch-hooks.sh` (hook + main video) and `scripts/video-engine/text-reel.py` (text on screen reel from b roll clips + brand end card).


- Shared Drive library: `Content / FPI-VIdeos` (folder id `1G5rc8X7lnWZNBxTH8RPlNdTq3g7dkySJ`, https://drive.google.com/drive/folders/1G5rc8X7lnWZNBxTH8RPlNdTq3g7dkySJ). Inside it:
  - `RAW` (`1E0-BKNIw1KzvKg8jnyqiv6dytMLV6Qmc`): new phone uploads, originals only.
  - `wetransfer_concept1-mov_2026-10-01_2142`: Rachel's concept files. The `*_nomusicnocaptions.MOV` files are clean 4K masters and are the best b roll source.
  - `READY TO POST - Claude` (`1wAUWuDtkV052JgEu7H4VZ1Ptm08PS6__`) and `READY TO POST - Codex` (`1DXPSDT3VIBQRLACWIQsGk18RZjw1z34Y`): finished masters per agent.
- The older `Content / Raw Footage` folder is empty. Do not use it.
- Every clip gets a line in `content/video/footage-log.csv`: file name, date shot, who/what is in it, shot type (talking head, b roll, dog close up, yard, drop off, review card), usable seconds, times used, last used date.
- Before asking for new footage, search the log. Reuse first.
- When the log has 150+ usable clips across every pillar, move filming from weekly to monthly.

## Quality rules (non negotiable)

- Render from the ORIGINAL files. `scripts/video-assets/stitch-hooks.sh` defaults to CRF 16. Never shrink a video to fit an upload; Eden takes large files in parts.
- 1080x1920, 30fps, burned in captions, brand end card (cream `#FAF7F3`, pink `#E6A0A3`, charcoal `#353532`).
- Real dogs, people and home only. Higgsfield for hook text frames, thumbnails and motion graphics, never generated dogs, people or rooms.
- Captions: 3rd grade reading level, no dashes, default CTA, no health or safety guarantees. Read `fourpawsinn/business-facts.md` first.

## Quality check before anything is scheduled (from Codex's plan, adopted 2026-10-04)

- Watch the full master with sound: sharpness, pacing, captions, crop, music rights (licensed or platform library only), every business claim matches `fourpawsinn/business-facts.md`.
- Never invent a testimonial. Never present generated scenes as real Four Paws care. Flag anything that cannot be verified in the row's Notes and do not schedule it.
- Finished master + caption go into the row (Status "Edited") before scheduling.
- Check the live Eden queue again right before scheduling. After scheduling, record the post id and confirm each platform's result before retrying anything.
- Output folders are separate per agent: `READY TO POST/Claude` and `READY TO POST/Codex`. The original footage library is shared.

## Measuring (weekly)

- Compare reels at the same age (for example 72 hours) and separately for Instagram and Facebook.
- Rank by retention where available, then shares and saves divided by reach, then identifiable qualified inquiries (DMs or form leads that mention the reel). Likes alone never decide.
- No winner from tiny samples. Under about 500 reach, call it "not enough data".
- Write what worked in the row's Notes. Next week's scripts start from those lessons.

## Launch

- Week 1 is a pilot: each agent makes ONE reel, Alex reviews both. The rest of the week follows once the process passes.
- Codex may call itself Lex. Same agent.

## Approval

Alex approved the 12 PM reel slot schedule for Claude on 2026-10-04 (video engine plan). Codex follows the same rule for its 4 PM slot. Anything outside these slots is draft only.
