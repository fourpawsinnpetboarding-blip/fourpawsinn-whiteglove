# Codex prompt: connect Windsor.ai (Meta Ads data)

Paste everything inside the block into Codex on Alex's Mac.

```
Connect yourself to my Windsor.ai account so you can read my Four Paws Inn Meta Ads data.

1. Add the Windsor.ai remote MCP server to my Codex config at ~/.codex/config.toml:

   [mcp_servers.windsor]
   url = "https://mcp.windsor.ai/"

   If a [mcp_servers.windsor] block already exists, do not duplicate it.

2. Run: codex mcp login windsor
   It opens a browser for OAuth. Tell me when to sign in. Do not ask me for an API key and never paste or store a key in any file or chat.

3. Restart if needed, then test with read only calls:
   - list connected connectors and accounts
   - pull Meta Ads ("facebook" connector), account 942706665029521 ("Four Paws Inn Ads 2"),
     last 7 days by ad name: spend, impressions, frequency, ctr, actions_lead, cost_per_action_type_lead.
   Show me the table.

Rules, permanent:
- Read only. Never call execute_action or any write action (pause, enable, create, budget) unless I approve that exact change in this chat.
- Judge ads using strategy/meta-ad-review-playbook.md in the fourpawsinn-whiteglove repo. Log reviews there, not in a new file.
- Claude Code already reads this same Windsor account. Before writing a review, read the latest entry in the review log so you do not duplicate or contradict it.
```
