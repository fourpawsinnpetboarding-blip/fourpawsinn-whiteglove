# Conversion tracking fix: GHL "Won" to Meta and Google

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
