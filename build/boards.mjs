// 게시판 3종(시공사례 · 청소가이드 · 자주 묻는 질문)을 시안 디자인으로 꾸미는 조각
//   node build/boards.mjs → imweb/_boards.json  (+ imweb/<페이지>/02_필터*.html, 03_게시판_반응형.html)
//
// 페이지 구성: [페이지헤드] [필터 섹션: 텍스트(칩) + 코드(칩 활성화)] [게시판 섹션: 아임웹 게시판 + 코드(게시판 CSS)] [CTA]
// 카테고리 필터는 아임웹 게시판의 ?category=<코드> 파라미터로 동작한다.
import fs from 'node:fs';
import path from 'node:path';
import { faqPage } from './jsonld.mjs';

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
  guide: {
    dir: '청소가이드', menu: 'guide', board: 'b20260914064514efe1e81', widget: 'w202609149c4edbfa0c569', style: 'row',
    cats: [['전체', ''], ['후드·덕트', '80C04N8160'], ['약품·재질', '23206qds2R'], ['안전·법규', '13PQD33189'], ['청소 주기', 'NR5sVk51Rw'], ['업종별', '12781s8T8z']],
    placeholder: '가이드 이미지',
  },
  faq: {
    dir: '자주묻는질문', menu: 'faq', board: 'b20260914f120a414f1566', widget: 'w20260914605be5c5d3775', style: 'faq',
    cats: [['전체', ''], ['비용 · 견적', 'k08It7T8y4'], ['작업 · 일정', '22RE81DNL3'], ['청소 주기 · 관리', '762Z62u20B'], ['설비 · 안전', 'G55204w2P7']],
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
${W} .notice-block,${W} .addon-badge,${W} .title .icons,${W} .tabled .icons{display:none!important}
${W} .pagination{margin-top:40px!important}
${W} .pagination>li>a,${W} .pagination>li>span{width:36px!important;height:36px!important;line-height:34px!important;padding:0!important;text-align:center!important;border-radius:8px!important;border:1px solid #E4E9F0!important;color:#475467!important;margin:0 3px!important;font-weight:600!important}
${W} .pagination>.active>a,${W} .pagination>.active>span{background:#1E5FD9!important;border-color:#1E5FD9!important;color:#FFFFFF!important}`;
  if (b.style === 'grid') return `<style>${common}
${W} #post_card_${b.board}{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:20px!important;margin:0!important}
${W} #post_card_${b.board}>._post_row{display:contents!important}
${W} .list-style-card{width:auto!important;float:none!important;padding:0!important;margin:0!important}
${W} ._post_item_wrap{padding:0!important;height:100%!important}
${W} .card{height:100%!important;background:#FFFFFF!important;border:1px solid #E4E9F0!important;border-radius:14px!important;overflow:hidden!important;box-shadow:0 4px 14px rgba(16,24,40,.07)!important;transition:transform .18s ease,box-shadow .18s ease}
@media (hover:hover){${W} .card:hover{transform:translateY(-4px);box-shadow:0 18px 34px rgba(8,17,30,.14)!important}}
${W} .card .holder,${W} .card .post_link_wrap{position:relative!important;display:flex!important;flex-direction:column!important;height:100%!important;color:inherit!important;text-decoration:none!important}
${W} .card-thumbnail-wrap{position:relative!important}
${W} .card-head{height:200px!important}
${W} .card.no-img .card-thumbnail-wrap{background-image:${PH}!important}
${W} .card.no-img .card-head::after{content:"${b.placeholder}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.72)}
${W} .card-body{padding:18px 18px 20px!important;border:0!important}
${W} .card-summary{position:absolute!important;top:218px!important;right:18px!important;left:auto!important;width:auto!important;text-align:right!important;padding:0!important;margin:0!important;border:0!important;background:none!important}
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
  if (b.style === 'row') return `<style>${common}
${W} #post_card_${b.board}>ul.subject{display:none!important}
${W} #post_card_${b.board}{border:0!important;margin:0!important}
${W} #post_card_${b.board}>ul.list{display:block!important;margin:0!important;padding:24px 0!important;border:0!important;border-bottom:1px solid #E4E9F0!important;list-style:none!important;background:none!important}
${W} ul.list .post_link_wrap{display:block!important;padding:0!important}
${W} ul.list .list_text_title{display:block!important;width:100%!important;padding:0!important}
${W} ul.list li.tit{position:relative!important;display:block!important;width:100%!important;min-height:150px!important;padding:0 0 0 254px!important;list-style:none!important;text-align:left!important}
${W} ul.list li.tit::before{content:"${b.placeholder}";position:absolute;left:0;top:0;width:230px;height:150px;border-radius:14px;background:${PH};display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.72)}
${W} ul.list .title_link{display:block!important;color:#0F1724!important;text-decoration:none!important;white-space:normal!important}
${W} ul.list .title_link>em:not(.sticker){display:inline-block!important;font-style:normal!important;font-size:11.5px!important;font-weight:700!important;color:#1547B0!important;background:#EFF5FE!important;padding:3px 9px!important;border-radius:5px!important;margin:0 0 10px!important}
${W} ul.list .title_link>span:not(.icons){display:block!important;font-size:18px!important;font-weight:900!important;letter-spacing:-.025em!important;line-height:1.45!important;color:#0F1724!important;margin:0 0 9px!important}
${W} ul.list .icons{display:none!important}
${W} ul.list .text-block{display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important;font-size:14px!important;line-height:1.8!important;color:#475467!important;white-space:normal!important;max-height:none!important}
@media (hover:hover){${W} ul.list .title_link:hover>span:not(.icons){color:#1E5FD9!important}}
@media (max-width:700px){
${W} ul.list li.tit{padding:0!important;min-height:0!important}
${W} ul.list li.tit::before{position:static!important;display:flex!important;width:100%!important;height:150px!important;margin:0 0 14px!important}
}
</style>`;
  if (b.style === 'faq') return `<style>${common}
${W} #post_card_${b.board}{border:0!important;margin:0!important}
${W} .acd_group{border:1px solid #E4E9F0!important;border-radius:14px!important;overflow:hidden!important;background:#FFFFFF!important;margin:0!important}
${W} .acd_row{border:0!important;border-bottom:1px solid #E4E9F0!important;margin:0!important;background:#FFFFFF!important}
${W} .acd_row:last-child{border-bottom:0!important}
${W} .acd_heading{padding:0!important;border:0!important;background:none!important}
${W} .acd_title{margin:0!important;padding:0!important;font-size:15.5px!important;font-weight:700!important;letter-spacing:-.02em!important;line-height:1.6!important;color:#0F1724!important;font-family:${FONT}!important}
${W} .acd_title .holder{position:relative!important;display:block!important;padding:18px 56px 18px 56px!important;cursor:pointer!important;color:#0F1724!important;text-decoration:none!important}
${W} .acd_title .holder::before{content:"Q";position:absolute;left:22px;top:18px;color:#1E5FD9;font-weight:700;font-size:15px}
${W} .acd_title .category{display:block!important;margin:0 0 2px!important;padding:0!important;font-size:11.5px!important;font-weight:700!important}
${W} .acd_title .category span{color:#1547B0!important}
${W} .acd_title .title,${W} .acd_title .title .tabled,${W} .acd_title .title .table-cell{display:block!important;padding:0!important;font-size:15.5px!important;font-weight:700!important;color:#0F1724!important;white-space:normal!important}
${W} .acd_title .icons{display:none!important}
${W} .acd_title .icon_warp{position:absolute!important;right:22px!important;top:50%!important;transform:translateY(-50%)!important}
${W} .acd_title .icon_warp .acd_icon{display:none!important}
${W} .acd_title .icon_warp::after{content:"+";color:#7B8794;font-size:22px;font-weight:300;line-height:1}
${W} .acd_heading:not(.collapsed) + .acd_collapse.in ~ *,${W} .acd_collapse{border:0!important}
${W} .acd_row.open .icon_warp::after,${W} .acd_row:has(.acd_collapse.in) .icon_warp::after{content:"\\2212"}
${W} .acd_body{padding:0 22px 20px 56px!important;border:0!important;background:none!important}
${W} .acd_body .board_contents,${W} .acd_body .board_contents p{font-size:14px!important;line-height:1.9!important;color:#475467!important;margin:0!important;font-family:${FONT}!important}
${W} .acd_body .board_contents b{color:#0F1724!important}
${W} .acd_body .board_summary{margin:0 0 6px!important;padding:0!important;border:0!important}
@media (max-width:600px){${W} .acd_title .holder{padding:16px 44px 16px 44px!important}${W} .acd_title .holder::before{left:16px;top:16px}${W} .acd_body{padding:0 16px 18px 44px!important}}
</style>`;
  return `<style>${common}</style>`;
}

const out = {};
for (const [key, b] of Object.entries(BOARDS)) {
  const f = filterSection(b);
  if (key === 'faq') {
    const posts = JSON.parse(fs.readFileSync(path.join(OUT, '_posts.json'), 'utf8')).faq.posts;
    f.code += `\n${faqPage(posts)}`;
  }
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
