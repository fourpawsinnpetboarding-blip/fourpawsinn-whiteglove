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

## What Claude could not verify (no access)

1. **Google Ads 733-336-4600.** Not connected to Windsor (only Meta is). The import result lives in Google Ads under Goals, Conversions, Uploads. Claude cannot see it.
2. **GHL.** No GHL connection in this session. Claude cannot tell whether a real Won happened since 11:05 AM and failed to write, or no real Won has happened yet.

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
