#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

out_dir="dist"
mkdir -p "$out_dir"

name="ebird-tripreport-to-csv"
version=$(node -p "require('./manifest.json').version")
out="$out_dir/${name}_v${version}.zip"

rm -f "$out"

# Package only the runtime files.
zip -r -9 "$out" manifest.json content.js content.css README.md >/dev/null

echo "Wrote: $out"
