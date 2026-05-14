#!/usr/bin/env bash
# Fetch self-hosted WOFF2 fonts into public/fonts/.
# Idempotent: re-running is safe (curl --fail will skip on success).
#
# Fonts:
#   - Satoshi 400/500/700 (Fontshare, free for commercial)
#   - Instrument Serif 400 normal + italic (Google Fonts, OFL)
#   - IBM Plex Mono 400/500 (Google Fonts, OFL)
#
# Note: Satoshi's free release has weights 300/400/500/700/900 — no 600 (Semibold).
# We use 400/500/700 and treat 700 as the heaviest emphasis.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/fonts"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'

mkdir -p "$DEST"
cd "$DEST"

download() {
    local url="$1"
    local out="$2"
    if [ -f "$out" ] && [ -s "$out" ]; then
        echo "✓ $out (cached)"
        return 0
    fi
    echo "→ $out"
    curl -fsSL -A "$UA" -o "$out.tmp" "$url"
    mv "$out.tmp" "$out"
}

# --- Satoshi (Fontshare) ---
SAT_CSS="$(curl -fsSL "https://api.fontshare.com/v2/css?f%5B%5D=satoshi@400,500,700&display=swap")"

sat_url() {
    local weight="$1"
    # Pick the woff2 URL inside the @font-face block whose weight matches.
    echo "$SAT_CSS" \
        | awk -v w="$weight" '
            /@font-face/ { buf=""; in_block=1 }
            in_block { buf = buf "\n" $0 }
            /^}/ && in_block {
                if (buf ~ ("font-weight: " w ";")) {
                    if (match(buf, /url\(\047\/\/[^\047]+\.woff2\047\)/)) {
                        u = substr(buf, RSTART, RLENGTH)
                        sub(/^url\(\047\/\//, "https://", u)
                        sub(/\047\)$/, "", u)
                        print u
                        exit
                    }
                }
                in_block=0; buf=""
            }
        '
}

download "$(sat_url 400)" "Satoshi-Regular.woff2"
download "$(sat_url 500)" "Satoshi-Medium.woff2"
download "$(sat_url 700)" "Satoshi-Bold.woff2"

# --- Instrument Serif (Google Fonts) ---
IS_CSS="$(curl -fsSL -A "$UA" 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap')"

is_url() {
    local style="$1"
    echo "$IS_CSS" \
        | awk -v s="$style" '
            /@font-face/ { buf=""; in_block=1 }
            in_block { buf = buf "\n" $0 }
            /^}/ && in_block {
                if (buf ~ ("font-style: " s ";")) {
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

download "$(is_url normal)" "InstrumentSerif-Regular.woff2"
download "$(is_url italic)" "InstrumentSerif-Italic.woff2"

# --- IBM Plex Mono (Google Fonts) ---
IBM_CSS="$(curl -fsSL -A "$UA" 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap')"

ibm_url() {
    local weight="$1"
    echo "$IBM_CSS" \
        | awk -v w="$weight" '
            /@font-face/ { buf=""; in_block=1 }
            in_block { buf = buf "\n" $0 }
            /^}/ && in_block {
                if (buf ~ ("font-weight: " w ";")) {
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

download "$(ibm_url 400)" "IBMPlexMono-Regular.woff2"
download "$(ibm_url 500)" "IBMPlexMono-Medium.woff2"

echo
echo "Done. Contents of $DEST:"
ls -lh "$DEST"
