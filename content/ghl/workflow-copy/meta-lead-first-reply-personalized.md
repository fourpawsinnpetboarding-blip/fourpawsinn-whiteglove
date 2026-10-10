# Meta lead first text, personalized (DRAFT, needs Alex approval before it goes live)

Problem (Alex, Oct 10 2026, Giselle Castro lead): the first text reads automated. It ignores what the lead just told us: dog size, how the dog does with other dogs, and timeline.

Fix: one prewritten text built from approved lines. GHL picks the right line from the form answers. No AI writes or sends anything (business-facts rule). No dashes, no emojis, no opt out line.

## How to build it in GHL (one time, about 20 minutes, Codex or Alex)

In the workflow that sends the first Meta lead text (Meta Lead Timeline Router):
1. Create 3 contact custom fields (single line text): `reply_dog_line`, `reply_price_line`, `reply_timeline_line`.
2. Add 3 small If/Else blocks before the text. Each one sets one field with **Update Contact Field**, using the lines below.
3. Replace the current first text with the template below.
4. Test on the TEST contact only.

## The template

```
Hi {{contact.first_name}}, it's Amanda from Four Paws Inn. Thanks for filling out our form!

{{contact.reply_dog_line}}

{{contact.reply_price_line}}

{{contact.reply_timeline_line}} {{booking link}}
```

## Lines (pick by form answer)

**How does your dog do around other dogs?**
| Answer | reply_dog_line |
|---|---|
| Friendly / loves dogs | Sounds like your pup is a social one. They will have friends to play with here and a big backyard to run in. |
| Selective / depends | You said your pup can be picky with other dogs. That really helps us. Tell me a little about who they get along with, so we can plan their stay. |
| Not good with other dogs | Thank you for being honest that your pup does not love other dogs. Tell me a little more about them, and I will let you know the best option for their stay. |

**What size is your dog?**
| Answer | reply_price_line |
|---|---|
| Under 50 lbs | Dogs under 50 lb are $60 a day. |
| Over 50 lbs | Dogs over 50 lb are $75 a day. |

**How soon do you need boarding?**
| Answer | reply_timeline_line |
|---|---|
| Soon / within 2 weeks | When is your trip? Send me your dates and I will check our openings today: |
| Future trip / not sure yet | No rush. When you have a trip in mind, send me your dates here: |

## Example (Giselle Castro, Oct 10)

Hi Giselle, it's Amanda from Four Paws Inn. Thanks for filling out our form!

You said your pup can be picky with other dogs. That really helps us. Tell me a little about who they get along with, so we can plan their stay.

Dogs under 50 lb are $60 a day.

No rush. When you have a trip in mind, send me your dates here: [link]

## Next upgrade

Add one question to the Meta instant form: "What's your dog's name?" Then line 1 becomes "Thanks for telling us about {{contact.dog_name}}!" The name is the strongest signal that a person read the form.
