# CBC Extensions

## eBird Trip Report → CSV

This repo contains browser extensions that add an **Export CSV** button to eBird trip report pages (`https://ebird.org/tripreport/*`) and download a `tripreport_<id>.csv` file using the already-rendered page content.

Folders:
- `extension-chrome/` — Chrome / Chromium (Manifest V3)
- `extension-firefox/` — Firefox (Manifest V2)

## Downloads

- Chrome/Chromium (.zip): https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_chrome.zip
- Firefox (.xpi): https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_firefox.xpi

---

## Install (Chrome / Chromium)

1. Download: https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_chrome.zip
2. Unzip it.
3. Open `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the unzipped folder (the folder containing `manifest.json`).

---

## Install (Firefox)

1. Download: https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_firefox.xpi
2. Install:
	 - Try: `about:addons` → ⚙️ → **Install Add-on From File…** → choose the `.xpi`.
	 - If Firefox refuses because the add-on is unsigned, use temporary install instead:
		 `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** → select `extension-firefox/manifest.json`.
3. Confirm the add-on is enabled.

Notes:
- Firefox usually requires add-ons to be **signed** for permanent installation by normal users.

---

## Build (developers)

- Chrome: run `bash package.sh` in `extension-chrome/` → writes a `.zip` into `downloads/`
- Firefox: run `bash package.sh` in `extension-firefox/` → writes an `.xpi` into `downloads/`
