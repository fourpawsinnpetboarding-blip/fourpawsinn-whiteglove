# Lead Activity Audit, Part B Results

**Run:** 2026-10-15, read only. GET requests to the GHL API v2. Nothing sent, nothing changed.
**Scripts:** `analysis/lead_activity_partb.py` (pull and score), `analysis/lead_activity_audit.py` (Part A re-run and sample).
**Privacy:** no names, phones, emails or message text were written. Inbound text was reduced to keyword flags in memory and discarded. Scored rows hold opportunity IDs only and stay in the session scratchpad, not in the repo.

---

## 1. Data

| Item | Count |
|---|---|
| Opportunities in the account | 1,031 |
| Open, stage New Lead | 505, on 500 contacts |
| Messages pulled (full history) | 5,314 |
| Pull errors | 0 |

Part A re-ran on this pull and matched the committed results exactly (406 with a manual message, 350 / 61 / 94 last outbound action, same month allocation and sample flag mix). The seed 20261014 sample of 30 was redrawn. The recent inbound supplement is the 17 leads whose last message was inbound and under 14 days old, minus 1 already in the sample: 16.

## 2. How each field was scored

| Field | Rule |
|---|---|
| Inquiry time | First lead message in the run of messages leading up to opportunity creation (no gap over 7 days). No lead message: opportunity creation time. |
| first_response_minutes | Inquiry to our first outbound SMS, email, call or DM. |
| first_response_by | **human**: sent by a GHL user. **workflow**: workflow, campaign or bulk action, or a DM with no GHL user sent under 60 seconds after the lead (ManyChat or Meta auto reply speed). **meta_inbox**: DM with no GHL user, slower than 60 seconds. Sent from the Meta inbox. Could be a person or an automation. Not verifiable from the API. |
| outbound_touches | Every outbound message after inquiry. Activity log entries excluded. |
| lead_replied | Lead sent a message after our first reply, or a call connected. |
| disposition, stage_should_be | Rule based, not judgment. See the script. Booked means another opportunity for the contact is Deposit Paid, Booked, Past Client or Won, or the contact has a booking date or count. |

## 3. Results

| Measure | Random 30 | Recent inbound 16 | All 505 |
|---|---|---|---|
| Any reply within 15 min | 80% | 25% | 64% |
| Reply within 15 min **and** 3+ touches (the doc's threshold) | **77%** | 25% | **56%** |
| Never answered at all | 0% | **50%** | 8% |
| Median outbound touches | 7 | 2 | 5 |
| First reply by workflow / meta_inbox / human / none | 23 / 6 / 1 / 0 | 4 / 2 / 2 / 8 | 363 / 94 / 8 / 40 |
| A GHL user ever replied | 17% | 31% | 16% |
| GHL user or Meta inbox reply within 15 min | 40% | 12% | 35% |
| Lead replied | 63% | 50% | 58% |
| Lead had the last word, no reply from us | 20% | 94% | 21% |
| Any call logged | 0% | 0% | 2% |

**Disposition, all 505:** went cold after contact 208, never reached 185, planning future trip 93, booked 11, junk or duplicate 7, wrong number 1.
**Stage should be, all 505:** Lost 364, Qualified 117, New Lead 13, Won 11.

**Lead had the last word, all 505:** 107. By age: 16 under 14 days, 23 at 15 to 45, 20 at 46 to 90, 48 over 90. Of the 107: 52 asked about price, 38 mentioned a future trip or a booking, 10 replied STOP.

## 4. Reading against the thresholds

1. **Random 30: 77%. Partly working, just under the 80% line.** The speed comes from automation. Only 1 of 30 got a first reply from a person in GHL, and none within 15 minutes.
2. **Whole 505: 56%. Partly working.** 40 leads never got any reply. 19 of those are April.
3. **Recent 16: the leak is live.** 8 leads messaged in the last 3 weeks, mostly on Instagram, and got zero replies. 15 of 16 have the lead holding the last word.
4. **Stages are stale.** 11 New Leads are already booked in other records. 117 should be Qualified. 364 should be Lost.
5. **Calls are invisible.** 15 calls in 5,314 messages. If Amanda or Alex calls from a personal phone or CallRail, GHL does not see it. calls_logged cannot be trusted until calls route through GHL.

## 5. Limits

1. meta_inbox replies (94 first replies) cannot be split between a person and an automation through the API.
2. Disposition is rule based. A human read of the 46 would refine "went cold" versus "planning future trip".
3. 13 leads have no messages at all in GHL. They may have been handled by phone.
4. Signal flags are keyword matches, not reads.

## 6. Next

Pending Alex's call. No action taken.
