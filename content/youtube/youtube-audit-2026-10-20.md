# YouTube audit before cross posting (Oct 20, 2026)

Checked from the cloud session: Eden schedules and analytics. youtube.com itself is blocked from here, so the channel page wasn't opened.

## Findings

| # | Finding | Risk | Fix | Owner |
|---|---|---|---|---|
| 1 | **Eden is connected to the wrong YouTube channel: "amanda chiong"** (0 subscribers). Confirmed Oct 20: the real channel is named "Four Paws Inn", @FourPawsInnFl, ID UCSNc_9XMbXCUcn-NqjJy9VA | Shorts published through Eden go to Amanda's personal channel, not the business | Alex reconnects YouTube in Eden (Ayrshare linking page): disconnect "amanda chiong", connect again and pick the "Four Paws Inn" account on Google's chooser. Claude runs Eden sync after | Alex |
| 2 | **Two duplicate "Short-form video" schedules** in Eden (d6007514 and 63273c2d), both YouTube only, both at 4:15, 6:15 and 8:30 AM | The same Short can post twice | Delete one. Keep one slot a day: 6:15 PM is better for local parents than 4:15 AM | Codex |
| 3 | **Eden shows 0 YouTube posts tracked** | No numbers, so no learning | After fix 1, confirm Eden analytics picks it up. Optionally connect YouTube in Windsor too | Codex |
| 4 | **Instagram music doesn't transfer.** Tracks from the Instagram audio library aren't licensed for YouTube | Copyright claims, muted audio or blocked Shorts | Only post reels with music that has a YouTube-safe license (for example Kevin MacLeod CC BY, credit in the description) or YouTube's own audio library. Otherwise re-export with new music | Codex |
| 5 | **AI people need YouTube's disclosure.** Videos with realistic AI people (the couple in Tiny Dictator and Dog Sitter) | YouTube can add a label itself or penalize the video | Tick "Altered or synthetic content: Yes" on upload. Keep the on-screen "Dramatization" label | Codex |
| 6 | **"Comment DATES" doesn't work on YouTube** (ManyChat is Instagram and Facebook only) | Dead call to action | YouTube version: "Send us your dates at fourpawsinn.co" in the end card and the first line of the description. Pinned comment with the same link | Codex |
| 7 | **Titles copied from Instagram hooks** aren't searchable | Shorts get no search traffic | Title = search phrase plus the city: "Cage free dog boarding in Miramar FL", "Dog boarding near Pembroke Pines", "What to pack for dog boarding". Hook goes on screen, not in the title | Codex |

## Upload standard for every Short

1. **Title (under 60 characters):** search phrase plus city. No dashes. No emojis.
2. **Description:**
   - Line 1: the same search phrase as a sentence.
   - Line 2: "Book at fourpawsinn.co. One video update every day of the stay."
   - Line 3: the music credit, if any.
   - Then: #dogboarding #miramar #shorts
3. **Altered content:** Yes when AI people appear.
4. **Pinned comment:** "Send us your dates at fourpawsinn.co and tell us about your dog."
5. **Playlist:** "Life at Four Paws Inn" (real footage) or "Ask Amanda" (answers).
6. **Never** post a reel that fails the 15 point video checklist. The YouTube copy is the same video.

## Order
1. Alex: fix 1 (5 minutes, only he can log in).
2. Codex: fixes 2, 4, 5, 6, 7 before the next upload. For already posted Shorts: update the title, description and pinned comment. Don't delete them.
