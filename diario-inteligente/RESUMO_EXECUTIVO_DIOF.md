![capa](diof-og.png)

# Diário Inteligente (DIOF)
> Sistema operador do Diário Oficial — diagramação e publicação de atos oficiais.
> **De ColdFusion 11 → Python + FastAPI.** Em produção em `diof.imap.org.br`.
> *Uma frente do **[Programa de Modernização IMAP](../PROGRAMA-MODERNIZACAO-IMAP.md)**.*

---

## O que é

O DIOF é a metade **operadora** do Diário Oficial: recebe os anexos, **diagrama** a edição do dia e a publica. Rodava em **ColdFusion 11** sobre **Windows Server 2012 R2** (ambos fora de suporte), com um motor de PDF preso a componentes Windows.

## De → Para

| Dimensão | Antes (legado) | Depois (Diário Inteligente) |
|---|---|---|
| Runtime | ColdFusion 11 (fim de vida 2021) | **Python + FastAPI** (mantido) |
| Sistema operacional | Windows Server 2012 R2 | **Linux / OCI (contêiner)** |
| Motor de documentos | componentes Windows proprietários | **PyMuPDF + Chromium + LibreOffice** |
| Licenciamento | Adobe CF + Windows (pago) | **R$ 0 (open-source)** |
| QA de cutover | inexistente | **portão de fidelidade (SSIM + texto)** |
| Acessibilidade | app preso ao desktop | **web responsiva (e-MAG/WCAG) + leitura por voz** |

## ✅ Benefícios comuns (valem para todas as frentes do programa)

> Todas as frentes seguem o mesmo padrão e colhem os mesmos ganhos — detalhados no **[Programa](../PROGRAMA-MODERNIZACAO-IMAP.md)**.

- 💸 **Licença de software R$ 0** — plataforma, SO e ferramentas open-source.
- 🛡️ **Fim de tecnologia sem suporte** — base mantida e com patches.
- 🐋 **Linux + Docker + Oracle Cloud** — portabilidade e **consolidação** (o serviço `diof-operator` roda no host Docker de produção, junto de outros 14 contêineres).
- 🔒 **Segurança em profundidade** — WAF (ModSecurity/OWASP), SIEM (Wazuh), TLS automático, hardening (SELinux) — verificados no ar.
- ♻️ **Migração incremental e reversível** — lê os mesmos dados, roda **lado a lado** com o legado, com rollback rápido.
- ✅ **Modernização provada, não apostada** — validação antes do cutover.
- 👥 **Mão de obra abundante** — Python é padrão de mercado.
- ⚙️ **Sem parar a operação.**

## ⭐ Benefícios específicos desta frente

- **🎯 Portão de fidelidade** — cada edição nova é comparada **pixel a pixel (SSIM) + camada de texto** contra o PDF legado de referência. **Só publica quem passa.** Cutover **sem aposta**, cliente a cliente.
- **⚡ Produtividade** — painel **idêntico ao legado**, **um clique para diagramar** (busca os anexos certos por data e monta a edição), **arrastar-e-soltar** para ordenar.
- **♿ Acessibilidade & inovação** — leitor público + **voz (TTS)** para o Diário — acessibilidade real para deficientes visuais (dever da **LBI**). A validação de fidelidade automatizada é, por si, **inovação em QA de publicação oficial**.

## 🔎 Aprofundamento — os 5 eixos

- **🚀 Modernização.** Sai o ColdFusion 11 e entra **Python + FastAPI**; o motor de PDF preso a **componentes Windows proprietários** dá lugar a **PyMuPDF + Chromium + LibreOffice** (open-source, testáveis). O painel é **idêntico ao legado** — um clique busca os anexos por data e monta a edição — então o operador não reaprende nada.
- **💸 Custos.** Fim da **licença Adobe ColdFusion** e do **Windows Server + CALs**; fim das **DLLs proprietárias** de geração de PDF. O serviço `diof-operator` **divide o host Docker** com outros 14 contêineres — mais densidade, menos VMs, menos compute.
- **🧱 Endurecimento (hardening).** Roda em **contêiner Linux mínimo** sob **SELinux** (controle de acesso mandatório), sem a pilha completa de serviços Windows/IIS — **superfície de ataque muito menor**.
- **🛡️ Segurança & salvaguarda.** **WAF (ModSecurity/OWASP)** na borda, **SIEM Wazuh** (detecção + integridade de arquivos) e **TLS automático**. E o diferencial do domínio: o **portão de fidelidade** garante a **integridade do ato oficial** (que tem valor legal) — só publica a edição que bate **pixel a pixel + camada de texto** com a referência.
- **🧭 Futuro já pavimentado e provado.** **Em produção** em `diof.imap.org.br`, com **637 clientes** e edições multi-fonte reais diagramadas pelo motor novo. O cutover é **cliente a cliente, atrás do portão** — modernização provada, não apostada.

## 📍 Provas (em produção)

- Produção pública: **`diof.imap.org.br`** (HTTPS, certificado válido, auto-deploy).
- **Painel batendo exatamente com o legado** (contagens idênticas por status).
- **Diagramação real** de edições multi-fonte (PDF + Word + imagem) montadas pelo motor novo.
- Já rodou **em escala** (centenas de edições, **637 clientes**).

## 🧰 Tecnologias

Python · FastAPI · PyMuPDF · Chromium · LibreOffice · Docker · Linux/OCI — impacto de cada uma em **[TECNOLOGIAS.md](../TECNOLOGIAS.md)**.

## 🗺️ Roadmap

Integrar a **publicação** do PDF → persistir o layout → **cutover por cliente** atrás do portão de fidelidade → **desligar ColdFusion 11 + Windows Server 2012 R2**.
