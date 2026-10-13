# Lead handling: what is automatic, what is still manual (Oct 13, 2026)

Alex, Oct 13: "This is a lot of manual work which I will do. But anything that can be automated we must automate."
Rule that stays: no AI writes or sends conversational texts. Approved templates and tags can be automatic.

## Already automatic (live)
1. First text, 90 seconds after the Meta form (v4 Friendly, v6 Selective and Not good once Codex swaps them).
2. 3 hour no reply follow up.
3. First Overnight Nurture: 7 texts over 20 days for leads without dates. Stops on reply, booking or Won.
4. Tag `boarding-ready-offered` on entry to the nurture (VERIFY it is on the live build).
5. Reply alert to Alex and Amanda.

## Codex builds next (in this order)
1. **Saved replies (GHL snippets), so a human reply is 2 taps:**
   - "First overnight" = Script A (`content/sales/boarding-ready-scripts.md`), with [Dog] left for the sender to type.
   - "Quick call?" = "Want me to give you a quick call? I can answer any questions about [Dog]'s stay in 2 minutes."
   - "Dates received" = from `dates-by-text-first.md`.
2. **Auto tag `trial-booked`** when the first overnight is paid (GHL payment or invoice paid, or the money sheet Trial flag, row 6ca5883d). No hand tagging.
3. **Auto tag the speed to lead test:** when an outbound call is logged on a new lead, compare to the form time. Within 5 minutes = `called-under-5`, later = `called-late`. If GHL cannot trigger on calls, tell Claude, and Claude counts call times from the GHL call log on Mondays instead. Alex never tags calls by hand.
4. **Auto save the dog name:** if possible, when a lead answers Text 1, put the reply in the Dog Name field (only when the reply is one or two words). If not reliable, skip.

## Still manual (needs a person, on purpose)
1. Reading a reply and choosing the right saved reply.
2. The 5 minute call.
3. `trial-passed` or `trial-not-approved` after pick up (Amanda's judgment).
