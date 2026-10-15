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
