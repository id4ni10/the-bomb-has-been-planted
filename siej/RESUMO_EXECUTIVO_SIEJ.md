![capa](../assets/sections/siej.png)

# SIEJ — Sistema Inteligente de Editoração de Jornais
> Diagramação e gestão de publicações oficiais (DOU, Correio, A Tarde).
> **De ColdFusion 11 (~20 anos) → Python (FastAPI) + React/TypeScript + Docker.** Em produção.
> *Uma frente do **[Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)**.*

---

## O que é

Sistema **central com ~20 anos de legado**, que diagrama e gere publicações oficiais e trata **dados de cidadãos**. Rodava sobre **duas tecnologias fora de suporte** (ColdFusion 11 + Windows Server 2012 R2) — risco de segurança e conformidade **hoje**, não no futuro.

## De → Para

| Dimensão | Antes (CF11 / WS2012R2) | Depois (FastAPI / React / Docker) |
|---|---|---|
| Frontend | telas antigas | **React + TypeScript + Vite** |
| Backend | ColdFusion 11 | **Python + FastAPI + SQLAlchemy** |
| Banco | SQL Server | **o mesmo SQL Server** (nada descartado) |
| Sistema operacional | Windows Server 2012 R2 | **Linux + Docker** |
| Licenciamento | Adobe CF + Windows | **R$ 0 (open-source)** |
| Testes | inexistentes | **52 (frontend) + suíte no backend**, bloqueiam o deploy |
| Autenticação | legada | **JWT (cookie httpOnly)**, preservando o cartão de acesso |

## ✅ Benefícios comuns (valem para todas as frentes do programa)

> Detalhados no **[Programa](../PROGRAMA-MODERNIZACAO-IMAP.md)**.

- 💸 **Licença de software R$ 0** — Python, React e Docker open-source.
- 🛡️ **Fim de tecnologia sem suporte** — encerra ~20 anos de dívida técnica.
- 🐋 **Linux + Docker + Oracle Cloud** — **consolidação**: os serviços `siej-web` e `siej-api` rodam no host Docker de produção, junto de outros contêineres.
- 🔒 **Segurança em profundidade** — WAF, SIEM (Wazuh), TLS automático, hardening (SELinux), JWT.
- ♻️ **Migração incremental e reversível** — **lê o mesmo banco**, roda lado a lado, migra **módulo a módulo** com rollback imediato.
- ✅ **Modernização provada** — paridade verificada contra os relatórios do legado (SCP).
- 👥 **Mão de obra abundante** — Python/React estão entre as tecnologias mais usadas do mundo.
- ⚙️ **Sem parar a operação.**

## ⭐ Benefícios específicos desta frente

- **🧑‍💻 Melhor ferramenta para os operadores** — editor **WYSIWYG**, **detecção automática de irregularidades (CPF/RG — LGPD)** com registro permanente, e **Financeiro** com filtros/CSV/PDF em **paridade com o legado (SCP)**.
- **⚙️ Configuração editável** pelos operadores (formatos/margens por veículo) — antes "chumbada" no código.
- **🧱 Plataforma reutilizável** — a fundação (FastAPI · React · Docker · CI · auth IMAP) serve de base para os **próximos sistemas**: cada projeto novo fica mais barato e rápido.

## 🔎 Aprofundamento — os 5 eixos

- **🚀 Modernização.** **~20 anos** de ColdFusion 11 dão lugar a **FastAPI + React/TypeScript/Vite**: editor **WYSIWYG** e **configuração editável** pelos operadores (formatos/margens por veículo, antes "chumbados" no código). O **banco não muda** — o novo backend lê **o mesmo SQL Server**.
- **💸 Custos.** Fim da **licença Adobe CF + Windows**; Python/React/Docker **open-source**. A fundação (FastAPI · React · Docker · CI · auth IMAP) é **reutilizável** — cada sistema novo nasce **mais barato e mais rápido**.
- **🧱 Endurecimento (hardening).** **Autenticação JWT em cookie httpOnly** (preservando o cartão de acesso), serviços `siej-web`/`siej-api` em **contêineres Linux sob SELinux**, **testes que bloqueiam o deploy** (52 no frontend + suíte no backend).
- **🛡️ Segurança & salvaguarda.** O sistema trata **dados de cidadãos** — risco de conformidade **hoje**, não no futuro. Agora há **detecção automática de irregularidades (CPF/RG — LGPD)** com **registro permanente**, além de **WAF, SIEM (Wazuh) e TLS automático**.
- **🧭 Futuro já pavimentado e provado.** **No ar**, ligado ao banco de produção, com **Financeiro em paridade verificada contra o SCP legado**. A migração segue **módulo a módulo**, priorizando o de maior risco — com rollback imediato.

## 📍 Provas (em produção)

- Aplicação **no ar**, conectada ao **banco de produção**.
- Fluxo de **diagramação** (DOU, Correio, A Tarde) funcionando.
- **Financeiro** com paridade verificada contra o SCP legado.
- **Detecção de irregularidades (LGPD)** com registro permanente.
- Pipeline com **testes automáticos + deploy com health check**.

## 🧰 Tecnologias

Python · FastAPI · SQLAlchemy · React · TypeScript · Vite · Docker · Linux/OCI — impacto de cada uma em **[TECNOLOGIAS.md](../TECNOLOGIAS.md)**.

## 🗺️ Roadmap

Seguir a migração **incremental**, priorizando os módulos de **maior risco** e **maior custo de manutenção** — até **aposentar ColdFusion 11 + Windows Server 2012 R2**.
