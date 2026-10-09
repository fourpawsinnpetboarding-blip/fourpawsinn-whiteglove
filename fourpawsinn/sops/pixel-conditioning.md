# SOP: Pixel conditioning (teaching Meta who our real customers are)

Owner: Alex marks bookings. Ripon built the tracking. Claude checks it weekly.

Pixel conditioning means feeding Meta clean, true signals about who actually books, so its ads find more people like them. Meta only learns from what we send. A lead who never books and a lead who pays $230 look the same to Meta unless we tell it.

## The daily rule (Alex, 30 seconds per booking)

1. The moment a dog is booked and paid, open the lead's opportunity in GHL.
2. Set status to **Won** and the **value** to the real amount (example: Dania, Leo and Lexi, Oct 10 to 11, $230).
3. Same day. Never batch at the end of the week. Meta weighs fresh signals more.
4. Only real bookings. Never mark a meet and greet, a maybe, or a test as Won. One fake Won teaches Meta the wrong customer.
5. Lost leads: mark them Lost. That is a signal too.
6. Repeat client: create a NEW opportunity for every booking (name it "Name Mon DD"). Never reopen or edit an old Won opportunity: each booking is sent to Meta once, keyed to its opportunity. GHL setting that allows this: Settings > Objects > Opportunities > "Allow more than one opportunity per contact in the same pipeline" (turned on Oct 9 2026).

Ripon's setup sends every Won to Meta as a Purchase (dataset "Offline Conversion – FourPaws", ad account 942706665029521). After his lead ID update, bookings from Meta instant forms are credited to the exact ad that produced them.

## Do not undo the learning

1. No big edits to live campaigns (budget jumps over 20%, new targeting, swapping ads) more than once a week. Each one restarts Meta's learning.
2. Edits happen on review days only (next: Oct 17).

## Seed Meta with past customers (one time, then quarterly)

1. Export past paying clients from GHL (name, email, phone only).
2. Upload to Meta as a Customer List audience named "FPI Past Clients".
3. Add it as an audience suggestion in the lead ad sets. Meta starts from people who look like our real customers instead of from zero.
4. Refresh every quarter.

## Weekly check (Claude, Monday scoreboard)

1. Won bookings in GHL this week vs Purchases received in Meta. They should match.
2. If Meta shows fewer, flag it the same day: the tracking is broken and Meta is learning from nothing.

## Later (when leads pass about 200 a month for 2 months)

Switch lead campaigns to optimize for Conversion leads, using these Won events. Until then, optimize for Maximize number of leads and use the Won data to judge which ads make money.

## Log

- 2026-10-09: "FPI Past Clients" customer list created in Ads Manager, 667 rows (all intake form owners, deduplicated). Label: General customers. Not attached to any ad set yet; add as audience suggestion at the Oct 17 review. Refresh quarterly (next: Jan 2027). Use for ad targeting only.
- 2026-10-09: Ripon's lead ID update live. Dania ($230, Meta lead) first live Won sent. 5 missed bookings marked Won by Alex.

## The 7 day rule, explained (Oct 9 2026)

FPI's sales cycle is long: over 90% of Meta leads book weeks or months after the form (Alex). That is fine. Two different 7 day limits exist:

1. **Send fast.** Meta wants each event sent within about 7 days of when it happened (the deposit, not the lead). Fix: mark Won the day the deposit is paid. The automation in strategy/operating-system/won-automation.md makes this automatic.
2. **Ads Manager's credit window.** Ads Manager's default view only credits a purchase to an ad if it happened within 7 days of the click. Long cycle bookings will look like "0 purchases" there. That is a reporting view, not reality. Fixes:
   - The lead ID ties each booking to the original lead no matter how long it took (Meta's CRM lead tracking is built for long sales cycles).
   - Claude measures revenue per ad ourselves on the Monday scoreboard, from GHL: each booked contact's first attribution ad, and the Won value. This does not depend on any Meta window.

## Qualified lead stage (fast signal inside the window)

Because bookings come late, Meta also needs a signal that comes early. A **Qualified lead** = the lead has a dog or cat in the service area, said yes to pricing on the form, AND had a real two way conversation (replied with dates, or a call). Automatic (Codex building, Oct 9): a real reply or a completed inbound call moves the opportunity from New Lead to the existing **Qualified** stage. Alex does nothing. Ripon to add: Qualified stage change sends a "QualifiedLead" CRM event to the same dataset with the lead ID. Meta then learns "people like this become real conversations" within days, and "people like this pay" months later.
- 2026-10-09: Codex published auto Qualified (real reply or inbound call moves New Lead to Qualified, Facebook auto message excluded) and booking link click tracking (tag + "CLICKED, NO FORM YET" alert after 2 hours). Tested on TEST contact only; first real reply and click still to verify. Alex asked Ripon to send QualifiedLead events to Meta. Open: Won automation (Codex).
