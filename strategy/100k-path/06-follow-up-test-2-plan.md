# Follow Up Test 2: Plan (written before the test starts)

**Purpose:** measure whether the Lead Reply SOP (`05-lead-reply-sop.md`) works, in a way a buyer would trust. The result becomes the Four Paws Inn case study for selling follow up as a service.
**Rule:** the definitions below are fixed now. They do not change after the results come in.

---

## 1. What gets measured

| Item | Definition |
|---|---|
| Cohort | Every opportunity created from 2026-10-16 through 2026-11-15, **in any stage**. Not only New Lead. |
| Why any stage | When the SOP works, leads move to Qualified or Booked. Scoring only New Lead would drop the wins and keep the misses. |
| Scoring | Same rules as Part B (`analysis/lead_activity_partb.py`), unchanged. |
| Run date | 2026-11-17 |
| Baseline | Part B, all 505 (2026-10-15) |

## 2. Scorecard

| Metric | Baseline | Target | Why a buyer cares |
|---|---|---|---|
| Person replies within 15 min (8 AM to 8 PM) | 35% | 80% | The core promise |
| Any reply within 15 min and 3+ touches | 56% | 85% | The audit's pass line |
| Lead had the last word, unanswered | 21% | under 5% | No dropped leads |
| Leads never answered | 8% | 0% | No dropped leads |
| **Lead to booked** | unknown (stages stale) | measured | The number a buyer pays for |
| Calls logged in GHL | 2% | every call | Proof the record is complete |

## 3. What does not count

1. Auto replies counted as a person's reply.
2. Replies sent outside GHL. They cannot be credited. Reply inside GHL.
3. Replies to old leads (before 2026-10-16). Clearing them is good for revenue. It does not change the test score.
4. Changing a definition or a threshold after seeing results.

## 4. Before the run

1. Alex approves the wider read only GHL pull (all stages, not only New Lead). Without it, the cohort rule in section 1 cannot be scored.
2. Amanda keeps the booking sheet current, so lead to booked can be checked against it.

---

# Test 3: Reactivation of 100 Old Leads (separate from Test 2)

**Why separate:** Test 2 measures speed on new leads. Test 3 measures money from old leads. Mixing them makes both numbers useless to a buyer.
**List:** 100 New Lead opportunities ranked from the Part B pull. Kept in the session scratchpad (`reactivation-100.csv`), never committed.

## Who is on the list

| Tier | Count | Rule |
|---|---|---|
| T1 | 18 | Lead wrote last and is waiting on us |
| T2 | 41 | Said they plan a future trip |
| T3 | 41 | Talked with us, then went quiet. Most recent first. |

Removed before ranking: STOP, DND, said not interested, already booked in records, duplicates, wrong numbers, and anyone with no safe channel. Safe channel means they texted us before (SMS), or their DM window is still open (7 days or less).

## Rules

1. One to one, typed by Alex or Amanda inside GHL. Never a bulk send (CLAUDE.md, section 10, rule 4).
2. Send 8:00 AM to 8:00 PM ET only.
3. One message per lead. If no reply in 3 days, one follow up. Then stop.
4. Anyone who says stop or no: send nothing more.
5. Fill in the four tracking columns on the sheet: sent_date, lead_replied, booked, booking_value.

## Messages

**T1, waiting on us:** use the matching template in `05-lead-reply-sop.md`, section 5.

**T2, future trip (holiday angle)**
> Hi, this is Amanda from Four Paws Inn. You asked about boarding a while back. Thanksgiving and Christmas spots are filling now. Do you want me to save a spot for your pup?

**T3, went quiet**
> Hi, this is Amanda from Four Paws Inn. We talked a while back about boarding your pup. Do you have any trips coming up this fall? I would love to help.

**Follow up, day 3, no reply**
> Just checking in. If now is not a good time, no worries. We are here when you need us.

## Scorecard (run 14 days after the last send)

| Metric | How |
|---|---|
| Reply rate | replies divided by sent |
| Booked | bookings divided by sent, checked against the booking sheet |
| Revenue | sum of booking_value |
| Opt outs | STOP replies divided by sent |

**Planning math, not a promise:** at a 20% reply rate and 1 in 4 replies booking, 100 sends gives about 5 bookings. At about $330 a stay (5 days at $60 to $75), that is about $1,650. The bigger value is the proof: "5 bookings from leads the business had written off" is the sentence a buyer pays for.
