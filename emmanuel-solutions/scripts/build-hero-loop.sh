#!/usr/bin/env bash
# Builds a seamless alternating hero loop from the first 5 seconds of two clips.
#   ./build-hero-loop.sh clipA.mp4 clipB.mp4
# Crossfades at BOTH joins — A→B and B→A — so the loop has no visible cut.
set -euo pipefail
A="$1"; B="$2"; OUT="public/assets/video"; X=0.6   # crossfade seconds
tmp=$(mktemp -d)
crop() { ffmpeg -v error -y -t 5 -i "$1" -vf "crop=720:960:0:150,eq=contrast=1.05:saturation=1.05:brightness=0.006" -an -c:v libx264 -preset slow -crf 16 "$2"; }
crop "$A" "$tmp/a.mp4"
crop "$B" "$tmp/b.mp4"
# A → B with a crossfade
ffmpeg -v error -y -i "$tmp/a.mp4" -i "$tmp/b.mp4" \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=$X:offset=$(echo "5-$X" | bc)[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 16 "$tmp/ab.mp4"
# append A again, crossfaded, then trim so the first and last frames match exactly
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$tmp/ab.mp4")
ffmpeg -v error -y -i "$tmp/ab.mp4" -i "$tmp/a.mp4" \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=$X:offset=$(echo "$DUR-$X" | bc)[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 16 "$tmp/loop_raw.mp4"
ffmpeg -v error -y -ss $X -t $(echo "$DUR-$X" | bc) -i "$tmp/loop_raw.mp4" \
  -vf "scale=836:1116:flags=lanczos,unsharp=5:5:0.45:5:5:0.0,format=yuv420p" \
  -r 24 -an -c:v libx264 -preset slow -crf 23 -maxrate 2400k -bufsize 4800k -movflags +faststart "$OUT/greenhouse.mp4"
ffmpeg -v error -y -i "$OUT/greenhouse.mp4" -vf "scale=558:744:flags=lanczos,format=yuv420p" -an -c:v libx264 -preset slow -crf 26 -movflags +faststart "$OUT/greenhouse-portrait.mp4"
ffmpeg -v error -y -ss 0.2 -i "$OUT/greenhouse.mp4" -frames:v 1 -q:v 2 "$OUT/greenhouse-poster.jpg"
rm -rf "$tmp"; echo "built $OUT/greenhouse.mp4"
