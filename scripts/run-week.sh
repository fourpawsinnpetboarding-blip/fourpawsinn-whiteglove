#!/bin/bash
# Runs the weekly content machine end to end: the deterministic scan, then
# the Claude Code orchestration step that writes captions/hooks and talks
# to Eden. This is the actual "one command" — it has to be two steps under
# the hood because Eden calls need a live, authenticated Claude Code
# session, not a bare script (see scripts/run-week.md for why).
#
# Test it by hand first: `bash scripts/run-week.sh`
# launchd runs this same script on Sundays at 5am, see
# scripts/com.fourpawsinn.weeklycontent.plist

set -euo pipefail

REPO_DIR="$HOME/dev/fourpawsinn-whiteglove"
cd "$REPO_DIR"

LOG_DIR="$REPO_DIR/content/weeks/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/$(date +%Y-%m-%d-%H%M).log"

{
  echo "=== weekly content machine run: $(date) ==="
  claude -p "$(cat scripts/run-week.md)"
  echo "=== done: $(date) ==="
} >> "$LOG_FILE" 2>&1
