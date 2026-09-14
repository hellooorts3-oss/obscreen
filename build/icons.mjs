// 시안의 이모지 자리 표시 → 단색 라인 아이콘 (의뢰서 2번: 이모지를 섹션 아이콘으로 쓰지 않기)
// 크기는 부모 font-size 를 따른다 (1em). 색은 currentColor.
const svg = d => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-.15em;flex:none" aria-hidden="true">${d}</svg>`;

const P = {
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7 2.5 0 3 3 0 5.5"/><path d="M14 12c4 0 7 1 7 4 0 2.5-3 3-5.5 0"/><path d="M12 14c0 4-1 7-4 7-2.5 0-3-3 0-5.5"/><path d="M10 12c-4 0-7-1-7-4 0-2.5 3-3 5.5 0"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3"/><path d="M7 15h10"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v1.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9"/><path d="M5 13v8h14v-8"/><path d="M10 21v-5h4v5"/>',
  bowl: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M12 3v5M8 5v3M16 5v3"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M12 2l9 5H3z"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 17v-6M13 17V7M18 17v-4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  extinguisher: '<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/><path d="M18 3h-3"/><path d="M11 3a6 6 0 0 0-6 6v4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6M16 12H8M13 16H8"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

export const ICON = name => svg(P[name]);

export const ICONS = {
  '🍳': svg(P.utensils), '📋': svg(P.clipboard), '📞': svg(P.phone), '🔧': svg(P.wrench),
  '🌀': svg(P.wind), '⚙️': svg(P.fan), '⚙': svg(P.fan), '🧪': svg(P.flask), '🍖': svg(P.flame),
  '🏪': svg(P.store), '🍚': svg(P.bowl), '🏨': svg(P.building), '🏛️': svg(P.landmark), '🏛': svg(P.landmark),
  '💨': svg(P.wind), '💧': svg(P.droplet), '🔥': svg(P.flame), '📊': svg(P.chart), '🕐': svg(P.clock),
  '🧯': svg(P.extinguisher), '🛡️': svg(P.shield), '🛡': svg(P.shield), '🧾': svg(P.receipt), '📘': svg(P.book),
  '💬': svg(P.chat),
};
