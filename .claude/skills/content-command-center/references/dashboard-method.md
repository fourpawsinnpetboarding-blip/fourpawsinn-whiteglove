# The five stations

How each station gets its data, what it produces, and the budgets for one refresh. Every station's output has the same three parts: a **status line** (one sentence, plain words, the takeaway), up to **three headline metrics**, and **detail rows** for the drill-down section. Real tool results only; a station with thin data says so instead of padding.

## Budgets for one refresh

At most 18 tool calls total:

- 1 digest (`eden_get_analytics`) + up to 2 post lists (`eden_list_analytics_posts`)
- 1 `eden_list_schedules` + 1 `eden_list_scheduled_posts`
- up to 5 competitor pulls (`eden_analyze_creator`)
- up to 6 market searches (`eden_search_social_content`)
- up to 2 full post reads (`eden_read_social_post`), only for a post about to headline the Scout card

First-time setup calls (connect, activate, resolve, board, notes) don't count against this. If the budget runs out, ship the dashboard with what you have; note what got skipped in the footer.

## Analyst — how you're doing

**Calls:** `eden_get_analytics` (default window; use `days: 90` when the user asks about trends).

- Status line: the honest read of the period. Lead with the user's goal metric from settings ("Views up 42% on 12 posts; followers +310").
- Metrics: total views (or the goal metric), engagements, follower total, each with the vs-previous delta from `previousTotals`.
- Detail rows: per-account followers, and the benchmark lines when `benchmarks` is present ("you beat 72% of your cohort on engagement"). `benchmarks: null` means no peer read yet; leave the line out, don't explain.
- Outliers from the digest feed the hero's "top post" tile.

## Scout — what's moving in your market

**Calls:** up to 5 `eden_analyze_creator` (the settings competitors, `since: "month"`) and up to 6 `eden_search_social_content` across the settings topics. Search lanes, in priority order:

1. PROOF: `scope: "global"`, `creatorTier: "mid"`, `since: "month"`, `minOutlierScore: 3` per topic.
2. EARLY: `since: "week"`, `minOutlierScore: 5`, no tier cap, one or two topics only.

- Status line: the single strongest market move ("Competitors' teardown posts are running 4x baseline this week").
- Metrics: breakout posts found, hottest outlier multiple, competitors checked.
- Detail rows: up to 6 receipts: @handle, outlier multiple, reach, one plain note on why it worked, link. A competitor beating their own baseline outranks a stranger's viral post.
- The user's own posts are never Scout evidence.

## Strategist — what to do about it

**Calls:** none of its own. It reads the Analyst's digest (`topTopics`, `topFormats`), the Scout's receipts, and the last snapshot note.

- Status line: THE BET. One sentence, starts with a verb, specific enough to act on today ("Post a 60-second teardown of a competitor funnel on Tuesday").
- Metrics: best topic (with its outlier multiple), best format, posts behind that read.
- Detail rows: 2 or 3 plays, each one line of "make this" plus which receipt it borrows from; grade last run's bet in one honest line when a snapshot note exists ("First build, nothing to grade yet" otherwise).
- Minimum 2 posts behind any topic/format claim; below that, say "not enough posts to call it".

## Planner — what's actually queued

**Calls:** `eden_list_schedules` (timezone, next open slot) + `eden_list_scheduled_posts` (upcoming, status scheduled).

- Status line: the queue's true state ("4 posts queued through Thursday, next slot Friday 9am" or "Nothing scheduled; the calendar is empty").
- Metrics: queued count, days covered, next open slot.
- Detail rows: the next 5 queued posts (platform, time, first line). An empty queue is a finding, not an apology; pair it with the Strategist's bet as the suggested fill.
- Never schedule anything from this skill. Point at the bet and let the user say the word.

## Repurposer — old winners worth a second life

**Calls:** `eden_list_analytics_posts` with `sort: "views"` (reuse the Step 3 pull when fresh; one extra call at most).

- Filter: `outlierScore >= 1.5` and posted more than 3 weeks ago.
- Status line: the count and the single best candidate ("6 old outliers are worth a second run; the March pricing thread did 3.1x").
- Metrics: candidates found, best multiple, oldest still-working theme.
- Detail rows: up to 5 posts: preview, original multiple and reach, one line on how to re-run it (same idea, fresh angle; never "repost verbatim").
- Nothing qualifying: say the library is young and move on.

## Filling the template

`assets/dashboard-template.html` has a slot for every piece above plus the hero (name, date, goal metric, followers, views, engagement, top post). Fill the slots, repeat the marked blocks, delete a station's optional rows rather than inventing content. The footer records: tool calls spent, what got skipped, where the snapshot note lives.
