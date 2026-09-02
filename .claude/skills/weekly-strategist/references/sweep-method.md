# The sweep method

How to research the market. This is the part that makes the memo worth reading: the same investigator loop Eden's own brief engine ran, sized for an interactive Claude session.

## What counts as a finding

A market MOVE, not an evergreen truth. Something that changed or is changing: a hook or format pattern popping across creators, a topic surging or getting crowded, a creator whose new approach suddenly beats their own baseline. One arguable claim per finding.

- **Confirmed** = the pattern repeats across at least 2 different creators outside the user's own accounts.
- Seen once = record it as **early signal**, and say so.
- One-off news, drama, and politics spikes are noise by definition: virality that does not transfer. Discard them.
- The user's radar creators are leads to study, never a fence around the market. Every finding needs at least one receipt from a creator the user did NOT configure.

## The tools

| Job              | Tool                         | How                                                                               |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| Find breakouts   | `eden_search_social_content` | `scope: {kind: "global"}`, `orderBy: "outlier"`, a `query` from the user's topics |
| Discover people  | `eden_search_creators`       | one topic search plus one radar/list similarity search when useful                |
| Study a creator  | `eden_analyze_creator`       | radar creators with `since: "month"`; look for posts beating their own baseline   |
| Read the anomaly | `eden_read_social_post`      | full text and transcript; use the `contentId` from search results                 |
| Resolve a handle | `eden_resolve_creator`       | never guess handles                                                               |

`outlierScore` is the number that matters: how many times the post beat that creator's own baseline. 2x is solid, 3x+ is a real breakout, 5x+ on a small account is an early signal worth reading.

## Build a small creator landscape

Use one topical creator search for the highest-priority niche or audience problem. Add one creator-similarity search when exact radar refs exist, or one list-similarity search when a curated list is the stronger seed. Do not run all three modes by default.

Deduplicate, exclude the user's own accounts, and select three to five strategically distinct creators across relevant audience sizes. Discovery produces leads, not findings. Analyze only creators that can change the decision.

## Search bounded evidence lanes

Use two to four searches total across genuinely different hypotheses, cohorts, formats, or time windows:

1. **PROOF lane**: `creatorTier: "mid"` or `"macro"`, `since: "month"`, `minOutlierScore: 3`. Established accounts with real reach. This is where a claim earns its biggest receipt.
2. **EARLY lane**: no tier filter, `since: "week"`, `minOutlierScore: 5`. Small accounts breaking out. Patterns start here before big accounts normalize them.
3. **PROVEN lane**: `since: "year"`, `minOutlierScore: 3`. All-time winners. Use as supporting receipts for why a mechanism works, never as the claim that something is moving NOW.

A finding is strongest when the lanes agree: the same pattern showing up in early signals AND carrying real reach somewhere.

Every search result is the complete ranked set for that query. Re-running a similar query returns the same posts. Move between different angles (lanes, topics, radar creators, formats) instead of rewording the same search.

## Drill into anomalies

When a pivotal post massively beats its author's baseline, read it in full (`eden_read_social_post`, two to four reads). Ask WHY it popped: the hook, the format, the topic, the timing. The memo's job is transferable mechanisms. "This topic is hot" is weak; "this hook shape is pulling 4x for three different creators" is a finding.

## Receipts

Each finding carries 2 to 4 receipts. Record for each: the post id, handle, platform, outlier multiple, views or likes, and a one-line note on what this post proves. Rules:

- Lead with at least one receipt with real absolute reach (tens of thousands of views, or hundreds of likes on text platforms). Small-account posts trail as early signal. Truth comes from outlier multiples; persuasion comes from reach. The memo needs both.
- Never a receipt from the user's own profiles.
- At least one receipt per finding from outside the configured radar creators.
- Real ids and metrics only, exactly as the tools returned them.

## Check memory

You read the newest memo in Step 0, plus one older memo only when continuity needs it. For each relevant prior finding, decide from this week's evidence: still **building**, now **saturating** (everyone's doing it, engagement flattening), or was it a one-week blip? Never-before-seen findings are **new**. Carry each finding's first-seen date forward. This week-over-week arc is what makes the memo a strategist instead of a report.

## Whole-run stopping rule

Target 12 to 16 Eden tool calls including lookup and delivery, with a hard ceiling of 18. Run no more than four independent calls in one batch. Retry a failed call once; after a second failure, record the missing coverage and finish from verified evidence.
