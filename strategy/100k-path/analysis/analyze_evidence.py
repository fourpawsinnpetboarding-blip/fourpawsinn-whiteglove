# Usage: python3 -I analyze_evidence.py <path-to-unzipped-evidence-packet>
# Read-only. Prints GHL source/status, booking ledger by month, nightly stay rows.
# Never commit the evidence packet itself: it holds private match hashes.
import pandas as pd, numpy as np, sys
E=sys.argv[1]
g=pd.read_csv(f"{E}/ghl/ghl_opportunities_anonymized.csv")
g['created']=pd.to_datetime(g.opportunity_created_at).dt.tz_localize(None) - pd.Timedelta(hours=4)
g['m']=g.created.dt.strftime('%Y-%m')
def src(s):
    s=str(s).lower()
    if s in('nan',''): return 'blank'
    if 'test' in s: return 'TEST'
    if 'googel' in s or 'google' in s: return 'google_organic_gmb' if ('organic' in s or 'business' in s) else 'google_ads_or_google'
    if any(k in s for k in['facebook','meta','instagram','summer boarding']): return 'meta'
    if 'repeat' in s or 'referral' in s: return 'repeat_referral'
    return 'other'
g['src']=g.opportunity_source.map(src)
g=g[g.src!='TEST']
print("GHL non-test", len(g))
t=g.groupby('src').agg(n=('opportunity_id','size'),won=('opportunity_status',lambda x:(x=='won').sum()),lost=('opportunity_status',lambda x:(x=='lost').sum()),open=('opportunity_status',lambda x:(x=='open').sum()))
t['won%']=(t.won/t.n*100).round(1); print(t)
w=g[g.opportunity_status=='won']
print("won value by src\n", w.groupby('src').opportunity_monetary_value.agg(['sum','mean','median']).round(0))
m=g.groupby('m').agg(n=('opportunity_id','size'),won=('opportunity_status',lambda x:(x=='won').sum()),meta=('src',lambda x:(x=='meta').sum()),goog=('src',lambda x:(x=='google_ads_or_google').sum()))
m['won%']=(m.won/m.n*100).round(1); print(m)
# Meta window
mw=g[(g.src=='meta')&(g.created>=pd.Timestamp('2026-04-27'))]
print("meta-labeled opps since 4/27:",len(mw),"won:",(mw.opportunity_status=='won').sum())
print("meta-labeled before 4/27:",((g.src=='meta')&(g.created<pd.Timestamp('2026-04-27'))).sum())
# open staleness
o=g[g.opportunity_status=='open']
print("open stage counts\n",o.stage_name.value_counts())
print("open created before Sep 1:",(o.created<pd.Timestamp('2026-09-01')).sum())
# bookings
b=pd.read_csv(f"{E}/booking/booking_ledger_anonymized.csv")
b=b[~b['flags'].fillna('').str.contains('TEST')]
b=b[b.total_rev_recorded.fillna(0)>0 | True]
b['ci']=pd.to_datetime(b.checkin,errors='coerce'); b['co']=pd.to_datetime(b.checkout,errors='coerce')
b['bath']=b.service_class.fillna('').str.contains('bath')
print("rows",len(b),"service classes",b.service_class.value_counts().to_dict())
b['rev']=pd.to_numeric(b.total_rev_recorded,errors='coerce')
b['cm']=b.ci.dt.strftime('%Y-%m')
mm=b.groupby('cm').agg(rows=('rev','size'),rev=('rev','sum'),nights=('overnight_nights_if_checkout_exclusive','sum')).round(0)
print(mm)
nb=b[~b.bath]
print("median rate",nb.daily_rate_recorded.median(),"mean rate",round(pd.to_numeric(nb.daily_rate_recorded,errors='coerce').mean(),1))
print("median booking rev",nb.rev.median(),"mean",round(nb.rev.mean(),0),"median nights",nb.overnight_nights_if_checkout_exclusive.median())
print("rate dist",pd.to_numeric(nb.daily_rate_recorded,errors='coerce').describe().round(0).to_dict())
print("source_recorded",b.source_recorded.value_counts(dropna=False).head(10).to_dict())
ids=b[~b.client_id.fillna('').str.contains('UNKNOWN')&b.client_id.notna()]
vc=ids.client_id.value_counts(); print("identified clients",len(vc),"with 2+ rows",(vc>1).sum())
n=pd.read_csv(f"{E}/booking/nightly_recorded_stays_90_days.csv"); n['m']=n.night.str[:7]
print(n.groupby('m').recorded_stay_rows.agg(['mean','max','min']).round(1))
