# Booking sync: why rows 31 to 49 show no GHL status (diagnosis, Oct 14, 2026)

Asked by Alex, Oct 14. Diagnosis only. Nothing was sent, edited or backfilled.

## Who built the script
Claude wrote v2 and v2.1 of `fpiBookingSyncOnEdit` (repo `scripts/sheets/fpi-booking-sync.gs`, commits 4da738a to 97b1c3a, Oct 9). Alex pasted it into the money sheet's Apps Script on Oct 9 at 12:24 PM ET and installed both triggers. Codex hardened the live copy on Oct 11 (SYNCED only on HTTP 200/201, manual resend blocked on SYNCED rows, "Cancelled" in column M moves to Lost). Those Oct 11 changes are NOT in the repo copy, so the live script is newer than the repo. Claude cannot open the Apps Script editor, its trigger list or its execution log.

## The cause, in plain English
The script only looks at a row when one of two things happens:
1. Someone types in column D (Daily Rate), or
2. The row already says WAITING or ERROR in column M.
Rows 31 to 46 and 48 to 49 were typed in September (column H shows booking dates 9/8 to 10/1), before the script existed. Nobody has typed in their column D since Oct 9, and their column M was never set, so the script has never looked at them. This was on purpose in v2.1 ("old rows stay put") so old rows would not be blasted into GHL as new Won bookings. There is no row range, filter or cutoff in the code. Missing owner names do NOT cause a blank: a row the script checks with no owner shows WAITING and "Missing: owner name" (rows 3, 5, 7, 8, 9 show exactly that). The owner lookup from the intake form only runs when a row is checked, which is why these old rows also have blank Owner and Email.
Rows 2 (Cleo) and 4 (Thor) are also blank. They need the execution log to explain (Codex): either they were entered by paste or by another tool, which does not fire an edit trigger.

## What GHL already has (read only check through Windsor, Oct 14)
| Row | Booking | Phone | In GHL |
|---|---|---|---|
| 2 | Cleo 12/26 to 1/2 | 9545889874 | Contact Steven Fischer, one older Won ($375, May) |
| 4 | Thor 10/23 | 3059859655 | No contact found |
| 31 | Oliver & Vera 2/12 to 2/14 | 8607266614 | Tal Vera, older Won ($560, May) |
| 32 | Paco 12/31 to 1/4, $95 paid | 3059514500 | Darien Figueroa, OPEN opportunity, tagged lost-lead and no-response (wrong: he paid) |
| 33 | Evie 12/26 to 12/31 | 9544100866 | Lydie Medley, older Won ($1,120) |
| 34 | Penny & Knox 12/23 to 12/27 | 7866838711 | Katelyn Brito, OPEN opportunity, active-client |
| 35, 39 | King 12/23 and 11/24 | 7867574515 | Charles Thrower, older Won ($300) |
| 36 | Simba (cat) 12/23 to 1/4 | 3057678037 | Nicole Morales, older Won ($120) |
| 37 | Rocco 12/11 to 12/14 | 7863904932 | Mark Maederer, older Won ($1,260) |
| 38 | Tuga 12/2 to 12/10 | 9548059704 | Cheryl Intihar, older Won ($520) |
| 40 to 43 | Vinny (cat), 4 rows | 9179913155 | No contact found |
| 44, 45 | Tokyo + exit bath | 3059061825 | Allison Bethell, older Won ($2,250) |
| 46, 48, 49 | Sam + exit bath + 11/19 | 3056086518 | Jason Hartman, older Won ($755) |
Every customer except Thor/Luna's owner and Vinny's owner is already a GHL contact. None of these future stays has its own opportunity. None has a Meta Purchase on record for these stays.

## Why a normal backfill is unsafe
Typing a rate in column D on these rows would send each one as a NEW paid Won booking today:
1. Meta gets a Purchase event dated today for a September sale (CAPI accepts events up to 7 days old, so the timing is wrong) and 20 extra purchases in one day distort the ad learning.
2. Google Ads gets offline conversions dated today.
3. Won and Booked can start customer workflows (booked follow up, retention timers).
4. Exit bath rows (44, 46) are add ons, not stays. They must not become separate Won bookings. Vinny's 4 rows may be one stay split by rate.

## The safest fix (Codex executes, Alex approves the list first)
1. **Stop the confusion now (no sending):** write `LEGACY` in column M and "Booked before Oct 9 sync. Reconciled by hand in GHL." in Sync Error for rows 2, 4, 31 to 46, 48, 49. The script ignores LEGACY rows (it only acts on WAITING or ERROR, or a column D edit). Rule for Amanda: never type in column D on a LEGACY row.
2. **Reconcile in GHL by hand, not through the webhook:** for each row in the table, on the EXISTING contact, create one opportunity per stay (pet + check in), stage Booked, value = TOTAL REV, with the field "Historical CRM reconciliation" set (it already exists and skips the Google Won export) and "Meta Purchase Sent" pre filled as "historical" so the Meta step skips it. Codex must first confirm in GHL that the Meta Purchase workflow checks that field. If it does not, keep these opportunities at Booked (open), not Won, until it does.
3. **Before step 2, turn off or confirm the triggers that would fire:** check which workflows run on "opportunity created" or "stage Booked/Won" (RETENTION Booked Client Follow Up, Paid Booking Sync, the Meta CAPI step) and make sure none sends a customer message for these rows.
4. **Fix the two wrong records:** Darien Figueroa (paid $95 for Paco) has lost-lead and no-response tags. Remove them so no nurture texts him. Katelyn Brito's open opportunity becomes the Penny & Knox booking (update it, do not add a second one).
5. **Missing contacts:** Thor/Luna (3059859655) and Vinny (9179913155). Amanda adds the owner name, then Codex creates the contact with no workflow enrollment.
6. **Exit baths:** add to the matching stay's notes and value, never as their own opportunity.
7. **Ripon's Meta setup:** untouched. No change to the pixel, CAPI or Meta workflow configuration.
8. **Script follow up:** sync the Oct 11 live changes back into the repo, and pull the execution log for rows 2 and 4.
