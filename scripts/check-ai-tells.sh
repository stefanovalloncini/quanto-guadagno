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

# Em-dash (U+2014) inside i18n message strings is forbidden — these strings
# are rendered in the UI and the project's tone rejects em-dash overuse.
emdashes=$(grep -RIn $'\xe2\x80\x94' \
    --include='*.ts' \
    --include='*.tsx' \
    src/ui/i18n/ 2>/dev/null || true)

bad=0
if [ -n "$matches" ]; then
    printf 'AI-flavored vocabulary found:\n%s\n\n' "$matches"
    bad=1
fi
if [ -n "$emojis" ]; then
    printf 'Emoji literals in JSX (forbidden):\n%s\n\n' "$emojis"
    bad=1
fi
if [ -n "$emdashes" ]; then
    printf 'Em-dashes in i18n strings (use comma, colon, or parentheses):\n%s\n\n' "$emdashes"
    bad=1
fi
if [ "$bad" -eq 1 ]; then
    exit 1
fi
echo "OK: no AI-tells, no emoji, no em-dash in i18n."
