// 시안 HTML → 아임웹 섹션(텍스트 위젯 인라인 HTML + 코드 위젯 반응형 CSS) 변환기
//   node build/convert.mjs
//
// 규칙
//  - 섹션 1개 = 시안의 <section> 1개. 텍스트 위젯에는 스타일을 인라인으로 박은 HTML, 코드 위젯에는
//    인라인으로 못 옮기는 규칙(미디어쿼리 · ::before/::after · :hover)만 !important 로 담는다.
//  - 클래스는 전부 os- 접두사 (아임웹 자체 클래스와 이름 충돌 방지 · 작업노트 §23 ④).
//  - h2~h6 · section · ul/li 등은 div 로 바꾸고 원래 태그는 os-t-<tag> 클래스로 남긴다 (§26).
//    h1 만은 태그를 유지한다 — 공통 head 의 스크립트가 .ovis-h1 의 인라인 스타일을 !important 로 다시 칠한다.
//  - 문구는 시안 그대로 (의뢰서 2번 변경 불가). 이모지 아이콘은 라인 SVG 로 교체 (의뢰서 2번 하지 말 것).
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import juice from 'juice';
import { ICONS } from './icons.mjs';
import { VARIANTS } from './variants.mjs';
import { localBusiness, service } from './jsonld.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SIAN = path.join(ROOT, '받은자료/받은자료/01_시안/오비스크린_시안_8페이지.html');
const OUT = path.join(ROOT, 'imweb');

const FONT = "Pretendard,'Apple SD Gothic Neo','Noto Sans KR',system-ui,sans-serif";
const TEL = 'tel:01000000000';
const KAKAO = 'http://pf.kakao.com/_xkxaSEX';
// 블록 태그만 강등한다 (em · i · u · b 같은 인라인 태그는 아임웹이 건드리지 않고, 강등하면 'div' 선택자에 걸린다)
const DEMOTE = ['section', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'article', 'nav', 'details', 'summary'];

/* ---------------------------------------------------------------- CSS */
const src = fs.readFileSync(SIAN, 'utf8');
const $src = cheerio.load(src);
let cssText = $src('style').map((_, e) => $src(e).html()).get().join('\n');
cssText = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

// :root 변수 치환
const vars = {};
cssText.replace(/:root\s*\{([^}]*)\}/, (_, body) => {
  body.split(';').forEach(d => { const m = d.match(/^\s*(--[\w-]+)\s*:\s*(.+?)\s*$/); if (m) vars[m[1]] = m[2]; });
});
for (let k = 0; k < 3; k++) cssText = cssText.replace(/var\((--[\w-]+)\)/g, (m, v) => vars[v] ?? m);
// 서체는 하나만 (의뢰서 5번)
cssText = cssText.replace(/font-family:[^;}]+/g, `font-family:${FONT}`);

// 규칙 파서 (@media 1단계 중첩까지)
function parseRules(text) {
  const out = []; let i = 0;
  while (i < text.length) {
    const open = text.indexOf('{', i); if (open < 0) break;
    const head = text.slice(i, open).trim();
    if (head.startsWith('@media')) {
      let depth = 1, j = open + 1;
      while (j < text.length && depth) { if (text[j] === '{') depth++; else if (text[j] === '}') depth--; j++; }
      parseRules(text.slice(open + 1, j - 1)).forEach(r => out.push({ ...r, media: head }));
      i = j;
    } else {
      const close = text.indexOf('}', open);
      out.push({ sel: head, body: text.slice(open + 1, close).trim(), media: null });
      i = close + 1;
    }
  }
  return out;
}
const tagRe = new RegExp(`(^|[\\s>+~(,])(${DEMOTE.concat('h1').join('|')})(?=$|[\\s.:#\\[>+~),])`, 'g');
const convSel = s => s
  .replace(/\.([a-zA-Z_][\w-]*)/g, '.os-$1')
  .replace(tagRe, (m, pre, tag) => `${pre}.os-t-${tag}`);

const SKIP_SEL = /^(:root|\*|body|img|\.switcher|\.gnb|\.logo|\.page|footer|\.float)(?![\w-])/;
const raw = parseRules(cssText).filter(r => r.sel && !r.sel.split(',').every(s => SKIP_SEL.test(s.trim())));
const isDynamic = sel => /::|:hover|:focus|:active|\[open\]|::-webkit/.test(sel);
// 인라인은 태그 강등 전에 한다 → 클래스 접두사만 붙이고 태그 선택자는 원래대로 둔다
const inlineCss = raw.filter(r => !r.media && !isDynamic(r.sel))
  .map(r => `${r.sel.replace(/\.([a-zA-Z_][\w-]*)/g, '.os-$1')}{${r.body}}`).join('\n');
// 코드 위젯 규칙은 강등 후의 마크업에 걸리므로 태그 선택자도 변환한다
const dynamicRules = raw.filter(r => r.media || isDynamic(r.sel)).map(r => ({ ...r, sel: convSel(r.sel) }));

const important = body => body.split(';').map(d => d.trim()).filter(Boolean)
  .map(d => /!important/.test(d) ? d : `${d}!important`).join(';');

/* ---------------------------------------------------------------- HTML 정리 */
function prep($, root) {
  // 클래스 접두사
  root.find('[class]').addBack('[class]').each((_, e) => {
    const cls = ($(e).attr('class') || '').split(/\s+/).filter(Boolean).map(c => 'os-' + c);
    $(e).attr('class', cls.join(' '));
  });
  // 이모지 → 라인 아이콘 (긴 키 먼저: ⚙️ 가 ⚙ 보다 앞)
  const emoRe = new RegExp(Object.keys(ICONS).sort((x, y) => y.length - x.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  root.find('*').addBack().contents().each((_, n) => {
    if (n.type !== 'text' || !emoRe.test(n.data)) return;
    emoRe.lastIndex = 0;
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let out = '', last = 0;
    n.data.replace(emoRe, (m, idx) => { out += esc(n.data.slice(last, idx)) + ICONS[m]; last = idx + m.length; return m; });
    out += esc(n.data.slice(last));
    $(n).replaceWith(out.replace(/(<\/svg>)\s+/g, '$1&nbsp;'));
  });
}

function demote($, root) {
  for (const tag of DEMOTE) {
    root.find(tag).addBack(tag).each((_, e) => {
      const $e = $(e);
      const cls = ['os-t-' + tag, $e.attr('class')].filter(Boolean).join(' ');
      e.tagName = 'div'; e.name = 'div';
      $e.attr('class', cls);
    });
  }
  root.find('h1').each((_, e) => $(e).attr('class', ['os-t-h1', $(e).attr('class')].filter(Boolean).join(' ')));
}

function links($, root) {
  root.find('a').each((_, e) => {
    const $a = $(e); const t = $a.text().replace(/\s+/g, '');
    let href = $a.attr('href');
    if (href && href !== '#') return;
    if (/전화|010-/.test(t)) href = TEL;
    else if (/카톡/.test(t)) href = KAKAO;
    else if (/시공사례/.test(t)) href = '/portfolio';
    else if (/후드청소자세히/.test(t)) href = '/hood-cleaning';
    else if (/덕트청소자세히/.test(t)) href = '/duct-cleaning';
    else if (/주방전체청소자세히/.test(t)) href = '/kitchen-cleaning';
    else if (/정기위생관리자세히/.test(t)) href = '/maintenance';
    else href = '/contact';
    $a.attr('href', href);
  });
}

// 섹션 하나 → { html, css }
function buildSection($, sec, meta) {
  const $w = $('<div>').append($(sec).clone());
  prep($, $w);
  links($, $w);
  const top = $w.children().first();
  top.addClass('ovis-sec');
  top.find('h1').addClass('ovis-h1');
  const inlined = juice.inlineContent($w.html(), inlineCss, {
    applyAttributesTableElements: false, applyWidthAttributes: false, applyHeightAttributes: false,
    preserveImportant: true, inlinePseudoElements: false, removeStyleTags: true, resolveCSSVariables: false,
  });
  const $i = cheerio.load(inlined, null, false);
  demote($i, $i.root());
  const t = $i.root().children().first();
  // 섹션 바깥 래퍼: 풀블리드 + 시안 body 기본값 상속
  t.attr('style', `position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;box-sizing:border-box;font-family:${FONT};font-size:16px;line-height:1.7;color:#0F1724;word-break:keep-all;${t.attr('style') || ''}`);
  const html = $i.html().replace(/\s*\n\s*/g, '\n').trim();

  // 이 섹션에서 쓰인 클래스만 골라 동적 규칙(미디어쿼리 · 가상요소 · hover)을 담는다.
  // 기본값은 전부 인라인이므로 코드 위젯끼리 선언 순서가 바뀌어도 미디어쿼리가 덮이지 않는다 (§22-3).
  const used = new Set();
  $i('[class]').each((_, e) => ($i(e).attr('class') || '').split(/\s+/).forEach(c => used.add(c)));
  const need = s => { const cs = [...s.matchAll(/\.(os-[\w-]+)/g)].map(m => m[1]); return cs.length && cs.every(c => used.has(c)); };
  const byMedia = new Map();
  for (const r of dynamicRules) {
    const sels = r.sel.split(',').map(x => x.trim()).filter(need);
    if (!sels.length) continue;
    const k = r.media || '';
    if (!byMedia.has(k)) byMedia.set(k, []);
    byMedia.get(k).push(`${sels.join(',')}{${important(r.body)}}`);
  }
  let css = (byMedia.get('') || []).join('\n');
  for (const [m, lines] of byMedia) if (m) css += `\n${m}{\n${lines.join('\n')}\n}`;
  return { html, css: `<style>\n${css.trim()}\n</style>` };
}

/* ---------------------------------------------------------------- 페이지 */
const PAGES = [
  { id: 'hood', dir: '후드청소', slug: 'hood-cleaning', names: ['히어로', '업종별시공', '해당사항', '브리지', '차별점3', '현장갤러리', '하단CTA'] },
  { id: 'std', dir: '작업기준', slug: 'standard', names: ['페이지헤드', '보유기준문서', '작업8단계', '품질기준', '안전법규', '하단CTA'] },
  { id: 'port', dir: '시공사례', slug: 'portfolio', names: ['페이지헤드', '게시판', '하단CTA'], board: 1 },
  { id: 'faq', dir: '자주묻는질문', slug: 'faq', names: ['페이지헤드', '게시판', '하단CTA'], board: 1 },
  { id: 'guide', dir: '청소가이드', slug: 'guide', names: ['페이지헤드', '게시판', '하단CTA'], board: 1 },
  { id: 'about', dir: '회사소개', slug: 'about', names: ['페이지헤드', '소개', '등록자격', '서비스지역', '하단CTA'] },
  { id: 'contact', dir: '견적문의', slug: 'contact', names: ['페이지헤드', '견적폼'], form: 1 },
];

function writePage(dir, slug, sections) {
  const d = path.join(OUT, dir);
  fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(d, { recursive: true });
  sections.forEach((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    fs.writeFileSync(path.join(d, `${n}_${s.name}.html`), s.html + '\n');
    fs.writeFileSync(path.join(d, `${n}_${s.name}_반응형.html`), s.css + '\n');
  });
  console.log(dir.padEnd(8), sections.length + '섹션', '/' + slug);
}

const manifest = {};
function emit(page, $, sectionEls) {
  const secs = sectionEls.map((el, i) => {
    const r = page.transform ? page.transform(i, el, $) : null;
    const built = r || buildSection($, el, {});
    return { name: page.names[i] || `섹션${i + 1}`, ...built };
  });
  // 구조화 데이터는 첫 섹션 코드 위젯 끝에 붙인다
  const ld = page.slug === 'about' ? localBusiness() : service(page.slug);
  if (ld && secs[0].css) secs[0].css += `\n${ld}`;
  writePage(page.dir, page.slug, secs);
  manifest[page.slug] = secs.map(s => ({ name: s.name, text: s.html, code: s.css, special: s.special || null }));
}

for (const page of PAGES) {
  const $ = cheerio.load(src);
  const secs = $(`#page-${page.id} > section`).toArray();
  if (page.board || page.form) {
    // 페이지헤드 · CTA 만 변환하고 가운데는 아임웹 게시판/입력폼 자리
    const head = secs[0], cta = secs[secs.length - 1];
    const mid = secs.slice(1, page.form ? undefined : -1);
    emit({ ...page, names: page.names, transform: (i, el) => {
      if (i === 1) return { html: '', css: '', special: page.form ? 'form' : 'board', source: $.html(mid) };
      return null;
    } }, $, page.form ? [head, mid[0]] : [head, mid[0], cta]);
  } else {
    emit(page, $, secs);
  }
}

/* 후드청소 템플릿을 복제한 서비스 상세 3종 (문구 교체표: variants.mjs) */
for (const v of VARIANTS) {
  const $ = cheerio.load(src);
  const root = $('#page-hood');
  v.apply($, root);
  const secs = root.children('section').toArray();
  emit({ id: 'hood', dir: v.dir, slug: v.slug, names: ['히어로', '업종별시공', '해당사항', '브리지', '차별점3', '현장갤러리', '하단CTA'] }, $, secs);
}

fs.writeFileSync(path.join(OUT, '_sian.json'), JSON.stringify(manifest));
console.log('manifest', Object.keys(manifest).join(', '));
