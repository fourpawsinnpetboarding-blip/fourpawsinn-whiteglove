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

## Live Wix check (Oct 11, via Wix API)
Service pages (CMS collection "Four Paws Inn Services", id `Projects`) were already corrected on Sep 17, 2026: dog $60, large $75, puppy and senior $80, all "per calendar day", pool time included. Search engines still show the old versions. Fix = ask Google to re-crawl.

Still wrong on the live site:
1. Exotic pet page: title "$25 per day", "Starting at $25 per day", and "Located in Pembroke Pines". Business-facts: never quote exotic prices; location is Miramar.
2. Cat page: "$40 per calendar day". Business-facts says never quote a cat price. Alex to decide which is right.
3. Blog, 14 posts from 2025. Worst for AI trust:
   - "Four Paws Inn: The #1 Rated Pet Boarding in Fort Lauderdale & Miami" (68e19680736ffeca15bd3951)
   - "Why AI Recommends Four Paws Inn as Miami Lakes Top Choice for Pet Boarding" (68f7ee3cc9a84e796d0ffe30)
   - "Why Four Paws Inn is Revolutionizing Dog Boarding in Hollywood, Florida" (68e991524bab99a0463d8426)
   - "Introducing The Pack Club: Revolutionary Daycare Memberships" (68a4db10178d3edb3f9ac629), offer no longer sold
   - Older posts carry $40, $50, $65 prices and 80 to 190+ review counts.
4. Homepage and About page text ($50 a night, 119 reviews): editor pages, not reachable by API. Fix in the Wix editor.

## Fixes done by Claude, Oct 11 (Alex: "yes and yes")
Cat price: Alex kept $40 a day as on the live cat page.

Blog (Wix trash is restorable for each deleted post):
- Trashed: "#1 Rated ... Fort Lauderdale & Miami", "Why AI Recommends ... Miami Lakes", "Revolutionizing ... Hollywood", "The Pack Club", "Exploring the Benefits of Trusted Puppy Boarding" (claimed on-call vet, agility courses, events, fake stat, AI images), "Reliable Care for Your Pets" (made-up testimonial, grooming and training claims, broken image).
- Rewritten and republished with current facts ($60/$75/$80 a day, 215 reviews, 4.9, Miramar, hours, no health or safety claims, no dashes): "Why Miramar Pet Parents Choose Four Paws Inn", Cat boarding post (was $25/night, 117 reviews, "[Your Phone Number]" placeholder), Pembroke Pines "cheap boarding" post (had kennel cough and illness claims, 24/7 claim), FAQ post (said $40/$65 a night and "3 to 6 dogs").
- Referral program post: kept, Alex confirmed the $25 credit or free daycare day is still true (Oct 11).
- Alex said "you decide" on the last 3: trashed "Back to School Blues" (sold daycare memberships that do not exist, quoted made-up customers) and "South Florida Pet Owner Demographics" (May 2025 AI filler batch). Rewrote and republished the vet referral post: kept the $50 clinic bonus and 50% off first day, removed "highest rated in Florida", "120+ reviews" and the health outcome claim.
- llms.txt published at fourpawsinn.co/llms.txt with the correct facts, prices, hours and page links, so AI tools read one clean source.

Service pages: Exotic pet page now says "pricing confirmed by our team" and Miramar.

Google SEO text (published): Home, About, Contact and the /summer landing page now say Miramar, 215 reviews, 4.9, $60 a day. Before: 190+, 175+, 119+ reviews, $50 and $60 "per night", Pembroke Pines.
Still old: "UNDER CONSTRUCTION" page (jcj1c) copies the old home description; Cancellation Policy page description is copied from About. Service page Google titles still read "in Pembroke Pines" (set by the dynamic page pattern).

Google: sitemap resubmitted and site re-crawl requested through Search Console (connected and verified).

## Wix editor text (Home and About): assigned to Codex
Claude cannot reach editor page text by API. Eden board Request row for Codex added Oct 11 (row 386e83be). Alex does nothing.

### Original instructions
On the Home and About pages, use the editor search for each of these and replace:
1. "$50" or "/night" or "per night" -> "$60 a day"
2. "119", "190", "80" five star reviews -> "215 Google reviews, 4.9 stars"
3. "Pembroke Pines" as our location -> "Miramar" (keep it where it says we serve Pembroke Pines)
Then Publish.
