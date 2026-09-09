# content/ layout and raw material naming

This is how `scripts/weekly-pipeline.js` finds the right raw file for the right day. Drop files into `content/inbox/` using these prefixes. Anything else in `content/inbox/` is ignored by the weekly pipeline (the photo pipeline from the single-photo build still picks up ordinary photos separately).

| Day | Format | Drop this in content/inbox/ |
|---|---|---|
| Mon | House and yard reel | `mon-<anything>.mp4` (or `.mov`) |
| Tue | Pain point carousel | Not a photo. Write the six slide lines in `content/copy/tue-<slug>.md`, one line per slide. |
| Wed | Dog moment reel | `wed-<anything>.mp4` (or `.mov`) |
| Thu | Funny static | `thu-<anything>.jpg` (or `.jpeg`, `.png`, `.heic`) |
| Fri | Transformation | Two files, same slug: `fri-<slug>-day1.jpg` and `fri-<slug>-day5.jpg` (images or `.mp4`) |
| Sat | Case study reel | Not from inbox. Pulled from `content/reviews/google-business-reviews.csv`, needs `permission_signed` true and B-roll in `content/reviews/dogs/<dog-name>/` for that review's dog. |
| Sun | Founder talking head | `sun-<anything>.mp4` (or `.mov`). Real footage only, no avatar path exists. Monthly, not weekly, so this is expected to be missing most weeks. |

## content/reviews/google-business-reviews.csv

Manual export from the Google Business Profile dashboard, one column added by hand afterward. Expected columns, header row required:

```
reviewer_name,dog_name,rating,review_text,review_date,permission_signed
```

`dog_name` can be blank for the retired review-card use, but the case study reel needs it, that is how it finds the right B-roll folder. `permission_signed` must be `true` or `yes` (case-insensitive) for a review to ever become a case study reel. Anything else, including blank, means skipped and reported, never built. Do not set this to true because a client left a nice review, only because they actually signed off on their name, their dog, and their words being used in an ad.

The pipeline tracks which reviews it has already used in `content/reviews/used.json` so it does not repeat one until the export runs out, at which point it says so by name rather than repeating silently.

## content/reviews/dogs/<dog-name>/

B-roll for the case study reel, one folder per dog, named to match that dog's `dog_name` value in the CSV exactly (case-insensitive match). At least one photo or clip. Two or more lets the reel use a different shot for the opening and closing B-roll instead of repeating one. Gitignored, this is real footage of real clients' dogs.

## Folders

- `content/inbox/` — drop raw material here. Gitignored, not code.
- `content/done/` — originals move here once their post is drafted in Eden. Gitignored.
- `content/rejected/` — filename matched the AI-generated pattern, never posts. Gitignored.
- `content/generated/` — composited output (carousels, review cards, case study reels) waiting for the Eden upload step. Gitignored.
- `content/copy/` — carousel slide text source files. Tracked in git, this is copy, not a photo.
- `content/reviews/` — the CSV export and the used-reviews tracker. The CSV itself should be gitignored if it ever contains a real client's name; `used.json` is fine to track.
- `content/reviews/dogs/` — real B-roll of real clients' dogs for the case study reel. Gitignored.
- `content/weeks/YYYY-MM-DD.json` — one file per week run, logging every post: format, time, asset, caption, Eden draft id, or the reason a slot was skipped. Tracked in git, this is the record.
