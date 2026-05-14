#!/usr/bin/env bash
# Fetch self-hosted WOFF2 fonts into public/fonts/.
# Idempotent: re-running is safe — files with non-zero size are kept as-is.
#
# Fonts (all SIL OFL, free for commercial use):
#   - Hanken Grotesk 400 / 400 italic / 500 / 700 — UI and body
#   - JetBrains Mono  400 / 500                   — every monetary amount
#
# Google Fonts serves multiple unicode-range subsets per face. For Italian
# we want the "latin" subset (U+0000-00FF — covers ASCII plus è/ò/à/é etc.)
# plus the "latin-ext" subset (U+0100-02BA — extended European characters).
# We grab both and the browser picks at render time.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/fonts"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

mkdir -p "$DEST"
cd "$DEST"

download() {
    local url="$1"
    local out="$2"
    if [ -f "$out" ] && [ -s "$out" ] && [ "$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out")" -gt 3000 ]; then
        echo "✓ $out (cached)"
        return 0
    fi
    if [ -z "$url" ]; then
        echo "✗ $out (no URL extracted)" >&2
        return 1
    fi
    echo "→ $out"
    curl -fsSL -A "$UA" -o "$out.tmp" "$url"
    mv "$out.tmp" "$out"
}

# Extract a woff2 URL from a Google Fonts CSS block matching weight+style+latin-range.
# $1 = full CSS text
# $2 = weight (e.g. 400)
# $3 = style (normal|italic)
# $4 = range-marker — either "0000-00FF" (latin) or "0100-02BA" (latin-ext)
gf_url() {
    local css="$1"
    local weight="$2"
    local style="$3"
    local marker="$4"
    echo "$css" \
        | awk -v w="$weight" -v s="$style" -v m="$marker" '
            /@font-face/ { buf=""; in_block=1 }
            in_block { buf = buf "\n" $0 }
            /^}/ && in_block {
                if (buf ~ ("font-weight: " w ";") \
                    && buf ~ ("font-style: " s ";") \
                    && buf ~ m) {
                    if (match(buf, /url\(https:\/\/[^)]+\.woff2\)/)) {
                        u = substr(buf, RSTART + 4, RLENGTH - 5)
                        print u
                        exit
                    }
                }
                in_block=0; buf=""
            }
        '
}

# --- Hanken Grotesk ---
HG_CSS="$(curl -fsSL -A "$UA" 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,400;0,500;0,700;1,400&display=swap')"

download "$(gf_url "$HG_CSS" 400 normal 0000-00FF)" "HankenGrotesk-Regular-latin.woff2"
download "$(gf_url "$HG_CSS" 400 normal 0100-02BA)" "HankenGrotesk-Regular-latinExt.woff2"
download "$(gf_url "$HG_CSS" 400 italic 0000-00FF)" "HankenGrotesk-Italic-latin.woff2"
download "$(gf_url "$HG_CSS" 400 italic 0100-02BA)" "HankenGrotesk-Italic-latinExt.woff2"
download "$(gf_url "$HG_CSS" 500 normal 0000-00FF)" "HankenGrotesk-Medium-latin.woff2"
download "$(gf_url "$HG_CSS" 500 normal 0100-02BA)" "HankenGrotesk-Medium-latinExt.woff2"
download "$(gf_url "$HG_CSS" 700 normal 0000-00FF)" "HankenGrotesk-Bold-latin.woff2"
download "$(gf_url "$HG_CSS" 700 normal 0100-02BA)" "HankenGrotesk-Bold-latinExt.woff2"

# --- JetBrains Mono ---
JBM_CSS="$(curl -fsSL -A "$UA" 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap')"

download "$(gf_url "$JBM_CSS" 400 normal 0000-00FF)" "JetBrainsMono-Regular-latin.woff2"
download "$(gf_url "$JBM_CSS" 400 normal 0100-02BA)" "JetBrainsMono-Regular-latinExt.woff2"
download "$(gf_url "$JBM_CSS" 500 normal 0000-00FF)" "JetBrainsMono-Medium-latin.woff2"
download "$(gf_url "$JBM_CSS" 500 normal 0100-02BA)" "JetBrainsMono-Medium-latinExt.woff2"

echo
echo "Done. Contents of $DEST:"
ls -lh "$DEST"
