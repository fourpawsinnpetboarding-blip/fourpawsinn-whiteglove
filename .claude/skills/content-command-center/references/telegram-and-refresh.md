# Telegram digest and the refresh loop

Claude Code lane only (needs files and a shell). On claude.ai, the refresh story is a scheduled task; skip this file.

## Rules first

- The bot token lives in the project's `.env`, which is gitignored. Never print it, never commit it, never put it in a command the user will see with the token inlined.
- Verify against reality: the step isn't done until the user says the message landed on their phone.
- If a bot or `.env` already exists, inspect and reuse it. Never overwrite.

## Setting up the bot (walk them through, one move at a time)

1. Have them open Telegram and message **@BotFather**.
2. Send `/newbot`, pick a name and a username. BotFather replies with a token.
3. Have them paste the token to you ONCE; write it to `.env` as `TELEGRAM_BOT_TOKEN=...` immediately and confirm `.env` is in `.gitignore`. Don't echo it back.
4. Have them open their new bot and send it any message (this is required; a bot can't see its chat id until it's been messaged).
5. Get the chat id: call `getUpdates` and read `message.chat.id` from the reply:

```bash
source .env && curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" | head -c 2000
```

6. Write `TELEGRAM_CHAT_ID=...` into `.env`.

## The sender script

Write `scripts/send-digest.sh`, roughly:

```bash
#!/usr/bin/env bash
# Sends the command-center digest to Telegram. Reads .env; never prints the token.
set -euo pipefail
cd "$(dirname "$0")/.."
source .env
TEXT="$(cat dashboard/digest.txt)"
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  --data-urlencode text="${TEXT}" > /dev/null
echo "digest sent"
```

Each refresh, write `dashboard/digest.txt` before sending: 6 to 10 short lines, real numbers only. Shape:

```
Command center — {date}
{goal metric}: {value} ({delta} vs last period)
Followers: {total} ({delta})
Top post: {preview} — {views}
Market: {scout status line}
The bet: {strategist bet}
Queue: {planner status line}
```

Run the script once now, and ask the user to confirm it arrived on their phone. Not confirmed = not done; debug (`getUpdates` again, check the chat id) before moving on.

## The refresh loop

The refresh is a scheduled Claude run of the prompt **"Refresh my content command center."** That run re-reads the Eden settings note, re-runs the stations, rewrites `dashboard/index.html` and `dashboard/digest.txt`, and fires the sender script. Weekly is the sane default; let the user pick day and time.

- **Claude Code scheduled runs / cron:** schedule `claude -p "Refresh my content command center."` (or the harness's scheduled-task feature where available) at their chosen time. On macOS, launchd works the same way; keep the job's log in the project folder.
- Prove it once: trigger the job manually end to end while they watch (data pulls, dashboard rewrites, phone buzzes). Don't call the loop done until they've seen one full cycle.
- Remind them once: the refresh spends Eden research credits on the Scout's market sweep (their own analytics reads are the cheap part). If a scheduled run hits `out_of_credits`, it still rebuilds the dashboard from their own data, labels the market card partial, and says so in the digest.
