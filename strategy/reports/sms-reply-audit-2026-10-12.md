# SMS reply audit: why leads go quiet (Oct 12, 2026)

Asked by Alex, Oct 12: "Look at the leads and their responses. If they don't reply, why? How do we get the highest conversion?"

Source: GHL conversations via Windsor, last 30 days (Sep 12 to Oct 12). 115 new conversations, 91 by SMS.
Limit: Windsor shows only the LAST message of each thread, not the full thread. The findings below are what the last message proves. The full read needs the thread export (step 4).

## What the data shows

| # | Finding | Count | Why it hurts |
|---|---|---|---|
| 1 | The thread ends on our text, no reply | 75 of 91 SMS threads (82%) | Most leads never answer twice |
| 2 | Leads replied, and the GHL thread ends on THEIR message | Cecily Shea (Oct 3, "I wanted to book... Did you get my paperwork?"), Jay (Sep 24, dates plus "Can you let me know your prices?"), Barry Bryant (Sep 22, emergency stay), Ben Gonzalez (Oct 10, "Yes"), Will I Am (Oct 10, "Not sure"), Tati on Instagram (TODAY, asks for the intake form), Sergio Camelo on Instagram (Oct 1) | Buying signals with no answer in GHL. If they were answered from another phone, GHL cannot see it |
| 3 | Auto text tells leads to "call/text us directly at 754-971-0792" | 13 leads, latest Oct 10 | Moves the conversation off the GHL thread. Replies go to another phone, so the reply stop, the alerts and the reporting all go blind. It also gives a stranger two numbers |
| 4 | Meta flow Text 2 ("No rush at all... send them here" plus a msgsndr short link) is the last message | 12 leads, all Oct 11 to 12 | 12 leads did not answer Text 1 within 3 hours, then got a text with a link from an unknown domain. Fixed today: no link (dates-by-text-first.md) |
| 5 | Texts with em dashes and a long, written tone: "Just checking back—what exact drop-off and pickup dates...", "one thing we tell pet parents all the time —" | 6 or more | Reads like a bot. Breaks the no dash rule. Codex finds which workflow sends these and whether any are AI written (rule: no AI writes or sends conversational texts) |

## Why leads do not reply (best call from the data)
1. **Speed and handoff.** The replies that came in were often left on our side, or moved to another phone. A lead who asks a price and hears nothing for hours books somewhere else.
2. **Too many first texts.** Some leads get the "we received your request" text, the CAPTURE text and the Meta text. Three openers in two minutes reads automated.
3. **Asking for work, not giving value.** "Send your dates" and "fill out this form" ask the lead to do work. Text 1 should give one useful thing (their price, based on the size they gave us) and ask one easy question.
4. **Links.** A short link from an unknown domain in an early text lowers replies and trust.

## The fix, in order of dollars
1. **Answer every reply within 15 minutes, 9 AM to 7 PM, from GHL only.** One phone, one thread. This costs nothing to build and is the biggest leak.
2. **Remove "call/text us directly at 754-971-0792" from the auto text.** Replace it with: "Reply here anytime. Amanda answers this number." Codex finds the workflow. (Not a CallRail change.)
3. **One first text per lead.** Meta leads get only Meta Text 1. Website leads get only their own opener. Codex turns off the overlap.
4. **Text 1 gives the price.** The Meta form already tells us size and that pricing is OK. New Text 1 (friendly branch):
   Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. For a pup your size it's {{price}} a day. What's your pup's name?
   Needs Alex's yes before Codex builds it. Size to price: under 50 lbs $60, over 50 lbs $75, puppy or senior $80.
5. **No AI written or em dash texts.** Every automated text comes from the approved copy files only.
6. **Full thread export, then a real reply rate per text.** Codex exports every new lead thread from the last 30 days (name, source, every message with time and direction) into a Google Sheet. Claude grades each one: which text got the reply, how fast we answered, where it died. Then we rewrite the weakest text with numbers, not guesses.

## Score to beat
Reply rate today: about 18% of SMS threads end on the lead (16 of 91). Target: 35% within 30 days. Claude reports it on the Monday scoreboard.
