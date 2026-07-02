# Deck — Modernização do Portal da Transparência (SAI)
> Roteiro de apresentação · um impacto por slide · Junho/2026

---

## Slide 1 — Abertura

# Tiramos o Portal de uma plataforma **descontinuada desde 2022** — e ele **já está no ar** numa stack moderna.

### Já construímos, colocamos no ar e **comprovamos** a substituição.

(pausa breve)

---

## Slide 2 — Os 5 números

| | |
|---|---|
| 🔴 **Plataforma morta** | .NET Framework 4.6.1 descontinuado desde 2022 (já migrado) |
| 🟢 **640** | requisições reais testadas — **0 incompatibilidades** |
| 🟢 **Licença ≈ R$ 0** | SO, runtime, WAF e SIEM: tudo gratuito/open-source |
| 🟢 **Segurança reforçada** | camadas que o sistema não tinha antes |
| 🟢 **minutos** | para reverter, se necessário |

> **"Não é um risco novo. É um risco que já existe — e que estamos removendo."**

---

## Slide 3 — De onde saímos / para onde vamos

| | ❌ Hoje (legado) | ✅ Nova stack |
|---|---|---|
| SO | **Windows / IIS** (legado) | **Oracle Linux 9** (suporte até 2032) |
| Runtime | .NET Framework **4.6.1** (fim 2022) | **.NET 10** (atual) |
| Servidor | IIS | **Kestrel + Apache** |
| Licença SO | 💸 paga | **gratuita** |
| WAF | limitado | **ModSecurity + OWASP CRS** |
| Monitoramento | — | **Wazuh (SIEM/XDR)** |

---

## Slide 4 — 💰 Custo de licença ≈ R$ 0

A nova stack é **gratuita por construção** — o licenciamento praticamente desaparece:

| Componente | Licença |
|---|---|
| SO (Oracle Linux 9) · Runtime (.NET 10) | **R$ 0** |
| WAF (ModSecurity/OWASP) · SIEM (Wazuh) | **R$ 0** |
| Bibliotecas (open-source/MIT) · TLS (Let's Encrypt) | **R$ 0** |

- 🛑 **Fim do Windows Server + CALs** na camada de aplicação.
- ⚡ **.NET 10 mais eficiente** → menos CPU/RAM.
- 🧱 **Multi-tenant** → consolidar recursos duplicados numa **única região que atende a todos**.

> Trocamos uma stack **paga** por uma **gratuita** — sem perder nada.

---

## Slide 5 — 🛡️ Segurança: de "torcer" para "detectar e provar"

**Defesa em profundidade — camadas que o legado não tinha:**

- 🧱 **WAF na borda** — ModSecurity + OWASP CRS (protege contra OWASP Top 10: SQLi, XSS…)
- 👁️ **Wazuh (SIEM/XDR open-source)** — detecção de intrusão, integridade de arquivos, vulnerabilidades, **relatórios de conformidade LGPD**
- 🔒 **App** — CORS whitelist, rate limiting, JWT, segredos protegidos
- 🧰 **SO** — SELinux *enforcing*, TLS automático, superfície reduzida

> **Custo dessas camadas de segurança: R$ 0 de licença.**

---

## Slide 6 — ✅ Por que o risco é baixo

- **Compatibilidade comprovada:** 640 requisições reais, 2 municípios, dados reais → **0 incompatibilidades**
- **Frontend não muda** — troca-se só a URL da API
- **Rollback instantâneo** — o legado segue intacto e no ar
- **Sem big-bang** — cutover por município, no nosso ritmo

> Migração **gradual, reversível e já validada.**

---

## Slide 7 — 🔧 Em andamento (próximas frentes)

- **Banco de dados (SQL Server):** ainda em Windows legado → migração em andamento
- **Servidor de arquivos (FTP):** ainda em Windows legado → a modernizar
- **Painel administrativo (MVC):** próxima fase — *lift* para ASP.NET Core
- **API pública: 100% portada e validada** ✅

> Já modernizamos com método — frente a frente.

---

## Slide 8 — 🎯 Recomendação / pedido

1. **Aprovar o cutover gradual** da API pública para o sai3
2. **Quantificar a economia** (compute + licenças Windows)
3. **Planejar a fase 2** (painel administrativo)

---

## Slide 9 — Fechamento

### Em resumo

A aplicação **já está em produção**, com **compatibilidade comprovada**, **segurança reforçada** e **licença de software R$ 0** — e é **reversível**.
