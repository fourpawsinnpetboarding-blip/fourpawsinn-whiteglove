# The memo format

The exact output contract. Keep the memo to at most roughly 1,500 words, shorter whenever evidence is thin, with at most three findings and exactly three plays. Every section must stand alone: a reader who jumps straight to the bet understands it completely without reading anything else.

## Writing rules (non-negotiable)

- **Plain spoken language**, like texting a smart friend. Short words, short sentences. Every claim must pass the say-it-out-loud test.
  - BAD: "Mortality salience is breaking out as a creative urgency trigger."
  - GOOD: "'You're going to die anyway, so do the thing' posts are blowing up right now."
- **Banned**: analyst jargon (salience, narrative, counter-narrative, orthodoxy, paradigm, discourse, reframe-as-a-noun, "X is being challenged by Y"), academic hedging, and em dashes. Use periods and commas.
- **Banned AI frames**, at most once across the whole memo if truly needed: "X is not Y, it's Z", "You don't need X, you need Y", "Stop X. Start Y", "Most people think X".
- Never coin a shorthand for a finding ("the fig tree problem") and refer back to it. Name the actual thing every time.
- Never diagnose, dismiss, or redefine a medical or mental-health condition for a hook.
- Post ids never appear in prose. Receipts render as data lines.
- Titles and claims get no colons and no headline punctuation. State the idea plainly.
- Honest when sparse: if the sweep was thin, the memo says so. Fewer, real findings beat padded ones.

## The template (markdown)

```markdown
# Weekly strategy — {date}

{intro: 1-2 sentences, the week's read at a glance, under 45 words}

## Signal — what's moving in your market

### 1. {finding claim, one arguable sentence}

`{new | building | saturating}` · first seen {date} {· early signal, if unconfirmed}

{2-3 sentences: what's happening and why it's popping, under 60 words}

**For you:** {verb-first line, how this creator specifically uses it, under 30 words}

Receipts:

- @{handle} ({platform}) · {N.N}x baseline · {reach} — {what this post proves, one line}
- @{handle} ({platform}) · {N.N}x baseline · {reach} — {note}

### 2. {next finding... up to three total}

## Your scoreboard

{1-2 sentences, performance read only, no strategy talk}

| Post                              | Result                    | Read                                              |
| --------------------------------- | ------------------------- | ------------------------------------------------- |
| {title or first words, truncated} | {N.N}x baseline · {reach} | {over / in line / under} — {note, under 12 words} |

**Worth a second life:** {0-3 old winners worth re-running, one line each: what it was, why it still has room}

## The strategy

**Last week's call:** {honest grade of last week's bet in 1-2 sentences, or "First sweep, nothing to grade yet."}

**The bet:** {ONE sentence starting with a verb: Post / Write / Make / Run. The single clearest move this week and the angle to take.}

**Plays:**

1. **{the idea, stated as one literal 8-20 word claim a cold reader understands}**
   Make this: {one sentence starting with a production verb: Write, Create, Break down, Walk through}
   Borrow the structure from: @{handle}'s post above ({what the structure is, plainly: "specific moment, failed assumption, earned rule"})
   Openers: {2-3 first-line options, each one sentence}
2. {exactly three plays total. Different hook shapes, different structures, different structure sources. Each play cites which finding it rides.}

**Experiment:** {one thing worth testing that the data suggests but doesn't prove. What to try, and what would count as it working.}

**Stop doing:** {one thing the scoreboard says is not working, said kindly and plainly. Omit if nothing qualifies.}

## Watchlist

- {creator, pattern, or topic} ({kind}) — {why it's worth watching next week, one line}
  {2-4 entries. Never the user's own accounts or their configured radar creators.}
```

## Play rules

- The market sets the structure, the creator sets the substance. Borrow a receipt post's structure (its sequence of moves, pacing, hook mechanism), then replace its topic, examples, and wording with the creator's own. Never reuse a run of 8 or more words from any receipt.
- The findings decide WHAT is moving. The creator's identity (recurring ideas, influences) decides the ANGLE on it, so the plays read like the next chapter of the creator's own thinking, not market news adapted to them.
- Never re-suggest something the creator already published. Their hits can be graded in the scoreboard, not recycled as ideas.
- Every play must trace to a finding or to the scoreboard.

## Styled delivery

The memo is a document, not a chat message. In order of preference:

1. **HTML artifact / file**: use `assets/memo-template.html`. Replace the `{{...}}` slots and repeat the marked blocks per finding/play. Keep its design; do not restyle it. One accent color is already chosen.
2. **Markdown**: the template above, exactly. Real markdown tables, horizontal rules between sections, bold labels.

In both cases, ALSO save the markdown version to the Eden note (that's next week's memory). In chat, after delivering, summarize in two lines only.
