# SAI2 → SAI3 — As 12 Vantagens da Migração (deep dive)
> Comparativo técnico e de negócio · Software · Infraestrutura · Custos · Segurança · Junho/2026

**Legenda:** **SAI2** = backend legado (ASP.NET MVC5 / Web API · .NET Framework 4.6.1 · IIS · Windows). **SAI3** = backend novo (ASP.NET Core · **.NET 10** · Kestrel + Apache · **Oracle Linux 9**), **já em produção**.
**Importante:** o **banco de dados (SQL Server)** é hoje **inalterado** e aparece como **1 item à parte** — há um **roadmap de evolução** próprio para ele (ver final). O ganho de custo de licença tratado aqui é da **camada de aplicação**, não do banco.

---

# 🧩 SOFTWARE

## 1. Runtime atual e suportado — .NET 10 vs .NET Framework 4.6.1
- **SAI2:** .NET Framework **4.6.1** — *fim de suporte em 26/04/2022*. Em modo manutenção: **sem novas features**, correções limitadas, preso ao Windows.
- **SAI3:** **.NET 10** — versão atual, suportada, evolução contínua. Kestrel (servidor de alta performance), GC moderno, `async/await` real, `Span<T>`/`Memory<T>`, caminho aberto para **AOT**.
- **Por que importa:** sair de uma plataforma "congelada" para uma **viva e suportada**; ganho de throughput/latência com **menos recurso**.
- **Evidência:** 113 controllers e **376 endpoints** reescritos em .NET 10, já em produção.

## 2. Produtividade e legibilidade — C# moderno
- **SAI2:** padrões antigos (Web API 2, `HttpResponseMessage`, OWIN), muito *boilerplate*, `packages.config`.
- **SAI3:** C# moderno (`[ApiController]`, *minimal hosting*, *records*, *pattern matching*, *nullable reference types*), código **mais enxuto e claro** → manutenção mais barata e onboarding mais rápido.
- **Por que importa:** **.NET Framework é skill legado** (mão-de-obra escassa/cara). .NET 10 é o que o mercado domina hoje.
- **Evidência:** camada de dados forkada e **limpa** (removido o que era "lixo": Mongo não usado, scraping legado), `packages.config` → **PackageReference**.

## 3. Dependências modernas e **open-source**
- **SAI2:** dependências antigas e algumas **comerciais** (ex.: **iTextSharp** para PDF), libs de scraping (HtmlAgilityPack), driver SQL antigo.
- **SAI3:** stack moderna e majoritariamente **MIT/open-source**: **PdfSharpCore** (substituiu iTextSharp), **Microsoft.Data.SqlClient**, **Newtonsoft.Json**, **EPPlus/NPOI**, **FluentFTP** (FTP moderno, nativo em Linux).
- **Por que importa:** **menos licença de terceiros**, dependências mantidas, superfície de risco menor.
- **Evidência:** PDF/Excel/Word de relatórios funcionando sem libs pagas.

## 4. Qualidade comprovável — testes + contrato verificado
- **SAI2:** **nenhum** projeto de testes automatizados.
- **SAI3:** suíte de testes que enumera as rotas e valida as queries (centenas de endpoints), **+** validação diferencial **SAI3 × SAI2**: **640 requisições reais, 2 municípios, dados reais → 0 incompatibilidades**.
- **Por que importa:** migração deixa de ser "fé" e passa a ser **medida**. Risco controlado, regressões pegas cedo.
- **Evidência:** as únicas diferenças encontradas são cosméticas e inofensivas (omissão de campos nulos; `204` vs `200`), sem impacto no frontend.

---

# 🏗️ INFRAESTRUTURA

## 5. Sistema operacional moderno — Oracle Linux 9 vs Windows legado
- **SAI2:** rodava em **Windows / IIS** (legado). Além disso, a **infraestrutura compartilhada** (banco e FTP) ainda está em **Windows legado** — frente seguinte.
- **SAI3:** **Oracle Linux 9** — **suporte até 2032**, patches contínuos, *footprint* menor, mais estável para serviço de longa duração.
- **Por que importa:** sai do mundo Windows/IIS para um SO **moderno, gratuito e auditável**; abre caminho para aposentar o Windows legado (banco/FTP) na sequência.
- **Evidência:** SAI3 **em produção** sobre Oracle Linux 9.

## 6. Portabilidade e cloud-native
- **SAI2:** **só Windows/IIS**, deploy preso ao ambiente.
- **SAI3:** **multiplataforma** — roda em VM Linux, **container** ou cloud; **deploy self-contained** (não depende de runtime instalado no servidor); pronto para **Docker/Kubernetes** e **escala horizontal**.
- **Por que importa:** liberdade de hospedagem = **poder de barganha de custo** e elasticidade.
- **Evidência:** publicação `self-contained linux-x64`, instâncias **OCI** (inclusive shapes ARM/Ampere mais baratos).

## 7. Operação e entrega modernas
- **SAI2:** deploy manual no IIS, certificado TLS manual, sem pipeline.
- **SAI3:** **systemd** (serviço gerenciado), **Apache** como proxy reverso, **TLS automático** via **mod_md/Let's Encrypt** (renovação automática), **CI no GitHub Actions**, publicação reproduzível.
- **Por que importa:** menos trabalho manual, **menos erro humano**, certificado nunca vence, releases previsíveis.
- **Evidência:** `sai3.service` + vhost com mod_md ativo, cutover/rollback em minutos.

---

# 💰 CUSTOS

## 8. Licenciamento ≈ R$ 0 — o ganho estrutural
- **SAI2:** **Windows Server + CALs** (pago) na camada de aplicação **+** libs comerciais.
- **SAI3:** **R$ 0 de licença** em quase tudo — SO (OL9), runtime (.NET 10), **WAF** (ModSecurity/OWASP), **SIEM** (Wazuh), bibliotecas (open-source/MIT) e TLS (Let's Encrypt).
- **Por que importa:** economia **recorrente e estrutural** — não depende de estimativa; a **eliminação de licenças** é certa e imediata.
- **Bônus de consolidação:** arquitetura **multi-tenant** permite **unificar recursos duplicados numa única região que atende a todos** os municípios.
- ℹ️ *Valores de custo atual ainda são difíceis de auditar — por isso não os citamos; o argumento é a estrutura gratuita.*

## 9. Eficiência de recursos
- **SAI2:** .NET Framework — maior consumo por requisição.
- **SAI3:** **.NET 10 várias vezes mais rápido** (Kestrel + GC moderno) → mesma carga em **menos CPU/RAM** → **VMs menores e mais baratas**.
- **Por que importa:** custo de nuvem é proporcional a recurso. Software eficiente = fatura menor, indefinidamente.
- **Evidência:** instância OL9 atende a um *shape* menor que o servidor Windows legado.

---

# 🛡️ SEGURANÇA

## 10. WAF na borda + controles de aplicação
- **SAI2:** proteção padrão do IIS.
- **SAI3:** **WAF ModSecurity + OWASP Core Rule Set (CRS)** — proteção contra **OWASP Top 10** (SQLi, XSS, path traversal…); **CORS como whitelist** (só domínios confiáveis `.gov.br/.leg.br/.org.br`); **rate limiting por IP**; **JWT**; **segredos protegidos**.
- **Por que importa:** **defesa em profundidade** — várias barreiras, não uma só.
- **Evidência:** WAF ativo e testado em produção; CORS e rate limit verificados.

## 11. Monitoramento e hardening — Wazuh + SELinux
- **SAI2:** observabilidade baixa; sem SIEM; sem MAC (controle de acesso mandatório).
- **SAI3:** **Wazuh (SIEM/XDR open-source)** — **detecção de intrusão (HIDS)**, **integridade de arquivos (FIM)**, **detecção de vulnerabilidades**, avaliação de configuração (CIS) e **alertas em tempo quase real**; **SELinux em modo *enforcing***; logs centralizados.
- **Por que importa:** saímos de **"esperar dar problema"** para **detectar, alertar e responder** — com ferramenta **gratuita**.
- **Evidência:** Wazuh implantado; SELinux *enforcing* no host.

## 12. Conformidade e postura (LGPD) + SO com patches
- **SAI2:** SO sem patches (EOL) — **indefensável em auditoria**; conformidade apenas declarada.
- **SAI3:** SO **com patches contínuos** + **trilha de evidências** (relatórios de conformidade do Wazuh: LGPD/PCI/NIST) + TLS automático.
- **Por que importa:** o portal trata **dados de cidadãos e pedidos de e-SIC** — conformidade **comprovável** deixa de ser risco e vira ativo.
- **Evidência:** stack auditável; relatórios de conformidade disponíveis.

---

# 🗄️ Próxima fronteira — evolução do **banco de dados** (roadmap)

> O custo/configuração de banco mostrado é **1 item** do todo. O SQL Server hoje permanece **inalterado** — mas também vai evoluir. Opções, em ordem de menor para maior esforço:

1. **SQL Server no Linux/containers (passo de menor atrito):** o SQL Server roda em Linux/Docker. Move o banco para fora do Windows → **elimina a licença de Windows também no host de banco**, mantendo 100% de compatibilidade (mesmos *stored procedures* `usp_*`). **Ainda há licença SQL Server**, mas some o Windows.
2. **Banco gerenciado (cloud):** reduz operação (backup, patch, HA automáticos); custo previsível.
3. **PostgreSQL (open-source, licença zero):** maior ganho de custo, **maior esforço** — a aplicação usa **muitos *stored procedures***, que precisariam ser portados. Avaliar como meta de médio/longo prazo.

> **Recomendação:** tratar o banco como **fase própria**, começando pela opção de **menor atrito** (SQL Server em Linux), e estudar PostgreSQL como evolução. **Não bloqueia** o cutover da aplicação.

---

# 📊 Matriz-resumo das 12 vantagens

| # | Eixo | Vantagem | SAI2 (antes) | SAI3 (depois) |
|---|---|---|---|---|
| 1 | Software | Runtime suportado | .NET Fwk 4.6.1 (EOL 2022) | **.NET 10** |
| 2 | Software | Produtividade/manutenção | Web API 2 / OWIN, verboso | **C# moderno, enxuto** |
| 3 | Software | Dependências | Comerciais (iTextSharp…) | **Open-source (MIT)** |
| 4 | Software | Qualidade | Sem testes | **Testes + 640 req. / 0 incompat.** |
| 5 | Infra | Sistema operacional | Windows / IIS (legado) | **Oracle Linux 9 (até 2032)** |
| 6 | Infra | Portabilidade | Só Windows/IIS | **Multiplataforma / containers** |
| 7 | Infra | Operação/entrega | Manual, TLS manual | **systemd + CI + TLS automático** |
| 8 | Custos | Licenciamento | Win Server + CALs + libs | **≈ R$ 0 (SO, runtime, WAF, SIEM, libs)** |
| 9 | Custos | Eficiência | .NET Fwk pesado | **.NET 10 → menos CPU/RAM** |
| 10 | Segurança | WAF + app | IIS limitado, CORS aberto | **ModSecurity/OWASP + CORS/rate/JWT** |
| 11 | Segurança | Monitoramento/hardening | Sem SIEM/MAC | **Wazuh + SELinux** |
| 12 | Segurança | Conformidade (LGPD) | SO sem patch, declarada | **Patches + trilha auditável** |

---

> **Síntese:** a migração SAI2 → SAI3 **moderniza** (runtime, código, dependências), **reduz custo** (licença + instância + eficiência), **eleva a segurança** (WAF, SIEM, hardening, conformidade) e **reduz risco** (compatibilidade comprovada, rollback imediato). E ainda **abre caminho** para evoluir o **banco de dados** na sequência.
