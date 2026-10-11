# Google offline conversion check: FPI | Booked Customer

Checked 2026-10-04 by Claude. Read only. Nothing was changed in GHL, the sheet, CallRail or Google Ads.

Flow: GHL opportunity marked **Won** -> GHL workflow writes one row -> Google Sheet `FPI | Booked Customer Offline Conversions` (id `1d4-z963cCN4SRqXdWJ_24QeEVRU7THv1_Bnd3qszqCk`, tab `Conversions`) -> Google Ads 733-336-4600 scheduled import -> conversion action `FPI | Booked Customer`.

## What Claude could verify

The sheet has exactly 2 data rows, both tests. Last edit: 2026-10-04 11:05 AM ET.

| Row | opportunity_id | Email | Phone | GCLID | Time | Value | Currency | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | CQGpbFm4uqwQ5vpiyErv | test address | blank | blank | `2026-10-04 10:58:00 America/New_York` | 0 | USD | Test. Format correct. This is the accepted row. |
| 3 | 63Tr3rYQrA3SLSM2KeDQ | test address | blank | blank | `2026-10-4 11:05:00 America/New_York` | 0 | USD | Test. Day not zero padded. This is the timestamp error row, written before the formatter fix. |

1. **No genuine Won booking has reached the sheet since the formatter fix.** Zero real rows. So the fix is unproven.
2. No duplicates: each opportunity_id appears once.
3. Currency USD and the time zone format are correct on row 2.
4. Only one tab exists, so Google can only be reading `Conversions`.

## GHL cross check (Windsor GHL connector, location X6z5pwEuIxkAbcCUQ0Nv, same day)

Every opportunity in status Won touched in the last 7 days (pipeline `HYmWEgevcbIqhpqoX5xE`). Sheet created 10:27 AM ET, last written 11:05 AM ET.

| Opportunity | Won at (ET) | Value | Source | Recon flag | In sheet | Correct? |
| --- | --- | --- | --- | --- | --- | --- |
| CQGpbFm4uqwQ5vpiyErv (test) | Oct 4 10:58 AM, re-won 4:09 PM | 0 | none | 2026-10-04 | once | Yes. Re-win did not add a second row. |
| 63Tr3rYQrA3SLSM2KeDQ (test) | Oct 4 11:05 AM | 0 | none | none | once | Yes. Pre fix format error. |
| 3LtfgZxQCSqwxeUDxrCT (real) | Oct 4 4:16 PM | 360 | Facebook Lead Form | 2026-10-04 | no | Yes IF this is a historical correction, not a new booking today. Confirm with Amanda. |
| Bhz4JD1f9L4Dom93P2XN (real) | Sep 28 | 160 | Facebook Lead Form | none | no | Yes. Won before the sheet existed. |
| 9NNPEOMZDFBkLGtLSd2F (real) | Sep 30 | **0** | Facebook Lead Form | none | no | Yes, but the Won has no value. |
| RKBMR5i4oImClFrBUfZa (real) | Aug 21 | 420 | Meta | none | no | Yes. Old booking. |

Findings:
1. **No genuine new Won has happened since the sheet went live.** So the end to end path is still unproven. Nothing is broken that Claude can see.
2. **The duplicate and replay guard works.** Two Wons today carried the reconciliation flag and neither wrote a row. No old booking was replayed with today's date.
3. **All real bookings this week came from Meta lead forms.** None has a GCLID. Google can only credit bookings that started from a Google ad, so Meta leads will not count in Google. Expected, not a bug.
4. **A real Won was saved with value 0** (Sep 30). If staff mark Won before entering the amount, Google gets 0. Fix in process: enter the booking amount before moving to Won.

## What Claude still cannot verify

1. **Google Ads 733-336-4600 import result.** Not connected to Windsor, and the Uploads screen is not in any API Claude has. Needs a screenshot of Goals, Conversions, Uploads.

## Risks to fix once a real row lands

1. **Row 3 errors on every scheduled run.** Scheduled imports re-read the whole sheet. Deleting rows 2 and 3 once a real row is accepted keeps the upload history clean. Needs Alex's OK.
2. **Matching data is thin.** Both test rows sent email only. A real row should also carry phone in `+1XXXXXXXXXX` format and the GCLID when the lead came from a Google ad. With no GCLID, Google needs Enhanced Conversions for Leads turned on to match by email or phone.
3. **Value.** Both tests sent 0. A real row must carry the booking amount, or Smart Bidding (Google's automated bidding that learns from conversion value) learns nothing about which bookings are worth more.
4. `ad_user_data` and `ad_personalization` are blank. Fine for US customers. Set to `GRANTED` only if your intake form collects that consent.

## Pass criteria for a genuine Won

1. Exactly one new row with the real opportunity_id, within minutes of marking Won.
2. Time is `YYYY-MM-DD HH:MM:SS America/New_York` with zero padding and is the real Won time, not the import time.
3. Value equals the booking amount. Currency is USD.
4. Email and phone present. GCLID present if the lead came from Google.
5. Google Ads, Uploads: next scheduled run shows that row **Successful**, 0 errors for it.
6. 24 to 72 hours later, `FPI | Booked Customer` shows the conversion in the Conversions column (only if it matched a Google click).

## Check Oct 11, 2026 (Claude, read only)

1. **GHL Won to sheet: working.** 15 real Won rows landed Oct 8 to 9 (values $60 to $480), each within minutes of the Won, zero padded time, USD, email and phone present. Includes the 2 Google sourced Wons ($480 Oct 9, $190 Oct 8).
2. **Junk rows to delete:** rows 2 and 3 (Claude tests, Oct 4) and 5 Ripon test rows Oct 6 (opportunity ids jDM8jo2orXbc7IOv9pt8, aI9NACBQLmnsLYba73Pw, l0u7Bvw8pHVYna8ncCeR, FA4ZXMIhxNL5zf4YizBb, k6dQqVwP5Xzm922vytVO; values $100, $50, $57, $57, $50; Bangladesh test phones). Scheduled imports re-read the sheet, so these keep feeding fake bookings into Google.
3. **No GCLID on any row.** Google can only match through Enhanced Conversions for Leads (email and phone). That setting must be ON in Google Ads, or these conversions never attribute.
4. **Phone format:** rows send `1954...` with no plus sign. Google's format is `+19545527848`. Fix in the GHL workflow formatter.
5. **Google Ads side (Goals, Conversions, Uploads, Performance Max goals): not verifiable.** Google Ads is not connected to Windsor. Connect link: https://onboard.windsor.ai/connect?connector=google_ads&next=/google_ads/authorize

### Google Ads side, Oct 11 (Windsor google_ads now connected, account 733-336-4600)

1. Conversion actions with any activity in the last 90 days: "Calls from ads (p)" (Primary, 177), "Phone Call" (Primary, 3), "Contact page load" (Secondary, 5). **FPI | Booked Customer does not appear: 0 conversions recorded**, despite 15 real sheet rows Oct 8 to 9.
2. Expected in part: 13 of the 15 rows are Meta or repeat clients who never clicked a Google ad. Only the 2 Google sourced Wons ($480, $190) could ever match, and with no GCLID they can only match through Enhanced Conversions for Leads.
3. Performance Max "South Florida's Trusted Pet Boarding", last 14 days: $1,125 spend, 23 "Calls from ads" conversions (about $49 per call), 1 tracked Business profile call. Bidding runs on calls, not bookings.
4. Decision: keep FPI | Booked Customer as Secondary. Do not make it Primary until (a) the 7 junk test rows are deleted, (b) Enhanced Conversions for Leads is ON, (c) at least one Google sourced Won shows as a matched conversion. Making it Primary now would teach PMax from $50 to $100 fake test bookings and near zero matches.
5. Still needs a screenshot: Goals, Conversions, Uploads (did the scheduled import run, how many rows matched).
6. Oct 11: Alex deleted the 7 test rows. Sheet now starts at row 2 = tC61j65fCogU2S3jVI1w ($300, Oct 8). 15 real rows. Verified by screenshot.
7. Oct 11: Alex set column F (phone) to Plain text and rewrote the 15 existing phones as +1XXXXXXXXXX. Future rows: GHL stores phones as +1, and a Plain text column keeps the +. Verify on the next real Won row. If it lands without the +, Ripon changes the GHL sheet step to send E.164.

## Next build: GCLID from CallRail into the sheet (spec for Ripon, quote first)

Why: no row has a GCLID, so Google can only match by email or phone (Enhanced Conversions for Leads). Google Ads clicks that call go through CallRail, which records the GCLID per call when its tracking script runs on the site.
1. Confirm in CallRail: open one recent call with source Google Ads and check the GCLID field is filled. If blank, turn on the CallRail Google Ads integration and check swap.js is on fourpawsinn.co and the GHL funnels.
2. CallRail post call webhook to a GHL inbound webhook workflow: find contact by caller phone, write gclid into a contact custom field "gclid" (first touch only, never overwrite).
3. Web form leads: map GHL's own attribution gclid into the same custom field.
4. The Won sheet step writes {{contact.gclid}} into column B.
5. Pass: next Google sourced Won lands with a GCLID, and Google Ads Uploads shows it matched.

### CallRail check, Oct 11 (Alex screenshot)

1. Google Ads calls come in on CallRail number 754-212-9640 "Google Ads Assets": the call button inside the ad. The caller never visits the site, so no GCLID ever exists for these calls. GCLID build SHELVED: it would only cover "Website pool" calls, which are few.
2. Bigger problem: the 5 Google Ads calls visible (Oct 9 to 10) lasted 20 to 37 seconds and 4 were marked not a lead (thumbs down). Real calls (GMB number) last 5 to 8 minutes. If "Calls from ads (p)" counts calls this short, Performance Max is learning to buy junk calls ($1,125 for 23 "conversions" in 14 days).
3. Fix (Alex, in Google Ads): Goals, Conversions, Summary, "Calls from ads (p)", Edit settings, Call length: set to 60 seconds. Then re-check cost per real call in 14 days.

### CallRail call length analysis, Oct 4 to 10 (export Alex sent, 40 calls)

Google Ads Assets calls: 18. Qualified 3 (38s, 210s, 219s). Not a Lead 9 (0, 26, 29, 33, 34, 36, 37, 58, 101s). Not scored 6.
All sources: qualified calls under 60s exist (2s callback, 33s, 38s, 46s, 53s), so Alex is right that 60s is too high.
Junk (29 to 37s) and qualified (33 to 38s) overlap: no perfectly clean cutoff.
| Cutoff | Ad qualified kept | Ad junk kept |
|---|---|---|
| 30s | 3 of 3 | 6 of 9 |
| 45s | 2 of 3 | 2 of 9 |
| 60s | 2 of 3 | 1 of 9 |
Decision proposed: 45 seconds. Cost per qualified ad call this week: about $560 spend (half of $1,125 over 14 days) for 3 qualified calls, about $188 each. Re-check with 90 days of data.

### Change made Oct 11, 2026 (Alex, confirmed by screenshot)

"Calls from ads (p)": Count changed Every to One conversion. Call length set to 45 seconds. Baseline before the change: PMax last 14 days $1,125 spend, 23 call conversions; CallRail Oct 4 to 10: 18 ad calls, 3 qualified (about $188 per qualified ad call). Re-check Oct 25.

### Correction, Oct 11 2026: no import schedule exists

Google Ads, Goals, Uploads: only manual uploads from Oct 2025. Schedules tab: empty. The sheet has never been imported, so Google has received zero bookings since the sheet went live on Oct 4. The flow above stopped at the sheet. Fix: create a daily scheduled upload from the sheet (Alex, guided Oct 11).

### Schedule created Oct 11, 2026 (Alex)

Google Ads, Uploads, Schedules: "FPI | Booked Customer Offline Conversions", daily 5:00 AM ET, Enabled. Sheet shared with 918020701-100000002-account@partnercontent.gserviceaccount.com (Editor). Preview: 15 rows, 0 successful, 15 errors (Missing Conversion Name, Missing Conversion Time, email and phone read as hashed). Cause: header names. Fix handed to Codex (Eden row 009ffc3e): rename headers to Google's names, re-run preview, re-map the GHL Won step.

### Headers and hashing, Oct 11 2026 (Claude, Google Sheets connector)

Preview 2 after renaming: name, time, value and Order ID recognized; all 15 failed only on "Email/Phone Number not hashed". Scheduled Sheets uploads need SHA-256 hashed identifiers. Layout now: E email_plain, F phone_plain (what GHL writes), M Email and N Phone Number (SHA-256 of normalized email, +1 phone). Claude filled M2:N16. Future rows: scripts/apps-script/google-ads-hash.gs on an hourly trigger (Codex installs). Unknown headers (email_plain, phone_plain) are ignored by Google.

### Preview 3, Oct 11 2026: format PASSES

All format errors gone. Every row now returns only "email or phone can't be matched to a click; may not have come from a Google Ads campaign; you can safely ignore". Expected: 13 of 15 are Meta or repeat clients, and the 2 Google bookings came by phone from the ad call button, which leaves no click to match. Pipeline is technically done. Realistic outlook: Booked Customer will match only Google clients who clicked through to the site or a GHL form. Keep it Secondary. Google's bidding lever stays call quality (45s, count One).
