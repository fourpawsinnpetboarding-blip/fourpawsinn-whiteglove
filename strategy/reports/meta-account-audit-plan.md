# Meta account audit plan (run when Windsor reconnects)

Alex, Oct 8, 2026: "Really look at the one I have running now. Connect the correct instant form. The right setup is crucial."
Baseline (30 days to Sep 28): "New Dog Ad -Vid/Image", Leads objective, instant form, $1,154 spend, 47 leads, CPL about $24.56.

## Checks, in order
| # | Check | Good looks like | Source |
|---|---|---|---|
| 1 | Which instant form each live ad uses | "Fall and Holiday Boarding 2026", not "Summer Boarding" (strategy/meta-lead-forms/fall-holiday-2026.md) | Windsor ad creative read |
| 2 | Form type | Higher intent (review screen before submit), dates and dog questions included | Ads Manager form |
| 3 | Form leads reach GHL | Every Meta lead becomes a GHL contact, gets the intake text, and fires Alex's alert | GHL contact source = Facebook |
| 4 | Conversions API (CAPI) | Meta gets lead and booked events back from GHL | Events Manager |
| 5 | Structure | One campaign, one or two ad sets, budget not split thin | Windsor |
| 6 | Audience | Location Miramar, Pembroke Pines, Broward radius. Broad or Advantage+ audience, no tight interest stacking | Windsor |
| 7 | Placements | Advantage+ placements | Windsor |
| 8 | Creative count and fatigue | 3 to 6 live ads. Frequency under 3. CPL per ad vs baseline | Windsor |
| 9 | Video hook rate | 3 second views divided by impressions. Low = change the first frame (hook-rules.md) | Windsor |
| 10 | Lead quality | Of last 30 days of Meta leads: replied, qualified, booked. Cost per booking, not just per lead | GHL plus Windsor |

## Output
Keep, fix, or pause for each item. Fixes that change live ads go to Alex for one click approval. Then build the Round 1 concept test (6 ads, Hook 1 of each concept, $25 a day, 10 days, paused; see strategy/meta-campaign-blueprint.md) with the same form, location and goal as the main campaign.

Method reference: Ben Heath, see strategy/meta-ad-review-playbook.md.

## Added Oct 8: customer lifecycle check (Ben Heath, youtu.be/X2Iww-AH7Zs)
| # | Check | Action |
|---|---|---|
| 11 | Existing customers defined in Advertising settings | Upload a GHL list of past booked clients as a custom audience, set it as "Existing customers". Set engagers and website visitors as "Engaged audience" |
| 12 | Audience segments breakdown on the live campaign (Breakdown, Audience segments) | How many of the 47 leads came from existing clients vs new people |
| 13 | Customer lifecycle strategy (ad set level) | Switch to "Acquire new customers" ONLY if existing clients are a big share of leads. Never exclude the engaged audience. Never use manual custom audience exclusions in targeting (hurts delivery per Heath) |
Note: Heath demos this on a Sales campaign. Confirm it shows on our Leads campaign before planning around it.

## Status Oct 8 evening
Windsor connector re-authorized as alex@chiongenterprise.com (Trial, 21 days left). Accounts visible: Four Paws Inn Ads 2, GHL. Write actions available. get_data fails on every request with an output schema error (Windsor bug). Support ticket 14045192 filed. Audit waits on the fix. Fallback: Alex sends Ads Manager screenshots.
