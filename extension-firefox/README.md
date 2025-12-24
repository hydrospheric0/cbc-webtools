# eBird Trip Report → CSV (Firefox)

This is a Firefox-focused build of the extension.

## Install (temporary / developer)

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select `manifest.json` in this folder

## Package

- Run: `bash package.sh`
- Output: `dist/ebird-tripreport-to-csv_firefox_v<version>.xpi`

Note: For permanent installation by normal users, Firefox typically requires the add-on to be signed (AMO or enterprise policy). An unsigned `.xpi` is mainly for development/testing.
