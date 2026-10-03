# Codex prompt: build the inbound tracking pipeline in GHL

Paste the block into Codex.

```
Read strategy/operating-system/inbound-tracking.md in the fourpawsinn-whiteglove repo. It is the spec.

Build it in GoHighLevel as DRAFTS. Do not publish, activate, or send anything. Do not message any contact.

1. Create pipeline "Inbound" with stages: New Lead, Qualified, Unqualified, Booked, Lost.
2. Create opportunity custom fields: Channel (dropdown, values from the spec), First Contact Date, Booked Date, Unqualified Reason (dropdown, values from the spec).
3. Draft workflow "INBOUND | Capture": triggers for every channel in section 3 of the spec. Find or create the contact, skip if they already have an open Inbound opportunity, create the opportunity in New Lead, set Channel and First Contact Date. It must not send any message. It runs beside the existing FPI conversion workflows, it does not replace them.
4. Draft workflow "INBOUND | CallRail": Inbound Webhook trigger for CallRail post call and call modified events. Map caller phone, tracking number (to Channel), and the CallRail qualification tag to the stage.
5. Draft workflow "INBOUND | Auto Lost": opportunities in Qualified for 30 days with no Booked move to Lost.
6. Give me the Inbound Webhook URL for CallRail, and list every trigger, filter and action you created so I can review before publishing.
```
