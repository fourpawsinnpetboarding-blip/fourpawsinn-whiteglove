# Stagnant lead follow up process (Alex, Nov 2, 2026)

Alex: "Go through all the GHL leads I communicated with. They're sitting stagnant, and I need to personally follow up with all of them." The GHL automated follow ups are generic; these are personal.

## How the list is built (Claude, via Windsor, read only)
1. Pull GHL conversations from the last 90 days where a person sent at least one message (conversation_last_manual_message_date not empty).
2. Remove: booked clients (tags booked, active-client, deposit-paid, monthly-perks-member, or total bookings above 0), Do Not Disturb, internal or test contacts, and anyone active in the last 2 days.
3. Split: (a) the lead wrote last and nobody answered: do these first; (b) we wrote last and they went quiet.
4. Draft one personal text per lead from their last message: answer their question first, sales order, no prices unless the two price rule is followed, honest holiday line only when true.
5. NEVER text anyone who replied STOP or declined. Codex sets them to Do Not Disturb.

## Privacy rule
Lead names and phone numbers stay out of this git repo. The working lists live in Claude's session scratchpad and in GHL itself.

## Nov 2 run
- 344 stagnant leads: 88 where the lead wrote last (11 STOP, 5 declined, 5 spam removed), 242 where we wrote last.
- Batch 1 (about 45 personal texts) handed to Alex Nov 2. Batch 2: the 30 newest "we wrote last" leads, Nov 3.

## Rules from Alex (Nov 2)
- Before texting a stagnant lead, check the thread was not moved to another channel. Some conversations were transferred (example: a lead whose form we already had). When unsure, ask Alex.
- Texts are very short and personal: 1 or 2 lines, their name, their dog's name, one question. Claude writes them; Alex sends.

## How Alex sends a batch (10 minutes for 20 texts)
1. Open GHL, then Conversations.
2. Search the person's name.
3. Paste the text from the batch file, check the name, send.
4. Next. When someone replies, screenshot it to Claude for the next message.

## Exception (Alex, Nov 2): Codex sends batch 1
Alex chose option A: Codex sends batch 1 from GHL, one person at a time, exactly as written, skip list honored. One time exception to "Codex never texts leads"; future batches need Alex's yes again. Replies come back to Claude for the next message; Codex never quotes prices or confirms availability. Eden row: "SEND: stagnant lead follow up texts, batch 1".
