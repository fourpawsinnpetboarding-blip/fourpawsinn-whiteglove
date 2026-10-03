# Inbound tracking system

Goal: at month end, one report that reads
"We got X inbound leads. Y were qualified. Z booked, in an average of N days. By channel."
No manual counting. The only human input is two judgment clicks.

## 1. Definitions (everyone uses these words the same way)

| Term | Rule |
| --- | --- |
| Inbound lead | A new person who contacts us for the first time in the month, any channel. Deduped by phone number, then email. A second call from the same person is not a new lead |
| Qualified | Has a real or likely stay, lives in our service area, dog fits our care (size, temperament, vaccines), and is OK with our pricing |
| Unqualified | Fails any one of the above. Must carry a reason |
| Converted | Paid the 25% deposit |
| Lost | Qualified, but did not book within 30 days, or said no |
| Time to convert | Deposit date minus first contact date, in days |

Unqualified reasons (pick one): Out of area, Wrong service (grooming only, cats only, daycare only), Dog not a fit, Price, Spam or vendor, Existing client (not a new lead).

## 2. One source of truth: the GHL "Inbound" pipeline

Every inbound, from every channel, becomes one opportunity in this pipeline.

| Stage | Moves there how |
| --- | --- |
| New Lead | Automatic, when any first contact arrives |
| Qualified | CallRail tag (calls) or one click in GHL (text, form, DM, email) |
| Unqualified | Same, plus the reason field |
| Booked | One click when the deposit is paid |
| Lost | Automatic after 30 days in Qualified with no booking, or one click |

Opportunity fields: Channel (Google Ads call, Google organic call, Meta form, Meta DM, Instagram DM, Website form, Text, Email, Referral), First contact date, Booked date, Unqualified reason.

## 3. Channel wiring

| Channel | How it reaches the pipeline |
| --- | --- |
| Phone (CallRail) | CallRail webhook (post call) to a GHL Inbound Webhook workflow: find or create contact by phone, create opportunity in New Lead with Channel from the CallRail tracking number. When the call is tagged Qualified or Not Qualified in CallRail, a second webhook (call modified) moves the stage |
| Meta instant forms | Existing Facebook Lead Form trigger, every live form listed |
| Website and GHL forms | Form Submitted trigger |
| Text, Instagram, Facebook DMs, email | Customer Replied or Inbound Message trigger, first message only (skip if the contact already has an open opportunity) |

## 4. The two human clicks

1. **After every call:** in CallRail, tag the call Qualified or Not Qualified (with reason). 5 seconds. Amanda or Alex.
2. **When a deposit is paid:** move the card to Booked in GHL. 5 seconds.

Everything else is automatic.

## 5. Reporting

- Windsor.ai connects to GoHighLevel and CallRail (plus Meta Ads already). That is 3 data sources, inside the Windsor Basic plan.
- Weekly (Monday): Claude or Codex pulls the counts into `100k-scoreboard.md`.
- Monthly (1st): full report in `strategy/operating-system/reports/<yyyy-mm>.md` using the template below.

### Monthly report template

| Channel | Leads | Qualified | Qualified rate | Booked | Close rate (of qualified) | Avg days to book | Cost | Cost per booking |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Google Ads calls | | | | | | | | |
| Meta forms and DMs | | | | | | | | |
| Organic and referral | | | | | | | | |
| **Total** | | | | | | | | |

Plus: top 3 unqualified reasons, leads still open, and one change for next month.

## 6. Owners

| Task | Owner |
| --- | --- |
| Build the Inbound pipeline, fields and workflows in GHL | Codex (it built the existing workflows). Alex approves before publish |
| CallRail webhooks and the Qualified tag | Alex sets up in CallRail, Codex wires the GHL side |
| Connect GoHighLevel and CallRail in Windsor | Alex (OAuth, 5 minutes) |
| Weekly and monthly report | Claude, Codex checks |
