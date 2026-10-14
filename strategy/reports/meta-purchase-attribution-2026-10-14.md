# Meta purchase attribution check, Oct 14 2026

Question: Muse says Meta links zero purchases to the campaigns. Did the campaigns produce no sales, or is something broken?

## Answer: something is broken. The campaigns did produce sales.

## What the data shows (Windsor, read only)

**Meta, last 30 days**

| Campaign | Spend | Leads | Purchases (7 day click) | Purchases (28 day click) |
|---|---|---|---|---|
| New Dog Ad Vid/Image | $1,174 | 59 | 0 | 0 |
| FPI Round 1 Concept Test Oct 2026 | $254.52 | 15 | 0 | 0 |

**GHL Won opportunities with Meta Purchase Sent = yes, from Facebook Lead Form leads**

| Client | Lead created | Won | Value |
|---|---|---|---|
| Maylin (plus Mishu booking, same contact) | Oct 7 | Oct 9 | $240 + $175 |
| Yoklot | Sep 29 | Oct 9 | $360 |
| Kevin | Sep 25 | Oct 10 | $160 |
| Rebecca | Sep 17 | Oct 10 | $360 |
| Fabluc1 (tagged New Dog Ad Vid/Image) | May 28 | Oct 9 | $230 |

Maylin, Yoklot and Kevin closed inside Meta's 28 day click window, and Maylin closed inside the 7 day window. About $1,300 came from campaign leads. Meta should show at least one purchase. It shows zero.

Roughly 25 Won opportunities have been flagged "Meta Purchase Sent = yes" since Oct 8. GHL is firing. Meta is not crediting any of it.

## Muse's theory is aimed at the wrong place

- Purchases do not reach Meta from the Bookings tab. They go from GHL to Meta through CAPI (Conversions API) when an opportunity moves to Won. Matching uses the GHL contact's email and phone.
- The GHL contacts above all have an email and a phone. The 16% email fill rate on the Bookings tab is a sheet hygiene issue. It is not the attribution break.
- The intake form writes to a different spreadsheet (tab "NEW ENGLISH FORMS"). The Bookings tab only gets owner and email when a row syncs.

## Most likely cause, in order

1. **Lead ads need lead_id to attribute a sale.** These clients never visited the website. They filled a form inside Facebook. A website style Purchase with only email and phone often cannot tie back to the lead ad click. Meta's fix is the Conversion Leads (CRM) setup: send the Purchase with the Meta `lead_id`, `action_source = system_generated`, to the dataset connected to the lead form.
2. **Event received but not matched.** "Meta Purchase Sent = yes" only proves GHL fired. Check Events Manager for Oct 9 and 10 Purchase events, and their Event Match Quality (Meta's 1 to 10 score for how well an event's customer data matches a Meta user).
3. **Wrong dataset or pixel.** The event lands on a pixel the ad account is not optimizing toward.

## Repeat client noise

Most "yes" rows are repeat or Google clients (Balogee, Tyson, Oreo Castro, Karen Peña). Sending those is fine. They will never attribute to Meta ads, so do not judge Meta's ROAS (return on ad spend: revenue Meta credits divided by spend) on the raw count of 35.

## Guardrail

Ripon's Meta setup stays unchanged. Codex diagnoses in Events Manager and reports. No edits to the CAPI workflow or the pixel without Alex approving the specific change.

## Owner

Codex: Eden board row "Meta purchases not attributing to campaigns".

## Follow up: "update the offline upload to hash email and phone" (Oct 14, Muse's ask)

Checked. There is no upload that reads the Bookings tab.
- Pipeline (Ripon, Oct 9 and 10): GHL opportunity Won, webhook, Stape server GTM (GTM-WRWT22H3), Meta CAPI to dataset "Offline Conversion- FourPaws". Event carries lead ID, hashed email, phone, first and last name, city, state, zip, country, event ID = opportunity ID. See `strategy/operating-system/conversion-tracking-fix.md`.
- Keys come from the GHL contact, not the sheet. GHL Won opportunities with Meta Purchase Sent = yes since Oct 8: 25. Both email and phone: 23. One key only: 2 (Ollie, no email; Oreo Oct 8, no phone). Neither: 0. So the 16% email fill on the Bookings tab does not reach Meta.
- The other "offline conversions" sheet (`FPI | Booked Customer Offline Conversions`) feeds Google Ads, not Meta.
- Rule: Claude and Codex do not change Ripon's Meta setup. No code change made.

Open, and the real test: Event Match Quality and lead ID match rate on the Oct 9 to 13 Purchase events. Alex or Ripon reads it in Events Manager (Claude has no Events Manager access).
