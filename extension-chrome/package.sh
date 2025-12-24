#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

out_dir="../downloads"
mkdir -p "$out_dir"

name="ebird-tripreport-to-csv"
version=$(node -p "require('./manifest.json').version")
out_versioned="$out_dir/${name}_v${version}.zip"
out_stable="$out_dir/${name}_chrome.zip"

rm -f "$out_versioned" "$out_stable"

# Package only the runtime files.
zip -r -9 "$out_versioned" manifest.json content.js content.css README.md >/dev/null
cp -f "$out_versioned" "$out_stable"

echo "Wrote: $out_versioned"
echo "Wrote: $out_stable"
