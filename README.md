# CBC Extensions

## eBird Trip Report → CSV

This repo contains browser extensions that add an **Export CSV** button to eBird trip report pages (`https://ebird.org/tripreport/*`) and download a `tripreport_<id>.csv` file using the already-rendered page content.

Folders:
- `extension-chrome/` — Chrome / Chromium (Manifest V3)
- `extension-firefox/` — Firefox (Manifest V2)

---

## Install (Chrome / Chromium)

If you install from GitHub (zip/folder), users typically need **Developer mode**.

### Developer mode (Load unpacked)
1. Download and unzip the release zip (or clone this repo).
2. Open `chrome://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked**.
5. Select the folder `cbc-extensions/extension-chrome/`.

### Package a zip
From `cbc-extensions/extension-chrome/`:
- `bash package.sh`
- Output: `extension-chrome/dist/ebird-tripreport-to-csv_v<version>.zip`

---

## Install (Firefox)

### Temporary install (developer/testing)
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select `cbc-extensions/extension-firefox/manifest.json`.

### Package an XPI
From `cbc-extensions/extension-firefox/`:
- `bash package.sh`
- Output: `extension-firefox/dist/ebird-tripreport-to-csv_firefox_v<version>.xpi`

Notes:
- Firefox usually requires add-ons to be **signed** for permanent installation by normal users.

---

## Sharing on GitHub

Recommended flow:
- Create a GitHub Release.
- Attach the packaged `.zip` (Chrome) and `.xpi` (Firefox).
- Users can install via the instructions above.

For one-click installs without developer workflows:
- Publish to the Chrome Web Store and/or Firefox Add-ons (AMO).
