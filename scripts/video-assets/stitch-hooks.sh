#!/usr/bin/env bash
# Put each hook clip in front of the main video. One finished video per hook.
# Usage: scripts/video-assets/stitch-hooks.sh <folder>
#   <folder> holds concept*.mov (the main video) and hook1.mov, hook2.mov, ...
# Output: <folder>/out/<concept>-hook1.mp4, ... (1080x1920, 30fps, H.264, AAC)
# Needs ffmpeg (Mac: brew install ffmpeg) or FFMPEG=/path/to/ffmpeg.
set -euo pipefail
DIR=${1:?folder}; FF=${FFMPEG:-ffmpeg}
MAIN=$(ls "$DIR" | grep -i '^concept' | grep -iv hook | head -1)
[ -n "$MAIN" ] || { echo "No concept video found in $DIR"; exit 1; }
NAME=${MAIN%.*}; mkdir -p "$DIR/out"
N="scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p,setsar=1"
A="aresample=44100,aformat=channel_layouts=stereo"
for HOOK in $(ls "$DIR" | grep -i '^hook' | sort -V); do
  H=${HOOK%.*}
  "$FF" -loglevel error -y -i "$DIR/$HOOK" -i "$DIR/$MAIN" \
    -filter_complex "[0:v]$N[hv];[1:v]$N[mv];[0:a]$A[ha];[1:a]$A[ma];[hv][ha][mv][ma]concat=n=2:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" -c:v libx264 -crf 20 -preset veryfast -c:a aac -b:a 128k -movflags +faststart \
    "$DIR/out/$NAME-$H.mp4"
  echo "done: out/$NAME-$H.mp4"
done
