// 로컬 미리보기: 공통 head + 섹션(텍스트) + 섹션 반응형(코드)을 아임웹 순서대로 이어 붙인다
//   node build/preview.mjs <출력폴더>
import fs from 'node:fs';
import path from 'node:path';
const IM = path.resolve(import.meta.dirname, '../imweb');
const out = process.argv[2] || path.resolve(import.meta.dirname, '../preview');
fs.mkdirSync(out, { recursive: true });
const headCode = fs.readFileSync(path.join(IM, '00_공통head.html'), 'utf8');
const dirs = fs.readdirSync(IM).filter(d => fs.statSync(path.join(IM, d)).isDirectory());
for (const d of dirs) {
  const files = fs.readdirSync(path.join(IM, d)).filter(f => f.endsWith('.html') && !f.includes('_반응형')).sort();
  const body = files.map(f => {
    const t = fs.readFileSync(path.join(IM, d, f), 'utf8');
    const c = fs.readFileSync(path.join(IM, d, f.replace('.html', '_반응형.html')), 'utf8');
    return `<div class="section_wrap"><div class="widget text">${t}</div><div class="widget code">${c}</div></div>`;
  }).join('\n');
  fs.writeFileSync(path.join(out, `${d}.html`), `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${d}</title>${headCode}<style>body{margin:0}.pv-hdr{height:64px;background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0 24px;font:700 15px Pretendard,sans-serif}</style></head><body><div class="pv-hdr">오비스크린 (헤더 자리)</div><div style="max-width:1180px;margin:0 auto">${body}</div></body></html>`);
}
console.log('preview →', out, dirs);
