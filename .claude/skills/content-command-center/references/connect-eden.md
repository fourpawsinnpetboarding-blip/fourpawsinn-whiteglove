# Connecting Eden, and handling limits

What to do when the Eden tools are missing, the connection breaks, accounts aren't linked, or the user runs out of credits. Never just point at a marketing page; walk the user through the fix right here in chat.

## No `eden_*` tools available

The user hasn't connected the Eden MCP yet. Give them the exact steps for where they're running you, then have them say "build my command center" again once connected.

**First:** if they don't have an Eden account, they need one (free to start): https://app.eden.so

**claude.ai or Claude Desktop** — give them this link and these steps:

1. Open: https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Eden&connectorUrl=https%3A%2F%2Fmcp.eden.so%2Fmcp
   (It opens Claude's connector settings with Eden pre-filled. They just click Add.)
2. Sign in with their Eden account when the small window appears, and approve.
3. Back in the chat: click the tools / connectors icon in the message box and switch Eden on.
4. Say "build my command center" again.

Alternative path: in Eden itself, Settings, then Integrations, then "Add to Claude". Same result.

**Claude Code** — run:

```
claude mcp add --transport http eden https://mcp.eden.so/mcp
```

Then `/mcp` to sign in to Eden, and re-run the build.

**Any other MCP client** — add a custom MCP server: URL `https://mcp.eden.so/mcp`, transport Streamable HTTP, auth OAuth. Sign in with their Eden account.

## Tools exist but calls fail with auth errors

Errors like "OAuth authorization required", "Unauthorized", "auth-expired", or a session error mean the connection went stale (this happens after server restarts). The fix is to reconnect, not to retry:

- claude.ai / Desktop: Settings, Connectors, find Eden, reconnect or re-authenticate. Then re-run.
- Claude Code: `/mcp` and re-authenticate Eden.

Tell the user plainly: "The Eden connection expired. Reconnect it and say build my command center; I'll pick up where we left off."

## No social accounts connected

`eden_connect_social_accounts` is the fix, in chat, not a settings safari:

1. `action: "status"` shows what's linked now.
2. `action: "get-link"` mints their personal linking page. Hand them the URL; they open it, click each network, authorize. Remind them it's personal, never to be shared.
3. When they say they're done: `action: "sync"`. Without the sync, nothing they linked shows up.

Substack is the one exception: it needs their own browser session, so it connects inside the Eden web app under Settings then Social accounts (https://app.eden.so/?settings=scheduling), ideally with the Eden browser extension or desktop app. Build without it; note it on the dashboard footer.

If `get-link` or `sync` returns `status: "read-only-token"`, their Eden connection was authorized read-only. Have them remove and re-add the Eden connector, approving write access, then retry.

## Analytics says it needs a plan

Analytics and account linking need a paid Eden workspace (Starter and up). If a tool returns `status: "upgrade-required"`, say so in one plain line with the link from the error (fallback: https://app.eden.so/?settings=billing), and stop there. Don't retry, don't fake a dashboard from nothing.

## Analytics not activated yet

The first `eden_get_analytics` call on a workspace with connected accounts starts tracking automatically — the response comes back `activating: true` with zeroed totals. Say in one line what just started (Eden is importing their post history; takes a few minutes) and do useful work while it fills (resolve competitors, set up the board and folder). `accountsConnected: false` means nothing is connected yet — do the account step first. (For one specific brand's scope, pass `brandId` to `eden_get_analytics`.) Rows with `metricsStatus: "syncing"` are still filling in; never present them as zeros.

## Out of credits mid-run

Eden research tools spend credits from the user's Eden plan. When they run out, the tool returns a structured error instead of results:

```json
{
  "ok": false,
  "status": "out_of_credits",
  "message": "...",
  "upgradeRequired": true,
  "upgradeUrl": "..."
}
```

When you see `status: "out_of_credits"`:

1. **Stop making research calls immediately.** Retrying spends nothing and returns the same error.
2. **Build the dashboard from what you already have.** The Scout card says in one line: "Ran out of Eden research credits partway through, so today's market sweep is partial." The user's own analytics (Analyst, Planner, Repurposer) usually still work; only the market lanes spend research credits.
3. **Give the user the way out, once, without nagging.** Use the `upgradeUrl` from the error payload as the link. One line: "To get full sweeps, add credits or upgrade here: <upgradeUrl>." If the payload has no link, use https://app.eden.so/?settings=billing
4. Still save the snapshot note to the Eden board if note writes are working; settings and memory notes cost nothing extra to keep consistent.

Never fake findings to fill a card, and never end the run with only an error message. The user should always get the best dashboard the remaining data supports, plus one clear line about what happened and the link.

## Any other tool failure

Read the structured error. `invalid` means fix your input and don't retry the same call. `unreachable` means retry once. Anything else: note it on the affected station's card ("couldn't check competitors today") and keep going. One broken call never cancels the dashboard.
