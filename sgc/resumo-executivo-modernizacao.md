![capa](../assets/sections/software.png)

# IMAP SGC — Gestão de Clientes
> O núcleo **de relacionamento** do ERP interno: clientes, contatos, contratos, propostas comerciais e atendimentos.
> **De ColdFusion + Windows Server → Python/FastAPI + Astro/Vite + Docker.**
> **Estado: em andamento — o resgate do ERP interno já começou**, sobre a fundação provada.
> *Uma frente do **[Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)**.*

---

## O que é

O **SGC (Sistema de Gestão de Clientes)** é a metade de relacionamento do ERP interno: cadastro de **clientes e contatos**, **contratos** e **propostas comerciais**, catálogo de **produtos e módulos** e a central de **atendimentos** (tickets) por canal, categoria e responsável. É a memória de quem é cliente, o que contratou e o histórico de suporte.

Roda sobre **ColdFusion + Windows Server + SQL Server** — a **mesma fundação morta** já aposentada nas outras seis frentes, e é o par comercial do **[SGF](../sgf/resumo-executivo-modernizacao.md)** no ERP interno.

## O tamanho do resgate (medido no código legado)

Números reais do código-fonte atual — a escala do trabalho:

| Métrica | SGC hoje |
|---|---|
| Páginas `.cfm` | **79** |
| Hub de roteamento único | `appSistemas.cfm` — **~3.170 linhas** num só arquivo |
| Arquivos de script no front | **356** |
| Folhas de estilo | **42** CSS |
| Front-end | template proprietário, sem build nem bundler |
| Plataforma | ColdFusion + Windows Server — **fora de suporte** |

> Reconstruir esse front em **componentes modernos, tipados e reutilizáveis** é o maior salto de UX e de produtividade do ERP interno — e derruba o custo de cada evolução futura.

## De → Para (proposto)

| Dimensão | Antes (legado) | Depois (proposto) |
|---|---|---|
| Plataforma | ColdFusion (EOL) | **Python 3 · FastAPI · open-source** |
| Front-end | template proprietário, sem build | **Astro + Vite + TypeScript** — componentizado e tipado |
| Acesso a dados | camada legada | **SQLAlchemy (ORM) — consultas parametrizadas por construção** |
| Sistema operacional | Windows Server (EOL) | **Linux + Docker** |
| Banco | SQL Server (lado a lado na migração) | **PostgreSQL** (destino), lendo o mesmo banco durante o cutover |
| Licenciamento | CF + Windows + template pago | **R$ 0 (open-source)** |
| Testes automatizados | — | **pytest** (API) + rotas de tela verificadas |
| Entrega | manual | **CI + deploy conteinerizado** |
| TLS/HTTPS | manual | **Let's Encrypt automático** |

## ✅ Benefícios comuns (valem para todas as frentes do programa)

> Detalhados no **[Programa](../PROGRAMA-MODERNIZACAO-IMAP.md)**.

- 💸 **Licença de software R$ 0** — Python, FastAPI, Astro, Docker e Linux open-source (e **fim do template SmartAdmin pago**).
- 🛡️ **Fim de tecnologia sem suporte** — base mantida e com patches.
- 🐋 **Linux + Docker + Oracle Cloud** — o serviço `imap-sgc` entra no **host Docker consolidado**.
- 🔒 **Segurança em profundidade** — WAF, SIEM (Wazuh), TLS automático, hardening (SELinux), segredos protegidos.
- ♻️ **Migração incremental e reversível** — lê o mesmo banco, roda lado a lado, rollback rápido — **módulo a módulo**.
- 👥 **Mão de obra abundante** — Python + Astro/TypeScript são o oposto do ColdFusion em disponibilidade.
- ⚙️ **Sem parar a operação.**

## ⭐ Benefícios específicos desta frente

- **🧩 Front-end reconstruído** — os 356 arquivos de script do template proprietário dão lugar a **componentes Astro/Vite tipados e reutilizáveis**, com build instantâneo e **dependências modernas e mantidas**.
- **🔒 API tipada e parametrizada** — FastAPI + Pydantic **validam toda entrada** e o SQLAlchemy gera **consultas parametrizadas por construção** — segurança garantida pela arquitetura.
- **📇 Modelo de cliente único e limpo** — clientes, contatos, contratos e atendimentos num **domínio explícito** (ORM), fim das tabelas abreviadas espalhadas.
- **♿ UX & acessibilidade** — telas de cadastro e atendimento responsivas, com rótulos, foco visível e contraste.

## 🔎 Aprofundamento — os 5 eixos

- **🚀 Modernização.** As 79 páginas `.cfm`, o hub `appSistemas.cfm` de ~3.170 linhas e os 356 arquivos de front dão lugar a uma **API FastAPI** + **front Astro/Vite** — a mesma arquitetura em produção no DIOF/SIEJ.
- **💸 Custos.** Fim da **licença ColdFusion + Windows + template proprietário**; stack nova **R$ 0**, no **host Docker consolidado**.
- **🧱 Endurecimento (hardening).** **Segredos protegidos**, **consultas parametrizadas por padrão**, **dependências de front modernas e mantidas** e contêiner sob **SELinux**.
- **🛡️ Segurança & salvaguarda.** Dados de clientes (LGPD) ganham **WAF + SIEM (Wazuh)**, **TLS automático**, **JWT** e **renderização que escapa dados por padrão**.
- **🧭 Futuro já pavimentado.** O SGC **herda** contêineres, CI, autenticação, WAF/SIEM/SELinux e o host consolidado. Cutover **módulo a módulo, lendo o mesmo banco, com rollback** — método já provado no SIEJ.

## 📍 Estado & próximos passos

Esta frente — par do **[SGF](../sgf/resumo-executivo-modernizacao.md)** no resgate do ERP interno anunciado no **[Pitch](../PITCH.md)** (§6) — **já está em andamento**: o serviço novo **já entrou no host Docker consolidado**, herdando toda a fundação (CI, autenticação, WAF/SIEM/SELinux). O diagnóstico do legado está completo (números acima) e o resgate segue o **método provado**: módulo a módulo, lendo o mesmo banco, com rollback.

## 🧰 Tecnologias

Python · FastAPI · SQLAlchemy · Astro · Vite · TypeScript · Docker · Linux/OCI · PostgreSQL · pytest · Let's Encrypt · CI — impacto de cada uma em **[TECNOLOGIAS.md](../TECNOLOGIAS.md)**.

## 🗺️ Roadmap

1. **Mapear o domínio** (clientes, contatos, contratos, propostas, atendimentos) e cobrir com testes de caracterização.
2. **Subir a API FastAPI lendo o mesmo banco**, módulo a módulo, ao lado do legado.
3. **Reconstruir o front em Astro/Vite**, aposentando o SmartAdmin e os ~100 plugins tela a tela.
4. **Cutover gradual + rollback**; integrar com o SGF para fechar o ERP interno.
