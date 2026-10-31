import sys, json, io; from common import *
from PIL import Image
from playwright.sync_api import sync_playwright
out, s = sys.argv[1], json.load(open(sys.argv[2]))
st = s["stages"]; mx = max(x["v"] for x in st)
cols = ""
for i, x in enumerate(st):
    cols += f'<div class="c"><div class="bw"><div class="b" id="b{i}"></div></div><div class="cv" id="v{i}">0</div><div class="cn">{x["n"]}</div></div>'
html = f"""<html><head><style>{font_css()}
*{{margin:0;box-sizing:border-box}}
body{{width:1080px;height:1350px;font-family:IT;color:#0B0F1A;background:#F6F8FB;position:relative;overflow:hidden}}
.grid{{position:absolute;inset:0;background-image:radial-gradient(#D6DEE9 2.5px,transparent 2.5px);background-size:40px 40px}}
.bar{{position:absolute;left:60px;right:60px;top:60px;height:96px;background:#fff;border:3px solid #DDE5EF;border-radius:28px;display:flex;align-items:center;justify-content:space-between;padding:0 36px;font-weight:800;font-size:38px;letter-spacing:-1px;box-shadow:0 12px 30px rgba(20,60,120,.10)}}
.bd{{font-size:26px;font-weight:600;color:#8A2BE2;background:#F1E6FC;border-radius:20px;padding:8px 22px;letter-spacing:0}}
.big{{position:absolute;left:80px;top:215px;font-weight:800;font-size:250px;line-height:1;letter-spacing:-10px;color:#2E9BFF}}
.bl{{position:absolute;left:330px;top:262px;font-weight:800;font-size:58px;line-height:1.08;letter-spacing:-2px}}
.bs{{position:absolute;left:332px;top:392px;font-family:IS;font-style:italic;font-size:46px;color:#4A5568}}
.cols{{position:absolute;left:60px;right:60px;top:560px;height:560px;display:flex;gap:18px}}
.c{{flex:1;background:#fff;border:3px solid #DDE5EF;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:22px 0;box-shadow:0 12px 30px rgba(20,60,120,.10)}}
.bw{{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;padding:0 22px}}
.b{{width:100%;height:0;border-radius:16px;background:#2E9BFF}}
.c:nth-child(5) .b{{background:#16A36A}}
.cv{{font-weight:800;font-size:54px;letter-spacing:-2px;margin-top:14px}}.cn{{font-weight:600;font-size:26px;color:#5B6678;margin-top:2px}}
.ft{{position:absolute;left:0;right:0;top:1135px;text-align:center;font-weight:600;font-size:24px;color:#8793A6}}
.cta{{position:absolute;left:0;right:0;bottom:0;height:150px;background:#fff;border-top:3px solid #DDE5EF;display:flex;align-items:center;justify-content:center;gap:22px;font-weight:600;font-size:50px;letter-spacing:-1px}}
.k{{background:#2E9BFF;color:#fff;border-radius:18px;padding:6px 28px;font-weight:800}}
</style></head><body><div class="grid"></div>
<div class="bar"><span>{s["bar"]}</span><span class="bd">{s["badge"]}</span></div>
<div class="big" id="big">0</div><div class="bl">{s["bigl"]}</div><div class="bs">{s["sub"]}</div>
<div class="cols">{cols}</div><div class="ft">{s["foot"]}</div>
<div class="cta"><span>{s["cta_pre"]}</span><span class="k">{s["cta_key"]}</span><span>{s["cta_post"]}</span></div></body></html>"""
frames, durs = [], []
def snap(pg, ms):
    frames.append(Image.open(io.BytesIO(pg.screenshot())).convert("RGB").resize((720,900), Image.LANCZOS)); durs.append(ms)
def setc(pg, i, f):
    v = round(st[i]["v"] * f); h = int(360 * st[i]["v"] / mx * f)
    pg.evaluate(f"document.getElementById('v{i}').textContent='{v}';document.getElementById('b{i}').style.height='{h}px'")
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width":1080,"height":1350}); pg.set_content(html); pg.wait_for_timeout(500)
    snap(pg, 600)
    for i in range(len(st)):
        for f in (0.35, 0.7, 1.0):
            setc(pg, i, f); snap(pg, 120 if f < 1 else 450)
    for f in (0.3, 0.6, 1.0):
        pg.evaluate(f"document.getElementById('big').textContent='{round(int(s['big'])*f)}'"); snap(pg, 120 if f < 1 else 3200)
    b.close()
pal = [f.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for f in frames]
pal[0].save(out, save_all=True, append_images=pal[1:], duration=durs, loop=0, optimize=True, disposal=1)
