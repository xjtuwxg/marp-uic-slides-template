#!/bin/sh
# Build Marp decks with the UIC CS theme.
#
#   ./build.sh                    # every slides/*.md -> .html + .pdf next to it
#   ./build.sh slides/w01.md      # just one deck
#   ./build.sh --no-pdf [deck.md] # HTML only (faster while editing)
#
# Requires Node.js (for npx) and python3. Marp CLI is pinned because
# engine/marp-engine.mjs hooks into Marp's internal rule names.
set -e
cd "$(dirname "$0")"

MARP_CLI_VERSION=4.5.1
PDF=1
if [ "$1" = "--no-pdf" ]; then PDF=0; shift; fi
[ $# -eq 0 ] && set -- slides/*.md

MARP="npx -y @marp-team/marp-cli@$MARP_CLI_VERSION --engine ./engine/marp-engine.mjs --theme-set ./theme/uic-cs.css --html"

for deck in "$@"; do
  out="${deck%.md}"
  # stdin is closed so marp doesn't wait for piped input when run from scripts
  $MARP "$deck" -o "$out.html" </dev/null

  # Presenter view: slide strip along the bottom + drag handles to resize panes.
  python3 -c '
import sys
html, snippet = open(sys.argv[1]).read(), open(sys.argv[2]).read()
open(sys.argv[1], "w").write(html.replace("</body>", snippet + "</body>", 1))
' "$out.html" engine/presenter-extras.html

  if [ "$PDF" = 1 ]; then
    $MARP --pdf --allow-local-files "$deck" -o "$out.pdf" </dev/null
  fi
done
