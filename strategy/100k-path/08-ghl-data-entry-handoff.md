# GHL Data Entry Handoff (Claude to Codex)

**Rule (Alex, 2026-10-16):** Alex only messages leads. Every other GHL update (fields, stages, values, tasks, notes) is done by AI. Claude drafts the handoff at the end of a lead conversation. Codex executes it in GHL.

**Why:** manual data entry does not scale to employees, high lead volume or multiple locations.

## Handoff format

Claude fills this in and Alex pastes it to Codex. No message text from the client, only facts.

```
GHL DATA ENTRY. Location: Four Paws Inn (X6z5pwEuIxkAbcCUQ0Nv).
Find the contact by conversation ID: [conversation_id]

1. Opportunity
   Stage: [stage]
   Monetary value: $[amount]

2. Contact custom fields (use existing field keys)
   contact.arrival_date: [YYYY-MM-DD]
   contact.check_out_date: [YYYY-MM-DD]
   [pet fields: name, type, breed, age, weight, size, temperament]
   [vaccine status]

3. Tasks (assign to Amanda)
   [task, due date]

4. Note on the contact
   [one or two lines, facts only]

5. Do not
   Do not send any message. Do not change any field not listed. Report back what changed.
```

## Codex reports back

A short list of what changed, field by field, and anything it could not find. Alex pastes that back to Claude if a follow up depends on it.
