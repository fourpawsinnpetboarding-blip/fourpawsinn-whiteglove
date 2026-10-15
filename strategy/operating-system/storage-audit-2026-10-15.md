# Drive storage audit, read only (Oct 15 2026)

Ask (Alex): can Drive storage be cut while the content workflow keeps working? Nothing was deleted, moved, uploaded, shared or cancelled.

## 1. Where Claude runs (verified)
- Claude runs in an Anthropic cloud Linux container (hostname "vm"), not on Alex's Mac.
- `/Volumes/Extreme SSD/00_VIDEOS/Human-Dog Interaction/20260322_C0108.MP4`: not found. `/Volumes` does not exist here. Claude cannot read the SSD, so no metadata could be read directly.
- Index record for the sample (LIB-0001 / SSD-0068): 20260322_C0108.MP4, 5.51 s, 3840x2160, Drive id on file. Codex's match evidence: exact filename, folder, duration within 0.06 s, resolution.

## 2. Why the workflow needs Drive today (verified from the code)
1. Source footage for cloud renders: `scripts/video-engine/render.py` downloads every clip by Drive file id (folders must be link shared). This is the only way Claude reaches footage.
2. Music: 20 licensed MP3s plus `credits.txt` live only in Drive (FPI-VIdeos / MUSIC).
3. The footage index itself (`fpi-footage-index.csv`) lives in Drive.
4. Scheduled cloud jobs (Friday reel run, daily board checks) have no Mac, so they read Drive.
5. Handoff: Amanda uploads phone originals to RAW; Codex and Claude drop masters in READY TO POST folders.
- Not needed for Eden: Claude uploads finished reels to Eden straight from the container.

## 3. Index check (verified)
- 81 clips. All 81 have both a Drive id and an SSD path (Codex mapping). 1 duplicate row.
- All 30 clips used in reel specs are mapped to the SSD.
- Not verified by Claude: that each SSD file still exists (no SSD access).
- Drive only, no SSD copy on record: music library and credits, the index, RAW uploads after Oct 6, READY TO POST outputs, Rachel's concept videos and ad batch folders.

## 4. To edit on the Mac from the SSD
1. Add a local mode to render.py: read `ssd_file` under `/Volumes/Extreme SSD/00_VIDEOS` instead of downloading from Drive. Codex runs renders on the Mac.
2. Claude keeps writing specs, captions and QA in the cloud; Codex renders; masters go straight to Eden or to READY TO POST.
3. Drive keeps a small working set only: music, index, RAW inbox, READY TO POST, and clips used in the last 90 days.
4. Cost: Claude can no longer render alone from the cloud. Reel production then depends on the Mac being on.

## 5. Mac asleep, offline, or SSD unplugged
- Posts already scheduled in Eden still publish (media is hosted by Eden).
- Claude's cloud routines still run, but any render that needs a clip not in Drive fails.
- Codex jobs on the Mac do not run while it sleeps. A launchd calendar job runs once on wake if missed. With the SSD unplugged the path is missing and the render fails.
- The SSD is a single point of failure until it has a second copy.

## 6. Test and backup before any downgrade (all still to test)
1. Codex: read only Drive storage report for both accounts (Four Paws and Chiong Enterprise): total used, plan and price, top folders by size.
2. Codex: open 5 random used clips on the SSD and confirm duration and resolution match the index.
3. End to end: Codex renders one existing spec on the Mac from the SSD, uploads the master to Eden as a draft, Claude QAs it against the cloud render.
4. Backup: a second copy of the SSD (second drive or a cloud backup service) before removing anything from Drive.
5. Only then decide which Drive folders to archive.

## Recommendation
Simplest reliable setup: Drive keeps the working set (a few GB), the SSD holds the full archive, plus one more backup. First get the numbers: if Drive costs about $10 a month for 2 TB, the saving may not be worth the risk.
