#!/usr/bin/env bash
# Multiply one real-footage body clip into text-hook ad variants.
# Usage: scripts/video-assets/multiply.sh <batch-date> <body.mov> [original-hook.mov]
# Needs: ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg), and assets rendered first:
#   NODE_PATH=$(npm root -g) node scripts/video-assets/render.js <batch-date>
# Each video in content/video/<batch-date>/videos.json becomes:
#   body with its hook card on the first 3 seconds, then a 2.5 second end card.
# If an original hook clip is given, also builds hook + body + end card.
set -euo pipefail
D=$1; BODY=$2; HOOK=${3:-}
FF=${FFMPEG:-ffmpeg}
A=content/video/$D/assets; O=content/video/$D/out; mkdir -p "$O"
N="scale=1080:1920,fps=30,format=yuv420p,setsar=1"
AN="aresample=44100,aformat=channel_layouts=stereo"
ENC=(-c:v libx264 -crf 20 -preset veryfast -c:a aac -b:a 128k -movflags +faststart)
IDS=$(node -e "console.log(require('./content/video/$D/videos.json').videos.map(v=>v.id).join(' '))")
for id in $IDS; do
  "$FF" -loglevel error -y -i "$BODY" -loop 1 -i "$A/$id-title.png" -loop 1 -t 2.5 -i "$A/$id-end.png" -f lavfi -t 2.5 -i anullsrc=r=44100:cl=stereo \
    -filter_complex "[0:v]$N[b];[1:v]format=rgba[t];[b][t]overlay=0:0:enable='between(t,0,3)':shortest=1[bv];[2:v]$N[e];[0:a]$AN[ba];[bv][ba][e][3:a]concat=n=2:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" "${ENC[@]}" "$O/$id.mp4"
  echo "$O/$id.mp4"
done
if [ -n "$HOOK" ]; then
  first=$(echo $IDS | cut -d' ' -f1)
  "$FF" -loglevel error -y -i "$HOOK" -i "$BODY" -loop 1 -t 2.5 -i "$A/$first-end.png" -f lavfi -t 2.5 -i anullsrc=r=44100:cl=stereo \
    -filter_complex "[0:v]$N[h];[1:v]$N[b];[2:v]$N[e];[0:a]$AN[ha];[1:a]$AN[ba];[h][ha][b][ba][e][3:a]concat=n=3:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" "${ENC[@]}" "$O/original-hook-endcard.mp4"
  echo "$O/original-hook-endcard.mp4"
fi
