import sys, json, io; from common import *
from PIL import Image
from playwright.sync_api import sync_playwright
out, spec = sys.argv[1], json.load(open(sys.argv[2]))
n = spec["nodes"]; cards = ""; wires = ""
gap = 60; top = 480; H = 180
for i, x in enumerate(n):
    y = top + i * (H + gap)
    cards += f'<div class="n" id="n{i}" style="top:{y}px"><div class="dot" style="background:{x.get("c","#2E9BFF")}">{i+1}</div><div><div class="t">{x["t"]}</div><div class="u">{x.get("s","")}</div></div></div>'
    if i < len(n) - 1: wires += f'<line id="w{i}" x1="540" y1="{y+H+4}" x2="540" y2="{y+H+gap-4}" stroke="#2E9BFF" stroke-width="7" stroke-dasharray="4 16" stroke-linecap="round" opacity="0"/>'
html = f"""<html><head><style>{font_css()}
*{{margin:0;box-sizing:border-box}}
body{{width:1080px;height:1920px;font-family:IT;color:#0B0F1A;background:#F6F8FB;position:relative;overflow:hidden}}
.grid{{position:absolute;inset:0;background-image:radial-gradient(#D6DEE9 2.5px,transparent 2.5px);background-size:40px 40px}}
.k{{position:absolute;left:80px;top:170px;font-weight:800;font-size:32px;letter-spacing:7px;color:#2E9BFF}}
.h{{position:absolute;left:80px;right:80px;top:230px;font-weight:800;font-size:86px;line-height:1.06;letter-spacing:-3px}}
.n{{position:absolute;left:150px;width:780px;height:{H}px;background:#fff;border:3px solid #DDE5EF;border-radius:34px;box-shadow:0 14px 34px rgba(20,60,120,.12);display:flex;align-items:center;gap:30px;padding:0 40px;opacity:0}}
.dot{{width:88px;height:88px;border-radius:44px;color:#fff;font-weight:800;font-size:44px;display:flex;align-items:center;justify-content:center;flex:none}}
.t{{font-weight:800;font-size:46px;letter-spacing:-1px}}.u{{font-weight:600;font-size:30px;color:#5B6678;margin-top:6px}}
.g{{position:absolute;left:0;top:0}}
.tag{{position:absolute;left:80px;right:80px;bottom:110px;font-family:IS;font-style:italic;font-size:56px;color:#2B3446;text-align:center;opacity:0}}
</style></head><body><div class="grid"></div><div class="k">{spec["kicker"]}</div><div class="h">{spec["title"]}</div>
<svg class="g" width="1080" height="1920">{wires}</svg>{cards}<div class="tag" id="tag">{spec["tag"]}</div></body></html>"""
frames = []; durs = []
def snap(pg, ms):
    png = pg.screenshot()
    frames.append(Image.open(io.BytesIO(png)).convert("RGB").resize((720,1280), Image.LANCZOS)); durs.append(ms)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width":1080,"height":1920}); pg.set_content(html); pg.wait_for_timeout(500)
    snap(pg, 700)
    for i in range(len(n)):
        pg.evaluate(f"document.getElementById('n{i}').style.opacity=0.45; document.getElementById('n{i}').style.transform='translateY(14px)'")
        if i: pg.evaluate(f"document.getElementById('w{i-1}').setAttribute('opacity',1)")
        snap(pg, 150)
        pg.evaluate(f"document.getElementById('n{i}').style.opacity=1; document.getElementById('n{i}').style.transform='none'")
        snap(pg, 900)
    pg.evaluate("document.getElementById('tag').style.opacity=1")
    snap(pg, 3000)
    b.close()
pal = [f.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for f in frames]
pal[0].save(out, save_all=True, append_images=pal[1:], duration=durs, loop=0, optimize=True, disposal=1)
