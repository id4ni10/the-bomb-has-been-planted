![capa](assets/diamante.png)

# Programa de Modernização IMAP
### Visão executiva do portfólio · Junho/2026

> Nos últimos meses, os sistemas mais críticos do IMAP foram **reescritos e colocados em produção** — saindo de uma base **sem suporte e paga** (ColdFusion 11 + Windows Server 2012 R2) para stacks **modernas, open-source e em nuvem**.
>
> Este documento reúne o portfólio, o **método comum** a todas as frentes e os impactos concretos em **custo, segurança e continuidade**. O trabalho já está feito e em operação; falta dar a ele a **visibilidade** que ainda não teve.

---

## 1. O ponto de partida (a fundação comum)

Quase todos os sistemas centrais rodavam sobre **duas tecnologias fora de suporte**:

| Tecnologia legada | Fim de suporte | O que isso significa |
|---|---|---|
| **Adobe ColdFusion 11** | 2019 / 2021 | ~5–6 anos **sem correções de segurança** · licença recorrente · mercado de profissionais escasso |
| **Windows Server 2012 R2** | 10/10/2023 | Sem atualizações de segurança · risco de auditoria · ESU pago |

Sobre essa base, o IMAP **emitia notas fiscais, publicava atos oficiais com valor legal e tratava dados de cidadãos**. Operar software sem manutenção é, ao mesmo tempo, **exposição de custo, jurídica (LGPD) e de segurança** — não apenas dívida técnica.

> 📄 **Todas as vantagens de aposentar essa fundação → [`POR-QUE-SAIR-DO-LEGADO.md`](POR-QUE-SAIR-DO-LEGADO.md).**

---

## 2. O que já está em produção — as 6 frentes

Seis sistemas críticos, modernizados e **no ar**, cada um lendo o **mesmo banco de dados** (migração lado a lado, reversível):

| # | Frente | De → Para | Status / prova |
|---|---|---|---|
| 1 | **[SAI3 — Portal da Transparência](sai3/)** | .NET Framework 4.6.1 / IIS → **.NET 10 / Oracle Linux 9** | Em produção · canário em consórcios e autarquias · 640 req. testadas, 0 incompat. |
| 2 | **[Diário Inteligente (DIOF)](diario-inteligente/RESUMO_EXECUTIVO_DIOF.md)** | ColdFusion 11 → **Python + FastAPI** | `diof.imap.org.br` · diagramação real · 637 clientes |
| 3 | **[NFS-e](nfse/resumo-executivo-modernizacao.md)** | ColdFusion 11 → **.NET 9 / Docker** | `sga.imap.org.br` · NFS-e Nacional pronta · 49 testes |
| 4 | **[SIEJ — Sistema Editorial e Jurídico](siej/RESUMO_EXECUTIVO_SIEJ.md)** | ColdFusion 11 (~20 anos) → **FastAPI + React/TS** | Em produção · paridade com o legado (SCP) · 52 testes |
| 5 | **[Diário Oficial (plataforma digital)](diario-oficial/resumo-executivo-modernizacao.md)** | Repositório de PDFs → **plataforma digital** | +470 domínios · leitura por voz e busca por voz |
| 6 | **[Transparência (plataforma / ~400 portais)](transparencia/RESUMO-EXECUTIVO-melhorias.md)** | estabilização + segurança + canário SAI3 | ~210 rotas testadas · HTTPS automático em ~400 domínios |

---

## 3. O método comum — por que **todas** as frentes ganham as mesmas coisas

> Aplicamos o mesmo padrão em todas as frentes. Por isso, os benefícios abaixo **valem para o portfólio inteiro** — e são descritos **uma única vez**, aqui, em vez de repetidos frente a frente.

**Benefícios comuns a todas as frentes:**

1. **Licença de software R$ 0** — plataforma, SO, WAF, SIEM e bibliotecas são open-source.
2. **Fim de tecnologia sem suporte** — saímos de runtimes/SO descontinuados para bases mantidas e com patches.
3. **Linux + Docker + Oracle Cloud** — portabilidade, consolidação (vários sistemas por host) e ambientes reproduzíveis.
4. **Segurança em profundidade** — WAF, SIEM (Wazuh), TLS automático, hardening (SELinux), segredos protegidos.
5. **Migração incremental e reversível** — lê o **mesmo banco**, roda **lado a lado** com o legado, com **rollback** em minutos.
6. **Modernização provada, não apostada** — cada frente valida antes de virar a chave: *portão de fidelidade* pixel-a-pixel (DIOF), paridade de relatórios (SIEJ), *golden test* do XML fiscal (NFS-e), 640 requisições comparadas (SAI3).
7. **Mão de obra abundante** — Python, .NET, React e TypeScript são padrões de mercado (contratar e substituir é simples).
8. **Sem parar a operação** — tudo foi feito com a fábrica rodando.

---

## 4. Custos: o que cortamos (estrutural)

![custos](assets/sections/custos.png)

Não citamos valores estimados (os números de contrato ainda estão sendo levantados) — mas a **redução é estrutural e certa**, em três eixos:

- **💸 Licença → R$ 0.** Fim de **Adobe ColdFusion**, **Windows Server + CALs** e componentes proprietários (PDF). A nova stack (.NET, Python, React, Linux, Docker, WAF, SIEM) é **gratuita**.
- **⚡ Compute menor.** Runtimes modernos são **mais leves** que o ColdFusion; com **contêineres**, vários sistemas **dividem um mesmo host** (menos VMs) e rodam em **Linux/ARM mais baratos** → **menos CPU/RAM → fatura de nuvem menor**.
- **🔧 Manutenção menor.** TLS e deploy **automáticos**, **testes** que barram regressões (menos incidentes, menos "apagar incêndio"), **código legível e testado** e **mão de obra barata/abundante** → **menos horas de operação**, ano após ano.

> Quando os valores reais do contrato forem consolidados, eles apenas **quantificam** uma economia que já é estrutural — e **recorrente**.

---

## 5. Segurança & Conformidade (LGPD)

![segurança e LGPD](assets/sections/lgpd.png)

Em todas as frentes, a postura mudou de "reagir a incidentes" para **defesa em profundidade** — com ferramentas **open-source** (custo de licença R$ 0):

- **Borda:** WAF (ModSecurity + OWASP CRS) contra os ataques do **OWASP Top 10**.
- **Detecção:** SIEM/XDR (**Wazuh**) — intrusão, integridade de arquivos, vulnerabilidades e alertas.
- **Aplicação:** autenticação JWT, segredos protegidos, práticas de acesso a dados modernas.
- **SO:** **SELinux**, TLS automático (Let's Encrypt), patches contínuos, superfície reduzida.

**Ganho de LGPD:** o portal e os sistemas tratam **dados de cidadãos e pedidos de e-SIC**. Operar sobre software sem suporte **enfraquece** a defesa de "medidas de segurança adequadas" exigida pela lei. A nova base é **suportada, monitorada e auditável**, com **trilha de evidências** — reduzindo a exposição a **sanções previstas na LGPD**.

---

## 6. Diferenciais — o que o legado jamais entregaria

![portfólio](assets/portfolio.png)

- 🔊 **Diário Oficial com leitura e busca por voz** — acessibilidade real para deficientes visuais (dever da **LBI**).
- 🧾 **NFS-e Nacional** já construída — prontos **antes** da obrigatoriedade federal.
- 🔬 **Portão de fidelidade** (pixel + texto) — QA de publicação oficial que garante edição **idêntica** ao legado.
- 🎨 **Multi-tenant adaptativo** — uma base de código assume automaticamente a identidade visual de cada município.
- 🛡️ **Detecção automática de irregularidades (CPF/RG)** para conformidade LGPD.
- 🏗️ **Infraestrutura como Código (Terraform)** — ambientes reproduzíveis e auditáveis.

**As tecnologias e o impacto de cada uma por área estão em → [`TECNOLOGIAS.md`](TECNOLOGIAS.md).**

---

## 7. Prova de infraestrutura (verificado em produção)

Os ganhos acima não são teoria — foram **verificados ao vivo** nos servidores de produção:

**🖥️ Host de aplicação — Oracle Linux 9.6**
- ✅ **SELinux em modo *enforcing*** · ✅ **Wazuh (SIEM) ativo** · ✅ **ModSecurity (WAF) carregado**
- ⏱️ **22 dias** de uptime contínuo · footprint enxuto (a aplicação usa uma fração da memória disponível).

**🐋 Host de consolidação — Oracle Linux 9.7 + Docker**
- **15 contêineres** de sistemas e serviços rodando em **um único host** (3 vCPUs) — incluindo **DIOF**, **NFS-e**, **SIEJ** (web + API), dashboards e serviços de apoio.
- ⏱️ **30 dias** de uptime · **consolidação real** = menos VMs, menos custo de operação.

> Segurança em profundidade e consolidação **comprovadas em produção** — não prometidas.

---

## 8. O custo de **não** modernizar (o que se perde parado)

Manter o legado não é "custo zero" — é um custo silencioso e crescente:

- **Licenças recorrentes** continuam sendo pagas sobre tecnologia que **ninguém mais mantém**.
- **Risco de segurança e de sanção (LGPD)** cresce **a cada dia** sem patch — e um único incidente pode custar mais do que anos de operação.
- **Dependência de poucos profissionais** de ColdFusion (alto *bus factor*): risco operacional real se um deles sair.
- **Cada mês parado encarece a migração futura** — a reescrita emergencial (depois de um incidente) custa **2–3× mais** e acontece sob pressão.
- **Oportunidades perdidas:** sem base moderna, cada novo projeto nasce mais caro e mais lento.

---

## 9. Valor nos próximos anos

O ganho não é só evitar problema — é **construir uma plataforma**:

- **Reuso:** cada novo sistema herda a base (contêineres, segurança, CI) → **mais barato e mais rápido de construir**.
- **Escala:** pronta para nuvem, contêineres e crescimento horizontal.
- **Continuidade:** stack suportada **até 2032**, sem dívida técnica acumulada — vida útil estendida por **10–15 anos**.
- **Novos produtos:** capacidades já criadas (ex.: NFS-e Nacional, acessibilidade por voz) viram **diferencial de mercado**.
- **Posicionamento:** coloca o IMAP como **referência em governo digital**.

---

## 10. Próxima frente — Infraestrutura (banco + arquivos)

A camada de **aplicação** está modernizada. Falta tirar do **Windows legado** as duas últimas peças de **infraestrutura compartilhada** — a frente que **fecha o ciclo**:

- 🗄️ **Banco de dados** — hoje **SQL Server 2017 em Windows**. Como o **2017 já roda em Linux**, a saída é de **baixo atrito**: SQL Server em Linux/contêiner (**mesma versão, mesmos stored procedures**), depois eventual **PostgreSQL open-source (licença R$ 0)**.
- 📁 **Servidor de arquivos** — hoje em **Windows** → **SFTP/FTPS** ou **Object Storage** em Linux, com **transferência cifrada de ponta a ponta** e escalabilidade. A camada de acesso já está em biblioteca moderna, então repontar é simples.

> 📄 **Plano completo, opções e próximos passos → [`infraestrutura/`](infraestrutura/RESUMO-EXECUTIVO-infraestrutura.md).**

Também no radar: **aposentar ColdFusion 11 + Windows Server 2012 R2** conforme os últimos módulos saem, e os **painéis administrativos** restantes.

### 🏗️ O ERP interno — o resgate já começou

Depois da infraestrutura, o alvo de maior impacto **interno** é o **ERP administrativo/financeiro** — o sistema que a própria equipe do Instituto usa todos os dias e que hoje é **a peça mais deteriorada do parque**:

| Situação do ERP hoje | O que o programa muda para ele |
|---|---|
| Mesma fundação morta (ColdFusion 11 + Windows legado) | A **plataforma nova já existe** — contêineres, CI, autenticação, WAF/SIEM/SELinux, host consolidado. **Não começa do zero.** |
| Anos sem evolução; telas impossíveis de melhorar | Frontend moderno (React/TypeScript) com **editor e UX já padronizados** nas frentes entregues. |
| Manutenção cada vez mais cara e arriscada | **Método provado no pior caso** (SIEJ, ~20 anos de legado): mesmo banco, lado a lado, **módulo a módulo, com rollback**. |
| Dependência de pouquíssimas pessoas | Stack padrão de mercado — **qualquer contratação nova já produz**. |
| Quem sofre é a própria equipe, todos os dias | Cada módulo resgatado vira **produtividade interna imediata** — o retorno é diário e dentro de casa. |

> O ERP é o **mesmo filme do SIEJ com o roteiro já escrito** — e cada frente entregue **barateou** essa reconstrução, porque plataforma, esteira e equipe treinada já existem.

As duas metades do ERP já têm **diagnóstico completo — e o resgate já começou** (os serviços novos já estão no host consolidado):

- 📄 **[`sgf/`](sgf/resumo-executivo-modernizacao.md)** — **SGF · Gestão Financeira** (vendas, boletos, remessas, comissões): 207 páginas `.cfm`, ~49 mil linhas a modernizar → **FastAPI + Astro/Vite + Docker**.
- 📄 **[`sgc/`](sgc/resumo-executivo-modernizacao.md)** — **SGC · Gestão de Clientes** (clientes, contratos, atendimentos): 79 páginas `.cfm` e 356 arquivos de front a reconstruir → **FastAPI + Astro/Vite + Docker**.

---

## 11. Recomendação

1. **Reconhecer o programa de modernização** como um ativo estratégico do IMAP.
2. **Acelerar as frentes já em produção** (cutover por cliente/tipo, apoiado nas provas existentes).
3. **Aprovar a próxima frente de infraestrutura** (banco e FTP) para encerrar o legado e o licenciamento.
4. **Sustentar o resgate do ERP interno** — já iniciado (SGF + SGC), sobre a fundação e o método já provados.
5. **Dar visibilidade** ao portfólio junto à diretoria e aos clientes.

---

> **Em resumo:** seis sistemas críticos já foram modernizados e estão em produção, com **licença de software R$ 0**, **segurança em profundidade**, **conformidade LGPD** e um **método provado e reversível**. A economia é estrutural e recorrente; o risco do legado, contínuo. O programa **já entrega valor hoje** — e é a base dos próximos anos.

---

### 🧰 O leque de tecnologias
**[`TECNOLOGIAS.md`](TECNOLOGIAS.md)** — as +25 tecnologias do programa, com **logos, links e o impacto de cada uma** em software, infraestrutura, custo e segurança. Mostra a amplitude de competências que a operação já domina — tudo open-source, licença R$ 0.

### 📂 Detalhamento por frente
- **[`sai3/`](sai3/)** — Portal da Transparência (.NET 10 / OL9) *(deep-dive completo)*
- **[`diario-inteligente/`](diario-inteligente/RESUMO_EXECUTIVO_DIOF.md)** — DIOF (ColdFusion → Python/FastAPI)
- **[`nfse/`](nfse/resumo-executivo-modernizacao.md)** — NFS-e (ColdFusion → .NET 9)
- **[`siej/`](siej/RESUMO_EXECUTIVO_SIEJ.md)** — SIEJ (ColdFusion → FastAPI + React)
- **[`diario-oficial/`](diario-oficial/resumo-executivo-modernizacao.md)** — Diário Oficial (plataforma digital + voz)
- **[`transparencia/`](transparencia/RESUMO-EXECUTIVO-melhorias.md)** — estabilização e segurança dos ~400 portais
- **[`infraestrutura/`](infraestrutura/RESUMO-EXECUTIVO-infraestrutura.md)** — 🔜 próxima frente: banco (SQL Server → Linux) + arquivos (FTP → Linux)
