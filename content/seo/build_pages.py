"""Build Wix blog draft payloads and a review file from content/seo/pages-*.json.
Usage: python3 content/seo/build_pages.py content/seo/pages-2026-10-11.json OUTDIR
Writes OUTDIR/<slug>.json (Wix create draft body) and prints the markdown review copy."""
import json, sys, uuid

MEMBER = "b5fdb080-0378-4095-83b3-689f3aae99c6"
IMAGE = {"id": "45e1ca_bb54fcd81ffe4b5a887932dc1f45e182~mv2.jpg",
         "url": "https://static.wixstatic.com/media/45e1ca_bb54fcd81ffe4b5a887932dc1f45e182~mv2.jpg",
         "height": 1600, "width": 1200}

def text(t, bold=False):
    dec = [{"type": "BOLD", "fontWeightValue": 700}] if bold else []
    return {"type": "TEXT", "id": "", "nodes": [], "textData": {"text": t, "decorations": dec}}

def para(t):
    nodes = []
    if t.startswith("**"):
        b, rest = t[2:].split("**", 1)
        nodes = [text(b, True), text(rest)]
    else:
        nodes = [text(t)]
    return {"type": "PARAGRAPH", "id": uuid.uuid4().hex[:8], "nodes": nodes,
            "paragraphData": {"textStyle": {"textAlignment": "AUTO"}}}

def heading(t):
    return {"type": "HEADING", "id": uuid.uuid4().hex[:8], "nodes": [text(t)],
            "headingData": {"level": 2, "textStyle": {"textAlignment": "AUTO"}}}

pages = json.load(open(sys.argv[1]))
out = sys.argv[2]
for p in pages:
    nodes = []
    md = [f"## {p['title']}", f"Slug: {p['slug']}", f"Meta: {p['meta']}", ""]
    for line in p["body"]:
        if line.startswith("## "):
            nodes.append(heading(line[3:])); md.append(line)
        else:
            nodes.append(para(line)); md.append(line)
        md.append("")
    body = {"draftPost": {"title": p["title"], "memberId": MEMBER,
            "seoSlug": p["slug"],
            "seoData": {"tags": [{"type": "meta", "props": {"name": "description", "content": p["meta"]},
                                  "children": "", "custom": False, "disabled": False}],
                        "settings": {"preventAutoRedirect": False,
                                     "keywords": [{"term": p["keyword"], "isMain": True}]}},
            "media": {"wixMedia": {"image": IMAGE}, "displayed": True, "custom": False},
            "richContent": {"nodes": nodes}}}
    json.dump(body, open(f"{out}/{p['slug']}.json", "w"))
    print("\n".join(md))
