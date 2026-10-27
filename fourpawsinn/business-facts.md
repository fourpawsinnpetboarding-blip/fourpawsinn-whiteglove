# Four Paws Inn business facts

This is the single source of truth for Four Paws Inn facts used by the reusable skills in `core/skills/`. Read this file before producing Four Paws Inn work. Do not copy these facts into a core skill.

## Truth rule

- Never invent a business fact, identifier, price, policy, availability detail, client detail, claim, or result.
- If a needed fact is absent, unclear, or marked unverified, say you will check and require confirmation before using it externally.
- Prefer this file over examples, old drafts, strategy documents, or remembered values elsewhere in the repository.
- Do not silently resolve conflicts between old material and this file.

## Business identity

| Field | Current fact |
| --- | --- |
| Business name | Four Paws Inn |
| Legal entity | Four Paws Inn LLC |
| Owners | Alexander Chiong and Amanda Chiong, 50/50 |
| Model | Premium, cage-free, home-based pet boarding |
| City | Miramar, Florida |
| Service area | Miramar, Pembroke Pines, and Broward County, South Florida |
| Timezone | America/New_York |
| Website | https://fourpawsinn.co |
| Street address | 1700 SW 137th Way, Miramar, FL 33027 |

## Current operating hours

- Drop-off and pick-up windows, seven days a week: 9:00 AM to 12:00 PM, and 4:00 PM to 6:30 PM (Alex, Oct 9, 2026). The old 9:00 AM to 8:00 PM window is retired: never use it in copy, captions, or video text.
- No exceptions to the windows, ever (Alex, Oct 21, 2026). No late night pick ups or drop offs (Rachel Nunez asked for 11 PM; the answer is never). Don't offer, hint at or ask Alex about an exception. Give the client the nearest window, plus the option of someone they trust picking up inside a window.
- Christmas Eve (Dec 24): drop off only from 9:00 AM to 12:00 PM. The latest drop off that day is 12:00 PM, with no afternoon window (Alex, Oct 18, 2026).
- Meet and greets: Tuesdays only, 9:00 AM to 7:00 PM (Alex, Oct 6, 2026). Never on weekends: they are the busiest days and new visitors unsettle dogs who just checked in. Old Monday and Wednesday times are retired.
- Meet and greets are optional, never required (Alex, Oct 9, 2026). At a meet and greet, the owner sees the home and asks questions. Bringing the dog is optional. Dogs are never introduced to the group during a meet and greet; that happens at check in, after the team bonds with the dog (Alex, Oct 13, 2026). Never push one. Rule (Alex, Oct 23, replaces the Oct 22 exception): in the same message where we first offer the booking steps or the price, mention the optional Tuesday meet and greet, so the lead knows nothing is rushed: "If you'd like to come see the home first, we do meet and greets on Tuesdays, totally optional. If not, here's how booking works." Say it once per lead. Lead replies follow the pacing in content/sales/lead-log.md (Alex, Oct 22: we were rushing): the dog first, then their worry, price when they ask or engage, deposit only after they say yes. Match the lead's speed, never get ahead of it.

## Current pricing

| Service | Price |
| --- | --- |
| Dog under 50 lb | $60 per day |
| Dog over 50 lb | $75 per day |
| Puppy or senior dog | $80 per day (Alex, Oct 11, 2026). A dog about 9 months or older is NOT priced as a puppy; use the normal rate (Alex, Oct 21: Leah, 9 months, $60) |
| Second dog | $5 per day off |
| Third dog and more | $5 per day off each additional dog (Alex, Oct 12, 2026) |
| Last day | Free if picked up before 10:00 AM |
| Cats | $35 per day when quoting (Alex, Oct 27, 2026: we move between $35 and $40; quote $35). The live cat page showed $40 (Oct 11). Sibling rate applies: $5 a day off each additional pet, dogs and cats together (Alex, Oct 27: "we absolutely charge the five dollar day discount for siblings, we always do"). Example: Shih Tzu plus cat = $55 + $35 = $90 a day. For multiple cats or long stays, the team confirms the total. |
| Cat page | https://optin.fourpawsinn.co/cats (Alex, Oct 15, 2026). Cats get a private room with a yard window and a bird feeder outside; we provide litter box, toys, cat posts and beds; owners bring food (no per meal bags needed) and their preferred litter. |
| Private suite | Per dog, per day: $80 for dogs 50 lb and under, $100 for dogs over 50 lb. The second dog gets the usual $5 a day off (Alex, Oct 20, 2026). Siblings share one suite. Example: Dionne, a 50 lb and an 89 lb dog = $80 + $95 = $175 a day. |

Four Paws Inn charges by day, never by night.

## Booking and care policies

- A 25% deposit reserves the dates.
- Payment methods (Alex, Oct 20, 2026): Zelle to 754-971-0792, Apple Pay to 754-971-0792, or credit card (Alex sends a card payment link on request). Deposit is 25% of the full stay with the last day included; if they pick up before 10 AM, the last day comes off the remaining balance.
- Full payment is due before drop-off (Alex, Oct 15, 2026). The deposit reserves the stay; the rest is paid before the dog arrives.
- Vaccines must be current.
- Dogs go outside to play every hour (Alex, Oct 11, 2026).
- Booking steps for a new client: guest intake form, then the boarding agreement sent by email to sign, then the 25% deposit link, then full payment before drop-off (Alex, Oct 11 and Oct 15, 2026).
- Guest intake form link (Alex, Oct 25, 2026): https://docs.google.com/forms/d/e/1FAIpQLSc9dSjiuTApOnD2FeRE7CxvXpaCnD7_8Z_neMMaPZ6K3pi_iw/viewform?usp=header . Tell the client: once the form is done they get an email right away to sign the agreement; the space is officially confirmed only after we collect the deposit, and we text them to confirm.
- Welcome and arrival guide (Alex, Oct 19, 2026): https://four-paws-inn-welcome.rare-maple-2479.chatgpt.site/#arrival . It replaces the old drop off text. It is emailed automatically when the team ticks the checkbox on the booking sheet after the deposit is paid. In lead or client replies about drop off, what to bring or arrival, send this link instead of typing the details. GHL custom value: {{custom_values.welcome_guide}} (once Codex adds it). Process (Alex, Oct 19): deposit paid, tick the booking sheet checkbox, the guide emails out; the day before drop off or pick up, also text the link (it shows as a photo card on iPhone). The guide is hosted on chatgpt.site for now; move it to welcome.fourpawsinn.co later (low priority).
- Phone number for clients who come in by email: (754) 971-0792, the direct client line (Alex, Oct 15, 2026).
- Owners bring food pre-portioned in Ziploc bags.
- Daycare (Alex, Oct 15, 2026): no public daycare package. Overnight boarding is the main offer, but for parents who ask (socializing a dog while they work), offer a custom plan. Price is the same as a boarding day: $60 under 50 lb, $75 over 50 lb. Steer them to overnights: pick up before 10 AM and that day is free, so an overnight costs the same as one day of daycare. Common pattern: drop off Thursday, pick up Saturday before 10 AM, charged 2 days. Some do 1 or 2 days a week. Drop off and pick up use the normal windows. Never call it a daycare package or post it publicly; offer it one to one when asked. Why we prefer overnights (say it this way): a few hours is not enough time to bond and to slowly meet the regulars; an overnight lets the dog settle in, sleep here and join the pack, and it soon becomes their second home.
- Four Paws Inn provides beds and supplies.
- One daily video update is included with every stay (Alex, Oct 20, 2026: ONE video a day. Never say photos, never say videos plural).
- New dogs are introduced to the group slowly, with a careful intro process (Alex, Oct 12, 2026). Never call it "safe" and never promise how a dog will do with other dogs.
- Supervised pool time is offered (Alex, Oct 11, 2026).
- Exotic pets are boarded: reptiles, birds, rabbits, small mammals (Alex, Oct 11, 2026). Never quote an exotic price; the team confirms.
- Phone numbers on the website rotate through CallRail for call tracking. Set up as CallRail advised; do not change website phone numbers (Alex, Oct 11, 2026).

## Brand and copy rules

- Never mention how many dogs we care for at once, in any client facing copy, ever (Alex, Oct 14, 2026).
- Training authority (Alex, Oct 14, 2026): Alex is the trainer and the face of training content. Approved wording: thousands of hours with many breeds and personalities, introducing all kinds of breeds together, managing packs of dogs for years; Alex has years of hands on training experience, especially with German Shepherds and Rottweilers. Never say "certified". A hired trainer is never named or featured in content. Board and Train is sold as training with "a pro trainer" (unnamed), never as Alex training the dogs (Alex, Oct 14, 2026: "Let's go pro trainer not me").

- Client-facing writing is warm, short, direct, and clear enough for a third-grade reader.
- Give the care benefit and the reason for a boundary. Do not use warmth to weaken a policy.
- Do not use em dashes or stray hyphens in copy the customer will receive.
- Do not invent pet names, client details, availability, testimonials, performance numbers, or care claims.
- Google Business Profile hours stay 9 AM to 8 PM daily: those are call hours so people know they can call (Alex, Oct 11, 2026). Never change them to the drop off windows. In copy, still use the drop off windows for check in and check out.
- Google reviews: 231 as of Oct 11, 2026, almost all five stars. Live count: Windsor google_my_business, review_total_count. Use "230+ Google reviews" in copy so it does not go stale.
- Review requests (Alex, Oct 11, 2026): Claude and Codex never build, turn on or send automated review requests (no GHL workflow, no SMS, no email asking for a Google review). Alex and Amanda handle review asks themselves. Alex disabled the workflow Codex built.
- Google and other reviews: Claude and Codex never reply to reviews. Alex owns review replies (Alex, Oct 11, 2026).
- Default CTA: "If you're near Miramar or Pembroke Pines and need boarding, send us your dates and tell us about your dog."
- Nothing publishes without Alex's approval. Draft and queue only. Exception: Alex's 2026-10-04 instruction authorizes Lex/Codex's own organic video work under the staged rollout, ownership and quality rules in `scripts/video-engine/README.md` without waiting for his approval. This does not expand Claude's authority or apply to unrelated publishing, ads, budgets, workflows or credentials.
- Never write opt out lines in any message (no "reply STOP", no "reply X to stop", no unsubscribe footer). Alex handles that side (Alex, Oct 7, 2026).
- Never send an email or SMS to a live GoHighLevel contact or list without explicit approval for that exact send.
- No AI-generated customer-facing SMS may be sent automatically. A human writes or approves the final message.

## Visual identity

- **Official logo (Alex, Oct 19, 2026):** pink roof house with a white paw inside a charcoal house, "Four Paws Inn" wordmark. Files: `content/brand/logo-official.png` (full logo), `content/brand/logo-icon-square-1080.png` (icon only, for Instagram, Facebook, Google and Apple profile pictures). The old AI resort logo (golden retriever at a mansion pool) is retired: never use it.

Approved by Alex on 2026-09-28. This is the default for every Four Paws Inn graphic, carousel, static post, thumbnail, and slide, no matter who or what makes it (Claude, Codex, Canva, Higgsfield, a designer).

| Role | Color | Hex |
| --- | --- | --- |
| Base background | Cream | `#FAF7F3` |
| Accent (shapes, highlights, stars, buttons on dark) | Pink | `#E6A0A3` |
| Text and dark backgrounds | Charcoal | `#353532` |

- Headings: bold serif (Source Serif 4, weight 700 to 800). Emphasis words in bold serif italic.
- Body text: clean sans serif (DM Sans, weight 400 to 500), large enough to read on a phone.
- Text is always charcoal on cream or pink, or cream on charcoal. Never put pink text on cream: it is too light to read.
- Every graphic carries the Four Paws Inn wordmark with the paw mark and the @fourpawsinnpetboarding handle.
- Keep the identity fixed. Vary the layouts, hooks, formats, and which of the three backgrounds leads, so the feed does not look like one repeated template.
- The reference implementation is `scripts/morning-posts/render.js`.

## Eden routing

| Field | ID |
| --- | --- |
| Four Paws Inn workspace | `1c2438f9-e773-4786-a8cb-121504399872` |
| Main schedule | `6a07d7c7-8da0-4018-9b7f-6db1e423f3cd` |
| Short-form schedule | `d6007514-1da6-4505-8ec8-f248aa030bc8` |
| Instagram account | `304fc6aa-5fb4-4212-baa2-e8e467931b1d` |
| Facebook account | `0c524455-50a0-465d-86a8-38e22c536914` |
| LinkedIn account | `0f03eb5a-ab92-4f32-9a19-aa49a4612b3e` |

Business content goes to the Four Paws Inn workspace. Personal-brand content goes to the personal workspace. The personal workspace ID is not recorded here; resolve it live and never guess.

## GoHighLevel automation facts

- Conversation AI agent: `Four Paws Inn Booking Assistant`.
- The agent must remain off unless Alex explicitly approves a change.
- `FPI 30-Day Lead Conversion`: `5a79c778-715c-439b-8453-5983e7b9105b`
- `FPI 7-Day Lead Conversion`: `557eb140-f183-4a13-9ad6-98bff8db626f`
- `FPI Future Travel - ChatGPT Reply Drafts`: `231374de-11c4-473e-9ba1-41abb48c38b7`
- Meta instant forms: `Fall and Holiday Boarding 2026` (live on ads from Sep 30, 2026). Previous main form: `FB_Leads_May2026-copy-copy` (186 leads). Any workflow trigger filtered by form must include the live form.
- No other workflow ID is known. Resolve any other ID from GoHighLevel before an operation and never guess.
- The conversion workflows may send prewritten, approved follow-up messages. They must not contain an AI action that generates or sends customer-facing copy without human approval.

## Creative-generation guardrails

- Four Paws Inn dogs, animals, clients, staff, the home, facility, and yards must come from real supplied footage or photos, not generation.
- Supporting generated material may be abstract, graphic, typographic, or motion-based.
- Append this clause to every Four Paws Inn Higgsfield generation prompt: `no dogs, no animals, no people, no pet facility or yard imagery`.

## No discounts, ever (Alex, Oct 17, 2026)
- "We are a premium luxury brand. Never ever a free night, a discount or any discount related offer." No free nights, no free days, no percent off, no dollar off, no trial deals in any ad, post, page, email, SMS or script.
- Last day policy STAYS (Alex, Oct 17): "Pick up before 10 AM and your last day is free." Say it plainly as how our billing works, in quotes and pricing explanations. Never frame it as a deal, promo or limited offer.
- No hidden fees (Alex, Oct 17): the price we quote is the price they pay. No add ons for extra play time, toys, or mandatory baths. Other boarding places quote $45 to $55 a night, then add fees for extra play, toys and required baths. Use "no hidden fees" and "the price you see is the price you pay" freely. Never name a competitor.
- Small groups and slow intros (Alex, Oct 17): we keep groups small on purpose, for shy and selective dogs and so the team builds a one on one bond with every dog. New dogs never go straight into the pack: one on one time with the team first, quiet time to explore, then the group slowly when ready. Say "slow" and "careful", never "safe". Never give a number.
- Alex's son (young man in the black shirt in our footage, e.g. LIB-0003, LIB-0027 to LIB-0030) is approved for videos and ads (Alex, Oct 17).
- Meet and greets are optional, never required. Always say so when offering one.
- Curbside hand off (Alex, Oct 17): clients pull up and text us. We bring everything to the car, usually in about 20 seconds. Most clients never get out of the car at drop off or pick up.
- Creator codes stay (Alex, Oct 17): partner followers get $25 off or more on a first stay, only through a creator's own code. Never advertise it in Four Paws Inn's own ads or posts.
- Second dog $5 a day off stays (Alex, Oct 17). It is the multi dog rate, not a promotion: state it as a price, never as a deal.
- Replacement line when a closer is needed: "Want to see the home first? Meet and greets are on Tuesdays, 9 AM to 7 PM."

## First overnight stay: NOT required (Alex, Oct 17, 2026, replaces Oct 12)
Alex: "I do NOT want a mandatory paid overnight for new dogs." Never say a new dog must do an overnight first. The section below is retired history.

**Suggesting a short overnight (Alex, Oct 18, 2026):** for leads with no trip yet, especially shy or anxious dogs, we may recommend one short overnight stay before a longer trip. Say why: an overnight lets us build a bond with the pup, so future longer stays feel familiar. Recommend it, never require it. Normal price, never a discount or a free night. Recommend an overnight, not daycare, unless the dog is reactive.
**Tour arrival (Alex, Oct 19):** when confirming a tour, ask the visitor to text us when they're on the way, with their ETA, so the team can get the pups settled before they arrive. Never say "text us when you pull up."

**Meet and greets are only a tour (Alex, Oct 18):** the owner sees the home and asks questions. No dog introductions, no trial, no play time. Never call it a relaxed visit or anything that sounds like a trial run.

## RETIRED Oct 17: First overnight stay (was REQUIRED, Alex, Oct 12, 2026)
- Every new dog does one paid overnight stay with us first. Required, not optional.
- Main target: leads without travel dates. The overnight is how we close them now, recover the ad cost, and make them a 2 time client.
- Also required before a first holiday stay (Thanksgiving, Christmas, New Year) or a first long stay, even when they already have dates.
- Why (say it this way): the dog learns the house, the pack and our team before a big stay, so the real stay feels familiar. Never call it a safety or health check.
- Price: normal daily rate, paid in full. Never free, never credited toward a later stay.
- Returning clients are exempt.
- NOT for leads who already have trip dates in the next 2 weeks (Alex, Oct 13, 2026): quote the trip and take the deposit. The overnight is for leads with no dates or dates far out, to book them sooner and earn from the ad click.
- Scripts: `content/sales/boarding-ready-scripts.md`.


## Siblings, private suites and intros (Alex, Oct 19, 2026)

- **Siblings always stay together**, no matter what. If one needs a private suite and the other is social, the social one can go out and play with the pack, then comes back inside to its sibling whenever it is done playing. The shy one can go outside with its sibling.
- **Always ask why** a parent wants private care before offering a suite. Many parents say "my dog doesn't like other dogs" and the dog integrates after a few hours or a few days.
- **How we introduce dogs:** we go slow, one step at a time, and read each dog's energy and body language. Some join the pack in a couple of hours, some take a couple of days. We decide day by day.
- **A common plan:** both siblings start in a private suite for a day or two, then we loosen one or both into the pack if they're ready.
- **Hard line:** a larger dog that shows signs it could react aggressively is never introduced to the group. We won't put another family's pet at risk. A shy dog that might snap only if it feels cornered is a different case, and we work with it.
- In copy, describe the process. Never use "safe" and never promise an outcome.
- Private suite leads (Alex, Oct 23, 2026): send the link optin.fourpawsinn.co/private-suite instead of typing the price, at standard suite prices. For a dog that is aggressive with other dogs, ask about people first (new people, any bite or snap, handling leash and food) before booking; dogs roam free and Amanda is often alone with them. Bite history with people or guarding = we pass, kindly.

## Why we cost more: the premium explanation (Alex, Oct 20, 2026)

Use this when a lead asks about price, compares us to cheaper places, or asks what's included. Explain the value. Never apologize for the price.

- **No hidden fees.** The price we quote is the price you pay. Some places charge extra for one on one time (for example $15 per 30 minutes), playtime, toys, snacks, giving medicine, baths, exit passes and assessments. We don't.
- **Out all day, not once a day.** Some places let dogs out once a day for an hour. Our dogs go outside to play every hour, with supervised pool time.
- **Free roam in a real home.** No kennels all day.
- **Small, close groups.** We keep groups small on purpose, which is why the price is higher. Never give a number.
- **One on one attention** from a team that knows every dog.
- **Rules:** never name another business, never say "safe", never mention dog counts.

## Lead reply tone (Alex, Oct 21, 2026)
Warm, calm and level. Never gushing. No "sounds like a sweetheart", no "aww", no over the top praise of the dog; it reads fake. Acknowledge what they told us plainly, answer the worry, ask for what we need.
- Say "us" or "me", never "our team" or "our staff". Four Paws Inn is a family, not a big crew with different faces. Example: "He gets one on one time with us first." (Alex, Oct 21)
- Don't end on the price ("I'll send you the total"). It turns a conversation into a sale. End with a simple question about the dog or their dates. Price comes when they ask or once we have dates and weight. (Alex, Oct 21)
- Quoting (Alex, Oct 21): always quote the HIGHER number first, the full stay with the last day included. Then say: "If you pick up before 10 AM, the last day is free" and give the lower number. Always put value next to the price, before or after it: outside to play every hour, supervised pool time, free roam with no kennels, one on one time with us, a daily video update, no hidden fees.
- Payment options in every quote (Alex, Oct 21): the first message that gives a total always lists all three ways to pay: Zelle, Apple Pay (both to 754-971-0792) or a credit card link. Credit card matters to clients; never leave it out.
- Name every number (Alex, Oct 21): when the daily rate and the deposit are the same amount, label both ("$115 a day", "the $115 deposit"). Rachel Nunez asked "Is the $115 part of the $460?" because one number meant two things.
- Don't parrot the client (Alex, Oct 23). Once the conversation is going, don't repeat their words, their name or their dog's traits back to them. Short and natural ("He'll fit right in here."). Only repeat back money and dates, to confirm them.
- No breed generalizations (Alex, Oct 23). Never say "Cockapoos do great here" or similar. Every dog is its own dog. Ask instead: how they play with other dogs (gentle, rough, shy), energy level, and whether they're neutered or spayed, unless the lead already told us.
- Ask for the deposit once (Alex, Oct 21). After a reply has already asked to hold the spot or for the deposit, never ask again in that thread. No "to hold their spot", no deposit reminder. Answer the question, then end with a simple question about their plans. If the total changes, state the new numbers only.

## Booking sheet: hands off (Alex, Oct 21, 2026)
Flow: the customer completes the forms (intake and agreement), their row appears on the booking sheet by itself, Amanda types the daily rate, everything else is automated, and Alex or Amanda ticks the deposit box, which sends the welcome page email. Claude and Codex never edit the Google booking sheet or its Apps Script unless Alex asks and it's certain nothing breaks. **Update (Alex, Oct 25, 2026): Codex now owns two booking sheet steps for every paid booking: it types the daily rate and ticks the deposit box (which sends the welcome page email). Only after Alex or Amanda confirms the deposit was received. Codex does not edit any other column or the Apps Script. Claude still does not touch the sheet.** (Oct 21: Claude filled rows by API and ticked boxes; the script didn't fire and Alex said stop. All changes were reverted.)


## People in footage (Alex, Oct 23, 2026: HARD RULE)
Every person in any photo or video Alex or Amanda sends is cleared to use: staff, family, clients, children, anyone. Alex handles consent. Claude and Codex never flag, hold, delay, pause or reject a video or photo over who is in it, consent, waivers, faces or ages. Do not ask about it. Do not add consent checks to reviews or checklists. (Other rules still apply: AI people only in the problem beat and disclosed, never an AI copy of a real person.)

- Intact (not neutered) males (Alex, Oct 27, 2026): welcome, handled the usual way. "It's what we always do." The team plans their playtime and group time like any dog. In replies: thank them for telling us and say we will keep it in mind when we plan playtime. Never refuse or add a fee for it.

- Address (Alex, Oct 27, 2026, corrected same day): the address can be shared when a lead asks. Always add that visits and meet and greets are by scheduled appointment, never drop in, because we are a home. Say it warmly.
