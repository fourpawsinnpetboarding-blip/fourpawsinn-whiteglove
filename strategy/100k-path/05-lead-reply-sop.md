# Lead Reply SOP: a person replies within 15 minutes

**Why:** Part B (`04-lead-activity-audit-part-b.md`) found that automation answers fast, but a person rarely does. A GHL user sent the first reply on 1 of the 30 random leads. 107 of 505 New Leads end with the lead's message and no answer. 8 of the 16 recent leads got no reply at all.
**Owner:** Amanda. **Backup:** Alex.
**Metric (the number this SOP moves):** the count of open leads where the lead had the last word, and the share of leads with a person's reply within 15 minutes. Baseline: 107 and 35% (person or Meta inbox).

---

## 1. The rule

1. Every inbound lead message gets a reply from a person within 15 minutes, from 8:00 AM to 8:00 PM ET, seven days a week.
2. A message after 8:00 PM gets a reply by 9:00 AM the next day.
3. The ManyChat or workflow auto reply does not count. It buys time. It is not the answer.
4. No conversation ends with the lead's message. Even a "no" gets a short, kind close out.

## 2. Setup (one time, about 20 minutes)

1. GHL mobile app: turn on push notifications for new inbound SMS, Instagram, Facebook and email messages. Amanda and Alex both.
2. GHL Conversations: save a filter for "Unread" and "Last message inbound". Pin it.
3. Instagram and Facebook: reply inside GHL, not in the Instagram app or Meta Business Suite. Replies sent outside GHL show up with no user attached, so the scoreboard cannot credit them.
4. Calls: call from the GHL dialer or the CallRail number, not a personal phone, so the call is logged. Today only 15 calls show in 5,314 messages.

## 3. Daily routine

| Time (ET) | Who | Action | Minutes |
|---|---|---|---|
| 9:00 AM | Amanda | Clear the pinned filter. Reply to everything overnight. | 10 |
| Through the day | Amanda | Reply from the phone notification within 15 minutes. | as needed |
| 1:00 PM | Amanda | Sweep the filter again. | 5 |
| 7:30 PM | Amanda or Alex | Last sweep before the 8:00 PM cutoff. | 5 |
| Monday | Claude | Re-run the queue and Part B scoring (section 6). Report the two numbers. | 0 for Alex |

## 4. Channel rules

1. **Instagram and Facebook DMs:** Meta allows a normal reply for 24 hours after the lead's last message. From 24 hours to 7 days, a reply needs the Human Agent tag. After 7 days the DM window is closed. If a phone number is on file, reply by SMS instead.
2. **SMS:** a one to one reply to a lead who texted us is fine. Never send to a list (CLAUDE.md, section 10, rule 4).
3. **STOP or DND:** do not contact. Not by SMS, not by DM. The queue marks these as "skip".
4. Before replying to anyone who mentions a booking or a deposit, check the booking sheet.

## 5. Reply templates

Short, warm, one question at the end. Swap in the dog's name from the thread. Never quote a cat price or a private suite price. Never promise anything about a dog's health or safety.

**A. Late reply, no answer from us yet**
> Hi, this is Amanda from Four Paws Inn. I am so sorry for the slow reply. I want to help you. What dates are you thinking about for your pup?

**B. Asked about price**
> Hi, this is Amanda from Four Paws Inn. Our dogs stay cage free in our home. It is $60 a day for dogs under 50 lb and $75 a day for dogs over 50 lb. A second dog is $5 a day off. What dates do you need?

**C. Planning a future trip**
> Hi, this is Amanda from Four Paws Inn. Thank you for thinking of us for your trip. Holiday dates fill up fast. Want me to hold a spot for you now? What dates are you looking at?

**D. Went quiet after we talked**
> Hi, this is Amanda from Four Paws Inn. Just checking in. Do you still need a place for your pup? I am happy to help you plan it.

**E. Said no or booked somewhere else**
> Thank you for letting me know. We are here any time you need us. Have a great trip.

**F. Cats or a private suite**
> Hi, this is Amanda from Four Paws Inn. Great question. The price depends on your stay, so I will confirm it for you. What dates do you need?

## 6. The queue (Claude runs it)

`analysis/lead_activity_partb.py` builds the list of New Lead opportunities where the lead had the last word in the past 45 days. Read only. IDs and GHL links only.

1. Pull: `python3 -I lead_activity_partb.py pull <scratchpad dir>`
2. Queue: `python3 -I lead_activity_partb.py queue <scratchpad dir>` writes `reply_queue.csv`.
3. Order: leads we never replied to first, then the rest, shortest wait first. STOP and DND rows are marked "skip".
4. The queue stays in the scratchpad. It holds live GHL IDs and is never committed.

**Scope limit today:** the queue covers stage New Lead only. Leads in Qualified or Meet & Greet Scheduled who message us are not in it yet. Covering them needs a wider read of GHL contacts, which needs Alex's approval.

## 7. Done means

1. The queue count drops from 33 (2026-10-15) to under 5 and stays there.
2. Person within 15 minutes moves from 35% toward 80% on the next Part B run.
