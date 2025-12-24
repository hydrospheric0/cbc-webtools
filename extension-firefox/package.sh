#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

out_dir="dist"
mkdir -p "$out_dir"

name="ebird-tripreport-to-csv_firefox"
version=$(node -p "require('./manifest.json').version")
out="$out_dir/${name}_v${version}.xpi"

rm -f "$out"

# XPI is a zip.
zip -r -9 "$out" manifest.json content.js content.css >/dev/null

echo "Wrote: $out"
