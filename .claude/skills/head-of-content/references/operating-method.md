# The operating method

How the four loops run: exact tools, budgets, and the rules that keep the plan honest. The skill summary is not enough; this is the method.

## Budgets

- **Research calls: at most 12 per run** (searches, creator pulls, post reads). Lookup, memory reads, and delivery writes sit outside this number, but the whole run stays under roughly 22 tool calls.
- No more than four independent calls in one batch.
- Retry a failed call once. After a second failure, record what's missing and plan from verified evidence.
- Spend calls on different questions, never on rewording the same query.

## Loop 1 — Review (their numbers)

Tools: `eden_get_analytics` (the digest: totals, deltas, benchmarks), `eden_analyze_creator` on each of their own accounts with `since: "month"` (posts against their own baseline), `eden_list_scheduled_posts` (what's queued and what stalled in drafts).

Produce three reads:

1. **Last week's plan, graded** (when a week note exists): each slot marked posted / still in drafts / skipped, and each posted one marked above or below their baseline with its number.
2. **What's working for them**: their formats and topics running above baseline this month.
3. **Repost candidates**: their own posts at 1.5x baseline or better, older than 3 weeks, worth a second life. Zero or one per week in the plan, never more.

Their posts are performance data, never market evidence, and never appear as receipts.

## Loop 2 — Strategy (the market check)

**First, check for a Weekly Strategist memo.** `eden_search_workspace_items` for a board named "Weekly strategy"; if its newest memo is from the last 7 days, read it, adopt its findings and bet as this week's market input, and credit it in the report ("market read: this week's strategy memo"). Spend your remaining research budget confirming or extending it, not repeating it.

**Otherwise run a light sweep** (this is a planning input, not a research report):

- 2 to 4 `eden_search_social_content` calls on their topics, `limit` 5: one proof lane (`scope: "global"`, `orderBy: "outlier"`, `creatorTier: "mid"`, `since: "month"`, `minOutlierScore: 3`) and one early lane (`since: "week"`, `minOutlierScore: 5`, no tier). Add at most two more for a format or cohort question the plan actually needs answered.
- Up to 2 `eden_analyze_creator` pulls on watched creators whose moves could change the plan.
- Read at most 2 pivotal posts in full (`eden_read_social_post`).

A pattern counts as proven when it shows on at least 2 different creators. Seen once, it's an early signal and gets said that way. One-off news, drama, and politics spikes are noise.

## Loop 3 — Calendar (the plan)

Build one slot per post in their stated cadence. Every slot carries:

1. **Day** (and platform).
2. **The idea**: one literal 8 to 20 word claim a cold reader understands. No colons, no headline punctuation.
3. **Format**: what to make, one line ("a text post with a screenshot", "a 5-slide carousel", "a 60-second talking-head reel").
4. **Evidence**: a receipt post (@handle, platform, outlier multiple, reach, one line on what it proves), OR their own baseline data ("your last three posts in this format beat baseline"), OR the word **experiment** said plainly.

Plan rules:

- At most one experiment slot per week.
- At most one repost slot per week, drawn from Loop 1's candidates.
- Match formats to the platform and to what THEY can actually produce (their history shows what they make; don't plan a video week for someone who has never posted video without flagging it).
- Never re-plan an idea from the last two week notes, anything queued, or anything they already published.
- If evidence honestly supports fewer slots than their cadence, deliver fewer and say why in one line. A padded calendar is a lie with dates on it.

Present the slate compactly in chat (one line per slot: day, platform, idea, evidence) and wait for the user's ok. Apply their edits to the slate, not in your head: the approved slate is what gets drafted and what goes in the report.

## Loop 4 — Production (drafts in their voice)

For each approved slot, write the complete post: hook, body, and (where the platform wants one) the closing line or CTA. Full text, ready to publish as-is, in their voice:

- Voice comes from their own posts pulled this run and, when available, `eden_get_my_voice`. Match their vocabulary, cadence, and recurring ideas.
- Plain spoken language. Short words, short sentences. Every hook must pass the say-it-out-loud test.
- Banned: analyst jargon (salience, narrative, paradigm, discourse, reframe-as-a-noun), academic hedging, and em dashes. Banned AI frames, at most once across the whole week if truly needed: "X is not Y, it's Z", "You don't need X, you need Y", "Stop X. Start Y", "Most people think X".
- Never reuse a run of 8 or more words from any receipt post. Borrow the structure, never the sentences.
- Never diagnose, dismiss, or redefine a medical or mental-health condition for a hook.

Queue each draft with `eden_schedule_post` and `draft: true`. Nothing gets a publish time unless the user asked for times, and nothing ever publishes. Record per slot in the week note: drafted and queued, drafted as note (read-only fallback), or skipped and why.
