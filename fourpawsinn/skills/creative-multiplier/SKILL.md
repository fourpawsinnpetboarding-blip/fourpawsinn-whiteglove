---
name: creative-multiplier
description: >-
  Take one finished video concept for Four Paws Inn White Glove and multiply
  it into hook-frame variants, thumbnail sets, and motion-graphic B-roll
  using the Higgsfield CLI (`higgsfield` / `higgs` / `hf`). Never generates
  dogs, facilities, yards, or people — those only ever come from real
  footage. All output is saved to a dated local folder for human review; it
  is never uploaded, published, or posted anywhere. Use when the user asks
  to "multiply" a video concept, wants hook-frame or thumbnail variants for
  an ad/reel, or wants motion-graphic B-roll to cut around real footage.
---

# Creative Multiplier

Turns one finished video concept into a batch of supporting creative assets via the Higgsfield CLI: hook-frame variants, thumbnail sets, and motion-graphic B-roll. This skill only produces *abstract/graphic* supporting material — never the pet-boarding subject matter itself.

## Hard rule — read this first

**Never generate dogs, animals, facilities, yards, or people.** Every prompt this skill sends to Higgsfield must be abstract, graphic, or text/motion-based (typography, color fields, light streaks, particles, icon animation, gradients, kinetic text). Real dogs, real clients, the real facility, and real yards only ever come from actual footage/photos the user supplies — never from generation.

Before sending any prompt, check it against this list. If a prompt would require depicting a dog, a person, a building, or outdoor pet-facility grounds to fulfill the brief, do not generate it — tell the user that piece needs real footage instead, and skip it.

Every prompt sent to Higgsfield must end with this negative clause, verbatim:
```
no dogs, no animals, no people, no pet facility or yard imagery
```

## Inputs needed from the user

1. **The concept** — a short brief on the finished video: topic, key message/hook line, target platform(s) (e.g. Reels, TikTok, YouTube Shorts, in-feed), and any brand colors/fonts to reference in prompts.
2. **Aspect ratios needed** — default to `9:16` (Reels/TikTok/Shorts), `1:1` (feed), and `16:9` (YouTube) unless told otherwise.
3. **How many variants** per category — default to 3 hook-frame variants, 4 thumbnail variants, 2 B-roll clips.

If any of this is missing, ask once, briefly, rather than guessing brand voice or hook copy.

## Verified command reference

Confirmed against the installed CLI (`higgsfield version`). Run `higgsfield model get <job_type>` yourself before using an unfamiliar model — params change over time.

```bash
# Cost check before every batch — sum credits and tell the user the total before creating jobs
higgsfield generate cost <job_type> --prompt "..." --aspect_ratio <ratio> --resolution <res>

# Image generation (hook frames, thumbnails)
higgsfield generate create nano_banana_pro --prompt "..." --aspect_ratio <ratio> --resolution 2k --wait
higgsfield generate create nano_banana_2_lite --prompt "..." --aspect_ratio <ratio> --resolution 1k --wait

# Video generation (motion-graphic B-roll)
higgsfield generate create seedance_2_0 --prompt "..." --aspect_ratio <ratio> --duration <4-6> --resolution 1080p --mode std --genre auto --wait

# Every `--wait` create prints a hosted result URL, not a local path — always download it (see Output layout)
```

Key params (verified via `model get`):
- `nano_banana_pro`: `aspect_ratio` ∈ {1:1,3:2,2:3,4:3,3:4,4:5,5:4,9:16,16:9,21:9}, `resolution` ∈ {1k,2k,4k}, requires `prompt`.
- `nano_banana_2_lite`: same aspect ratios plus `auto`, `resolution` fixed to `1k`, cheaper — use for larger thumbnail batches.
- `seedance_2_0`: `aspect_ratio` ∈ {auto,16:9,9:16,4:3,3:4,1:1,21:9}, `duration` integer (default 5), `resolution` ∈ {480p,720p,1080p,4k}, `genre` ∈ {auto,action,horror,comedy,noir,drama,epic}, requires `prompt`. Use `genre auto` or `drama`/`epic` for motion-graphic energy, never realistic scenes.

## Workflow

1. **Confirm the brief** — restate the concept, aspect ratios, and variant counts back to the user before spending credits.
2. **Draft prompts** — for each asset, write an abstract/graphic prompt tied to the concept's hook line and brand colors (e.g. "bold kinetic typography reading '<HOOK LINE>', high-contrast color-block background, dynamic diagonal composition"). Append the negative clause from the Hard Rule to every single one.
3. **Estimate cost first** — run `higgsfield generate cost ...` for every planned asset, sum the credits, and tell the user the total before creating anything. Stop and ask if the total looks high relative to `higgsfield account status` credits remaining.
4. **Generate**:
   - Hook-frame variants: `nano_banana_pro`, one per requested aspect ratio, prompt built from the hook line.
   - Thumbnail set: `nano_banana_2_lite` for the batch (cheaper), `nano_banana_pro` for one hero pick if the user wants higher fidelity.
   - Motion-graphic B-roll: `seedance_2_0`, short duration (4-6s), aspect ratio matched to the final video's own aspect ratio.
5. **Download every result** — `generate create --wait` prints a hosted URL, never a local path. Download each one with `curl -sL -o <path> <url>` into the output layout below. Do not consider an asset delivered until it exists on disk.
6. **Report back** — list every generated file's local path, its aspect ratio/category, and the total credits spent (from step 3's estimate, cross-checked against `higgsfield account status` before/after if the user wants a running total).

## Output layout — local only, never published

Save everything under the repo, in a folder dated for the run, never inside anything that gets deployed or published:

```
higgsfield-output/<concept-slug>/<YYYY-MM-DD>/
  hook-frames/
  thumbnails/
  b-roll/
```

- Never run `higgsfield website deploy`, `higgsfield website publish`, or any marketing-studio/social publish command as part of this skill.
- Never post, upload, or share these files outside the local folder unless the user explicitly asks in a later step — this skill's job ends at "reviewable on disk."
