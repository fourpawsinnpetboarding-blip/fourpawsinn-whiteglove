# Return client flows (System 4)

Status: DRAFT. Nothing sends until Alex says "approved" for each flow (CLAUDE.md section 10, rule 4).
Built Oct 18, 2026. Numbers: `strategy/operating-system/profit-tracker.md`.

## Why

- 277 past clients have not booked in 60+ days. They already trust us.
- 10% coming back is about 28 stays, about $8,200, with no ad spend.
- Clients who come back are already 42% of our revenue since Sep 1.

## Rules for every message

1. No discounts, no free nights, no deals. We are a premium brand. The reason to come back is the care, not a price.
2. Only text contacts with SMS marketing consent (GHL field "Marketing SMS Consent"). Email everyone else.
3. Third grade reading level. No dashes. Use the dog's name.
4. Never promise how a dog will do. Never say "safe".
5. Never ask for a review in an automated message (Alex's rule).
6. Any reply goes to Amanda. A reply stops the flow.

## Flow 1: After the stay (every checkout)

Trigger: opportunity Won and check out date is today. Send the next day at 10 AM.

**SMS**
> Hi {first name}! {dog name} was such a joy this week. We loved having {him or her} with us. Save this number so you can text us your next dates anytime. We will keep {dog name}'s notes ready for next time.

Why: it makes texting us the habit. Returning clients skip the form and just text.

## Flow 2: Holiday pre-booking (one time, send Oct 27)

Audience: every past client with a paid stay. Amanda confirms open holiday dates before this goes out.

**SMS**
> Hi {first name}! Holiday dates fill up first every year. If you are traveling for Thanksgiving or Christmas, text us your dates and we will hold a spot for {dog name}. Happy early holidays from all of us at Four Paws Inn.

**Email subject:** Holiday dates for {dog name}
> Hi {first name},
>
> Holiday dates fill up first every year.
>
> If you are traveling for Thanksgiving or Christmas, reply with your dates. We will hold a spot for {dog name}.
>
> Same care, same team, same daily a daily video.
>
> Amanda and Alex
> Four Paws Inn

Why: it's true, timely and urgent without a discount. Thanksgiving is Nov 26, so Oct 27 gives families 4 weeks.

## Flow 3: We miss {dog name} (60 days after the last stay)

Trigger: last check out date was 60 days ago and there's no booking since. Send once, then again at 120 days with the second message.

**SMS, day 60**
> Hi {first name}! We were just talking about {dog name} today. How is {he or she} doing? Whenever you have a trip coming up, just text us your dates.

**SMS, day 120**
> Hi {first name}, it is Amanda from Four Paws Inn. We would love to see {dog name} again. If you have any trips coming up, text us your dates and we will check our openings.

Why: a check in, not a pitch. It keeps us top of mind for the next trip.

## Flow 4: Travel season reminder (yearly)

Trigger: GHL field "Typical Travel Season" is filled. Send 3 weeks before that season starts.

**SMS**
> Hi {first name}! Your usual travel time is coming up soon. If you have dates for {dog name}, text them here and we will hold a spot.

Gap: most contacts don't have this field filled. Amanda asks "When do you usually travel?" at every checkout and logs the answer.

## Phase 2 (not now)

- Dog birthday note. There's no birthday field yet, so add it to the guest form first.

## Build steps (Codex, in GHL, as DRAFTS)

1. Build the past client list from the intake sheet (DEPOSIT = YES) and the Bookings tab. Match by phone. Tag each contact `past-client` and fill "Last Check Out". Do not send anything.
2. Build Flows 1, 3 and 4 as GHL workflows. Leave them in Draft, not Published.
3. Build Flow 2 as a one time SMS and email campaign. Leave it as a draft.
4. Add the consent filter (Marketing SMS Consent = true) to every SMS step.
5. Report on the Eden board: list size, how many have SMS consent, and a link to each draft.
6. Alex approves each flow by name. Only then does Codex publish it.
