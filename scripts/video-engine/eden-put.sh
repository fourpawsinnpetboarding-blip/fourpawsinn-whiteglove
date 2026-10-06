#!/bin/bash
# Upload a video to Eden's multipart storage.
# usage: eden-put.sh <file.mp4>   then stdin lines: "<partNumber> <signed uploadUrl from eden_scheduling_media_multipart sign-part>"
# Prints "<partNumber> <ETag>" for the complete step. Single uploads (<= ~25 MB): curl -X PUT -H "Content-Type: video/mp4" --data-binary @file "<uploadUrl>"
F=$1; D=$(mktemp -d); split -b 8388608 -d -a 2 "$F" "$D/p"
while read n url; do
  et=$(curl -sS -X PUT --data-binary @$(printf "%s/p%02d" "$D" $((n-1))) -D - -o /dev/null "$url" | grep -i '^etag' | tr -d '\r' | cut -d' ' -f2)
  echo "$n $et"
done
rm -rf "$D"
