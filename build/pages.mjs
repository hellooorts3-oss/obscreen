// 오비스크린 서브페이지 6종 생성
//   node build/pages.mjs
// → imweb/<페이지>/NN_섹션.html        (텍스트 위젯에 넣는 인라인 스타일 HTML)
//   imweb/<페이지>/NN_섹션_반응형.html  (같은 섹션의 코드 위젯)
import fs from 'node:fs';
import path from 'node:path';
import {
  section, withUsed, pagehead, cta, head, eyebrow, h2, sub, pill, grid, card, cardTitle, cardText, num,
  list, note, steps, scope, faqSection, beforeAfter, cycles, chips, tag, ph, btnPrimary, btnGhost, btnLine,
  nw, b, blue, br,
} from './kit.mjs';

const OUT = path.resolve(import.meta.dirname, '../imweb');
const TEL = 'tel:01000000000';
const JH = nw('전·후');

const svcBtns = label => [btnPrimary('/contact', label), btnGhost(TEL, '전화 상담')];
const crumbs = last => ['홈', '청소 서비스', last];

/* ============================================================ 후드청소 */
const hood = {
  dir: '후드청소',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: crumbs('후드청소'),
      title: `기름때가 가장 먼저 쌓이는 곳,${br}<span style="color:#3B82F6;white-space:nowrap;">후드를 분해해서</span> 청소합니다`,
      desc: `필터만 빼서 닦고 끝내지 않습니다. 후드 내부 판재와 이음부, 기름받이, 배유관, 덕트 초입부까지 분해 세정하고 결과를 ${JH} 사진과 점검소견 리포트로 남깁니다.`,
      chips: ['#후드 필터 침적 세정', '#내부 판재·배유관', '#스테인리스 마감', '#야간·휴무일 작업'],
      buttons: svcBtns('후드청소 견적 문의'),
    }))],
    ['점검신호', section({ key: 'ovis-hd-sign', bg: '#FFFFFF' }, () => `${head({
      eb: '점검이 필요한 신호',
      title: `이런 증상이 보이면${br}${blue('후드 점검 시기')}입니다`,
      desc: '후드에 쌓인 유분은 흡입력을 떨어뜨리고, 화구 열기에 노출되면 불이 옮겨붙는 통로가 됩니다. 아래 중 하나라도 해당되면 점검을 권합니다.',
    })}
${grid(4, [
      ['01', '연기가 주방에 머뭅니다', '조리 중 연기·열기가 빠지지 않고 주방 안에 고입니다. 필터 막힘이나 내부 유분 누적이 원인인 경우가 많습니다.'],
      ['02', '필터 사이로 기름이 떨어집니다', '필터가 유분을 더 머금지 못해 화구 위나 음식 쪽으로 기름방울이 떨어지기 시작한 상태입니다.'],
      ['03', '표면이 끈적이고 변색됐습니다', '후드 외판이 끈적이거나 누렇게 변했다면 내부 판재와 이음부에는 훨씬 두껍게 쌓여 있습니다.'],
      ['04', '점검에서 지적을 받았습니다', '소방·위생 점검에서 배기설비 청결 상태를 지적받았다면 기록이 남는 청소로 대응하는 것이 좋습니다.'],
    ].map(([n, t, d]) => card(num(n, '#FF6A1F') + cardTitle(t) + cardText(d), '26px 22px')))}
${note('필터만 교체하면 되지 않나요?', '필터는 유분을 1차로 거르는 부품일 뿐, 필터를 통과한 유증기는 후드 내부 판재와 덕트 초입에 계속 쌓입니다. 필터 교체와 내부 세정은 별개의 작업입니다.', 26)}`)],
    ['작업범위', section({ key: 'ovis-hd-scope', bg: '#F4F7FB' }, () => `${head({
      eb: '작업 범위',
      title: `어디까지 청소하고,${br}${blue('무엇을 하지 않는지')} 먼저 정합니다`,
      desc: '견적 단계에서 작업 범위를 문서로 확정합니다. 범위에 없는 작업은 현장에서 임의로 추가하지 않고, 필요하면 먼저 안내드립니다.',
    })}
${scope([
      { t: '후드 필터 분리 · 침적 세정', s: '재질에 맞는 세정제에 담가 유분을 녹여낸 뒤 헹굼' },
      { t: '후드 내부 판재 · 이음부', s: '유분이 고이기 쉬운 모서리와 용접부까지' },
      { t: '기름받이 · 배유관', s: '막힘 확인 후 내부 세척' },
      { t: '덕트 초입부 접근 가능 구간', s: '후드와 덕트가 만나는 연결부' },
      { t: '외판 스테인리스 약산성 마감 · 광택' },
      { t: '작업 구역 양생 및 원상 복구' },
    ], [
      { t: '덕트 전 구간 내부 청소', s: '<a class="ovis-golink" href="/duct-cleaning" style="color:#1E5FD9;font-weight:700;text-decoration:none;">덕트청소</a>로 별도 진행' },
      { t: '배기팬 · 모터 분해 세정', s: '덕트청소와 함께 진행 시 일괄 견적' },
      { t: '점검구 신규 시공' },
      { t: '변형 · 부식된 판재의 교체 및 수리', s: '작업 전에 서면으로 사전 안내' },
      { t: '전기 · 모터 고장 수리' },
    ])}`)],
    ['작업공정', section({ key: 'ovis-hd-flow', bg: '#FFFFFF' }, () => `${head({
      eb: '작업 공정',
      title: `표준작업매뉴얼(${nw('OBS-SOP-001')}) 순서대로${br}${blue('6단계')}로 진행합니다`,
    })}
${steps([
      { t: '사전 점검 · 범위 확정', d: '후드 길이와 재질, 필터 수량, 오염도를 확인해 작업 범위·소요 시간·견적을 확정합니다.' },
      { t: '양생', d: '화구와 조리대, 바닥, 주변 집기를 비닐과 보양재로 덮어 세정수와 유분이 튀지 않게 막습니다.' },
      { t: '필터 분리 · 침적 세정', d: '필터를 모두 분리해 재질에 맞는 알칼리 계열 세정제에 담가 굳은 유분을 녹여냅니다.' },
      { t: '내부 세정 · 헹굼 · 중화', d: '후드 내부 판재와 이음부, 기름받이, 배유관을 세정하고 약품이 남지 않도록 헹굼과 중화까지 마칩니다.' },
      { t: '마감 · 조립', d: '외판을 약산성으로 마감해 광택을 살리고, 필터와 부품을 원래 위치에 조립합니다.' },
      { t: '시운전 · 리포트', d: `배기 상태를 시운전으로 확인하고 ${JH} 사진, 점검소견, 다음 권장 시점을 리포트로 전달합니다.` },
    ])}`)],
    ['전후기록', section({ key: 'ovis-hd-ba', bg: '#F4F7FB' }, () => `${head({
      eb: '작업 기록',
      title: `모든 현장을 ${blue(`${'전·후'} 사진`)}으로 남깁니다`,
      desc: '같은 위치, 같은 각도로 촬영해 달라진 부분을 바로 비교할 수 있게 전달합니다.',
    })}
${beforeAfter([
      { b: '필터 세정 전', a: '필터 세정 후', t: '후드 필터 침적 세정', s: '고깃집 무연 로스터 라인' },
      { b: '내부 판재 세정 전', a: '내부 판재 세정 후', t: '후드 내부 판재 · 이음부', s: '중식당 웍 화구 라인' },
      { b: '외판 마감 전', a: '외판 마감 후', t: '스테인리스 약산성 마감', s: '단체급식 조리실' },
    ])}
    <div style="margin:44px 0 18px;">${eyebrow('권장 주기')}<div class="ovis-h3" style="margin:0;font-size:clamp(20px,2.6vw,25px);font-weight:900;line-height:1.4;letter-spacing:-.03em;color:#0F1724;">조리 방식에 따라 쌓이는 속도가 다릅니다</div></div>
${cycles([
      { k: '고깃집 · 중식 · 튀김 위주', v: '월 1회 ~ 분기 1회', d: '고온 조리와 유분이 많은 메뉴는 필터가 빨리 포화됩니다.' },
      { k: '한식 · 일반 음식점', v: '분기 1회', d: '영업 시간과 화구 수에 따라 현장에서 다시 산정합니다.' },
      { k: '카페 · 베이커리 · 급식 보조', v: '반기 1회', d: '유분이 적어도 내부 이음부 누적은 정기적으로 확인합니다.' },
    ])}`)],
    ['FAQ', faqSection('ovis-hd-faq', [
      { q: '작업 시간은 얼마나 걸리나요?', a: '후드 길이와 필터 수량, 오염도에 따라 달라집니다. 사전 점검(또는 현장 사진) 단계에서 예상 소요 시간을 함께 안내드립니다.' },
      { q: '영업 중에도 작업할 수 있나요?', a: '조리 중에는 작업하지 않습니다. 영업에 지장이 없도록 마감 이후 야간, 새벽, 휴무일로 일정을 조율합니다.' },
      { q: '약품이 음식이나 조리기구에 남지 않나요?', a: `세정 후 헹굼과 중화 공정을 거치고, 설비·재질별로 사용하지 않는 약품 기준을 따릅니다. 작업 구역은 양생 후 진행하고 원상 복구합니다.` },
      { q: '후드가 오래돼 판재가 휘거나 녹슬었어요.', a: '청소로 복구되지 않는 손상은 작업 전에 서면으로 먼저 안내드립니다. 교체·수리가 필요한 부분을 임의로 진행하지 않습니다.' },
      { q: '견적은 어떻게 받나요?', a: '후드 전체, 필터, 후드 내부가 보이는 사진 3~5장을 보내주시면 작업 범위와 비용을 먼저 안내드립니다. 필요하면 현장 점검 후 확정합니다.' },
    ])],
    ['하단CTA', withUsed(() => cta({
      title: `후드 상태,${br}<span style="color:#3B82F6;white-space:nowrap;">사진으로 먼저</span> 확인해 드립니다`,
      desc: `후드 전체와 필터가 보이는 사진 3~5장이면 충분합니다. ${b('<span style="color:#FFFFFF;">작업 범위와 예상 비용</span>')}을 먼저 안내드리고, 계약은 그다음입니다.`,
      primary: '후드청소 견적 문의하기 →',
    }))],
  ],
};

/* ============================================================ 덕트청소 */
const duct = {
  dir: '덕트청소',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: crumbs('덕트청소'),
      title: `보이지 않는 배기덕트 안쪽,${br}<span style="color:#3B82F6;white-space:nowrap;">점검구로 들어가</span> 청소합니다`,
      desc: `후드를 지나간 유증기는 덕트 내부에 쌓입니다. 점검구를 통해 내부에 접근해 기름때를 제거하고, 작업 ${JH} 덕트 내부를 직접 촬영해 리포트로 전달합니다.`,
      chips: ['#덕트 내부 유증기 제거', '#점검구 시공', '#배기팬·모터 세정', '#내부 촬영 리포트'],
      buttons: svcBtns('덕트청소 견적 문의'),
    }))],
    ['위험요소', section({ key: 'ovis-dc-risk', bg: '#FFFFFF' }, () => `${head({
      eb: '왜 덕트인가',
      title: `화재와 배기 효율이${br}${blue('실제로 결정되는 구간')}입니다`,
      desc: '후드는 눈에 보여 관리가 되지만, 덕트는 천장 안쪽이라 몇 년씩 방치되기 쉽습니다. 문제는 대부분 여기서 시작됩니다.',
    })}
${grid(3, [
      ['RISK 01', '불길이 번지는 통로', '덕트 내부에 쌓인 유분은 화구의 불꽃이 빨려 올라갔을 때 불이 옮겨붙어 건물 안쪽으로 번지는 경로가 됩니다.'],
      ['RISK 02', '배기 효율 저하 · 역류', '내부 단면이 좁아지면 배기팬이 제 성능을 내지 못하고, 연기와 냄새가 주방이나 객석 쪽으로 되돌아옵니다.'],
      ['RISK 03', '악취 · 오염물 낙하', '오래된 유분이 산패하며 냄새를 내고, 굳은 덩어리가 이음부에서 떨어지거나 기름이 새어 나오기도 합니다.'],
    ].map(([n, t, d]) => card(num(n, '#FF6A1F') + cardTitle(t) + cardText(d), '28px 24px')))}`)],
    ['점검구', section({ key: 'ovis-dc-hatch', bg: '#F4F7FB' }, () => {
      const col = (label, lc, title, desc, items) => card(
        `<span style="display:inline-block;margin-bottom:14px;padding:4px 11px;border-radius:6px;background:${lc};color:#FFFFFF;font-size:11.5px;font-weight:700;letter-spacing:.06em;line-height:1.7;">${label}</span>`
        + cardTitle(title, 10, 19) + cardText(desc, 18) + list(items, 'check', { size: 14 }), '30px 28px');
      return `${head({
        eb: '점검구 안내',
        title: `점검구가 없어도${br}${blue('덕트청소는 가능합니다')}`,
        desc: '덕트 내부에 사람이나 장비가 접근하려면 점검구가 필요합니다. 현장 확인 후 아래 두 가지 중 하나로 진행합니다.',
      })}
${grid(2, [
        col('CASE A', '#1E5FD9', '점검구가 이미 있는 경우', '기존 점검구를 열어 내부 상태를 확인하고, 접근 가능한 구간부터 순서대로 세정합니다.', [
          '점검구 위치 · 간격 확인',
          '구간별 오염도 촬영 후 작업',
          '작업 후 점검구 밀폐 상태 확인',
        ]),
        col('CASE B', '#0D1A2B', '점검구가 없거나 부족한 경우', '덕트 구조와 길이를 확인해 필요한 위치에 점검구를 시공한 뒤 작업합니다. 시공 위치와 수량은 견적 단계에서 먼저 안내드립니다.', [
          '구조 확인 후 시공 위치 협의',
          '점검구 시공 후 내부 세정',
          '다음 청소 때도 같은 점검구 사용',
        ]),
      ])}
${note('덕트 구조와 길이에 따라 작업 방식이 달라집니다', '수직·수평 구간, 꺾임 수, 옥상 토출구까지의 거리에 따라 접근 방법과 소요 시간이 달라집니다. 정확한 견적은 현장 점검 후 확정합니다.', 22)}`;
    })],
    ['작업범위', section({ key: 'ovis-dc-scope', bg: '#FFFFFF' }, () => `${head({
      eb: '작업 범위',
      title: `견적서에 적힌 범위대로${br}${blue('구간을 나눠')} 작업합니다`,
    })}
${scope([
      { t: '덕트 내부 유증기 · 기름때 제거', s: '점검구로 접근 가능한 구간' },
      { t: '후드–덕트 연결부 세정' },
      { t: '배기팬 날개 · 케이싱 분해 세정', s: '접근 가능한 경우 포함' },
      { t: '옥상 토출구 상태 확인' },
      { t: `작업 ${'전·후'} 덕트 내부 촬영` },
      { t: '작업 구역 양생 및 원상 복구' },
    ], [
      { t: '점검구가 닿지 않는 밀폐 구간', s: '점검구 추가 시공 여부를 먼저 협의' },
      { t: '점검구 신규 시공', s: '수량·위치에 따라 별도 견적' },
      { t: '덕트 교체 · 보수 · 누수 수리' },
      { t: '배기팬 모터 교체 및 전기 수리' },
      { t: '후드 내부 세정', s: '<a class="ovis-golink" href="/hood-cleaning" style="color:#1E5FD9;font-weight:700;text-decoration:none;">후드청소</a>와 함께 진행 시 일괄 견적' },
    ])}`)],
    ['작업공정', section({ key: 'ovis-dc-flow', bg: '#F4F7FB' }, () => `${head({
      eb: '작업 공정',
      title: `내부를 ${blue('찍고, 닦고, 다시 찍습니다')}`,
    })}
${steps([
      { t: '구조 확인 · 범위 확정', d: '덕트 경로와 길이, 점검구 유무, 배기팬 위치와 접근성을 확인해 작업 범위와 견적을 확정합니다.' },
      { t: '양생 · 작업 전 촬영', d: '하부 조리설비와 바닥을 양생하고, 점검구를 열어 구간별 내부 오염 상태를 먼저 촬영합니다.' },
      { t: '점검구 시공(필요 시)', d: '사전에 협의한 위치에 점검구를 시공합니다. 필요 없는 현장은 이 단계를 건너뜁니다.' },
      { t: '구간별 내부 세정', d: '굳은 유분을 긁어내고 세정제로 녹여낸 뒤 닦아냅니다. 오염물이 하부로 흐르지 않도록 구간을 나눠 진행합니다.' },
      { t: '배기팬 세정 · 시운전', d: '배기팬 날개와 케이싱을 세정하고, 조립 후 시운전으로 배기 상태를 확인합니다.' },
      { t: '작업 후 촬영 · 리포트', d: `같은 위치에서 다시 촬영해 ${JH} 사진과 점검소견, 다음 권장 시점을 리포트로 전달합니다.` },
    ])}`)],
    ['전후기록', section({ key: 'ovis-dc-ba', bg: '#FFFFFF' }, () => `${head({
      eb: '작업 기록',
      title: `천장 안쪽이라 ${blue('사진으로 증명')}합니다`,
      desc: '직접 볼 수 없는 구간이기 때문에 같은 점검구, 같은 각도에서 작업 전과 후를 촬영해 드립니다.',
    })}
${beforeAfter([
      { b: '덕트 내부 작업 전', a: '덕트 내부 작업 후', t: '수평 덕트 내부 유분 제거', s: '단체급식 배기덕트' },
      { b: '점검구 시공 전', a: '점검구 시공 후', t: '점검구 시공 · 내부 세정', s: '프랜차이즈 매장' },
      { b: '배기팬 세정 전', a: '배기팬 세정 후', t: '배기팬 날개 · 케이싱', s: '호텔 연회 주방' },
    ])}
    <div style="margin:44px 0 18px;">${eyebrow('권장 주기')}<div class="ovis-h3" style="margin:0;font-size:clamp(20px,2.6vw,25px);font-weight:900;line-height:1.4;letter-spacing:-.03em;color:#0F1724;">후드보다 길게, 하지만 반드시 정기적으로</div></div>
${cycles([
      { k: '고깃집 · 중식 · 튀김 위주', v: '반기 1회', d: '유분 발생량이 많아 덕트 내부 누적 속도가 빠릅니다.' },
      { k: '한식 · 일반 음식점', v: '연 1회', d: '영업 시간과 조리량에 따라 현장에서 다시 산정합니다.' },
      { k: '단체급식 · 호텔 주방', v: '반기 1회 ~ 연 1회', d: '덕트가 길고 구조가 복잡해 구간별로 나눠 계획합니다.' },
    ])}`)],
    ['FAQ', faqSection('ovis-dc-faq', [
      { q: '덕트에 점검구가 없으면 어떻게 하나요?', a: '구조를 확인한 뒤 필요한 위치에 점검구를 시공하고 작업합니다. 시공 위치와 수량, 비용은 작업 전에 먼저 안내드리고 동의를 받은 뒤 진행합니다.' },
      { q: '천장을 뜯어야 하나요?', a: '대부분 기존 점검구나 새로 시공하는 점검구로 접근하므로 천장 전체를 철거하지 않습니다. 천장재 일부를 열어야 하는 경우 사전에 협의합니다.' },
      { q: '후드청소와 같이 해야 하나요?', a: '따로 진행할 수 있지만, 같은 날 함께 진행하면 양생과 시운전을 한 번에 처리할 수 있어 효율적입니다. 일괄 견적으로 안내드립니다.' },
      { q: '작업 중 오염물이 주방에 떨어지지 않나요?', a: '하부 조리설비와 바닥을 먼저 양생하고, 구간을 나눠 오염물을 받아내며 작업합니다. 작업 후 양생재를 걷고 원상 복구합니다.' },
      { q: '소방·위생 점검 제출용 자료가 필요해요.', a: `작업 ${'전·후'} 내부 사진과 점검소견이 담긴 리포트를 드립니다. 위생관리용역업 등록업체로 세금계산서 발행도 가능합니다.` },
    ], '#F4F7FB')],
    ['하단CTA', withUsed(() => cta({
      title: `마지막으로 덕트를 청소한 게${br}<span style="color:#3B82F6;white-space:nowrap;">언제인지 모르신다면</span>`,
      desc: `지금이 점검할 때입니다. 후드 주변과 천장 점검구 사진을 보내주시면 ${b('<span style="color:#FFFFFF;">점검구 시공 필요 여부와 작업 범위</span>')}부터 안내드립니다.`,
      primary: '덕트청소 견적 문의하기 →',
      list: ['후드는 깨끗한데 연기·냄새가 잘 빠지지 않는 경우', '인수한 매장이라 덕트 청소 이력을 모르는 경우', '점검에서 배기덕트 청결 상태를 지적받은 경우'],
    }))],
  ],
};

/* ============================================================ 주방 전체청소 */
const kitchen = {
  dir: '주방전체청소',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: crumbs('주방 전체청소'),
      title: `조리설비부터 바닥 배수까지,${br}<span style="color:#3B82F6;white-space:nowrap;">구역을 나눠</span> 한 번에 청소합니다`,
      desc: `개업 전 오픈청소, 인수인계 청소, 위생점검 대비, 정기 대청소까지. 주방을 조리·세척·보관·바닥 구역으로 나눠 순서대로 처리하고 구역별 ${JH} 사진을 남깁니다.`,
      chips: ['#오픈청소', '#인수인계 청소', '#화구·튀김기', '#바닥·트렌치·그리스트랩'],
      buttons: svcBtns('주방청소 견적 문의'),
    }))],
    ['신청유형', section({ key: 'ovis-kc-type', bg: '#FFFFFF' }, () => {
      const t = (en, title, desc, items) => card(
        `<div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1.7;color:#1E5FD9;">${en}</div>`
        + cardTitle(title, 8, 18) + cardText(desc, 16)
        + `<div style="padding-top:14px;border-top:1px solid #E4E9F0;">${list(items, 'dot', { size: 13.5, color: '#475467', weight: 400, gap: 6 })}</div>`, '26px 22px');
      return `${head({
        eb: '이럴 때 신청하세요',
        title: `상황에 따라${br}${blue('중점 구역')}이 달라집니다`,
        desc: '같은 주방 청소라도 목적에 따라 우선순위가 다릅니다. 상담 시 상황을 알려주시면 그에 맞춰 범위를 잡습니다.',
      })}
${grid(4, [
        t('OPEN', '개업 전 오픈청소', '인테리어 공사 후 남은 분진과 자재 잔여물을 걷어내고 첫 조리가 가능한 상태로 만듭니다.', ['공사 분진 · 실리콘 잔여물', '신규 설비 표면 보호필름', '배수구 공사 잔해']),
        t('HANDOVER', '인수인계 · 폐업 청소', '이전 운영자가 남긴 오염을 정리해 새로 인수하는 분이 바로 영업을 시작할 수 있게 합니다.', ['설비 내부 누적 유분', '방치된 트렌치 · 그리스트랩', '벽면 · 선반 찌든 때']),
        t('INSPECTION', '위생점검 대비', '점검에서 자주 지적되는 구역을 중심으로 정리하고, 청소 기록을 사진으로 남깁니다.', ['조리대 하부 · 틈새', '배수 라인 악취 원인', '보관 선반 · 냉장고 주변']),
        t('DEEP CLEAN', '정기 대청소', '일상 청소로 닿지 않는 설비 뒤편과 하부를 분기·반기 단위로 한 번에 처리합니다.', ['설비 이동 후 뒤편 · 하부', '화구 · 튀김기 탄화물', '바닥 코팅 전 세정']),
      ])}`;
    })],
    ['구역별범위', section({ key: 'ovis-kc-zone', bg: '#F4F7FB' }, () => {
      const z = (n, title, ph_, items) => `<div class="ovis-work" style="overflow:hidden;border:1px solid #E4E9F0;border-radius:16px;background:#FFFFFF;box-shadow:0 1px 2px rgba(16,24,40,.05);">
        ${ph(ph_, 150)}
        <div style="padding:22px 22px 24px;">
          <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:12px;"><span style="font-size:12px;font-weight:700;letter-spacing:.1em;color:#1E5FD9;">ZONE ${n}</span>${cardTitle(title, 0, 17)}</div>
          ${list(items, 'check', { size: 13.5, color: '#475467', weight: 400, gap: 7 })}
        </div>
      </div>`;
      return `${head({
        eb: '구역별 작업 범위',
        title: `주방을 6개 구역으로 나눠${br}${blue('빠짐없이')} 처리합니다`,
        desc: '구역별로 사용하는 약품과 도구가 다릅니다. 재질을 확인하고 사용하면 안 되는 약품은 쓰지 않습니다.',
      })}
${grid(3, [
        z('01', '조리 라인', '화구 · 튀김기 · 그리들', ['화구 · 버너캡 탄화물 제거', '튀김기 내부 · 외부', '그리들 · 오븐 외관', '조리대 상판 · 하부']),
        z('02', '세척 라인', '식기세척기 · 싱크대', ['식기세척기 외부 · 필터부', '싱크대 · 수전 물때', '세척대 하부 배관 주변']),
        z('03', '보관 · 선반', '선반 · 냉장고 주변', ['스테인리스 선반 · 랙', '냉장 · 냉동고 외관 · 도어 패킹', '설비 뒤편 · 틈새']),
        z('04', '벽면 · 천장', '벽면 타일 · 천장 루버', ['조리 라인 벽면 유분', '타일 줄눈 찌든 때', '천장 루버 · 조명 커버']),
        z('05', '바닥 · 트렌치', '바닥 · 그레이팅', ['그레이팅 분리 세정', '트렌치 내부 슬러지 제거', '바닥 타일 · 모서리']),
        z('06', '그리스트랩', '그리스트랩 내부', ['유지분 · 찌꺼기 제거', '악취 원인 확인', '배수 흐름 확인']),
      ])}
${note('후드와 덕트는 별도 서비스입니다', '주방 전체청소에는 후드 외판 세정까지만 포함됩니다. 후드 내부와 덕트는 <a class="ovis-golink" href="/hood-cleaning" style="color:#1E5FD9;font-weight:700;text-decoration:none;">후드청소</a> · <a class="ovis-golink" href="/duct-cleaning" style="color:#1E5FD9;font-weight:700;text-decoration:none;">덕트청소</a>와 함께 신청하시면 같은 날 일괄 진행할 수 있습니다.', 24)}`;
    })],
    ['작업공정', section({ key: 'ovis-kc-flow', bg: '#FFFFFF' }, () => `${head({
      eb: '작업 공정',
      title: `위에서 아래로,${br}${blue('안쪽에서 바깥으로')} 청소합니다`,
      desc: '위쪽 오염물이 이미 닦은 바닥으로 떨어지지 않도록 순서를 지킵니다.',
    })}
${steps([
      { t: '현장 확인 · 범위 확정', d: '주방 면적과 설비 수, 구역별 오염도를 확인해 우선순위와 소요 시간, 견적을 확정합니다.' },
      { t: '전원 차단 · 양생', d: '설비 전원과 가스를 확인하고, 식자재와 전기 설비, 물이 닿으면 안 되는 곳을 먼저 보호합니다.' },
      { t: '벽면 · 천장 · 상부', d: '천장 루버와 벽면 상단부터 세정해 위쪽 오염물이 아래로 떨어지게 합니다.' },
      { t: '조리 · 세척 · 보관 설비', d: '구역별로 재질에 맞는 세정제를 적용하고, 설비 뒤편과 하부까지 처리합니다.' },
      { t: '바닥 · 트렌치 · 그리스트랩', d: '마지막으로 바닥과 배수 라인을 세정해 위에서 내려온 오염물까지 한 번에 걷어냅니다.' },
      { t: '건조 · 복구 · 리포트', d: `물기를 제거하고 설비를 원위치한 뒤, 구역별 ${JH} 사진을 리포트로 전달합니다.` },
    ])}`)],
    ['전후기록', section({ key: 'ovis-kc-ba', bg: '#F4F7FB' }, () => `${head({
      eb: '작업 기록',
      title: `구역마다 ${blue(`${'전·후'} 사진`)}을 남깁니다`,
    })}
${beforeAfter([
      { b: '화구 세정 전', a: '화구 세정 후', t: '화구 · 튀김기 탄화물 제거', s: '프랜차이즈 치킨 매장' },
      { b: '트렌치 세정 전', a: '트렌치 세정 후', t: '바닥 트렌치 · 그레이팅', s: '단체급식 조리실' },
      { b: '공사 직후', a: '오픈청소 후', t: '개업 전 오픈청소', s: '신규 한식 매장' },
    ])}`)],
    ['FAQ', faqSection('ovis-kc-faq', [
      { q: '영업을 쉬어야 하나요?', a: '면적과 범위에 따라 다르지만 대부분 영업 마감 후 야간이나 휴무일에 진행해 다음 영업에 지장이 없도록 맞춥니다. 오픈청소는 입점 일정에 맞춰 조율합니다.' },
      { q: '식자재나 식기는 어떻게 하나요?', a: '작업 전에 식자재와 식기는 치워두시거나 한곳에 모아주시면 양생 후 진행합니다. 냉장·냉동고 내부는 기본 범위에 포함되지 않습니다.' },
      { q: '설비를 옮겨서 뒤쪽도 청소하나요?', a: '바퀴가 있거나 안전하게 이동 가능한 설비는 옮겨서 뒤편과 하부까지 청소합니다. 고정 설비나 배관이 연결된 설비는 무리하게 이동하지 않습니다.' },
      { q: '일부 구역만 신청할 수도 있나요?', a: '가능합니다. 예를 들어 바닥·트렌치·그리스트랩만, 또는 조리 라인만 신청하실 수 있습니다. 필요한 구역을 알려주시면 그 범위로 견적을 드립니다.' },
      { q: '견적은 어떻게 받나요?', a: '주방 전체가 보이는 사진과 오염이 심한 곳 사진 3~5장, 대략적인 면적(평수)을 알려주시면 작업 범위와 비용을 먼저 안내드립니다.' },
    ])],
    ['하단CTA', withUsed(() => cta({
      title: `오픈 일정이나 점검 날짜가${br}<span style="color:#3B82F6;white-space:nowrap;">정해져 있으신가요?</span>`,
      desc: `날짜를 알려주시면 역산해서 일정을 잡아드립니다. ${b('<span style="color:#FFFFFF;">주방 사진 3~5장과 대략적인 평수</span>')}만 있으면 견적 안내가 가능합니다.`,
      primary: '주방청소 견적 문의하기 →',
    }))],
  ],
};

/* ============================================================ 정기 위생관리 */
const maint = {
  dir: '정기위생관리',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: crumbs('정기 위생관리'),
      title: `한 번 청소하고 끝내지 않고,${br}<span style="color:#3B82F6;white-space:nowrap;">다음 시점까지</span> 함께 관리합니다`,
      desc: '매장의 조리 특성과 오염 속도에 맞춰 방문 주기를 정하고, 방문할 때마다 점검소견과 사진 리포트를 남깁니다. 언제 무엇을 청소했는지 기록으로 남는 관리입니다.',
      chips: ['#월간·분기·반기 방문', '#방문 리포트', '#프랜차이즈 다점포', '#세금계산서 발행'],
      buttons: svcBtns('정기관리 상담 신청'),
    }))],
    ['관리프로그램', section({ key: 'ovis-mt-plan', bg: '#FFFFFF' }, () => {
      const plan = (on, en, title, cycle, target, items) => `<div class="ovis-plan" style="display:flex;flex-direction:column;padding:30px 26px;border:${on ? '2px solid #1E5FD9' : '1px solid #E4E9F0'};border-radius:18px;background:#FFFFFF;box-shadow:${on ? '0 14px 34px rgba(30,95,217,.14)' : '0 1px 2px rgba(16,24,40,.05)'};">
        <div style="margin-bottom:10px;font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1.7;color:${on ? '#1E5FD9' : '#7B8794'};">${en}</div>
        ${cardTitle(title, 4, 21)}
        <div style="margin-bottom:6px;font-size:clamp(24px,2.8vw,30px);font-weight:900;line-height:1.3;letter-spacing:-.03em;color:#1547B0;">${cycle}</div>
        <p style="margin:0 0 20px;padding-bottom:20px;border-bottom:1px solid #E4E9F0;font-size:13.5px;font-weight:400;line-height:1.75;color:#7B8794;">${target}</p>
        ${list(items, 'check', { size: 14, weight: 400, color: '#0F1724', gap: 9 })}
        <div style="margin-top:24px;">${on ? btnPrimary('/contact', '이 주기로 상담받기 →').replace('display:inline-flex', 'display:flex') : btnLine('/contact', '이 주기로 상담받기 →').replace('display:inline-flex', 'display:flex')}</div>
      </div>`;
      return `${head({
        eb: '관리 프로그램',
        title: `매장에 맞는 ${blue('방문 주기')}를 고르세요`,
        desc: '비용은 매장 규모와 설비 구성, 포함 범위에 따라 현장 점검 후 산정합니다. 주기는 계약 중에도 오염 속도를 보고 조정할 수 있습니다.',
      })}
${grid(3, [
        plan(false, 'MONTHLY', '월간 관리', '월 1회 방문', '고깃집 · 중식 · 튀김 위주처럼 유분 발생이 많은 매장', ['후드 필터 분리 세정', '후드 외판 · 기름받이 점검', '트렌치 · 그리스트랩 관리', '분기마다 후드 내부 세정', '방문 리포트']),
        plan(true, 'QUARTERLY', '분기 관리', '3개월 1회 방문', '한식 · 일반 음식점 · 프랜차이즈 표준 매장', ['후드 필터 · 내부 세정', '덕트 초입 · 배기 상태 점검', '화구 · 조리 라인 집중 세정', '바닥 · 트렌치 · 그리스트랩', '방문 리포트 · 다음 시점 안내']),
        plan(false, 'HALF-YEAR', '반기 관리', '6개월 1회 방문', '카페 · 베이커리 · 급식 보조 주방처럼 유분이 적은 매장', ['후드 필터 · 내부 세정', '덕트 내부 상태 점검', '주방 설비 외관 세정', '배수 라인 점검', '방문 리포트']),
      ])}`;
    })],
    ['방문리포트', section({ key: 'ovis-mt-report', bg: '#F4F7FB' }, () => {
      const row = (k, v, last) => `<div class="ovis-rep-row" style="display:grid;grid-template-columns:96px 1fr;gap:12px;padding:11px 0;${last ? '' : 'border-bottom:1px dashed #E4E9F0;'}font-size:13.5px;line-height:1.7;"><span style="font-weight:700;color:#7B8794;">${k}</span><span style="font-weight:500;color:#0F1724;">${v}</span></div>`;
      const bar = (lv) => `<span style="display:inline-flex;align-items:center;gap:8px;"><span style="display:inline-flex;gap:3px;">${[1, 2, 3, 4, 5].map(i => `<span style="display:inline-block;width:16px;height:7px;border-radius:2px;background:${i <= lv ? '#FF6A1F' : '#E4E9F0'};"></span>`).join('')}</span><span>${lv}단계 / 5</span></span>`;
      return `    <div class="ovis-split2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
      <div>
        ${eyebrow('방문 1회에 하는 일')}
        ${h2(`청소만 하고 가지 않고${br}${blue('상태를 기록')}합니다`)}
        ${sub('정기관리의 핵심은 매번의 기록입니다. 오염이 얼마나 빨리 쌓이는지 알아야 주기와 범위를 정확히 조정할 수 있습니다.', 26)}
        ${list([
        { t: '방문 전 오염 상태 촬영', s: '지난 방문과 같은 위치 · 같은 각도' },
        { t: '계약 범위 청소 진행', s: '표준작업매뉴얼(OBS-SOP-001) 기준' },
        { t: '설비 이상 여부 확인', s: '배기 소음 · 흡입력 · 누유 · 부식' },
        { t: '작업 후 촬영 · 점검소견 작성', s: '오염도 단계와 특이사항 기록' },
        { t: '다음 방문 권장 시점 안내', s: '오염 속도에 따라 주기 조정 제안' },
      ], 'check')}
      </div>
      <div class="ovis-rep" style="overflow:hidden;border:1px solid #E4E9F0;border-radius:18px;background:#FFFFFF;box-shadow:0 18px 40px rgba(8,17,30,.10);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:18px 24px;background:#0D1A2B;color:#FFFFFF;">
          <span style="font-size:15px;font-weight:700;line-height:1.5;color:#FFFFFF;">점검소견 리포트</span>
          <span style="font-size:11px;font-weight:500;letter-spacing:.08em;line-height:1.5;color:rgba(255,255,255,.6);">SAMPLE</span>
        </div>
        <div style="padding:10px 24px 6px;">
          ${row('방문 회차', '분기 관리 · 4회차')}
          ${row('작업 구역', '후드 필터 · 후드 내부 · 트렌치')}
          ${row('오염도', bar(3))}
          ${row('점검소견', '2번 화구 상부 필터 유분 누적이 빠름. 이음부 누유 흔적 없음.')}
          ${row('다음 권장', '10주 후 방문 권장 (기존 12주에서 단축 제안)', true)}
        </div>
        <div class="ovis-ba" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:10px;">
          ${ph('작업 전 사진', 130)}
          ${ph('작업 후 사진', 130)}
        </div>
      </div>
    </div>`;
    }, )],
    ['다점포관리', section({ key: 'ovis-mt-multi', bg: '#FFFFFF' }, () => `${head({
      eb: '프랜차이즈 · 다점포',
      title: `매장이 여러 곳이어도${br}${blue('같은 기준')}으로 관리합니다`,
      desc: '본사나 운영 담당자가 매장마다 업체를 따로 관리하지 않아도 되도록, 한 업체가 같은 매뉴얼로 일괄 관리합니다.',
    })}
${grid(4, [
      ['01', '동일한 작업 기준', '모든 매장에 같은 표준작업매뉴얼과 체크리스트를 적용해 매장별 품질 차이를 줄입니다.'],
      ['02', '일정 일괄 조율', '매장별 영업 시간과 휴무일을 받아 방문 일정을 한 번에 계획하고 공유합니다.'],
      ['03', '매장별 리포트 정리', '방문 리포트를 매장 단위로 정리해 어느 매장이 언제 관리됐는지 한눈에 볼 수 있습니다.'],
      ['04', '정산 · 세금계산서', '매장별 또는 본사 일괄로 정산 방식을 맞추고 세금계산서를 발행합니다.'],
    ].map(([n, t, d]) => card(num(n) + cardTitle(t) + cardText(d), '26px 22px')))}`)],
    ['도입절차', section({ key: 'ovis-mt-flow', bg: '#F4F7FB' }, () => `${head({
      eb: '도입 절차',
      title: `첫 방문은 ${blue('기준을 잡는 청소')}로 시작합니다`,
      desc: '처음부터 정기 주기로 들어가지 않고, 한 번 전체를 초기화한 뒤 그 상태를 기준으로 관리합니다.',
    })}
${steps([
      { t: '상담 · 현장 점검', d: '매장 조리 특성과 영업 시간, 설비 구성을 확인하고 현재 오염 상태를 촬영합니다.' },
      { t: '주기 · 범위 제안', d: '오염 속도와 예산을 기준으로 방문 주기와 매회 포함 범위를 제안드립니다.' },
      { t: '첫 방문 초기화 청소', d: '후드·덕트·주방을 기준 상태로 한 번 전체 청소합니다. 이후 관리의 출발점이 됩니다.' },
      { t: '정기 방문 · 리포트', d: '정한 주기대로 방문해 청소하고, 매회 점검소견과 사진 리포트를 남깁니다.' },
      { t: '주기 재조정', d: '리포트에 쌓인 기록을 보고 주기를 늘리거나 줄여 불필요한 비용을 줄입니다.' },
      { t: '점검 대응 지원', d: '소방·위생 점검 시 그동안의 리포트를 관리 이력 자료로 활용하실 수 있습니다.' },
    ])}`)],
    ['FAQ', faqSection('ovis-mt-faq', [
      { q: '계약 기간이 정해져 있나요?', a: '매장 상황에 맞춰 협의합니다. 첫 방문 후 리포트를 보고 주기를 확정하는 경우가 많고, 운영 중에도 주기와 범위를 조정할 수 있습니다.' },
      { q: '정기관리를 하면 비용이 줄어드나요?', a: '오염이 쌓이기 전에 관리하므로 한 번에 드는 작업량이 줄어듭니다. 매회 비용과 연간 총액은 매장 규모와 범위에 따라 상담 시 안내드립니다.' },
      { q: '방문 일정은 어떻게 잡나요?', a: '영업 시간과 휴무일을 알려주시면 마감 후 야간이나 휴무일로 고정 일정을 잡고, 방문 전에 미리 알려드립니다.' },
      { q: '매장이 한 곳이어도 정기관리가 되나요?', a: '가능합니다. 단일 매장도 같은 방식으로 주기와 범위를 정해 관리합니다.' },
      { q: '관리 중 설비 이상을 발견하면요?', a: '리포트에 사진과 함께 기록하고 바로 알려드립니다. 수리가 필요한 부분은 임의로 진행하지 않고 먼저 안내드립니다.' },
    ])],
    ['하단CTA', withUsed(() => cta({
      title: `우리 매장에 맞는 주기,${br}<span style="color:#3B82F6;white-space:nowrap;">현장 점검으로</span> 정해 드립니다`,
      desc: `매장 수와 업종, 영업 시간을 알려주시면 ${b('<span style="color:#FFFFFF;">방문 주기와 매회 포함 범위</span>')}를 제안드립니다. 다점포는 매장 목록만 주셔도 됩니다.`,
      primary: '정기관리 상담 신청하기 →',
    }))],
  ],
};

/* ============================================================ 시공사례 */
const cases = [
  ['후드청소', '고깃집 무연 로스터 후드', '고깃집 · 테이블 18개', '필터 · 후드 내부 · 외판 마감'],
  ['덕트청소', '단체급식 배기덕트 전 구간', '구내식당 · 1일 600식', '점검구 3개소 시공 · 내부 세정'],
  ['주방 전체청소', '신규 매장 개업 전 오픈청소', '한식 · 주방 약 15평', '공사 분진 · 설비 · 바닥 전체'],
  ['후드청소', '중식당 웍 화구 라인 후드', '중식 · 화구 6구', '필터 침적 · 내부 판재 · 배유관'],
  ['정기 위생관리', '프랜차이즈 다점포 분기 관리', '치킨 프랜차이즈 · 4개 매장', '분기 방문 · 매장별 리포트'],
  ['덕트청소', '호텔 연회 주방 배기팬 · 덕트', '호텔 연회장 주방', '배기팬 분해 세정 · 덕트 내부'],
  ['주방 전체청소', '인수 매장 인수인계 청소', '분식 · 주방 약 8평', '트렌치 · 그리스트랩 · 설비 뒤편'],
  ['정기 위생관리', '고깃집 월간 필터 관리', '고깃집 · 무연 로스터 22개', '월 1회 필터 · 분기 내부 세정'],
  ['주방 전체청소', '위생점검 대비 집중 청소', '단체급식 조리실', '조리대 하부 · 배수 라인 · 선반'],
];
const portfolio = {
  dir: '시공사례',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: ['홈', '시공사례'],
      title: `말보다 ${'<span style="color:#3B82F6;white-space:nowrap;">전·후 사진</span>'}으로 ${br}보여드립니다`,
      desc: '음식점, 프랜차이즈, 단체급식, 호텔 주방에서 진행한 후드청소 · 덕트청소 · 주방 전체청소 · 정기 위생관리 사례입니다. 모든 현장은 같은 위치와 각도로 작업 전후를 기록합니다.',
      chips: ['#음식점·고깃집', '#프랜차이즈 다점포', '#단체급식·구내식당', '#호텔·연회장'],
    }))],
    ['사례목록', section({ key: 'ovis-pf-list', bg: '#FFFFFF' }, () => {
      const TAGC = { '후드청소': '#1E5FD9', '덕트청소': '#0D1A2B', '주방 전체청소': '#FF6A1F', '정기 위생관리': '#1547B0' };
      const meta = (k, v) => `<span style="font-size:12.5px;font-weight:700;color:#7B8794;">${k}</span><span style="font-size:13px;font-weight:400;color:#475467;">${v}</span>`;
      const c = ([t, title, site, work]) => `<div class="ovis-case ovis-work" style="display:flex;flex-direction:column;overflow:hidden;border:1px solid #E4E9F0;border-radius:16px;background:#FFFFFF;box-shadow:0 4px 14px rgba(16,24,40,.07);">
        <div style="position:relative;">
          <span style="position:absolute;left:12px;top:12px;z-index:1;display:inline-block;padding:4px 10px;border-radius:6px;background:${TAGC[t]};color:#FFFFFF;font-size:11.5px;font-weight:700;line-height:1.6;">${t}</span>
          <div class="ovis-ba" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;">${ph('BEFORE', 180)}${ph('AFTER', 180)}</div>
        </div>
        <div style="padding:18px 20px 20px;">
          <div style="margin-bottom:12px;font-size:16px;font-weight:900;line-height:1.5;letter-spacing:-.02em;color:#0F1724;">${title}</div>
          <div class="ovis-case-meta" style="display:grid;grid-template-columns:44px 1fr;gap:4px 10px;line-height:1.7;">${meta('현장', site)}${meta('작업', work)}</div>
        </div>
      </div>`;
      return `    <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:30px;">
      <div>
        ${eyebrow('시공사례')}
        ${h2(`최근 진행한 ${blue('현장')}`)}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:7px;">${['전체', '후드청소', '덕트청소', '주방 전체청소', '정기 위생관리'].map((x, i) => `<span style="display:inline-block;padding:7px 14px;border:1px solid ${i ? '#E4E9F0' : '#0D1A2B'};border-radius:100px;background:${i ? '#FFFFFF' : '#0D1A2B'};color:${i ? '#475467' : '#FFFFFF'};font-size:12.5px;font-weight:600;line-height:1.7;">${x}</span>`).join('')}</div>
    </div>
${grid(3, cases.map(c))}`;
    }, )],
    ['기록방식', section({ key: 'ovis-pf-rec', bg: '#F4F7FB' }, () => `${head({
      eb: '사례를 기록하는 방식',
      title: `모든 현장이 ${blue('같은 형식')}으로 남습니다`,
      desc: '고객사에 전달하는 리포트와 같은 기준으로 기록합니다. 사진만 보기 좋은 현장을 골라 올리지 않습니다.',
    })}
${grid(4, [
      ['PHOTO', '같은 위치 · 같은 각도', '작업 전과 후를 같은 자리에서 촬영해 달라진 부분만 비교되게 합니다.'],
      ['SCOPE', '작업 범위 명시', '어느 구역을 어디까지 청소했는지, 무엇이 범위 밖이었는지 함께 적습니다.'],
      ['NOTE', '점검소견', '청소 중 발견한 설비 이상이나 손상, 오염 원인을 기록합니다.'],
      ['NEXT', '다음 권장 시점', '오염 상태와 조리 특성을 보고 다음 청소 시점을 안내합니다.'],
    ].map(([n, t, d]) => card(num(n) + cardTitle(t) + cardText(d), '26px 22px')))}`)],
    ['하단CTA', withUsed(() => cta({
      title: `비슷한 현장이 있으신가요?${br}<span style="color:#3B82F6;white-space:nowrap;">사진으로 비교해</span> 드립니다`,
      desc: `지금 매장 사진 3~5장을 보내주시면 ${b('<span style="color:#FFFFFF;">비슷한 사례와 작업 범위, 예상 비용</span>')}을 함께 안내드립니다.`,
      primary: '무료 견적 · 상담 신청하기 →',
    }))],
  ],
};

/* ============================================================ 견적문의 */
const contact = {
  dir: '견적문의',
  sections: [
    ['페이지헤드', withUsed(() => pagehead({
      crumbs: ['홈', '견적문의'],
      title: `현장 사진 3~5장이면${br}<span style="color:#3B82F6;white-space:nowrap;">견적부터</span> 안내드립니다`,
      desc: '계약을 먼저 권하지 않습니다. 지금 상태와 예산에 맞는 작업 범위를 먼저 정리해 드리고, 필요하면 현장 점검 후 확정합니다. 문의 내용 확인 후 통상 24시간 이내에 연락드립니다.',
      chips: ['#서울·경기·인천 전지역', '#평일 09:00–19:00 상담', '#야간·휴무일 작업'],
    }))],
    ['문의방법', section({ key: 'ovis-ct-way', bg: '#FFFFFF' }, () => {
      const w = (en, title, desc, action) => card(
        `<div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1.7;color:#1E5FD9;">${en}</div>`
        + cardTitle(title, 8, 19) + cardText(desc, 20) + action, '30px 26px', 'display:flex;flex-direction:column;justify-content:space-between;');
      return `${head({
        eb: '문의 방법',
        title: `편한 방법으로 ${blue('연락 주세요')}`,
      })}
${grid(3, [
        w('CALL', '전화 상담', '급한 일정이나 점검 날짜가 잡혀 있다면 전화가 가장 빠릅니다. 통화 후 사진은 문자로 보내주시면 됩니다.', `<a class="ovis-tel" href="${TEL}" style="display:block;font-size:clamp(22px,2.6vw,26px);font-weight:900;letter-spacing:-.02em;line-height:1.3;color:#0F1724;text-decoration:none;">010-0000-0000</a><span style="display:block;margin-top:4px;font-size:12.5px;color:#7B8794;">평일 09:00–19:00</span>`),
        w('ONLINE', '온라인 견적 문의', '아래 문의 양식에 매장 정보와 필요한 서비스를 남겨주세요. 확인 후 담당자가 연락드립니다.', `<a class="ovis-golink" href="#ovis-form" style="display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:700;line-height:1.6;color:#1E5FD9;text-decoration:none;">문의 양식 작성하기 ↓</a>`),
        w('PHOTO', '사진으로 먼저 받기', '후드 · 덕트 · 주방 사진을 문자로 보내주시면 사진만으로 가능한 범위의 견적을 먼저 안내드립니다.', `<a class="ovis-golink" href="sms:01000000000" style="display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:700;line-height:1.6;color:#1E5FD9;text-decoration:none;">문자로 사진 보내기 →</a>`),
      ])}`;
    })],
    ['사진가이드', section({ key: 'ovis-ct-photo', bg: '#F4F7FB' }, () => {
      const shot = (n, t, d) => `<div style="overflow:hidden;border:1px solid #E4E9F0;border-radius:14px;background:#FFFFFF;">
        ${ph(`촬영 예시 ${n}`, 120)}
        <div style="padding:14px 16px 16px;"><div style="margin-bottom:4px;font-size:14.5px;font-weight:700;line-height:1.5;color:#0F1724;">${n}. ${t}</div><div style="font-size:12.5px;font-weight:400;line-height:1.7;color:#7B8794;">${d}</div></div>
      </div>`;
      return `${head({
        eb: '사진 촬영 가이드',
        title: `이렇게 찍어 보내주시면${br}${blue('견적이 정확해집니다')}`,
        desc: '전문적인 사진이 아니어도 괜찮습니다. 휴대폰으로 아래 위치만 담아주세요.',
      })}
${grid(5, [
        shot(1, '후드 전체', '한 걸음 물러나 후드 길이가 다 나오게'),
        shot(2, '필터 가까이', '기름이 쌓인 정도가 보이게'),
        shot(3, '후드 안쪽', '필터 하나를 빼고 위쪽을 향해'),
        shot(4, '천장 · 점검구', '덕트 경로나 점검구가 있다면'),
        shot(5, '바닥 · 트렌치', '주방청소를 원하시면 추가로'),
      ])}
    <div class="ovis-card" style="margin-top:22px;padding:22px 26px;border:1px solid #E4E9F0;border-radius:14px;background:#FFFFFF;">
      <div style="margin-bottom:12px;font-size:15px;font-weight:700;line-height:1.6;color:#0F1724;">사진과 함께 알려주시면 좋은 정보</div>
      ${grid(4, ['업종과 매장 위치(구 · 동)', '후드 길이 또는 화구 수', '희망 작업 일정 · 요일', '마지막 청소 시기(아는 경우)'].map(t => list([t], 'check', { size: 14, weight: 400, color: '#475467' })), 0)}
    </div>`;
    })],
    ['문의폼_제목', section({ key: 'ovis-ct-form', bg: '#FFFFFF', pad: '88px 0 20px', align: 'center' }, () => `    <div id="ovis-form" style="max-width:720px;margin:0 auto;">
      ${pill('Online Inquiry')}
      ${h2(`온라인 ${blue('견적 문의')}`)}
      <p class="ovis-sub" style="margin:0 auto;max-width:56ch;font-size:15px;font-weight:400;line-height:1.8;color:#475467;">아래 양식을 작성해 주시면 확인 후 담당자가 연락드립니다. 사진은 문의 접수 후 안내드리는 번호로 보내주셔도 됩니다.</p>
    </div>`)],
    ['진행절차', section({ key: 'ovis-ct-flow', bg: '#F4F7FB' }, () => {
      const s = (n, t, d) => `<div style="padding:22px 18px;border:1px solid #E4E9F0;border-radius:14px;background:#FFFFFF;">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;margin-bottom:14px;border-radius:50%;background:${n === 5 ? '#1E5FD9' : '#EFF5FE'};color:${n === 5 ? '#FFFFFF' : '#1E5FD9'};font-size:13px;font-weight:700;line-height:1;">${n}</div>
        <div style="margin-bottom:6px;font-size:15.5px;font-weight:900;line-height:1.5;letter-spacing:-.02em;color:#0F1724;">${t}</div>
        <div style="font-size:13px;font-weight:400;line-height:1.75;color:#475467;">${d}</div>
      </div>`;
      return `${head({
        eb: '문의 후 진행 절차',
        title: `문의부터 작업까지 ${blue('이렇게 진행됩니다')}`,
      })}
${grid(5, [
        s(1, '문의 접수', '전화 · 온라인 · 문자로 접수합니다.'),
        s(2, '연락 · 사진 확인', '통상 24시간 이내에 연락드리고 사진을 확인합니다.'),
        s(3, '현장 점검', '사진만으로 어려운 경우 방문해 구조와 오염도를 확인합니다.'),
        s(4, '견적 · 범위 확정', '작업 범위와 제외 항목, 비용, 일정을 문서로 확정합니다.'),
        s(5, '작업 · 리포트', '약속한 일정에 작업하고 전·후 리포트를 전달합니다.'),
      ])}`;
    })],
    ['상담안내', withUsed(() => {
      return `<div class="ovis-sec ovis-ct-info" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;max-width:100vw;margin:0;padding:44px 0;overflow:hidden;background:#08111E;box-sizing:border-box;font-family:Pretendard,'Apple SD Gothic Neo',system-ui,sans-serif;color:#FFFFFF;">
  <div class="ovis-c" style="position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;padding:0 24px;box-sizing:border-box;">
    <div class="ovis-strip" style="display:flex;flex-wrap:wrap;gap:12px 32px;align-items:center;justify-content:space-between;">
      <div style="display:flex;flex-wrap:wrap;gap:10px 32px;">
        ${[['상담 시간', '평일 09:00–19:00'], ['서비스 지역', '서울 · 경기 · 인천 전지역'], ['작업 시간', '야간 · 새벽 · 휴무일 조율']].map(([k, v]) => `<div><div style="font-size:11.5px;font-weight:700;letter-spacing:.08em;line-height:1.7;color:#7FA9EE;">${k}</div><div style="font-size:15px;font-weight:500;line-height:1.7;color:#FFFFFF;">${v}</div></div>`).join('\n        ')}
      </div>
      ${btnPrimary(TEL, '010-0000-0000 전화 상담')}
    </div>
  </div>
</div>`;
    }, ['strip'])],
  ],
};

/* ============================================================ 출력 */
const pages = [hood, duct, kitchen, maint, portfolio, contact];
let total = 0;
for (const p of pages) {
  const dir = path.join(OUT, p.dir);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  p.sections.forEach(([name, s], i) => {
    const n = String(i + 1).padStart(2, '0');
    fs.writeFileSync(path.join(dir, `${n}_${name}.html`), s.html + '\n');
    fs.writeFileSync(path.join(dir, `${n}_${name}_반응형.html`), s.css + '\n');
    total++;
  });
  console.log(p.dir, p.sections.length + '섹션');
}
console.log('총', total, '섹션');
