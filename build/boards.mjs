// 게시판 3종(시공사례 · 청소가이드 · 자주 묻는 질문)을 시안 디자인으로 꾸미는 조각
//   node build/boards.mjs → imweb/_boards.json  (+ imweb/<페이지>/02_필터*.html, 03_게시판_반응형.html)
//
// 페이지 구성: [페이지헤드] [필터 섹션: 텍스트(칩) + 코드(칩 활성화)] [게시판 섹션: 아임웹 게시판 + 코드(게시판 CSS)] [CTA]
// 카테고리 필터는 아임웹 게시판의 ?category=<코드> 파라미터로 동작한다.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '../imweb');
const FONT = "Pretendard,'Apple SD Gothic Neo','Noto Sans KR',system-ui,sans-serif";
const PH = 'linear-gradient(135deg,rgba(30,95,217,.10),rgba(8,17,30,.55)),repeating-linear-gradient(115deg,#243447 0 22px,#1C2B3C 22px 44px)';

// 게시판별 설정 — 카테고리 코드는 아임웹 게시판 설정에서 생성된 값
export const BOARDS = {
  portfolio: {
    dir: '시공사례', menu: 'portfolio', board: 'b2026091455236398c263a', widget: 'w20260914207ba0d1416b2', style: 'grid',
    cats: [['전체', ''], ['후드청소', 'V450zT86D1'], ['덕트청소', 'mO3z3mi01m'], ['배기팬', '7u71FO730P'], ['주방 전체청소', '45PdJHHmg3'], ['정기 위생관리', '5G62427NgC']],
    placeholder: '전·후 사진',
  },
};

function filterSection(b) {
  const chip = (label, code, on) => `<a class="os-fchip${on ? ' os-fchip-on' : ''}" data-cat="${code}" href="/${b.menu}${code ? `?category=${code}` : ''}" style="display:inline-block;font-size:13.5px;font-weight:600;padding:9px 18px;border-radius:100px;border:1px solid ${on ? '#0D1A2B' : '#E4E9F0'};color:${on ? '#FFFFFF' : '#475467'};background:${on ? '#0D1A2B' : '#FFFFFF'};text-decoration:none;line-height:1.7;">${label}</a>`;
  const text = `<div class="os-t-section os-filter-sec ovis-sec" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;box-sizing:border-box;font-family:${FONT};font-size:16px;line-height:1.7;color:#0F1724;word-break:keep-all;background:#FFFFFF;padding:88px 0 0;">
<div class="os-c" style="max-width:1180px;margin:0 auto;padding:0 24px;">
<div class="os-filter" style="display:flex;gap:8px;flex-wrap:wrap;">
${b.cats.map(([l, c], i) => chip(l, c, i === 0)).join('\n')}
</div>
</div>
</div>`;
  // 현재 URL 의 category 파라미터에 맞춰 칩 활성 표시를 옮긴다
  const code = `<style>
.os-fchip{transition:border-color .15s ease,color .15s ease}
.os-fchip.os-fchip-on,.os-fchip.os-fchip-on:link,.os-fchip.os-fchip-on:visited{background:#0D1A2B!important;color:#FFFFFF!important;border-color:#0D1A2B!important}
.os-fchip:not(.os-fchip-on),.os-fchip:not(.os-fchip-on):link,.os-fchip:not(.os-fchip-on):visited{background:#FFFFFF!important;color:#475467!important;border-color:#E4E9F0!important}
@media (hover:hover){.os-fchip:not(.os-fchip-on):hover{border-color:#1E5FD9!important;color:#1E5FD9!important}}
@media (max-width:600px){.os-filter{flex-wrap:nowrap!important;overflow-x:auto!important;padding-bottom:4px!important}.os-fchip{flex:none!important}}
</style>
<script>
(function(){
  function mark(){
    var m=location.search.match(/[?&]category=([^&]+)/), cur=m?decodeURIComponent(m[1]):'';
    var chips=document.querySelectorAll('.os-fchip');
    for(var i=0;i<chips.length;i++){ var on=(chips[i].getAttribute('data-cat')||'')===cur; chips[i].className='os-fchip'+(on?' os-fchip-on':''); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mark); else mark();
})();
</script>`;
  return { text, code };
}

function boardCss(b) {
  const W = `#${b.widget}`;
  const common = `
${W}{max-width:1180px!important;margin:0 auto!important;padding:28px 24px 88px!important;box-sizing:border-box!important;font-family:${FONT}!important}
${W} .li_footer .btn{background:#1E5FD9!important;border-color:#1E5FD9!important;border-radius:8px!important}
${W} .notice-block,${W} .addon-badge{display:none!important}
${W} .pagination{margin-top:40px!important}
${W} .pagination>li>a,${W} .pagination>li>span{width:36px!important;height:36px!important;line-height:34px!important;padding:0!important;text-align:center!important;border-radius:8px!important;border:1px solid #E4E9F0!important;color:#475467!important;margin:0 3px!important;font-weight:600!important}
${W} .pagination>.active>a,${W} .pagination>.active>span{background:#1E5FD9!important;border-color:#1E5FD9!important;color:#FFFFFF!important}`;
  if (b.style === 'grid') return `<style>${common}
${W} #post_card_${b.board}{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:20px!important;margin:0!important}
${W} #post_card_${b.board}>._post_row{width:auto!important;margin:0!important}
${W} ._post_item_wrap{padding:0!important;height:100%!important}
${W} .card{height:100%!important;background:#FFFFFF!important;border:1px solid #E4E9F0!important;border-radius:14px!important;overflow:hidden!important;box-shadow:0 4px 14px rgba(16,24,40,.07)!important;transition:transform .18s ease,box-shadow .18s ease}
@media (hover:hover){${W} .card:hover{transform:translateY(-4px);box-shadow:0 18px 34px rgba(8,17,30,.14)!important}}
${W} .card .holder,${W} .card .post_link_wrap{display:flex!important;flex-direction:column!important;height:100%!important;color:inherit!important;text-decoration:none!important}
${W} .card-thumbnail-wrap{position:relative!important}
${W} .card-head{height:200px!important}
${W} .card.no-img .card-thumbnail-wrap{background-image:${PH}!important}
${W} .card.no-img .card-head::after{content:"${b.placeholder}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.72)}
${W} .card-body{order:1!important;padding:18px 18px 6px!important;border:0!important}
${W} .card-summary{order:0!important;padding:18px 18px 0!important;margin:0!important;border:0!important}
${W} .card-summary .avatar,${W} .card-summary .tools{padding:0!important;margin:0!important}
${W} .card-summary .date{font-size:11.5px!important;color:#7B8794!important}
${W} .card-foot{display:none!important}
${W} .title{font-size:15.5px!important;font-weight:700!important;letter-spacing:-.02em!important;line-height:1.5!important;color:#0F1724!important;margin:0 0 8px!important;white-space:normal!important}
${W} .title>span>em{display:inline-block!important;font-style:normal!important;font-size:11.5px!important;font-weight:700!important;color:#1547B0!important;background:#EFF5FE!important;padding:3px 9px!important;border-radius:5px!important;margin:0 0 9px!important;vertical-align:middle!important}
${W} .title>span{display:block!important}
${W} .text-block{font-size:13px!important;color:#475467!important;line-height:1.7!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important;height:auto!important;max-height:none!important}
${W} .text-block span{font-size:13px!important;color:#475467!important}
@media (max-width:900px){${W} #post_card_${b.board}{grid-template-columns:repeat(2,1fr)!important}}
@media (max-width:560px){${W} #post_card_${b.board}{grid-template-columns:1fr!important}}
</style>`;
  return `<style>${common}</style>`;
}

const out = {};
for (const [key, b] of Object.entries(BOARDS)) {
  const f = filterSection(b);
  const css = boardCss(b);
  out[key] = { filter: f, boardCss: css, ...b };
  const d = path.join(OUT, b.dir);
  fs.writeFileSync(path.join(d, '02a_카테고리필터.html'), f.text + '\n');
  fs.writeFileSync(path.join(d, '02a_카테고리필터_반응형.html'), f.code + '\n');
  fs.writeFileSync(path.join(d, '02_게시판_반응형.html'), css + '\n');
  fs.writeFileSync(path.join(d, '02_게시판.html'), `<!-- 아임웹 게시판 위젯 (${b.board}) — 텍스트 위젯 아님 -->\n`);
}
fs.writeFileSync(path.join(OUT, '_boards.json'), JSON.stringify(out));
console.log(Object.keys(out));
