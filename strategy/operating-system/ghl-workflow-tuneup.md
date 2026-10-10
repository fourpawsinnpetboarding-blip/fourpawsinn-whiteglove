# GHL workflow tune-up (low data method)

Owner: Codex does the GHL clicks (cloud browser). Claude writes the copy in this repo. One agent in GHL at a time.
Started: Oct 7, 2026.

## Why not audit every workflow
Reading every workflow and every message burns data and time, and most workflows have no one enrolled. Only workflows with live enrollments touch revenue. Tune those, archive the rest.

## Pass 1: inventory (one screen per folder, no opening workflows)
From Automation > Workflows, record one row per workflow. Do not open message steps.

List-only snapshot: October 6, 2026, approximately 8:22 PM to 8:25 PM Eastern (October 7 UTC). 56 workflows: 32 Published and 24 Draft. No workflow editors were opened during Pass 1. Last edited is the original list value before moving; GHL changed the timestamp on moved rows. Folder shows the verified final folder and original folder.

Triggers and 30/90-day enrollment history are not displayed on these list screens. "Not shown" is intentional. Total enrolled is lifetime, not recent lead volume. KEEP* means provisionally retain pending enrollment-date evidence. TUNE* means a message-path candidate based on its name; recent enrollment and message content were not established in Pass 1. KEEP/TUNE without an asterisk have nonzero totals and were created within the last 30 days, which bounds the enrollments to that period. Active enrollment alone does not establish enrollment date. No published workflow was archived based only on zero active contacts.

All 24 Draft workflows were moved to the new Archive folder and verified across its three list pages. No workflows were deleted. The paused Monthly Client Perks workflow still shows Draft, 192 total and 175 active; those contacts were not removed or restarted.

| Workflow | Folder | Status (Published/Draft) | Trigger | Total enrolled | Active enrollments | Last edited | Verdict |
|---|---|---|---|---|---|---|---|
| CAPTURE \| Boarding Safety Kit | 01 \| LEAD CAPTURE | Published | Not shown | 80 | 0 | Sep 20 2026, 1:11 PM | TUNE* |
| CAPTURE \| Cat Inquiry Intake | 01 \| LEAD CAPTURE | Published | Not shown | 45 | 0 | May 27 2026, 10:56 PM | TUNE* |
| CAPTURE \| Dog Inquiry Intake | 01 \| LEAD CAPTURE | Published | Not shown | 603 | 0 | Oct 01 2026, 6:56 PM | TUNE* |
| CAPTURE \| FB Messenger Lead | 01 \| LEAD CAPTURE | Published | Not shown | 369 | 75 | Sep 03 2026, 12:30 PM | TUNE* |
| CAPTURE \| IG Messenger Lead | 01 \| LEAD CAPTURE | Published | Not shown | 421 | 110 | Sep 03 2026, 12:32 PM | TUNE* |
| DRAFT \| IG FB Questionnaire Review - Internal Only | Archive (from 01 \| LEAD CAPTURE) | Draft | Not shown | 0 | 0 | Oct 03 2026, 5:43 PM | ARCHIVE: moved |
| SYSTEM \| BOOKED Kill Switch | 01 \| LEAD CAPTURE | Published | Not shown | 16 | 0 | Sep 08 2026, 9:14 PM | KEEP* |
| SYSTEM \| Meta Timeline Router | Archive (from 01 \| LEAD CAPTURE) | Draft | Not shown | 0 | 0 | Sep 05 2026, 9:28 PM | ARCHIVE: moved |
| Future Lead Initial SMS | Archive (from 02 \| NURTURE) | Draft | Not shown | 0 | 0 | Oct 05 2026, 2:32 PM | ARCHIVE: moved |
| NURTURE \| Cat SMS Follow Up | 02 \| NURTURE | Published | Not shown | 42 | 0 | May 27 2026, 11:06 PM | TUNE* |
| NURTURE \| Dog Ghost Reactivation | 02 \| NURTURE | Published | Not shown | 480 | 177 | Oct 06 2026, 1:36 PM | TUNE* |
| NURTURE \| Private Suite SMS Follow Up | 02 \| NURTURE | Published | Not shown | 6 | 0 | May 27 2026, 11:10 PM | TUNE* |
| Post-Stay Referral Invite | 02 \| NURTURE | Published | Not shown | 2 | 0 | Oct 03 2026, 6:17 PM | KEEP* |
| SYSTEM \| Reply Kill Switch | 02 \| NURTURE | Published | Not shown | 999 | 32 | Sep 29 2026, 9:46 AM | KEEP* |
| CONVERT \| Booking Won Tag | 03 \| CONVERSION | Published | Not shown | 204 | 0 | May 27 2026, 10:43 PM | KEEP* |
| CONVERT \| Meta Purchase Won | Archive (from 03 \| CONVERSION) | Draft | Not shown | 125 | 0 | Oct 06 2026, 2:45 AM | ARCHIVE: moved |
| CONVERT \| Meta Purchase Won Backup | Archive (from 03 \| CONVERSION) | Draft | Not shown | 23 | 0 | May 27 2026, 10:44 PM | ARCHIVE: moved |
| CONVERT \| Meta Purchase Won Update | 03 \| CONVERSION | Published | Not shown | 9 | 0 | Oct 06 2026, 2:46 AM | KEEP |
| FPI \| Won Booking → Google Ads | 03 \| CONVERSION | Published | Not shown | 13 | 0 | Oct 04 2026, 4:58 PM | KEEP |
| RETENTION \| Booked Client Follow Up | 04 \| RETENTION | Published | Not shown | 208 | 26 | Sep 29 2026, 10:56 AM | KEEP* |
| SYSTEM \| Lead Temperature Tagger | 99 \| SYSTEM | Published | Not shown | 443 | 0 | May 28 2026, 3:27 PM | KEEP* |
| SYSTEM \| Summer SMS Blast | Archive (from 99 \| SYSTEM) | Draft | Not shown | 1296 | 0 | May 28 2026, 3:04 PM | ARCHIVE: moved |
| (unnamed) | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 10:20 PM | ARCHIVE: moved |
| 30-Day Email Nurture Draft | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 8:43 PM | ARCHIVE: moved |
| 7-Day Email DRAFT \| Email Nurture 7-Day v1Nurture Draft | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 10:20 PM | ARCHIVE: moved |
| Activate Booking Assistant on SMS | Archive (from Home) | Draft | Not shown | 34 | 0 | Sep 09 2026, 5:47 PM | ARCHIVE: moved |
| BACKUP Sep 18 - FPI Future Travel Conversion (do not publish) | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 18 2026, 2:32 PM | ARCHIVE: moved |
| BACKUP Sep 19 - FPI 30-Day Lead Conversion (do not publish) | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 19 2026, 5:21 PM | ARCHIVE: moved |
| BACKUP Sep 19 - FPI 7-Day Lead Conversion (do not publish) | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 19 2026, 5:21 PM | ARCHIVE: moved |
| DRAFT \| 30-Day Multichannel Nurture v2 | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 7:52 PM | ARCHIVE: moved |
| DRAFT \| 7-Day Multichannel Nurture v2 | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 7:56 PM | ARCHIVE: moved |
| DRAFT \| Email Nurture by Timeline v1 - REVIEW | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 8:30 PM | ARCHIVE: moved |
| DRAFT \| Future Multichannel Nurture v2 | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 7:57 PM | ARCHIVE: moved |
| DRAFT \| Historical Lead Cohort Router | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 10:31 PM | ARCHIVE: moved |
| DRAFT \| Nurture Reply and Opt-Out Measurement | Archive (from Home) | Draft | Not shown | 0 | 0 | Sep 04 2026, 8:04 PM | ARCHIVE: moved |
| FPI 30-Day Lead Conversion | Home | Published | Not shown | 11 | 1 | Sep 21 2026, 1:39 PM | TUNE* |
| FPI 7-Day Lead Conversion | Home | Published | Not shown | 12 | 1 | Sep 21 2026, 1:39 PM | TUNE* |
| FPI Future Travel Conversion | Home | Published | Not shown | 31 | 0 | Sep 28 2026, 9:44 AM | TUNE* |
| FPI Lead - ChatGPT Reply Drafts | Home | Published | Not shown | 100 | 0 | Sep 28 2026, 10:15 AM | KEEP |
| FPI Tag - Dates Captured | Home | Published | Not shown | 0 | 0 | Sep 19 2026, 5:52 PM | KEEP* |
| FPI Tag - Human Review | Home | Published | Not shown | 11 | 0 | Sep 19 2026, 5:53 PM | KEEP |
| FPI Tag - Not Ready (14-day check-in) | Home | Published | Not shown | 0 | 0 | Sep 19 2026, 5:54 PM | KEEP* |
| FPI Tag - Not Ready (30-Day lead) | Home | Published | Not shown | 0 | 0 | Sep 19 2026, 5:44 PM | KEEP* |
| FPI Tag - Not Ready (7-Day lead) | Home | Published | Not shown | 0 | 0 | Sep 19 2026, 5:45 PM | KEEP* |
| FPI Tag - Ready to Reserve | Home | Published | Not shown | 0 | 0 | Sep 19 2026, 5:50 PM | KEEP* |
| FPI Wix Lead - Missing Dates | Archive (from Home) | Draft | Not shown | 2 | 0 | Sep 21 2026, 11:00 AM | ARCHIVE: moved |
| FPI Wix Lead - Missing Dates v2 | Home | Published | Not shown | 40 | 0 | Sep 21 2026, 11:10 AM | TUNE |
| FPI \| Client Appreciation & Referrals \| October 2026 Pilot DRAFT | Archive (from Home) | Draft | Not shown | 0 | 0 | Oct 03 2026, 5:33 PM | ARCHIVE: moved |
| Meta Lead Timeline Router | Home | Published | Not shown | 50 | 0 | Oct 04 2026, 10:20 AM | KEEP* |
| Post-Stay Rebook Engine | Archive (from Home) | Draft | Not shown | 0 | 0 | Jun 10 2026, 9:56 AM | ARCHIVE: moved |
| RETENTION \| Active Client Value \| Every 30 Days | Home | Published | Not shown | 172 | 172 | Oct 03 2026, 6:17 PM | KEEP |
| RETENTION \| Monthly Client Perks \| Approval Required | Archive (from Home) | Draft | Not shown | 192 | 175 | Oct 03 2026, 7:25 PM | ARCHIVE: moved |
| SYSTEM \| Cohort Nurture Booking Exit | Home | Published | Not shown | 28 | 0 | Sep 04 2026, 12:33 PM | KEEP* |
| SYSTEM \| Paid Booking Sync | Home | Published | Not shown | 68 | 0 | Sep 04 2026, 7:22 PM | KEEP* |
| VALIDATION ONLY \| Google timestamp \| No exports | Archive (from Home) | Draft | Not shown | 1 | 0 | Oct 04 2026, 6:03 PM | ARCHIVE: moved |
| Website Lead Intake + Alert | Home | Published | Not shown | 100 | 0 | Oct 03 2026, 6:17 PM | TUNE* |

Verdict rules:
- KEEP: published and enrolled people in the last 30 days.
- TUNE: KEEP and it sends client messages on the lead path (new lead, follow up, booking, no show, reactivation).
- ARCHIVE: draft, unnamed, duplicate, or zero enrollments in 90 days. Move to an "Archive" folder. Do not delete.

## Pass 2: tune only the top 3 TUNE workflows
Order by lead volume: 1) new lead speed to lead, 2) no reply follow up, 3) booked confirmation and meet and greet.
For each, export the message text only (SMS and email bodies) into `content/ghl/workflow-copy/<workflow-name>.md`.
Claude rewrites the copy there and links the new sites. Codex pastes it back in.

## Copy rules (Claude)
- 3rd grade reading level. One idea per sentence. No dashes.
- Facts only from `fourpawsinn/business-facts.md`. Meet and greets: Tuesdays, 9 AM to 7 PM.
- No health, safety, or medical claims.
- Every message has one link and one ask.
- Never add an opt out footer (no "reply STOP", no opt out line) to any message. Alex handles that side. Standing rule from Alex, Oct 7, 2026.

## Site map (Alex, Oct 7, 2026)
Purposes verified by Codex in the cloud browser on October 7 UTC.
Alex decision, Oct 7: keep these URLs as they are. No custom subdomains.

| Site | URL | Use it in |
|---|---|---|
| Booking | https://four-paws-booking.vibepreview.com | New lead first reply and no reply follow up: submit pet details and travel dates for an availability check. This is a request, not a confirmed booking. |
| Private Suite | https://paws-privatesuite.vibepreview.app | Private care inquiry when a dog may need its own space. Ask for dates and assess fit and availability before confirming a suite. |
| Boarding Kit | https://dog-boarding-kit.vibepreview.com | Pre-booking nurture: a boarding checklist and questions to ask before choosing care. It also includes a packing section; it is not a booking confirmation. |
| Training | https://training.fourpawsinn.co | Board and Train interest and relevant post-stay nurture: apply for the 21-day training program and discuss fit. |
| Rewards | https://four-paws-rewards.vibepreview.app | Post-stay referral invitation: clients share a friend offer, referred households submit a request, and referrers earn credit after a qualifying paid stay. |
| Dog Facts | https://pawsome-dog-facts.vibepreview.com | Long nurture and reactivation: a dog-facts article with a sharing button and a call-to-book link. |

### Site availability observed
Training loaded at training.fourpawsinn.co. The book, suite, kit, rewards and facts branded subdomains returned 502 connection-refused pages in this browser. Every listed vibepreview fallback loaded. The latest repo decision to keep the existing URLs is preserved. No form was submitted.

## Pass 2 extraction result
Four editor inspections were needed to produce three message-bearing workflow files. All action panels were cancelled without edits, and the Save workflow button remained disabled on exit. No workflow was saved, published, tested or manually enrolled.

| Priority | Workflow | List total / active | File |
|---|---|---|---|
| New lead | CAPTURE \| Dog Inquiry Intake | 603 / 0 | [3 SMS bodies](../../content/ghl/workflow-copy/capture-dog-inquiry-intake.md) |
| No reply | NURTURE \| Dog Ghost Reactivation | 480 / 177 | [8 SMS bodies](../../content/ghl/workflow-copy/nurture-dog-ghost-reactivation.md) |
| Missing dates fallback | FPI Wix Lead - Missing Dates v2 | 40 / 0 | [3 SMS bodies](../../content/ghl/workflow-copy/fpi-wix-lead-missing-dates-v2.md) |

The requested booked-confirmation/meet-and-greet category could not be supplied from the named candidate: RETENTION \| Booked Client Follow Up (208 total, 26 active) contains only an active-client tag, removal of lead tags, a 60-day wait and a lapsed-client tag. It has no SMS or email bodies. It is KEEP*, not TUNE, following this Pass 2 finding. No separate confirmation or meet-and-greet workflow was identified by name in the inventory. Missing Dates v2 was used as the third message-bearing extraction because its 40 enrollments occurred since its September 21 creation. This is a disclosed substitution, not a claim that it sends booking confirmations.

These three files contain 14 existing SMS bodies and their step labels, with merge tokens preserved. No email actions appeared in those three workflows. Copy is a source snapshot, not approved replacement copy. Existing wording was preserved; no opt out footer was added. The intake first SMS already has a BOOKED reply instruction. Claude should not add any footer when rewriting.

Claude review notes: the ghost private-suite SMS says four summer spots have opened and uses an older suite URL and a second review link. Many later messages have no link. Review dates, names, claims and links against business-facts.md and the copy rules before approval. No live copy change is authorized by this extraction.

## Safety
- Edit workflows as a copy or in draft first. Publish the change only after the copy file is approved in this repo.
- Never trigger a send to a live list (CLAUDE.md rule 4). Test on the "TEST Google Timestamp Validation" contact.


## Billing audit, Oct 10 2026 (Alex + Claude)

Two GoHighLevel subscriptions found, $97 each:
1. KEEP: Amanda's agency account, billed the 28th, holds the live Four Paws Inn sub-account (location X6z5pwEuIxkAbcCUQ0Nv, the one Windsor, the booking sync and Meta tracking use). Card moved to the State Farm Visa on Oct 10.
2. CANCEL: old account under the same login (fourpawsinnpetboarding@gmail.com, top entry on the account chooser), sub-account "BAD four paws inn OLD", location CvxfgsvBAS6H9SDgJhns, empty (no data, generic pipeline). Billed $97 on the 8th to Alex's Amex, statement "HIGHLEVEL AGENCY SUB". Login has no agency view, so billing cannot be cancelled from the UI: GHL support must cancel. Alex to ask GHL support to cancel and refund duplicate months. Verify no HighLevel charge on the Amex on Nov 8.
