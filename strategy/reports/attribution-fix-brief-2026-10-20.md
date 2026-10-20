# Fix brief: booking attribution and QualifiedLead match quality (Oct 20, 2026)

Source: Baxter (Muse), from live Meta Ads and HighLevel data. Saved by Claude.

## Part A: booking form (four-paws-booking.vibepreview.com), owner: whoever builds the site
1. On every page load, read fbclid, gclid and utm_source, utm_medium, utm_campaign, utm_content and utm_term from the URL. Store them in sessionStorage plus a first party cookie (about 90 days).
2. Build fbc = "fb.1." + landing unix timestamp + "." + fbclid. Read the _fbp cookie if it's there.
3. On submit, send hidden fields into these HighLevel contact custom fields: fpi_fbc, fpi_fbp, fpi_gclid, fpi_utm_source, fpi_utm_medium, fpi_utm_campaign, fpi_utm_content, fpi_utm_term.
4. Test: open the site with ?fbclid=test123&utm_source=facebook&utm_campaign=test, submit a test lead, and confirm the fields show up on the HighLevel contact.

## Part B: Conversions API, owner: Ripon
1. QualifiedLead match quality fell from 6.6 to 5.4. Email and phone coverage dropped from 100% to 60%. Restore full coverage.
2. Once Part A is live, add fbc and fbp to user_data on the Purchase event (and QualifiedLead if it's easy).

## Codex (prep)
Create the 8 custom contact fields in HighLevel before the site change, so the form has somewhere to write.

## Fixed means
- A test lead shows fpi_fbc and the UTMs on the contact.
- QualifiedLead match quality is above 6.0.
- Won bookings show as attributed purchases in Ads Manager.
- Bonus: gclid on each contact lets Google Ads import booked clients as offline conversions, which helps the Performance Max engine.
