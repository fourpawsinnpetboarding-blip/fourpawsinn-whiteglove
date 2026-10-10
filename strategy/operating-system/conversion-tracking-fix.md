# Conversion tracking fix: GHL "Won" to Meta and Google

Owner (Oct 7, 2026): Ripon, Upwork freelancer hired and paid by Alex. Codex and Claude do not touch this setup; Claude verifies the result only.

## Verify Ripon's work (done means all 4)
1. Meta Events Manager, dataset: CRM events (lead stages or Purchase) show 'Last received' within the past few days.
2. Events carry the instant form lead ID plus email or phone (Event Match Quality shown).
3. Marking a test opportunity Won in GHL produces one event in Meta within an hour.
4. Windsor shows CRM or offline conversions on Four Paws Inn Ads 2 (Claude checks).

Goal: when an opportunity in GHL is marked **Won** (deposit paid), Meta and Google Ads both get a conversion with the value, so the ad platforms learn who actually books, not just who fills a form.

## What Claude verified (2026-10-04, Windsor, Meta account 942706665029521)

Daily data, June 7 to Oct 4, 2026 (120 days):

| Signal | Total |
| --- | --- |
| Instant form leads (on-Facebook) | about 450 |
| Purchase (any source) | 0 |
| Offline / CRM purchase | 0 |
| Pixel purchase | 0 |
| Pixel lead | 0 |
| Custom events | 0 |

Meta has not credited a single purchase to the ads in at least 120 days. Either the events never arrive, or they arrive without enough customer data to match to an ad click. Google Ads is not connected to Windsor, so Claude cannot check it yet.

## Most likely causes (check in this order)

1. **The GHL workflow is off, broken, or triggered on the wrong thing.** Trigger must be "Opportunity status changed" to **Won** in the right pipeline. If the pipeline or stage was renamed, the trigger silently stops.
2. **The Meta action sends too little data.** For instant form leads, Meta matches best on the **lead ID** from the form, plus email and phone. A Purchase sent with only a name will not match.
3. **Wrong event setup in Meta.** Instant form leads should feed Meta's **Conversion Leads** setup (CRM events tied to the lead ID). A website pixel Purchase cannot be credited to an instant form ad.
4. **Google needs a click ID.** Google offline conversions only match leads that came from a Google ad click (GCLID). Meta leads will never count in Google. That is correct, not a bug.

## Alex: 3 checks (10 minutes, no changes)

1. Meta **Events Manager**, your dataset/pixel, **Overview**: is there a "Purchase" or "Converted" row, and when was it last received? Screenshot it.
2. Same place, **Diagnostics** tab: screenshot any warnings.
3. Google Ads, **Goals, Conversions, Summary**: screenshot the list, showing each action's status ("Recording", "No recent conversions", "Inactive").

## Codex prompt (GHL side, read first)

```
Diagnose why GHL "Won" opportunities are not reaching Meta and Google Ads as conversions. Meta shows 0 purchase or CRM conversions attributed in the last 120 days.

Phase 1, read only. Change nothing.
1. List every workflow that fires on opportunity status Won, stage change to Booked/Won, or payment received. For each: name, status (published/draft), trigger with exact pipeline and stage, every action, last 10 executions with success or error.
2. For any Meta Conversions API / Facebook action: event name, which fields it sends (email, phone, lead ID, value, currency, event time), and the connected pixel/dataset ID.
3. For any Google Ads conversion action: conversion action name, whether GCLID is captured on contacts, and last successful upload.
4. Check the last 5 Won opportunities: do those contacts have email, phone, Facebook lead ID, GCLID?
5. Report a table: what is broken, why, the exact fix.

Phase 2 only after Alex says go: apply the fixes, then mark one test opportunity Won and confirm the event shows in Meta Events Manager (Test Events) and in the workflow execution log. Never send SMS or email to a real lead. Never delete a workflow; duplicate and edit.
```

## Done when

- A Won test opportunity shows up in Meta Events Manager within 1 hour, with a good match quality score.
- The workflow log shows success for every Won in the last 7 days.
- Google Ads shows "Recording conversions" for the booking action (Google-sourced leads only).
- Claude re-checks Windsor weekly: CRM/offline purchases above 0.

## Update 2026-10-04 evening: Meta only (GHL now connected through Windsor)

Real test case: opportunity `3LtfgZxQCSqwxeUDxrCT`, $360, marked Won Oct 4 4:16 PM ET. Alex confirmed it is a genuine booking. Lead came in Sep 17 from a Facebook lead form.

What the GHL records show for this week's 4 real Won bookings:

1. Contact source is `external_form`, not GHL's native Facebook lead integration. The leads arrive through a pass through form, so **no Facebook lead ID is stored**.
2. `meta_fbc` (click ID) and `meta_fbp` (browser ID) are empty on all 4. Ad attribution fields are empty on all 4.
3. Email and phone are present on all 4. That is the only thing Meta can match on today.
4. Meta Ads (last 90 days, through today): 0 purchases from every source (offline, website, CAPI, omni).

Why Meta shows nothing even if events arrive:

1. **No lead ID.** Meta's Conversion Leads setup (CRM events tied to the instant form lead) needs the Facebook lead ID. Without it, Meta has to guess from email and phone, and match rates on hashed email and phone alone are low.
2. **Attribution window.** A plain Purchase event is only credited to an ad inside the account window (default 7 day click, 1 day view). The $360 booking took 17 days from lead to Won. Even a perfect event would land in Events Manager but show 0 in Ads Manager. Conversion Leads ties the event to the lead itself, so the long sales cycle still counts.

## Fix, in order (for the contractor)

1. **Prove receipt.** Events Manager, the dataset the GHL workflow sends to, Overview: is there a Purchase (or CRM event) received around Oct 4 4:16 PM ET? If not, the GHL workflow is not sending. Check its execution log for opportunity `3LtfgZxQCSqwxeUDxrCT`.
2. **Capture the lead ID.** Connect the instant forms through GHL's native Facebook lead integration (or map `leadgen_id` into a GHL custom field in whatever tool passes the form today).
3. **Send Conversion Leads events.** On Won, send the CRM event to the same dataset with lead ID, email, phone, value, USD, and event time = the real Won time.
4. **Turn on Conversion Leads** for the dataset in Events Manager (CRM integration), so the funnel stages show and the lead ads can later optimize for booked customers instead of form fills.

Done when: one genuine Won shows in Events Manager within 1 hour with lead ID matched, and the dataset's CRM funnel shows it as converted.

## Update 2026-10-08: Ripon's status and decisions

1. Dataset "Offline Conversion – FourPaws" is connected to ad account 942706665029521. Confirmed by Ripon.
2. Lead ID is not in the Purchase event yet. Decision: approve once Ripon quotes the cost. This is step 2 above and the single biggest gap.
3. Stape free plan will not hold this setup. Decision: approve the cheapest paid tier. Expense category: business ads tools.

Verify (Claude): the next genuine Won booking shows as a Purchase in Events Manager within 1 hour, with lead ID matched, and appears in Windsor under `actions_offline_conversion_purchase` for account 942706665029521.

## Update 2026-10-09: Ripon reports lead ID LIVE

Ripon (Oct 9, 7:45 PM): Purchase events now carry the Meta lead ID (from GHL contact), plus city, state, zip, country; action_source CRM; event ID = opportunity ID. Tested with Theo (Facebook instant form customer, $300): accepted by Meta, visible in Offline Conversion – FourPaws dataset with lead ID. Test mode off, server GTM published.

Claude check (Windsor, Oct 9): Ads Manager shows 0 attributed purchases Oct 2 to 8. Expected: Theo's lead is older than the attribution window, and Dania ($230, Meta lead) is the first live Won after the update. Real proof = Dania's Purchase in Events Manager with lead ID, then attributed in Ads Manager within 1 to 2 days.

Open: confirm Ripon restored Theo's "Meta Purchase Sent" protection flag after the test.

Claude check (Windsor GHL, Oct 9 01:49 UTC):
- Dania (opp "Fabluc1", Facebook Lead Form, $230) Won Oct 9 01:01 UTC, Meta Purchase Sent = yes. GHL side fired.
- Theo ($300) Meta Purchase Sent = yes, so the protection flag is back on. No double send risk.
- Not sent: Rebecca ($360, Facebook Lead Form, Won Oct 4) and Kevin ($160, Facebook Lead Form, Won Sep 28) have no Meta Purchase Sent flag. They predate the rebuild. Ask Ripon to send Rebecca now while still inside Meta's 7 day window, and Kevin if Meta still accepts it.
- Meta side: attribution check scheduled Oct 9 19:50 UTC (trig_012wbkMBKdxjqN7VMvG7kr17).

## Dania $230 check in Ads Manager, Oct 9 2026 3:50 PM ET (Claude, Windsor)

Pulled ad account 942706665029521, Oct 7 to 9, by ad: offline purchases 0, purchases 0, purchase value $0 on every ad. Leads are flowing (Oct 8: 5, Oct 9 so far: 1).
Read: Dania's Won was sent (GHL flag yes) but no ad got credit. Expected: she was a returning lead from an older channel, far outside Ads Manager's 7 day click window, so Meta has nothing recent to attribute it to. Ads Manager showing 0 does not mean Meta never received it.
Next: confirm receipt in Events Manager > dataset "Offline Conversion – FourPaws" > Overview, a Purchase event on Oct 9 (Alex, 1 minute, or ask Ripon for a screenshot). First true attribution test = the next Won from a lead that filled a form in the last 7 days.

## Ripon access restored, Oct 10 2026 9:30 PM ET (Amanda's login)

Ripon had dropped off Business Settings > People. Re-invited riponbd2543@gmail.com (shows as Ahmad Ripon), accepted. Assets: Four Paws Inn Page, ad account Four Paws Inn Ads 2 (942706665029521), datasets Offline Conversion- FourPaws and wix website pixel, full control. Not given: test-, Four Paws Inn Leads, Four Paws Inn. Event Data, competitor ad, Testing. Data flow never stopped: Conversions API System User stays assigned to Offline Conversion- FourPaws (23 events in the last 28 days).
Open: Four Paws Inn admin account shows "Passkey not turned on" (turn on passkey or 2FA). Events Manager warning: a qualified lead optimization campaign has no conversion event selected (check at the Oct 17 review).

## Stape upgraded to Pro, Oct 10 2026 (Alex)

Container "forpaws server" (GTM-WRWT22H3) moved from Free to Pro, $20/month, billed monthly to Four Paws Inn LLC on Alex's card. Why: Free caps at 10,000 requests a month; usage was 5,453 about 5 days into the cycle (about 1,000 a day), so the cap would hit around Oct 14 and stop Won events reaching Meta. Pro also unlocks the logs Ripon needs. Auto-upgrade left OFF. Review annual billing (saves $40/yr) in Dec or Jan once tracking is proven.
