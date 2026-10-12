# Email marketing plan (started Oct 12, 2026)

Alex: "We have so many emails and we should be marketing all our leads with emails."
GHL (Oct 12 via Windsor): about 1,000 contacts with an email address.

| Segment (GHL tags) | About | What they get |
|---|---|---|
| Past and active clients (booked, active-client, lapsed-client, deposit-paid) | 430 | Book again, refer a friend |
| Leads who never booked (no-response, lost-lead, new-lead, future-dates) | 600 | The first overnight stay |

## Rules
1. One email a week, Tuesday 10 AM ET. Same day, same time, every week.
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

## Email 1, clients: "Mochi, Max and all your friends say hi"
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
