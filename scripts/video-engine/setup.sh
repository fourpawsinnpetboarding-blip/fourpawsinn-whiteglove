#!/bin/bash
# One time per container: ffmpeg (static build with zscale/tonemap), Pillow, fontTools.
# Prints the ffmpeg path to use as FFMPEG.
set -e
W=${VE_WORK:-/tmp/video-engine}; mkdir -p "$W"
if [ ! -x "$W/node_modules/ffmpeg-static/ffmpeg" ]; then (cd "$W" && npm i --silent ffmpeg-static >/dev/null); fi
python3 -c "import PIL, fontTools" 2>/dev/null || pip install -q pillow fonttools brotli
echo "$W/node_modules/ffmpeg-static/ffmpeg"
