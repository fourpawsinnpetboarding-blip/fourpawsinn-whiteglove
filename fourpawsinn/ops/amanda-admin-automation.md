# Amanda admin automation: intake form to Bookings sheet

Sheet: "(Extensions) Daily Tracker_Money" (Google Sheets id 1l865ufGEWsI9BjV2cLdZo-WuhHfM8vWnBUMnr01Zl9E).

## Today (manual)

1. Client fills out the guest intake form.
2. Amanda retypes it into the Bookings tab: dog names, check in, check out, daily rate, total, deposit, balance, notes, phone, owner, email.
3. Amanda also types one row per dog per day into the month's Daily Revenue tab.

The Bookings tab already has sync columns (Source, GHL Sync Status, GHL Contact ID, GHL Opportunity ID, Last Synced, Sync Error, Booking Key). They are empty, so a sync was planned but is not running.

## Target (automatic)

| Step | How | Amanda does |
| --- | --- | --- |
| 1. Intake form submitted | GHL form (or Google Form) | Nothing |
| 2. New row in Bookings | GHL workflow action "Google Sheets: Create Row", or Apps Script on form submit. Fills dog names, owner, phone, email, check in, check out, source, GHL Contact ID, Booking Key | Nothing. Phone is copied straight from the form |
| 3. Daily rate and total | Sheet formula from dog size and dog count using `business-facts.md` pricing. Amanda can overwrite for special rates | Confirm the rate |
| 4. Deposit | Amanda types the deposit amount. Balance is a formula | One cell |
| 5. Daily Revenue tabs | Apps Script expands each booking into one row per day into the right month tab, every hour | Nothing |
| 6. GHL opportunity | Same workflow moves the Inbound card to Booked when a deposit is entered | Nothing |

Amanda's work per booking: confirm the rate, type the deposit. About 20 seconds.

## Live now (chosen by Alex, 2026-10-03)

- Google Sheet "Amanda Intake Quick Copy" (id 1SZ-LXaElMJmlyTOYvH5Rz9I5UATQ72QsJkGjCDQNI2w), tab "All Clients". One read only formula combines every client tab in the intake responses sheet: NEW ENGLISH FORMS, Spanish Forms, English Forms, OG Spanish Clients, OG 2 English Clients, Original Clients, GHL Import. Columns: Owner, Dog, Check In, Check Out, Form Date, Phone. Deduped by phone plus first dog name (latest form kept; same owner with different dogs stays as separate rows). Newest first. Updates by itself. Writes nothing anywhere. Waivers Signed Jotform tab is excluded (no phone or dates).
- The Apps Script below is NOT installed. Alex chose the read only copy to protect the existing system.

## Built, not installed

- Intake form: Google Form, responses in "Updated Client Intake Form (Responses)" (id 1XcK5fcBq2-jPJSDwbagVDhrpt-nhnsiEDzsYhPB8GBI), tab NEW ENGLISH FORMS. Phone is already captured there.
- `scripts/apps-script/intake-to-bookings.gs`: on every form submit, adds the Bookings row (dog, dates, phone, owner, email, source, key). `backfillPhones()` fills missing phones on existing rows, dry run first.
- Not yet: Spanish form, Daily Revenue tab expansion, GHL card move on deposit.

## Data quality notes

- The Monthly Dashboard tab shows July 2025 actual revenue of $166,584.17 against a $6,500 target. That is a formula error, not real revenue. Fix before using it for the scoreboard.
