![capa](../assets/sections/transparencia.png)

# Transparência — Plataforma de ~400 Portais
> Estabilização, segurança e o novo backend (SAI3) da plataforma de transparência multi-tenant.
> *Uma frente do **[Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)**.*

---

## O que é

**~400 portais públicos** (prefeituras, câmaras, consórcios, autarquias, fundações…) servidos por **uma única plataforma multi-tenant**. Esta frente elevou **estabilidade, organização, segurança e capacidade de evolução** — e prepara a troca do backend pelo novo **[SAI3](../sai3/)** (.NET 10 / Oracle Linux 9), sem expor o cidadão a risco.

## De → Para

| Dimensão | Antes | Depois |
|---|---|---|
| Estabilidade | falhas de JS quebravam páginas em silêncio | **~12 falhas corrigidas (1 crítica/global)** |
| Testes | inexistentes | **Cypress cobrindo ~210 rotas** |
| HTTPS | manual/parcial | **automático em ~400 domínios** (mod_md) |
| Organização do servidor | arquivos monolíticos | **por tipo de órgão** (impacto isolado) |
| Deploy | arriscado | **backup → validação → recarga sem downtime → rollback em 1 comando** |
| Backend | .NET Framework (legado) | **canário SAI3** em consórcios e autarquias |

## ✅ Benefícios comuns (valem para todas as frentes do programa)

> Detalhados no **[Programa](../PROGRAMA-MODERNIZACAO-IMAP.md)**.

- 💸 **Licença de software R$ 0** — SO, WAF, SIEM e stack open-source.
- 🛡️ **Fim de tecnologia sem suporte** — o backend migra para .NET 10 / OL9 (ver **[SAI3](../sai3/)**).
- 🐋 **Linux + Docker + Oracle Cloud** — base enxuta e escalável.
- 🔒 **Segurança em profundidade** — WAF (ModSecurity/OWASP), SIEM (Wazuh), TLS automático, hardening (SELinux) — verificados no host de produção.
- ♻️ **Migração incremental e reversível** — estratégia de **canário** por tipo de órgão, com **rollback instantâneo**.
- ✅ **Modernização provada** — o SAI3 foi validado com **640 requisições reais (2 municípios) → 0 incompatibilidades**.
- ⚙️ **Sem parar a operação** — **zero interrupção** para o cidadão.

## ⭐ Benefícios específicos desta frente

- **🧪 Detecção proativa** — suíte **Cypress** varre **~210 rotas** e captura quebras (inclusive erros tratados pelo Angular no console) que ferramentas padrão não detectam → bug vira **alerta antes do deploy**.
- **🧱 Organização por tipo de órgão** — mudanças cirúrgicas por categoria, **raio de impacto reduzido**, zero perda/duplicidade de domínios.
- **🔐 HTTPS universal** — **~400 domínios** com certificado automático e renovação; higienização de conteúdo misto.
- **🐤 Canário SAI3** — consórcios e autarquias já no novo backend, isolados, validando a migração em produção **em escala controlada**.

## 🔎 Aprofundamento — os 5 eixos

- **🚀 Modernização.** **~400 portais** numa **plataforma multi-tenant** reorganizada **por tipo de órgão** (raio de impacto isolado), com o novo backend **[SAI3](../sai3/)** (**.NET 10 / Oracle Linux 9**) já entrando como **canário** em consórcios e autarquias.
- **💸 Custos.** **Licença R$ 0** (SO, WAF, SIEM e stack open-source) e **HTTPS automático** (`mod_md` + Let's Encrypt) em **~400 domínios** — fim da gestão e renovação manual de centenas de certificados.
- **🧱 Endurecimento (hardening).** **WAF (ModSecurity/OWASP)** e **SELinux** no host de produção; deploy com **backup → validação → recarga sem downtime → rollback em 1 comando**. Organização por categoria reduz o **raio de impacto** de qualquer mudança.
- **🛡️ Segurança & salvaguarda.** A suíte **Cypress** varre **~210 rotas** e captura quebras (inclusive erros que o Angular trata só no console) — **bug vira alerta antes do deploy**. **HTTPS universal** com higienização de conteúdo misto.
- **🧭 Futuro já pavimentado e provado.** Consórcios e autarquias **já no SAI3**, isolados, com **zero interrupção** ao cidadão; o SAI3 foi validado com **640 requisições reais → 0 incompatibilidades**. O canário **expande tipo a tipo** até o cutover completo.

## 📍 Provas (em produção)

- **~400 portais** numa plataforma · **~210 rotas** testadas · **~400 domínios** em HTTPS automático.
- **Consórcios + autarquias** já no novo backend (SAI3), sem impacto aos demais.
- **Interrupção para o cidadão: zero.**

## 🧰 Tecnologias

Angular · Cypress · Apache (mod_md) · Let's Encrypt · Linux/OCI · **[SAI3](../sai3/)** (.NET 10) — impacto de cada uma em **[TECNOLOGIAS.md](../TECNOLOGIAS.md)**.

## 🗺️ Roadmap

Expandir o **canário SAI3** tipo a tipo até o cutover completo; seguir a padronização e o endurecimento de segurança por categoria de órgão.
