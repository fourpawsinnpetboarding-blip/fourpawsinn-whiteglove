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

- Drop-off and pick-up: 9:00 AM to 8:00 PM, seven days a week.
- Meet and greets: Tuesdays, 9:00 AM to 1:30 PM and 6:30 PM to 8:00 PM.

## Current pricing

| Service | Price |
| --- | --- |
| Dog under 50 lb | $60 per day |
| Dog over 50 lb | $75 per day |
| Second dog | $5 per day off |
| Last day | Free if picked up before 10:00 AM |
| Cats | Pricing depends on the number of cats and length of stay. Never quote a cat price; say the team will confirm. |
| Private suite | Costs more. Never quote a private-suite price; say the team will confirm. |

Four Paws Inn charges by day, never by night.

## Booking and care policies

- A 25% deposit reserves the dates.
- The balance is due at drop-off.
- Vaccines must be current.
- Owners bring food pre-portioned in Ziploc bags.
- Four Paws Inn provides beds and supplies.
- Daily photo and video updates are included.

## Brand and copy rules

- Client-facing writing is warm, short, direct, and clear enough for a third-grade reader.
- Give the care benefit and the reason for a boundary. Do not use warmth to weaken a policy.
- Do not use em dashes or stray hyphens in copy the customer will receive.
- Do not invent pet names, client details, availability, testimonials, performance numbers, or care claims.
- Default CTA: "If you're near Miramar or Pembroke Pines and need boarding, send us your dates and tell us about your dog."
- Nothing publishes without Alex's approval. Draft and queue only.
- Never send an email or SMS to a live GoHighLevel contact or list without explicit approval for that exact send.
- No AI-generated customer-facing SMS may be sent automatically. A human writes or approves the final message.

## Visual identity

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
- No other workflow ID is known. Resolve any other ID from GoHighLevel before an operation and never guess.
- The conversion workflows may send prewritten, approved follow-up messages. They must not contain an AI action that generates or sends customer-facing copy without human approval.

## Creative-generation guardrails

- Four Paws Inn dogs, animals, clients, staff, the home, facility, and yards must come from real supplied footage or photos, not generation.
- Supporting generated material may be abstract, graphic, typographic, or motion-based.
- Append this clause to every Four Paws Inn Higgsfield generation prompt: `no dogs, no animals, no people, no pet facility or yard imagery`.
