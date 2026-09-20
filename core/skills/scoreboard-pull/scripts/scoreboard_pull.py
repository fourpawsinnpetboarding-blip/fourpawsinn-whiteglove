#!/usr/bin/env python3
"""Read-only paid and organic performance scoreboard collector."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

USER_AGENT = "scoreboard-pull/1.0"


class ApiError(RuntimeError):
    pass


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def request_json(source: str, url: str, *, method: str = "GET", headers: dict[str, str] | None = None, body: dict[str, Any] | None = None, attempts: int = 3) -> Any:
    payload = None if body is None else json.dumps(body).encode("utf-8")
    request_headers = {"User-Agent": USER_AGENT, "Accept": "application/json", **(headers or {})}
    if payload is not None:
        request_headers["Content-Type"] = "application/json"
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, data=payload, headers=request_headers, method=method)
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as exc:
            raw = exc.read().decode("utf-8", "replace")
            try:
                detail = json.loads(raw)
                error = detail.get("error")
                message = error.get("message") if isinstance(error, dict) else detail.get("message")
                message = message or raw[:500]
            except json.JSONDecodeError:
                message = raw[:500] or str(exc.reason)
            if (exc.code == 429 or exc.code >= 500) and attempt + 1 < attempts:
                time.sleep(2**attempt)
                continue
            raise ApiError(f"{source}: HTTP {exc.code}: {message}") from exc
        except (urllib.error.URLError, TimeoutError) as exc:
            if attempt + 1 < attempts:
                time.sleep(2**attempt)
                continue
            raise ApiError(f"{source}: network error: {exc}") from exc
    raise ApiError(f"{source}: request failed")


def form_post(source: str, url: str, values: dict[str, str]) -> Any:
    req = urllib.request.Request(url, data=urllib.parse.urlencode(values).encode(), headers={"User-Agent": USER_AGENT, "Content-Type": "application/x-www-form-urlencoded"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", "replace")
        try:
            message = json.loads(raw).get("error_description") or raw[:500]
        except json.JSONDecodeError:
            message = raw[:500]
        raise ApiError(f"{source}: HTTP {exc.code}: {message}") from exc


def missing(names: list[str]) -> list[str]:
    return [name for name in names if not os.getenv(name)]


def as_float(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def safe_ratio(numerator: float | None, denominator: float | None) -> float | None:
    return None if numerator is None or denominator is None or denominator <= 0 else numerator / denominator


def csv_set(name: str, default: str) -> set[str]:
    return {part.strip().lower() for part in os.getenv(name, default).split(",") if part.strip()}


@dataclass(frozen=True)
class Window:
    days: int
    start: str
    end: str


def windows(timezone: str, today: date | None = None) -> dict[str, Window]:
    local_today = today or datetime.now(ZoneInfo(timezone)).date()
    end = local_today - timedelta(days=1)
    return {str(days): Window(days, (end - timedelta(days=days - 1)).isoformat(), end.isoformat()) for days in (7, 30)}


def unavailable(reason: str) -> dict[str, str]:
    return {"status": "unavailable", "reason": reason}


def failed(exc: Exception) -> dict[str, str]:
    return {"status": "error", "reason": str(exc)}


def paid_window(spend: float, leads: float, customers: float, period: Window) -> dict[str, Any]:
    return {"start": period.start, "end": period.end, "spend": spend, "leads": leads, "customers": customers, "cpl": safe_ratio(spend, leads), "cac": safe_ratio(spend, customers)}


def meta_action_total(row: dict[str, Any], wanted: set[str]) -> float:
    return sum(as_float(action.get("value")) for action in row.get("actions", []) if str(action.get("action_type", "")).lower() in wanted)


def pull_meta(periods: dict[str, Window]) -> dict[str, Any]:
    absent = missing(["META_ACCESS_TOKEN", "META_AD_ACCOUNT_ID"])
    if absent:
        return unavailable("Missing " + ", ".join(absent))
    version = os.getenv("META_API_VERSION", "v23.0")
    token = os.environ["META_ACCESS_TOKEN"]
    account = "act_" + re.sub(r"\D", "", os.environ["META_AD_ACCOUNT_ID"])
    lead_types = csv_set("META_LEAD_ACTION_TYPES", "lead,onsite_conversion.lead_grouped")
    customer_types = csv_set("META_CUSTOMER_ACTION_TYPES", "purchase,omni_purchase")
    result: dict[str, Any] = {"status": "ok", "account_id": account, "windows": {}}
    for key, period in periods.items():
        params = {"fields": "spend,actions", "level": "account", "time_range": json.dumps({"since": period.start, "until": period.end}, separators=(",", ":")), "access_token": token}
        url = f"https://graph.facebook.com/{version}/{account}/insights?{urllib.parse.urlencode(params)}"
        data = request_json("Meta Ads", url)
        row = (data.get("data") or [{}])[0]
        result["windows"][key] = paid_window(as_float(row.get("spend")), meta_action_total(row, lead_types), meta_action_total(row, customer_types), period)
    return result


def google_access_token() -> str:
    absent = missing(["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN"])
    if absent:
        raise ApiError("Google OAuth: missing " + ", ".join(absent))
    data = form_post("Google OAuth", "https://oauth2.googleapis.com/token", {"client_id": os.environ["GOOGLE_CLIENT_ID"], "client_secret": os.environ["GOOGLE_CLIENT_SECRET"], "refresh_token": os.environ["GOOGLE_REFRESH_TOKEN"], "grant_type": "refresh_token"})
    if not data.get("access_token"):
        raise ApiError("Google OAuth: response contained no access_token")
    return str(data["access_token"])


def google_ads_search(token: str, query: str) -> list[dict[str, Any]]:
    absent = missing(["GOOGLE_ADS_CUSTOMER_ID"])
    if absent:
        raise ApiError("Google Ads: missing " + ", ".join(absent))
    customer = re.sub(r"\D", "", os.environ["GOOGLE_ADS_CUSTOMER_ID"])
    headers = {"Authorization": f"Bearer {token}"}
    legacy_developer_token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")
    if legacy_developer_token:
        headers["developer-token"] = legacy_developer_token
    login = re.sub(r"\D", "", os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID", ""))
    if login:
        headers["login-customer-id"] = login
    version = os.getenv("GOOGLE_ADS_API_VERSION", "v25")
    url = f"https://googleads.googleapis.com/{version}/customers/{customer}/googleAds:searchStream"
    chunks = request_json("Google Ads", url, method="POST", headers=headers, body={"query": query})
    return [row for chunk in chunks for row in chunk.get("results", [])]


def pull_google_ads(periods: dict[str, Window], token: str) -> dict[str, Any]:
    lead_pattern = re.compile(os.getenv("GOOGLE_ADS_LEAD_ACTION_PATTERN", r"lead|form|call"), re.I)
    customer_pattern = re.compile(os.getenv("GOOGLE_ADS_CUSTOMER_ACTION_PATTERN", r"purchase|booking|booked|sale"), re.I)
    result: dict[str, Any] = {"status": "ok", "windows": {}}
    for key, period in periods.items():
        totals = google_ads_search(token, f"SELECT metrics.cost_micros FROM customer WHERE segments.date BETWEEN '{period.start}' AND '{period.end}'")
        spend = sum(as_float(row.get("metrics", {}).get("costMicros")) for row in totals) / 1_000_000
        rows = google_ads_search(token, f"SELECT segments.conversion_action_name, metrics.conversions FROM customer WHERE segments.date BETWEEN '{period.start}' AND '{period.end}' AND metrics.conversions > 0")
        leads = customers = 0.0
        unmatched: list[dict[str, Any]] = []
        for row in rows:
            name = str(row.get("segments", {}).get("conversionActionName", ""))
            value = as_float(row.get("metrics", {}).get("conversions"))
            if customer_pattern.search(name):
                customers += value
            elif lead_pattern.search(name):
                leads += value
            else:
                unmatched.append({"name": name, "conversions": value})
        result["windows"][key] = {**paid_window(spend, leads, customers, period), "unmatched_conversions": unmatched}
    return result


def google_report(source: str, token: str, url: str, body: dict[str, Any]) -> Any:
    return request_json(source, url, method="POST", headers={"Authorization": f"Bearer {token}"}, body=body)


def pull_ga4(periods: dict[str, Window], token: str) -> dict[str, Any]:
    if missing(["GA4_PROPERTY_ID"]):
        return unavailable("Missing GA4_PROPERTY_ID")
    prop = re.sub(r"\D", "", os.environ["GA4_PROPERTY_ID"])
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{prop}:runReport"
    result: dict[str, Any] = {"status": "ok", "property_id": prop, "sessions": {}}
    for key, period in periods.items():
        data = google_report("GA4", token, url, {"dateRanges": [{"startDate": period.start, "endDate": period.end}], "metrics": [{"name": "sessions"}]})
        rows = data.get("rows", [])
        result["sessions"][key] = as_float(rows[0]["metricValues"][0]["value"]) if rows else 0.0
    period = periods["30"]
    pages = google_report("GA4", token, url, {"dateRanges": [{"startDate": period.start, "endDate": period.end}], "dimensions": [{"name": "pagePath"}, {"name": "pageTitle"}], "metrics": [{"name": "sessions"}], "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}], "limit": "10"})
    result["top_pages"] = [{"path": row["dimensionValues"][0]["value"], "title": row["dimensionValues"][1]["value"], "sessions": as_float(row["metricValues"][0]["value"])} for row in pages.get("rows", [])]
    return result


def pull_search_console(periods: dict[str, Window], token: str) -> dict[str, Any]:
    if missing(["SEARCH_CONSOLE_SITE_URL"]):
        return unavailable("Missing SEARCH_CONSOLE_SITE_URL")
    site = os.environ["SEARCH_CONSOLE_SITE_URL"]
    url = "https://searchconsole.googleapis.com/webmasters/v3/sites/" + urllib.parse.quote(site, safe="") + "/searchAnalytics/query"
    result: dict[str, Any] = {"status": "ok", "site_url": site, "clicks": {}}
    for key, period in periods.items():
        data = google_report("Search Console", token, url, {"startDate": period.start, "endDate": period.end, "rowLimit": 1})
        result["clicks"][key] = sum(as_float(row.get("clicks")) for row in data.get("rows", []))
    period = periods["30"]
    data = google_report("Search Console", token, url, {"startDate": period.start, "endDate": period.end, "dimensions": ["query"], "rowLimit": 10, "dataState": "final"})
    result["top_queries"] = [{"query": (row.get("keys") or [""])[0], "clicks": as_float(row.get("clicks")), "impressions": as_float(row.get("impressions"))} for row in data.get("rows", [])]
    return result


def combined_paid(sources: dict[str, Any], periods: dict[str, Window]) -> dict[str, Any]:
    output: dict[str, Any] = {}
    for key, period in periods.items():
        rows = [sources[name].get("windows", {}).get(key) for name in ("meta_ads", "google_ads") if sources[name].get("status") == "ok"]
        rows = [row for row in rows if row]
        spend = sum(row["spend"] for row in rows) if rows else None
        leads = sum(row["leads"] for row in rows) if rows else None
        customer_raw = os.getenv(f"SCOREBOARD_CUSTOMERS_{key}D")
        customers = as_float(customer_raw) if customer_raw not in (None, "") else None
        output[key] = {"start": period.start, "end": period.end, "spend": spend, "leads": leads, "customers": customers, "cpl": safe_ratio(spend, leads), "cac": safe_ratio(spend, customers)}
    return output


def money(value: float | None) -> str:
    return "Unavailable" if value is None else f"${value:,.2f}"


def number(value: float | None) -> str:
    if value is None:
        return "Unavailable"
    return f"{value:,.0f}" if float(value).is_integer() else f"{value:,.2f}"


def render_markdown(report: dict[str, Any]) -> str:
    lines = [f"# Performance scoreboard — {report['generated_at'][:10]}", "", f"Completed-day windows in {report['timezone']}.", "", "## Paid acquisition", "", "| Source | Window | Spend | Leads | CPL | Customers | CAC |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for source_name, label in (("meta_ads", "Meta Ads"), ("google_ads", "Google Ads"), ("combined_paid", "Combined")):
        source = report["sources"].get(source_name, {}) if source_name != "combined_paid" else {"status": "ok", "windows": report["combined_paid"]}
        for key in ("7", "30"):
            row = source.get("windows", {}).get(key) if source.get("status") == "ok" else None
            if row:
                lines.append(f"| {label} | {key} days | {money(row.get('spend'))} | {number(row.get('leads'))} | {money(row.get('cpl'))} | {number(row.get('customers'))} | {money(row.get('cac'))} |")
            else:
                lines.append(f"| {label} | {key} days | Unavailable | Unavailable | Unavailable | Unavailable | Unavailable |")
    ga4 = report["sources"]["ga4"]
    lines += ["", "## Website", "", f"GA4 sessions, 7 days: {number(ga4.get('sessions', {}).get('7') if ga4.get('status') == 'ok' else None)}", f"GA4 sessions, 30 days: {number(ga4.get('sessions', {}).get('30') if ga4.get('status') == 'ok' else None)}", "", "### Top pages, 30 days", "", "| Page | Sessions |", "| --- | ---: |"]
    for row in ga4.get("top_pages", []):
        lines.append(f"| {row['path']} | {number(row['sessions'])} |")
    if not ga4.get("top_pages"):
        lines.append("| Unavailable | Unavailable |")
    sc = report["sources"]["search_console"]
    lines += ["", "## Organic search", "", f"Search clicks, 7 days: {number(sc.get('clicks', {}).get('7') if sc.get('status') == 'ok' else None)}", f"Search clicks, 30 days: {number(sc.get('clicks', {}).get('30') if sc.get('status') == 'ok' else None)}", "", "### Top queries, 30 days", "", "| Query | Clicks | Impressions |", "| --- | ---: | ---: |"]
    for row in sc.get("top_queries", []):
        lines.append(f"| {row['query']} | {number(row['clicks'])} | {number(row['impressions'])} |")
    if not sc.get("top_queries"):
        lines.append("| Unavailable | Unavailable | Unavailable |")
    lines += ["", "## Coverage", ""]
    for key, label in (("meta_ads", "Meta Ads"), ("google_ads", "Google Ads"), ("ga4", "GA4"), ("search_console", "Search Console")):
        source = report["sources"][key]
        detail = "" if source["status"] == "ok" else f": {source.get('reason', 'Unknown error')}"
        lines.append(f"- {label}: {source['status']}{detail}")
    lines += ["", "CAC is shown only when a verified customer count exists. Platform conversions are not assumed to be deduplicated customers."]
    return "\n".join(lines) + "\n"


def run(env_file: Path) -> dict[str, Any]:
    load_env(env_file)
    timezone = os.getenv("SCOREBOARD_TIMEZONE", "America/New_York")
    periods = windows(timezone)
    sources: dict[str, Any] = {}
    try:
        sources["meta_ads"] = pull_meta(periods)
    except Exception as exc:
        sources["meta_ads"] = failed(exc)
    try:
        google_token = google_access_token()
        google_error = None
    except Exception as exc:
        google_token, google_error = None, failed(exc)
    for name, function in (("google_ads", pull_google_ads), ("ga4", pull_ga4), ("search_console", pull_search_console)):
        if google_token is None:
            sources[name] = dict(google_error or unavailable("Google OAuth unavailable"))
        else:
            try:
                sources[name] = function(periods, google_token)
            except Exception as exc:
                sources[name] = failed(exc)
    return {"generated_at": datetime.now(ZoneInfo(timezone)).isoformat(), "timezone": timezone, "windows": {key: vars(value) for key, value in periods.items()}, "sources": sources, "combined_paid": combined_paid(sources, periods)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env-file", type=Path, default=Path(".env"))
    parser.add_argument("--output-dir", type=Path, default=Path("scoreboard-output"))
    parser.add_argument("--stdout", choices=("markdown", "json", "none"), default="markdown")
    args = parser.parse_args()
    report = run(args.env_file)
    markdown = render_markdown(report)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    stamp = report["generated_at"][:10]
    json_text = json.dumps(report, indent=2, sort_keys=True) + "\n"
    for name, content in (("scoreboard-latest.md", markdown), ("scoreboard-latest.json", json_text), (f"scoreboard-{stamp}.md", markdown), (f"scoreboard-{stamp}.json", json_text)):
        (args.output_dir / name).write_text(content, encoding="utf-8")
    if args.stdout == "markdown":
        print(markdown, end="")
    elif args.stdout == "json":
        print(json_text, end="")
    return 0 if any(source.get("status") == "ok" for source in report["sources"].values()) else 2


if __name__ == "__main__":
    sys.exit(main())
