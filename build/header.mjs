// 공통 헤더(시안 GNB) + 플로팅 버튼(코드 위젯 ②) — 설정 › SEO › 공통 코드의 header 칸에 넣는다
//   node build/header.mjs → imweb/00_공통헤더_플로팅.html
// 아임웹 기본 헤더(#doz_header_wrap)는 방문자 화면에서만 숨긴다 (디자인모드 body.admin 에서는 그대로 보여 편집 가능)
import fs from 'node:fs';
import path from 'node:path';
import { ICON } from './icons.mjs';

const OUT = path.resolve(import.meta.dirname, '../imweb/00_공통헤더_플로팅.html');
const LOGO = 'https://cdn.imweb.me/upload/S202603313dd66d1c8f8d7/673d559e36620.png'; // 받은자료 워드마크1.png 와 동일
const TEL = '010-0000-0000';
const TEL_HREF = 'tel:01000000000';
const KAKAO = 'http://pf.kakao.com/_xkxaSEX';
const FONT = "Pretendard,'Apple SD Gothic Neo','Noto Sans KR',system-ui,sans-serif";

const NAV = [
  ['홈', '/', /^\/(33\/?)?$/],
  ['청소 서비스', '/service', /^\/(service|hood-cleaning|duct-cleaning|kitchen-cleaning|maintenance)/],
  ['작업기준', '/standard', /^\/standard/],
  ['시공사례', '/portfolio', /^\/portfolio/],
  ['자주 묻는 질문', '/faq', /^\/faq/],
  ['청소 가이드', '/guide', /^\/guide/],
  ['회사소개', '/about', /^\/about/],
];

const html = `<style>
body:not(.admin) #doz_header_wrap{display:none!important}
body.admin #ovs-gnb,body.admin #ovs-float{display:none!important}
#ovs-gnb{position:sticky;top:0;z-index:1000;background:#FFFFFF;border-bottom:1px solid #E4E9F0;font-family:${FONT}}
#ovs-gnb *{box-sizing:border-box}
#ovs-gnb .ovs-c{max-width:1180px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;gap:26px}
#ovs-gnb .ovs-logo{display:flex;align-items:center;flex:none;text-decoration:none}
#ovs-gnb .ovs-logo img{display:block;height:40px;width:auto;max-width:none}
#ovs-gnb .ovs-nav{display:flex;gap:20px;flex-wrap:nowrap}
#ovs-gnb .ovs-nav a{font-size:13.5px;font-weight:500;color:#475467;text-decoration:none;white-space:nowrap;padding:4px 0;border-bottom:2px solid transparent;line-height:1.7}
#ovs-gnb .ovs-nav a.on{color:#0F1724;font-weight:700;border-bottom-color:#1E5FD9}
#ovs-gnb .ovs-nav a:hover{color:#0F1724}
#ovs-gnb .ovs-right{margin-left:auto;display:flex;align-items:center;gap:14px}
#ovs-gnb .ovs-tel{font-size:13px;font-weight:700;color:#0F1724;white-space:nowrap;text-decoration:none}
#ovs-gnb .ovs-cta{background:#1E5FD9;color:#FFFFFF;font-size:13px;font-weight:700;text-decoration:none;padding:9px 17px;border-radius:8px;white-space:nowrap;line-height:1.5}
#ovs-gnb .ovs-cta:hover{background:#1547B0}
#ovs-gnb .ovs-burger{display:none;width:40px;height:40px;border:1px solid #E4E9F0;border-radius:8px;background:#FFFFFF;color:#0F1724;align-items:center;justify-content:center;cursor:pointer;padding:0}
#ovs-gnb .ovs-drawer{display:none;border-top:1px solid #E4E9F0;background:#FFFFFF}
#ovs-gnb .ovs-drawer a{display:block;padding:14px 24px;font-size:15px;font-weight:600;color:#0F1724;text-decoration:none;border-bottom:1px solid #F4F7FB}
#ovs-gnb .ovs-drawer a.on{color:#1E5FD9}
#ovs-gnb.open .ovs-drawer{display:block}
@media (max-width:1060px){#ovs-gnb .ovs-nav{gap:14px}#ovs-gnb .ovs-c{gap:18px}}
@media (max-width:900px){#ovs-gnb .ovs-nav{display:none}#ovs-gnb .ovs-burger{display:inline-flex}}
@media (max-width:520px){#ovs-gnb .ovs-tel{display:none}#ovs-gnb .ovs-logo img{height:34px}#ovs-gnb .ovs-c{padding:0 16px;gap:10px}}
#ovs-float{position:fixed;right:20px;bottom:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;font-family:${FONT}}
#ovs-float a{display:flex;align-items:center;justify-content:center;gap:6px;font-size:13.5px;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:100px;box-shadow:0 8px 24px rgba(8,17,30,.28);line-height:1.4}
#ovs-float .ok{background:#FAE100;color:#3A1D1D}
#ovs-float .ot{background:#1E5FD9;color:#FFFFFF}
@media (max-width:600px){#ovs-float{right:12px;bottom:14px}#ovs-float a{padding:11px 16px;font-size:12.5px}}
</style>
<div id="ovs-gnb">
  <div class="ovs-c">
    <a class="ovs-logo" href="/" aria-label="오비스크린 홈"><img src="${LOGO}" alt="OVIS CLEAN 오비스크린" width="70" height="40"></a>
    <div class="ovs-nav" role="navigation" aria-label="주 메뉴">
${NAV.map(([t, h]) => `      <a href="${h}">${t}</a>`).join('\n')}
    </div>
    <div class="ovs-right">
      <a class="ovs-tel" href="${TEL_HREF}">${TEL}</a>
      <a class="ovs-cta" href="/contact">무료 견적받기</a>
      <button class="ovs-burger" type="button" aria-label="메뉴 열기" aria-expanded="false">${ICON('arrow').replace('<path d="M5 12h14M13 6l6 6-6 6"/>', '<path d="M4 7h16M4 12h16M4 17h16"/>')}</button>
    </div>
  </div>
  <div class="ovs-drawer">
${NAV.map(([t, h]) => `    <a href="${h}">${t}</a>`).join('\n')}
    <a href="/contact">무료 견적받기</a>
  </div>
</div>
<div id="ovs-float">
  <a class="ok" href="${KAKAO}" target="_blank" rel="noopener">${ICON('chat')} 카톡 상담</a>
  <a class="ot" href="${TEL_HREF}">${ICON('phone')} 전화 문의</a>
</div>
<script>
(function(){
  var RULES=[${NAV.map(([, , re]) => re.toString()).join(',')}];
  function init(){
    var g=document.getElementById('ovs-gnb'); if(!g) return;
    // 헤더를 body 맨 앞으로 (공통 코드 삽입 위치와 무관하게 sticky 가 동작하도록)
    if (document.body.firstElementChild!==g) document.body.insertBefore(g, document.body.firstChild);
    var p=location.pathname;
    var links=g.querySelectorAll('.ovs-nav a, .ovs-drawer a');
    for (var i=0;i<links.length;i++){ var idx=Array.prototype.indexOf.call(g.querySelectorAll(links[i].parentNode.className==='ovs-nav'?'.ovs-nav a':'.ovs-drawer a'), links[i]); if(RULES[idx] && RULES[idx].test(p)) links[i].className='on'; }
    var b=g.querySelector('.ovs-burger'); if(b) b.onclick=function(){ var o=g.classList.toggle('open'); b.setAttribute('aria-expanded', o?'true':'false'); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
</script>`;

fs.writeFileSync(OUT, html + '\n');
console.log('header', html.length);
