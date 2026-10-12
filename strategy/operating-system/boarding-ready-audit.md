# Boarding Ready Trial Stay: first audit and plan (Oct 12, 2026)

Brief from Alex and ChatGPT: turn future date Meta leads into customers with a paid trial overnight. First assignment: audit, no building.
Sources: GHL via Windsor (pipeline, opportunities, read only), repo docs on the GHL workflows (`ghl-workflow-tuneup.md`, `lead-journey-check-2026-10-08.md`, `content/ghl/workflow-copy/`). Claude cannot open GHL workflow steps; Codex confirms anything marked VERIFY in the browser.

## 1. What exists and works
| Piece | State |
|---|---|
| Pipeline "Four Paws Inn" | New Lead, Qualified, Meet & Greet Scheduled, Deposit Paid, Booked, Past Client, Lost |
| Meta Lead Timeline Router | Splits new Meta leads by timeline, 90 second wait, sends the first text |
| FPI Future Travel Conversion (published, 31 enrolled lifetime) | DATES MISSING branch: personalized first text by dog sociability, 3 hour reply wait, one approved follow up |
| FPI 7 Day and 30 Day Lead Conversion (published) | Timeline nurture for near term leads |
| SYSTEM Reply Kill Switch (999 enrolled) | Stops automated texts when a lead replies |
| SYSTEM Cohort Nurture Booking Exit | Removes booked contacts from nurture |
| SYSTEM Paid Booking Sync (Apps Script plus GHL) | Paid booking in the money sheet becomes Won. Hardened Oct 11: no duplicates, Cancelled goes to Lost |
| Won to Google Ads | Every Won is reported to Google Ads as a purchase (offline conversion sheet, daily) |
| Meta CAPI | Purchase event sent on Won (field "Meta Purchase Sent") |

## 2. What must change for Boarding Ready
1. **No trial stage or tags yet.** Need: tags `boarding-ready-offered`, `trial-booked`, `trial-passed`, `trial-not-approved`, and one pipeline stage "Trial Booked" between Qualified and Deposit Paid. Do NOT rename "Meet & Greet Scheduled" (Meta Conversion Leads may be mapped to stages; VERIFY before touching any stage).
2. **Tracking conflict (most important).** A paid trial night would flow through Paid Booking Sync and become Won, which reports a full purchase to Google Ads and Meta. That breaks the rule "trials do not count as boarding conversions" and teaches both ad systems the wrong customer. Fix: a "Trial" flag in the money sheet so trial rows go to the "Trial Booked" stage, never Won.
3. **The 80% figure is not verified.** Last week: 17 new opportunities, mostly Meta. Codex counts how many carry the future travel tag in the last 30 days before we size this.
4. **Existing rule conflict.** business-facts says meet and greets are optional and never pushed. A required trial is a bigger gate than a meet and greet. Alex must decide where "required" applies.

## 3. Simplest architecture (reuse, do not rebuild)
1. Meta Lead Timeline Router stays the entry. No new entry workflow.
2. Inside FPI Future Travel Conversion, add one branch after a reply: if travel month is known, Amanda sends the Boarding Ready offer (human sends, from a GHL snippet). Tag `boarding-ready-offered`.
3. Trial booked: Amanda tags `trial-booked`. One small workflow: move to "Trial Booked", send the prep text (approved copy), alert staff, remove from future travel follow ups.
4. Trial done: Amanda tags `trial-passed` (human decision only). Workflow: set field "Boarding Ready = Yes" and "Expected travel month", schedule one check in text 30 days before that month.
5. Dates given: existing booking and deposit path. Nothing new.
6. Not ready: existing low frequency nurture (RETENTION every 30 days). Nothing new.
Total new: 1 small workflow, 4 tags, 1 stage, 2 custom fields, 1 money sheet flag.

## 4. Decisions for Alex
| # | Decision | Recommendation |
|---|---|---|
| 1 | Who must do a trial | Required: first time dogs booking Thanksgiving, Christmas or New Year. Recommended (not required): first time stays of 5+ nights. Never for returning clients |
| 2 | Leads who already have holiday dates (like Leslie) | Take the 25% deposit first to hold the holiday, then the trial. If the trial is not approved, refund the deposit in full. Otherwise they lose the holiday spot while waiting |
| 3 | Trial rules | 1 night, normal daily rate, Monday to Thursday only, at least 7 days before the stay, normal drop off and pick up windows |
| 4 | Who approves | Amanda, same day as pick up. Reasons logged on the contact |
| 5 | Trial in reporting | Never Won. Its own stage. Counted as trial revenue on the scoreboard |
| 6 | A/B test | A safety and preparation vs B convenience and peace of mind. Split by week, not by random, so Amanda sends one script at a time |

## 5. Plan, 3 phases
| Phase | What | When | Who |
|---|---|---|---|
| 1. Prove it by hand | Amanda offers the trial by text to every future date lead and every first time holiday lead, using one approved script. Log in a sheet: offered, booked, done, approved, later booked | This week, 2 weeks of data | Amanda, Claude writes the script and the sheet |
| 2. Build the minimum | Tags, stage, 1 small workflow, money sheet Trial flag so trials never become Won. Test on Test Order only | After Phase 1 shows trials get booked | Codex builds, Alex approves before publish |
| 3. Optimize | A/B scripts, scoreboard lines (offered, booked, completed, approved, boarding booked, revenue, cost per boarding customer), write the SOP for licensing | Weeks 4 to 8 | Claude |

Why manual first: if leads do not book trials when Amanda offers them by hand, automation will not fix it. Two weeks of manual offers costs nothing to build.
