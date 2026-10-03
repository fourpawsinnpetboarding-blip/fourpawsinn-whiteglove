# Codex prompt: weekly deposit import

Paste the block into Codex with the deposit export attached, or after saving it in data/deposits/.

```
Import this week's deposits into GoHighLevel. Follow section 4a of strategy/operating-system/inbound-tracking.md exactly.

For each row: match the contact by phone, then email, then name. Move their open Inbound opportunity to Booked, set Booked Date to the deposit date and the opportunity value to the deposit amount. If they have no Inbound opportunity, create one in Booked with Channel "Unknown".

Rules: never send a message, never change conversion workflow tags, never delete anything. If a match is uncertain, do not guess: list it.

End with: updated count, created count, and a table of unmatched rows with the reason.
```
