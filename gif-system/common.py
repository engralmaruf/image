import base64, glob, os, subprocess, tempfile
def font_css():
    d = tempfile.mkdtemp()
    for pkg in ("@fontsource/inter-tight@5.0.20", "@fontsource/instrument-serif@5.0.21"):
        subprocess.run(["npm", "pack", pkg], cwd=d, check=True, capture_output=True)
    for t in glob.glob(d + "/*.tgz"):
        subprocess.run(["tar", "xzf", t, "-C", d], check=True)
    css = ""
    for f, fam, w, st in [("inter-tight-latin-600-normal", "IT", 600, "normal"), ("inter-tight-latin-800-normal", "IT", 800, "normal"), ("instrument-serif-latin-400-italic", "IS", 400, "italic")]:
        b = base64.b64encode(open(f"{d}/package/files/{f}.woff2", "rb").read()).decode()
        css += f"@font-face{{font-family:{fam};font-weight:{w};font-style:{st};src:url(data:font/woff2;base64,{b}) format('woff2')}}"
    return css
def shot(html, out, w=1080, h=1350):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium", args=["--no-sandbox"]); pg = b.new_page(viewport={"width": w, "height": h})
        pg.set_content(html); pg.wait_for_timeout(400); pg.screenshot(path=out); b.close()
