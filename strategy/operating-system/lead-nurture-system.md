# Lead nurture system: talk to more leads (Alex, Nov 6, 2026)

Sources:
- Matt Ryder (Dialer.io) on Cole Gordon: https://youtu.be/XCUJqQapJd4
- Jeremy Haynes, educate at every stage: https://youtu.be/nC5MWa6cfGQ (see strategy/content/educate-every-stage.md)

## The problem
GHL "New Leads" holds a large number of people who filled the form and never answered. We have no system to keep talking to them. Once a real conversation starts we close at a high rate, and after a meet and greet we close at our highest rate. A silent lead is not a dead lead. It is a lead nobody has started a conversation with yet.

## What Matt Ryder teaches that applies to us
1. **Speed to lead wins.** Most conversations happen in the first 3 attempts, and the faster the first touch, the higher the answer rate. A day 1 lead is worth more than a day 2 lead.
2. **Work leads in priority order, not list order.** Fresh leads first, then leads who just texted back, then leads with fewer attempts, then the rest.
3. **Staff the hours the leads come in.** If most forms arrive 5 PM to 8 PM, someone answers then, not the next morning.
4. **Follow up past the point of feeling thirsty.** It feels normal, then pushy, then it turns into respect. Most businesses quit right before it turns. Dialer follows up daily for 90 days after a quote, then twice a week forever.
5. **Every touch is a pattern interrupt.** A new video, a new question, a personal detail. Never "just checking in."
6. **Educate, and the sale follows.** If they believe our way is right for their dog, booking is the natural next step.
7. **Separate pipelines for separate stages.** No reply, quoted, no show, booked: each gets its own cadence.
8. **Know when to stop calling.** After the active cadence, a lead moves to long term nurture (value only), not 50 more texts.

## Our changes
1. **Meet and greet becomes the main ask for cold leads.** For leads who went quiet, the Tuesday meet and greet is the call to action, because it is where we close best. Warm leads who are moving still get the normal flow (dog, value, price, booking), with the meet and greet offered once as optional.
2. **Every follow up carries a video.** SMS links to one short video. Emails are value: a video, a short lesson, or a newsletter that matches the lead's stage.
3. **Videos are made for stages, not just for the feed.** Codex plans them; Claude edits them.

## Lead stages and cadence
All messages are from Amanda, 3rd grade reading level, no dashes, no false scarcity, no health or safety claims. Codex sends in GHL on the cleaned list (no STOP, DND, wrong numbers), 25 a day, business hours, Alex-approved words only (CLAUDE.md section 10, rule 4 exception).

| Stage | Who | Cadence | Goal |
|---|---|---|---|
| A. New, no reply | Form in, never answered | Within 5 min, then day 1, day 3 | Start a conversation |
| B. Quiet | No reply after day 3, up to day 30 | Every 3 to 4 days, a new video each time | Get a reply or a meet and greet |
| C. Cold | No reply after 30 days | Twice a month, value only, plus holiday dates | Stay top of mind |
| D. Quoted, not booked | Got a price, no deposit | Day 1, 2, 4, 7, then weekly for 8 weeks | Meet and greet or deposit |
| E. Meet and greet booked or missed | Scheduled a tour | Reminder day before plus morning of; missed gets a rebook text same day | Show up, then book |
| F. Booked | Deposit paid | Welcome guide, then one "why we do it this way" video before drop off | Show up excited, no cancel |
| G. Past clients | Stayed before | Monthly, holidays first | Rebook |

## Video map (what to send at each stage)
Real Four Paws videos already live on YouTube:
- Drop off at the car: https://www.youtube.com/watch?v=RYfpiPGnTcI
- Every dog has their own style: https://youtu.be/hx4W_Hl30WY
- One on one time before introductions: https://www.youtube.com/watch?v=00iAauS1qts
- A real home, everyday boarding: https://youtu.be/6Vs58pWcQLI

| Stage | Send |
|---|---|
| A | A real home, everyday boarding |
| B | Drop off at the car, then one on one time, then every dog has their own style |
| C | Newest education post, holiday dates |
| D | Reviews video, then first day at their own pace (Fri Nov 6 reel), then the VSL when final |
| F | Welcome guide, then drop off at the car |

Videos to make (Codex decides and plans):
1. Shy dog, first day to last day (a real settling in story, owner OK, no health claims, no promise every dog does this).
2. What a meet and greet looks like (the tour, Amanda answering questions).
3. Why we have drop off windows (calm house).
4. What your daily video looks like.
5. Reviews read by the owners.

## Message library (drafts, Alex approves before Codex sends)
GHL fills the first name. If the pet name is known, use it.

**A1, within 5 minutes**
Hi {{contact.first_name}}, it's Amanda from Four Paws Inn. Thanks for reaching out! What's your pup's name, and what dates are you thinking? Here's a quick look at a day here: https://youtu.be/6Vs58pWcQLI

**A2, day 1**
Hi {{contact.first_name}}, Amanda again. No rush at all. When you get a minute, tell me a little about your pup and I'll help you plan their stay.

**A3, day 3**
This is how we greet every dog, right at your car: https://www.youtube.com/watch?v=RYfpiPGnTcI Would your pup like a calm hand off like this?

**B1**
Every new dog starts with one on one time with us before meeting anyone. Here's what that looks like: https://www.youtube.com/watch?v=00iAauS1qts

**B2, meet and greet ask**
If you'd like to see the home first, we do meet and greets on Tuesdays. You can ask me anything in person. Want me to save you a time?

**C1, twice a month**
Hi {{contact.first_name}}, it's Amanda from Four Paws Inn. Holiday dates book fast. If you have a trip coming up, send me your dates and I'll help you plan your pup's stay.

**D1, day 1 after the quote**
Any questions about the stay? Happy to help. Here's what our families say: (reviews video link when ready)

**D2, day 4**
A lot of families like to see the home before they book. Meet and greets are on Tuesdays. Want me to save you a time?

**F1, after the deposit**
You're all set! Here's everything you need for drop off day: https://four-paws-inn-welcome.rare-maple-2479.chatgpt.site/#arrival

## Who does what
| Job | Owner |
|---|---|
| Build the stages and workflows in GHL, tag every lead in New Leads by stage | Codex |
| Pull when leads come in (hour of day) and current reply rate | Codex |
| Send the approved texts, 25 a day | Codex |
| Write and update the message library | Claude |
| Plan the stage videos | Codex |
| Edit the stage videos | Claude |
| Approve the words once | Alex |
| Close after a reply or meet and greet | Alex and Amanda |

## Scoreboard (weekly)
- Speed to lead: minutes from form to first text. Target under 5.
- Contact rate: leads who reply at least once. Target 50%.
- Meet and greets booked from quiet and cold leads.
- Bookings from leads older than 7 days (the money we were leaving behind).
