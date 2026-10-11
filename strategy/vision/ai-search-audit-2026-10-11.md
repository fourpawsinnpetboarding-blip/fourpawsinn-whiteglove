# AI search audit, Oct 11 2026

Thesis section 6b, move 1. Claude ran a clean web search (no login, no location history), the closest proxy for what ChatGPT, Gemini and Google AI read.

## Result
1. "best dog boarding in Miramar FL": **Four Paws Inn does not appear.** The answer is built from Yelp, HomeGuide, Boarding.com, DogVacay lists and competitors: Holly Acres Pet Resort, Dogstown University (Yelp 4.6, 63 reviews), Country Inn Pet Resort, PAWZ Dog Sitting (claims 5.0 on Rover, 258+ reviews), FreeDOGm.
2. "cage free dog boarding Pembroke Pines Miramar home boarding reviews": **Four Paws Inn is the only result.** But the AI flagged our own facts as conflicting and told the reader to "treat the ratings as self-reported":
   - Price: "$50/night" on one page, "$60/night" on another. Real: $60 under 50 lb, $75 over 50 lb.
   - Reviews: 80, 110, 119, 165 (press release) on different pages. Real: 215, 4.9.
   - Location: called Pembroke Pines in one place, Miramar in others.
   - "No independent third party reviews found." Google reviews are not being picked up as third party proof.

Why Alex's phone shows us: his phone knows he searches Four Paws Inn. A stranger's phone does not.

## Fixes, in order
1. **One set of facts everywhere** (fourpawsinn.co on Wix, press releases, directories): $60 / $75 a day, 215 Google reviews 4.9, Miramar. Claude can edit Wix pages with Alex's yes.
2. **Get on the lists the AI reads:** Yelp (claim and complete), HomeGuide, Boarding.com, Rover. Each needs the same name, address, phone, prices.
3. **Link the Google reviews** from the site (an embedded review widget or link), so the 215 reviews read as third party proof.
4. Re-run this search monthly. Target: named in the broad search by March 2027.

## Website audit (fourpawsinn.co, from search engine copies, Oct 11)
Direct fetch is blocked from Claude's container, so this comes from what Google and AI tools have stored. Same thing a stranger's AI reads.

| Problem | What the site says | Truth (business-facts.md) |
|---|---|---|
| Dog price | $40, $50, $60 "per night" on different pages | $60 a day under 50 lb. Charged by day, never by night |
| Large dog | $65 and $75 | $75 a day |
| Puppy and senior | $80 | $80 (Alex, Oct 10). Confirm |
| Cats | $25 and $30 quoted | Never quote. "Our team will confirm." |
| Phone | 754-240-3133 and 754-971-0792 | Alex to pick one |
| Town | Pembroke Pines on service pages, Miramar on homepage and address, "Fort Lauderdale and Miami" in a blog title | Miramar, serving Pembroke Pines and Broward |
| Reviews | 80, 100+, 110, 117, 119, 190+, 165, rating 4.9 and 5.0 | 215, 4.9 |
| "#1 Rated Pet Boarding in Fort Lauderdale and Miami" (blog title) | Claim nobody can verify | Remove. AI tools discount it |
| Pool time | On most pages | Alex to confirm it is still true |
| Exotic pet boarding | A service page | Alex to confirm it is still offered |
