#!/usr/bin/env python3
"""
Static ad set 3 (AD36 to AD38), Oct 17 2026: replacements held for the Oct 21 swap.
Only swap out ads that perform badly (Alex). Facts from fourpawsinn/business-facts.md
(no hidden fees, curbside hand off, small groups and slow intro). Never "safe", never a dog count,
never a discount, never a competitor name.

Usage: python3 scripts/static-ads/render3.py
"""
import os, sys
from PIL import Image, ImageDraw
import render as R
import render2 as R2

W, H, CREAM, PINK, CHAR = R.W, R.H, R.CREAM, R.PINK, R.CHAR
serif, sans, center, left, bar = R2.serif, R2.sans, R2.center, R2.left, R2.bar


def ad36():
    """No hidden fees: two receipts."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    y = center(d, 50, "No hidden fees. Ever.", serif(84))
    center(d, y, "What other boarding bills can look like, and ours.", sans(36))
    top = y + 90
    # left receipt
    d.rounded_rectangle([50, top, 520, top + 640], 20, fill=(255, 255, 255), outline=(200, 196, 190), width=3)
    d.text((80, top + 30), "OTHER PLACES", font=sans(36, 700), fill=CHAR)
    rows = [("Boarding, per night", "$50"), ("Extra 30 min play", "+$10"), ("Toy time", "+$5"),
            ("Required bath", "+ fee"), ("Check out bath", "+ fee")]
    yy = top + 110
    for a, b in rows:
        d.text((80, yy), a, font=sans(32), fill=CHAR)
        d.text((490 - d.textlength(b, font=sans(32, 700)), yy), b, font=sans(32, 700), fill=CHAR)
        yy += 70
    R.line(d, [(80, yy + 10), (490, yy + 10)], 4, amp=0.5)
    d.text((80, yy + 40), "Total", font=sans(40, 700), fill=CHAR)
    d.text((490 - d.textlength("?", font=serif(60)), yy + 22), "?", font=serif(60), fill=CHAR)
    # right receipt
    d.rounded_rectangle([560, top, 1030, top + 640], 20, fill=CHAR)
    d.text((590, top + 30), "FOUR PAWS INN", font=sans(36, 700), fill=CREAM)
    rows = ["A real home, cage free", "Outside every hour", "Toys and play", "Photos and videos daily",
            "Beds and supplies"]
    yy = top + 110
    for t in rows:
        R.check(d, 590, yy + 2, 0.6, PINK)
        d.text((640, yy), t, font=sans(32), fill=CREAM)
        yy += 70
    R.line(d, [(590, yy + 10), (1000, yy + 10)], 4, c=PINK, amp=0.5)
    d.text((590, yy + 40), "$60 a day", font=serif(54), fill=CREAM)
    d.text((590, yy + 105), "Nothing added at pick up.", font=sans(30), fill=CREAM)
    center(d, top + 680, "Dogs under 50 lb. Over 50 lb is $75 a day.", sans(32))
    bar(d)
    return im


def ad37():
    """Curbside hand off, real photo."""
    im = R2.photo("LIB-0027_4-curb.jpg", (0, 0, W, H)); d = ImageDraw.Draw(im, "RGBA")
    d.rounded_rectangle([50, 60, W - 50, 520], 36, fill=CREAM + (242,))
    y = left(d, 100, 100, "Pull up. Text us.", serif(84), lh=96)
    y = left(d, 100, y, "We bring your dog to your car.", serif(84, True), maxw=W - 200, lh=96)
    left(d, 100, y + 20, "Most families never leave their seat.", sans(40, 600))
    d.rounded_rectangle([50, H - 340, 640, H - 200], 30, fill=PINK)
    d.text((85, H - 318), "In and out in about 20 seconds", font=sans(40, 700), fill=CHAR)
    bar(d)
    return im


def ad38():
    """Sketchbook: slow intro, small groups."""
    im, d, y = R.frame("SHY OR SELECTIVE DOG?", "We never throw a new dog into the pack.", size=104)
    top = max(y + 10, 480)
    steps = [("1", "One on one", "time with our team"), ("2", "Quiet time", "to explore the house"),
             ("3", "Small group", "only when ready")]
    xs = [180, 540, 900]
    for (n, a, b), x in zip(steps, xs):
        R.oval(d, x, top + 40, 40, 40, fill=PINK)
        d.text((x - d.textlength(n, font=R.hand(70)) / 2, top - 2), n, font=R.hand(70), fill=CHAR, stroke_width=2, stroke_fill=CHAR)
        f = R.hand(64)
        d.text((x - d.textlength(a, font=f) / 2, top + 100), a, font=f, fill=CHAR, stroke_width=2, stroke_fill=CHAR)
        f2 = R.note(36)
        d.text((x - d.textlength(b, font=f2) / 2, top + 175), b, font=f2, fill=CHAR)
    for x1, x2 in ((260, 460), (620, 820)):
        R.line(d, [(x1, top + 40), (x2, top + 40)], 7)
        R.line(d, [(x2 - 25, top + 20), (x2, top + 40), (x2 - 25, top + 60)], 7)
    gy = top + 330
    R.person(d, 170, gy - 40, 0.55, arms="open")
    R.dog(d, 300, gy + 120, 0.55, flip=True)
    R.dog(d, 560, gy + 130, 0.55)
    R.dog(d, 820, gy + 110, 0.5, flip=True)
    R.dog(d, 950, gy + 140, 0.45)
    center(d, H - 230, "Small groups on purpose, so every dog bonds with us.", R.note(40))
    R.brand_bar(d)
    return im


CONCEPTS = {
    "AD36-NO-HIDDEN-FEES-CutA": ad36,
    "AD37-CURBSIDE-20-SECONDS-CutA": ad37,
    "AD38-SLOW-INTRO-SKETCH-CutA": ad38,
}

if __name__ == "__main__":
    pick = sys.argv[1:]
    for name, fn in CONCEPTS.items():
        if pick and not any(name.startswith(p) for p in pick):
            continue
        p = os.path.join(R.OUT, name + ".png")
        fn().convert("RGB").save(p)
        print(p)
