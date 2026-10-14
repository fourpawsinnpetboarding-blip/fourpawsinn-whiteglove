# Usage: python3 -I lead_activity_audit.py <dir with opps_open.json, conversations.json, contacts.json>
# Read-only. Inputs are Windsor GHL get_data JSON pulls (no names, phones, emails or message bodies requested).
# Outputs summary.json and part_b_sample.csv (opportunity IDs only) into the input dir.
import json, sys, random, collections, csv
from datetime import datetime, timezone
D = sys.argv[1]
AS_OF = datetime(2026, 10, 14, tzinfo=timezone.utc)
NEW_LEAD = '36cff656-a9d2-4e60-b491-f6fc00531cab'
def load(n): return json.load(open(f'{D}/{n}.json'))['result']
def dt(s):
    if not s: return None
    s = str(s).replace('Z', '+00:00')
    try:
        d = datetime.fromisoformat(s)
    except ValueError:
        d = datetime.fromisoformat(s[:10])
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)
opps = [o for o in load('opps_open') if o['opportunity_pipeline_stage_id'] == NEW_LEAD]
convs = collections.defaultdict(list)
for c in load('conversations'): convs[c['conversation_contact_id']].append(c)
contacts = {c['contact_id']: c for c in load('contacts')}
# Test exclusion: checked separately with a live filter (open opportunities whose source contains "test").
# On 2026-10-14 that returned zero rows, so no exclusion is applied here. Re-check on each run.
test_ids = set()
rows = []
for o in opps:
    cid = o['opportunity_contact_id']; ct = contacts.get(cid, {}); cv = convs.get(cid, [])
    created = dt(o['opportunity_created_at'])
    last = max(cv, key=lambda c: c['conversation_last_message_date'] or '') if cv else {}
    arrival = dt(ct.get('contact_arrival_date')) or dt(ct.get('contact_dropoff_date'))
    r = dict(
        opportunity_id=o['opportunity_id'], created_month=created.strftime('%Y-%m'),
        contact_found=bool(ct), conversation_found=bool(cv), n_threads=len(cv),
        last_dir=last.get('conversation_last_message_direction') or '',
        last_type=last.get('conversation_last_message_type') or '',
        last_outbound_action=last.get('conversation_last_outbound_message_action') or '',
        manual_msg_ever=any(c.get('conversation_last_manual_message_date') for c in cv),
        unread=sum(int(c.get('conversation_unread_count') or 0) for c in cv),
        days_since_last_msg=(AS_OF - dt(last['conversation_last_message_date'])).days if last else None,
        stage_changed_after_create=(dt(o['opportunity_last_stage_change_at']) or created) > created,
        dnd=ct.get('contact_dnd'),
        boarding_timeline=ct.get('contact_boarding_timeline') or '',
        travel_season=ct.get('contact_typical_travel_season') or '',
        arrival_future=bool(arrival and arrival >= AS_OF),
        arrival_past=bool(arrival and arrival < AS_OF),
        has_booking_field=bool(ct.get('contact_last_booking_date')) or int(ct.get('contact_total_bookings') or 0) > 0,
        is_test=o['opportunity_id'] in test_ids)
    # buckets (not mutually exclusive; flags, not conclusions)
    r['b_future_date'] = r['arrival_future']
    r['b_future_intent'] = (not r['arrival_future']) and (r['boarding_timeline'] in ('Future trip / not sure yet', 'This summer') or bool(r['travel_season']))
    r['b_possible_stale_stage'] = r['has_booking_field'] or r['arrival_past']
    r['b_unread'] = r['unread'] > 0
    r['b_last_msg_inbound'] = r['last_dir'] == 'inbound'
    r['b_no_outbound_visible'] = r['conversation_found'] and not r['manual_msg_ever'] and r['last_outbound_action'] != 'automated'
    r['b_manual_review'] = (not r['conversation_found']) or (not r['contact_found']) or r['b_last_msg_inbound'] or r['b_no_outbound_visible'] or r['dnd'] is True or r['is_test']
    rows.append(r)
def cnt(k): return sum(1 for r in rows if r[k])
summary = dict(
    new_lead_opps=len(rows), test_labelled=cnt('is_test'),
    contact_record_found=cnt('contact_found'), conversation_thread_found=cnt('conversation_found'),
    no_thread_visible=len(rows) - cnt('conversation_found'),
    human_message_ever_recorded=cnt('manual_msg_ever'),
    last_outbound_action=collections.Counter(r['last_outbound_action'] or 'none_recorded' for r in rows),
    last_message_direction=collections.Counter(r['last_dir'] or 'none_recorded' for r in rows),
    last_message_type=collections.Counter(r['last_type'] or 'none_recorded' for r in rows),
    days_since_last_message=collections.Counter(('none' if r['days_since_last_msg'] is None else '0-14' if r['days_since_last_msg'] <= 14 else '15-45' if r['days_since_last_msg'] <= 45 else '46-90' if r['days_since_last_msg'] <= 90 else '90+') for r in rows),
    stage_ever_changed_after_creation=cnt('stage_changed_after_create'),
    dnd_true=sum(1 for r in rows if r['dnd'] is True),
    buckets={k: cnt(k) for k in ['b_future_date', 'b_future_intent', 'b_possible_stale_stage', 'b_unread', 'b_last_msg_inbound', 'b_no_outbound_visible', 'b_manual_review']},
    boarding_timeline=collections.Counter(r['boarding_timeline'] or 'blank' for r in rows),
    by_month=collections.Counter(r['created_month'] for r in rows))
# Part B sample: stratified by creation month, proportional (largest remainder), fixed seed, test rows excluded
SEED, N = 20261014, 30
pool = [r for r in rows if not r['is_test']]
bym = collections.defaultdict(list)
for r in sorted(pool, key=lambda r: r['opportunity_id']): bym[r['created_month']].append(r)
quota = {m: N * len(v) / len(pool) for m, v in bym.items()}
alloc = {m: int(q) for m, q in quota.items()}
for m in sorted(quota, key=lambda m: quota[m] - alloc[m], reverse=True)[:N - sum(alloc.values())]: alloc[m] += 1
rng = random.Random(SEED); sample = []
for m in sorted(bym): sample += rng.sample(bym[m], alloc[m])
summary['part_b'] = dict(seed=SEED, method='stratified by creation month, proportional allocation, largest remainder; IDs sorted before sampling; test-labelled excluded', allocation=alloc, sample_bucket_counts={k: sum(1 for r in sample if r[k]) for k in summary['buckets']})
json.dump(summary, open(f'{D}/summary.json', 'w'), indent=1, default=str)
with open(f'{D}/part_b_sample.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['opportunity_id', 'created_month'])
    for r in sample: w.writerow([r['opportunity_id'], r['created_month']])
with open(f'{D}/rows.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
print(json.dumps(summary, indent=1, default=str))
