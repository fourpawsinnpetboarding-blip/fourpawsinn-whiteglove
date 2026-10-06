# Claude's weekly video run (fires every Friday by Routine)

Goal: 7 finished reels for next Monday to Sunday, 12:00 PM ET, Instagram + Facebook, without Alex having to start anything.
Read first: `CLAUDE.md`, `scripts/video-engine/README.md`, `fourpawsinn/business-facts.md`.

## 1. Load state (10 min)

1. `git pull origin claude/tool-identification-nd2ifl`.
2. Eden table "Video Pre-production (Claude + Codex)", item `39fb5997-3885-4fcc-a2b4-1802dfb7b035`: every row, both owners. Look for rows with Status "Request" addressed to Claude and do them first.
3. Eden queue: `eden_list_scheduled_posts` (workspace `1c2438f9-e773-4786-a8cb-121504399872`, scheduled, limit 100). Find next week's open 12 PM slots.
4. Drive `FPI-VIdeos`: download `fpi-footage-index.csv` (Drive download tool) to the work dir. List `RAW` and the six library folders for files newer than the index.
5. Drive `FPI-VIdeos / MUSIC (cleared for IG and FB)`: list tracks per mood folder and read `credits.txt`.
6. `FFMPEG=$(bash scripts/video-engine/setup.sh)`.

## 2. New footage

For every new file: give it the next `LIB-` id, run `contact-sheets.py` on it, review the sheet, add it to `fpi-footage-index.csv` and re-upload that file to Drive (update, do not duplicate). If a folder is not link shared the download returns HTML: add a Request row for Codex ("share folder X by link") and use what is available.

## 3. Plan and cut 7 reels

1. Lanes: How it works, Prep and policies, Dog behavior, Founder (Claude's); cross lanes freely. Repeat rule: never an identical video; reuse winners in new cuts. No same hook on back to back days.
2. Reuse what performed: `eden_get_analytics` for the last 14 days, keep the hooks and shots with the best reach and saves, cut new versions of them.
3. Write `content/video/specs/W<week>-C<n>-<slug>.json` (house style, 4 clips of 2.5 to 3.5 s, end card). Set `music` to `drive:<file id>` from the right mood folder (Upbeat for play, Warm for greetings and updates, Light for how to and prices, Calm for night and cats) and `music_volume` 0.6 to 0.8. Rotate tracks.
4. `python3 scripts/video-engine/render.py fpi-footage-index.csv <workdir>/out content/video/specs/W<week>-*.json` (run in the background; it skips finished files).
5. QA every reel: 1 frame per second tiled; fix weak shots, empty frames, orphan words, bad crops; one stream (no mid video reset). Re-render fixes.

## 4. Queue

No music, no post (Alex, Oct 6). If the MUSIC folder has no usable track for a reel, do not schedule it: keep it as an Eden draft and add a Request row for Codex.


1. Upload each master to Eden (`eden_prepare_scheduling_media_upload`, then `eden-put.sh` with the signed part URLs, then complete).
2. Caption: hook, 2 to 3 short lines, default CTA, hashtags, plus the exact music credit from `credits.txt` when the license requires it. 3rd grade reading level, no dashes, no health or safety claims, facts only from business-facts.
3. Approval gate (CLAUDE.md section 10): if CLAUDE.md has a standing exception for Claude's 12 PM reels, schedule each one at 12:00 PM ET. If not, create each as an Eden **draft** (`draft: true`), send Alex the preview copies (CRF 24) and the list in one message, and schedule them the moment he replies "approved".
4. Add one Eden table row per reel: Owner Claude, Status Scheduled (or Edited for drafts), Air date, Pillar, Clips used, Eden post id, music track.

## 5. Close out

1. Commit specs and notes, push to `claude/tool-identification-nd2ifl`.
2. Report to Alex in 5 lines max: what is queued, anything blocked and who owns it. Never ask Alex to do a task Codex can do: write it as a Request row for Codex.
3. If the footage library is thin for a pillar, update the Notion shot list page "Four Paws Inn Shot List" with the next 10 shots.
