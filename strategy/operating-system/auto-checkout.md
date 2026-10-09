# Automation: check out date = post stay workflow (no one has to remember)

Owner: Alex builds once in GHL (about 10 minutes). Claude verifies weekly. Nobody tells Codex a client left anymore.

## Why

Today: Alex texts Codex a phone number when a client checks out, Codex adds the contact to "Post-Stay Referral Invite" (SMS 2 days later), then "RETENTION | Active Client Value | Every 30 Days" keeps them warm. It gets forgotten, so referral asks and the 30 day nurture never start for those clients.

## How it works

1. Every booking already reaches GHL through the Bookings tab (status SYNCED). The webhook carries `check_out`.
2. "SYSTEM | Paid Booking Sync" saves that date on the contact in a new field: **Last Check Out**.
3. New workflow "SYSTEM | Auto Checkout" fires on the Last Check Out date at 7:00 PM ET (after the 4:00 to 6:30 PM pick up window) and adds the contact to "Post-Stay Referral Invite".
4. The existing workflows do the rest (2 day SMS, then the 30 day nurture). Their messages do not change.

## Build steps (GHL)

1. Settings > Custom Fields > Add Field > Date Picker, object Contact, name `Last Check Out`.
2. Automation > Workflows > "SYSTEM | Paid Booking Sync". After "Create or update opportunity", add action **Update Contact Field**: Last Check Out = the inbound webhook value `check_out`. Save, Publish.
3. Create workflow "SYSTEM | Auto Checkout".
   - Trigger: **Custom Date Reminder**, field Last Check Out, on the day, 7:00 PM.
   - Action: **Add to Workflow** > "Post-Stay Referral Invite".
   - Settings: Allow re-entry ON (repeat clients check out many times).
   - Publish.
4. "Post-Stay Referral Invite" settings: Allow re-entry ON.

## Test (safe)

Use the TEST contact only: set its Last Check Out to today, wait past 7:00 PM, confirm it entered "Post-Stay Referral Invite". Then remove the TEST contact from that workflow before the 2 day SMS. Never test on a real client.

## Edge cases

1. Stay changes after the row is SYNCED (early pick up, extension): change Last Check Out on the contact in GHL.
2. Cancelled booking: until cancel to Lost exists, Amanda changes Last Check Out to blank on that contact, or the client gets the post stay text.
3. Clients already in house today were synced before this field existed: add them by hand one last time.
4. Spanish form and old form clients still sync (Amanda types the owner name), so they get the date too.

## Log

- 2026-10-09: Spec written. Build pending (Alex in GHL, or Codex when usage resets).
