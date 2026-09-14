// 견적문의 폼 — 시안 .formbox 자리에 아임웹 입력폼 위젯을 옮겨 넣고 시안 모양으로 꾸민다
// 텍스트 위젯: 시안 formgrid 섹션(왼쪽 .formbox 는 빈 슬롯, 오른쪽 사이드박스)
// 코드 위젯: 아래 CSS + 폼 위젯을 슬롯으로 옮기는 스크립트 (편집 화면에서는 옮기지 않는다)
export const FORM_WIDGET = 'w20260914e3ce4271b42f0';

// 필드 id 는 아임웹 입력폼 설정에서 생성된 값
const F = {
  company: 'input_7b21085624683', manager: 'input_012c5ad336d36', phone: 'phonenumber_ad7e4e87a3b8d',
  address: 'input_q817y454k6', biz: 'radio_37Ix382ey5', work: 'radio_1pB3nuCa3h',
  time: 'input_0Tr5581040', date: 'datetime_58558T1e8k', file: `file_yy686qwpAw_${FORM_WIDGET}`, memo: 'textarea_c0712z7206',
};

const W = `#${FORM_WIDGET}`;
export const formCss = `<style>
#ovis-form-slot ${W},#ovis-form-slot ${W} .form-widget{margin:0!important;padding:0!important;width:100%!important;max-width:100%!important}
@media (min-width:901px){.os-formgrid{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr)!important}}
#ovis-form-slot{min-width:0!important}
${W} form{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;column-gap:14px!important;margin:0!important}
${W} form>*{grid-column:1/-1!important}
${W} #${F.manager},${W} #${F.phone},${W} #${F.time},${W} #${F.date}{grid-column:auto!important}
${W} #privacy{order:99!important;margin:4px 0 22px!important}
${W} .form-group{margin:0 0 20px!important;padding:0!important;text-align:left!important}
${W} .control-label{display:block!important;float:none!important;width:auto!important;padding:0!important;margin:0 0 8px!important;font-size:13.5px!important;font-weight:700!important;letter-spacing:-.01em!important;color:#0F1724!important;text-align:left!important}
${W} .control-label .icon-required{display:none!important}
${W} .form-group:has(.icon-required)>.control-label::after{content:"*";color:#FF6A1F;margin-left:3px}
${W} .form-control{width:100%!important;height:auto!important;min-height:48px!important;border:1px solid #E4E9F0!important;border-radius:9px!important;padding:13px 14px!important;font-size:14px!important;color:#0F1724!important;background:#F4F7FB!important;box-shadow:none!important}
${W} textarea.form-control{min-height:96px!important}
${W} .form-control:focus{border-color:#1E5FD9!important;background:#FFFFFF!important;outline:0!important}
${W} .phonenumber_wrap{display:flex!important;align-items:center!important;gap:6px!important}
${W} .phonenumber_wrap .form-control{flex:1 1 0!important;width:auto!important;min-width:0!important}
${W} .datetime_wrap,${W} .datetime_wrap .form-select-wrap{display:block!important;width:100%!important}
${W} .radio.radio-styled{display:inline-block!important;margin:0 8px 8px 0!important;padding:0!important}
${W} .radio.radio-styled label{position:relative!important;display:inline-block!important;margin:0!important;padding:10px 15px!important;border:1px solid #E4E9F0!important;border-radius:8px!important;background:#FFFFFF!important;font-size:13.5px!important;color:#475467!important;cursor:pointer!important;min-height:0!important}
${W} .radio.radio-styled input{position:absolute!important;opacity:0!important;width:0!important;height:0!important}
${W} .radio.radio-styled span{padding:0!important}
${W} .radio.radio-styled span::before,${W} .radio.radio-styled span::after{display:none!important}
${W} .radio.radio-styled label:has(input:checked){border-color:#1E5FD9!important;background:#EFF5FE!important;color:#1547B0!important;font-weight:700!important}
${W} #${F.file} .holder{display:block!important}
${W} #${F.file} .form_widget_btn{position:relative!important;display:block!important;width:100%!important;border:1.5px dashed #E4E9F0!important;border-radius:12px!important;padding:26px!important;text-align:center!important;background:#F4F7FB!important;color:#0F1724!important;font-size:14px!important;font-weight:700!important;box-shadow:none!important;white-space:normal!important}
${W} #${F.file} .form_widget_btn::after{content:"후드 정면 / 후드 내부 / 덕트 올라가는 구간 — 3장이면 충분합니다";display:block;margin-top:5px;font-size:12.5px;font-weight:400;color:#7B8794}
${W} #${F.file}::after{content:"사진이 있으면 방문 없이도 개략 견적을 먼저 안내드릴 수 있습니다.";display:block;margin-top:6px;font-size:12px;color:#7B8794}
${W} #privacy .form-control{max-height:110px!important;min-height:0!important;overflow:auto!important;font-size:12px!important;line-height:1.7!important;color:#7B8794!important;margin-bottom:10px!important}
${W} #privacy .checkbox label{font-size:12.5px!important;color:#475467!important;line-height:1.7!important}
${W} .form.text-center{margin:0!important;padding:0!important}
${W} ._input_form_submit{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;padding:15px 26px!important;border:0!important;border-radius:10px!important;background:#1E5FD9!important;color:#FFFFFF!important;font-size:15px!important;font-weight:700!important;box-shadow:0 6px 18px rgba(30,95,217,.3)!important}
@media (max-width:560px){${W} form{grid-template-columns:minmax(0,1fr)!important}${W} #${F.manager},${W} #${F.phone},${W} #${F.time},${W} #${F.date}{grid-column:1/-1!important}}
</style>
<script>
(function(){
  var PH={'${F.company}':'예) 오비스크린 강서점','${F.manager}':'성함을 입력해 주세요','${F.address}':'시·군·구까지만 입력하셔도 됩니다','${F.time}':'야간 / 휴무일 / 브레이크타임','${F.memo}':'매장 상태나 궁금하신 점을 자유롭게 적어주세요.'};
  function run(){
    if (document.body.classList.contains('admin')) return;
    var slot=document.getElementById('ovis-form-slot'), form=document.getElementById('${FORM_WIDGET}');
    if (!slot || !form) return;
    if (form.parentNode!==slot) slot.appendChild(form);
    for (var id in PH){ var g=document.getElementById(id); var el=g&&g.querySelector('input.form-control,textarea'); if(el&&!el.getAttribute('placeholder')) el.setAttribute('placeholder',PH[id]); }
    var p=document.querySelectorAll('#${F.phone} input'); if(p.length===3){ p[0].setAttribute('placeholder','010'); p[1].setAttribute('placeholder','0000'); p[2].setAttribute('placeholder','0000'); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',run);
})();
</script>`;
