---
marp: true
theme: default
paginate: true
---

# Modernização do SIEJ
## De ColdFusion 11 a uma plataforma para o futuro do IMAP

**Sair do ColdFusion não é manutenção. É um ativo estratégico.**

_[Responsável] · [Data]_

---

## O ponto de partida

- O SIEJ é um **sistema central com ~20 anos de legado**.
- Rodava sobre **duas tecnologias fora de suporte**:
  - **ColdFusion 11** — fim de vida desde **2019**
  - **Windows Server 2012 R2** — fim de suporte em **2023**
- Tratando **dados de cidadãos** (publicações oficiais: DOU, Correio, A Tarde).

> Software sem patch de segurança + dado sensível = **risco aberto, agora.**

---

## 1 · O risco é hoje, não amanhã

- **6 anos sem correção de segurança** no ColdFusion.
- **LGPD:** exposição a **sanções previstas em lei** ao operar software sem suporte.
- Rodar software fora de suporte **enfraquece qualquer defesa** de "medidas de segurança adequadas".

> Não é "se moderniza um dia". É **passivo de risco ativo no balanço.**

---

## A grande jogada: EXTRAIR o ColdFusion

Sair do ColdFusion, por si só, **já é o melhor negócio** — independente das novas funcionalidades:

- 🔓 **Fim do vendor lock-in** de um produto sem futuro.
- 💸 **Fim do licenciamento** Adobe ColdFusion (caro e recorrente).
- 👥 **Fim da dependência** de um mercado de profissionais que está secando.
- 🧱 **Fim do acúmulo** de dívida técnica de 20 anos.

> Cada dia a mais no ColdFusion é **custo e risco** que não voltam.

---

## A nova plataforma

| Camada | Tecnologia |
|---|---|
| **Frontend** | React + TypeScript + Vite |
| **Backend** | Python + FastAPI + SQLAlchemy |
| **Banco** | **O mesmo SQL Server** (nada descartado) |
| **Infra** | Docker + Linux, deploy com 1 comando + health check |

**Tudo open source. Tudo com suporte ativo. Tudo com mão de obra abundante.**

---

## 2 · 20 anos modernizados do jeito certo

- Feito de forma **planejada e reversível**...
- ...e **não** como uma **reescrita emergencial** (que normalmente acontece *depois* de um incidente).
- Reescrita emergencial custa **2–3× mais** e roda contra o relógio.

> O valor não é só o que economizamos — é o **desastre que deixamos de correr.**

---

## Retorno sobre o Investimento — pilares

1. **Custos eliminados** — licenças (ColdFusion + Windows Server) + infra.
2. **Riscos evitados** — segurança e conformidade (LGPD).
3. **Produtividade & manutenção** — time comum, código testado, entrega rápida.
4. **Valor estratégico** — plataforma reutilizável; **cada projeto futuro fica mais barato.**

---

## Custo: o que o open-source elimina

| | Legado | Nova plataforma |
|---|---|---|
| Plataforma (ColdFusion) | 💸 licença paga | **R$ 0** (Python/FastAPI/React) |
| Sistema operacional | 💸 Windows + CALs | **R$ 0** (Linux) |
| Mão de obra | escassa e cara (CF) | **abundante** (Python/React) |

> **Tudo open-source → licença R$ 0.** Sem valores especulativos: a economia é **estrutural**.

---

## Migração de baixo risco

```
   LEGADO (ColdFusion 11)  ─┐
                            ├──►  SQL Server  ◄── mesma base, sem migração de dados
   NOVO (FastAPI + React)  ─┘
        ▲ migra-se tela a tela, com rollback a qualquer momento
```

- Os dois rodam **lado a lado**.
- Substitui-se **módulo a módulo**, com paridade verificada.
- **Rollback imediato** se preciso.

---

## 3 · Já está em produção

- ✅ Aplicação **no ar**, conectada ao **banco de produção**.
- ✅ **Diagramação** (DOU, Correio, A Tarde) funcionando.
- ✅ **Financeiro** com extrato detalhado e **paridade verificada** com o SCP legado.
- ✅ **Detecção de irregularidades (LGPD)** + registro permanente.
- ✅ **Config editável pelos operadores** (antes "chumbada" no código).
- ✅ **Testes automáticos + deploy com health check.**

> **Não é promessa. É prova.**

---

## 🚧 Já pavimentamos o caminho

Isto **não foi só migrar um sistema** — foi construir a **fundação tecnológica do IMAP** para os próximos anos:

- **Padrão de migração repetível** → qualquer outro módulo ColdFusion segue o mesmo trilho.
- **Capacidades novas e permanentes:** CI/CD, containers, testes automáticos, código tipado, deploy padronizado.
- **Integração já resolvida** com o legado (autenticação AuthSGA, mesmo SQL Server) → próximos sistemas reaproveitam.
- **Base para formar um time moderno** (stack que se contrata no mercado).

> De **"um sistema migrado"** para **"uma plataforma de desenvolvimento."**

---

## A plataforma como alavanca

```
        SIEJ (1º módulo migrado)
              │
              ▼
   ┌─────────────────────────────┐
   │  Fundação reutilizável       │
   │  FastAPI · React · Docker    │
   │  CI/CD · testes · auth IMAP  │
   └─────────────────────────────┘
        │        │        │
        ▼        ▼        ▼
   Módulo B   Módulo C   Novos projetos
   (CF)       (CF)       (greenfield)
```

**O 1º foi o mais difícil. Os próximos são mais rápidos e mais baratos.**

---

## Recomendação

**Aprovar a continuidade da migração incremental**, começando pelos módulos de **maior risco de segurança** e **maior custo de manutenção**.

- Base **validada em produção**.
- Caminho **evolutivo e reversível**.
- Reduz, ao mesmo tempo, **risco, custo e dependência de tecnologia obsoleta**.

> **Decisão pedida:** seguir com a migração por módulos no próximo ciclo.

---

# O futuro do IMAP já começou

**Saímos do ColdFusion. Provamos em produção. Pavimentamos o caminho.**

Agora é escalar.

_Obrigado._
