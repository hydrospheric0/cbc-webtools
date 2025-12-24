# CBC Extensions (eBird Trip Report → CSV) · [Buy me a coffee](https://buymeacoffee.com/bartg)

Adds an **Export CSV** button to eBird trip report pages (`https://ebird.org/tripreport/*`) and downloads `tripreport_<id>.csv`.

## Downloads

- [Chrome/Chromium (zipfile)](https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_chrome.zip)
- [Firefox (signed xpi)](https://raw.githubusercontent.com/hydrospheric0/cbc-webtools/main/downloads/ebird-tripreport-to-csv_firefox_signed.xpi)

## Install (Chrome / Chromium)

1. Download the zip.
2. Unzip it.
3. Open `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the unzipped folder (the folder containing `manifest.json`).
7. Open an eBird trip report and click **Export CSV**.

## Install (Firefox)

1. Download the signed `.xpi`.
2. Open `about:addons`.
3. Click ⚙️ → **Install Add-on From File…**.
4. Select the downloaded `.xpi`.
5. Open an eBird trip report and click **Export CSV**.

## AMO (developers)

- AMO page (unlisted): https://addons.mozilla.org/developers/addon/2965443/versions
- Upload to AMO (unsigned build): [downloads/ebird-tripreport-to-csv_firefox_v0.1.4.xpi](downloads/ebird-tripreport-to-csv_firefox_v0.1.4.xpi)
- After AMO signs it, download the signed XPI and replace: `downloads/ebird-tripreport-to-csv_firefox_signed.xpi`
