#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

out_dir="../downloads"
mkdir -p "$out_dir"

name="ebird-tripreport-to-csv_firefox"
version=$(node -p "require('./manifest.json').version")
out_versioned="$out_dir/${name}_v${version}.xpi"
out_stable="$out_dir/ebird-tripreport-to-csv_firefox.xpi"

rm -f "$out_versioned" "$out_stable"

# XPI is a zip.
zip -r -9 "$out_versioned" manifest.json content.js content.css >/dev/null
cp -f "$out_versioned" "$out_stable"

echo "Wrote: $out_versioned"
echo "Wrote: $out_stable"
