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

## Oct 14 evening: Event Match Quality checked (Muse, Events Manager)

Purchase 6.4/10, QualifiedLead 6.6/10. Email 90 to 100%, phone 100%, lead ID 100% matched. Real time. Plumbing passes the bar.

Claude recheck (Windsor, last 30 days, both campaigns): offline purchases 0, omni purchases 0, purchases 0.

Why "outside the window" does not explain all of it:
- Of the 25 events, only 5 came from Facebook lead forms. The other 20 are repeat, Google or referral clients and will never attribute to an ad. Expected.
- Maylin: lead Oct 7, Won Oct 9 ($240 plus $175). Inside the 7 day click window, lead ID matched, still 0. That is the one case that should show.
- Widening the window is not available: Meta's longest click window is 7 days, and it is an ad set setting, not part of Ripon's setup.

Next test: Maylin. In Events Manager, open her Oct 9 Purchase (event ID = opportunity ID) and confirm lead ID matched. In Ads Manager, check which form and ad her Oct 7 lead came from. If it came from a current ad and the event matched, Ripon asks Meta support why it is not credited. If her lead came from an organic or old form, nothing is broken.

## Maylin trace (Muse, Oct 14 night): root cause found

Maylin came in through the external booking form "four-paws-inn-boarding-request" on four-paws-booking.vibepreview.com, Oct 6 about 10:03 PM ET (cat boarding Oct 7 to 12). Not a Meta instant form. GHL attribution is empty: no ad ID, no UTMs, session "Direct traffic". GHL fields meta_fbc and meta_fbp exist but are empty.

Read: the Purchase reached Meta with good contact data but no click identity, so Meta had nothing to tie it to an ad. Scope: this applies to bookings that start on the website form. Of the 25 events, 20 are repeat, Google or referral clients and would not attribute anyway; instant form leads carry the lead ID and are fine inside the window.

Fix (website, not Ripon's pipeline):
1. Booking site: on landing, read fbclid from the URL and build fbc = fb.1.<ms timestamp>.<fbclid>; read the _fbp cookie; read utm_source, utm_medium, utm_campaign, utm_content, utm_term. Keep them for the session and send them as hidden fields with the form into GHL: meta_fbc, meta_fbp, and the UTM fields.
2. Meta ads: add URL parameters on every ad that links to the site: utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.id}}. Ads change, needs Alex's OK.
3. Ripon (question only): confirm the Won Purchase tag sends fbc and fbp from GHL when present. No change by Claude or Codex.
Also check: ads and links should point to the live booking domain, not a vibepreview preview URL.
Test: click a live ad, submit a test booking, confirm meta_fbc and UTMs fill on the GHL contact.
