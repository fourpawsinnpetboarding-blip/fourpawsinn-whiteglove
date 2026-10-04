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
