![capa](assets/sections/sair-legado.png)

# Por que sair do ColdFusion 11 e do Windows Server 2012 R2
## As vantagens de aposentar a fundação legada

> Duas tecnologias sustentavam quase todos os sistemas do IMAP — e **as duas estão mortas**.
> Sair delas é, isoladamente, **a decisão de maior valor** do programa de modernização: reduz risco, corta custo recorrente e destrava o futuro. Este documento reúne **todas as vantagens** dessa saída.

---

## O que são — e por que precisam sair

| Tecnologia | Fim de suporte | Situação hoje |
|---|---|---|
| **Adobe ColdFusion 11** | 2019 (central) / 2021 (estendido) | ~**5–6 anos sem correção de segurança** · licença Adobe cara e recorrente · mercado de profissionais secando |
| **Windows Server 2012 R2** | **10/10/2023** | **Sem atualizações de segurança** · só ESU pago · licença + CALs recorrentes |

> Enquanto essas duas peças ficam de pé, o programa **não fecha o ciclo**: sobra risco, sobra licença e sobra dependência de tecnologia que **ninguém mais mantém**.

---

## 🔒 Segurança — o ganho mais urgente

- **Volta a receber patches.** Sair de SO e runtime **sem correção há anos** para bases **ativamente mantidas** — cada vulnerabilidade nova passa a ter conserto.
- **Superfície de ataque menor.** Linux mínimo e conteinerizado, sem a pilha completa de serviços Windows/IIS.
- **Defesa em profundidade** que o legado não tinha: **WAF** (ModSecurity/OWASP), **SIEM** (Wazuh), **SELinux** (controle de acesso mandatório), **TLS automático**.
- **Padrões atuais de engenharia** — acesso a dados, gestão de segredos e geração de documentos seguem as práticas de mercado.

## 💸 Custo — economia recorrente e estrutural

- **Fim da licença Adobe ColdFusion** (cara, recorrente, por servidor).
- **Fim da licença Windows Server + CALs** e do **ESU pago** (suporte estendido).
- **Fim de componentes proprietários** (ex.: geração de PDF por DLLs Windows) → substituídos por bibliotecas open-source.
- **Menos compute:** runtimes modernos (.NET, Python) são **mais leves** que o ColdFusion.
- **Consolidação:** com contêineres, vários sistemas dividem **um único host** (menos VMs).
- **Menos manutenção:** TLS/deploy automáticos e testes reduzem incidentes e horas de operação.

> A economia não depende de estimativa — é **estrutural**: sai licença paga, entra open-source (**R$ 0**).

## ⚖️ Conformidade & LGPD

- Operar sobre software **sem suporte** enfraquece qualquer defesa de "medidas de segurança adequadas" exigida pela **LGPD** — e é **indefensável em auditoria**.
- A base nova é **suportada, monitorada e auditável**, com **trilha de evidências** (relatórios do SIEM).
- Regulariza também questões de **licenciamento** de plataforma e SO.

## 👥 Talento & Pessoas — reduzir o risco humano

- **Fim do *bus factor*:** o mercado de desenvolvedores ColdFusion está **secando** — depender de poucos profissionais é risco operacional real.
- **Mão de obra abundante:** Python, .NET, React e TypeScript estão entre as tecnologias **mais usadas do mundo** → contratar, treinar e substituir é **simples e barato**.
- **Retenção:** equipe trabalhando com **stack atual** (não legado) é mais motivada e mais fácil de manter.

## ⚙️ Tecnologia & Manutenção

- **Código moderno, tipado e testável** (vs. monolito legado difícil de mexer).
- **Ferramentas atuais:** controle de versão (Git), **CI**, testes automatizados que **bloqueiam o deploy** se algo quebra.
- **Fim do *vendor lock-in*** Adobe/Windows — liberdade de plataforma.
- **Multiplataforma:** roda em Linux, contêiner ou nuvem.

## ☁️ Operação & Nuvem

- **Contêineres (Docker)** + **Infraestrutura como Código (Terraform)** → ambientes reproduzíveis e auditáveis.
- **Deploy automático**, health-checks, **TLS automático** (Let's Encrypt), rollback simples.
- **Escala horizontal** e **portabilidade** — pronto para crescer.

## 🚀 Estratégico & Futuro

- **Plataforma reutilizável:** cada novo sistema herda a base (contêineres, segurança, CI) → **mais barato e mais rápido** de construir.
- **Vida útil estendida** por 10–15 anos, sem dívida técnica acumulada.
- **Novos produtos habilitados:** NFS-e Nacional, acessibilidade por voz (IA), portão de fidelidade — diferenciais que o legado **jamais** entregaria.
- **Posicionamento** do IMAP como **referência em governo digital**.

---

## ⏳ O custo de **ficar** (o outro lado da moeda)

Manter o legado **não é** custo zero:

- **Risco de segurança e de sanção (LGPD)** cresce **a cada dia** sem patch.
- **Licenças recorrentes** continuam sendo pagas sobre tecnologia **morta**.
- **Dependência crítica** de poucos profissionais de ColdFusion.
- **Migração futura fica mais cara:** a reescrita **emergencial** (depois de um incidente) custa **2–3× mais** e acontece sob pressão.
- **Perda de competitividade:** cada novo projeto nasce mais lento e mais caro sobre uma base obsoleta.

---

## Quadro-resumo: Ficar × Sair

| Dimensão | 🔴 Ficar no legado | 🟢 Sair (modernizar) |
|---|---|---|
| Segurança | Sem patches há anos | **Mantido + WAF + SIEM + SELinux** |
| Custo de licença | Adobe CF + Windows + CALs + ESU | **R$ 0 (open-source)** |
| Compute / manutenção | Pesado, manual | **Leve, automatizado, consolidado** |
| Conformidade (LGPD) | Indefensável | **Auditável, com trilha de evidências** |
| Talento | Escasso e caro (alto *bus factor*) | **Abundante e acessível** |
| Lock-in | Adobe + Windows | **Nenhum (multiplataforma)** |
| Futuro | Dívida crescente | **Plataforma reutilizável, +10 anos** |

---

> **Em uma frase:** sair do ColdFusion 11 e do Windows Server 2012 R2 **remove um risco que já existe**, **corta custo recorrente** e **destrava o futuro** — e já provamos, frente a frente, que dá para fazer isso **sem parar a operação e de forma reversível**.
>
> Voltar ao portfólio → **[Programa de Modernização IMAP](PROGRAMA-MODERNIZACAO-IMAP.md)**.
