# Lead Activity Audit (Read Only)

**Purpose:** find out whether Four Paws Inn's lead follow up works, and whether opportunities sitting in "New Lead" are stale stage labels or real gaps.

**Rules**
- Read only. No messages, no stage changes, no workflow edits.
- Output holds opportunity IDs only. No names, phones, emails or message text.

**Repeatable:** run it quarterly, or before any claim about follow up performance.

---

## Part A: Automated metadata pull (Claude, through the Windsor GHL connector)

For every open opportunity in stage "New Lead", pull these fields:

| Field | Answers |
|---|---|
| conversation exists (by contact ID) | Was there any message thread at all? |
| conversation_last_message_date, _direction, _type | When was the last touch, who sent it, and on which channel? |
| conversation_last_manual_message_date | Did a human ever message them? |
| conversation_last_outbound_message_action | Was the last outbound message from a workflow or manual? |
| conversation_unread_count | Are there unanswered inbound replies? |
| contact_dnd, contact_marketing_sms_consent | Can they be contacted later, and through which channel? |
| contact_preferred_checkin_date, contact_boarding_timeline | Are they planning a future trip? |
| contact_ai_lead_status, contact_human_review_needed | What did the system already classify? |

**Limit:** the connector shows only the last message. It does not show the full thread, call logs or workflow enrollment history. Part B covers that.

## Part B: Manual sample (Alex or Amanda, about 90 minutes)

1. Claude picks 30 random opportunity IDs from the 505, spread across months.
2. Open each one in the GHL conversation view.
3. Score each one on the sheet below.

| Column | Values |
|---|---|
| opportunity_id | from the list |
| first_response_minutes | minutes from inquiry to first reply, or "none" |
| first_response_by | workflow / human / none |
| outbound_touches | count |
| channels | SMS / email / call / DM |
| lead_replied | yes / no |
| calls_logged | count |
| disposition | booked elsewhere in records / planning future trip / went cold after contact / never reached / junk or duplicate / wrong number |
| stage_should_be | New Lead / Qualified / Lost / Won |

## Proposed reading of results

These thresholds are a starting point for discussion, not a standard.

| Result | Reading |
|---|---|
| 80%+ answered within 15 minutes and 3+ touches | Follow up works. "New Lead" is mostly stage hygiene. Four Paws Inn becomes a credible case study for Option A. |
| 50% to 80% | Partly working. Fix the gaps, measure again, then sell. |
| Under 50% | Four Paws Inn has its own leak. Fix it first. Option A waits. |

Separately: the count of "planning future trip" leads is pipeline Four Paws Inn already owns.
