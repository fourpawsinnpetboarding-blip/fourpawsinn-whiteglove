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
5. Hook check first (content/video/hook-rules.md): first frame has 6 elements or fewer, clip 1 has `"proof": true`, the hook line speaks to the viewer (you or your). Then QA every reel: 1 frame per second tiled; fix weak shots, empty frames, orphan words, bad crops; one stream (no mid video reset). Re-render fixes.

## 4. Queue

Test first (Alex, Oct 23): every noon reel is first scheduled as 2 or 3 Trial Reel hook versions (`perPlatform.instagram.trialReel: true`, no auto graduate) 3 days before its date. Only the winner goes to the feed. Full rule: strategy/operating-system/growth-push-oct-2026.md.

Every reel gets a card style cover before it is scheduled (Alex, Oct 23): follow `content/covers/README.md` and attach it with `perPlatform.instagram.coverUrl` and `perPlatform.facebook.coverUrl`. Check the 3 by 3 grid preview first.

No music, no post (Alex, Oct 6). If the MUSIC folder has no usable track for a reel, do not schedule it: keep it as an Eden draft and add a Request row for Codex.


1. Upload each master to Eden (`eden_prepare_scheduling_media_upload`, then `eden-put.sh` with the signed part URLs, then complete).
2. Caption: hook, 2 to 3 short lines, default CTA, hashtags, plus the exact music credit from `credits.txt` when the license requires it. 3rd grade reading level, no dashes, no health or safety claims, facts only from business-facts.
3. Schedule each reel straight to publish at exactly 12:00 PM ET (standing exception in CLAUDE.md section 10). Do not wait for approval.
4. Add one Eden table row per reel: Owner Claude, Status Scheduled (or Edited for drafts), Air date, Pillar, Clips used, Eden post id, music track.

## 5. Close out

1. Commit specs and notes, push to `claude/tool-identification-nd2ifl`.
2. Report to Alex in 5 lines max: what is queued, anything blocked and who owns it. Never ask Alex to do a task Codex can do: write it as a Request row for Codex.
3. If the footage library is thin for a pillar, update the Notion shot list page "Four Paws Inn Shot List" with the next 10 shots.

## Comment to reel (Alex, Oct 14 2026)

When a comment or DM asks a real question about how we work, turn it into a reel. First one: W42-X1-ontheway (post d01ef3f9).

1. Rebuild the comment as a bubble on the first 3 seconds (white card, pink avatar dot, label "A question on our last post", the comment text exactly as written). Never show the username. Never screenshot.
2. Hook under it answers the question and says "your dog".
3. Sequence: problem, cause, fix, proof, instruction. Real footage only. Never argue with the commenter: show the reason.
4. Caption opens with the quoted question, praises the clients who get it, ends with "It's not the right fit for everyone, and that's okay." No health or safety claims.
5. Take the next 12:00 PM slot. Move the reel that was there to the first open 12:00 PM date. Log both moves in the Eden table row.
6. Tell Alex to reply under the comment after it posts: "We made a video about this 😊".
