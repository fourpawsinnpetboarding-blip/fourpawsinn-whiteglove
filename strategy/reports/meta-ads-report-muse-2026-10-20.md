# Four Paws Inn — Meta Ads Report

**Date:** October 20, 2026
**Ad account:** Four Paws Inn Ads 2 (942706665029521)
**Prepared by:** Baxter (Muse) — read-only pull, nothing changed

## Account status

- 2 campaigns ACTIVE and delivering; 5 campaigns paused ($0 spend in window).
- Total spend, last 30 days: $1,739.20.
- Instagram: **still NOT linked** to this ad account (checked Oct 20). IG placements/creative identity are blocked until it's attached in Business Settings → the ad account itself → assigned assets.

## Campaign performance — last 30 days

| Campaign | Status | Spend | Impressions | Clicks | CTR | CPC | Cost/Lead | Attributed purchases |
|---|---|---|---|---|---|---|---|---|
| New Dog Ad - Vid/Image | Active | $1,206.30 | 41,644 | 1,223 | 2.94% | $0.99 | $19.15 | 0 |
| FPI Round 1 Concept Test Oct 2026 | Active | $532.90 | 17,045 | 860 | 5.05% | $0.62 | $20.50 | 0 |

Paused ($0 spend): Dog Boarding Experience Reel; Cat - Duplicate Enhancement - May 2026 Form; Lead Magnet Checklist; Cat Boarding - Single Video - LAL 1% - May 2026; Dog Boarding - Static Images - May 2026.

## Ad set performance — last 30 days

| Ad set | Spend | Impressions | Clicks | CTR | CPC | Cost/Lead |
|---|---|---|---|---|---|---|
| New Dog Ad -Vid/Image (baseline) | $1,206.30 | 41,644 | 1,223 | 2.94% | $0.99 | $19.15 |
| R1 Concepts 15mi Broad | $304.99 | 8,923 | 517 | 5.79% | $0.59 | $17.94 |
| R2 All Hooks 2-5 15mi Broad | $227.91 | 8,122 | 343 | 4.22% | $0.66 | $25.32 |

Concept-test read: both test ad sets beat the baseline on engagement (CTR ~1.5–2x, CPC ~35–40% cheaper). R1's cost per lead ($17.94) now beats the baseline ($19.15); R2's ($25.32) is above it. Earlier window (Oct 14–19) note: R1 hit a learning failure / budget-limited state then; R2 was at $18.44 CPL in that window. Creative is working; a final lead-cost verdict needs more volume — a one-time recheck is scheduled Thu Oct 22.

## Conversions & attribution

- Offline dataset: "Offline Conversion- FourPaws" (3164395030398225), fed by Ripon's pipeline: GHL booking marked Won → Stape → Meta Conversions API. Live since Oct 9. **Do not modify this pipeline — fixes go through Ripon.**
- Events received (as of Oct 14): 35 Purchase + 26 QualifiedLead in 28 days. **Zero attributed to any campaign.**
- Event Match Quality (Oct 20): Purchase **6.6/10** (email 100%, phone 100%, external_id 100%). QualifiedLead **5.4/10 — slipped from 6.6**; its email/phone coverage dropped to 60%. Worth watching.
- Root cause of zero attribution (verified Oct 14 via a lead trace in HighLevel): the booking form at four-paws-booking.vibepreview.com captures no ad-click identity — no fbclid, no UTMs; HighLevel records these leads as "Direct traffic" with empty attribution fields. Purchase events therefore arrive with contact data only. Booking lag (leads book days/weeks after clicking) likely also exceeds the 7-day click attribution window.
- Fix spec already delivered to the owner (Oct 17) for the web dev: capture fbclid/gclid/UTMs on page load (sessionStorage), build fbc, read _fbp, pass fpi_fbc / fpi_fbp / fpi_utm_* / fpi_gclid into HighLevel as custom fields on submit; then Ripon includes fbc/fbp in the CAPI Purchase event's user_data (his call).

## CRM snapshot (HighLevel, from Oct 14 review)

- 100 new opportunities in 30 days; 23 Booked, $6,120 total value.
- 26 stale leads (7+ days, all Facebook Lead Form, still in New Lead stage). Revival message drafts delivered to the owner Oct 18 — awaiting approval, nothing sent.

## Open items

1. Link Instagram to the ad account (Business Settings → ad account → assigned assets).
2. Web dev to implement the form click-capture spec.
3. Attribution window widening — Ripon's decision.
4. Watch QualifiedLead match quality (5.4, email/phone coverage at 60%).
5. Concept-test lead-cost verdict — recheck scheduled Thu Oct 22.

## Standing rules (for any AI working on this account)

- Read-only on campaigns, budgets, and workflows unless the owner explicitly approves a change.
- Do not touch Ripon's GHL → Stape → Meta CAPI pipeline.
- Never present hypothetical business figures as real.
