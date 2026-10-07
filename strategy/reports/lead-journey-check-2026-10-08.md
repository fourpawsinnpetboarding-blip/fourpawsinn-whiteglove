# Lead journey check, Oct 8, 2026

Alex's Things task: verify the lead to booking path. Claude did the parts that need no phone or live send. Alex's phone test is still needed for steps marked ALEX.

## Works / Broken / Owner

| Step | Status | Evidence | Owner |
|---|---|---|---|
| Inventory and cleanup | WORKS | 56 workflows listed, 24 dead drafts archived, nothing deleted (Codex, Oct 7) | Done |
| Ghost reactivation copy | BROKEN, fix in progress | Live to 177 people with a false "4 summer spots" text from "Nicole". Rewrite approved by Alex Oct 7 | Lex is applying now |
| New lead first text (Capture intake) | BROKEN, fix in progress | Old copy had "220+ families" and an opt out line. Workflow shows 0 active | Lex, after ghost |
| Missing dates texts | Rewrite approved | Plain copy, 40 enrolled since Sep 21 | Lex, third |
| Follow ups stop when lead replies | UNVERIFIED | Old copy asked leads to reply BOOKED. Now the workflow setting must do it | Lex sets it, ALEX tests |
| Booked confirmation text | MISSING | "Booked Client Follow Up" only tags and waits 60 days. No message | Claude drafts next, Codex builds |
| Meet and greet booking text | MISSING | No workflow found | Claude drafts next |
| 6 site links load | PARTIAL | Codex: all 6 vibepreview links load; branded subdomains 502 (dropped by Alex) | ALEX phone check |
| Site forms reach GHL | UNVERIFIED | No form submitted yet | ALEX test lead |
| Unanswered leads | BROKEN | 30 threads where the client wrote last (Oct 6 snapshot) | Alex replies, Claude drafts |
| $0 Won values | BROKEN | 3 of 4 Won this week at $0 (Oct 6 snapshot) | Codex task open |

## Meta "qualified leads" option

It is Meta's **Conversion Leads** goal. Meta optimizes for leads that reach a chosen CRM stage, fed back from GHL through the Conversions API for CRM.

Meta's stated requirements:
1. About 200 or more leads a month.
2. Lead stage data uploaded at least once a day.
3. The chosen stage happens within 28 days of the lead.
4. That stage converts 1% to 40% of leads.
5. Meta's lead ID stored in the CRM for each lead.

Our read: Four Paws Inn gets about 26 new contacts a week (about 110 a month, all sources), under the 200 a month bar. Do not switch the campaign now. Revisit when Meta leads pass 200 a month. Until then, keep the current goal and fix speed to lead.

Sources: developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration, zapier.com/blog/meta-guide-to-better-lead-quality

## Alex's 10 minute phone test (after Lex finishes)
1. Submit the booking site form as a test lead with your own second number.
2. Check: exactly one first text arrives, from Amanda, with the booking link.
3. Reply "hi". Check: no more automated texts after that.
4. Tell Claude what happened. Claude updates this table.
