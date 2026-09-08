# The card format

The exact output contract. The deliverable is a short document of idea cards, each one complete enough to start drafting immediately. Every card must stand alone: a reader who sees only that card knows exactly what to make and why.

## Writing rules (non-negotiable)

- **Plain spoken language**, like texting a smart friend. Short words, short sentences. Every hook must pass the say-it-out-loud test.
  - BAD: "Leverage mortality salience as an urgency trigger in your opener."
  - GOOD: "You're going to die anyway, so do the thing."
- **Banned**: analyst jargon (salience, narrative, paradigm, discourse, reframe-as-a-noun), academic hedging, and em dashes. Use periods and commas.
- **Banned AI frames**, at most once across the whole set if truly needed: "X is not Y, it's Z", "You don't need X, you need Y", "Stop X. Start Y", "Most people think X".
- Hooks match the USER'S language from their own saved material and posts returned this run: their vocabulary, cadence, and recurring ideas. Do not invent or fetch a separate identity profile. A hook that could belong to any growth account is a failed hook.
- Never reuse a run of 8 or more words from any receipt post. Borrow the structure, never the sentences.
- Post ids never appear in prose. Receipts render as data lines.
- Never diagnose, dismiss, or redefine a medical or mental-health condition for a hook.
- Honest when thin: if only 3 cards clear the bar, deliver 3 and say why. Padded cards kill trust in every future run.

## Card anatomy

Every card carries exactly these parts:

1. **The idea**: one literal 8 to 20 word claim a cold reader understands. No colons, no headline punctuation.
2. **Hook**: 1 or 2 opening lines, ready to paste, in the user's voice.
3. **Format**: what to make and where, one line. "A 60-second talking-head reel", "a text post with a screenshot", "a 5-slide carousel". Name the platform.
4. **Receipt**: the real post that proves the shape works: @handle, platform, outlier multiple, reach, and one line on what it proves. From this run's tools, exactly as returned.
5. **Your material**: the user's own capture, highlight, or note to build from, named by title, with one line on what to pull from it. Omit ONLY on a market or tangent card with no workspace leg, and then say what to draw on instead.
6. **Why today**: one line. The live signal, or what makes this timely. "This format started popping this week" beats "this is a good topic".

## The template (markdown)

```markdown
# Ideas — {date}

{1-2 sentences: today's read at a glance. Which lane is hottest, under 35 words.}

## 1. {the idea, one literal claim}

**Hook:** {1-2 opening lines in the user's voice}
**Make:** {format + platform, one line}
**Receipt:** @{handle} ({platform}) · {N.N}x baseline · {reach} — {what it proves}
**Your material:** {item title} — {what to pull from it}
**Why today:** {one line}

## 2. {next card...}

---

{One line: how many searches ran, which lanes fed today's cards, anything that came up dry.}
```

## Styled delivery

The cards are a document, not a chat message. In order of preference:

1. **HTML artifact / file**: use `assets/idea-cards-template.html`. Replace the `{{...}}` slots and repeat the marked card block. Keep its design; do not restyle it.
2. **Markdown**: the template above, exactly.

In both cases, ALSO save the markdown version to the Eden note `Ideas — YYYY-MM-DD` on the "Idea engine" board (that's the memory that stops tomorrow's run from repeating today). In chat, after delivering, close with two lines only: the single card you'd post first and why, then the one-line draft offer from Step 4 of the skill.
