#!/usr/bin/env bash
# usage: ./render.sh data/example-rail.json out/name.gif   (needs node, ffmpeg, Chromium)
set -e
cd "$(dirname "$0")"
IN="$1"; OUT="${2:-out/post.gif}"; mkdir -p "$(dirname "$OUT")"
[ -d node_modules ] || npm install --no-audit --no-fund
MP4="${OUT%.gif}.mp4"
npx remotion render src/index.ts Post "$MP4" --props="$IN" --codec=h264
for W in 720 640 540; do
  ffmpeg -y -loglevel error -i "$MP4" -vf "fps=15,scale=$W:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 "$OUT"
  [ "$(stat -c%s "$OUT")" -lt 5000000 ] && break
done
rm -f "$MP4"   # deliver the GIF only
echo "GIF: $OUT ($(stat -c%s "$OUT") bytes)"
