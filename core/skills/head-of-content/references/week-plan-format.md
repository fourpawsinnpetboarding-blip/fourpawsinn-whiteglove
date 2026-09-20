# The week report format

The exact output contract. The deliverable is one document: the week report. It reads like a competent employee's Monday update: what happened, what we're doing, where the drafts are. Every section must make sense on its own.

## Writing rules (non-negotiable)

- **Plain spoken language**, like a smart employee talking to their boss. Short words, short sentences. No throat-clearing.
- **Banned**: analyst jargon (salience, narrative, paradigm, discourse, reframe-as-a-noun), academic hedging, and em dashes. Use periods and commas.
- **Banned AI frames**, at most once across the whole report if truly needed: "X is not Y, it's Z", "You don't need X, you need Y", "Stop X. Start Y", "Most people think X".
- Numbers are real and attributed. Post ids never appear in prose; receipts render as data lines.
- Grades are blunt and kind: "didn't go out" beats a euphemism, and a below-baseline post gets one line on the likely why, never a lecture.

## Report anatomy

Four sections, in order:

1. **Last week** (skip header on the first run and say "First week; nothing to grade yet"): each planned slot with its grade (posted + result vs baseline, still in drafts, or skipped), then one line naming the week's honest lesson.
2. **The read**: 2 to 4 short lines on what the market check found, each with its receipt or source ("this week's strategy memo" counts). End with **the bet**: one sentence starting with a verb, the single clearest thing this week's plan is built on.
3. **This week's plan**: the approved slate, one block per slot: day + platform, the idea (one literal claim), format, the full draft status ("drafted, in your queue"), and its evidence line. Experiments and reposts are labeled as such.
4. **Watch**: 1 to 3 lines: what to look at by Friday (a format to judge, a creator to watch, the experiment's success test).

## The template (markdown)

```markdown
# Content week — {date}

## Last week

- {slot}: {grade, one line}
- ...

{One line: the lesson.}

## The read

- {finding} — @{handle} ({platform}) · {N.N}x baseline · {reach}
- ...

**The bet:** {one sentence, starts with a verb.}

## This week

### {Day} · {Platform} — {the idea, one literal claim}

{Format, one line} · {status: drafted, in your queue}
Evidence: {receipt line, baseline line, or "experiment: {what it tests}"}

### {next slot...}

## Watch

- {one line}

---

{One line: research calls used, whether a strategy memo was reused, anything that came up dry.}
```

## Styled delivery

The report is a document, not a chat message. In order of preference:

1. **HTML artifact / file**: use `assets/week-plan-template.html`. Replace the `{{...}}` slots and repeat the marked blocks. Keep its design; do not restyle it.
2. **Markdown**: the template above, exactly.

In both cases, ALSO save the markdown version to the Eden note `Content week — YYYY-MM-DD` on the "Head of content" board (that note is next week's memory and the grading sheet; never skip it). In chat, after delivering, close with two lines only: where the drafts are, and the one thing to watch this week.
