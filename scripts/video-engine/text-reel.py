#!/usr/bin/env python3
"""Build a text-on-screen reel from real footage clips plus a brand end card.

Usage: FFMPEG=/path/to/ffmpeg python3 scripts/video-engine/text-reel.py spec.json out.mp4

spec.json:
{
  "clips": [{"src": "path.mov", "start": 9.0, "dur": 2.5, "text": "On screen line"}],
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
    return lines


def caption_png(text, path):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    ft = font("SourceSerif4-normal", 76, 700)
    lines = wrap(d, text, ft, W - 200)
    lh = 96; boxh = lh * len(lines) + 60; top = 300
    widest = max(d.textlength(l, font=ft) for l in lines)
    x0 = (W - widest) / 2 - 40
    d.rounded_rectangle([x0, top, W - x0, top + boxh], 36, fill=CREAM + (238,))
    for i, l in enumerate(lines):
        tw = d.textlength(l, font=ft)
        d.text(((W - tw) / 2, top + 30 + i * lh), l, font=ft, fill=CHARCOAL)
    im.save(path)


def end_png(lines, path):
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    big = font("SourceSerif4-normal", 104, 700); small = font("DMSans-normal", 64, 600)
    hl = wrap(d, lines[0], big, W - 160)
    y = 620
    for l in hl:
        d.text(((W - d.textlength(l, font=big)) / 2, y), l, font=big, fill=CHARCOAL); y += 112
    d.rectangle([W / 2 - 70, y + 44, W / 2 + 70, y + 52], fill=PINK); y += 120
    for l in lines[1:]:
        d.text(((W - d.textlength(l, font=small)) / 2, y), l, font=small, fill=CHARCOAL); y += 92
    brand = font("SourceSerif4-normal", 60, 600)
    t = "Four Paws Inn"
    d.text(((W - d.textlength(t, font=brand)) / 2, H - 300), t, font=brand, fill=CHARCOAL)
    im.save(path)


def main(spec_path, out):
    spec = json.load(open(spec_path)); tmp = tempfile.mkdtemp(); parts = []
    mute = spec.get("audio", "mute") == "mute"
    for i, c in enumerate(spec["clips"]):
        png = os.path.join(tmp, f"t{i}.png"); caption_png(c["text"], png)
        part = os.path.join(tmp, f"p{i}.mp4")
        afilter = ["-f", "lavfi", "-t", str(c["dur"]), "-i", "anullsrc=r=44100:cl=stereo"] if mute else []
        amap = ["-map", "2:a"] if mute else ["-map", "0:a"]
        subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(c["start"]), "-t", str(c["dur"]), "-i", c["src"], "-i", png, *afilter,
                        "-filter_complex", f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps=30,format=yuv420p,setsar=1[v];[v][1:v]overlay=0:0[o]",
                        "-map", "[o]", *amap, "-shortest", "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2", part], check=True)
        parts.append(part)
    e = spec["end"]; png = os.path.join(tmp, "end.png"); end_png(e["lines"], png)
    part = os.path.join(tmp, "end.mp4")
    subprocess.run([FF, "-loglevel", "error", "-y", "-loop", "1", "-t", str(e["dur"]), "-i", png, "-f", "lavfi", "-t", str(e["dur"]), "-i", "anullsrc=r=44100:cl=stereo",
                    "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-c:a", "aac", "-b:a", "192k", "-shortest", part], check=True)
    parts.append(part)
    lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    subprocess.run([FF, "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", out], check=True)
    print("done:", out)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
