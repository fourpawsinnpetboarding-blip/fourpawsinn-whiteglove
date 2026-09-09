You are running the Four Paws Inn photo pipeline as a scheduled, unattended job. No human is watching this run. Follow every step exactly. Read `CLAUDE.md` at the repo root first if you have not already loaded it this session.

## 1. Run the deterministic step

Run: `node scripts/photo-pipeline.js`

This rejects AI-named files, converts HEIC, resizes to 1080x1350, strips EXIF (GPS included), and writes each surviving image's info to `content/generated/pending.json`. It does not touch Eden and does not write captions.

## 2. For each entry in content/generated/pending.json

Read the processed image at `processedPath`. Do the following per image:

1. **Write the caption** using the Report Card format from `CLAUDE.md` section 9: 3rd grade reading level, short sentences, common words, one idea per sentence, warmth plus clarity plus reason, no dashes or em dashes. Look at the image itself to ground the caption in what it actually shows. Do not invent a guest name, a health claim, or a safety guarantee (CLAUDE.md section 10, rule 5).
2. **Upload the image to Eden.** Use `eden_upload_scheduling_media` (or the current equivalent upload tool) with the file at `processedPath`, workspace id `1c2438f9-e773-4786-a8cb-121504399872`.
3. **Schedule a draft.** Call `eden_schedule_post` with:
   - `draft: true` (never anything else, never `eden_publish_post_now`)
   - `workspaceId: "1c2438f9-e773-4786-a8cb-121504399872"`
   - `platforms: ["instagram"]`
   - `text`: the caption you wrote
   - `media`: the uploaded asset from step 2
4. **On success:**
   - Move the original file from `content/inbox/` to `content/done/`.
   - Delete the staging file at `processedPath` (it is a duplicate now living in Eden).
   - Append one row to `content/queue.json`: `{ "sourceFilename", "postedAt" (ISO), "account": "instagram", "draftId", "caption" }`. Read the existing array first, do not overwrite it.
   - Remove this entry from `content/generated/pending.json`.
5. **On failure at any step:** leave the original file in `content/inbox/`, leave the entry in `pending.json`, and log the error in the run's chat output. Do not move or delete anything for a failed image. Do not retry silently more than once.

## 3. Report

One short summary: how many drafted, how many failed and why, how many rejected by the filename filter. Nothing publishes in this job, ever. If `content/inbox/` was empty, say so and stop after step 1.
