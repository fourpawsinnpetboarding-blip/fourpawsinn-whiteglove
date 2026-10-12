# Dates by text first, link second (APPROVED by Alex, Oct 12, 2026: "1")

Problem: the first texts sent new leads to the booking form. Of the last 3 leads who opened it, 2 left before sending (Dori Lewis, Patricia San Pedro). Alex tested the form on Oct 12 and it works, so the problem is friction, not a broken form. A one-line text reply is easier than a form on a phone.

Rule: the first texts and the no-reply follow-ups ask for dates by text, with NO link. The booking link goes out only after the lead replies with dates, sent by Amanda as the next step.

No dashes. Prewritten only. No AI writes or sends conversational texts.

## Changes (Codex builds in GHL)

### 1. CAPTURE | Dog Inquiry Intake, First SMS (this is the text Patricia got at 4:48 PM)
Old: "...What dates do you need? Send them here and I'll check if we have room 👇🏻 [booking link]"
New:
Hi {{contact.first_name}}, it's Amanda at Four Paws Inn 😊 Thanks for reaching out! What dates do you need? Just text them here and I'll check if we have room.

### 2. Meta first text v2, Text 2 (no reply after 3 hours, FPI Future Travel Conversion)
New:
No rush at all. Whenever you have dates in mind, just text them here and I'll check our openings.

### 3. FPI Wix Lead | Missing Dates v2, Initial SMS
New:
Hi {{contact.first_name}}, it's Amanda from Four Paws Inn. I got your boarding request, but I didn't see your dates. When is your trip? Just text them here.

### Unchanged
- Meta first text v2, Text 1 (asks the pup's name, no link). Already right.
- DATES KNOWN opener (Alex kept it Oct 10).
- Later nurture texts (SMS 5 and SMS 8) keep the link. They go to leads who already know us.

## After the lead texts dates (Amanda sends, GHL snippet "Dates received")
We have room for [dates] 🎉 Next, fill out this quick form with [pup name]'s details and I'll send the deposit link to hold the spot.
https://four-paws-booking.vibepreview.com

New dog: the first overnight is required. Use `content/sales/boarding-ready-scripts.md`.
No room: tell them the truth and offer the closest open dates.

## Check for Codex
Patricia came in through the Meta instant form but got the CAPTURE text, not the personalized Meta text 1. Confirm which workflows fire for a Meta lead with a "within 30 days" timeline, and make sure a lead gets one first text, not two.

## Test
Test Order only. Never text a real lead as a test.
