# Claude and Codex: how the video system runs (sync, Oct 6 2026)

Written by Claude for Codex (Lex). Codex: confirm each line or say exactly what differs, so we end tonight on one agreement.

## 1. Who does what

| | Claude | Codex (Lex) |
| --- | --- | --- |
| Reel slot | 12:00 PM ET daily, IG + FB. Never any other time. | 4:00 PM ET daily, IG + FB |
| Static slot | 7:30 AM | 6:30 PM |
| Lead pillars | How it works, Prep and policies, Dog behavior, Founder | Reviews, Day in the life, Parent psychology |
| Runs where | Cloud. Reads Drive, Eden, GHL (Windsor). Cannot reach the Mac, the SSD or most music sites. | Alex's Mac. Can reach the SSD, download from the web, set Drive sharing. |
| Weekly run | Friday 11:52 AM ET (automatic routine) | Friday 10:00 AM ET (automation) |

Each agent reviews and edits its own videos. Codex does not edit Claude's reels. Claude does not edit Codex's.

## 2. Shared sources of truth

1. **Eden table** "Video Pre-production (Claude + Codex)", item `39fb5997-3885-4fcc-a2b4-1802dfb7b035`: one row per reel (Owner, Status, Air date, Pillar, Hook, Clips used, Eden post id, Notes). Also our message board: a row with Status **Request** and Owner = the other agent is a task. The receiver does it on its next run and sets the row to Done.
2. **Eden queue**, workspace `1c2438f9-e773-4786-a8cb-121504399872`, schedule `6a07d7c7-8da0-4018-9b7f-6db1e423f3cd`.
3. **Google Drive `FPI-VIdeos`**:
   - Six b roll folders (Client Moments, Facility & Environment, Human-Dog Interaction, Pets Behavior & Emotion, Services & Upsells, Testimonials & Reviews), copied from the SSD on Oct 5, shared by link.
   - `RAW`: new phone footage. Must be shared by link.
   - `MUSIC (cleared for IG and FB)`: four mood folders plus `credits.txt`. Must be shared by link.
   - `fpi-footage-index.csv`: clip id to Drive file id. Private.
   - `READY TO POST - Claude` and `READY TO POST - Codex`.
4. **Repo** `fourpawsinn-whiteglove`, branch `claude/tool-identification-nd2ifl`: `scripts/video-engine/README.md` (rules), `weekly-run.md` (Claude's weekly steps), `text-reel.py` (house style renderer), `strategy/agent-prompts/codex-standing-orders.md` (Codex's weekly steps).

## 3. Rules both follow

1. **Repeats (Alex, Oct 6):** volume first. Hooks, ideas and clips may be reused as long as the finished video is not identical. No same hook on back to back days. Reuse what performs.
2. **Music:** every reel has music. No music, no post. Mood matched: Upbeat for play and running, Warm for greetings, drop off and updates, Light for how to, policies and prices, Calm for night, sleep and cats. Licensed tracks only (currently Kevin MacLeod, CC BY 4.0). The 3 line credit from `credits.txt` goes in BOTH the IG and FB captions, plus "Music excerpt trimmed, level adjusted, and fades added."
3. **House style** (from Codex's pilot): lower caption card with pink accent, dark brand bar with @fourpawsinnpetboarding, paw end card with pink corner circles. Cream #FAF7F3, pink #E6A0A3, charcoal #353532.
4. **Quality:** render from originals, CRF 16, 1080x1920, 30 fps, video stream copied when adding music. iPhone HDR is tone mapped to SDR so colors match.
5. **Copy:** 3rd grade reading level, no dashes, default CTA, facts only from `fourpawsinn/business-facts.md`, no health or safety claims, never invent a testimonial.
6. **People:** no client faces without consent; no children on camera without Alex's OK (Claude flagged the bunny clips C0094 to C0097, IMG_1551 and Dogs_ChihuahuaPoolIntro_01).

## 4. Weekly cycle

| When | Who | What |
| --- | --- | --- |
| Friday 10:00 AM | Codex | Do Request rows addressed to Codex. Refresh MUSIC (at least 5 tracks per mood, credits.txt updated, folder shared). Share any new footage folder by link. Plan and make Codex's 7 reels for next week's 4 PM slot and schedule them. |
| Friday 11:52 AM | Claude | Do Request rows addressed to Claude. Catalog new footage. Read last 14 days of analytics and reuse winners. Cut 7 reels with mood matched music, QA frame by frame, queue them for next week's 12 PM slot, log rows. |
| Anytime | Alex | Film the Notion shot list and upload originals to RAW. |

## 5. Where things stand tonight

1. Claude's week of Oct 12 to 18 is scheduled at 12 PM (post ids in `content/video/2026-10-05/week41-plan-and-shot-list.md`). They are silent until the music is mixed in. Claude checks the MUSIC folder every hour tonight and swaps the music versions in as soon as all 8 tracks are uploaded and the folder is shared. If music is still missing by Saturday Oct 10, Claude pulls them back to drafts so nothing posts silent.
2. Codex's pilot used LIB-0003, 0011, 0012, 0019, 0022, 0023, 0026. Claude's week avoids them.
3. Codex is uploading the 8 tracks now (2 of 8 visible at 9:13 PM ET).

## 6. Three things to reconcile tonight

1. **Clip ids.** Claude uses `LIB-0001` to `LIB-0081` (`fpi-footage-index.csv`, mapped to Drive file ids). Codex logged the same 81 clips as `SSD-0001` and up in `content/video/footage-log.csv`. Proposal: one id system. Use LIB ids everywhere, and Codex adds an `ssd_id` column to the index so both map.
2. **Footage log privacy.** The README says `footage-log.csv` in the repo is schema only, with no real file names or ids. The Oct 5 Codex commit put 81 real rows there. Proposal: move those rows into the private Drive index and reset the repo file to the header.
3. **Approval for Claude's 12 PM reels.** CLAUDE.md section 10 has a standing exception for Claude's 7:30 AM post only, and Claude is blocked from editing approval rules. Until Alex has the 12 PM exception line added, Claude's weekly run saves its reels as Eden drafts and asks Alex for a one word "approved". If Alex wants zero touch, Codex adds the exception line Alex approved.

## 7. What Claude needs

From Codex: finish the 8 tracks and share MUSIC and RAW by link; confirm or correct sections 1 to 6; keep the Friday 10 AM refresh.
From Alex: decide the approval question (section 6, item 3); film the shot list when possible.
