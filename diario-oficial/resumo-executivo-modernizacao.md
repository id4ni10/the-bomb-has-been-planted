![capa](diario-og.png)

# Diário Oficial — Plataforma Digital
> A face **pública** do Diário Oficial: consultar, ler e ouvir os atos oficiais.
> **De um repositório de PDFs → plataforma digital multi-tenant.** Em produção.
> *Uma frente do **[Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)**.*

---

## O que é

Transformamos o Diário Oficial de um **repositório de PDFs** numa **plataforma digital moderna, acessível e inteligente** — a mesma base de código atende **centenas de portais municipais**, cada um com sua identidade visual, sem retrabalho.

## De → Para

| Antes | Depois |
|---|---|
| Repositório de PDFs | **Plataforma digital de serviços** |
| Visual datado, igual para todos | **Identidade adaptativa por cidade** |
| Só leitura | **Ouvir por IA + buscar por voz** |
| Acessibilidade limitada | **Fonte, contraste, leitor de tela (LBI/LAI)** |
| Implantação manual | **IaC (Terraform) + entrega contínua** |

## ✅ Benefícios comuns (valem para todas as frentes do programa)

> Detalhados no **[Programa](../PROGRAMA-MODERNIZACAO-IMAP.md)**.

- 💸 **Licença de software R$ 0** — stack web open-source.
- 🐋 **Linux + Docker + Oracle Cloud** — hospedagem enxuta e escalável.
- 🔒 **Segurança em profundidade** — WAF (ModSecurity), TLS automático (Let's Encrypt), hardening (SELinux), cabeçalhos de segurança.
- 🏗️ **Infraestrutura como Código (Terraform)** — ambiente reproduzível e auditável.
- ✅ **Entrega contínua** — toda melhoria chega ao cidadão na hora.
- 👥 **Mão de obra abundante** — stack web padrão de mercado.

## ⭐ Benefícios específicos desta frente

- **🎨 Multi-tenant adaptativo** — **uma base de código → +470 domínios** (prefeituras e câmaras), cada um assumindo **automaticamente a cor de cada cidade** (CSS `color-mix`, sem build por cidade).
- **🔊 Resumo falado por IA (TTS)** e **busca por voz** (Web Speech API) — o cidadão **ouve** e **pesquisa falando**. Acessibilidade real (dever da **LBI**) e diferencial de mercado.
- **♿ Acessibilidade & inclusão** — controles de fonte e **alto contraste**, HTML semântico e ARIA (leitores de tela), aderência à **LBI** e à **LAI**.
- **📊 Transparência sazonal (Festejos Juninos)** — página dedicada aos atos do São João com **exportação de dados (XML/JSON/CSV)** — prestação de contas dos gastos festivos.

## 🔎 Aprofundamento — os 5 eixos

- **🚀 Modernização.** De **repositório de PDFs** para **plataforma digital multi-tenant**: **uma base de código → +470 domínios**, cada cidade assumindo **automaticamente sua cor** (CSS `color-mix`, sem build por cidade). Provisionamento por **Infraestrutura como Código (Terraform)**.
- **💸 Custos.** Stack web **open-source (R$ 0)** e **uma só base** para +470 domínios — sem retrabalho nem projeto por cidade. Hospedagem **enxuta e escalável** em Linux/OCI, com entrega contínua.
- **🧱 Endurecimento (hardening).** **Cabeçalhos de segurança**, **TLS automático (Let's Encrypt)** e **SELinux**; ambiente **reproduzível e auditável** via Terraform (nada de servidor "artesanal").
- **🛡️ Segurança & salvaguarda.** **WAF (ModSecurity)** na borda e acessibilidade como dever legal: controles de fonte, **alto contraste**, HTML semântico/ARIA (**LBI/LAI**). **Dados abertos** (XML/JSON/CSV) dão transparência aos gastos — inclusive a página sazonal dos Festejos Juninos.
- **🧭 Futuro já pavimentado e provado.** **+470 domínios** em produção, **+500 municípios**, **100% aderente à LAI**, com **resumo falado por IA (TTS)** e **busca por voz** nativos — diferenciais que o repositório de PDFs jamais entregaria.

## 📍 Provas (em produção)

- **+470 domínios** publicados numa única plataforma multi-tenant.
- **+500 municípios** atendidos · **+20 anos** de experiência.
- **100% aderente à LAI** · IA + voz nativas.

## 🧰 Tecnologias

Stack web moderna (CSS `color-mix`) · Web Speech API · Terraform · Docker · Linux/OCI · Let's Encrypt — impacto de cada uma em **[TECNOLOGIAS.md](../TECNOLOGIAS.md)**.

## 🗺️ Roadmap

Ampliar recursos de acessibilidade e dados abertos; consolidar a identidade adaptativa e a leitura por voz em toda a base de municípios.
