---
name: scoreboard-pull
description: Pull a read-only performance scoreboard from Meta Ads, Google Ads, GA4, and Google Search Console. Use when the user asks for the scoreboard, paid-media spend/CPL/CAC, website sessions/top pages, search queries/clicks, or a 7-day and 30-day acquisition summary. Never changes, sends, publishes, or configures anything in a live account.
---

# Scoreboard Pull

Run the deterministic collector and report what the APIs actually returned. The skill is read-only: it may make GET/report requests and write local output files, but it must never create or edit campaigns, properties, users, tags, permissions, audiences, conversions, posts, messages, or account settings.

## Before running

1. Read the client-specific business-facts file configured by the repository when business context is needed. Do not copy client facts into this generic skill.
2. Read `references/configuration.md` when credentials are missing, a source is unavailable, or metric definitions need explanation.
3. Confirm `.env` is ignored with `git check-ignore .env`. Never print, log, commit, or paste credential values.

## Run

```bash
python core/skills/scoreboard-pull/scripts/scoreboard_pull.py --env-file .env --output-dir scoreboard-output
```

The command writes `scoreboard-latest.md`, `scoreboard-latest.json`, and dated copies. It exits successfully when at least one source succeeds. One broken source must not cancel the others.

## Output contract

- Paid media: Meta, Google Ads, and combined spend, leads, customers, CPL, and CAC for the last 7 and 30 completed days.
- GA4: sessions for 7 and 30 completed days and top pages for 30 days.
- Search Console: clicks for 7 and 30 completed days and top queries for 30 days.
- Coverage: every source is marked `ok`, `unavailable`, or `error`, with a short actionable reason.
- Never show a missing value as zero. Render it as `Unavailable`.
- Never label spend divided by leads as CAC. CAC requires a verified customer count.

## Metric rules

- Date windows use completed days only: yesterday back 7 days and yesterday back 30 days in `SCOREBOARD_TIMEZONE`.
- CPL = spend / verified lead count.
- CAC = spend / verified new-customer count.
- Meta leads/customers come from configured action types.
- Google Ads leads/customers come from configured conversion-action name patterns.
- Optional verified CRM totals (`SCOREBOARD_CUSTOMERS_7D`, `SCOREBOARD_CUSTOMERS_30D`) drive combined CAC. If absent, combined CAC is unavailable.
- Preserve platform attribution differences; do not imply Meta and Google conversions are deduplicated people.

## Failure handling

- Retry network failures, HTTP 429, and HTTP 5xx up to three attempts with bounded backoff.
- Do not retry authentication, authorization, or malformed-request errors.
- Continue the remaining sources and preserve the error in the coverage section.
- Never open a write-capable endpoint. Required Google OAuth scopes are listed in `references/configuration.md`.
