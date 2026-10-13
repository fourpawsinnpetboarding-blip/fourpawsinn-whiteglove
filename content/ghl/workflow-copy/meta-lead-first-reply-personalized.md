# Meta lead first text, personalized (v2, Oct 10 2026)

Status: APPROVED by Alex, Oct 10 2026. Codex builds it.

Problem (Alex, Oct 10, Giselle Castro lead): the first text reads automated. It ignores what the lead told us, and it is long.

Rules from Alex (Oct 10):
1. Short. Long texts feel automated.
2. Ask for the pup's name. It is the most human question we can ask.
3. Do not change the Meta intake form.
4. Send after a delay, about 1 to 2 minutes, never instantly.

Why a question and no link in text 1: a question gets a reply. A real reply moves the lead to Qualified, which sends the QualifiedLead signal to Meta. A link makes the text look like a bot.

No dashes, no emojis, no opt out line. Prewritten only, no AI writes or sends (business-facts rule).

## Text 1 (wait 90 seconds after the form, then send)

Pick by "How does your dog do around other dogs?":

| Answer | Text |
|---|---|
| Friendly / loves dogs | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. What's your pup's name? |
| Selective / depends | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. What's your pup's name, and who do they usually get along with? |
| Not good with other dogs (or anything else) | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. What's your pup's name? Tell me a little about them. |

## Text 2 (only if no reply after 3 hours, sent between 9 AM and 7 PM)

No rush at all. Whenever you have dates in mind, you can send them here and I'll check our openings: {{booking link}}

## Build steps (GHL, Meta Lead Timeline Router or the workflow that sends the first Meta text)

1. Remove the current first text.
2. Add Wait: 90 seconds.
3. Add If/Else on the "How does your dog do around other dogs?" answer, three branches, each sending its Text 1.
4. After each branch: Wait for reply, up to 3 hours. If replied, stop (Alex or Amanda takes over). If not, send Text 2 inside 9 AM to 7 PM.
5. Keep the Reply Kill Switch filter (a message containing "I filled out your form" is not a reply).
6. Test on the TEST contact only. Never text a real lead as a test.

## Example (Giselle Castro, selective, Oct 10)

Hi Giselle, it's Amanda from Four Paws Inn! Got your form. What's your pup's name, and who do they usually get along with?

## Build status (Oct 10 2026)

Built by Codex in workflow "FPI Future Travel Conversion": DATES MISSING branch runs "Personalize Meta first text by dog sociability" into Friendly, Selective and Anything else approved openers, then a 3 hour reply wait and an approved no reply follow up. The 90 second wait lives in "Meta Lead Timeline Router".
DATES KNOWN branch keeps its own opener, unchanged by Alex's choice (Oct 10): "Hi {first name}, it's Amanda from Four Paws Inn. I saw you're planning to be away from {arrival} to {departure}. Is this your dog's first time boarding? You can also send your dates here {link}". Alex: "it shows we read it."

## v3: Text 1 gives the price (APPROVED by Alex, Oct 12, 2026: "yes")

Why: the Meta form already tells us the size and that pricing is OK. Giving the price first gives value before we ask for anything. Source: `strategy/reports/sms-reply-audit-2026-10-12.md`.

Price comes from the size answer on the Meta form: Under 50 lbs = $60, Over 50 lbs = $75, Puppy or senior = $80. If the size is blank or unclear, send the v2 text without the price line.

| Sociability answer | Text 1 |
|---|---|
| Friendly / loves dogs | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. For a pup your size it's {{price}} a day. What's your pup's name? |
| Selective / depends | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. For a pup your size it's {{price}} a day. What's your pup's name, and who do they usually get along with? |
| Not good with other dogs (or anything else) | Hi {{contact.first_name}}, it's Amanda from Four Paws Inn! Got your form. For a pup your size it's {{price}} a day. What's your pup's name? Tell me a little about them. |

Build: in "FPI Future Travel Conversion", DATES MISSING branch, add an If/Else on the size answer inside each sociability branch (or a custom value set from size) so {{price}} fills in. Text 2 is the no link version in `dates-by-text-first.md`. Test on Test Order only.

## v3 RETIRED (Alex, Oct 12, 9:09 PM, after Tania Reyes got it)
Why it failed (Claude's error):
1. The price repeats what the form already showed. She already said yes to it. It reads like a bot reading her form back.
2. "Who do they usually get along with?" is a clumsy question for a selective dog. It gives nothing and makes her work.
3. "Got your form" sounds automated.
Lesson: text 1 gives one real reason to pick us, matched to her answer, then asks one easy question. Never repeat form answers back.

## v4: Text 1 (replaces v3, Oct 12, 2026)
Facts used: daily photo and video updates, outside to play every hour, private suite (business-facts.md). One question: the pup's name.

| Sociability answer | Text 1 |
|---|---|
| Friendly / loves dogs | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for reaching out. Our pups play outside every hour, and you get photos and videos every day. What's your pup's name? |
| Selective / depends | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for reaching out. Lots of pups are picky about friends, and that's ok. We go at their pace, and you get photos and videos every day. What's your pup's name? |
| Not good with other dogs (or anything else) | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for reaching out. We have a private suite for pups who do best on their own, and you get photos and videos every day. What's your pup's name? |

No price. No link. No dashes. Same 90 second wait and same 3 hour no reply follow up (no link version).

## v5: Selective and Not good with dogs (Alex, Oct 12, 2026, replaces v4 for these 2 branches)
Alex: talk like a dog trainer to a pet parent who is not one. Authority, but plain words. No price. Say we introduce dogs slowly. Ask a dog specific question that is easy to answer.
Why a numbered list: a pet parent can answer with one tap ("2"), and the answer tells Amanda how to place the dog. Save the answer to the contact field "Dog Social Type".

| Branch | Text 1 |
|---|---|
| Friendly / loves dogs (v4, unchanged) | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for reaching out. Our pups play outside every hour, and you get photos and videos every day. What's your pup's name? |
| Selective / depends | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Lots of pups are picky about friends, and that's ok. We introduce every new dog slowly, one step at a time, and we've watched shy pups really open up here. Which sounds most like yours?<br>1. Nervous if a dog comes on too fast<br>2. Likes to be the boss<br>3. Fine with some dogs, not others<br>4. Happiest with their own space<br>Just reply with a number. |
| Not good with other dogs (or anything else) | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for telling us. We introduce every new dog slowly, and we have a private suite for pups who do best on their own. Which sounds most like yours?<br>1. Nervous if a dog comes on too fast<br>2. Likes to be the boss<br>3. Fine with some dogs, not others<br>4. Happiest with their own space<br>Just reply with a number. |

Rules: no price, no link, no dashes. Never promise a result ("will get along", "safe"). Amanda decides placement after the first overnight.

## v6: Selective and Not good with dogs (Alex, Oct 12, 2026, replaces v5)
Alex: no numbered list, keep it casual. One sentence on our intro process ("tried and tested", slow). Then one casual question: is the dog more shy or more the one who comes on strong.
Claude edits: dropped "safe" (Gate 5, no safety claims). Used "comes on strong" instead of "aggressive" so the owner does not feel judged and answers honestly.

| Branch | Text 1 |
|---|---|
| Friendly / loves dogs (v4, unchanged) | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 Thank you for reaching out. Our pups play outside every hour, and you get photos and videos every day. What's your pup's name? |
| Selective / depends | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 We have a careful intro process for new dogs, and we always take it slow. Is your pup more on the shy side, or more the one who comes on strong with other dogs? |
| Not good with other dogs (or anything else) | Hi {{contact.first_name}}! It's Amanda from Four Paws Inn 🐾 We have a careful intro process for new dogs, we always take it slow, and we have a private suite for pups who do best on their own. Is your pup more on the shy side, or more the one who comes on strong with other dogs? |

Amanda reads the answer and notes it in "Dog Social Type" (Shy or Comes on strong). No price, no link, no dashes, no promises.

v6 wording update (Alex, Oct 12): "tried and tested" replaced with "a careful intro process for new dogs, and we always take it slow".

APPROVED by Alex, Oct 12, 2026: "Yes, these are perfect." v4 Friendly + v6 Selective + v6 Not good are the live copy.
