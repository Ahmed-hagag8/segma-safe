#!/usr/bin/env python3
"""Extract dominant colors from the Sigma Safe logo."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/upload/logo.jpeg').convert('RGB')
img.thumbnail((300, 300))
pixels = list(img.getdata())

def bucket(c):
    return (c[0] // 24 * 24, c[1] // 24 * 24, c[2] // 24 * 24)

counts = Counter(bucket(p) for p in pixels)
total = len(pixels)
print(f"Total pixels sampled: {total}\nTop 18 color buckets (RGB, hex, share):")
for c, n in counts.most_common(18):
    hexv = '#%02x%02x%02x' % c
    print(f"  {c}  {hexv}  {100*n/total:5.1f}%")

# Classify: strongly red pixels, near-black, near-white
reds = sum(n for c, n in counts.items() if c[0] > 120 and c[0] > c[1]*1.8 and c[0] > c[2]*1.8)
darks = sum(n for c, n in counts.items() if max(c) < 70)
whites = sum(n for c, n in counts.items() if min(c) > 200)
print(f"\nRed-family: {100*reds/total:.1f}%  Dark/black: {100*darks/total:.1f}%  White: {100*whites/total:.1f}%")

# Average of strongly red pixels
rp = [p for p in pixels if p[0] > 120 and p[0] > p[1]*1.8 and p[0] > p[2]*1.8]
if rp:
    r = tuple(sum(ch)/len(rp) for ch in zip(*rp))
    print(f"Average red: #{int(r[0]):02x}{int(r[1]):02x}{int(r[2]):02x} from {len(rp)} px")
# Average of dark pixels
dp = [p for p in pixels if max(p) < 70]
if dp:
    r = tuple(sum(ch)/len(dp) for ch in zip(*dp))
    print(f"Average dark: #{int(r[0]):02x}{int(r[1]):02x}{int(r[2]):02x} from {len(dp)} px")
