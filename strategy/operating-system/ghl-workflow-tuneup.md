# GHL workflow tune-up (low data method)

Owner: Codex does the GHL clicks (cloud browser). Claude writes the copy in this repo. One agent in GHL at a time.
Started: Oct 7, 2026.

## Why not audit every workflow
Reading every workflow and every message burns data and time, and most workflows have no one enrolled. Only workflows with live enrollments touch revenue. Tune those, archive the rest.

## Pass 1: inventory (one screen per folder, no opening workflows)
From Automation > Workflows, record one row per workflow. Do not open message steps.

| Workflow | Folder | Status (Published/Draft) | Trigger | Active enrollments | Last edited | Verdict |
|---|---|---|---|---|---|---|

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
Purpose is inferred from the name. Codex confirms each on first visit.
Branded subdomains are being connected (Alex, Oct 7). Use the fourpawsinn.co address in all copy. Use the old vibepreview address only if the new one does not load yet.

| Site | URL | Use it in |
|---|---|---|
| Booking | https://book.fourpawsinn.co (was four-paws-booking.vibepreview.com) | New lead first reply, no reply follow up. The main ask. |
| Private Suite | https://suite.fourpawsinn.co (was paws-privatesuite.vibepreview.app) | Premium upsell after a quote or first stay. |
| Boarding Kit | https://kit.fourpawsinn.co (was dog-boarding-kit.vibepreview.com) | Booked confirmation: what to pack and bring. |
| Training | https://training.fourpawsinn.co | Board and Train interest, post stay nurture. |
| Rewards | https://rewards.fourpawsinn.co (was four-paws-rewards.vibepreview.app) | After checkout: rebook and referral. |
| Dog Facts | https://facts.fourpawsinn.co (was pawsome-dog-facts.vibepreview.com) | Long nurture and reactivation. Soft value, no hard ask. |

## Safety
- Edit workflows as a copy or in draft first. Publish the change only after the copy file is approved in this repo.
- Never trigger a send to a live list (CLAUDE.md rule 4). Test on the "TEST Google Timestamp Validation" contact.
