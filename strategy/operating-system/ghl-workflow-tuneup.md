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

## Site map (fill in once)
| Site | URL | Use it in |
|---|---|---|
| AI Studio site 1 | TBD | |
| AI Studio site 2 | TBD | |
| GHL funnel | TBD | |

## Safety
- Edit workflows as a copy or in draft first. Publish the change only after the copy file is approved in this repo.
- Never trigger a send to a live list (CLAUDE.md rule 4). Test on the "TEST Google Timestamp Validation" contact.
