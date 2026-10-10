# Meta lead first text, personalized (v2, Oct 10 2026)

Status: DRAFT, waiting on Alex's final yes, then Codex builds it.

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
