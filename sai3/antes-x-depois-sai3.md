# Antes × Depois — Modernização do Portal da Transparência (SAI)
> Comparativo direto · Junho/2026

---

## 🧱 Plataforma e stack

| Dimensão | ❌ Antes (legado) | ✅ Depois (sai3) |
|---|---|---|
| Sistema operacional | **Windows / IIS** — *legado* | **Oracle Linux 9** — suporte até **2032** |
| Runtime | .NET Framework **4.6.1** — *fim de suporte 2022* | **.NET 10** — atual |
| Servidor web | IIS | **Kestrel + Apache** (proxy reverso) |
| Portabilidade | Só Windows | **Multiplataforma** (VM, container, cloud) |
| Implantação | Dependente do ambiente | **Self-contained** (previsível, reproduzível) |
| Frontend | Angular | **Angular (sem alteração)** |

## 💰 Custo

| Dimensão | ❌ Antes | ✅ Depois |
|---|---|---|
| Licença de SO (app) | Windows Server **+ CALs** (paga) | **R$ 0** (OL9 gratuito) |
| WAF / SIEM / TLS | inexistentes ou pagos | **R$ 0** (ModSecurity, Wazuh, Let's Encrypt) |
| Consolidação | recursos duplicados | **única região multi-tenant p/ todos** |
| Dependências | Comerciais (ex.: iTextSharp) | **Open-source** (PdfSharpCore/MIT) |
| Eficiência | .NET Framework | **.NET 10 — várias vezes mais rápido** → menos CPU/RAM |
| Perfil de dev | Skill legado (escasso/caro) | Stack atual (acessível) |

## 🛡️ Segurança

| Camada | ❌ Antes | ✅ Depois |
|---|---|---|
| WAF | Limitado (filtros IIS) | **ModSecurity + OWASP CRS** (OWASP Top 10) |
| Monitoramento / SIEM | — | **Wazuh** (HIDS, FIM, vuln, alertas) |
| Conformidade (LGPD) | Declaração | **Trilha de evidências (relatórios Wazuh)** |
| CORS | padrão antigo | **Whitelist** de domínios confiáveis |
| Rate limiting | — | **Por IP** (anti-abuso/DoS leve) |
| Autenticação | Legada | **JWT** (hashes preservados) |
| Hardening do SO | — | **SELinux *enforcing*** |
| TLS / certificados | Manual | **Automático** (Let's Encrypt) |
| Gestão de segredos | prática legada | **adequada** (env protegido) |
| Patches de SO | **Indisponíveis** (EOL) | **Disponíveis e contínuos** |

## ✅ Risco e operação

| Dimensão | ❌ Antes | ✅ Depois |
|---|---|---|
| Compatibilidade | — | **640 req. reais testadas → 0 incompatibilidades** |
| Estratégia de cutover | — | **Gradual**, por município (sem big-bang) |
| Rollback | Complexo | **Minutos** (legado intacto e no ar) |
| Observabilidade | Baixa | **SIEM + logs centralizados (Wazuh)** |
| Auditabilidade | Difícil | **Suportável e auditável** |

---

## 📌 Em uma frase

> Saímos de uma stack **sem suporte, paga e cega** para uma stack **atual, gratuita e monitorada** — **com compatibilidade total comprovada e reversão imediata.**
