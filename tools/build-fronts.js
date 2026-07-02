const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const REPO = '/Users/id4ni10/repos/the-bomb-has-been-planted';
const OUTDIR = '/tmp/pdfbuild/fronts';
fs.mkdirSync(OUTDIR, { recursive: true });

// front slug (output name) -> { title, file }
const fronts = [
  { slug: '1-SAI3-Transparencia',      title: 'SAI3 — Portal da Transparência', file: 'sai3/apresentacao-sai3.md' },
  { slug: '2-Diario-Inteligente-DIOF', title: 'Diário Inteligente (DIOF)',       file: 'diario-inteligente/RESUMO_EXECUTIVO_DIOF.md' },
  { slug: '3-IMAP-NFSe',               title: 'IMAP NFS-e',                       file: 'nfse/resumo-executivo-modernizacao.md' },
  { slug: '4-SIEJ',                     title: 'SIEJ — Editoração de Jornais',     file: 'siej/RESUMO_EXECUTIVO_SIEJ.md' },
  { slug: '5-Diario-Oficial',          title: 'Diário Oficial — Plataforma Digital', file: 'diario-oficial/resumo-executivo-modernizacao.md' },
  { slug: '6-Transparencia-Portais',   title: 'Transparência — ~400 Portais',     file: 'transparencia/RESUMO-EXECUTIVO-melhorias.md' },
  { slug: '7-Infraestrutura',          title: 'Infraestrutura — Banco e Arquivos', file: 'infraestrutura/RESUMO-EXECUTIVO-infraestrutura.md' },
  { slug: '8-SGF-Financeiro',   title: 'SGF — Gestão Financeira (ERP interno)', file: 'sgf/resumo-executivo-modernizacao.md' },
  { slug: '9-SGC-Clientes',  title: 'SGC — Gestão de Clientes (ERP interno)', file: 'sgc/resumo-executivo-modernizacao.md' },
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

const css = `
@page { size: A4; margin: 15mm 14mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; color: #1a2330; line-height: 1.5; font-size: 11.5pt; }
h1 { font-size: 21pt; color: #0b2e5e; border-bottom: 3px solid #1f6feb; padding-bottom: 6px; margin-top: 4px; break-after: avoid; }
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
img:not([height]) { display: block; width: 100%; height: 128px; object-fit: cover; object-position: center; border-radius: 8px; margin: 6px 0 14px; page-break-inside: avoid; }
.body > p:first-child img:not([height]) { height: 190px; }
img[height] { display: inline-block; vertical-align: middle; margin: 2px 4px; }
p[align="center"] { line-height: 2.2; }
.pghead { display:flex; justify-content:space-between; align-items:center; background:#0b2e5e; color:#fff; padding:8px 14px; border-radius:8px; margin-bottom:4px; }
.pghead .prog { font-weight:700; letter-spacing:.5px; font-size:10pt; }
.pghead .tag { font-size:8.5pt; color:#bcd3f5; }
.pgfoot { margin-top:22px; border-top:2px solid #1f6feb; padding-top:8px; font-size:8.5pt; color:#5a6b82; }
.pgfoot strong { color:#0b2e5e; }
`;

for (const fr of fronts) {
  const full = path.join(REPO, fr.file);
  let md = fs.readFileSync(full, 'utf8');
  md = absImg(md, path.dirname(full));
  const html = marked.parse(md, { gfm: true, breaks: false });
  const head = `<div class="pghead"><span class="prog">PROGRAMA DE MODERNIZAÇÃO IMAP</span><span class="tag">Modernização · Custos · Endurecimento · Segurança · Futuro provado</span></div>`;
  const foot = `<div class="pgfoot"><strong>Uma frente do Programa de Modernização IMAP.</strong> Sistemas críticos migrados de ColdFusion 11 + Windows Server 2012 R2 para uma base moderna, open-source e conteinerizada em nuvem — em produção, validada e reversível, com licença de software R$ 0.</div>`;
  const out = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><style>${css}</style></head><body>${head}<div class="body">${html}</div>${foot}</body></html>`;
  const dest = path.join(OUTDIR, fr.slug + '.html');
  fs.writeFileSync(dest, out);
  console.log(fr.slug + '.html');
}
console.log('OK ' + fronts.length + ' fronts');
