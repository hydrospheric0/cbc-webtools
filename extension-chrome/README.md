# eBird Trip Report → CSV (Browser Extension)

Minimal unpacked extension that adds an **Export CSV** button on `https://ebird.org/tripreport/*` pages.

## Install (Chrome / Chromium)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `cbc-webtools/extension-chrome/`

## Install (Firefox)

Firefox support for Manifest V3 is evolving.

- Try `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** and select `manifest.json`.

## Usage

- Open an eBird trip report page.
- Click the **Export CSV** button (top-right).
- A file like `tripreport_449085.csv` downloads.

## Package / share

You can package this as a `.zip` and share it on GitHub Releases.

- From `cbc-webtools/extension-chrome/` run:


	- `bash package.sh`
- The zip will be written to `cbc-webtools/extension-chrome/dist/`.

### Sharing on GitHub

- Commit the `cbc-webtools/extension-chrome/` folder to your repo.
- Create a GitHub Release and upload the generated `.zip` from `dist/`.

Notes:
- Chrome users can install from a zip by unzipping and using **Load unpacked**.
- For one-click install, you’d publish to the Chrome Web Store / Firefox Add-ons.

## Notes

- Scraping uses the rendered DOM (preferred) and falls back to `__NEXT_DATA__` when present.
- If eBird changes markup, selectors may need updates.
