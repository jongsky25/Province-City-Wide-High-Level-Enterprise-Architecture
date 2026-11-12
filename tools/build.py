#!/usr/bin/env python3
"""Bundle index.html + assets into single self-contained files.

Outputs:
  dist/connected-province-health.html   one file that opens offline (workshops, USB)
  dist/artifact/index.html              same content without the document wrapper, for claude.ai publishing

Usage: python3 tools/build.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def bundle():
    html = read("index.html")
    css = read("assets/css/styles.css")
    html = html.replace('<link rel="stylesheet" href="assets/css/styles.css">', "<style>\n" + css + "\n</style>")
    for js in ("assets/js/content.js", "assets/js/app.js"):
        tag = '<script src="%s"></script>' % js
        assert tag in html, tag
        html = html.replace(tag, "<script>\n" + read(js).replace("</script", "<\\/script") + "\n</script>")
    return html


def artifact_variant(html):
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
    # the artifact skeleton supplies charset and viewport
    head = re.sub(r'\s*<meta charset="utf-8">', "", head)
    head = re.sub(r'\s*<meta name="viewport"[^>]*>', "", head)
    return head.strip() + "\n" + body.strip() + "\n"


def main():
    html = bundle()
    DIST.mkdir(exist_ok=True)
    (DIST / "connected-province-health.html").write_text(html, encoding="utf-8")
    (DIST / "artifact").mkdir(exist_ok=True)
    (DIST / "artifact" / "index.html").write_text(artifact_variant(html), encoding="utf-8")
    print("built", DIST / "connected-province-health.html", "and", DIST / "artifact" / "index.html")


if __name__ == "__main__":
    main()
