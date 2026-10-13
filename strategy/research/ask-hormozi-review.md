# Ask Hormozi transcript library: review and first test (Oct 13, 2026)

Repo: https://github.com/poseljacob/ask-hormozi (last update Jul 28, 2026, version 0.2.2, by Jacob Posel, not affiliated with Hormozi).
Test method: read only copy in a side folder outside this repo. Nothing installed, no setup script run, no system changed.

## Quality check
| Item | Finding |
|---|---|
| Size | 2,039 videos, 9,330 searchable 90 second chunks, each with a YouTube link at the right second. 101 MB |
| Source | MoreMozi only (Hormozi's clips and Q&A channel). Videos from Sep 2025 to Jul 2026. Not the books, not the main channel, no updates since July |
| Accuracy | 100% YouTube auto captions. Readable, but with mistakes ("fob question") and speakers are not labeled. Always check the video before quoting |
| Fit | Heavy on sales teams, agencies, coaching and B2B. A few local service cases (dentists, home services, restoration). Good on principles, thin on pet or hospitality |
| Repetition | The same ideas repeat across many clips. Good for confidence, not for new ideas |

## Setup and risks
1. **The setup script downloads and runs a third party installer** (`curl https://sh.qntx.fun/qmd | sh`) for its search engine. That is the main risk: code from an outside site runs on your Mac with your permissions.
2. It copies a skill into your global Claude and Codex skill folders, so it shows up in every project, not just this one.
3. Copyright: the transcripts are shared "with permission" and are NOT open licensed. Do not commit them into this repo or paste them into anything we sell or license (operating manual, playbook).
4. Low prompt risk: transcripts are plain text, treated as data.
5. **The search engine is not needed.** The test below used plain text search on the files and found the right clips in seconds.

## Verdict
Worth using. Not worth installing as built.
Recommended setup: Claude (or Codex) pulls a read only copy into a side folder when a decision needs it, searches with plain tools, and cites links and timestamps. No installer, no global skill, nothing in this repo. If we use it weekly, Claude writes a small local skill for this repo that does exactly that.

## First test: the problem we are working on right now
Problem: Meta leads go quiet. 82% of new lead text threads in the last 30 days end on our message with no reply (`strategy/reports/sms-reply-audit-2026-10-12.md`). Our first touch is an automated text after 90 seconds.

### What Hormozi actually says (paraphrased from the captions, check the links)
1. Call leads within 60 seconds of the opt in. He says research shows this can raise lead conversion 4 to 5 times, and that nothing else in most companies has that return for that little cost.
   [You Need to Call Your Leads Faster, 00:00](https://www.youtube.com/watch?v=R1G1ntNY32Y&t=0s)
2. Example he gives: a water damage restoration company with 2 to 3 leads a day converts 55% of leads. One person, his aunt, has one job only: the moment a lead comes in, she drops everything and calls. He says pay for that person from the revenue it creates, not the revenue you have now.
   [You Need to Call Your Leads Faster, 00:00 to 01:30](https://www.youtube.com/watch?v=R1G1ntNY32Y&t=0s)
3. Slow follow up lets the lead "date around" and compare competitors, which pushes you into a price war. You pay more per customer, close fewer, and keep less margin. He calls lead response time the number under LTV to CAC (lifetime value of a customer divided by the cost to get one).
   [How to 4X Your Sales Without Spending More on Leads, 00:00](https://www.youtube.com/watch?v=iT4lqNIckcE&t=0s) and [01:30](https://www.youtube.com/watch?v=iT4lqNIckcE&t=90s)
4. For local service businesses, the best performers call leads within 5 minutes with a script. He says most business owners are bad at working their own leads.
   [Helping a Home Services Business Get More Leads, 01:30](https://www.youtube.com/watch?v=omxB6GesatE&t=90s)

### Claude's read (my opinion, not his)
1. The 4 to 5 times number is his claim from general research and mostly sales team businesses. For dog boarding I expect a smaller lift. Still the cheapest test we have.
2. His restoration example matches us almost exactly: 2 to 3 leads a day (we get about 25 Meta leads a week, about 3 to 4 a day) and one person whose only job is speed.
3. Our current first touch is a text, and the audit says most texts get no reply. A call reaches the lead while they are still on Facebook thinking about it.
4. It does not replace the texts. Text 1 still goes out at 90 seconds. If the call is answered, the reply stop takes them out of the automation.

## The one test
**Action:** for 14 days (Oct 14 to Oct 27), every new Meta lead gets a phone call within 5 minutes, 9 AM to 7 PM. Two tries (call, then call again 1 minute later). No answer: the automated text continues as now. After 7 PM: call at 9 AM next day.
**Who:** Alex (decided Oct 13: "I will hold it"). He gets the GHL new lead alert and makes the calls from the GHL number (GHL app dialer) so the call stays in the thread. Deep work block (9:00 to 10:30 AM, Mon, Tue, Thu, Fri): Amanda calls leads that come in during the block, so the block stays protected. After the block, Alex checks for any lead she missed.
**Call script (30 seconds):** "Hi [name], it's [Alex or Amanda] from Four Paws Inn. You just filled out our form. I've got a minute, can I ask a couple quick questions about your pup?" Then: pup's name, dates, size. Dates known: check room, quote, send deposit link. New dog: first overnight rule.
**Log:** one GHL tag per lead: `called-under-5`, `called-late`, or `not-called`.
**Measure:** lead to deposit rate (deposit paid within 14 days of the form) for called under 5 minutes vs not called, plus the same rate for the 14 days before (Sep 30 to Oct 13). Claude reports it on the Monday scoreboard Oct 20 and Oct 27.
**Win line:** called leads book at 1.5 times the old rate or better. Then Hormozi's "one person, one job" applies: price a part time lead caller (about 15 hours a week) against the extra bookings, at $237 per booking.
**Why this one:** it hits the constraint (demand to booking), costs $0 to start, needs no build, and we can read the result in 2 weeks at our lead volume.
