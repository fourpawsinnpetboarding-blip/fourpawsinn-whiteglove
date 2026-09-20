# Scoreboard configuration

Store real values only in the repo-root `.env`, which must remain gitignored. `.env.example` contains names and safe examples.

## Meta Ads

Required: `META_ACCESS_TOKEN` and `META_AD_ACCOUNT_ID` without the `act_` prefix. The token needs `ads_read`. Configure comma-separated action types with `META_LEAD_ACTION_TYPES` and `META_CUSTOMER_ACTION_TYPES` when the defaults do not match the account. `META_API_VERSION` defaults to `v23.0` and can be advanced independently of the code.

## Google OAuth

Google Ads, GA4, and Search Console share one refresh-token flow through `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN`.

Use only these scopes:

```text
https://www.googleapis.com/auth/adwords
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/webmasters.readonly
```

Google names the Ads scope `adwords`, but this collector calls only the reporting endpoint and contains no mutate operation.

## Google Ads

Required: `GOOGLE_ADS_CUSTOMER_ID`, digits only, plus an OAuth client whose Google Cloud project has Google Ads API access. Google sunset developer tokens on September 9, 2026, so `GOOGLE_ADS_DEVELOPER_TOKEN` is optional and retained only for legacy compatibility. `GOOGLE_ADS_LOGIN_CUSTOMER_ID` is optional for a manager account. `GOOGLE_ADS_API_VERSION` defaults to `v25`. Set `GOOGLE_ADS_LEAD_ACTION_PATTERN` and `GOOGLE_ADS_CUSTOMER_ACTION_PATTERN` as case-insensitive regular expressions matching conversion-action names. Unmatched conversions are reported but never forced into CPL or CAC.

## GA4

Required: `GA4_PROPERTY_ID`, digits only. The property must already exist and the OAuth user must have access. This skill never creates a property or installs a website tag.

## Search Console

Required: `SEARCH_CONSOLE_SITE_URL`, exactly as listed in Search Console. URL-prefix properties usually include the trailing slash.

## Combined CAC

Ad platforms do not reliably know whether a lead became a paying customer. Provide verified, deduplicated CRM new-customer counts with `SCOREBOARD_CUSTOMERS_7D` and `SCOREBOARD_CUSTOMERS_30D`. Without those values, combined CAC remains unavailable rather than being mislabeled.
