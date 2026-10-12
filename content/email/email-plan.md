# Email marketing plan (started Oct 12, 2026)

Alex: "We have so many emails and we should be marketing all our leads with emails."
GHL (Oct 12 via Windsor): about 1,000 contacts with an email address.

| Segment (GHL tags) | About | What they get |
|---|---|---|
| Past and active clients (booked, active-client, lapsed-client, deposit-paid) | 430 | Book again, refer a friend |
| Leads who never booked (no-response, lost-lead, new-lead, future-dates) | 600 | The first overnight stay |

## Research (Oct 12, 2026) and what it means for us
| Finding | Source | So we |
|---|---|---|
| Average open about 43%, click about 2% (2025, 3.6M campaigns). Vet practices report 38% to 46% opens | MailerLite benchmarks; Webtonic (vendor, directional) | Judge us on replies and bookings, not opens. Opens are inflated by Apple Mail |
| Weekly senders open about the same as 1 to 3 a month; daily senders lower. Local service guidance: 2 to 4 emails a month | MailerLite frequency study; SimplyBook | One broadcast a week max. Never daily |
| Automated reminder emails open about 48% to 50%, higher than broadcasts | Flowium (Klaviyo data) | Money is in automatic flows, not newsletters. Build flows first |
| Win back: start when a client is gone 1.5 to 2x their normal gap, 3 to 4 emails over 30 to 45 days, lead with news not a discount | Klaviyo, Retently, TopGrowth | Lapsed client flow, no discount in email 1 |
| Dead leads: a one question, plain text email ("9 word email") revives old inquiries. Over 50% of inquirers buy in the category within 18 months | Dean Jackson | Send it to our 360 no response and 135 lost leads first |
| Under 5,000 emails a day we are not a "bulk sender", but Yahoo now filters by domain, Gmail rejects badly set up mail. Keep spam complaints under 0.1% | Google and Yahoo sender rules (via PowerDMARC, Mailreach) | SPF, DKIM, DMARC on a sending subdomain before any send. One click unsubscribe on |
| New GHL sending domains warm up in stages. Start small, send daily, engaged contacts first, no spikes | HighLevel help center (domain warmup) | Week 1: about 100 to 250 a day, clients first |

## The strategy, in order of money
1. **Dead lead email (week 1).** One question, plain text, from Amanda, to leads who never booked. Replies go to Amanda. Cheapest bookings we will ever get.
   Subject: {{contact.first_name}}
   Body: Are you still looking for a place for your pup to stay?
   Amanda, Four Paws Inn
2. **Automatic flows (week 2, built once, run forever).**
   a. Lapsed client win back: 3 emails over 30 days when a client has not booked in 90 days. Email 1 news, email 2 a story, email 3 "Want me to hold your next dates?". No discount.
   b. After stay: day 2 thank you plus how to book again; day 30 "planning another trip?". NEVER a review request (Alex's rule).
   c. First overnight for leads without dates: the email twin of the SMS sequence.
3. **Weekly broadcast (from week 2).** Tuesday 10 AM. Plain and personal, like a note from Amanda. One story or photo, one tip, one button.

## Launch plan
| Week | What | Volume |
|---|---|---|
| 1 | Codex: sending subdomain, SPF, DKIM, DMARC, warmup on. Email 1 to clients (most engaged) | about 150 a day over 3 days |
| 1 to 2 | Dead lead email to leads | about 100 to 150 a day |
| 2 | Build the 3 flows. Test on Test Order | |
| 3+ | Weekly Tuesday broadcast to everyone not unsubscribed | full list |

## Scorecard (weekly, on the Monday scoreboard)
Replies, bookings tagged source email, revenue from email, unsubscribes (keep under 0.5%), spam complaints (keep under 0.1%).

## Rules
1. At most one broadcast a week, Tuesday 10 AM ET. Flows run on their own.
2. Every email: one story or photo, one useful tip, one button. Value first, then the ask.
3. No dashes, 3rd grade, no health or safety claims, facts from business-facts.md only.
4. Unsubscribe link and the business address stay at the bottom of every email. This is the law for marketing email (CAN SPAM), not a choice. GHL adds it. (Alex's no opt out rule is for SMS only.)
5. Nothing sends to a list without Alex's yes (CLAUDE.md gate 4). Claude drafts, Alex approves, Codex schedules in GHL.

## Before the first send (Codex)
1. Check GHL email sending domain: a dedicated subdomain of fourpawsinn.co (for example mail.fourpawsinn.co) with SPF, DKIM and DMARC passing. Without it, emails land in spam.
2. From name "Amanda at Four Paws Inn", reply to fourpawsinnpetboarding@gmail.com.
3. Send each email to Test Order first.

## The math
1,000 emails, about 35% opened, 2% to 3% clicked = 20 to 30 people a week who ask about dates. If 2 to 4 of them book each month at the $237 average, that is about $500 to $950 a month from a list we already paid for. Past clients book again faster than anyone else, so most of it comes from them.

## Email 1, clients: "A quick hello"
Subject: A quick hello from Four Paws Inn
Preview: Plus the easiest way to book your next stay

Hi {{contact.first_name}},

It has been a busy fall at our house in Miramar. The pups are playing outside every hour, napping in the cool, and keeping us on our toes.

We wanted to say thank you. Families like yours are why we have 230+ Google reviews.

A tip for your next trip: book as soon as you know your dates. The days around holidays fill first.

[Button: Send us your dates]

Know someone who needs a great place for their dog? Send them our way. We would love to meet them.

Amanda and Alex
Four Paws Inn

## Email 2, leads: "Why every new pup starts with one night"
Subject: How we get your pup ready for a big trip
Preview: One night with us makes the real stay feel like home

Hi {{contact.first_name}},

You asked about boarding with us a while back, so here is how we help new pups feel at home.

Every new dog starts with one overnight stay before a big trip. Your pup learns our house, meets the pack slowly, and gets to know our team. We learn their routine. Then when your trip comes, they already know us.

What the night looks like:
1. We meet you at your car.
2. First the house, then the yard, then the group, when they are ready.
3. Outside to play every hour.
4. You get a photo and video update.

It is our normal daily rate, $60 for most dogs under 50 lb, Monday to Thursday nights.

[Button: Pick a night]

Amanda
Four Paws Inn

## Approval log
- Oct 12, 2026: Alex "Start". Approved: Email 1 to Clients and the Dead lead email to Leads, in warmup batches of about 150 a day, only after SPF, DKIM, DMARC pass. Email 2 and the flows need their own yes.
