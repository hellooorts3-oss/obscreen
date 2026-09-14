// 등록용 번들: imweb/<페이지>/ 의 섹션 쌍을 JSON 하나로 묶는다 → imweb/_bundle.json
import fs from 'node:fs';
import path from 'node:path';
const IM = path.resolve(import.meta.dirname, '../imweb');
const SLUG = { 후드청소: 'hood-cleaning', 덕트청소: 'duct-cleaning', 주방전체청소: 'kitchen-cleaning', 정기위생관리: 'maintenance', 시공사례: 'portfolio', 견적문의: 'contact', 작업기준: 'standards', 작업프로세스: 'process', 시공품질기준: 'quality-standard', 자주묻는질문: 'faq', 청소가이드: 'guide', 회사소개: 'about' };
const out = {};
for (const [dir, slug] of Object.entries(SLUG)) {
  const files = fs.readdirSync(path.join(IM, dir)).filter(f => f.endsWith('.html') && !f.includes('_반응형')).sort();
  out[slug] = files.map(f => ({
    name: f.replace('.html', ''),
    text: fs.readFileSync(path.join(IM, dir, f), 'utf8').trimEnd(),
    code: fs.readFileSync(path.join(IM, dir, f.replace('.html', '_반응형.html')), 'utf8').trimEnd(),
  }));
}
fs.writeFileSync(path.join(IM, '_bundle.json'), JSON.stringify(out));
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])));
