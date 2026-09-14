/* 오비스크린 아임웹 디자인모드 등록 도구
   /admin/design 콘솔에서:
     eval(await (await fetch('https://raw.githubusercontent.com/hellooorts3-oss/obscreen/<커밋>/build/iw.js')).text())
   → window.IW

   페이지 1개 = 섹션 N개, 섹션 1개 = [텍스트 위젯 → 코드 위젯]
   섹션 설정: 상하 여백 0 · 기본 그리드 간격 해제 · 가로 100% 확장 (홈·청소 서비스와 동일)

   ★ 실측 메모
   - 섹션을 위젯이 꽉 채우면 가운데 우클릭은 위젯 메뉴가 뜬다 → 섹션 왼쪽 아래 모서리(left+3, bottom-3)로 연다
   - 위젯 복사 → 섹션 '위젯 붙여넣기' 는 섹션 끝에, 위젯 '붙여넣기' 는 그 위젯 바로 아래에 들어간다
   - MENU.deleteWidget 은 연동(custom_widget) 위젯에서 죽는다 → 섹션째 삭제
   - 콘솔 한 번 실행은 45초 제한이 있다 → 긴 작업은 IW.run() 으로 백그라운드 실행 후 IW.job 확인 */
(function () {
  const GW = 'https://gateway-brand.imwebapis.com';
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const headers = () => ({ Authorization: 'Bearer ' + sessionStorage.getItem('imweb_site_auth_token'), 'Content-Type': 'application/json', Accept: 'application/json' });

  function trimCookies() {
    const before = document.cookie.length;
    const kill = /^(mp_|_hj|cto_|_ml|ch-|_ga|_gid|_fbp|_gcl|wcs_|_tt_|__bs_imweb)/;
    document.cookie.split('; ').forEach(s => {
      const n = s.slice(0, s.indexOf('='));
      if (!kill.test(n)) return;
      ['', '.imweb.me', location.hostname, '.' + location.hostname].forEach(d => {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
    return { before, after: document.cookie.length };
  }

  /* ---- 위젯 내용 (게이트웨이) ---- */
  const get = id => fetch(`${GW}/design-mode/widgets/${id}?_=${Date.now()}`, { headers: headers() }).then(r => r.json());
  async function put(id, patch) {
    const cur = await get(id);
    const widget = Object.assign({}, cur.widget, patch);
    const res = await fetch(`${GW}/design-mode/widgets/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ widget, animation: cur.animation }) });
    if (!res.ok) return { ok: false, status: res.status, error: (await res.text()).slice(0, 300) };
    const back = await get(id);
    const key = 'code' in patch ? 'code' : ('textHtml' in patch ? 'textHtml' : null);
    return { ok: true, match: key ? back.widget[key] === patch[key] : null };
  }

  /* ---- 구조 ---- */
  const struct = () => [...document.querySelectorAll('.section_wrap[id^="s20"]')].filter(s => s.offsetParent).map(s => ({
    section: s.id,
    widgets: [...s.querySelectorAll('._widget_data')].map(d => ({ id: (d.closest('[id^="w20"]') || {}).id, type: d.dataset.widgetType })),
  }));
  const allW = () => struct().flatMap(s => s.widgets.map(w => w.id));
  const menus = () => [...document.querySelectorAll('.handle.dd-handle[data-code]')].map(e => ({ code: e.dataset.code, name: e.textContent.trim(), url: (MENU.getMenu(e.dataset.code) || {}).url }));
  async function openPage(code) {
    window.onbeforeunload = null; try { $(window).off('beforeunload'); } catch (e) {}
    MENU.selectMenu(code);
    for (let i = 0; i < 30; i++) { await wait(500); if (MENU.getCurrentMenuCode ? MENU.getCurrentMenuCode() === code : document.querySelector('.section_wrap[id^="s20"]')) break; }
    await wait(2500);
    return struct().length;
  }

  /* ---- 우클릭 메뉴 ---- */
  function closeMenus() { const ov = document.querySelector('.context_overlay'); if (ov && ov.offsetParent) ov.click(); }
  function ctx(widgetId, item) {
    closeMenus();
    const w = document.getElementById(widgetId); if (!w) return 'missing';
    w.scrollIntoView({ block: 'center' });
    const r = w.getBoundingClientRect();
    const y = Math.round(Math.max(140, Math.min(innerHeight - 140, r.top + r.height / 2)));
    w.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, view: window, clientX: Math.round(r.left + r.width / 2), clientY: y, button: 2 }));
    const li = [...document.querySelectorAll('li' + item)].filter(e => e.offsetParent)[0];
    if (!li) return 'no item'; li.click(); return 'ok';
  }
  function openSec(id) {
    closeMenus();
    const s = document.getElementById(id); if (!s) return [];
    s.scrollIntoView({ block: 'end' }); let r = s.getBoundingClientRect();
    let y = r.bottom - 3;
    if (y > innerHeight - 10 || y < 140) { s.scrollIntoView({ block: 'start' }); r = s.getBoundingClientRect(); y = Math.max(r.top + 3, 140); }
    s.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, view: window, clientX: Math.round(r.left + 3), clientY: Math.round(y), button: 2 }));
    return [...document.querySelectorAll('li')].filter(e => e.offsetParent && /_item/.test(e.className) && !/doz_item/.test(e.className)).map(e => e.className.trim());
  }
  async function secMenu(id, item) {
    for (let k = 0; k < 4; k++) { await wait(500); const it = openSec(id); if (it.some(x => x.startsWith(item.replace(/^\./, '').split('.')[0]))) break; }
    await wait(250);
    const li = [...document.querySelectorAll('li' + item)].filter(e => e.offsetParent)[0];
    if (!li) return false; li.click(); return true;
  }
  async function confirmModal() {
    await wait(700);
    const d = [...document.querySelectorAll('.modal-dialog')].filter(e => e.offsetParent).pop();
    if (!d) return 'nomodal';
    const b = [...d.querySelectorAll('a,button')].find(e => ['확인', '삭제'].includes(e.textContent.trim()));
    if (b) { b.click(); return 'ok'; }
    return 'nobtn';
  }
  async function pollNew(before, list) { for (let i = 0; i < 25; i++) { await wait(400); const n = list().find(x => !before.includes(x)); if (n) return n; } return null; }

  /* ---- 섹션 조작 ---- */
  async function delSection(id) {
    if (!await secMenu(id, '._delete._item')) return 'nomenu';
    const c = await confirmModal(); await wait(1200);
    return c + (document.getElementById(id) ? ' still' : ' gone');
  }
  async function addSec(after) {
    const b = struct().map(s => s.section);
    if (!await secMenu(after, '._empty._item')) return null;
    return pollNew(b, () => struct().map(s => s.section));
  }
  async function secSetup(id) {
    if (!await secMenu(id, '._setting._item')) return 'nomenu';
    let m = null;
    for (let i = 0; i < 20; i++) { await wait(300); m = [...document.querySelectorAll('.modal-dialog, .modal-content')].filter(e => e.offsetParent && /섹션 설정/.test(e.textContent)).pop(); if (m && m.querySelectorAll('input[type=checkbox]').length) break; }
    if (!m) return 'nomodal';
    const cb = t => [...m.querySelectorAll('input[type=checkbox]')].find(e => (e.closest('label') || e.parentElement).textContent.trim().startsWith(t));
    const pad = [...m.querySelectorAll('input.dz-form-control')].find(e => /px$/.test(e.value) && !e.disabled);
    if (pad && pad.value !== '0px') { pad.focus(); pad.value = '0px'; ['input', 'change', 'keyup', 'blur'].forEach(ev => pad.dispatchEvent(new Event(ev, { bubbles: true }))); await wait(900); }
    const g = cb('기본 그리드 간격'); if (g && g.checked) { g.click(); await wait(900); }
    const x = cb('가로 100% 확장'); if (x && !x.checked) { x.click(); await wait(900); }
    const close = m.querySelector('.close, [data-dismiss="modal"]'); if (close) close.click();
    await wait(900);
    const s = document.getElementById(id);
    return s.getAttribute('doz_extend') === 'Y' && /grid_gutter_0/.test(s.className) && !/padding-top:\s*[1-9]/.test(s.getAttribute('style') || '') ? 'ok' : 'check';
  }
  // 빈 섹션에 [텍스트 → 코드] 를 복제해 넣는다 (T, C = 같은 페이지의 원본 위젯)
  async function fillSec(sec, T, C) {
    ctx(T, '._copy'); await wait(700);
    let b = allW();
    if (!await secMenu(sec, '._paste._item')) return { err: 'nopaste' };
    const t = await pollNew(b, allW); if (!t) return { err: 'notext' };
    await wait(500);
    ctx(C, '._copy'); await wait(700);
    b = allW(); ctx(t, '._paste');
    const c = await pollNew(b, allW); await wait(500);
    return { sec, t, c };
  }
  // 페이지를 섹션 n 개로 만든다. 빈 섹션은 채우고, 모자라면 끝에 추가
  async function buildPage(n, T, C) {
    const out = [];
    for (const s of struct()) if (s.widgets.length === 0) { out.push(await secSetup(s.section)); out.push(await fillSec(s.section, T, C)); }
    while (struct().length < n) {
      const last = struct().map(s => s.section).pop();
      const s = await addSec(last); if (!s) { out.push('addfail'); break; }
      out.push(await secSetup(s)); out.push(await fillSec(s, T, C));
    }
    return out;
  }

  /* ---- 콘텐츠 ---- */
  async function loadBundle(url) { IW.bundle = await (await fetch(url)).json(); return Object.fromEntries(Object.entries(IW.bundle).map(([k, v]) => [k, v.length])); }
  async function fillContent(key, items = IW.bundle[key]) {
    const st = struct();
    if (st.length !== items.length) return 'count mismatch ' + st.length + ' vs ' + items.length;
    const out = [];
    for (let i = 0; i < items.length; i++) {
      const [t, c] = st[i].widgets;
      if (!t || t.type !== 'text' || !c || c.type !== 'code') { out.push(i + 1 + ' 구조 다름'); continue; }
      const a = await put(t.id, { textHtml: items[i].text });
      const b = await put(c.id, { code: items[i].code, memo: items[i].name + ' — 반응형' });
      out.push(`${i + 1} ${items[i].name}: ${a.ok && a.match ? 'T✓' : 'T✗' + (a.error || '')} ${b.ok && b.match ? 'C✓' : 'C✗' + (b.error || '')}`);
    }
    return out;
  }

  async function publish() {
    const r = await fetch(`${GW}/design-mode/design/publish/start`, { method: 'POST', headers: headers(), body: '{}' });
    if (r.status !== 202) return { ok: false, status: r.status };
    for (let i = 0; i < 20; i++) {
      await wait(2000);
      const s = await (await fetch(`${GW}/design-mode/design/status?_=${Date.now()}`, { headers: headers() })).json();
      if (s.publish.status !== 'RUNNING') return { ok: s.publish.status === 'SUCCESS', ...s.publish };
    }
    return { ok: false, timeout: true };
  }

  // 45초 제한 회피: 백그라운드 실행 → IW.job 으로 확인
  function run(fn) {
    IW.job = { done: false, result: null };
    (async () => { try { IW.job.result = await fn(); } catch (e) { IW.job.result = 'ERR ' + e; } IW.job.done = true; })();
    return 'started';
  }
  async function waitJob(sec = 40) { for (let i = 0; i < sec && !IW.job.done; i++) await wait(1000); return IW.job; }

  window.IW = { trimCookies, get, put, struct, menus, openPage, ctx, openSec, secMenu, confirmModal, delSection, addSec, secSetup, fillSec, buildPage, loadBundle, fillContent, publish, run, waitJob, wait };
  return 'IW ready ' + JSON.stringify(trimCookies());
})();
