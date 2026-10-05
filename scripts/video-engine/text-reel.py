#!/usr/bin/env python3
"""Build a text-on-screen reel from real footage clips plus a brand end card.

Usage: FFMPEG=/path/to/ffmpeg python3 scripts/video-engine/text-reel.py spec.json out.mp4

spec.json:
{
  "clips": [{"src": "path.mov", "start": 9.0, "dur": 2.5, "text": "On screen line", "cx": 0.5}],
                             # cx: optional horizontal crop position, 0 = left edge, 0.5 = center, 1 = right edge
  "end": {"dur": 4.0, "lines": ["Big serif headline", "small line", "small line"]},
  "audio": "mute"            # "mute" or "original" (keeps each clip's own sound)
}
Output: 1080x1920, 30fps, H.264 CRF 16 (full quality, never shrunk).
Needs Pillow and fontTools (brand fonts are converted from scripts/morning-posts/fonts).
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = os.path.join(ROOT, "scripts", "morning-posts", "fonts")
FF = os.environ.get("FFMPEG", "ffmpeg")
CREAM, PINK, CHARCOAL = (250, 247, 243), (230, 160, 163), (53, 53, 50)
W, H = 1080, 1920


def font(name, size, weight):
    tmp = os.path.join(tempfile.gettempdir(), name + ".ttf")
    if not os.path.exists(tmp):
        f = TTFont(os.path.join(FONTS, name + ".woff2")); f.flavor = None; f.save(tmp)
    ft = ImageFont.truetype(tmp, size)
    try:
        ft.set_variation_by_axes([weight])
    except Exception:
        pass
    return ft


def wrap(draw, text, ft, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=ft) <= maxw:
            cur = t
        else:
            lines.append(cur); cur = w
    lines.append(cur)
    # No orphan last word: pull words down until the last line has at least two.
    while len(lines) > 1 and len(lines[-1].split()) < 2 and len(lines[-2].split()) > 2:
        a = lines[-2].split(); lines[-2] = " ".join(a[:-1]); lines[-1] = a[-1] + " " + lines[-1]
    return lines


HANDLE = "@fourpawsinnpetboarding"


def paw(d, cx, cy, r, fill):
    d.ellipse([cx - r, cy - r * 0.55, cx + r, cy + r * 1.05], fill=fill)
    for dx, dy, k in ((-1.15, -0.75, 0.42), (-0.4, -1.35, 0.42), (0.4, -1.35, 0.42), (1.15, -0.75, 0.42)):
        x, y, rr = cx + dx * r, cy + dy * r, r * k
        d.ellipse([x - rr, y - rr * 1.25, x + rr, y + rr * 1.25], fill=fill)


def caption_png(text, path):
    """Lower caption card with pink accent, plus a brand bar with the handle (house style since 2026-10-05)."""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    ft = font("SourceSerif4-normal", 84, 700)
    lines = wrap(d, text, ft, W - 260)
    lh = 104; top = 1160; boxh = 110 + lh * len(lines)
    d.rounded_rectangle([68, top, W - 68, top + boxh], 28, fill=CREAM + (240,))
    d.rounded_rectangle([112, top + 26, 212, top + 34], 4, fill=PINK)
    for i, l in enumerate(lines):
        d.text(((W - d.textlength(l, font=ft)) / 2, top + 64 + i * lh), l, font=ft, fill=CHARCOAL)
    by = max(top + boxh + 94, 1560)
    d.rounded_rectangle([68, by, W - 68, by + 112], 24, fill=CHARCOAL + (225,))
    paw(d, 138, by + 58, 13, PINK)
    d.text((182, by + 14), "Four Paws Inn", font=font("SourceSerif4-normal", 40, 700), fill=(255, 255, 255))
    d.text((182, by + 64), HANDLE, font=font("DMSans-normal", 30, 500), fill=(235, 235, 235))
    im.save(path)


def end_png(lines, path):
    """End card: paw, brand, headline, sub lines, pink bar, handle, pink corner circles."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    d.ellipse([810, -230, 1350, 310], fill=PINK); d.ellipse([-330, 1440, 210, 1980], fill=PINK)
    paw(d, W / 2, 440, 34, CHARCOAL)
    brand = font("SourceSerif4-normal", 68, 700)
    d.text(((W - d.textlength("Four Paws Inn", font=brand)) / 2, 545), "Four Paws Inn", font=brand, fill=CHARCOAL)
    big = font("SourceSerif4-normal", 92, 700); small = font("DMSans-normal", 58, 500)
    y = 840
    for l in wrap(d, lines[0], big, W - 160):
        d.text(((W - d.textlength(l, font=big)) / 2, y), l, font=big, fill=CHARCOAL); y += 112
    y += 20
    for l in lines[1:]:
        d.text(((W - d.textlength(l, font=small)) / 2, y), l, font=small, fill=CHARCOAL); y += 80
    d.rounded_rectangle([W / 2 - 100, y + 40, W / 2 + 100, y + 48], 4, fill=PINK)
    hf = font("DMSans-normal", 40, 500)
    d.text(((W - d.textlength(HANDLE, font=hf)) / 2, 1480), HANDLE, font=hf, fill=CHARCOAL)
    im.save(path)


# Every part is converted to the same SDR BT.709 color so the concat stays one clean stream.
# iPhone HDR (HLG or PQ) gets tone mapped; without this it looks washed out and players may stutter at the cut.
SDR = "setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv"
TAGS = ["-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv"]


def color_chain(src):
    info = subprocess.run([FF, "-hide_banner", "-i", src], capture_output=True, text=True).stderr
    if "arib-std-b67" in info or "smpte2084" in info:
        return "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p," + SDR
    return "format=yuv420p," + SDR


def main(spec_path, out):
    spec = json.load(open(spec_path)); tmp = tempfile.mkdtemp(); parts = []
    mute = spec.get("audio", "mute") == "mute"
    for i, c in enumerate(spec["clips"]):
        png = os.path.join(tmp, f"t{i}.png"); caption_png(c["text"], png)
        part = os.path.join(tmp, f"p{i}.mp4")
        afilter = ["-f", "lavfi", "-t", str(c["dur"]), "-i", "anullsrc=r=44100:cl=stereo"] if mute else []
        amap = ["-map", "2:a"] if mute else ["-map", "0:a"]
        subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(c["start"]), "-t", str(c["dur"]), "-i", c["src"], "-i", png, *afilter,
                        "-filter_complex", f"[0:v]{color_chain(c['src'])},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}:(iw-{W})*{c.get('cx', 0.5)}:(ih-{H})/2,fps=30,setsar=1[v];[v][1:v]overlay=0:0[o]",
                        "-map", "[o]", *amap, "-shortest", "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p", *TAGS, "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2", part], check=True)
        parts.append(part)
    e = spec["end"]; png = os.path.join(tmp, "end.png"); end_png(e["lines"], png)
    part = os.path.join(tmp, "end.mp4")
    subprocess.run([FF, "-loglevel", "error", "-y", "-loop", "1", "-t", str(e["dur"]), "-i", png, "-f", "lavfi", "-t", str(e["dur"]), "-i", "anullsrc=r=44100:cl=stereo",
                    "-vf", "fps=30,format=yuv420p," + SDR, "-c:v", "libx264", "-crf", "16", "-preset", "slow", *TAGS, "-c:a", "aac", "-b:a", "192k", "-shortest", part], check=True)
    parts.append(part)
    lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    subprocess.run([FF, "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", out], check=True)
    print("done:", out)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
