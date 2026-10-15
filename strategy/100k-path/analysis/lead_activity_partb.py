# Lead Activity Audit, Part B. Read only.
# Usage: python3 -I lead_activity_partb.py pull <outdir>    (GET requests to the GHL API v2 only)
#        python3 -I lead_activity_partb.py queue <outdir>   (offline: reply queue, New Lead opportunities where the lead had the last word)
#        python3 -I lead_activity_partb.py score <outdir>   (offline, from the pulled files)
# Auth: injected by the environment's network proxy for services.leadconnectorhq.com. No token is read here.
# Privacy: names, phones, emails and message bodies are never written. Inbound message bodies are reduced
# in memory to keyword flags (see FLAGS) and discarded.
# pull also writes opps_open.json, conversations.json, contacts.json in the Windsor field shape, so
# lead_activity_audit.py can re-run Part A and redraw the seeded sample from the same data.
import json, sys, os, re, time, collections, csv, urllib.request, urllib.error
from datetime import datetime, timezone, timedelta
from concurrent.futures import ThreadPoolExecutor

B = 'https://services.leadconnectorhq.com'
LOC = 'X6z5pwEuIxkAbcCUQ0Nv'
HDR = {'Version': '2021-07-28', 'Accept': 'application/json', 'User-Agent': 'fpi-lead-audit/1.0'}
NEW_LEAD = '36cff656-a9d2-4e60-b491-f6fc00531cab'
AS_OF = datetime(2026, 10, 14, tzinfo=timezone.utc)
CF = {'arrival_date': 'eXxMdYL1XuzmiUvU3aaT', 'dropoff_date': 'dAx6R1YK9Rj0pRJVIxuL',
      'boarding_timeline': 'hM9mot8lfOHqlnAT9l1V', 'typical_travel_season': 'rXUSefHPC5xKoRC6DYjG',
      'last_booking_date': 'GLpcTUoRa9EpCdtdmgOZ', 'total_bookings': 'sAKD3dUtfCn4z5NWzZBZ',
      'preferred_checkin_date': 'q5LHnQmrMKdsow3lMmwm'}
FLAGS = {
    'not_interested': r"not interested|no longer need|no thanks|no thank you|found (another|someone|a place)|went with|booked (somewhere|elsewhere|with another)|too (expensive|much)|out of (my )?budget|nevermind|never mind",
    'wrong_number': r"wrong number|who is this|don'?t know (you|who)|never (filled|signed up|requested)",
    'stop': r"^\s*(stop|unsubscribe|quit|cancel|end)\W*$",
    'future': r"next (month|year|week|time)|christmas|thanksgiving|holiday|new year|spring break|later (date|on|this)|in the future|not (sure|yet)|will (let you know|reach out|get back|contact)|keep (you|me) posted|haven'?t (booked|decided)",
    'booking_signal': r"deposit|booked|paid|see you|drop(ping)? (him|her|them|off)|confirm",
    'price_question': r"price|pric|cost|how much|rate",
}
REAL = {'TYPE_SMS': 'SMS', 'TYPE_EMAIL': 'email', 'TYPE_CALL': 'call', 'TYPE_FACEBOOK': 'DM', 'TYPE_INSTAGRAM': 'DM',
        'TYPE_WHATSAPP': 'DM', 'TYPE_GMB': 'DM', 'TYPE_LIVE_CHAT': 'DM', 'TYPE_WEBCHAT': 'DM', 'TYPE_TIKTOK': 'DM'}

def get(path, tries=6):
    for i in range(tries):
        try:
            req = urllib.request.Request(B + path, headers=HDR, method='GET')
            with urllib.request.urlopen(req, timeout=60) as r: return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and i < tries - 1: time.sleep(2 ** i); continue
            raise RuntimeError(f'GET {path.split("?")[0]} -> {e.code}')
        except (urllib.error.URLError, TimeoutError):
            if i < tries - 1: time.sleep(2 ** i); continue
            raise

def iso(v):
    if v in (None, ''): return None
    if isinstance(v, (int, float)) or str(v).isdigit(): return datetime.fromtimestamp(int(v) / 1000, timezone.utc).isoformat()
    return str(v)

def pull_opps():
    out, q = [], f'/opportunities/search?location_id={LOC}&limit=100'
    while True:
        d = get(q); out += d['opportunities']; m = d['meta']
        if not d['opportunities'] or not m.get('startAfterId'): break
        q = f'/opportunities/search?location_id={LOC}&limit=100&startAfter={m["startAfter"]}&startAfterId={m["startAfterId"]}'
        if len(out) >= m['total']: break
    return [dict(id=o['id'], contactId=o['contactId'], pipelineStageId=o['pipelineStageId'], status=o['status'],
                 createdAt=o['createdAt'], lastStageChangeAt=o.get('lastStageChangeAt'), source=o.get('source') or '') for o in out]

def flags(body):
    t = (body or '').lower()
    return [k for k, p in FLAGS.items() if re.search(p, t)]

def pull_contact(cid):
    c = get(f'/contacts/{cid}')['contact']
    cf = {f['id']: f.get('value') for f in c.get('customFields') or []}
    contact = dict(contact_id=cid, contact_dnd=c.get('dnd'), **{f'contact_{k}': cf.get(v) for k, v in CF.items()})
    convs, msgs = [], []
    for cv in get(f'/conversations/search?locationId={LOC}&contactId={cid}&limit=100')['conversations']:
        convs.append(dict(conversation_contact_id=cid, conversation_id=cv['id'],
                          conversation_last_message_date=iso(cv.get('lastMessageDate')),
                          conversation_last_message_direction=cv.get('lastMessageDirection'),
                          conversation_last_message_type=cv.get('lastMessageType'),
                          conversation_last_manual_message_date=iso(cv.get('lastManualMessageDate')),
                          conversation_last_outbound_message_action=cv.get('lastOutboundMessageAction'),
                          conversation_unread_count=cv.get('unreadCount')))
        last = None
        while True:
            d = get(f'/conversations/{cv["id"]}/messages?limit=100' + (f'&lastMessageId={last}' if last else ''))['messages']
            for m in d['messages']:
                call = (m.get('meta') or {}).get('call') or {}
                msgs.append(dict(contact_id=cid, id=m['id'], date=m.get('dateAdded'), direction=m.get('direction'),
                                 type=m.get('messageType'), source=m.get('source'), has_user=bool(m.get('userId')),
                                 status=m.get('status'), call_status=call.get('status'), call_duration=call.get('duration'),
                                 flags=flags(m.get('body')) if m.get('direction') == 'inbound' else []))
            if not d.get('nextPage') or not d['messages']: break
            last = d['lastMessageId']
    return contact, convs, msgs

def pull(D):
    os.makedirs(D, exist_ok=True)
    opps = pull_opps()
    json.dump(opps, open(f'{D}/opps_all.json', 'w'))
    open_ = [o for o in opps if o['status'] == 'open']
    json.dump({'result': [dict(opportunity_id=o['id'], opportunity_contact_id=o['contactId'], opportunity_pipeline_stage_id=o['pipelineStageId'],
                               opportunity_created_at=o['createdAt'], opportunity_last_stage_change_at=o['lastStageChangeAt'],
                               opportunity_source=o['source']) for o in open_]}, open(f'{D}/opps_open.json', 'w'))
    cids = sorted({o['contactId'] for o in open_ if o['pipelineStageId'] == NEW_LEAD})
    contacts, convs, msgs, errs = [], [], [], []
    def job(cid):
        try: return pull_contact(cid)
        except Exception as e: errs.append((cid, str(e))); return None
    with ThreadPoolExecutor(5) as ex:
        for i, r in enumerate(ex.map(job, cids)):
            if r: contacts.append(r[0]); convs += r[1]; msgs += r[2]
            if i % 50 == 0: print(f'{i}/{len(cids)} contacts', file=sys.stderr)
    json.dump({'result': contacts}, open(f'{D}/contacts.json', 'w'))
    json.dump({'result': convs}, open(f'{D}/conversations.json', 'w'))
    json.dump(msgs, open(f'{D}/messages_meta.json', 'w'))
    json.dump(errs, open(f'{D}/pull_errors.json', 'w'))
    print(json.dumps(dict(opps_all=len(opps), open=len(open_), new_lead_contacts=len(cids), contacts=len(contacts),
                          conversations=len(convs), messages=len(msgs), errors=len(errs))))

def dt(s):
    if not s: return None
    s = str(s).replace('Z', '+00:00')
    try: d = datetime.fromisoformat(s)
    except ValueError: d = datetime.fromisoformat(s[:10])
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)

def label_senders(ms):
    # human: sent by a GHL user (typed in the app, or a call). automated: workflow, campaign, bulk action, or a
    # DM with no GHL user sent under 60 seconds after the lead's message (ManyChat or Meta auto reply speed).
    # meta_inbox: DM with no GHL user, slower than 60 seconds. Sent from the Meta inbox: a person or an automation, unverified.
    prev = None
    for m in ms:
        if m['direction'] is None and m['type'] == 'TYPE_EMAIL': m['direction'] = 'outbound'
        if m['direction'] == 'outbound':
            if m['has_user'] and m['source'] in ('app', 'mobile_app', None) or m['type'] == 'TYPE_CALL' and m['has_user']: m['who'] = 'human'
            elif m['source'] in ('workflow', 'campaign', 'bulk_actions', 'api'): m['who'] = 'workflow'
            elif REAL.get(m['type']) == 'DM' and prev and prev['direction'] == 'inbound' and (dt(m['date']) - dt(prev['date'])).total_seconds() < 60: m['who'] = 'workflow'
            elif REAL.get(m['type']) == 'DM': m['who'] = 'meta_inbox'
            else: m['who'] = 'workflow'
        prev = m

def who(m): return m['who']

def score(D):
    opps_all = json.load(open(f'{D}/opps_all.json'))
    contacts = {c['contact_id']: c for c in json.load(open(f'{D}/contacts.json'))['result']}
    bym = collections.defaultdict(list)
    for m in json.load(open(f'{D}/messages_meta.json')):
        if m['type'] in REAL: bym[m['contact_id']].append(m)
    for v in bym.values(): v.sort(key=lambda m: m['date'] or ''); label_senders(v)
    by_contact_opps = collections.defaultdict(list)
    for o in opps_all: by_contact_opps[o['contactId']].append(o)
    WON_STAGES = {'ea26a97a-0960-42d6-9173-8aead27dbdaa', '88e0d2b7-97e0-4c4b-ab34-93a3bdf43a9f', 'da31e609-94d7-433a-9a6a-68f084dee534'}
    rows = []
    for o in [o for o in opps_all if o['status'] == 'open' and o['pipelineStageId'] == NEW_LEAD]:
        cid = o['contactId']; ms = bym.get(cid, []); ct = contacts.get(cid, {})
        created = dt(o['createdAt'])
        # inquiry = first lead message of the episode that led to this opportunity. Episode = the run of
        # messages before creation with no gap over 7 days. No lead message in it: opportunity creation.
        ep, t = [], created
        for m in reversed([m for m in ms if dt(m['date']) < created]):
            if t - dt(m['date']) > timedelta(days=7): break
            ep.append(m); t = dt(m['date'])
        ep_in = [m for m in reversed(ep) if m['direction'] == 'inbound']
        inquiry = dt(ep_in[0]['date']) if ep_in else created
        after = [m for m in ms if dt(m['date']) >= inquiry]
        out = [m for m in after if m['direction'] == 'outbound']
        inb = [m for m in after if m['direction'] == 'inbound']
        first = out[0] if out else None
        frm = round((dt(first['date']) - inquiry).total_seconds() / 60) if first else None
        replied = bool(first and any(dt(m['date']) > dt(first['date']) and m['type'] != 'TYPE_CALL' for m in inb)) or \
                  any(m['type'] == 'TYPE_CALL' and m['call_status'] == 'completed' for m in after)
        fl = sorted({f for m in inb for f in m['flags']})
        last_real = after[-1] if after else None
        unanswered = bool(last_real and last_real['direction'] == 'inbound')
        days_last_inb = (AS_OF - dt(inb[-1]['date'])).days if inb else None
        days_last_any = (AS_OF - dt(last_real['date'])).days if last_real else None
        failed_sms = [m for m in out if m['type'] == 'TYPE_SMS' and m['status'] in ('failed', 'undelivered')]
        delivered_out = [m for m in out if m['status'] not in ('failed', 'undelivered')]
        other = [x for x in by_contact_opps[cid] if x['id'] != o['id']]
        booked_rec = any(x['status'] == 'won' or x['pipelineStageId'] in WON_STAGES for x in other) or \
            int(ct.get('contact_total_bookings') or 0) > 0 or bool(dt(ct.get('contact_last_booking_date')) and dt(ct.get('contact_last_booking_date')) >= created - timedelta(days=1))
        dup = any(x['status'] == 'open' and dt(x['createdAt']) < created for x in other)
        fut_date = any(dt(ct.get(k)) and dt(ct.get(k)) >= AS_OF for k in ('contact_arrival_date', 'contact_dropoff_date', 'contact_preferred_checkin_date'))
        fut_intent = fut_date or ('future' in fl and (days_last_inb or 999) <= 120)
        if dup: disp = 'junk or duplicate'
        elif 'wrong_number' in fl or (out and failed_sms and not delivered_out): disp = 'wrong number'
        elif booked_rec: disp = 'booked'
        elif fut_intent: disp = 'planning future trip'
        elif replied: disp = 'went cold after contact'
        else: disp = 'never reached'
        age = (AS_OF - created).days
        if disp == 'booked': stage = 'Won'
        elif disp in ('junk or duplicate', 'wrong number') or 'not_interested' in fl or 'stop' in fl: stage = 'Lost'
        elif disp == 'planning future trip' or (replied and (days_last_any or 999) <= 45): stage = 'Qualified'
        elif age <= 14: stage = 'New Lead'
        else: stage = 'Lost'
        rows.append(dict(
            opportunity_id=o['id'], created_month=created.strftime('%Y-%m'),
            first_response_minutes='none' if frm is None else frm,
            first_response_by=who(first) if first else 'none',
            first_human_or_inbox_minutes=next((round((dt(m['date']) - inquiry).total_seconds() / 60) for m in out if who(m) in ('human', 'meta_inbox')), 'none'),
            first_human_response_minutes=next((round((dt(m['date']) - inquiry).total_seconds() / 60) for m in out if who(m) == 'human'), 'none'),
            outbound_touches=len(out), human_touches=sum(1 for m in out if who(m) == 'human'), meta_inbox_touches=sum(1 for m in out if who(m) == 'meta_inbox'),
            channels='/'.join(sorted({REAL[m['type']] for m in out})) or 'none',
            lead_replied='yes' if replied else 'no', calls_logged=sum(1 for m in after if m['type'] == 'TYPE_CALL'),
            unanswered_last_inbound='yes' if unanswered else 'no', days_since_last_inbound=days_last_inb if days_last_inb is not None else '',
            disposition=disp, stage_should_be=stage, signal_flags='|'.join(fl),
            failed_sms=len(failed_sms)))
    return rows

def queue(D, max_days=45):
    # New Lead opportunities where the lead sent the last real message and nobody answered. IDs and flags only.
    now = datetime.now(timezone.utc)
    opps = [o for o in json.load(open(f'{D}/opps_all.json')) if o['status'] == 'open' and o['pipelineStageId'] == NEW_LEAD]
    contacts = {c['contact_id']: c for c in json.load(open(f'{D}/contacts.json'))['result']}
    bym = collections.defaultdict(list)
    for m in json.load(open(f'{D}/messages_meta.json')):
        if m['type'] in REAL: bym[m['contact_id']].append(m)
    latest = {}
    for o in opps:
        if o['contactId'] not in latest or o['createdAt'] > latest[o['contactId']]['createdAt']: latest[o['contactId']] = o
    rows = []
    for cid, o in latest.items():
        ms = sorted(bym.get(cid, []), key=lambda m: m['date'] or '')
        if not ms or ms[-1]['direction'] != 'inbound': continue
        last = ms[-1]; hrs = (now - dt(last['date'])).total_seconds() / 3600
        if hrs > max_days * 24: continue
        run = []
        for m in reversed(ms):
            if m['direction'] != 'inbound': break
            run.append(m)
        fl = sorted({f for m in run for f in m['flags']})
        ever_out = any(m['direction'] != 'inbound' for m in ms)
        ch = REAL[last['type']]
        if 'stop' in fl or contacts.get(cid, {}).get('contact_dnd') is True: how = 'DO NOT CONTACT: STOP or DND'
        elif ch == 'DM' and hrs <= 24: how = 'reply in the same DM'
        elif ch == 'DM' and hrs <= 168: how = 'DM past 24h: Human Agent tag if GHL offers it, else SMS if a phone is on file'
        elif ch == 'DM': how = 'DM window closed: SMS if a phone is on file, else skip'
        else: how = f'reply by {ch}'
        rows.append(dict(opportunity_id=o['id'], ghl_link=f'https://app.gohighlevel.com/v2/location/{LOC}/contacts/detail/{cid}',
                         last_inbound_channel=ch, hours_waiting=round(hrs), unanswered_msgs=len(run),
                         we_ever_replied='yes' if ever_out else 'no', how_to_reply=how, flags='|'.join(fl)))
    skip = lambda r: r['how_to_reply'].startswith('DO NOT')
    rows.sort(key=lambda r: (skip(r), r['we_ever_replied'] == 'yes', r['hours_waiting']))
    n = 0
    for r in rows:
        if skip(r): r['priority'] = 'skip'
        else: n += 1; r['priority'] = n
    rows = [dict(priority=r.pop('priority'), **r) for r in rows]
    with open(f'{D}/reply_queue.csv', 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
    return rows

def pct(n, d): return f'{n}/{d} ({round(100 * n / d) if d else 0}%)'
def summarize(rows, label):
    n = len(rows); fr = [r['first_response_minutes'] for r in rows if r['first_response_minutes'] != 'none']
    hfr = [r['first_human_response_minutes'] for r in rows if r['first_human_response_minutes'] != 'none']
    med = lambda v: sorted(v)[len(v) // 2] if v else None
    return dict(set=label, n=n,
        answered_within_15m=pct(sum(1 for x in fr if x <= 15), n),
        answered_within_15m_and_3plus_touches=pct(sum(1 for r in rows if r['first_response_minutes'] != 'none' and r['first_response_minutes'] <= 15 and r['outbound_touches'] >= 3), n),
        never_answered=pct(n - len(fr), n), median_first_response_min=med(fr),
        human_reply_ever=pct(len(hfr), n), median_first_human_response_min=med(hfr),
        human_within_15m=pct(sum(1 for x in hfr if x <= 15), n),
        human_or_inbox_reply_ever=pct(sum(1 for r in rows if r['first_human_or_inbox_minutes'] != 'none'), n),
        human_or_inbox_within_15m=pct(sum(1 for r in rows if r['first_human_or_inbox_minutes'] != 'none' and r['first_human_or_inbox_minutes'] <= 15), n),
        stop_reply=pct(sum(1 for r in rows if 'stop' in r['signal_flags']), n),
        first_response_by=dict(collections.Counter(r['first_response_by'] for r in rows)),
        median_outbound_touches=med([r['outbound_touches'] for r in rows]),
        three_plus_touches=pct(sum(1 for r in rows if r['outbound_touches'] >= 3), n),
        lead_replied=pct(sum(1 for r in rows if r['lead_replied'] == 'yes'), n),
        any_call_logged=pct(sum(1 for r in rows if r['calls_logged'] > 0), n),
        last_word_is_lead_unanswered=pct(sum(1 for r in rows if r['unanswered_last_inbound'] == 'yes'), n),
        disposition=dict(collections.Counter(r['disposition'] for r in rows)),
        stage_should_be=dict(collections.Counter(r['stage_should_be'] for r in rows)))

if __name__ == '__main__':
    cmd, D = sys.argv[1], sys.argv[2]
    if cmd == 'pull': pull(D)
    elif cmd == 'queue':
        for r in queue(D): print(','.join(str(v) for k, v in r.items() if k != 'ghl_link'))
    else:
        rows = score(D)
        with open(f'{D}/part_b_scores_all.csv', 'w', newline='') as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
        sets = {'all': rows}
        for name, fn in (('sample30', 'part_b_sample.csv'), ('recent_inbound', 'recent_inbound_ids.csv')):
            if os.path.exists(f'{D}/{fn}'):
                ids = {r['opportunity_id'] for r in csv.DictReader(open(f'{D}/{fn}'))}
                sets[name] = [r for r in rows if r['opportunity_id'] in ids]
                with open(f'{D}/part_b_scores_{name}.csv', 'w', newline='') as f:
                    w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(sets[name])
        s = [summarize(v, k) for k, v in sets.items()]
        json.dump(s, open(f'{D}/part_b_summary.json', 'w'), indent=1)
        print(json.dumps(s, indent=1))
