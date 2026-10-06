"""Contact sheets for new library clips (12 frames each) so the agent can review footage.
Usage: FFMPEG=... python3 contact-sheets.py clips.tsv   (run in a work dir; TSV lines: folder<TAB>drive_file_id<TAB>name<TAB>clip_id)
Outputs sheets/<clip_id>.jpg + .json and frames/. Files are downloaded, sampled, then deleted.
"""
import subprocess, sys, os, re, json, concurrent.futures as cf
from PIL import Image, ImageDraw, ImageFont
FF = os.environ.get("FFMPEG", "ffmpeg")
URL = "https://drive.usercontent.google.com/download?id={}&export=download&confirm=t"
os.makedirs("sheets", exist_ok=True); os.makedirs("frames", exist_ok=True)
rows = [l.rstrip("\n").split("\t") for l in open("clips.tsv")]
font = ImageFont.load_default(size=28) if hasattr(ImageFont, "load_default") else None
def probe(url):
    r = subprocess.run([FF, "-hide_banner", "-i", url], capture_output=True, text=True, timeout=120).stderr
    d = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r); v = re.search(r"Video: (\w+).*?, (\d{3,5})x(\d{3,5})", r)
    rot = re.search(r"rotation of (-?\d+)|rotate\s*:\s*(-?\d+)", r)
    dur = int(d[1])*3600+int(d[2])*60+float(d[3]) if d else 0
    return dur, (v[1], int(v[2]), int(v[3])) if v else None, rot.group(0) if rot else ""
def job(i, row):
    folder, fid, name, cid = row
    out = f"sheets/{cid}.jpg"
    if os.path.exists(out): return cid, "skip"
    url = f"dl/{cid}{os.path.splitext(name)[1]}"; os.makedirs("dl", exist_ok=True)
    try:
        subprocess.run(["curl", "-sS", "-L", "--retry", "3", "-o", url, URL.format(fid)], timeout=1200, check=True)
        dur, vinfo, rot = probe(url)
        if dur < 2: return cid, f"too short {dur}"
        n = 12; ts = [dur*(k+0.5)/n for k in range(n)]
        tiles = []
        for k, t in enumerate(ts):
            f = f"frames/{cid}_{k}.jpg"
            subprocess.run([FF, "-loglevel", "error", "-y", "-ss", f"{t:.2f}", "-i", url, "-frames:v", "1", "-vf", "scale=-2:360", "-q:v", "4", f], timeout=180)
            if os.path.exists(f): tiles.append((t, Image.open(f).convert("RGB")))
        if not tiles: return cid, "no frames"
        tw = max(im.width for _, im in tiles); th = 360
        cols = 6; rows_ = (len(tiles)+cols-1)//cols
        sheet = Image.new("RGB", (cols*tw, rows_*th+50), (20,20,20)); d = ImageDraw.Draw(sheet)
        d.text((10, 10), f"{cid}  {folder}/{name}  {dur:.1f}s  {vinfo}", fill=(255,255,255), font=font)
        for k, (t, im) in enumerate(tiles):
            x, y = (k % cols)*tw, 50+(k//cols)*th; sheet.paste(im, (x, y))
            d.rectangle([x, y, x+110, y+36], fill=(0,0,0)); d.text((x+6, y+4), f"{t:.1f}s", fill=(255,255,0), font=font)
        sheet.save(out, quality=80)
        json.dump({"cid": cid, "folder": folder, "fid": fid, "name": name, "dur": dur, "video": vinfo, "rot": rot}, open(f"sheets/{cid}.json", "w"))
        return cid, f"ok {dur:.1f}s"
    except Exception as e:
        return cid, f"err {e}"
    finally:
        if os.path.exists(url): os.remove(url)
with cf.ThreadPoolExecutor(4) as ex:
    for cid, msg in ex.map(lambda a: job(*a), enumerate(rows)):
        print(cid, msg, flush=True)
