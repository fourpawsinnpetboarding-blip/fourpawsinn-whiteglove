You are running the Four Paws Inn weekly content machine as a scheduled, unattended job, every Sunday at 5am. No human is watching this run. Read `CLAUDE.md` at the repo root first if you have not already loaded it this session.

## 1. Run the deterministic scan

Run: `node scripts/weekly-pipeline.js scan`

This reads `config/slate.json` and `content/inbox/` (plus `content/copy/`, `content/reviews/`, `content/founder-reference/`), matches raw material to each of the 7 days by the convention in `content/README.md`, composites what it mechanically can (the Tuesday carousel, the Saturday review card), and writes `content/generated/week-manifest.json`. It does not write captions and does not touch Eden.

## 2. For each day in the manifest

Read `content/generated/week-manifest.json`. For each day, act on its `status`:

- **`missing`** → skip this day. Do not invent the raw material. Record it as skipped, by name, with the exact `reason` from the manifest.
- **`ready-needs-hook`** (Mon house-yard-reel, Wed dog-moment-reel) → write one on-screen hook line or one-line caption text per `config/formats/<format>.json`, in Four Paws Inn's voice from `CLAUDE.md`. Run `node scripts/weekly-pipeline.js overlay <Day> "<the line>"` to burn it onto the video. If that command errors because ffmpeg is not installed, record this day as skipped with that exact reason, do not fake a result.
- **`ready-needs-caption`** (Tue carousel, Thu funny static, Fri transformation, Sat review card) → write the full caption for the platform using `CLAUDE.md` voice rules. For Thursday, the caption carries the joke, the image is plain. Do not invent a guest name, a health claim, or a safety guarantee (`CLAUDE.md` section 10, rule 5).
- **`reference-ready-avatar-unconfirmed`** (Sun founder talking head) → do not attempt Higgsfield generation until a human has confirmed the talking-head capability per `config/formats/founder-talking-head.json`. Record this day as skipped with that reason. If a human has separately confirmed it works and updated that config file, follow the confirmed workflow there instead.

## 3. Upload and schedule each day that produced an asset

For each day with a finished asset (video from step 2, or the composited image(s) from the scan):

1. Upload via `eden_upload_scheduling_media` (image) or the appropriate media tool for video, workspace id `1c2438f9-e773-4786-a8cb-121504399872`.
2. Call `eden_schedule_post` with:
   - `draft: true` always. Never `eden_publish_post_now`.
   - `workspaceId: "1c2438f9-e773-4786-a8cb-121504399872"`
   - `platforms`: the day's `platforms` array from the manifest
   - `scheduledAtIso`: the coming week's date for that day at the manifest's `time`, in `America/New_York`
   - `text`: the caption you wrote
   - `media`: the uploaded asset(s). For the Tuesday carousel, all 6 slides in order.
3. On success, move any original raw file(s) for that day from `content/inbox/` to `content/done/`.
4. On failure at any step, record that day as failed with the real error. Do not move or delete anything for a failed day. Do not retry silently more than once per day.

## 4. Log the week

Write `content/weeks/YYYY-MM-DD.json` (Sunday's date, the run date) with one entry per day of the slate: `{ day, format, status: "drafted"|"skipped"|"failed", draftId (if drafted), reason (if skipped or failed), caption (if drafted) }`. Read any existing file at that path first; do not overwrite a same-day re-run's earlier entries, merge instead.

Stories are never handled by this job. Eden's MCP tools have no Stories post type, confirmed. Do not attempt to draft or upload a Story. Alex posts those by hand.

## 5. Report

Give a 7-line summary, one line per day: drafted (with draft id), skipped (with the exact reason), or failed (with the exact error). Nothing publishes in this job, ever.
