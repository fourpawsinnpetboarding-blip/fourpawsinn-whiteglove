# First Overnight Nurture (future date leads): copy and build spec

Owner: Claude (copy, design), Codex (GHL build). Alex wants it live Oct 12, 2026.
Goal: every lead without dates books and pays for a first overnight stay within 3 weeks. Policy: `fourpawsinn/business-facts.md`, "First overnight stay".
Rules: no dashes, 3rd grade, no safety or health promises, no fake scarcity, no opt out footers (Alex rule). Texts sound like Amanda.

## Build (Codex, reuse, do not duplicate)
1. Do NOT create a new entry workflow. Edit **FPI Future Travel Conversion**, DATES MISSING branch. Keep the current personalized first text and the 3 hour follow up. Replace everything after them with the sequence below.
2. Merge field: `{{contact.dog_name}}`, fallback "your pup" if empty (use the Pet Name field if Dog Name is empty).
3. Every step checks first: if tag `trial-booked`, `booked-client` or any Won opportunity, or the contact replied (SYSTEM Reply Kill Switch), stop. A reply goes to Amanda, who answers with Script A in `content/sales/boarding-ready-scripts.md`.
4. Send window: 9 AM to 7 PM Eastern only.
5. When a lead replies, add an internal notification to Amanda and Alex: "Future lead replied, offer the first overnight."
6. After the last text with no booking: move to the existing RETENTION 30 day nurture. Nothing new.
7. Tag on entry: `boarding-ready-offered` (this is how Claude counts it every Monday).
8. Test on the contact Test Order only, read every text on Alex's phone, then publish.
9. Backfill: only after Alex says yes, enroll open future travel leads from the last 60 days who never booked (not Lost, not booked).

## The texts
Link: [PAGE] = the GHL page "Why every new pup starts with an overnight" (`content/pages/first-overnight-page.md`).

**Day 1, 11 AM**
Hi {{contact.first_name}}, it's Amanda from Four Paws Inn. Quick note on how we do things here: every new pup starts with one overnight stay with us before a big trip. {{contact.dog_name}} gets to learn the house, meet the pack and get to know our team. Here is why we do it: [PAGE]

**Day 2, 4 PM**
What {{contact.dog_name}}'s first night looks like: we meet you at your car. First the house, then the yard, then the group, when they are ready. Dogs go outside to play every hour. You get a photo and video update so you can see them settle in.

**Day 4, 11 AM**
One of our families told us: "What was so amazing is that they kept the regular schedules." That is the whole idea. Same food, same routine, a real home. The first overnight is where we learn {{contact.dog_name}}'s routine.

**Day 6, 5 PM**
A lot of families are planning Thanksgiving and Christmas trips right now. New pups need their first overnight at least a week before a holiday stay. If you think you will travel this season, now is a good time to get {{contact.dog_name}}'s night on the calendar.

**Day 9, 11 AM**
The first overnight is our normal daily rate, $60 for most dogs under 50 lb. Monday to Thursday nights. You drop off between 4 and 6:30 PM and pick up the next morning. Want me to save a night for {{contact.dog_name}}? Just reply with a day.

**Day 13, 4 PM**
Hi {{contact.first_name}}, Amanda here. We love getting to know a new pup before their first big stay. Is there a weeknight in the next two weeks that works for {{contact.dog_name}}?

**Day 20, 11 AM**
Should I keep {{contact.dog_name}} on our list for a first overnight? Reply YES and I will send you open nights. If now is not the right time, no problem at all.

Check facts before publish: rates, drop off window (4 PM to 6:30 PM) and "photo and video update" from business-facts.md. The Day 4 quote is from Sharon's public Google review (used in posts before).
