# Automation: deposit paid in the sheet = Won in GHL

Owner: Codex builds. Claude verifies weekly. Alex does nothing.

## Why

Every paid deposit is a confirmed booking (Alex, Oct 9 2026). Marking Won in GHL by hand gets forgotten, piles up, and gets avoided. Oct 8 audit found 9 real bookings in 60 days never marked Won. Each missed Won is a booking Meta never learns from.

## Current process (Alex)

1. Lead fills out the guest intake Google Form.
2. Responses land in "Updated Client Intake Form (Responses)" (sheet id 1XcK5fcBq2-jPJSDwbagVDhrpt-nhnsiEDzsYhPB8GBI).
3. Team marks DEPOSIT = YES by hand when the deposit is paid. Cancellations and no shows are also updated in the sheet.
4. A script cleans the data and the money tracker "(Extensions) Daily Tracker_Money" (1l865ufGEWsI9BjV2cLdZo-WuhHfM8vWnBUMnr01Zl9E) computes totals.

## Target behavior

| Sheet event | GHL result (automatic, within minutes) |
|---|---|
| DEPOSIT changes to YES | Find contact by phone (create if missing). Create a NEW opportunity in the Four Paws Inn pipeline: name "First Last Mon DD", stage Booked, status Won, value = booking total, source from "How did you hear about us". |
| Booking marked cancelled or no show | Set that same opportunity to Lost. |
| Row edited again after Won | Do nothing. Never create a second opportunity for the same row. |

Each row stores the GHL opportunity ID it created (new column), so it can never double fire.

Ripon's setup then sends every Won to Meta as a Purchase automatically (lead ID when the contact came from a Meta form, email and phone otherwise).

## Build (recommended)

1. Google Apps Script on the intake sheet, onEdit / time trigger every 5 minutes, watches DEPOSIT and the cancel column.
2. Script POSTs to a GHL Inbound Webhook workflow: phone, email, name, check in, check out, value, source, row id.
3. GHL workflow: Find Contact by phone, Create/Update Contact, Create Opportunity (Won), write back the opportunity ID via the script response or a second webhook.
4. Value: booking total from the money tracker formulas. If not available at deposit time, days x daily rate (under 50 lb $60, over 50 lb $75, second dog $5 off), then updated when the stay closes.

## Done when

1. Test row with a test phone flips to YES and a Won opportunity appears in GHL within 5 minutes, with the right value.
2. The same test row marked cancelled flips the opportunity to Lost.
3. Editing the row again does not create a duplicate.
4. The Monday scoreboard shows sheet deposits this week = GHL Won this week = Meta Purchases this week.
