// 구조화 데이터 3종 (의뢰서 7번): LocalBusiness(홈 · 회사소개) · FAQPage(자주 묻는 질문) · Service(서비스 상세 4)
// 주소 상세 · 대표 전화 · 사업자번호는 시안에 ○○ / 010-0000-0000 자리표시라 넣지 않았다 → 확정되면 추가
const SITE = 'https://oviscl.imweb.me';
const script = obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

export const localBusiness = () => script({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: '오비스크린',
  alternateName: 'OVIS CLEAN',
  description: '서울·경기·인천 상업용 주방 후드청소, 덕트청소, 식당청소 전문업체. 표준작업매뉴얼 기반 시공과 작업 후 사진 리포트를 제공하는 위생관리용역업 등록업체입니다.',
  url: SITE,
  email: 'qhfnpr@gmail.com',
  founder: { '@type': 'Person', name: '박은상' },
  address: { '@type': 'PostalAddress', addressCountry: 'KR', addressRegion: '서울특별시', addressLocality: '강서구' },
  areaServed: [{ '@type': 'AdministrativeArea', name: '서울특별시' }, { '@type': 'AdministrativeArea', name: '경기도' }, { '@type': 'AdministrativeArea', name: '인천광역시' }],
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' }],
  knowsAbout: ['후드청소', '덕트청소', '주방 전체청소', '정기 위생관리', '배기팬 청소'],
  sameAs: ['http://pf.kakao.com/_xkxaSEX'],
});

const SERVICES = {
  'hood-cleaning': ['후드청소', '상업용 주방 후드 분해청소의 작업 범위, 절차, 권장 주기, 견적 산정 기준을 정리했습니다. 필터와 후드 내부, 덕트 초입부까지 시공하고 전·후 사진 리포트를 드립니다.'],
  'duct-cleaning': ['덕트청소', '주방 배기덕트 내부 유증기·기름때 제거 방법, 점검구 시공, 화재 예방 관점의 관리 기준을 설명합니다. 덕트 구조별 작업 방식과 권장 청소 주기를 확인하세요.'],
  'kitchen-cleaning': ['주방 전체청소', '화구, 튀김기, 식기세척기, 싱크대, 선반, 벽면, 바닥, 트렌치, 그리스트랩까지 상업용 주방 전체를 청소합니다. 개업청소와 정기청소의 범위를 구분해 안내합니다.'],
  'maintenance': ['정기 위생관리', '매장 조리 특성과 오염 속도에 맞춘 월간·분기 정기관리 프로그램입니다. 방문 주기, 점검 항목, 리포트 제공 방식과 계약 형태를 안내합니다.'],
};
export const service = slug => SERVICES[slug] ? script({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: SERVICES[slug][0],
  serviceType: SERVICES[slug][0],
  description: SERVICES[slug][1],
  url: `${SITE}/${slug}`,
  provider: { '@type': 'LocalBusiness', '@id': `${SITE}/#business`, name: '오비스크린' },
  areaServed: ['서울특별시', '경기도', '인천광역시'],
}) : '';

export const faqPage = items => script({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ subject, body }) => ({
    '@type': 'Question', name: subject,
    acceptedAnswer: { '@type': 'Answer', text: body.replace(/<[^>]+>/g, '') },
  })),
});
