# Running the content pipelines

Two independent pipelines live here. Both follow the same shape: a deterministic Node script does the mechanical work, a Claude Code prompt does the caption/hook writing and the Eden calls.

## One-time setup, once per Mac

```
cd ~/dev/fourpawsinn-whiteglove
npm install
brew install ffmpeg          # needed for the Mon/Wed video text overlay
claude mcp add --transport http eden https://mcp.eden.so/mcp
claude
/mcp                          # sign in to Eden once, interactively
```

Higgsfield, for the image-to-video test below (founder-talking-head is closed, no avatar path exists, see `config/formats/founder-talking-head.json`):
```
npm install -g @higgsfield/cli
higgsfield auth login         # browser login, once
higgsfield workspace set <your workspace id>
```

## Testing image-to-video (Mon/Wed without filming)

Not built into the weekly pipeline yet, this is a one-off test to see if it's worth building in. Never run this without a credit ceiling, `scripts/lib/higgsfield-budget.js` enforces one (20 credits by default) by previewing every job's cost first and refusing to create anything if the total is over.

1. Find candidates: `higgsfield model list --video --json`, then `higgsfield model get <name> --json` on ones that look promising, any model accepting an `--image` or `--start-image` param is a candidate. Pick 2 to 4, not all 30.
2. Run:
   ```
   node scripts/test-image-to-video.js /path/to/a/real/dog/photo.jpg model1 model2
   ```
3. It previews cost for every model first, refuses to run anything if the total is over 20 credits, then generates and downloads each result to `content/generated/image-to-video-test/`. Look at them and judge quality yourself, or send me the folder and I'll pull frames and give you a read.
4. If one earns a place in the weekly slate, that's a new format definition in `config/formats/` and a new resolver in `scripts/weekly-pipeline.js`, not a hand-run script. Ask for that once you've picked a model.

## Investigating ad_multiplier

Not confirmed to exist as a named command or workflow yet. `higgsfield marketing-studio dtc-ads generate` looks similar in shape (one prompt plus a format, `--batch-size` up to 20 variations in one call) but that is a guess, not a confirmation. To get a real answer:
```
higgsfield workflow list --json
higgsfield workflow get ad_multiplier --json
```
Paste the output back and I'll tell you plainly what it does and whether it fits.

## Single photo pipeline (daily)

```
node scripts/photo-pipeline.js          # deterministic: reject, convert, resize, strip EXIF
claude -p "$(cat scripts/run-photo-pipeline.md)"   # captions + Eden drafts
```

## Weekly content machine (Sundays)

```
bash scripts/run-week.sh
```

This runs the scan (`node scripts/weekly-pipeline.js scan`) and then `claude -p` with `scripts/run-week.md`, logging to `content/weeks/logs/`. Test it by hand before trusting the schedule.

### Installing the Sunday 5am trigger

1. Open `scripts/com.fourpawsinn.weeklycontent.plist` and replace every `USERNAME` with your actual Mac username (find it with `whoami`).
2. Copy it into place and load it:
   ```
   cp scripts/com.fourpawsinn.weeklycontent.plist ~/Library/LaunchAgents/
   launchctl load ~/Library/LaunchAgents/com.fourpawsinn.weeklycontent.plist
   ```
3. To test it fires correctly without waiting for Sunday:
   ```
   launchctl start com.fourpawsinn.weeklycontent
   ```
4. To stop it: `launchctl unload ~/Library/LaunchAgents/com.fourpawsinn.weeklycontent.plist`

The plist calls `bash -lc` so it picks up your normal shell PATH (node, claude, ffmpeg, higgsfield). If the job runs but the log shows "command not found," the tool in question is not on the PATH launchd sees, which is not always your interactive terminal's PATH. Add the exact export lines your shell profile uses into `scripts/run-week.sh` near the top if that happens.

## Raw material

See `content/README.md` for exactly what filename goes where for each day of the week.
