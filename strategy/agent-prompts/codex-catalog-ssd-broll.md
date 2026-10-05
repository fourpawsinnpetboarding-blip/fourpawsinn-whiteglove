# Codex prompt: catalog the b roll on Alex's SSD

Why: Claude runs in the cloud and cannot see Alex's external drive. Codex runs on Alex's Mac and can. Codex builds a catalog (one line per clip plus a contact sheet image), so both agents plan reels from the same library, Claude can write a shot list of only what is missing, and only the clips a reel actually uses get uploaded.

Before pasting: replace `<B ROLL FOLDER>` with the folder path. To get it, drag the folder from Finder into Terminal and copy what appears.

```
Catalog the b roll on my external drive for the Four Paws Inn video engine. Read scripts/video-engine/README.md in the fourpawsinn-whiteglove repo first.

SOURCE (read only): <B ROLL FOLDER>
Never move, rename, edit, re-encode or delete anything on the SSD.

For every video file (.mov .mp4 .m4v, include subfolders, skip files under 2 seconds):
1. ffprobe: duration, resolution, fps, creation date.
2. Grab 4 frames at 10, 35, 60 and 85 percent. Tile them 2x2 into one JPG, 1080 px wide, with the clip_id and file name printed on top.
3. Look at the 4 frames and fill in:
   subjects: what is in it (dog breed or size, how many dogs, Amanda, Alex, staff, client, yard, room, car, food, toys).
   shot_type: one of talking head, b roll, dog close up, yard, drop off, pick up, feeding, play, sleeping, grooming, room tour, review card, other.
   usable_seconds: seconds that are steady, in focus and well lit.
   rights_consent_evidence: "own staff/home" when only our people, dogs in our care and our property; "CLIENT FACE, needs consent" when a client's face is visible; "agency creator" for Rachel files.
   notes: lighting, vertical or horizontal, anything blurry or shaky.
4. Add one row per clip to content/video/footage-log.csv. Keep the existing header. clip_id = SSD-0001, SSD-0002 and so on. file = path relative to the source folder. drive_folder = "SSD". drive_file_id blank. times_used 0.
5. Upload every contact sheet JPG to the Google Drive folder "FOOTAGE CATALOG (contact sheets)", folder id 1JR3QuHNQdKr42tlAUuuWmKWwJ036zUph, named <clip_id>.jpg.
6. Commit footage-log.csv and push to branch claude/tool-identification-nd2ifl. Message: "Footage catalog: SSD b roll, N clips".
7. Report: total clips, total usable minutes, count per shot_type, and every clip flagged CLIENT FACE.

LATER, ON REQUEST ONLY: when a row in the Eden table "Video Pre-production (Claude + Codex)" lists clip_ids under Clips used, upload just those original files (no re-encoding, no compression) to Drive RAW, folder id 1E0-BKNIw1KzvKg8jnyqiv6dytMLV6Qmc, and write the Drive file id into drive_file_id for that clip.
```

## After Codex finishes

1. Alex tells Claude: "catalog is done."
2. Claude reads the catalog and contact sheets, then fills the week's reel plan from footage that already exists.
3. Claude writes the **gap shot list**: only shots the plan needs that the library does not have, checked against every clip so nothing gets filmed twice.
4. Codex uploads only the originals the planned reels use. Claude and Codex cut from those.
