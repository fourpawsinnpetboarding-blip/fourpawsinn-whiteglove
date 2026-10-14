# Lead Activity Audit, Part A Results

**Run:** 2026-10-14, read only, through the Windsor GHL connector (location Four Paws Inn).
**Script:** `analysis/lead_activity_audit.py`

**What was pulled:** IDs, dates, message direction and type, consent and timeline fields. No names, phones, emails or message bodies.
**What was not done:** no records changed, no messages sent.

**Scope:** 505 open opportunities in stage "New Lead". The count matches the evidence packet. No open opportunity has a source containing "test" (checked with a live filter).

---

## 1. Field availability

| Field | Status | What it can and cannot tell us |
|---|---|---|
| Opportunity created date, stage, last stage change | **Direct**, populated | |
| Conversation thread exists for the contact | **Direct**, populated | A thread can exist with only an automated message in it. |
| Last message date, direction, type | **Direct**, populated (direction blank on 12) | Shows the last message only. Not the full thread. |
| Last outbound action (automated / manual) | **Direct**, blank on 94 | Last outbound message only. |
| Last manual message date | **Direct**, blank on 99 | A populated date means a user sent at least one manual message. That reading comes from the field name. The connector does not define it further. |
| Unread count | **Direct**, but 0 on all 2,104 conversations in the account | Could be accurate or not populated. **Not usable as evidence that replies were handled.** |
| DND (do not disturb) | **Direct**, False on all 505 | False does **not** mean permission to text. It only means DND is not set. |
| Marketing SMS consent | **Not available.** Blank on every contact in the account. | Blank is **not** proof that consent is absent. Consent may live in the form submission, the A2P setup or elsewhere. |
| Preferred check in / check out date | **Not available.** Blank on every contact. | |
| Arrival / drop off date | **Direct**, sparse | Used for the future date flag. |
| Boarding timeline, typical travel season | **Direct** form answers, sparse | Answers are relative to the form date. "Within 7 days" in May is now past. |
| Last booking date, total bookings | **Direct**, sparse | Used for the possible stale stage flag. Field accuracy is not verified. |
| First response time | **Not available** | Needs Part B. |
| Number of touches, full thread, call logs, workflow enrollments | **Not available** | Needs Part B. |
| "Was contacted," "replied to," "follow up worked" | **Inferred only** | Never concluded from these fields alone. |

---

## 2. Results

### 2.1 Activity visible in metadata

| Measure | Count of 505 |
|---|---|
| Conversation thread exists | 505 |
| Manual message date populated (a user messaged at least once) | 406 |
| Last outbound message was automated | 350 |
| Last outbound message was manual | 61 |
| No last outbound action recorded | 94 |
| Neither a manual message nor an automated last outbound visible | 16 |
| Stage ever changed after creation | 75 |

| Days since last message, either direction | Count |
|---|---|
| 0 to 14 | 93 |
| 15 to 45 | 46 |
| 46 to 90 | 39 |
| 90+ | 327 |

**Read, within limits:** at least 406 of 505 carry metadata showing a human sent at least one manual message. That contradicts "untouched" as a general description. Response speed, number of touches and quality cannot be judged from this. Only 75 of 505 ever had their stage moved, which is consistent with stages going stale. It does not prove it.

### 2.2 Separated groups

These are flags, not conclusions. They overlap.

| Group | Rule | Count | Next |
|---|---|---|---|
| **A. Future date on record** | Arrival or drop off date on or after Oct 14 2026 | 16 | Check in GHL whether each is already booked |
| **B. Future intent, no date** | Timeline "Future trip / not sure yet" or "This summer," or a travel season answered | 111 | Pipeline signal only. Contact rules are not settled. |
| **C. Possible stale stage** | A booking date or bookings count on the contact, or an arrival date already past | 26 | Likely belong in Won or Lost. Verify against the booking ledger. |
| **D. Lead sent the last message** | Last message direction is inbound | 150 | See the age split below |
| **E. No outbound visible** | No manual message date and no automated last outbound | 16 | Manual review |
| **F. Unread replies** | Unread count above 0 | 0 | Field is unreliable (0 account wide). Treat as unknown. |
| **Manual review set** | D or E | 166 | Part B sample plus targeted review |

**Group D by age of that inbound message:** 17 in the last 14 days, 23 at 15 to 45 days, 25 at 46 to 90 days, 85 older than 90 days. 50 of the 150 also carry a future date or future intent flag.

An inbound last message does **not** prove the reply went unanswered. A call, an in person answer or a message in another channel may not show here. It is the most important group for Part B.

### 2.3 What this does and does not change

- **Does:** rules out "never contacted" as a description of most of the 505. Identifies 26 likely stale stages and 16 future dated leads.
- **Does not:** measure response speed, follow up persistence, or whether Four Paws Inn's follow up works well. That is Part B.

---

## 3. Part B sample (selected, not yet assigned)

- **Method:** stratified random sample by opportunity creation month, with proportional allocation (largest remainder). IDs sorted before sampling. Python `random.Random(20261014)`. Reproducible by re-running the script on the same pull.
- **Allocation by creation month:** Mar 3, Apr 9, May 6, Jun 4, Jul 2, Aug 1, Sep 3, Oct 2. Total 30.
- **Sample composition:**

| Flag | Count of 30 |
|---|---|
| Lead sent the last message | 7 |
| Future intent | 5 |
| Future date | 1 |
| Possible stale stage | 1 |
| No outbound visible | 0 |

- **Option:** add a targeted supplement of the 17 leads whose last inbound message is under 14 days old. A random 30 holds few of them, and they are the most time sensitive. They would be reviewed separately, not mixed into the random sample's statistics.
- **Location of IDs:** the sample file stays in the session scratchpad. It is not committed, because it holds live GHL IDs.
