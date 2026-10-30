# How we use Eden (Alex, Oct 30, 2026: "it reverse engineers why videos work; we're paying for it")

Eden is the research engine behind every content decision. It shows what is already winning, then we copy the structure (never the content) with our facts and our footage.

## What's set up (Oct 30)
- **Creator list "Dog education benchmarks" (10 creators):** @sayitoncedogtraining (Board and Train, 755K), @packleaderdogs, @yorkshire_canine_academy, @americankennelclub, @waldrupsomaticmethod, @goldenpup.mika, @theveterandogtrainer (TikTok), Beckman's Dog Training and Dogs That (YouTube), @cesarsway.
- **Board "Swipe: dog education that works":** 9 winning posts, each with a note on why it works.

## Findings so far
1. **Counterintuitive advice wins biggest:** "Don't hype your dog when you walk in", 10M views and 36x that creator's normal.
2. **Short, firm rules:** "Non negotiables. You're the authority figure", 9M views.
3. **Tier lists and rankings start arguments in the comments:** breed tier list 5.9M views and 6.2K comments; dog smarts tier list 6.7M. That's the breed education series format.
4. **"Why" titles answer owners' own questions:** "Why other dogs correct...", "Why your dog...".
5. **Carousels run about 2.4x the creator's normal for this Board and Train trainer**, but are mostly saves and comments. Reels bring the reach.
6. **Real care days narrated**, from a boarding plus Board and Train trainer: 8M views.
7. **YouTube title frames that work in the niche:** "I Was Wrong About This [breed]: [name] Knew Exactly What They Needed", "Do You REALLY Need a $[price] [service]?!", "It's Weird, But This Makes Your Senior Dog Act Like a Puppy Again".

## Weekly Eden loop (Codex leads topics, Claude runs the research)
1. **Monday:** eden_analyze_list on "Dog education benchmarks" to get the week's outliers (posts at 2x or more the creator's normal). Save the best 5 to the swipe board with a "why it works" note.
2. **Monday:** eden_search_social_content (global, mid tier creators, outlier score 2+) on that week's pillar, for example "puppy training", "senior dog", "cat behavior", "rabbit care".
3. **Before writing:** for each planned post, pull the closest winner's transcript with eden_read_social_post. Copy the hook structure, beat order and length.
4. **Titles:** eden_study_top_titles for YouTube. For carousels, eden_study_top_carousels on the niche (it timed out twice on Oct 30; retry with a 3 to 5 post limit).
5. **After posting:** eden_get_analytics on our own posts, and compare each against the winner it copied.
6. Log the findings in this file and the weekly memo (weekly-strategist skill).
