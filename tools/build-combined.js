const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const REPO = '/Users/id4ni10/repos/the-bomb-has-been-planted';
const files = [
  'PITCH.md',
  'README.md',
  'PROGRAMA-MODERNIZACAO-IMAP.md',
  'POR-QUE-SAIR-DO-LEGADO.md',
  'TECNOLOGIAS.md',
  'sai3/apresentacao-sai3.md',
  'diario-inteligente/RESUMO_EXECUTIVO_DIOF.md',
  'nfse/resumo-executivo-modernizacao.md',
  'siej/RESUMO_EXECUTIVO_SIEJ.md',
  'diario-oficial/resumo-executivo-modernizacao.md',
  'transparencia/RESUMO-EXECUTIVO-melhorias.md',
  'infraestrutura/RESUMO-EXECUTIVO-infraestrutura.md',
  'sgf/resumo-executivo-modernizacao.md',
  'sgc/resumo-executivo-modernizacao.md',
];

function resolve(p, baseDir) {
  const abs = path.resolve(baseDir, p);
  if (abs.toLowerCase().endsWith('.png')) {
    const opt = '/tmp/pdfbuild/opt/' + path.basename(abs, path.extname(abs)) + '.jpg';
    if (fs.existsSync(opt)) return opt;
  }
  return abs;
}
function absImg(md, baseDir) {
  md = md.replace(/!\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g, (m, alt, p, rest) => {
    if (/^https?:|^data:|^file:/.test(p)) return m;
    return `![${alt}](file://${resolve(p, baseDir)}${rest})`;
  });
  md = md.replace(/<img([^>]*?)src="([^"]+)"/g, (m, pre, p) => {
    if (/^https?:|^data:|^file:/.test(p)) return m;
    return `<img${pre}src="file://${resolve(p, baseDir)}"`;
  });
  return md;
}

const cover = `
<section class="cover">
  <img class="cimg" src="file:///tmp/pdfbuild/opt/diamante.jpg" alt="capa"/>
  <h1 class="ctitle">Programa de Modernização IMAP</h1>
  <div class="csub">Portfólio executivo — sistemas críticos migrados para uma base moderna, open-source e em nuvem</div>
  <div class="chips">
    <span class="chip green">Licença de software R$ 0</span>
    <span class="chip green">Em produção</span>
    <span class="chip">Open-source</span>
    <span class="chip">Nuvem OCI</span>
    <span class="chip">Reversível</span>
    <span class="chip">Validado</span>
  </div>
  <div class="nums">
    <div class="num"><b>6</b><span>frentes em produção</span></div>
    <div class="num"><b>640 → 0</b><span>requisições testadas → incompatibilidades</span></div>
    <div class="num"><b>+470</b><span>domínios numa plataforma</span></div>
    <div class="num"><b>~400</b><span>portais com HTTPS automático</span></div>
    <div class="num"><b>15</b><span>sistemas num só host</span></div>
    <div class="num"><b>R$ 0</b><span>licença de software</span></div>
  </div>
  <div class="toc">
    <h2>Sumário</h2>
    <ol>
      <li><b>O Pitch</b> — <span>o problema, a revelação, a parede de provas e o pedido</span></li>
      <li><b>Visão do portfólio</b> — <span>o programa em uma página</span></li>
      <li><b>Programa de Modernização IMAP</b> — <span>método comum, custos, segurança, continuidade</span></li>
      <li><b>Por que sair do ColdFusion 11 + Windows Server 2012 R2</b> — <span>todas as vantagens de aposentar o legado</span></li>
      <li><b>Tecnologias do Programa</b> — <span>o arsenal open-source e seu impacto por área</span></li>
      <li><b>SAI3 — Portal da Transparência</b> — <span>.NET Framework → .NET 10 / Oracle Linux 9</span></li>
      <li><b>Diário Inteligente (DIOF)</b> — <span>ColdFusion 11 → Python / FastAPI</span></li>
      <li><b>IMAP NFS-e</b> — <span>ColdFusion 11 → .NET 9 / Docker</span></li>
      <li><b>SIEJ</b> — <span>ColdFusion 11 (~20 anos) → FastAPI + React</span></li>
      <li><b>Diário Oficial</b> — <span>repositório de PDFs → plataforma digital + IA/voz</span></li>
      <li><b>Transparência</b> — <span>~400 portais · estabilização, segurança e canário SAI3</span></li>
      <li><b>Infraestrutura</b> — <span>próxima frente: banco (SQL Server → OL9) + arquivos (FTP → Linux)</span></li>
      <li><b>SGF — Gestão Financeira</b> — <span>ERP interno · ColdFusion → FastAPI + Astro/Vite (próxima onda)</span></li>
      <li><b>SGC — Gestão de Clientes</b> — <span>ERP interno · ColdFusion → FastAPI + Astro/Vite (próxima onda)</span></li>
    </ol>
  </div>
  <div class="cfoot">Cada frente é aprofundada em <b>5 eixos</b> — modernização · custos · endurecimento · segurança &amp; salvaguarda · futuro provado. &nbsp;·&nbsp; Documento em produção, validado e reversível.</div>
</section>
`;

let body = cover;
for (const f of files) {
  const full = path.join(REPO, f);
  if (!fs.existsSync(full)) { console.error('MISSING', f); continue; }
  let md = fs.readFileSync(full, 'utf8');
  md = absImg(md, path.dirname(full));
  const html = marked.parse(md, { gfm: true, breaks: false });
  body += `<section class="doc">\n${html}\n</section>\n`;
}

const css = `
@page { size: A4; margin: 15mm 14mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; color: #1a2330; line-height: 1.5; font-size: 11.5pt; }
.doc { page-break-before: always; }
.doc:first-child { page-break-before: avoid; }
h1 { font-size: 21pt; color: #0b2e5e; border-bottom: 3px solid #1f6feb; padding-bottom: 6px; margin-top: 0; break-after: avoid; }
h2 { font-size: 14.5pt; color: #0b2e5e; margin-top: 20px; border-bottom: 1px solid #d0d7de; padding-bottom: 3px; break-after: avoid; }
h3 { font-size: 12.5pt; color: #143a6b; margin-top: 15px; break-after: avoid; }
h4 { font-size: 11.5pt; color: #143a6b; break-after: avoid; }
p, li { font-size: 11pt; }
blockquote { border-left: 4px solid #1f6feb; background: #f0f5ff; margin: 10px 0; padding: 8px 14px; color: #24406e; border-radius: 0 6px 6px 0; break-inside: avoid; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 9.5pt; page-break-inside: avoid; }
th, td { border: 1px solid #c8d1dc; padding: 6px 9px; text-align: left; vertical-align: top; }
th { background: #0b2e5e; color: #fff; font-weight: 600; }
tr:nth-child(even) td { background: #f5f8fc; }
code { background: #eef1f5; padding: 1px 5px; border-radius: 4px; font-size: 9.5pt; }
pre { background: #0d1b2e; color: #d6e2f0; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 9pt; page-break-inside: avoid; }
pre code { background: none; color: inherit; }
hr { border: none; border-top: 1px solid #d0d7de; margin: 16px 0; }
a { color: #1f6feb; text-decoration: none; }

/* Decorative LOCAL images (DALL·E art, covers, section dividers) → slim banner strips.
   Never a full page, so no blank-page gaps. Scoped to file:// so remote badges are untouched. */
img[src^="file:"]:not([height]) {
  display: block; width: 100%; height: 128px; object-fit: cover; object-position: center;
  border-radius: 8px; margin: 6px 0 14px; page-break-inside: avoid;
}
/* The cover image at the very top of each doc gets a taller, more prominent band. */
.doc > p:first-child img[src^="file:"]:not([height]) { height: 190px; }
/* Remote badges (shields.io) render at badge size, inline. */
img[src^="http"] { height: 20px; width: auto; display: inline-block; vertical-align: middle; margin: 2px 3px; }
/* Inline logo wall / table icons keep their intrinsic small size. */
img[height] { display: inline-block; vertical-align: middle; margin: 2px 4px; }
p[align="center"] { line-height: 2.2; }

/* ---- Capa / sumário (página 1) ---- */
.cover { page-break-after: always; text-align: center; }
.cover .cimg { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin: 0 0 16px; }
.cover h1.ctitle { font-size: 30pt; color: #0b2e5e; border: 0; margin: 4px 0 6px; padding: 0; }
.cover .csub { font-size: 12.5pt; color: #33465e; margin: 0 auto 16px; max-width: 620px; }
.cover .chips { margin: 6px 0 16px; }
.cover .chip { display: inline-block; background: #0b2e5e; color: #fff; padding: 4px 13px; border-radius: 14px; font-size: 9pt; margin: 3px; font-weight: 600; }
.cover .chip.green { background: #1f8b4c; }
.cover .nums { display: flex; justify-content: center; gap: 10px; margin: 0 0 22px; flex-wrap: wrap; }
.cover .num { background: #f0f5ff; border: 1px solid #c8d8f2; border-radius: 10px; padding: 8px 12px; min-width: 104px; }
.cover .num b { display: block; font-size: 15pt; color: #0b2e5e; }
.cover .num span { font-size: 7.5pt; color: #5a6b82; line-height: 1.2; display: block; }
.cover .toc { text-align: left; max-width: 640px; margin: 0 auto; }
.cover .toc h2 { border: 0; color: #0b2e5e; font-size: 13pt; margin: 0 0 8px; padding: 0; }
.cover .toc ol { margin: 0; padding-left: 24px; }
.cover .toc li { margin: 5px 0; font-size: 10.5pt; line-height: 1.35; }
.cover .toc li b { color: #0b2e5e; }
.cover .toc li span { color: #5a6b82; }
.cover .cfoot { margin: 26px auto 0; max-width: 640px; font-size: 9pt; color: #5a6b82; border-top: 2px solid #1f6feb; padding-top: 8px; }
`;

const out = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`;
fs.writeFileSync('/tmp/pdfbuild/combined.html', out);
console.log('combined.html gerado:', (out.length/1024).toFixed(0)+'KB, ', files.length, 'docs');
