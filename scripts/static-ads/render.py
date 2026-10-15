#!/usr/bin/env python3
"""
Static ad renderer for Four Paws Inn (Meta feed, 1080 x 1350).

Style: "whiteboard" statics modeled on the Hormozi ad Alex flagged (Oct 15 2026):
a small audience label, one big hand-lettered statement, and a simple doodle
that shows the idea. Brand colors and the wordmark bar stay fixed.

Usage:
  python3 scripts/static-ads/render.py              # render every concept
  python3 scripts/static-ads/render.py AD07 AD10    # render some

Copy for every concept lives in scripts/static-ads/concepts.md. Change copy there and here together.
Doodles are drawn in code (stick figures, simple shapes). Never paste in AI images of dogs, people,
the home or the yards (fourpawsinn/business-facts.md, creative guardrails).
Fonts: Amatic SC, Caveat Brush, Patrick Hand (Google Fonts, OFL) in ./fonts, plus the brand
fonts in scripts/morning-posts/fonts.
"""
import math, os, random, sys, tempfile
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, "content", "ads", "statics", "2026-10-15")
BRAND_FONTS = os.path.join(ROOT, "scripts", "morning-posts", "fonts")

W, H = 1080, 1350
CREAM, PINK, CHAR = (250, 247, 243), (230, 160, 163), (53, 53, 50)
HANDLE = "@fourpawsinnpetboarding"
PROOF = "4.9 stars, 230+ Google reviews"  # keep in step with fourpawsinn/business-facts.md

rng = random.Random(7)


def hand(size):
    return ImageFont.truetype(os.path.join(HERE, "fonts", "AmaticSC.ttf"), size)


def brush(size):
    return ImageFont.truetype(os.path.join(HERE, "fonts", "CaveatBrush.ttf"), size)


def note(size):
    return ImageFont.truetype(os.path.join(HERE, "fonts", "PatrickHand.ttf"), size)


def brand(name, size, weight):
    tmp = os.path.join(tempfile.gettempdir(), name + ".ttf")
    if not os.path.exists(tmp):
        f = TTFont(os.path.join(BRAND_FONTS, name + ".woff2")); f.flavor = None; f.save(tmp)
    ft = ImageFont.truetype(tmp, size)
    try:
        ft.set_variation_by_axes([weight])
    except Exception:
        pass
    return ft


# ---------- hand drawn primitives ----------

def wobble(pts, amp=2.2, step=14):
    out = []
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        n = max(1, int(math.hypot(x2 - x1, y2 - y1) / step))
        for i in range(n):
            t = i / n
            out.append((x1 + (x2 - x1) * t + rng.uniform(-amp, amp), y1 + (y2 - y1) * t + rng.uniform(-amp, amp)))
    out.append(pts[-1])
    return out


def line(d, pts, w=7, c=CHAR, amp=2.2):
    p = wobble(pts, amp)
    d.line(p, fill=c, width=w, joint="curve")
    r = w / 2
    for x, y in (p[0], p[-1]):
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)


def oval(d, cx, cy, rx, ry, w=7, c=CHAR, fill=None, amp=1.6):
    n = 48
    pts = [(cx + rx * math.cos(2 * math.pi * k / n) + rng.uniform(-amp, amp),
            cy + ry * math.sin(2 * math.pi * k / n) + rng.uniform(-amp, amp)) for k in range(n + 1)]
    if fill:
        d.polygon(pts, fill=fill)
    d.line(pts, fill=c, width=w, joint="curve")


def person(d, x, y, s=1.0, arms="down", face="smile", phone=False):
    """Stick person. (x, y) is the top of the head."""
    hr = 34 * s
    oval(d, x, y + hr, hr, hr)
    ey = y + hr * 0.85
    for ex in (x - hr * 0.35, x + hr * 0.35):
        d.ellipse([ex - 4, ey - 4, ex + 4, ey + 4], fill=CHAR)
    my = y + hr * 1.35
    if face == "smile":
        d.arc([x - hr * 0.45, my - hr * 0.4, x + hr * 0.45, my + hr * 0.15], 20, 160, fill=CHAR, width=5)
    elif face == "worry":
        d.arc([x - hr * 0.4, my - 2, x + hr * 0.4, my + hr * 0.45], 200, 340, fill=CHAR, width=5)
        line(d, [(x - hr * 0.6, ey - 16), (x - hr * 0.15, ey - 10)], 4)
        line(d, [(x + hr * 0.15, ey - 10), (x + hr * 0.6, ey - 16)], 4)
    neck = y + hr * 2
    hip = neck + 120 * s
    line(d, [(x, neck), (x, hip)])
    line(d, [(x, hip), (x - 40 * s, hip + 115 * s)])
    line(d, [(x, hip), (x + 40 * s, hip + 115 * s)])
    sh = neck + 28 * s
    if arms == "down":
        line(d, [(x, sh), (x - 50 * s, sh + 90 * s)]); line(d, [(x, sh), (x + 50 * s, sh + 90 * s)])
    elif arms == "wave":
        line(d, [(x, sh), (x - 50 * s, sh + 90 * s)]); line(d, [(x, sh), (x + 60 * s, sh - 60 * s)])
    elif arms == "open":
        line(d, [(x, sh), (x - 75 * s, sh - 20 * s)]); line(d, [(x, sh), (x + 75 * s, sh - 20 * s)])
    elif arms == "phone":
        line(d, [(x, sh), (x - 50 * s, sh + 90 * s)])
        line(d, [(x, sh), (x + 45 * s, sh + 40 * s), (x + 30 * s, sh - 10 * s)])
    if phone:
        px, py = x + 30 * s, sh - 10 * s
        d.rounded_rectangle([px - 18 * s, py - 62 * s, px + 18 * s, py + 2 * s], 8, outline=CHAR, width=5, fill=CREAM)
    return hip + 115 * s


def dog(d, x, y, s=1.0, mood="happy", flip=False):
    """Stick dog. (x, y) is the middle of the back."""
    k = -1 if flip else 1
    oval(d, x, y + 22 * s, 70 * s, 30 * s, fill=CREAM)
    hx, hy = x + k * 88 * s, y - 22 * s
    oval(d, hx, hy, 32 * s, 28 * s, fill=CREAM)
    # ears
    line(d, [(hx - k * 16 * s, hy - 22 * s), (hx - k * 30 * s, hy + 12 * s)], 7)
    line(d, [(hx + k * 14 * s, hy - 24 * s), (hx + k * 30 * s, hy + 8 * s)], 7)
    # eye, nose, mouth
    d.ellipse([hx + k * 6 * s - 4, hy - 8 * s - 4, hx + k * 6 * s + 4, hy - 8 * s + 4], fill=CHAR)
    nx = hx + k * 30 * s
    d.ellipse([nx - 6, hy + 2 * s - 6, nx + 6, hy + 2 * s + 6], fill=CHAR)
    if mood == "happy":
        d.arc([hx - 4 * s, hy + 2 * s, hx + 26 * s if k > 0 else hx + 4 * s, hy + 20 * s] if k > 0 else
              [hx - 26 * s, hy + 2 * s, hx + 4 * s, hy + 20 * s], 20, 160, fill=CHAR, width=5)
        d.ellipse([hx + k * 12 * s - 7, hy + 16 * s, hx + k * 12 * s + 7, hy + 30 * s], fill=PINK)
    else:
        line(d, [(hx + k * 2 * s, hy + 14 * s), (hx + k * 20 * s, hy + 12 * s)], 5)
    # legs
    for lx in (x - 48 * s, x - 22 * s, x + 24 * s, x + 50 * s):
        line(d, [(lx, y + 46 * s), (lx, y + 100 * s)])
    # tail
    tx = x - k * 68 * s
    if mood == "happy":
        line(d, [(tx, y + 8 * s), (tx - k * 34 * s, y - 40 * s)])
        for i in (0, 1):
            line(d, [(tx - k * (50 + i * 12) * s, y - (42 + i * 14) * s), (tx - k * (58 + i * 12) * s, y - (50 + i * 14) * s)], 4)
    else:
        line(d, [(tx, y + 12 * s), (tx - k * 30 * s, y + 52 * s)])
    return y + 100 * s


def bubble(d, x, y, w, h, text, tail_to, size=52, fill=CREAM):
    pts = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]
    d.rounded_rectangle([x, y, x + w, y + h], 36, fill=fill, outline=CHAR, width=6)
    tx, ty = tail_to
    bx = min(max(tx, x + 50), x + w - 50)
    by = y + h if ty > y + h else y
    d.polygon([(bx - 22, by), (bx + 22, by), (tx, ty)], fill=fill)
    line(d, [(bx - 22, by), (tx, ty), (bx + 22, by)], 6, amp=0.8)
    ft = brush(size)
    lines = text.split("\n")
    lh = size * 1.05
    top = y + (h - lh * len(lines)) / 2
    for i, l in enumerate(lines):
        d.text((x + (w - d.textlength(l, font=ft)) / 2, top + i * lh), l, font=ft, fill=CHAR)


def heart(d, cx, cy, r, fill=PINK):
    pts = []
    for k in range(60):
        t = 2 * math.pi * k / 60
        pts.append((cx + r * 16 * math.sin(t) ** 3 / 16, cy - r * (13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)) / 16))
    d.polygon(pts, fill=fill, outline=CHAR)


def check(d, x, y, s=1.0, c=CHAR):
    line(d, [(x, y + 18 * s), (x + 16 * s, y + 36 * s), (x + 48 * s, y - 6 * s)], 9, c, amp=1)


def cross(d, x, y, s=1.0):
    line(d, [(x, y), (x + 36 * s, y + 36 * s)], 8, amp=1); line(d, [(x + 36 * s, y), (x, y + 36 * s)], 8, amp=1)


def paw(d, cx, cy, r, fill):
    d.ellipse([cx - r, cy - r * 0.55, cx + r, cy + r * 1.05], fill=fill)
    for dx, dy, k in ((-1.15, -0.75, 0.42), (-0.4, -1.35, 0.42), (0.4, -1.35, 0.42), (1.15, -0.75, 0.42)):
        x, y, rr = cx + dx * r, cy + dy * r, r * k
        d.ellipse([x - rr, y - rr * 1.25, x + rr, y + rr * 1.25], fill=fill)


# ---------- layout ----------

def wrap(d, text, ft, maxw):
    out = []
    for para in text.split("\n"):
        cur = ""
        for w in para.split():
            t = (cur + " " + w).strip()
            if d.textlength(t, font=ft) <= maxw:
                cur = t
            else:
                out.append(cur); cur = w
        out.append(cur)
    return out


def frame(label, headline, size=104, top=60, bg=CREAM):
    """Label with pink underline, big hand lettered headline. Returns image, draw, y below headline."""
    im = Image.new("RGB", (W, H), bg); d = ImageDraw.Draw(im)
    ink = CHAR if bg != CHAR else CREAM
    lf = hand(76)
    lw = d.textlength(label, font=lf)
    d.text(((W - lw) / 2 + 1, top), label, font=lf, fill=ink, stroke_width=2, stroke_fill=ink)
    line(d, [((W - lw) / 2 - 10, top + 96), ((W + lw) / 2 + 10, top + 92)], 12, PINK, amp=1.2)
    hf = hand(size)
    y = top + 130
    lh = size * 0.92
    for l in wrap(d, headline.upper(), hf, W - 120):
        d.text(((W - d.textlength(l, font=hf)) / 2, y), l, font=hf, fill=ink, stroke_width=4, stroke_fill=ink)
        y += lh
    return im, d, y + 20


def brand_bar(d, cta="Tap to check your dates"):
    y = H - 150
    d.rectangle([0, y, W, H], fill=CHAR)
    paw(d, 74, y + 60, 20, PINK)
    d.text((112, y + 22), "Four Paws Inn", font=brand("SourceSerif4-normal", 50, 700), fill=CREAM)
    d.text((114, y + 86), HANDLE, font=brand("DMSans-normal", 30, 500), fill=(225, 222, 218))
    f = brand("DMSans-normal", 34, 600)
    tw = d.textlength(cta, font=f)
    d.rounded_rectangle([W - tw - 100, y + 42, W - 40, y + 110], 34, fill=PINK)
    d.text((W - tw - 70, y + 53), cta, font=f, fill=CHAR)


def divider(d, y1, y2):
    line(d, [(W / 2, y1), (W / 2 + 3, y2)], 6)


def panel_label(d, x, y, text, size=58):
    f = hand(size)
    d.text((x - d.textlength(text, font=f) / 2, y), text, font=f, fill=CHAR, stroke_width=2, stroke_fill=CHAR)


# ---------- concepts ----------

def ad07():
    im, d, y = frame("MIRAMAR DOG PARENTS:",
                     "Your dog doesn't need a kennel. They need a home.", size=118)
    top = max(y, 560)
    divider(d, top, 1150)
    # left: kennel
    panel_label(d, 270, top, "A KENNEL")
    kx, ky = 120, top + 230
    d.rectangle([kx, ky, kx + 300, ky + 230], outline=CHAR, width=7)
    dog(d, kx + 130, ky + 110, 0.75, mood="sad")
    for bx in range(kx + 40, kx + 300, 45):
        line(d, [(bx, ky), (bx, ky + 230)], 6, amp=1)
    bubble(d, 90, top + 90, 360, 110, "Where did\neveryone go?", (kx + 230, ky + 30), 44)
    # right: home
    panel_label(d, 810, top, "OUR HOME")
    hx, hy = 620, top + 120
    line(d, [(hx, hy + 110), (hx + 190, hy + 10), (hx + 380, hy + 110)], 7)
    line(d, [(hx + 35, hy + 95), (hx + 35, hy + 160)], 6); line(d, [(hx + 345, hy + 95), (hx + 345, hy + 160)], 6)
    heart(d, hx + 190, hy + 80, 22)
    person(d, 700, top + 220, 0.7, arms="open")
    dog(d, 880, top + 400, 0.75, flip=True)
    brand_bar(d)
    return im


def ad08():
    im, d, y = frame("GOING AWAY SOON?",
                     "Worried about your dog the whole trip?", size=118)
    top = max(y, 560)
    divider(d, top, 1150)
    panel_label(d, 270, top, "NO UPDATES")
    person(d, 270, top + 270, 0.85, arms="phone", face="worry", phone=True)
    bubble(d, 70, top + 90, 400, 130, "Is she\nokay?", (250, top + 270), 52)
    panel_label(d, 810, top, "DAILY PHOTOS")
    person(d, 760, top + 270, 0.85, arms="phone", face="smile", phone=True)
    bubble(d, 610, top + 90, 400, 130, "She's\nplaying!", (790, top + 270), 52)
    heart(d, 930, top + 330, 30); heart(d, 980, top + 430, 20)
    # sun lounger lines under both people for "vacation"
    for x0 in (150, 640):
        line(d, [(x0, 1120), (x0 + 260, 1100)], 6)
    brand_bar(d)
    return im


def ad09():
    im, d, y = frame("BEFORE YOU BOOK ANY BOARDING:",
                     "Ask these 5 questions.", size=120)
    qs = [("Is it cage free?", "Yes. A real home."),
          ("How often do dogs go outside?", "Every hour."),
          ("Will I get photos and videos?", "Every day."),
          ("How do you add new dogs to the group?", "Slowly, one step at a time."),
          ("Can I read real reviews?", "230+ on Google.")]
    qf, af = note(50), brush(48)
    yy = max(y + 10, 430)
    for i, (q, a) in enumerate(qs):
        d.text((80, yy), f"{i + 1}.", font=hand(80), fill=CHAR, stroke_width=2, stroke_fill=CHAR)
        d.text((150, yy + 6), q, font=qf, fill=CHAR)
        check(d, 160, yy + 74, 0.8, PINK)
        d.text((220, yy + 66), a, font=af, fill=CHAR)
        yy += 138
    d.text((80, yy + 4), "Our answers are in pink. Now ask the other places.", font=note(42), fill=CHAR)
    brand_bar(d)
    return im


def ad10():
    im, d, y = frame("WHAT DO YOU WANT FOR YOUR DOG",
                     "while you're away?", size=130, top=70)
    opts = ["A real home, not a cage", "Play outside every hour", "Photos and videos every day",
            "A team that learns their name and habits"]
    yy = max(y + 10, 440)
    for o in opts:
        d.rounded_rectangle([90, yy, 160, yy + 70], 10, outline=CHAR, width=7)
        check(d, 100, yy + 14, 1.0, PINK)
        d.text((195, yy + 2), o, font=note(58), fill=CHAR)
        yy += 108
    d.text((90, yy + 10), "Checked all four?", font=hand(92), fill=CHAR, stroke_width=3, stroke_fill=CHAR)
    d.text((90, yy + 104), "Send us your dates.", font=hand(92), fill=CHAR, stroke_width=3, stroke_fill=CHAR)
    line(d, [(90, yy + 212), (560, yy + 208)], 12, PINK)
    brand_bar(d)
    return im


def ad11():
    im, d, y = frame("$60 A DAY.", "Here's what's in it.", size=130, top=60)
    items = ["A real home in Miramar, cage free", "Outside play every hour", "Daily photo and video updates",
             "Beds and supplies, we provide them", "Pool time, supervised", "A slow, careful intro to the group"]
    yy = max(y - 10, 440)
    for it in items:
        check(d, 90, yy + 4, 1.0)
        d.text((165, yy - 4), it, font=note(56), fill=CHAR)
        yy += 84
    d.text((90, yy + 4), "Dogs under 50 lb. Over 50 lb: $75. Puppies and seniors: $80.", font=note(38), fill=CHAR)
    yy += 50
    d.rounded_rectangle([70, yy + 26, W - 70, yy + 176], 30, fill=PINK)
    f = brush(56)
    for i, l in enumerate(["Pick up before 10 AM?", "Your last day is free."]):
        d.text(((W - d.textlength(l, font=f)) / 2, yy + 40 + i * 64), l, font=f, fill=CHAR)
    brand_bar(d)
    return im


def ad12():
    im, d, y = frame("NERVOUS ABOUT THE FIRST STAY?", "Start with one night.", size=140, top=60)
    top = max(y, 470)
    # two calendar pages: 1 night, then the big trip
    for i, (x0, lab, sub) in enumerate(((110, "1 NIGHT", "first"), (600, "THE BIG", "trip"))):
        d.rounded_rectangle([x0, top + 40, x0 + 370, top + 340], 22, outline=CHAR, width=7, fill=CREAM)
        d.rectangle([x0 + 4, top + 44, x0 + 366, top + 110], fill=PINK)
        for rx in (x0 + 90, x0 + 280):
            line(d, [(rx, top + 18), (rx, top + 70)], 9, amp=0.6)
        f = hand(96)
        d.text((x0 + (370 - d.textlength(lab, font=f)) / 2, top + 140), lab, font=f, fill=CHAR, stroke_width=3, stroke_fill=CHAR)
        f2 = brush(58)
        d.text((x0 + (370 - d.textlength(sub, font=f2)) / 2, top + 250), sub, font=f2, fill=CHAR)
    line(d, [(495, top + 190), (585, top + 190)], 9); line(d, [(560, top + 165), (588, top + 190), (560, top + 215)], 9)
    yy = top + 400
    for l in ["Your dog learns the house, the pack and our team.",
              "So the real stay feels familiar."]:
        for w in wrap(d, l, note(48), W - 100):
            d.text(((W - d.textlength(w, font=note(48))) / 2, yy), w, font=note(48), fill=CHAR); yy += 62
    dog(d, 540, min(yy + 40, H - 290), 0.7)
    brand_bar(d)
    return im


def ad13():
    im = Image.new("RGB", (W, H), CHAR); d = ImageDraw.Draw(im)
    lf = hand(76)
    label = "DON'T TAKE OUR WORD FOR IT."
    lw = d.textlength(label, font=lf)
    d.text(((W - lw) / 2, 70), label, font=lf, fill=CREAM, stroke_width=2, stroke_fill=CREAM)
    line(d, [((W - lw) / 2 - 10, 166), ((W + lw) / 2 + 10, 162)], 12, PINK, amp=1.2)
    big = hand(330)
    t = "4.9"
    d.text(((W - d.textlength(t, font=big)) / 2, 210), t, font=big, fill=CREAM, stroke_width=6, stroke_fill=CREAM)
    for k in range(5):
        cx, cy, r = 300 + k * 120, 640, 46
        pts = [(cx + (r if j % 2 == 0 else r * 0.45) * math.sin(j * math.pi / 5),
                cy - (r if j % 2 == 0 else r * 0.45) * math.cos(j * math.pi / 5)) for j in range(10)]
        d.polygon(pts, fill=PINK)
    f = hand(120)
    for i, l in enumerate(["230+ GOOGLE REVIEWS", "FROM DOG PARENTS"]):
        d.text(((W - d.textlength(l, font=f)) / 2, 730 + i * 116), l, font=f, fill=CREAM, stroke_width=4, stroke_fill=CREAM)
    f2 = brush(64)
    l = "in Miramar and Pembroke Pines."
    d.text(((W - d.textlength(l, font=f2)) / 2, 980), l, font=f2, fill=CREAM)
    d.rectangle([0, H - 150, W, H], fill=CREAM)
    paw(d, 74, H - 90, 20, CHAR)
    d.text((112, H - 128), "Four Paws Inn", font=brand("SourceSerif4-normal", 50, 700), fill=CHAR)
    d.text((114, H - 64), HANDLE, font=brand("DMSans-normal", 30, 500), fill=CHAR)
    f3 = brand("DMSans-normal", 34, 600); cta = "Tap to check your dates"
    tw = d.textlength(cta, font=f3)
    d.rounded_rectangle([W - tw - 100, H - 108, W - 40, H - 40], 34, fill=PINK)
    d.text((W - tw - 70, H - 97), cta, font=f3, fill=CHAR)
    return im


CONCEPTS = {
    "AD07-KENNEL-VS-HOME-CutA": ad07,
    "AD08-NO-UPDATES-CutA": ad08,
    "AD09-ASK-5-QUESTIONS-CutA": ad09,
    "AD10-WHAT-DO-YOU-WANT-CutA": ad10,
    "AD11-60-A-DAY-STACK-CutA": ad11,
    "AD12-ONE-NIGHT-FIRST-CutA": ad12,
    "AD13-REVIEWS-PROOF-CutA": ad13,
}


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    pick = sys.argv[1:]
    for name, fn in CONCEPTS.items():
        if pick and not any(name.startswith(p) for p in pick):
            continue
        path = os.path.join(OUT, name + ".png")
        fn().save(path)
        print(path)
