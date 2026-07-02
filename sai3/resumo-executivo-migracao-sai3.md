# 🚀 Modernização do Portal da Transparência (SAI)
### De .NET Framework 4.6.1 / IIS / Windows → **.NET 10 / Oracle Linux 9**

> **Resumo executivo — Junho/2026** · *uma frente do [Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)*

---

## O ponto de partida

> **A aplicação do Portal já saiu do legado — mas a fundação compartilhada ainda não.** O backend rodava em **.NET Framework 4.6.1** (plataforma **descontinuada desde 2022**); o **banco de dados** e o **servidor FTP** ainda estão em **Windows legado**.
>
> Não estamos propondo assumir um risco novo. Estamos **removendo, peça por peça, um risco que já existe** — **com custo de licença ≈ R$ 0** e uma **camada de WAF e segurança que antes não tínhamos.**
>
> **E não é teoria: a aplicação já está no ar, funcionando e comprovada.**

### Os números que importam

| | |
|---|---|
| 🔴 **Plataforma morta** | .NET Framework 4.6.1 **descontinuado desde 2022** — aplicação **já migrada** |
| 🟢 **640** | requisições reais testadas (2 municípios, dados reais) — **0 incompatibilidades** |
| 🟢 **R$ 0** | de licença de SO na camada de aplicação (Oracle Linux 9, suporte até **2032**) |
| 🟢 **Licença ≈ R$ 0** | SO, runtime, WAF, SIEM e bibliotecas: gratuitos/open-source (ver §2) |
| 🟢 **0** | mudanças necessárias no frontend Angular |
| 🟢 **minutos** | tempo de rollback (o legado permanece intacto e no ar) |

---

## 1. Por que agora — o custo de **NÃO** migrar

| Componente | Situação | Risco |
|---|---|---|
| **.NET Framework 4.6.1** *(backend do portal)* | Fim de suporte: **26/04/2022** | Sem correções de segurança nem evolução. **→ já migrado.** |
| **Banco de dados (SQL Server)** | Ainda em **Windows legado** | A modernizar — próxima frente. |
| **Servidor de arquivos (FTP)** | Ainda em **Windows legado** | A modernizar — próxima frente. |

**Tradução para o negócio:** o portal — que trata pedidos de **e-SIC** e dados de cidadãos — saiu de uma plataforma sem suporte; resta tirar **banco e FTP** do Windows legado. Risco e **passivo de compliance (LGPD)** que estamos eliminando, peça por peça.

---

## 2. 💰 Redução de custos

**Licenciamento (ganho mais direto)**
- **Elimina o licenciamento Windows Server** (Standard/Datacenter por núcleo + CALs) na camada de aplicação. **Oracle Linux 9 é gratuito.**
- **Troca de dependências comerciais por open-source** — ex.: iTextSharp → **PdfSharpCore (MIT)**.

**Infraestrutura / computação**
- **.NET 10 é várias vezes mais rápido** que o .NET Framework (Kestrel + GC moderno) → mesma carga em **menos CPU/RAM** → VMs menores e mais baratas.
- **Deploy self-contained**: roda em **VM Linux enxuta, container ou cloud** — sem runtime instalado no servidor.
- Multiplataforma → caminho aberto para **containers/Kubernetes** e escala horizontal barata.

**Operação / pessoas**
- Stack atual = o que devs novos dominam. **.NET Framework é skill legado** (contratação cara e escassa).
- **TLS automatizado** (Let's Encrypt) → fim da gestão manual de certificados.

### 💸 Custo de licença ≈ R$ 0 (estrutural)

O ganho de custo não depende de estimativa: é **estrutural**. Quase **toda** a nova stack é **gratuita por construção**.

| Componente | Custo de licença |
|---|---|
| Sistema operacional (Oracle Linux 9) | **R$ 0** |
| Plataforma (.NET 10) | **R$ 0** |
| WAF (ModSecurity + OWASP CRS) | **R$ 0** |
| SIEM / monitoramento (Wazuh) | **R$ 0** |
| Bibliotecas (PDF/Excel/FTP — open-source/MIT) | **R$ 0** |
| TLS / certificados (Let's Encrypt) | **R$ 0** |

- 🛑 **Fim do licenciamento Windows Server + CALs** na camada de aplicação.
- 🧱 **Arquitetura multi-tenant** → possível **consolidar recursos duplicados numa única região que atende a todos** os municípios.

> ℹ️ Valores de custo atual ainda são difíceis de auditar — por isso **não os citamos**. O argumento é a **eliminação de licenças**, que é **certa e imediata**.

---

## 3. 🛡️ WAF e Segurança — defesa em profundidade

A nova arquitetura adiciona **camadas que não existiam (ou eram limitadas) no IIS**:

### WAF na borda — ModSecurity + OWASP Core Rule Set (CRS)
- Firewall de aplicação com o **conjunto de regras OWASP** → proteção contra **OWASP Top 10** (SQL Injection, XSS, path traversal, etc.).
- **Já ativo e testado em produção.**

### Segurança na aplicação
- **CORS restrito (whitelist)** — só domínios confiáveis (`.gov.br`, `.leg.br`, `.org.br`…).
- **Rate limiting** por IP — mitiga abuso, força-bruta e DoS leve.
- **Autenticação JWT** moderna, preservando os hashes de senha do legado (sem reset para usuários).
- **Segredos protegidos**, em arquivo de ambiente com acesso restrito.

### Hardening do sistema operacional
- **SELinux** em modo *enforcing* (controle de acesso mandatório — sem equivalente nativo no Windows).
- **TLS automatizado** (renovação automática, sem certificado vencendo).
- **Superfície de ataque reduzida**: Linux mínimo, sem a pilha completa de serviços Windows/IIS.
- SO **moderno, com suporte e patches** (vs. Windows legado).

### 👁️ Monitoramento e detecção — Wazuh (SIEM / XDR open-source)
Adicionamos o **Wazuh**, plataforma de segurança **open-source** (sem custo de licença), que dá ao time uma **central de segurança (SIEM/XDR)** que o legado **não tinha**:
- **Detecção de intrusão (HIDS)** e análise de logs centralizada — visibilidade do que acontece nos servidores.
- **Monitoramento de integridade de arquivos (FIM)** — alerta se algo crítico for alterado.
- **Detecção de vulnerabilidades** e **avaliação de configuração** (benchmarks CIS) — postura de segurança contínua.
- **Alertas e resposta a incidentes** em tempo quase real.
- **Relatórios de conformidade prontos** (LGPD, PCI-DSS, NIST) — material direto para auditoria.

> Resultado: saímos de "esperar dar problema" para **detectar, alertar e comprovar** — com ferramenta gratuita.

### Conformidade (LGPD)
Operar sobre SO sem suporte é **difícil de defender em auditoria**. A nova stack recoloca o portal em situação **suportável e auditável** — crítico por tratar dados de cidadãos e pedidos de acesso à informação. Com **Wazuh**, a conformidade deixa de ser declaração e passa a ter **trilha de evidências**.

---

## 4. ⚡ Performance e escalabilidade

- **Kestrel + .NET 10**: maior throughput, menor latência, menos recursos.
- **Cross-platform**: pronto para **containers e cloud**; escala horizontal simples.
- **Self-contained**: implantação previsível e reproduzível.

---

## 5. ✅ Risco de migração — **baixo e controlado**

O ponto que costuma travar decisões — e aqui está resolvido:

- ✅ **Compatibilidade comprovada**: sai3 testado contra o legado com **640 requisições reais, 2 municípios, dados reais → 0 incompatibilidades**. As únicas diferenças são cosméticas e inofensivas (omissão de campos nulos; `204` vs `200`), sem impacto no frontend.
- ✅ **Frontend Angular não muda** — migração só de backend; troca-se a URL da API.
- ✅ **Rollback instantâneo**: o backend legado permanece intacto e no ar.
- ✅ **Sem big-bang**: cutover por município/portal, no ritmo do time.

---

## 6. 🔧 Em andamento (próximas frentes)

- 🗄️ **Banco de dados (SQL Server):** ainda em **Windows legado** → migração em andamento. **Não bloqueia** a aplicação já no ar.
- 📁 **Servidor de arquivos (FTP):** ainda em **Windows legado** → a modernizar.
- 🛠️ **Painel administrativo MVC** (Razor) — próxima fase: *lift* para ASP.NET Core MVC.
- A **API pública está 100% portada e validada** ✅.

---

## 7. 🎯 Recomendação

1. **Aprovar o cutover gradual** da API pública para o sai3 (risco baixo, rollback garantido).
2. **Quantificar a economia** de licenças Windows Server do servidor de aplicação.
3. **Planejar a fase 2**: migração do painel administrativo MVC para .NET 10.

---

> ### Em resumo
> A aplicação do Portal foi migrada de uma plataforma **descontinuada desde 2022** para uma base moderna — **já em produção**, com **compatibilidade comprovada**, **licença de software ≈ R$ 0** e uma **camada de WAF e segurança** que antes não existia. A migração é **reversível**, e o próximo passo (banco e FTP, ainda em Windows legado) já está no roadmap.
