# Video engine (staged rollout, Claude + Codex)

Two agents, one footage library, one shared pre-production table, zero duplicates. Start with the pilot and ramp by program week below; 7 reels per agent is the Week 4 onward target, not the launch volume. Shared quality and dedupe rules apply to both. This file is the source of truth; Codex reads it too.

## Rollout and slots (America/New_York)

| Program week | Total reels | Owner and reel slot |
| --- | --- | --- |
| Week 1 | 2 pilot reels, one each | Assign each pilot's air date/time in its own row in the existing table before scheduling; Week 1 timing is not specified by this rollout. |
| Weeks 2 and 3 | 7 per week combined | Split the seven days between Claude and Codex in the existing table; every reel is at 12:00 PM. |
| Week 4 onward | 14 per week, 7 each | Claude at 12:00 PM daily; Codex at 4:00 PM daily. |

The weekly cycle below uses each agent's allocation for the current stage, never an automatic 7 each before Week 4. Validate the pilot process before ramping; technical or quality failures block affected reels. Each agent schedules and edits only its own rows and posts. Codex must never schedule or edit Claude's rows or posts, including to resolve a collision. Read the other agent's work for coordination and choose a different unreserved slot or idea for your own work. Existing static slots remain Claude 7:30 AM and Codex 6:30 PM.

Both post to the Four Paws Inn Eden workspace `1c2438f9-e773-4786-a8cb-121504399872`, schedule `6a07d7c7-8da0-4018-9b7f-6db1e423f3cd`, Instagram + Facebook.

## The two shared sources of truth

1. **Eden table "Video Pre-production (Claude + Codex)"**, item id `39fb5997-3885-4fcc-a2b4-1802dfb7b035`. Every reel gets ONE row before it is edited. Columns: Owner, Status (Idea, Scripted, Needs footage, Edited, Scheduled, Posted), Air date, Pillar, Hook, Clips used, Eden post id, Notes.
2. **Eden scheduler** (`eden_list_scheduled_posts`). Inspect all relevant statuses, including scheduled, posted, pending/processing and partial or failed results where available. Retrieve every page needed to cover the full rolling 8 weeks plus future reservations; a limit of 100 or a single page is not coverage. Reconcile it with the existing table before reserving or scheduling. If the complete 8-week record cannot be verified, stop scheduling the affected reel until coverage is restored. Never create a replacement pre-production table.

## Dedupe rules (check BOTH sources before writing a row)

- No two reels within 8 weeks share the same **hook** or the same **core idea**, whoever made them.
- No two reels within 8 weeks share the same **hero clip** (the main 3 seconds after the hook). B roll may repeat after 4 weeks if the hook and idea are different.
- Same Google reviewer quoted at most once every 8 weeks across both agents.
- Record stable source clip IDs (Drive file ID or a persistent inventory ID), hero clip ID, hook/core idea, reviewer ID when applicable, owner, air date and platform post IDs in the private ledger, using the existing table fields/Notes. Filenames alone are not reliable IDs. Include completed, reserved and in-flight work in dedupe checks.
- Pillar split to keep lanes apart. Claude leads: How it works, Prep and policies, Dog behavior, Founder. Codex leads: Reviews, Day in the life, Parent psychology. Either may cross lanes if the table shows the lane is empty that week.
- If the other agent already has a row for an idea (any status), do not make it. Pick another.

## Weekly cycle

| Day | Who | Step |
| --- | --- | --- |
| Friday | Both | Read the table + Eden queue. Add only the current stage's allocated rows at Status "Scripted": hook, 30 second script, shot list. Rows with no usable library footage go to "Needs footage". |
| Saturday | Alex | One combined shot list (all "Needs footage" rows) goes to whoever films. |
| Sunday | Amanda or staff | Film the shot list. Upload ORIGINAL files to Drive RAW via the Drive app. Never text, AirDrop compressed, or WhatsApp. |
| Sunday night | Both | Log new clips in the footage library (below). Edit only own allocated reels. Status "Edited". |
| Monday | Both | Schedule only own allocated reels in the current stage's own reserved slots. Write the Eden post id into the row. Status "Scheduled". |
| Next Monday | Both | Pull analytics. Mark "Posted". Note watch time and leads in Notes. Record promising candidates; this organic-video program does not authorize ad tests, ad changes or spend. |

## Footage library

Tools: `scripts/video-assets/stitch-hooks.sh` (hook + main video) and `scripts/video-engine/text-reel.py` (text on screen reel from b roll clips + brand end card).

- Shared Drive library: `Content / FPI-VIdeos`; resolve its verified private folder IDs/links from the authorized private ledger, not this public README. Use `RAW` for new phone uploads, originals only, and the existing clean `*_nomusicnocaptions.MOV` 4K masters as b roll sources after rights and content checks.
- Output folders: `READY TO POST - Claude` and `READY TO POST - Codex`, finished masters per agent. Never touch the other agent's output.
- The older `Content / Raw Footage` folder is empty according to the current library record. Do not use it.
- Keep the real footage inventory in a private access-controlled Drive document or existing private ledger, shared only with the authorized team. Include stable clip ID/Drive file ID, file name, date shot, who/what is in it, shot type (talking head, b roll, dog close up, yard, drop off, review card), usable seconds, rights/consent evidence, times used and last used date. `content/video/footage-log.csv` is a public schema only: never commit real names, footage links/IDs, client information or performance data. Do not delete real records if discovered; preserve them privately and report any exposure for separate remediation.
- Before asking for new footage, search the log. Reuse first.
- When the log has 150+ usable clips across every pillar, move filming from weekly to monthly.

## Quality rules (non negotiable)

- Render from the ORIGINAL files. `scripts/video-assets/stitch-hooks.sh` defaults to CRF 16. Never shrink a video to fit an upload; Eden takes large files in parts.
- 1080x1920, 30fps, burned in captions, brand end card (cream `#FAF7F3`, pink `#E6A0A3`, charcoal `#353532`).
- Real dogs, people and home only. Higgsfield for hook text frames, thumbnails and motion graphics, never generated dogs, people or rooms.
- Captions: 3rd grade reading level, no dashes, default CTA, no health or safety guarantees. Read `fourpawsinn/business-facts.md` first.

## Quality check before anything is scheduled (from Codex's plan, adopted 2026-10-04)

- Watch the full master with sound: sharpness, pacing, captions, crop, footage/likeness permissions and music rights (verified for business use on BOTH Instagram and Facebook; a platform-library license is not assumed transferable), every business claim matches `fourpawsinn/business-facts.md`.
- Never invent a testimonial. Never present generated scenes as real Four Paws care. Flag anything that cannot be verified in the row's Notes and do not schedule it.
- Finished master + caption go into the row (Status "Edited") before scheduling.
- Check the live Eden queue and ownership again right before scheduling. Store a stable scheduling key in the row Notes using the row ID, owner, air date/time and target platforms; reconcile any existing post IDs/results for that key before creating a post. After scheduling, record the post ID and each platform's status. On timeout, pending/processing, partial success or failure, inspect existing posts and platform results first; never blindly recreate or retry a successful platform. Retry only a confirmed missing/failed target without duplicating a successful one.
- Output folders are separate per agent: `READY TO POST - Claude` and `READY TO POST - Codex`. The original footage library is shared.

## Measuring (weekly)

- Compare reels at the same age (for example 72 hours) and separately for Instagram and Facebook.
- Rank by retention where available, then shares and saves divided by reach, then identifiable qualified inquiries (DMs or form leads that mention the reel). Likes alone never decide.
- No winner from tiny samples. Under about 500 reach, call it "not enough data"; reaching 500 is a practical screening floor, not statistical confidence.
- Treat rankings as directional: noon versus 4 PM, different pillars, topics and audiences confound agent comparisons. Compare same-age, same-platform and comparable-content cohorts where possible; never claim an agent won or a slot caused the result from this rollout alone.
- Keep real metrics, attribution and inquiry details in the private existing table/ledger, not this public repository. Write what worked in the row's Notes. Next week's scripts start from those lessons.

## Launch

- Week 1 remains ONE pilot reel per agent; do not fill the rest of that week or jump straight to 14. Follow the staged rollout above after process validation.
- Lex/Codex performs the full quality check and proceeds with its authorized organic reel without waiting for Alex's review. Missing footage, unverifiable claims, rights gaps or unsafe content remain blockers; use a verified alternative or leave the affected reel unscheduled.
- Codex may call itself Lex. Same agent.

## Approval

Alex's 2026-10-04 instruction authorizes Lex/Codex to create, quality-check and schedule/publish its own organic video work in this staged program without waiting for his approval. This is the narrow video exception to the general publishing approval rule in `fourpawsinn/business-facts.md`. Claude retains only its separately authorized program allocation and slots; this does not grant Codex control over Claude's work or expand Claude's approval authority. Anything outside this organic-video program remains subject to its existing approval rules, including ads, budgets, workflows, credentials and unrelated publishing.
