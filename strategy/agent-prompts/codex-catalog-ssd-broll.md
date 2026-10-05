# Codex prompt: catalog the b roll library and render Claude's reel specs

Why: Claude runs in the cloud. It can read images and Sheets in Drive, but cannot download private video. Codex runs on Alex's Mac with the SSD. So Codex handles the files, Claude handles the decisions:

1. Codex catalogs every clip and uploads timestamped contact sheets (small images) to Drive.
2. Claude reads the sheets, picks exact in and out points, plans the reels, writes one spec file per reel, and writes the gap shot list.
3. Codex renders each spec on the Mac with `scripts/video-engine/text-reel.py` from the ORIGINAL files and uploads the finished reel to Drive.

Where things live (Drive, inside `Content / FPI-VIdeos`, links kept private, not in this repo):
- The six green folders (copied from the SSD, Oct 5): Client Moments, Facility & Environment, Human-Dog Interaction, Pets (Behavior & Emotion), Services & Upsells, Testimonials & Reviews.
- `FPI Footage Catalog (private)`: Google Sheet, one row per clip. `content/video/footage-log.csv` stays a public schema only.
- `FOOTAGE CATALOG (contact sheets)`: preview images per clip.
- `READY TO POST - Claude`: finished reels rendered from Claude's specs.

```
PART 1: CATALOG. Read scripts/video-engine/README.md in the fourpawsinn-whiteglove repo first.

SOURCE (read only): the six green tagged folders inside /Volumes/Extreme SSD/00_VIDEOS (Client Moments, Facility & Environment, Human-Dog Interaction, the folder starting with "Pets", Services & Upsells, Testimonials & Reviews). Same files are also in Google Drive under Content / FPI-VIdeos. Never move, rename, edit, re-encode or delete any original.

For every video file (.mov .mp4 .m4v, skip under 2 seconds, skip .DS_Store and zips):
1. Duration, resolution, fps, orientation, creation date.
2. Contact sheet: one frame every 2 seconds (max 48 frames, spread evenly if longer), tiled 4 across, each frame stamped with its timestamp in seconds. Top banner: clip_id, folder/filename, duration. JPG, 1600 px wide. Upload to Drive folder FPI-VIdeos / FOOTAGE CATALOG (contact sheets) as <clip_id>.jpg.
3. From the frames fill in: subjects, shot_type (talking head, b roll, dog close up, yard, drop off, pick up, feeding, play, sleeping, grooming, room tour, review card, other), usable_seconds, rights_consent_evidence ("own staff/home", "CLIENT FACE, needs consent", "agency creator"), notes (lighting, shake, blur, audio worth keeping).
4. One row per clip in the Google Sheet FPI-VIdeos / FPI Footage Catalog (private). Keep its header. clip_id = LIB-0001 and up. file = folder/filename relative to 00_VIDEOS. drive_file_id = the Drive copy's id. drive_folder = folder name. times_used 0.
5. Also write a mapping file on the Mac only (not in the repo): ~/fpi-footage-map.json, {clip_id: absolute SSD path}.
6. Report: total clips, usable minutes, count per shot_type and per folder, every CLIENT FACE clip.

PART 2: RENDER (every time Claude pushes new specs).
1. git pull branch claude/tool-identification-nd2ifl. Specs are in content/video/specs/*.json. Each clip "src" is a clip_id; replace it with the SSD path from ~/fpi-footage-map.json before rendering.
2. Render each spec that has no finished file yet: FFMPEG=<path to ffmpeg> python3 scripts/video-engine/text-reel.py <spec> <spec name>.mp4
3. Upload each mp4, untouched, to Drive FPI-VIdeos / READY TO POST - Claude.
4. Do not schedule or post anything. Report the file names.
```

## After Codex finishes Part 1

1. Alex tells Claude: "catalog is done."
2. Claude reads the Sheet and contact sheets, plans 7 reels in the Eden table, and pushes 7 specs.
3. Claude writes the gap shot list: only shots the plan needs that the library does not have.
4. Alex tells Codex: "render Claude's specs" (Part 2).
