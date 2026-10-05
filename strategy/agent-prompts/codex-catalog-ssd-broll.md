# Footage library: how each agent gets the b roll

Alex's rule (2026-10-05): each agent reviews and edits its own videos. Claude does not depend on Codex to feed it footage. Codex steps in for Claude only if Claude runs out of capacity and Alex says so.

## Where the footage lives

Google Drive, inside `Content / FPI-VIdeos`, six folders copied from the SSD on Oct 5 and shared by link (viewer) so the cloud agent can stream them:

- Client Moments
- Facility & Environment
- Human-Dog Interaction
- Pets (Behavior & Emotion)
- Services & Upsells
- Testimonials & Reviews

Folder links and file ids stay out of this repo. The originals stay on the SSD too.

## Claude (cloud)

1. Streams frames straight from Drive (no full downloads) and builds its own contact sheets.
2. Logs every clip once in the private Google Sheet `FPI Footage Catalog (private)` with clip_id `LIB-0001` and up.
3. Downloads only the clips a reel uses, renders with `scripts/video-engine/text-reel.py` at full quality, uploads finished reels to `READY TO POST - Claude`.

## Codex (Mac)

Paste into Codex:

```
Read scripts/video-engine/README.md and strategy/agent-prompts/codex-catalog-ssd-broll.md in the fourpawsinn-whiteglove repo.

Review and edit your own videos for your 4 PM slot. Use the b roll on /Volumes/Extreme SSD/00_VIDEOS (the six green folders) or the same folders in Google Drive Content / FPI-VIdeos. Never move, rename, edit or delete an original.

Before planning, read the Google Sheet FPI-VIdeos / FPI Footage Catalog (private). Claude logs every clip there as LIB-0001 and up. Use those same clip_ids in your Eden table rows so neither of us reuses a hero clip inside 8 weeks. If you find a clip that is not in the Sheet, add it with the next free LIB number.

Render from originals at full quality. Upload finished reels to FPI-VIdeos / READY TO POST - Codex.
```
