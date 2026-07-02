# 💣 SAI3 — Modernização (pacote da reunião)
> De .NET Framework 4.6.1 / IIS / Windows → .NET 10 / Oracle Linux 9 · Junho/2026
> *Uma frente do [Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md).*

![capa](assets/hero.png)

## 👉 Comece por aqui
**[`apresentacao-sai3.md`](apresentacao-sai3.md)** — documento **único e consolidado**, na ordem de apresentação, com as imagens. **É a fonte canônica.**

### Material de apoio (mesmos fatos, outros formatos)
| Arquivo | Para quê |
|---|---|
| [`slides-migracao-sai3.md`](slides-migracao-sai3.md) | deck, um impacto por tela |
| [`sai2-vs-sai3-vantagens.md`](sai2-vs-sai3-vantagens.md) | deep-dive das 12 vantagens + roadmap do banco |
| [`antes-x-depois-sai3.md`](antes-x-depois-sai3.md) | tabelas Antes × Depois |
| [`one-pager-migracao-sai3.md`](one-pager-migracao-sai3.md) | 1 página para imprimir |
| [`resumo-executivo-migracao-sai3.md`](resumo-executivo-migracao-sai3.md) | resumo executivo |
| `assets/` | imagens (capa, segurança, antes/depois, fundação) |

## 🎯 Os fatos principais
- 🔴 **.NET Framework 4.6.1 descontinuado desde 2022** — aplicação **já migrada**; **banco + FTP** ainda em Windows legado (próxima frente).
- 🟢 **640 requisições reais testadas · 0 incompatibilidades** (SAI3 × SAI2, dados reais, 2 municípios).
- 🟢 **Custo de licença ≈ R$ 0** — SO, runtime, WAF, SIEM e bibliotecas: tudo gratuito/open-source.
- 🟢 **Segurança reforçada** — WAF, SIEM (Wazuh), SELinux, TLS automático.
- 🟢 **Rollback em minutos** — o legado segue intacto.
- 🟢 **Tudo já feito** — no ar, testado e seguro.

## 🛡️ Cuidados de credibilidade
- **Não citamos R$ de custo atual** — difícil verificar agora. O argumento é **estrutural**: a nova stack é **gratuita por construção** (licença ≈ R$ 0) e elimina **Windows Server + CALs**.
- **Banco de dados** é **fase própria** (roadmap no deep-dive) — **não bloqueia** o cutover.
- A arquitetura **multi-tenant** permite **consolidar recursos duplicados numa única região que atende a todos** os municípios.

---
*Conteúdo do projeto SAI3. Este pacote (Desktop) é a versão canônica da apresentação.*
