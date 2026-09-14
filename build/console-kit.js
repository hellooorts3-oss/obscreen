/* ============================================================
   아임웹 디자인모드 콘솔 키트  (v2)
   쓰는 법: /admin/design 을 연 탭의 콘솔에 이 파일 전체를 붙여넣는다.
            그러면 window.IW 로 전부 쓸 수 있다.
   전제: 로그인된 상태 + 디자인모드 페이지
   ============================================================ */
(function () {
  const GW = 'https://gateway-brand.imwebapis.com';
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* -- 0. 쿠키 정리 -------------------------------------------------
     사이트 도메인 앞단은 요청 헤더 8,192바이트 제한이 있다.
     분석 쿠키가 쌓이면 모든 관리자 API 가 400 RequestHeaderSectionTooLarge 로 죽는다.
     디자인모드를 20분만 켜놔도 5KB 로 다시 불어나므로 매번 먼저 부른다. -------- */
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

  const headers = () => ({
    Authorization: 'Bearer ' + sessionStorage.getItem('imweb_site_auth_token'),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  /* -- 1. 위젯 내용 읽기 / 쓰기 (게이트웨이 API) -------------------------
     ※ 본문 위젯만 된다. 헤더·푸터의 inline_* 위젯은 여기 없다(404). */
  const get = id =>
    fetch(`${GW}/design-mode/widgets/${id}?_=${Date.now()}`, { headers: headers() }).then(r => r.json());

  /* patch 예시
       코드 위젯:   { code, memo }
       텍스트 위젯: { textHtml }
       여백 0:      IW.ZERO
     ※ padding 과 margin 은 필드 모양이 다르다. 아래 ZERO 참고. */
  async function put(id, patch) {
    const cur = await get(id);
    const widget = Object.assign({}, cur.widget, patch);
    const res = await fetch(`${GW}/design-mode/widgets/${id}`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify({ widget, animation: cur.animation }),
    });
    if (!res.ok) {
      // 400 이면 본문에 빠진 필드명이 찍힌다. 스키마를 모를 땐 이걸 보고 맞추면 된다.
      return { ok: false, status: res.status, error: (await res.text()).slice(0, 300) };
    }
    const back = await get(id);                       // 되읽어 대조한다
    const key = 'code' in patch ? 'code' : ('textHtml' in patch ? 'textHtml' : null);
    return {
      ok: true, status: res.status,
      match: key ? back.widget[key] === patch[key] : null,
      len: key ? (back.widget[key] || '').length : null,
    };
  }

  const ZERO = {
    padding: { use: true, vertical: 0, horizontal: 0 },
    margin:  { use: true, top: 0, right: 0, bottom: 0, left: 0 },
  };

  /* -- 2. 페이지 / 구조 ---------------------------------------------- */
  const menus = () =>
    [...document.querySelectorAll('.handle.dd-handle[data-code]')]
      .map(e => ({ code: e.dataset.code, name: e.textContent.trim() }));

  const openPage = menuCode => (MENU.selectMenu(menuCode), menuCode);

  const struct = () =>
    [...document.querySelectorAll('.section_wrap[id^="s20"]')].map(s => ({
      section: s.id,
      widgets: [...s.querySelectorAll('[id^="w20"]')].map(w => {
        const d = w.querySelector('._widget_data');
        return { id: w.id, type: d ? d.dataset.widgetType : '?' };
      }),
    }));

  /* -- 3. 우클릭 메뉴 (좌표 없이) --------------------------------------
     ★ clientY 가 화면 위쪽이면 헤더에 먹혀 메뉴가 안 열린다.
        긴 섹션은 scrollIntoView 후에도 top 이 음수이므로 반드시 클램프한다.
     위젯 메뉴 항목: ._setting ._animation ._extend ._copy ._paste ._copy_widget_id ._delete
     섹션 메뉴 항목: ._setting._item ._empty._item ._up._item ._down._item
                     ._copy._item ._paste._item ._delete._item                     */
  function ctx(widgetId, item) {
    const w = document.getElementById(widgetId);
    if (!w) return 'missing ' + widgetId;
    w.scrollIntoView({ block: 'center' });
    const r = w.getBoundingClientRect();
    const y = Math.round(Math.max(140, Math.min(innerHeight - 140, r.top + r.height / 2)));
    w.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true, cancelable: true, view: window,
      clientX: Math.round(r.left + r.width / 2), clientY: y, button: 2,
    }));
    const li = [...document.querySelectorAll('li' + item)].filter(e => e.offsetParent)[0];
    if (!li) return 'no item ' + item;
    li.click();
    return 'ok';
  }

  function secCtx(sectionId, item) {
    const s = document.getElementById(sectionId);
    if (!s) return 'missing ' + sectionId;
    s.scrollIntoView({ block: 'center' });
    const r = s.getBoundingClientRect();
    const lo = Math.max(r.top + 30, 140), hi = Math.min(r.bottom - 30, innerHeight - 140);
    const y = Math.round(hi > lo ? (lo + hi) / 2
                                 : Math.max(140, Math.min(innerHeight - 140, r.top + 40)));
    s.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true, cancelable: true, view: window,
      clientX: Math.round(r.left + 12), clientY: y, button: 2,
    }));
    const li = [...document.querySelectorAll('li' + item)].filter(e => e.offsetParent)[0];
    if (!li) return 'no item ' + item;
    li.click();
    return 'ok';
  }

  const width = id => {
    const e = document.getElementById(id);
    return e ? Math.round(e.getBoundingClientRect().width) : null;
  };
  /* 가로 영역 확장은 토글이다. 이미 켜졌으면 건드리지 않는다. */
  function extend(id, fullWidth) {
    if (width(id) === fullWidth) return 'already';
    ctx(id, '._extend');
    return width(id);
  }

  /* -- 4. 구조 만들기 (전부 비동기) --------------------------------------
     ★ DOM 반영이 늦으므로 폴링해서 새 id 를 잡아야 한다. 동기로 읽으면 null 이 나온다. */
  async function poll(beforeList, listFn) {
    for (let i = 0; i < 12; i++) {
      await wait(400);
      const now = listFn();
      const neu = now.find(id => beforeList.indexOf(id) < 0);
      if (neu) return neu;
    }
    return null;
  }
  const allSections = () => struct().map(s => s.section);
  const allWidgets = () => struct().flatMap(s => s.widgets.map(w => w.id));

  /* 지정 섹션 뒤에 빈 섹션을 만든다 */
  async function addSection(afterSectionId) {
    const before = allSections();
    secCtx(afterSectionId, '._empty._item');
    return poll(before, allSections);
  }
  /* ★ 빈 섹션에도 붙여넣기가 된다 — 섹션 우클릭의 '위젯 붙여넣기'.
     이것 덕분에 위젯 배치에 좌표 클릭이 전혀 필요 없다. */
  async function pasteInto(sectionId) {
    const before = allWidgets();
    secCtx(sectionId, '._paste._item');
    return poll(before, allWidgets);
  }
  /* target 바로 아래에 source 를 복제한다. 내용·메모·여백까지 따라온다. */
  async function clone(sourceId, targetId) {
    const before = allWidgets();
    ctx(sourceId, '._copy');
    await wait(600);
    ctx(targetId, '._paste');
    return poll(before, allWidgets);
  }
  /* 삭제 — 확인 모달까지 눌러준다 */
  const del = id => new Promise(res => {
    MENU.deleteWidget(id);
    setTimeout(() => {
      const d = [...document.querySelectorAll('.modal-dialog')].filter(e => e.offsetParent)[0];
      if (d) {
        const b = [...d.querySelectorAll('a,button')].find(e => e.textContent.trim() === '확인');
        if (b) b.click();
      }
      setTimeout(() => res(!document.getElementById(id)), 1200);
    }, 700);
  });

  /* [텍스트+코드] 섹션을 n 개 만든다.
     donorText / donorCode = 복제 원본으로 쓸 기존 위젯.
     ★ 섹션이 만들어지는 순서와 DOM 순서가 어긋날 수 있으니,
        내용은 반드시 struct() 의 DOM 순서대로 채운다. */
  async function buildSections(n, afterSectionId, donorText, donorCode) {
    const secs = [];
    let prev = afterSectionId;
    for (let i = 0; i < n; i++) {
      const s = await addSection(prev);
      if (!s) break;
      secs.push(s); prev = s; await wait(500);
    }
    const made = [];
    for (const sec of secs) {
      ctx(donorText, '._copy'); await wait(700);
      const t = await pasteInto(sec); await wait(400);
      const c = t ? await clone(donorCode, t) : null; await wait(400);
      made.push({ section: sec, text: t, code: c });
    }
    return made;
  }

  /* -- 5. 큰 파일 옮기기 (클립보드) --------------------------------------
     수만 자짜리 코드를 대화/콘솔로 나르지 않는다.
       1) PowerShell:  Set-Clipboard -Value ([IO.File]::ReadAllText($p,[Text.Encoding]::UTF8))
       2) IW.pasteBox()  → 숨은 textarea 에 포커스
       3) Ctrl+V
       4) IW.pasted()    → 문자열로 꺼내 IW.put() 에 넘긴다
     여러 파일은 구분자로 이어 붙여 한 번에 넣고 split 하면 된다. */
  function pasteBox() {
    const old = document.getElementById('ntPasteBox'); if (old) old.remove();
    const ta = document.createElement('textarea');
    ta.id = 'ntPasteBox';
    ta.style.cssText = 'position:fixed;left:10px;top:10px;width:400px;height:120px;z-index:2147483647;opacity:0.01;';
    document.body.appendChild(ta);
    ta.value = ''; ta.focus(); ta.setSelectionRange(0, 0);
    return document.activeElement === ta;
  }
  const pasted = () => { const t = document.getElementById('ntPasteBox'); return t ? t.value : null; };

  /* -- 6. 게시 -------------------------------------------------------- */
  async function publish() {
    const r = await fetch(`${GW}/design-mode/design/publish/start`,
      { method: 'POST', headers: headers(), body: '{}' });
    if (r.status !== 202) return { ok: false, status: r.status };
    for (let i = 0; i < 12; i++) {
      await wait(2000);
      const s = await (await fetch(`${GW}/design-mode/design/status?_=${Date.now()}`,
        { headers: headers() })).json();
      if (s.publish.status !== 'RUNNING') return { ok: s.publish.status === 'SUCCESS', ...s.publish };
    }
    return { ok: false, timeout: true };
  }

  /* -- 7. 스크린샷 좌표 (프레임 1568 기준) ------------------------------
     빈 "페이지"에 첫 위젯을 넣을 때만 필요하다. (섹션이 아예 없으면 '+' 를 눌러야 한다) */
  function at(elId) {
    const e = document.getElementById(elId);
    if (!e) return null;
    e.scrollIntoView({ block: 'center' });
    const r = e.getBoundingClientRect(), k = 1568 / innerWidth;
    return { x: Math.round((r.x + r.width / 2) * k), y: Math.round((r.y + r.height / 2) * k) };
  }

  /* -- 8. 라이브 페이지 자가 점검 (게시 후 다른 탭에서 실행) ---------------- */
  function audit() {
    const d = document, de = d.documentElement;
    const out = { url: location.pathname, title: d.title, h: de.scrollHeight };
    out.overflowX = de.scrollWidth - de.clientWidth;
    const wide = [];
    [...d.querySelectorAll('body *')].forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.right > de.clientWidth + 2 && r.width < de.clientWidth * 3) {
        wide.push((e.tagName + '.' + (e.className || '').toString().split(/\s+/)[0]).slice(0, 40));
      }
    });
    out.overflowing = [...new Set(wide)].slice(0, 6);
    const imgs = [...d.images];
    out.imgTotal = imgs.length;
    out.imgBroken = imgs.filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src'))
                        .map(i => (i.getAttribute('src') || '').split('/').pop()).slice(0, 8);
    out.dummyText = /Site name|I'm a paragraph|Lorem ipsum/.test(d.body.innerText || '');
    out.emptySections = [...d.querySelectorAll('.section_wrap')]
      .filter(s => (s.textContent || '').trim().length < 3).length;
    return out;
  }

  window.IW = { trimCookies, get, put, ZERO, menus, openPage, struct,
                ctx, secCtx, extend, width, addSection, pasteInto, clone, del,
                buildSections, pasteBox, pasted, publish, at, audit };
  console.log('IW ready:', Object.keys(window.IW).join(' '));
  return 'IW ready';
})();
