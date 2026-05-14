#!/usr/bin/env bash
# Greps the source tree for AI-flavored vocabulary and emoji literals in JSX.
# Exits 1 if any are found.

set -u

PATTERN='\b(comprehensive|powerful|seamless|robust|cutting-edge|revolutionary|advanced|enhanced|intuitive|modern|unleash|unlock|harness|leverage|empower)\b'

matches=$(grep -RInE "$PATTERN" \
    --include='*.ts' \
    --include='*.tsx' \
    --include='*.css' \
    --include='*.md' \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=coverage \
    --exclude-dir=_archived \
    src/ docs/data-verification/ 2>/dev/null || true)

emojis=$(grep -RIn -P "[\x{1F300}-\x{1F6FF}\x{2600}-\x{27BF}]" \
    --include='*.tsx' \
    --exclude-dir=node_modules \
    src/ 2>/dev/null || true)

bad=0
if [ -n "$matches" ]; then
    printf 'AI-flavored vocabulary found:\n%s\n\n' "$matches"
    bad=1
fi
if [ -n "$emojis" ]; then
    printf 'Emoji literals in JSX (forbidden):\n%s\n\n' "$emojis"
    bad=1
fi
if [ "$bad" -eq 1 ]; then
    exit 1
fi
echo "OK: no AI-tells, no emoji."
