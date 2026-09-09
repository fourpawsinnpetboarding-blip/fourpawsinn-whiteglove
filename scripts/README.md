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

Higgsfield, if the founder-talking-head track ever gets confirmed and turned on:
```
npm install -g @higgsfield/cli
higgsfield auth login         # browser login, once
higgsfield workspace set <your workspace id>
```

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
