# Profit tracker (System 3)

Owner: Claude pulls it every Monday with the scoreboard. Codex keeps the data sources clean. Alex reads the verdict line only.
Built Oct 18, 2026 (Alex chose Option A after reviewing inthebrandlab.com's four systems model).

## The one question it answers

Is every dollar of ad spend coming back as profit, and which lever is broken right now?

## Terms (one line each)

| Term | Meaning |
|---|---|
| Average stay | Total booking revenue divided by number of stays |
| Contribution margin | What is left from a stay after the cost to deliver it. We use ~67% (profit $20K on revenue $30K, Alex's numbers) |
| LTV (lifetime value) | Revenue one client brings across all their stays |
| CAC (customer acquisition cost) | Ad spend divided by new booked clients from that spend |
| Break even CAC | The most we can pay for a new client and still not lose money: LTV x contribution margin |
| MER (marketing efficiency ratio) | Total revenue divided by total ad spend, all channels |
| Close rate | Leads who book a paid stay, divided by all leads |
| Repeat rate | Clients with 2 or more stays, divided by all clients |

## Numbers, Oct 18, 2026

| Metric | Value | Source |
|---|---|---|
| Average stay | **$295** | Money tracker, Bookings tab, 132 paid stays since Sep 1 |
| Contribution per stay | **$198** | $295 x 67% |
| Stays per client | 1.38 | Bookings tab (only 7 weeks of history, will rise) |
| LTV, revenue | **$406** | $295 x 1.38 |
| LTV, contribution | **$272** | $406 x 67% |
| **Break even CAC** | **$272** | Above this, a new client loses money |
| Meta spend, Apr 1 to Oct 17 | $9,671 | Windsor, account 942706665029521 |
| Meta leads | 580 ($16.67 CPL) | Windsor |
| Meta booked clients | 62 | GHL Won, source Meta, Facebook Lead Form, Summer Boarding Lead |
| **Meta CAC** | **$156** | $9,671 / 62 |
| Meta close rate | 10.7% | 62 / 580 |
| Meta profit per new client | about $116 | $272 minus $156 |
| Repeat rate | 24% of clients, 42% of revenue | Bookings tab since Sep 1 |
| Past clients not seen in 60+ days | **277** | Intake form, paid deposits, Oct 2025 to now |

## Google Ads: the main engine (Alex, Oct 18, 2026)

Google Ads isn't connected to GHL, so the GHL and Windsor numbers above miss most of it. Alex's own numbers:

| Metric | Value |
|---|---|
| Google Ads spend | about $2,500 to $3,000 a month |
| Revenue from Google Ads | about $20,000 to $25,000 a month |
| Best months (Google only, a full year) | $25,000 to $30,000 on about $3,000 spend |
| **Google ROAS** (revenue divided by ad spend) | **about 8x to 10x** |
| Meta ROAS, first stays only | about 3.9x ($37,690 on $9,671) |
| **Blended MER** | **about 7.7x** ($30,000 revenue on about $3,900 total spend) |

What it means: dollar for dollar, Google returns about 2x what Meta does. Google is the engine, and Meta is the second channel.

## Meta by month (the trend that matters)

| Month | Spend | Leads | Booked | CAC | Close rate |
|---|---|---|---|---|---|
| May | $2,425 | 148 | 9 | $269 | 6% |
| Jun | $2,617 | 159 | 17 | $154 | 11% |
| Jul | $1,349 | 81 | 17 | **$79** | **21%** |
| Aug | $874 | 66 | 9 | $97 | 14% |
| Sep | $1,184 | 48 | 5 | $237 | 10% |
| Oct (to 17th) | $1,108 | 65 | 3 | $369 | 5% |

October is not final. Most October leads are still open, so its CAC will fall as they close.

## Verdict, Oct 18

1. **Google Ads is the engine.** At about 8x to 10x return, it's the best dollar we spend. The first question each month: can Google take more budget at the same return? The answer comes from impression share lost to budget (the share of searches where our ad did not show because the daily budget ran out). If that number is high, raise Google before Meta.
2. **Meta is profitable but second.** $156 CAC against a $272 break even. The leak is closing, not cost per lead: CPL held between $15 and $25 all year, while close rate fell from 21% in July to 5 to 10% now.
3. **The cheapest growth is the 277 past clients.** They already trust us. Getting 10% of them back is about 28 stays, about $8,200 in revenue, at almost no ad cost. See `content/retention/return-client-flows.md`.

## Rules for spend decisions

| If Meta CAC (trailing 30 days) is | Do this |
|---|---|
| Under $150 | Scale budget 20% a week while it holds |
| $150 to $272 | Hold budget. Fix close rate first |
| Over $272 for 2 weeks in a row | Cut the worst ads, then the budget. Every new client is losing money |

## Known data gaps (fix list)

1. **Google Ads is not tracked to bookings.** Spend is not in Windsor (Basic plan), and Google calls and form leads don't reach GHL, so only Alex's estimate exists. Fix: Codex's Oct 24 ADS DATA drop must include monthly spend, conversions, cost per conversion, and **search impression share lost to budget**, for the last 12 months. Then Google calls get tagged in GHL through CallRail, so Google bookings show up as Won.
2. **Repeat stays are not all in GHL.** Returning clients text Amanda and skip the form. GHL shows only 5% repeat. Real repeat rate needs the Bookings tab, which only started Sep 1.
3. **The Monthly Dashboard tab in the money tracker is broken.** It shows $166,584 for July 2025 against a $6,500 target. Do not use it. Codex to fix or delete it.
4. **Contribution margin is an estimate.** It is based on Alex's ~$20K profit on ~$30K revenue. Replace it with real cost per dog per day when Amanda has it.

## Monday routine (Claude)

1. Pull Meta spend and leads for the last 7 and 30 days (Windsor).
2. Pull GHL Won by source for the same windows.
3. Pull paid stays and revenue from the Bookings tab.
4. Recompute every number in the table above. Add one row to the monthly table.
5. Write the verdict in 3 lines and give it to Alex with the scoreboard.
