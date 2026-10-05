# Codex prompt: catalog the b roll library in Google Drive

Why: Claude runs in the cloud and cannot reach Alex's Mac or SSD. Both agents can reach Google Drive. Alex uploads the six green b roll folders from the SSD once; Codex catalogs them; both agents plan and cut from the same library, and Claude writes shot lists of only what is missing.

Where things live (Drive, inside `Content / FPI-VIdeos`, links kept private, not in this repo):
- `LIBRARY (b roll originals)`: the six green folders, uploaded as is.
- `FPI Footage Catalog (private)`: Google Sheet, one row per clip. This is the real inventory. `content/video/footage-log.csv` stays a public schema only.
- `FOOTAGE CATALOG (contact sheets)`: one preview JPG per clip.

```
Catalog the Four Paws Inn b roll library. Read scripts/video-engine/README.md in the fourpawsinn-whiteglove repo first.

SOURCE (read only): Google Drive, Content / FPI-VIdeos / LIBRARY (b roll originals), all subfolders.
Never move, rename, edit, re-encode or delete anything in LIBRARY.

For every video file (.mov .mp4 .m4v, skip files under 2 seconds):
1. Duration, resolution, fps, creation date.
2. Grab 4 frames at 10, 35, 60 and 85 percent. Tile them 2x2 into one JPG, 1080 px wide, with the clip_id and file name on top. Upload it to FPI-VIdeos / FOOTAGE CATALOG (contact sheets) as <clip_id>.jpg.
3. From the 4 frames fill in:
   subjects: dog breed or size, how many dogs, Amanda, Alex, staff, client, yard, room, car, food, toys.
   shot_type: one of talking head, b roll, dog close up, yard, drop off, pick up, feeding, play, sleeping, grooming, room tour, review card, other.
   usable_seconds: seconds that are steady, in focus and well lit.
   rights_consent_evidence: "own staff/home", "CLIENT FACE, needs consent", or "agency creator".
   notes: lighting, vertical or horizontal, blur or shake.
4. Add one row per clip to the Google Sheet FPI-VIdeos / FPI Footage Catalog (private). Keep its header. clip_id = LIB-0001, LIB-0002 and so on. drive_file_id = the clip's Drive file id. file = subfolder/filename. drive_folder = the subfolder name. times_used 0.
5. Do not put real clip names, Drive ids or client details in the repo.
6. Report: total clips, usable minutes, count per shot_type and per subfolder, and every CLIENT FACE clip.
```

## After Codex finishes

1. Alex tells Claude: "catalog is done."
2. Claude reads the Sheet and contact sheets, plans the week's reels from existing footage, and logs them in the Eden table.
3. Claude writes the gap shot list: only shots the plan needs that the library does not have.
4. Both agents download the originals straight from LIBRARY and cut at full quality.
