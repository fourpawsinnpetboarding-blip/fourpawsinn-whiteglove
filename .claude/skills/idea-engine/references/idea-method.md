# The idea method

How to research the three lanes and fuse them into cards worth posting. This is what separates the engine from a generic "10 content ideas" list: every card traces to real material and real evidence pulled this run.

## What counts as an idea

Something the user could draft in the next ten minutes and post today. One post, one platform, one angle. "Talk about pricing" is not an idea. "The pricing mistake I made for two years, told as a 60-second story, opening with the number" is an idea.

Every card stands on legs:

- **Their material**: a capture, highlight, or note the user saved. Substance they already believe in.
- **A proven format**: a real post whose shape (hook mechanism, structure, pacing) demonstrably worked, from the market or tangent lane.
- **A live signal**: evidence the topic or format is moving right now, not evergreen filler.

**A card needs at least two legs.** The best cards have all three: their saved material, shaped like a proven post, riding a live wave. One-leg ideas get cut. Cards never share a receipt or a source; spread the evidence.

## Budgets for one run

At most 15 research calls total, spent across different angles rather than rewording one query:

- Workspace lane: up to 3 searches
- Market lane: up to 6 searches
- Tangent lane: up to 2 creator pulls
- Full post reads: up to 4

Memory reads (settings note, run notes, scheduled posts, voice) are outside this budget. When the budget runs dry, fuse what you have.

## Lane 1 — Workspace (their saved material)

What the user captured is a map of what they care about. Mine it:

| Job                               | Tool                        | How                                                       |
| --------------------------------- | --------------------------- | --------------------------------------------------------- |
| Recent captures on their topics   | `eden_search_captures`      | one query per topic cluster; recent first                 |
| Saved quotes and clips            | `eden_search_highlights`    | topic keywords; highlights are pre-distilled substance    |
| Notes and saved items, by meaning | `eden_find_workspace_items` | semantic; use for the fuzzy "what do they have on X" pass |

Read the strongest hits. What you want from this lane: a claim, a story, a number, a quote, a half-written thought. Note each item's title so the card can point back at it. If the lane comes up empty, say so in the delivery and lean on the other two lanes; never fake a source.

## Lane 2 — Market (what's breaking now)

`eden_search_social_content`, `scope: {kind: "global"}`, `orderBy: "outlier"`, queries from their topics. Two lanes, freshest first:

1. **TODAY lane**: `since: "week"`, no tier filter, `minOutlierScore: 5`. What's breaking right now. This is the "why today" on most cards.
2. **PROOF lane**: `creatorTier: "mid"` or `"macro"`, `since: "month"`, `minOutlierScore: 3`. Established accounts with real reach; a card's biggest receipt usually comes from here.

`outlierScore` is the number that matters: how many times a post beat that creator's own baseline. Read the biggest anomalies in full (`eden_read_social_post`) and work out WHY each popped: the hook, the format, the topic, or the timing. A transferable mechanism makes a card; "this topic is hot" doesn't.

One-off news, drama, and politics spikes are noise: virality that does not transfer. Discard them. The user's own posts are never receipts.

## Lane 3 — Tangents (formats from outside the niche)

The non-obvious cards come from here. Creators in the user's exact niche give ideas that look like everyone else's feed. Creators one door over run formats the user's audience hasn't seen yet.

- Pick 1 or 2 per run: rotate through the tangent creators from the settings note, and when a search result surfaces an interesting creator in an adjacent topic, spend one pull there instead. Vary the picks run to run.
- `eden_analyze_creator` with `since: "month"`. Look for their posts beating their own baseline, and name the FORMAT behind each breakout in plain words: "ranked list with a hot take at #1", "screenshot of a note with one sentence on top", "before/after with the numbers".
- The translation is the idea: their format, the user's topic and material. The card says whose format it borrows and what the format is, plainly.

## Fusing

Lay the lanes side by side and look for intersections:

- A saved capture + a breakout format = the strongest card type. Their substance, a proven shape.
- A live market wave + their saved take on that exact topic = a "say it today while it's moving" card.
- A tangent format + their topic = the novelty card. Cap these at 2 per run; novelty without their material drifts generic.

Rank by: (1) how strong the receipt is, real reach beats big multiples on tiny accounts; (2) how much of the work their saved material already does; (3) freshness of the signal. Keep 5 to 8. Cut one-leg cards without mercy.

## Dedupe

Before finalizing, check every card against: the last 3 run notes (ideas already pitched), `eden_list_scheduled_posts` (already queued), and their own recent posts (already published). Kill matches. An engine that repeats itself gets turned off.
