---
name: youtube-long-edit
description: >-
  Edit Alex's raw long form footage (talking head, walkthroughs, Founder's Log)
  into a finished YouTube video for Four Paws Inn or Alex's personal channel:
  transcribe, cut bad takes, add zooms, captions, brand animations, proof
  b roll, licensed music and sound effects, then QA and export. Use when Alex
  says "edit this video", "edit my YouTube video", "run the long form editor",
  or drops raw footage for YouTube. Runs best in Claude Code on Alex's Mac
  (local mode). Drafts only: never uploads or publishes.
---

# YouTube long form editor (Four Paws Inn)

Based on Christian Peverelli's system (WeAreNoCode, "I Fully Automated My Video Editing Using Claude Code", Oct 2026, 198K views). Claude is the editor and coordinates the tools. Alex records and gives notes. Claude is the default editor (CLAUDE.md section 2), never Dominick.

Read first: `CLAUDE.md`, `fourpawsinn/business-facts.md`, `content/video/hook-rules.md`, `strategy/content-research/creator-playbook.md`, and the Rules learned section at the bottom of this file.

## The team (one tool per job)

| Job | Tool | Cost | Notes |
|---|---|---|---|
| Editor and project manager | Claude Code, local mode on Alex's Mac | Existing plan | Reads files on the Mac, runs the other tools, writes output to a folder. |
| Transcriber | Parakeet (NVIDIA, free). On Apple Silicon use `parakeet-mlx`. Fallback: `faster-whisper`. | Free | Word level timestamps. This is how Claude "hears" the footage and finds bad takes. |
| Animator | HyperFrames (HeyGen, free, open source) | Free | Claude writes each title, lower third, number reveal or logo pop as a small web page; HyperFrames renders it to video. Install from HeyGen's official HyperFrames repo or the Claude connector list. |
| Researcher (proof b roll) | Chrome via Claude in Chrome | Free | Screenshots and scroll recordings of real proof: the Google reviews page, the booking site, a real news article. Exact pages only, never mockups. |
| Sound designer | Epidemic Sound connector, business plan | Paid | Four Paws Inn is a business, so use the business license, not the personal one. Music and sound effects. |
| Finisher | FFmpeg | Free | Joins everything, removes black frames, checks audio sync and loudness. |
| Screen editor (optional) | Tella | Paid | Only for screen recordings (GHL, dashboards) on Alex's personal channel. Skip for dog content. |

## Inputs

1. Raw files: a folder path on the Mac (Drive desktop `FPI-VIdeos/RAW/LONG` or a local folder). Originals only, never compressed copies.
2. Channel: **Four Paws Inn** channel (clients, local SEO) or **Alex personal** channel (Founder's Log, operator content). Ask if unclear. Never guess (CLAUDE.md section 8).
3. Optional notes from Alex: things to show, zooms, numbers to animate.

## Process

1. **Probe.** List files, duration, resolution, frame rate, audio. Copy to `work/<date>-<slug>/`. Never edit originals.
2. **Transcribe.** Parakeet with word timestamps. Save `transcript.json` and a readable `transcript.md` with timecodes.
3. **Paper edit.** From the transcript, pick the best take of each line. Cut false starts, repeats, long pauses (over 0.6 s), "um" clusters and off camera talk. Save `edit-plan.md`: every kept segment with in and out times and why. Show Alex the hook section of the plan first when this is a new style.
4. **Hook.** First 30 seconds follow `content/video/hook-rules.md`: talk to the viewer, promise the payoff, one proof element on screen (Four Paws Inn: the Google review badge; personal: one real number).
5. **Visual pass.** Punch in zooms (110 to 120 percent) on emphasis lines, alternate framing every 10 to 20 seconds so the face shot never sits static too long. Burned in captions, 2 lines max, highlighted key word.
6. **Animations (HyperFrames).** Titles, chapter cards, number reveals, logo pops. Brand only: cream `#FAF7F3`, pink `#E6A0A3`, charcoal `#353532`, bold serif headings, clean sans body. 4K render, then scale to the timeline.
7. **Proof b roll.** When Alex mentions a fact (reviews, a policy, the yard, a number), cover it with real proof: real footage from the footage library first, then a browser capture of the real page. Never generated dogs, people, rooms or yards (see `fourpawsinn/skills/creative-multiplier`).
8. **Sound.** Hook: light suspense bed. Body: low, steady track that never fights the voice (music about 18 to 22 dB under speech). Sound effects sparingly: a soft pop on graphics, a click on screen taps. Credit every track as the license requires.
9. **Finish (FFmpeg).** Join, remove black frames, check sync, loudness about -14 LUFS, export 1080p or 4K master (H.264, high bitrate). Save `master.mp4`.
10. **Package.** Write `youtube.md`: 3 title options, description (keyword first line, booking link, chapters with timestamps), 3 thumbnail concepts (real photo plus 3 words max), tags. Client facing copy at a 3rd grade reading level, no dashes.
11. **QA.** Watch at 1 frame per second tiled plus spot checks with sound. Check every claim against `business-facts.md` (hours, prices, policies). No health, safety or outcome claims. No client faces or names without consent.
12. **Deliver.** Put `master.mp4`, `youtube.md` and the thumbnail files in `FPI-VIdeos/READY TO POST - Claude/LONG/`. Tell Alex in 3 lines: length, what was cut, anything to review. **Do not upload or publish.** YouTube is not covered by the 7:30 AM or 12 PM exceptions; Alex approves every long form video.

## Feedback loop (the part that makes it good)

1. Alex watches and gives notes with timestamps: "at 1:22 the zoom is too fast", "this sound is too busy".
2. Claude fixes them and re-exports.
3. Claude then asks: "Save what we learned to the skill?" and on yes, appends each lesson as a numbered rule under Rules learned below, with the date. Next edit, the same mistake never repeats.

Start small: first runs edit only the hook (30 to 60 seconds) until the style is right, then full videos.

## Repurpose (every long video)

Cut 3 to 5 vertical clips (1080x1920) from the strongest moments for the 12 PM reel slot. They still follow the reel QA in `scripts/video-engine/weekly-run.md` and need licensed music.

## Rules learned

(Empty. Append numbered rules here after each round of Alex's feedback, newest last, each with a date.)
