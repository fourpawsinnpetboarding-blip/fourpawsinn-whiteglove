# Narration standard: AI voice, paced like a pro (Alex, Oct 27, 2026)

Alex: "It's very important we use pacing and high tone lower tones to make the voice narratives engaging and not boring. Pauses and lowering the background music or even raising the music for intensity. All these factors are what separate a professional from an amateur."

Decision (Alex, Oct 27): use Higgsfield stock voices for narration and hook tests. No Amanda voice clone needed.

## Voice
1. Pick by ear: 2 or 3 voices read the same 15 second script. Alex picks one. That voice stays for the whole test round so only the hook changes.
2. The voice is a narrator. It never says "I'm Amanda" or speaks as a real team member. Amanda stays on camera in the real VSL.

## Pacing and pitch
1. Hook (first 3 seconds): brighter, a little faster, a lift at the end of the line.
2. Emotional lines (leaving your dog, settling in): slower and lower. Let the line land.
3. Proof and price: steady and clear, even pace.
4. A 0.4 to 0.7 second pause before the key line (price, reviews, the ask).
5. One idea per line. Never read more than about 2.5 words a second.

## Music
1. Duck the music 10 to 14 dB under every spoken line, back up in the gaps.
2. Swell on transitions and the end card.
3. Build under the hook for intensity, then pull back when the first line starts.
4. Licensed tracks only, with the credit in the caption.

## QA before anything ships
1. Listen once with eyes closed: does it sound like a person, not a reading?
2. Check the volume: voice clear on a phone speaker, music never covers a word.
3. No "safe", no health claims, no dashes on screen.

## Voice casting by content type (Alex, Oct 30, 2026)
Alex: "We now use Higgsfield voice and we borrow different voices depending on the content. Faster pacing, high and low tones, or pauses to build tension."
Higgsfield voices are the default narration for every format. They replace Alex and Amanda's real voices in reels, which are now optional.

| Format | Voice energy | Starting voices (test, then lock) |
|---|---|---|
| Pack breakdown (reading dogs) | Calm coach, low and steady, short pauses before each "look" | Male: Marcus, Gideon or Harrison. Female: Juno |
| A care day narrated | Warm, conversational, a little fast | Juno (used Oct 30), Maya or Chloe |
| 3 signals in 30 seconds | Bright and fast, a lift on each label | Pixie, Zoe or Kayla |
| Story or emotion (first night, a shy dog) | Soft and slow, longer pauses, warm close | Naomi, Tamsin or Isla |
| Offer or holiday dates (end card) | Clear and confident, even pace | Juno or Harrison |
Rule: one voice per series, so viewers learn it. A new series can take a new voice. Codex picks the format; Claude casts the voice and logs it in the spec ("voice": name and id).

## How to build tension with the voice
1. **Hook (0 to 3 s):** fast, about 3 words a second, pitch up. Cut every pause before the first word.
2. **Build:** a short beat (0.3 to 0.5 s) before each "look" or "watch". Pull the music up 2 to 3 dB under the pause, then duck it for the line.
3. **Key moment:** a longer pause (0.6 to 0.9 s) with a freeze frame, then a lower, slower line.
4. **Payoff:** warm and slower. Let the music swell back after the last word.
5. **Never invent danger** or a cliffhanger the footage doesn't support (Codex, Oct 29).

## Production pipeline (works in the cloud session, proven Oct 29)
1. Write the lines one per row in the spec. Mark each line hook, build, key or payoff.
2. Generate each line separately: Higgsfield generate_audio_batch, model seed_audio, voice_type preset, voice_id from the table. Each line is its own file, so timing is exact.
   Pitch and speed can be set per line (speech_rate, pitch_rate), so hooks go faster and higher and payoffs slower and lower.
3. Render the video with scripts/video-engine/render.py (music only).
4. The container's network blocks Higgsfield's file hosts. Mix in the Higgsfield sandbox instead:
   - Upload the base video to Eden storage (eden_prepare_scheduling_media_upload, then curl PUT).
   - In the sandbox, curl the base from public.eden.so and each line from its result URL.
   - Mix with ffmpeg:
     - Trim the silence at the start of each line, then place it with adelay.
     - Even out the voice with acompressor (threshold 0.04, ratio 4, makeup 2.5).
     - Duck the music under the voice with sidechaincompress (threshold 0.01, ratio 20, attack 10, release 450).
     - Finish with loudnorm to -14 LUFS.
   - Upload the result with media_upload, PUT from the sandbox, then media_confirm.
   - Pull it into Eden with eden_import_scheduling_media from the Higgsfield URL.
5. Audio QA in the sandbox: transcribe the final mix with faster-whisper (model small). The transcript must match the script word for word. The Oct 29 mix first read "play" as "plet"; fixed by spacing the lines and compressing the voice. A person still does one listen before air time (Codex or Alex).
6. Caption: add "Voiceover: AI voice." and the music credit.
