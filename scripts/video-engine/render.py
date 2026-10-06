#!/usr/bin/env python3
"""Render reel specs from the footage library.

Usage: FFMPEG=... python3 scripts/video-engine/render.py <index.csv> <outdir> <spec.json> [spec.json ...]

index.csv is Drive `FPI-VIdeos / fpi-footage-index.csv` (clip_id -> drive_file_id), private, never committed.
Clip "src" values in specs are clip ids (LIB-0001). Music: "music" may be a Drive file id prefixed "drive:".
Originals are downloaded once per container into <outdir>/src. The six library folders are link shared.
"""
import csv, json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
DL = "https://drive.usercontent.google.com/download?id={}&export=download&confirm=t"


def fetch(fid, path):
    if not os.path.exists(path):
        subprocess.run(["curl", "-sS", "-L", "--retry", "3", "-o", path, DL.format(fid)], check=True)
        with open(path, "rb") as f:
            if f.read(15).lower().startswith((b"<!doctype", b"<html")):
                os.remove(path); raise SystemExit(f"Drive file {fid} is not link shared")
    return path


def main(index, outdir, specs):
    idx = {r["clip_id"]: r for r in csv.DictReader(open(index))}
    os.makedirs(f"{outdir}/src", exist_ok=True)
    for sp in specs:
        name = os.path.basename(sp)[:-5]; out = f"{outdir}/{name}.mp4"
        if os.path.exists(out): print("skip", name); continue
        spec = json.load(open(sp))
        for c in spec["clips"]:
            r = idx[c["src"]]; c["src"] = fetch(r["drive_file_id"], f"{outdir}/src/{c['src']}{os.path.splitext(r['file'])[1]}")
        if str(spec.get("music", "")).startswith("drive:"):
            fid = spec["music"][6:]; spec["music"] = fetch(fid, f"{outdir}/src/music_{fid}.mp3")
        tmp = f"{outdir}/{name}.spec.json"; json.dump(spec, open(tmp, "w"))
        subprocess.run([sys.executable, f"{HERE}/text-reel.py", tmp, out], check=True)
        print("done", name, flush=True)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3:])
