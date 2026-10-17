#!/usr/bin/env python3
"""
Static ad set 2 for Four Paws Inn (AD14 to AD29): reviews first, then authority, then new styles.

Usage:
  python3 scripts/static-ads/render2.py            # render all
  python3 scripts/static-ads/render2.py AD15       # render one

Review quotes are copied word for word from content/reviews/google-business-reviews.csv
(public Google reviews). Names are shown as first name plus last initial. Never edit the
words inside a quote; trim only with "..." and never change meaning.
Photos are real frames from our footage library (content/ads/statics/photos, clip id in the
file name). Never use AI images of dogs, people, the home or the yards.
"""
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter
import render as R

PH = os.path.join(R.ROOT, "content", "ads", "statics", "photos")
W, H, CREAM, PINK, CHAR = R.W, R.H, R.CREAM, R.PINK, R.CHAR


def serif(size, italic=False):
    return R.brand("SourceSerif4-italic" if italic else "SourceSerif4-normal", size, 700)


def sans(size, weight=500):
    return R.brand("DMSans-normal", size, weight)


def photo(name, box):
    """Cover fit a library frame into box (x1, y1, x2, y2)."""
    im = Image.open(os.path.join(PH, name)).convert("RGB")
    bw, bh = box[2] - box[0], box[3] - box[1]
    s = max(bw / im.width, bh / im.height)
    im = im.resize((int(im.width * s + 1), int(im.height * s + 1)))
    x = (im.width - bw) // 2
    y = max(0, min(im.height - bh, int((im.height - bh) * 0.35)))
    return im.crop((x, y, x + bw, y + bh))


def stars(d, cx, cy, r, n=5, gap=None, fill=PINK):
    gap = gap or r * 2.4
    x0 = cx - gap * (n - 1) / 2
    for k in range(n):
        x = x0 + k * gap
        pts = [(x + (r if j % 2 == 0 else r * 0.45) * math.sin(j * math.pi / 5),
                cy - (r if j % 2 == 0 else r * 0.45) * math.cos(j * math.pi / 5)) for j in range(10)]
        d.polygon(pts, fill=fill)


def center(d, y, text, ft, fill=CHAR, maxw=W - 140, lh=None):
    lh = lh or int(ft.size * 1.18)
    for l in R.wrap(d, text, ft, maxw):
        d.text(((W - d.textlength(l, font=ft)) / 2, y), l, font=ft, fill=fill)
        y += lh
    return y


def left(d, x, y, text, ft, fill=CHAR, maxw=W - 160, lh=None):
    lh = lh or int(ft.size * 1.2)
    for l in R.wrap(d, text, ft, maxw):
        d.text((x, y), l, font=ft, fill=fill)
        y += lh
    return y


def bar(d, dark=True):
    if dark:
        R.brand_bar(d)
        return
    y = H - 150
    d.rectangle([0, y, W, H], fill=CREAM)
    R.paw(d, 74, y + 60, 20, CHAR)
    d.text((112, y + 22), "Four Paws Inn", font=serif(50), fill=CHAR)
    d.text((114, y + 86), R.HANDLE, font=sans(30), fill=CHAR)
    f = sans(34, 600); cta = "Tap to check your dates"; tw = d.textlength(cta, font=f)
    d.rounded_rectangle([W - tw - 100, y + 42, W - 40, y + 110], 34, fill=PINK)
    d.text((W - tw - 70, y + 53), cta, font=f, fill=CHAR)


def proof_line(d, y, fill=CHAR):
    f = sans(34, 600)
    t = "4.9 stars  |  230+ Google reviews"
    d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=fill)


# ---------------- REVIEWS ----------------

def ad14():
    """Single review, big quote, cream. Marietta M."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    d.ellipse([820, -260, 1340, 260], fill=PINK)
    d.text((80, 40), "“", font=serif(320), fill=PINK)
    stars(d, 300, 330, 34, gap=84)
    y = left(d, 90, 410, "I didn’t want my dog crated and with four paws, there is no crating. Super happy!",
             serif(84, True), maxw=W - 180, lh=104)
    d.text((90, y + 40), "Marietta M.", font=serif(52), fill=CHAR)
    d.text((90, y + 110), "Google review, Sept 2026", font=sans(34), fill=CHAR)
    proof_line(d, H - 220)
    bar(d)
    return im


def ad15():
    """Photo top, review card bottom. Mark M."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    im.paste(photo("LIB-0033_6.jpg", (0, 0, W, 700)), (0, 0))
    d.rounded_rectangle([50, 600, W - 50, 1160], 36, fill=CREAM, outline=CHAR, width=4)
    stars(d, 220, 670, 26, gap=64)
    d.text((W - 300, 650), "Google review", font=sans(30, 600), fill=CHAR)
    y = left(d, 100, 720, "“I can tell in the daily videos he is having a great time playing with the other dogs, "
             "and knowing its cageless is such a relief when I have to go away!”", serif(52, True), maxw=W - 200, lh=66)
    d.text((100, y + 20), "Mark M.", font=serif(44), fill=CHAR)
    bar(d)
    return im


def ad16():
    """Review wall: six short quotes."""
    im = Image.new("RGB", (W, H), CHAR); d = ImageDraw.Draw(im)
    center(d, 60, "230+ dog parents said it first.", serif(62), fill=CREAM)
    stars(d, W / 2, 175, 26, gap=64)
    quotes = [("Super happy!", "Marietta M."),
              ("Pups did not want to leave at all.", "Elaine P."),
              ("Left my dog for 9 days and received a Video every day.", "mandy p."),
              ("My dog loved it here.", "Erin H."),
              ("Clean and very organized.", "Mark M."),
              ("Highly recommended. A+++", "James P.")]
    cw, ch = 470, 270
    for k, (q, n) in enumerate(quotes):
        x = 50 + (k % 2) * (cw + 40); y = 240 + (k // 2) * (ch + 22)
        d.rounded_rectangle([x, y, x + cw, y + ch], 26, fill=CREAM)
        stars(d, x + 110, y + 42, 15, gap=36)
        yy = y + 72
        for l in R.wrap(d, "“" + q + "”", serif(38, True), cw - 56):
            d.text((x + 28, yy), l, font=serif(38, True), fill=CHAR); yy += 48
        d.text((x + 28, y + ch - 52), n, font=sans(28, 600), fill=CHAR)
    bar(d, dark=False)
    return im


def ad17():
    """First time boarding. Freddy C. Dark."""
    im = Image.new("RGB", (W, H), CHAR); d = ImageDraw.Draw(im)
    d.text((70, 60), "FIRST TIME BOARDING YOUR DOG?", font=sans(40, 700), fill=PINK)
    y = left(d, 70, 150, "Read what Freddy said.", serif(96), fill=CREAM, maxw=W - 140, lh=110)
    stars(d, 230, y + 70, 30, gap=72)
    y = left(d, 70, y + 140, "“10/10 highly recommend! It was my first time leaving my dog this week and the whole "
             "process was very organized... Amazing place!”", serif(62, True), fill=CREAM, maxw=W - 140, lh=80)
    d.text((70, y + 30), "Freddy C., Google review", font=sans(36, 600), fill=CREAM)
    proof_line(d, H - 230, fill=CREAM)
    bar(d, dark=False)
    return im


def ad18():
    """Full photo, quote as headline. Elaine P."""
    im = photo("LIB-0003_1.jpg", (0, 0, W, H)); d = ImageDraw.Draw(im, "RGBA")
    d.rectangle([0, 0, W, 470], fill=CHAR + (215,))
    stars(d, W / 2, 80, 28, gap=68)
    y = center(d, 130, "“Pups did not want to leave at all.”", serif(88, True), fill=CREAM, lh=102)
    center(d, y + 14, "Elaine P., Google review", sans(36, 600), fill=CREAM)
    bar(d)
    return im


def ad19():
    """What parents say about the daily videos."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    y = center(d, 60, "What dog parents say about our daily videos", serif(70), lh=84)
    q = [("we really appreciated the daily videos!", "Mariana B."),
         ("Left my dog for 9 days and received a Video every day.", "mandy p."),
         ("I got a video update each day of Greta's activities", "Mark I."),
         ("I received videos every day, very happy with the service", "Aylen L.")]
    y += 30
    for text, n in q:
        d.rounded_rectangle([60, y, 74, y + 150], 6, fill=PINK)
        yy = left(d, 110, y, "“" + text + "”", serif(54, True), maxw=W - 190, lh=68)
        d.text((110, yy + 6), n, font=sans(30, 600), fill=CHAR)
        y = yy + 72
    bar(d)
    return im


def ad20():
    """The review we get most: we will be back."""
    im = Image.new("RGB", (W, H), PINK); d = ImageDraw.Draw(im)
    y = center(d, 70, "The line we read most in our reviews:", sans(44, 700))
    y = center(d, y + 20, "“We’ll definitely be back!”", serif(104, True), lh=118)
    q = [("We’ll definitely be back!", "Mariana B."),
         ("Thanks Amanda, we will be back!", "Erin H."),
         ("We will definitely be using them again.", "Kevin C."),
         ("We would absolutely book again!", "Yulia H."),
         ("Will be booking again soon!", "Johnny")]
    y += 50
    for text, n in q[1:]:
        d.rounded_rectangle([70, y, W - 70, y + 110], 24, fill=CREAM)
        d.text((100, y + 18), "“" + text + "”", font=serif(40, True), fill=CHAR)
        d.text((100, y + 66), n, font=sans(28, 600), fill=CHAR)
        y += 130
    bar(d)
    return im


def ad21():
    """Photo with big rating badge."""
    im = photo("LIB-0023_3.jpg", (0, 0, W, H)); d = ImageDraw.Draw(im, "RGBA")
    d.rounded_rectangle([110, 120, W - 110, 560], 44, fill=CREAM + (240,))
    t = "4.9"
    d.text(((W - d.textlength(t, font=serif(190))) / 2, 120), t, font=serif(190), fill=CHAR)
    stars(d, W / 2, 400, 32, gap=76)
    center(d, 450, "from 230+ dog parents on Google", sans(44, 600))
    bar(d)
    return im


# ---------------- AUTHORITY ----------------

def ad22():
    """Experience authority, approved wording only."""
    im = Image.new("RGB", (W, H), CHAR); d = ImageDraw.Draw(im)
    d.text((70, 70), "WHO WATCHES YOUR DOG", font=sans(40, 700), fill=PINK)
    y = left(d, 70, 150, "Thousands of hours with every breed and personality.", serif(92), fill=CREAM, lh=108)
    pts = ["Introducing all kinds of breeds together", "Managing packs of dogs for years",
           "Years of hands on training experience", "A slow, careful intro for every new dog"]
    y += 50
    for p in pts:
        R.check(d, 80, y + 6, 0.9, PINK)
        d.text((150, y), p, font=sans(44, 500), fill=CREAM)
        y += 84
    proof_line(d, H - 240, fill=CREAM)
    bar(d, dark=False)
    return im


def ad23():
    """By the numbers."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    center(d, 70, "Four Paws Inn, by the numbers", serif(60))
    tiles = [("4.9", "star rating on Google"), ("230+", "Google reviews"),
             ("Every hour", "outside to play"), ("Every day", "photo and video updates")]
    for k, (big, small) in enumerate(tiles):
        x = 60 + (k % 2) * 500; y = 220 + (k // 2) * 430
        d.rounded_rectangle([x, y, x + 460, y + 390], 36, fill=CHAR if k in (0, 3) else PINK)
        ink = CREAM if k in (0, 3) else CHAR
        f = serif(130 if len(big) < 6 else 74)
        d.text((x + (460 - d.textlength(big, font=f)) / 2, y + (70 if len(big) < 6 else 100)), big, font=f, fill=ink)
        for i, l in enumerate(R.wrap(d, small, sans(40, 600), 400)):
            d.text((x + (460 - d.textlength(l, font=sans(40, 600))) / 2, y + 260 + i * 50), l, font=sans(40, 600), fill=ink)
    bar(d)
    return im


# ---------------- NEW STYLES ----------------

def ad24():
    """iPhone Notes style list."""
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    d.text((50, 50), "< Notes", font=sans(40, 500), fill=(214, 158, 46))
    d.text((W - 120, 50), "...", font=sans(40, 700), fill=(214, 158, 46))
    d.text((60, 150), "Before I board my dog", font=sans(66, 700), fill=(20, 20, 20))
    d.text((60, 240), "October 2026", font=sans(32), fill=(140, 140, 140))
    items = [("Cage free?", True), ("Outside more than twice a day?", True), ("Photos and videos while I’m gone?", True),
             ("Lots of real reviews?", True), ("Can they handle a nervous first timer?", True),
             ("Last day free if I pick up early?", True)]
    y = 320
    for t, ok in items:
        d.ellipse([60, y + 4, 112, y + 56], fill=PINK, outline=PINK)
        R.check(d, 70, y + 14, 0.7, CHAR)
        d.text((140, y), t, font=sans(46), fill=(20, 20, 20))
        y += 96
    d.text((60, y + 30), "Four Paws Inn checked every box.", font=sans(48, 700), fill=(20, 20, 20))
    bar(d)
    return im


def ad25():
    """Comparison table: Four Paws Inn vs ask the other place."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    y = center(d, 50, "Before you book, compare.", serif(80))
    rows = ["Cage free, real home", "Outside to play every hour", "Daily photo and video updates",
            "Slow intro to the group", "Supervised pool time", "230+ Google reviews"]
    top = y + 30
    d.rounded_rectangle([60, top, W - 60, top + 100], 20, fill=CHAR)
    d.text((630, top + 26), "Us", font=sans(44, 700), fill=CREAM)
    d.text((800, top + 26), "Them?", font=sans(44, 700), fill=CREAM)
    y = top + 120
    for i, r in enumerate(rows):
        if i % 2 == 0:
            d.rectangle([60, y - 10, W - 60, y + 80], fill=(243, 236, 228))
        d.text((90, y + 8), r, font=sans(40, 500), fill=CHAR)
        R.check(d, 630, y + 8, 0.9, CHAR)
        d.text((830, y), "?", font=serif(60), fill=CHAR)
        y += 100
    center(d, y + 30, "Ask the other place. Then send us your dates.", sans(40, 600))
    bar(d)
    return im


def ad26():
    """Full photo, short headline, minimal."""
    im = photo("LIB-0033_7.jpg", (0, 0, W, H)); d = ImageDraw.Draw(im, "RGBA")
    g = Image.new("L", (1, 400)); [g.putpixel((0, i), int(220 * (1 - i / 400))) for i in range(400)]
    shade = Image.new("RGBA", (W, 400), CHAR + (0,)); shade.putalpha(g.resize((W, 400)))
    im.paste(shade, (0, 0), shade)
    center(d, 60, "Their trip can be fun too.", serif(88), fill=CREAM, lh=100)
    bar(d)
    return im


def ad27():
    """Holiday dates, no fake scarcity."""
    im = Image.new("RGB", (W, H), CHAR); d = ImageDraw.Draw(im)
    im.paste(photo("LIB-0044_4.jpg", (0, 560, W, H - 150)), (0, 560))
    d.text((70, 70), "THANKSGIVING  |  CHRISTMAS  |  NEW YEAR", font=sans(38, 700), fill=PINK)
    y = left(d, 70, 140, "Holiday dates go first. Send yours now.", serif(90), fill=CREAM, lh=104)
    left(d, 70, y + 20, "New dog? Book one overnight first, so the big stay feels familiar.", sans(40), fill=CREAM, lh=52)
    bar(d)
    return im


def ad28():
    """Photo with 'Not a kennel' callout."""
    im = photo("LIB-0003_5.jpg", (0, 0, W, H)); d = ImageDraw.Draw(im, "RGBA")
    d.rounded_rectangle([60, 70, 780, 330], 30, fill=CREAM + (240,))
    d.text((100, 95), "This is the yard.", font=serif(76), fill=CHAR)
    d.text((100, 190), "Not a kennel run.", font=serif(76, True), fill=CHAR)
    d.rounded_rectangle([60, H - 330, 700, H - 190], 30, fill=PINK)
    d.text((95, H - 310), "Outside to play every hour", font=sans(44, 700), fill=CHAR)
    bar(d)
    return im


def ad29():
    """Static Reviews refresh: same review led idea, current facts."""
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    im.paste(photo("LIB-0033_6.jpg", (0, 0, W, 560)), (0, 0))
    d.rounded_rectangle([W / 2 - 300, 470, W / 2 + 300, 650], 40, fill=CHAR)
    d.text((W / 2 - 270, 480), "4.9", font=serif(130), fill=CREAM)
    stars(d, W / 2 + 120, 535, 22, gap=52)
    d.text((W / 2 - 40, 570), "230+ Google reviews", font=sans(34, 600), fill=CREAM)
    y = center(d, 690, "Cage free home boarding in Miramar", serif(64), lh=76)
    for t in ["Outside to play every hour", "Daily photo and video updates", "$60 a day for dogs under 50 lb"]:
        tw = d.textlength(t, font=sans(42, 500))
        R.check(d, (W - tw) / 2 - 70, y + 24, 0.8, CHAR)
        d.text(((W - tw) / 2, y + 20), t, font=sans(42, 500), fill=CHAR)
        y += 70
    bar(d)
    return im


CONCEPTS = {
    "AD14-REVIEW-NO-CRATE-CutA": ad14,
    "AD15-REVIEW-PHOTO-CAGELESS-CutA": ad15,
    "AD16-REVIEW-WALL-CutA": ad16,
    "AD17-REVIEW-FIRST-TIME-CutA": ad17,
    "AD18-REVIEW-DIDNT-WANT-TO-LEAVE-CutA": ad18,
    "AD19-REVIEW-DAILY-VIDEOS-CutA": ad19,
    "AD20-REVIEW-WE-WILL-BE-BACK-CutA": ad20,
    "AD21-RATING-BADGE-PHOTO-CutA": ad21,
    "AD22-AUTHORITY-EXPERIENCE-CutA": ad22,
    "AD23-AUTHORITY-NUMBERS-CutA": ad23,
    "AD24-NOTES-APP-CutA": ad24,
    "AD25-COMPARE-TABLE-CutA": ad25,
    "AD26-PHOTO-THEIR-TRIP-CutA": ad26,
    "AD27-HOLIDAY-DATES-CutA": ad27,
    "AD28-PHOTO-NOT-A-KENNEL-CutA": ad28,
    "AD29-STATIC-REVIEWS-REFRESH-CutA": ad29,
}

if __name__ == "__main__":
    os.makedirs(R.OUT, exist_ok=True)
    pick = sys.argv[1:]
    for name, fn in CONCEPTS.items():
        if pick and not any(name.startswith(p) for p in pick):
            continue
        p = os.path.join(R.OUT, name + ".png")
        fn().convert("RGB").save(p)
        print(p)
