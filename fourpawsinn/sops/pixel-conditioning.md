# SOP: Pixel conditioning (teaching Meta who our real customers are)

Owner: Alex marks bookings. Ripon built the tracking. Claude checks it weekly.

Pixel conditioning means feeding Meta clean, true signals about who actually books, so its ads find more people like them. Meta only learns from what we send. A lead who never books and a lead who pays $230 look the same to Meta unless we tell it.

## The daily rule (Alex, 30 seconds per booking)

1. The moment a dog is booked and paid, open the lead's opportunity in GHL.
2. Set status to **Won** and the **value** to the real amount (example: Dania, Leo and Lexi, Oct 10 to 11, $230).
3. Same day. Never batch at the end of the week. Meta weighs fresh signals more.
4. Only real bookings. Never mark a meet and greet, a maybe, or a test as Won. One fake Won teaches Meta the wrong customer.
5. Lost leads: mark them Lost. That is a signal too.

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
