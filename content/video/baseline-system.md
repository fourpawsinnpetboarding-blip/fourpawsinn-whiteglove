# Video baseline system: the ratchet (Alex, Oct 21, 2026)

**The rule:** the best finished video is the baseline. Every new video starts from it, has to pass every rule it already passed, and tries to beat it at one thing. A mistake gets fixed once, becomes a rule here, and never comes back.

Owners: Codex builds from this file. Claude checks against it, updates it and keeps the version number. Alex approves new baselines.

---

## 1. Current baseline: v1, Tiny Dictator Cut C

| Item | Value |
|---|---|
| File | `AD-TinyDictator-CutC.mp4` (Drive file 1FsgOdgffmEkaqhatt-ZIxVc2JaQVBJ4G), folder 2026-10-20 |
| Score | **27/30** (Claude review Oct 20). Alex listened: "the audio is great" |
| Audio | −13.8 LUFS, 3.5 LU range, peak −1.1 dB |
| Posted | Oct 21, 12:00 PM, Instagram and Facebook |
| 48 hour numbers | fill in Oct 23 |

### The baseline structure (26 to 27 seconds)

| Time | Beat | What's on screen | Rule |
|---|---|---|---|
| 0:00 to 0:02 | **Hook** | The real hero dog moving toward the camera. A 2 or 3 line question card in brand serif with one pink highlighted word. The disclosure label at the top | Readable with the sound off. The hero dog is the dog of the whole story |
| 0:02 to 0:09 | **Problem** | AI couple (fictional), word by word captions with one pink word per line. One cutaway to the real hero dog | A cut every 1 to 3 seconds |
| 0:09 to 0:19 | **Proof** | Real staff with real dogs. A step tracker on top (BOND, COMFORT, FRIENDS or MEET, SNIFF, SETTLE, FRIENDS) that moves forward with the story | Only real footage here. Never AI |
| 0:19 to 0:21 | **Payoff** | Phone notification: "Four Paws Inn: new video of your pup", playing the real hero dog | Matches the offer: one daily video |
| 0:21 to 0:23 | **Review** | Real Google review card, word for word, first name, "230+ Google reviews" pill | The quote may not promise anything we don't sell |
| 0:23 to 0:26 | **CTA (call to action)** | Logo end card, "Comment DATES" typing animation, fourpawsinn.co | 3 seconds. No black frame after it |

### The footage mix (Alex, Oct 20: "more authentic footage than AI footage makes it better")

What the baseline actually is, second by second (26 s):
| Type | Seconds | Share |
|---|---|---|
| Real Four Paws Inn footage (hook dog, staff bonding, intros, phone video) | 14 | **about 55%** |
| AI people (the couple, problem beat only) | 6 | **about 23%** |
| Brand graphics (review card, end card) | 6 | about 22% |

**The rule for every new video:**
1. Real footage is at least **half** the video. More is better.
2. AI is capped at **25%** of the runtime, and only in the problem beat (the setup or the joke). Never in the hook, the proof or the payoff.
3. AI is only ever people. Every dog is real. The hero dog in the hook is real.
4. When in doubt, cut AI seconds and add real footage. A video with no AI at all is fine.

**Audio:** narration on top, music ducked under the voice, final mix at −14 LUFS (the loudness unit social apps play at), peak under −1 dB. Licensed music, with the credit line in the caption.

---

## 2. Pre-export checklist (every rule here came from a real mistake)

Codex runs this before saving. Claude runs it again at review. **Any "no" sends the video back. The score doesn't matter.**

**Story**
1. [ ] One hero dog from the first frame to the payoff. Other dogs appear only as "other dogs" in the FRIENDS step. *(Dog Sitter Cut B, Oct 21: 3 different "he" dogs)*
2. [ ] The hero dog isn't the star of another live ad. *(Dachshund in both ads, Oct 21)*
3. [ ] No silent or dead stretch over 1.5 seconds. *(Dog Sitter Cut A: silent middle)*
4. [ ] The first frame isn't a repeat of the last frame unless the loop is planned. *(Dog Sitter Cut A: opening loop)*

**Truth and offer**
0. [ ] Real footage is at least 50% of the runtime and AI people are 25% or less, in the problem beat only. *(Alex, Oct 20: Tiny Dictator Cut C works because it is mostly real)*
5. [ ] Every dog on screen is real footage. AI people only, labeled "Dramatization. Real dogs, real home." *(Cut A of both: AI dogs)*
6. [ ] AI backgrounds look like South Florida: a living room, patio or yard. No sea cliffs, mountains or Europe. *(Dog Sitter Cut B, 0:16)*
7. [ ] The review quote matches today's offer: ONE daily video. No "pictures", "photos", "a few times a day" or "updates all day". *(Tiny Dictator Cut B)*
8. [ ] No "safe", no health claims, no dog counts, no discounts, no dashes in on-screen text or captions.

**Finish**
9. [ ] Still cards (review plus end card) total 6 seconds or less. *(Tiny Dictator Cut B: 11 seconds static)*
10. [ ] The last frame is the end card. No black frame. *(Tiny Dictator Cut B)*
11. [ ] No see-through or half-faded layers during transitions. Hard cuts or a clean wipe. *(Dog Sitter Cut B, 0:16)*
12. [ ] Audio −14 LUFS, voice clearly above the music, range under 7 LU. *(Dog Sitter Cut B: −20.5 LUFS, 10 LU)*
13. [ ] **Alex or Amanda** listened to the full video on a phone with sound on, start to end (about 30 seconds), and said "listened". AI agents can measure loudness but cannot hear, so they never tick this box. *(Cut B handoff: not done; Lex flagged it honestly on Cut C)*

**Handoff**
14. [ ] File name `AD-[Name]-Cut[Letter].mp4`, plus `-REVIEW.mp4` under 10 MB in the same folder. *(Dog Sitter: wrong name; 35 to 46 MB files Claude could not open)*
15. [ ] The Eden row has: Drive links, the music title plus the license credit line, the credits spent, which shots are AI, and the one thing this video tests.

---

## 3. How the ratchet works

1. **Start from the baseline.** Copy the structure in section 1. Change **one** thing on purpose: the test. Write it in the Eden row ("Test: hook shows the dog jumping in the pool instead of running").
2. **Checklist.** All 15 boxes are yes, or it doesn't leave Codex.
3. **Score.** Claude scores it with the 30 point scorecard in `content-machine-review.md`. It has to score **at least the baseline score**. Lower means fix and resubmit.
4. **Post** at 12:00 PM.
5. **48 hour numbers:** 3 second hold, average watch time, completion rate, shares, saves, comments, DMs.
6. **Compare with the baseline:**
   - **Beats the baseline** on average watch time AND on shares plus saves plus DMs: it becomes the **new baseline** (v2, v3...). Claude rewrites section 1, and Alex approves it in one line.
   - **Loses:** the baseline stays. The test goes into the "Tried, lost" list below, so we don't try it again.
7. **New mistake found?** Claude adds it to section 2 the same day, with the video name in italics. The checklist only grows.

The score gets a video posted. The real numbers decide the baseline. Score alone never replaces the baseline.

---

## 4. Baseline history

| Version | Video | Date | Score | Avg watch time | Shares + saves + DMs | Why it became the baseline |
|---|---|---|---|---|---|---|
| v1 | Tiny Dictator Cut C | Oct 21 | tbd | tbd | tbd | First video to pass every rule |

## 5. Tried, lost (don't repeat)

| Date | Test | Result |
|---|---|---|
| Oct 20 | AI dog as the hero | Rejected before posting: it reads fake and breaks trust |
| Oct 20 | Skit with no real proof middle | Scored 17: entertaining, sells nothing |

## 6. Test queue (one per video, in order)

1. Hook: the hero dog doing something unexpected (pool jump, zoomies) vs running at the camera.
2. Narration by Amanda's real voice vs the current voiceover.
3. Review card with a face photo of the reviewer's dog (with permission) vs a text only card.
4. 20 second cut vs 26 second cut.

## 7. AI and Meta: staying out of trouble (Alex, Oct 20, 2026)

Meta asks creators to disclose realistic AI people and can label or limit posts that hide it. The real risk for a business is looking deceptive. These rules cover both.

1. **Disclose every time.** On screen: "Dramatization. Real dogs, real home." In the caption: "Dramatization with AI actors. Real dogs, real home." On Instagram: turn on the AI label (Eden does it). Facebook: the caption line is the disclosure, because Eden can't set Facebook's label.
2. **AI is never a customer, a review, a staff member or a result.** AI people only act out the problem (the worried couple, the joke). Testimonials, reviews, Amanda, Alex and the team are always real.
3. **Never an AI copy of a real person** (Amanda, Alex, a client) and never a real client's name on an AI face.
4. **Every dog is real.** Proof, results and the hero dog are real footage.
5. **AI stays at 25% or less** of the runtime (section 1).
6. **Paid ads:** same rules, plus the disclosure line in the ad's primary text. If Meta's ad review flags an AI ad, swap in a real footage version. Don't argue the flag.
7. **Licensed music only**, with the credit line in the caption.
