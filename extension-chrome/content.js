(() => {
  const ROOT_ID = 'ebird-csv-export-root';

  function text(el) {
    return (el?.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function isIntLike(s) {
    const t = String(s || '').replace(/,/g, '').trim();
    return /^\d+$/.test(t);
  }

  function toInt(s) {
    const t = String(s || '').replace(/,/g, '').trim();
    return isIntLike(t) ? parseInt(t, 10) : null;
  }

  function escapeCsv(value) {
    const s = String(value ?? '');
    // RFC 4180 style quoting
    return '"' + s.replace(/"/g, '""') + '"';
  }

  function rowsToCsv(rows) {
    const lines = ['species,count'];
    for (const r of rows) {
      lines.push(`${escapeCsv(r.species)},${r.count}`);
    }
    return lines.join('\n') + '\n';
  }

  function downloadCsv(csvText, filename) {
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function filenameFromPath() {
    const m = String(location.pathname || '').match(/\/tripreport\/(\d+)/i);
    const id = m?.[1] || 'tripreport';
    return `tripreport_${id}.csv`;
  }

  function scrapeFromReportList() {
    const items = Array.from(document.querySelectorAll('li.ReportListSpecies'));
    if (!items.length) return [];

    const merged = new Map();
    for (const li of items) {
      const nameEl = li.querySelector('.Species-common');
      const countEl = li.querySelector('.Count');
      const species = text(nameEl);
      const count = toInt(text(countEl));
      if (!species || count == null) continue;
      const prev = merged.get(species);
      if (prev == null || count > prev) merged.set(species, count);
    }

    return Array.from(merged.entries())
      .map(([species, count]) => ({ species, count }));
  }

  function scrapeFromTable() {
    const rows = Array.from(document.querySelectorAll('tr'));
    if (!rows.length) return [];

    const merged = new Map();
    for (const tr of rows) {
      const tds = Array.from(tr.querySelectorAll('td'));
      if (tds.length < 2) continue;

      const cellTexts = tds.slice(0, 6).map((td) => text(td));
      const species = cellTexts[0];
      if (!species || species.length < 3) continue;
      if (['species', 'taxon'].includes(species.toLowerCase())) continue;

      let count = null;
      for (let i = cellTexts.length - 1; i >= 0; i--) {
        const c = toInt(cellTexts[i]);
        if (c != null) {
          count = c;
          break;
        }
      }
      if (count == null) continue;

      const prev = merged.get(species);
      if (prev == null || count > prev) merged.set(species, count);
    }

    const result = Array.from(merged.entries()).map(([species, count]) => ({ species, count }));

    // guard against junk
    return result.length >= 3 ? result : [];
  }

  function scrapeFromNextData() {
    const script = document.querySelector('script#__NEXT_DATA__');
    if (!script) return [];

    let data;
    try {
      data = JSON.parse(script.textContent || '');
    } catch {
      return [];
    }

    const stack = [data];
    const merged = new Map();

    while (stack.length) {
      const cur = stack.pop();
      if (!cur) continue;

      if (Array.isArray(cur)) {
        for (const v of cur) stack.push(v);
        continue;
      }

      if (typeof cur !== 'object') continue;

      // Walk children
      for (const v of Object.values(cur)) stack.push(v);

      // Heuristic match: string name + numeric-ish count
      let name = null;
      for (const k of ['commonName', 'comName', 'species', 'taxon', 'name']) {
        if (typeof cur[k] === 'string' && cur[k].trim()) {
          name = cur[k].trim();
          break;
        }
      }

      let countVal = null;
      for (const ck of ['count', 'obsCount', 'individualCount', 'numIndividuals']) {
        if (typeof cur[ck] === 'number' && Number.isFinite(cur[ck])) {
          countVal = Math.max(0, Math.floor(cur[ck]));
          break;
        }
      }

      if (name != null && countVal != null) {
        const prev = merged.get(name);
        if (prev == null || countVal > prev) merged.set(name, countVal);
      }
    }

    const result = Array.from(merged.entries()).map(([species, count]) => ({ species, count }));

    return result.length >= 3 ? result : [];
  }

  function scrapeAll() {
    return (
      scrapeFromReportList() || []
    ).concat();
  }

  function scrapeWithFallbacks() {
    const a = scrapeFromReportList();
    if (a.length) return a;

    const b = scrapeFromTable();
    if (b.length) return b;

    const c = scrapeFromNextData();
    if (c.length) return c;

    return [];
  }

  function waitForSpeciesList(timeoutMs = 15000) {
    return new Promise((resolve) => {
      const started = Date.now();

      const check = () => {
        if (document.querySelector('li.ReportListSpecies') || document.querySelector('script#__NEXT_DATA__')) {
          resolve();
          return;
        }
        if (Date.now() - started > timeoutMs) {
          resolve();
          return;
        }
        setTimeout(check, 350);
      };

      check();
    });
  }

  function ensureUi() {
    if (document.getElementById(ROOT_ID)) return;

    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'ebirdCsvExportRoot';

    const toast = document.createElement('div');
    toast.className = 'ebirdCsvExportToast';
    toast.style.display = 'none';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ebirdCsvExportBtn';
    btn.textContent = 'Export CSV';

    let toastTimer = null;
    const showToast = (msg) => {
      toast.textContent = String(msg || '');
      toast.style.display = 'block';
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.style.display = 'none';
      }, 6000);
    };

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Exporting…';
      try {
        await waitForSpeciesList(15000);
        const rows = scrapeWithFallbacks();
        if (!rows.length) {
          showToast('Could not find species/count rows on this page.');
          return;
        }
        const csv = rowsToCsv(rows);
        downloadCsv(csv, filenameFromPath());
        showToast(`Downloaded CSV (${rows.length} rows).`);
      } catch (e) {
        showToast(e?.message || 'Export failed');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Export CSV';
      }
    });

    root.appendChild(toast);
    root.appendChild(btn);
    document.documentElement.appendChild(root);
  }

  // Only inject on actual trip report pages
  if (!/^\/tripreport\//i.test(location.pathname || '')) return;

  ensureUi();
})();
