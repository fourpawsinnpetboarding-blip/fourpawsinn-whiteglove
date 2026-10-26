# Bottleneck analysis: the Meta lead funnel (Oct 26, 2026)

Source method: Jeremy Haynes, "How To Find What's Actually Broken In Your Funnel" (YouTube zyfpGi9uEUU). Alex: "read transcript and use it to help me."

## The method in 4 lines
1. **Data hierarchy:** look at one top number first (return on ad spend). Only if it is bad, break it into the steps that make it up.
2. **Benchmark each step.** Steps inside their range are left alone.
3. **Play the doubles game:** of the steps out of range, fix the one that is easiest to double. Never chase a step that is 2% off while another is at half.
4. **Dig into that one step only:** read the real messages, check delivery, secret shop it. Smaller stats matter only under the broken step.

## Our funnel, step by step (Meta lead form)
| Step | Our number | Benchmark | Status |
|---|---|---|---|
| CPM (cost per 1,000 people reached) | $31.16 (Oct 19 to 25) | $30 to $80 | In range, at the cheap end |
| Click through rate (clicks divided by impressions) | 3.0% (all clicks) | 2% or more | In range |
| Click to lead | Winner 4.0%, all ads 2.8%, last week 4.4% | 3% to 5% | In range on the winner. The tests dragged it down; fixed Oct 25 |
| **Lead to booked** | **5 of about 62 Meta form leads from Sep 13 to Oct 11 are Won: about 8%, after 2 to 6 weeks** | about 15% to 25% (Jeremy's call funnel: 60% show x 25% close is 15%) | **Out of range. Half or less** |
| Average booking value | $289 this week, $384 last week | Ours to set | Not a doubling candidate now |

Won from that cohort: Rebecca Lee $360, Lucio Guerrero $160, Kevin Pena $160, Yoklot Cornelius $360, Cuello $240 (plus a second Cuello stay $175).
Caveat: some Meta leads book later under another source label (the Oct 19 attribution gap), so 8% is a floor, not the exact number.

## The diagnosis
**Lead to booked is the bottleneck.** Ads are not the problem. Reach is cheap, people click, and the winner turns clicks into leads inside the benchmark.

Doubles game:
- Halve a $31 CPM: no.
- Double a 3% click rate: no.
- Double a 4% click to lead: no.
- **Double 8% lead to booked to 16%: yes.** It is the furthest from its range, and it needs no new ad money.

What doubling is worth at $40 a day (about $1,200 a month, about 65 leads at about $18):
| Lead to booked | Bookings a month | Booked value at $289 |
|---|---|---|
| 8% (now) | about 5 | about $1,500 |
| 16% (double) | about 10 | about $3,000 |
| 25% (benchmark top) | about 16 | about $4,700 |
That is $1,500 to $3,200 more a month from the same $1,200 of ads, before repeat stays.

## The second finding: the pipeline is not staged
57 of those 62 Meta leads still read "open", even 6 weeks later. Almost none are marked Lost or given a follow up date. You cannot work a list where everyone looks the same. This is also why the scoreboard keeps saying "about 10%, rising": nobody closes the loop.

## Dig in (only on lead to booked)
Jeremy's checklist, mapped to Four Paws Inn:
1. **Do our texts land?** iPhones send texts from unsaved numbers to the "Unknown Senders" folder, with no alert. Check the GHL sending number, A2P status (the carrier registration that lets business texts deliver) and failed or undelivered counts for the last 30 days. Check whether the first text asks them to save the number.
2. **Read what we actually send.** Export every automated text and email in the Meta Lead Timeline Router and FPI Future Travel Conversion. Score each one: does it give value (price, what is included, a photo, a review) or only ask for something?
3. **Secret shop it.** Submit a test lead through Meta's Lead Ads Testing Tool. Record when the first text arrives, from what number, what it says, and when a human first replies.
4. **Speed to a human.** Still Unavailable on the scoreboard. GHL message level export is the only way to measure it.
5. **Stage every open lead.** Each of the 57 gets one of: Booked, Lost (with reason), or Follow up on a date (their travel month).

## Owners
| Task | Owner | Rule |
|---|---|---|
| Items 1 to 3 and the message level export | Codex | Read only. Never texts a lead. Test lead uses a test name |
| Item 5 staging, from the conversation history | Codex | Updates GHL stages and follow up dates only |
| Rewrite any weak message found in item 2 | Claude drafts, Alex approves | 3rd grade level, no dashes, no health or safety claims |
| Weekly number: Meta lead to booked, 30 day cohort | Claude, Monday scoreboard | Replaces the week one "about 10%" guess |

## Decision rule
Until Meta lead to booked reaches 15% on a 30 day cohort, no Meta budget increase is proposed. More leads into an 8% close only buys more open rows. Once it holds at 15% or better for 2 cohorts, the 20% steps in ad-test-system.md come back on the table.

## Decision (Alex, Oct 26): A
Fix the follow up first: contact card, the VSL in the first text, fast human reply, every lead staged. No change to the Meta form or the winning ad. Revisit B (higher intent form, in the $10 challenger slot only) if 30 day lead to booked is still under 15% by late November. VSL plan: content/video/vsl/vsl-review-01.md.
