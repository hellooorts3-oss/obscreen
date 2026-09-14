// 오비스크린 서브페이지 컴포넌트 키트
// 섹션 1개 = 텍스트 위젯(인라인 스타일 HTML) + 코드 위젯(그 섹션 전용 반응형 CSS)
// 컴포넌트가 use(key) 로 필요한 CSS 조각을 등록하면, 섹션마다 쓴 조각만 모아 코드 위젯을 만든다.
// 조각마다 기본 규칙 + 미디어쿼리가 같이 들어 있어서, 위젯 순서가 바뀌어도 미디어쿼리가 덮이지 않는다.

export const F = "font-family:Pretendard,'Apple SD Gothic Neo',system-ui,sans-serif;";
const PH_BG = 'background-color:#1C2B3C;background-image:linear-gradient(135deg,rgba(30,95,217,.10),rgba(8,17,30,.55)),repeating-linear-gradient(115deg,#243447 0 22px,#1C2B3C 22px 44px);';
const CARD = 'border:1px solid #E4E9F0;border-radius:16px;background:#FFFFFF;box-shadow:0 1px 2px rgba(16,24,40,.05);';

let used = new Set();
const use = k => used.add(k);

export const nw = s => `<span style="white-space:nowrap;">${s}</span>`;
export const b = s => `<span style="font-weight:700;color:#0F1724;">${s}</span>`;
export const blue = s => `<span style="color:#1E5FD9;white-space:nowrap;">${s}</span>`;
export const br = '<br class="ovis-br-pc">';

/* ---------- CSS 조각 ---------- */
const CSS = {
  base: `.ovis-sec .ovis-c{width:100%!important;max-width:1180px!important;margin:0 auto!important;padding:0 24px!important}
@media (max-width:600px){.ovis-br-pc{display:none!important}}`,
  phx: `.ovis-phchips{display:flex!important;flex-wrap:wrap!important;gap:8px!important}
.ovis-phbtns{display:flex!important;flex-wrap:wrap!important;gap:10px!important}
.ovis-phbtns a,.ovis-phbtns a:link,.ovis-phbtns a:visited{color:#FFFFFF!important}
@media (max-width:540px){.ovis-phbtns a{flex:1 1 100%!important}}`,
  g2: `.ovis-g2{display:grid!important;grid-template-columns:repeat(2,1fr)!important;gap:18px!important}
@media (max-width:760px){.ovis-g2{grid-template-columns:1fr!important}}`,
  g3: `.ovis-g3{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:18px!important}
@media (max-width:900px){.ovis-g3{grid-template-columns:repeat(2,1fr)!important}}
@media (max-width:560px){.ovis-g3{grid-template-columns:1fr!important}}`,
  g4: `.ovis-g4{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:16px!important}
@media (max-width:900px){.ovis-g4{grid-template-columns:repeat(2,1fr)!important}}
@media (max-width:480px){.ovis-g4{grid-template-columns:1fr!important}}`,
  g5: `.ovis-g5{display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:14px!important}
@media (max-width:980px){.ovis-g5{grid-template-columns:repeat(3,1fr)!important}}
@media (max-width:640px){.ovis-g5{grid-template-columns:repeat(2,1fr)!important}}
@media (max-width:400px){.ovis-g5{grid-template-columns:1fr!important}}`,
  split: `.ovis-split{display:grid!important;grid-template-columns:.8fr 1.2fr!important;gap:56px!important;align-items:start!important}
@media (max-width:900px){.ovis-split{grid-template-columns:1fr!important;gap:28px!important}}`,
  split2: `.ovis-split2{display:grid!important;grid-template-columns:1fr 1fr!important;gap:48px!important;align-items:start!important}
@media (max-width:900px){.ovis-split2{grid-template-columns:1fr!important;gap:32px!important}}`,
  ba: `.ovis-ba{display:grid!important;grid-template-columns:1fr 1fr!important;gap:2px!important}`,
  list: `.ovis-list{display:grid!important;gap:10px!important;margin:0!important;padding:0!important}
.ovis-li{display:flex!important;align-items:flex-start!important;gap:9px!important}`,
  faq: `.ovis-faq{display:grid!important;gap:0!important;margin:0!important;padding:0!important}
.ovis-faq-q{display:flex!important;align-items:flex-start!important;gap:12px!important}
.ovis-faq-a{display:flex!important;align-items:flex-start!important;gap:12px!important}`,
  chips: `.ovis-chips{display:flex!important;flex-wrap:wrap!important;gap:7px!important}`,
  btnline: `.ovis-btn-line,.ovis-btn-line:link,.ovis-btn-line:visited{background:#FFFFFF!important;color:#0F1724!important;border-color:#CBD5E1!important}
.ovis-btn-line{transition:transform .18s ease,border-color .18s ease}
@media (hover:hover){.ovis-btn-line:hover{border-color:#1E5FD9!important;transform:translateY(-2px)}}`,
  golink: `.ovis-golink,.ovis-golink:link,.ovis-golink:visited{color:#1E5FD9!important;text-decoration:none!important}`,
  tel: `.ovis-tel,.ovis-tel:link,.ovis-tel:visited{color:#0F1724!important;text-decoration:none!important}`,
  plan: `.ovis-plan{display:flex!important;flex-direction:column!important}
.ovis-plan .ovis-list{flex:1 1 auto!important}
.ovis-plan a,.ovis-plan a:link,.ovis-plan a:visited{color:inherit}
.ovis-plan .ovis-btn-primary,.ovis-plan .ovis-btn-primary:link,.ovis-plan .ovis-btn-primary:visited{color:#FFFFFF!important}`,
  rep: `.ovis-rep-row{display:grid!important;grid-template-columns:96px 1fr!important;gap:12px!important}
@media (max-width:400px){.ovis-rep-row{grid-template-columns:1fr!important;gap:2px!important}}`,
  flowline: `.ovis-flowline{position:relative!important}
.ovis-flowline .ovis-flow-n{position:relative!important;z-index:1!important}`,
  case: `.ovis-case{display:flex!important;flex-direction:column!important;overflow:hidden!important}
.ovis-case-meta{display:grid!important;grid-template-columns:44px 1fr!important;gap:4px 10px!important}`,
  strip: `.ovis-strip{display:flex!important;flex-wrap:wrap!important;gap:12px 32px!important;align-items:center!important;justify-content:space-between!important}
.ovis-strip a,.ovis-strip a:link,.ovis-strip a:visited{color:#FFFFFF!important}
@media (max-width:760px){.ovis-strip{justify-content:flex-start!important}}`,
};

/* ---------- 섹션 ---------- */
// id: 파일명, memo: 위젯 메모, bg: 배경, inner: 내용
export function section({ key, bg = '#FFFFFF', pad = '88px 0', color = '#0F1724', align = 'left', extraCss = '' }, innerFn) {
  used = new Set(['base']);
  const inner = innerFn();
  const html = `<div class="ovis-sec ${key}" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;padding:${pad};overflow:hidden;background:${bg};box-sizing:border-box;${F}color:${color};">
  <div class="ovis-c" style="position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;padding:0 24px;text-align:${align};box-sizing:border-box;">
${inner}
  </div>
</div>`;
  const css = [`.${key}{padding:${pad}!important;background:${bg}!important}`, ...cssFor(html), extraCss].filter(Boolean).join('\n');
  return { html, css: `<style>\n${css}\n</style>` };
}

// 마크업에 실제로 쓰인 클래스를 보고 CSS 조각을 고른다 (use() 호출 누락 방지)
const MARK = {
  phx: /ovis-ph(chips|btns)/, g2: /"ovis-g2"/, g3: /"ovis-g3"/, g4: /"ovis-g4"/, g5: /"ovis-g5"/,
  split: /"ovis-split"/, split2: /"ovis-split2"/, ba: /"ovis-ba"/, list: /ovis-list/, faq: /ovis-faq/,
  chips: /ovis-chips/, btnline: /ovis-btn-line/, golink: /ovis-golink/, tel: /ovis-tel/, plan: /ovis-plan/,
  rep: /ovis-rep-row/, flowline: /ovis-flowline/, case: /ovis-case/, strip: /ovis-strip/,
};
function cssFor(html) {
  const keys = new Set(['base', ...used]);
  for (const [k, re] of Object.entries(MARK)) if (re.test(html)) keys.add(k);
  return [...keys].map(k => CSS[k]);
}

/* ---------- 제목류 ---------- */
export const eyebrow = (t, c = '#1E5FD9') =>
  `<span class="ovis-eyebrow" style="display:inline-flex;align-items:center;gap:9px;margin:0 0 14px;font-size:12.5px;font-weight:700;letter-spacing:.02em;line-height:1.7;color:${c};"><span class="ovis-eyebrow-line" style="display:inline-block;flex:0 0 22px;width:22px;height:1.5px;background:${c};"></span><span>${t}</span></span>`;

export const pill = t =>
  `<span class="ovis-pill" style="display:inline-block;margin:0 0 16px;padding:6px 14px;border-radius:100px;background:#EFF5FE;color:#1E5FD9;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;line-height:1.7;">${t}</span>`;

export const h2 = (t, c = '#0F1724') =>
  `<div class="ovis-h2" style="margin:0 0 14px;font-size:clamp(25px,3.6vw,38px);font-weight:900;line-height:1.35;letter-spacing:-.03em;color:${c};">${t}</div>`;

export const sub = (t, mb = 0, c = '#475467') =>
  `<p class="ovis-sub" style="margin:0 0 ${mb}px;max-width:68ch;font-size:15px;font-weight:400;line-height:1.8;color:${c};">${t}</p>`;

export const head = ({ eb, title, desc, mb = 36 }) =>
  `    <div style="margin-bottom:${mb}px;">
      ${eb ? eyebrow(eb) : ''}
      ${h2(title)}
      ${desc ? sub(desc) : ''}
    </div>`;

/* ---------- 버튼 ---------- */
const BTN = 'display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:15px 26px;border-radius:10px;font-size:15px;font-weight:700;line-height:1.4;text-align:center;text-decoration:none;cursor:pointer;';
export const btnPrimary = (href, t) =>
  `<a class="ovis-btn ovis-btn-primary" href="${href}" style="${BTN}border:1px solid transparent;background:#1E5FD9;color:#FFFFFF;box-shadow:0 6px 18px rgba(30,95,217,.3);">${t}</a>`;
export const btnGhost = (href, t) =>
  `<a class="ovis-btn ovis-btn-ghost" href="${href}" style="${BTN}border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.07);color:#FFFFFF;">${t}</a>`;
export const btnLine = (href, t) => (use('btnline'),
  `<a class="ovis-btn ovis-btn-line" href="${href}" style="${BTN}border:1px solid #CBD5E1;background:#FFFFFF;color:#0F1724;">${t}</a>`);
export const btnDark = (href, t) =>
  `<a class="ovis-btn ovis-btn-dark" href="${href}" style="${BTN}border:1px solid transparent;background:#0D1A2B;color:#FFFFFF;">${t}</a>`;

/* ---------- 조각 ---------- */
export const ph = (label, h = 200, extra = '') =>
  `<div class="ovis-ph" style="position:relative;display:flex;align-items:center;justify-content:center;height:${h}px;overflow:hidden;${PH_BG}${extra}"><span style="padding:14px;font-size:12.5px;font-weight:500;line-height:1.6;letter-spacing:.01em;text-align:center;color:rgba(255,255,255,.72);">${label}</span></div>`;

export const tag = (t, bg = '#F4F7FB', c = '#475467') =>
  `<span style="display:inline-block;padding:5px 11px;border-radius:6px;background:${bg};color:${c};font-size:12px;font-weight:500;line-height:1.7;">${t}</span>`;

export const chips = (arr, bg, c) => (use('chips'),
  `<div class="ovis-chips" style="display:flex;flex-wrap:wrap;gap:7px;">${arr.map(t => tag(t, bg, c)).join('')}</div>`);

const ICO = {
  check: (c = '#1E5FD9') => `<span style="flex:0 0 18px;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-top:3px;border-radius:50%;background:${c};color:#FFFFFF;font-size:10px;font-weight:700;line-height:1;">✓</span>`,
  dash: () => `<span style="flex:0 0 18px;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-top:3px;border-radius:50%;background:#E4E9F0;color:#7B8794;font-size:12px;font-weight:700;line-height:1;">–</span>`,
  dot: (c = '#FF6A1F') => `<span style="flex:0 0 6px;width:6px;height:6px;margin-top:10px;border-radius:50%;background:${c};"></span>`,
};

// items: 문자열 또는 {t, s(부연)}
export const list = (items, kind = 'check', { size = 14.5, color = '#0F1724', weight = 500, gap = 10 } = {}) => (use('list'),
  `<div class="ovis-list" style="display:grid;gap:${gap}px;margin:0;padding:0;">
${items.map(it => {
    const o = typeof it === 'string' ? { t: it } : it;
    return `        <div class="ovis-li" style="display:flex;align-items:flex-start;gap:9px;font-size:${size}px;font-weight:${weight};line-height:1.7;color:${color};">${ICO[kind]()}<span>${o.t}${o.s ? `<span style="display:block;margin-top:1px;font-size:${size - 1.5}px;font-weight:400;color:#7B8794;">${o.s}</span>` : ''}</span></div>`;
  }).join('\n')}
      </div>`);

export const card = (inner, pad = '26px 24px', extra = '') =>
  `<div class="ovis-card" style="padding:${pad};${CARD}${extra}">${inner}</div>`;

export const cardTitle = (t, mb = 8, size = 17) =>
  `<div class="ovis-h4" style="margin:0 0 ${mb}px;font-size:${size}px;font-weight:900;line-height:1.45;letter-spacing:-.02em;color:#0F1724;">${t}</div>`;

export const cardText = (t, mb = 0) =>
  `<p style="margin:0 0 ${mb}px;font-size:14px;font-weight:400;line-height:1.8;color:#475467;">${t}</p>`;

export const num = (n, c = '#1E5FD9') =>
  `<div style="margin-bottom:14px;font-size:12px;font-weight:700;letter-spacing:.14em;line-height:1.7;color:${c};">${n}</div>`;

export const grid = (n, items, mt = 0) => (use('g' + n),
  `    <div class="ovis-g${n}" style="display:grid;grid-template-columns:repeat(${n},1fr);gap:${n >= 4 ? 16 : 18}px;margin-top:${mt}px;">
      ${items.join('\n      ')}
    </div>`);

export const note = (title, text, mt = 22) =>
  `    <div class="ovis-note" style="display:flex;align-items:flex-start;gap:12px;margin-top:${mt}px;padding:18px 22px;border:1px solid #FFD9C2;border-radius:12px;background:#FFF6F0;text-align:left;">
      <span style="flex:0 0 22px;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;margin-top:1px;border-radius:50%;background:#FF6A1F;color:#FFFFFF;font-size:13px;font-weight:900;line-height:1;">!</span>
      <div><div style="margin-bottom:3px;font-size:14.5px;font-weight:700;line-height:1.7;color:#0F1724;">${title}</div><p style="margin:0;font-size:13.5px;font-weight:400;line-height:1.8;color:#475467;">${text}</p></div>
    </div>`;

/* ---------- 큰 블록 ---------- */
export function pagehead({ crumbs, title, desc, chips: ch = [], buttons = [] }) {
  use('phx');
  const cr = crumbs.map((c, i) => i === crumbs.length - 1
    ? `<span style="font-weight:500;color:rgba(255,255,255,.85);">${c}</span>` : c).join(' &nbsp;›&nbsp; ');
  return `<div class="ovis-sec ovis-pagehead" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;padding:64px 0 58px;overflow:hidden;background:#08111E;box-sizing:border-box;${F}color:#FFFFFF;">
  <div class="ovis-c" style="position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;padding:0 24px;text-align:left;box-sizing:border-box;">
    <p class="ovis-crumb" style="margin:0 0 14px;font-size:12.5px;font-weight:400;line-height:1.7;color:rgba(255,255,255,.5);">${cr}</p>
    <h1 class="ovis-h1 ovis-pagehead-h1" style="margin:0 0 14px;padding:0;font-size:clamp(27px,4.2vw,42px);font-weight:900;line-height:1.28;letter-spacing:-.035em;text-align:left;color:#FFFFFF;">${title}</h1>
    <p class="ovis-pagehead-p" style="margin:0;max-width:66ch;font-size:15px;font-weight:300;line-height:1.9;color:rgba(255,255,255,.72);">${desc}</p>
${ch.length ? `    <div class="ovis-phchips" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:22px;">${ch.map(t => `<span style="display:inline-block;padding:6px 13px;border-radius:100px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#DCE6F2;font-size:12.5px;font-weight:500;line-height:1.7;">${t}</span>`).join('')}</div>\n` : ''}${buttons.length ? `    <div class="ovis-phbtns" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;">${buttons.join('')}</div>\n` : ''}  </div>
</div>`;
}

export function cta({ title, desc, primary = '무료 견적 · 상담 신청하기 →', list: items }) {
  return `<div class="ovis-sec ovis-ctasec" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;padding:96px 0;overflow:hidden;background:#08111E;box-sizing:border-box;${F}color:#FFFFFF;">
  <div class="ovis-c" style="position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;padding:0 24px;box-sizing:border-box;">
    <div class="ovis-ctacard" style="position:relative;max-width:790px;margin:0 auto;padding:52px 44px;border:1px solid rgba(255,255,255,.11);border-radius:22px;background:rgba(255,255,255,.035);text-align:center;color:#FFFFFF;">
      <div class="ovis-ctalbl" style="margin-bottom:18px;font-size:11px;font-weight:700;letter-spacing:.2em;line-height:1.7;color:#7FA9EE;">CONTACT US</div>
      <div class="ovis-h2" style="margin:0 0 16px;font-size:clamp(24px,3.8vw,36px);font-weight:900;line-height:1.4;letter-spacing:-.03em;color:#FFFFFF;">${title}</div>
      <p class="ovis-ctap" style="margin:0 0 28px;font-size:14.5px;font-weight:300;line-height:1.9;color:rgba(255,255,255,.72);">${desc}</p>
${items ? `      <div class="ovis-ctabox" style="margin-bottom:28px;padding:20px 22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.05);text-align:left;">
        <div class="ovis-ctabox-t" style="margin-bottom:12px;font-size:13px;font-weight:700;line-height:1.7;color:#FF6A1F;">이런 상황이라면 점검을 권합니다</div>
        <div class="ovis-ctalist" style="display:grid;gap:8px;margin:0;padding:0;">
${items.map(t => `          <div class="ovis-ctaitem" style="display:flex;align-items:flex-start;gap:7px;font-size:13.5px;font-weight:400;line-height:1.7;color:rgba(255,255,255,.8);"><span class="ovis-ctaitem-ico" style="flex:0 0 12px;color:#3B82F6;font-size:12px;font-weight:700;">✓</span><span>${t}</span></div>`).join('\n')}
        </div>
      </div>\n` : ''}      <div class="ovis-cta-btns" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
        ${btnPrimary('/contact', primary)}
        ${btnGhost('tel:01000000000', '담당자와 바로 전화 상담')}
      </div>
      <p class="ovis-ctafine" style="margin:0;font-size:12.5px;font-weight:400;line-height:1.9;color:rgba(255,255,255,.5);">문의 내용 확인 후 통상 24시간 이내에 연락드립니다.<br>서비스 지역: 서울·경기·인천 전지역 · 상담 시간: 평일 09:00–19:00</p>
    </div>
  </div>
</div>`;
}

// section() 없이 통째로 만든 블록(페이지헤드 · CTA)용. 공통 head 에 없는 규칙만 코드 위젯에 담긴다
export function withUsed(fn, extraKeys = []) {
  used = new Set(['base', ...extraKeys]);
  const html = fn();
  return { html, css: `<style>\n${cssFor(html).join('\n')}\n</style>` };
}

/* ---------- 반복 블록 ---------- */
export function steps(items, cols = 3) {
  use('flowline');
  return grid(cols, items.map((s, i) => card(
    `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><span class="ovis-flow-n" style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border:1.5px solid #3B82F6;border-radius:50%;background:#FFFFFF;color:#1E5FD9;font-size:13px;font-weight:700;line-height:1;">${String(i + 1).padStart(2, '0')}</span><span style="font-size:11px;font-weight:700;letter-spacing:.14em;line-height:1.7;color:#7B8794;">STEP</span></div>`
    + cardTitle(s.t) + cardText(s.d), '24px 22px', '')));
}

export function scope(inc, exc) {
  return grid(2, [
    card(`<div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#1E5FD9;"></span>${cardTitle('포함되는 작업', 0)}</div>` + list(inc, 'check'), '28px 26px'),
    card(`<div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#98A2B3;"></span>${cardTitle('별도 협의 · 포함되지 않는 작업', 0)}</div>` + list(exc, 'dash', { color: '#475467', weight: 400 }), '28px 26px', 'background:#FBFCFE;'),
  ]);
}

export function faq(items) {
  use('faq');
  return `<div class="ovis-faq" style="display:grid;gap:0;margin:0;padding:0;border-top:2px solid #0F1724;">
${items.map(({ q, a }) => `        <div style="padding:22px 4px;border-bottom:1px solid #E4E9F0;">
          <div class="ovis-faq-q" style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;"><span style="flex:0 0 26px;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#1E5FD9;color:#FFFFFF;font-size:12px;font-weight:700;line-height:1;">Q</span><span style="font-size:15.5px;font-weight:700;line-height:1.7;letter-spacing:-.01em;color:#0F1724;">${q}</span></div>
          <div class="ovis-faq-a" style="display:flex;align-items:flex-start;gap:12px;"><span style="flex:0 0 26px;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#EFF5FE;color:#1E5FD9;font-size:12px;font-weight:700;line-height:1;">A</span><span style="font-size:14px;font-weight:400;line-height:1.85;color:#475467;">${a}</span></div>
        </div>`).join('\n')}
      </div>`;
}

export function faqSection(key, items, bg = '#FFFFFF', {
  eb = '자주 묻는 질문',
  title = '상담 전에 <br class="ovis-br-pc">많이 물어보시는 것들',
  desc = '여기에 없는 내용은 편하게 문의해 주세요. 현장 사진을 함께 보내주시면 더 정확하게 답변드립니다.',
  button = true,
} = {}) {
  return section({ key, bg }, () => {
    use('split');
    return `    <div class="ovis-split" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start;">
      <div>
        ${eyebrow(eb)}
        ${h2(title)}
        ${sub(desc, button ? 22 : 0)}
        ${button ? btnLine('/contact', '질문 남기기 →') : ''}
      </div>
      ${faq(items)}
    </div>`;
  });
}

export function beforeAfter(items) {
  use('ba');
  const lab = (t, bg) => `<span style="position:absolute;left:10px;top:10px;z-index:1;display:inline-block;padding:3px 9px;border-radius:5px;background:${bg};color:#FFFFFF;font-size:10.5px;font-weight:700;letter-spacing:.1em;line-height:1.7;">${t}</span>`;
  return grid(3, items.map(it => `<div class="ovis-work" style="overflow:hidden;${CARD}box-shadow:0 4px 14px rgba(16,24,40,.07);">
        <div class="ovis-ba" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#FFFFFF;">
          <div style="position:relative;">${lab('BEFORE', 'rgba(8,17,30,.72)')}${ph(it.b, 170)}</div>
          <div style="position:relative;">${lab('AFTER', '#1E5FD9')}${ph(it.a, 170)}</div>
        </div>
        <div style="padding:16px 18px;"><div style="margin-bottom:3px;font-size:15px;font-weight:700;line-height:1.6;letter-spacing:-.02em;color:#0F1724;">${it.t}</div><div style="font-size:13px;font-weight:400;line-height:1.7;color:#7B8794;">${it.s}</div></div>
      </div>`), 0);
}

export function cycles(items) {
  return grid(3, items.map(c => card(
    `<div style="margin-bottom:10px;font-size:13px;font-weight:700;line-height:1.7;color:#475467;">${c.k}</div>
        <div style="margin-bottom:10px;font-size:clamp(22px,2.6vw,27px);font-weight:900;line-height:1.3;letter-spacing:-.03em;color:#1547B0;">${c.v}</div>
        ${cardText(c.d)}`, '26px 24px')));
}
