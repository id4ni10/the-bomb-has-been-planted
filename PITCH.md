![capa](assets/diamante.png)

# O Pitch
## Enquanto a operação seguia normal, reconstruímos a fundação inteira.

> Este documento existe para contar, de uma vez, o que já aconteceu:
> **os sistemas mais críticos do IMAP foram reescritos, endurecidos e colocados em produção** — saindo de uma base morta e paga para uma base **moderna, blindada e gratuita**.
> Não é um plano. Não é uma promessa. **Está no ar agora.**

---

## 1. O problema que ninguém via

Quase tudo que o IMAP opera — nota fiscal, diário oficial, transparência, editoração — rodava sobre **duas tecnologias mortas**:

- **Adobe ColdFusion 11** — sem correção de segurança há **~6 anos**, licença cara, mercado de profissionais secando.
- **Windows Server 2012 R2** — **sem atualizações desde 2023**, licença + CALs recorrentes.

Emitir nota fiscal, publicar atos com valor legal e tratar dados de cidadãos **sobre software que ninguém mais conserta** não é dívida técnica — é **exposição jurídica (LGPD), de segurança e de custo, todos os dias**.

## 2. A revelação

**Esse problema já foi atacado — e vencido, frente a frente.**

Sem parar a operação, sem big-bang e sem risco para o cidadão, **6 sistemas foram reconstruídos e estão em produção** sobre .NET 10, Python/FastAPI, React, Docker e Oracle Linux — com WAF, SIEM e TLS automático que o legado **nunca teve**.

## 3. A parede de provas — tudo verificável, tudo no ar

| Prova | Número |
|---|---|
| Frentes modernizadas **em produção** | **6** |
| Requisições reais comparadas legado × novo (SAI3) | **640 → 0 incompatibilidades** |
| Domínios do Diário Oficial numa só plataforma | **+470** |
| Portais de transparência servidos | **~400** |
| Domínios com HTTPS automático | **~400** |
| Clientes do Diário Inteligente já processados | **637** |
| Testes automatizados que **bloqueiam o deploy** | **49 (NFS-e) + 52 (SIEJ) + ~210 rotas (Cypress)** |
| Sistemas consolidados **num único host** Docker | **15** |
| Custo de licença da nova stack | **R$ 0** |
| Suporte da nova base (Oracle Linux 9) | **até 2032** |
| Interrupção para o cidadão durante a migração | **zero** |

## 4. Os cinco golpes certeiros

1. **💸 Custo — cortado pela raiz.** Sai Adobe ColdFusion, sai Windows Server + CALs, saem componentes proprietários. Entra open-source: **licença R$ 0, para sempre**. Runtimes mais leves + 15 sistemas num host = **menos nuvem na fatura**.
2. **🛡️ Segurança — décadas de atraso resolvidas de uma vez.** WAF (ModSecurity/OWASP) na borda, SIEM (Wazuh) vigiando, SELinux no kernel, TLS renovando sozinho em ~400 domínios, fail2ban, JWT, segredos protegidos. **Defesa em profundidade onde antes não havia nenhuma.**
3. **⚖️ LGPD — de indefensável para auditável.** Operar SO sem suporte é indefensável em auditoria. Agora: ambiente **suportado, monitorado e com trilha de evidências**.
4. **👥 Pessoas — fim do refém.** De um mercado ColdFusion em extinção para **as stacks mais contratáveis do planeta** (Python, .NET, React, TypeScript). Contratar, treinar e substituir ficou simples.
5. **🧭 Futuro — pavimentado e provado.** Cada sistema novo herda a fundação pronta (contêineres, segurança, CI): **nasce mais rápido e mais barato**. NFS-e Nacional pronta antes da obrigatoriedade, IA/voz no Diário, portão de fidelidade — coisas que o legado **jamais** entregaria.

## 5. E o método é tão valioso quanto o resultado

Nada foi apostado — **tudo foi provado antes de virar a chave**:

- O novo lê **o mesmo banco**, roda **lado a lado** com o legado, e o rollback leva **minutos**.
- Validação **pixel a pixel** (DIOF), *golden test* do XML fiscal (NFS-e), paridade de relatórios (SIEJ), **640 requisições comparadas** (SAI3).
- Cutover **gradual** — por cliente, por município, por tipo de órgão. Se algo falha, ninguém percebe. Nada falhou.

> Este método agora é um **ativo da empresa**: qualquer sistema futuro entra na mesma esteira.

## 6. O que vem agora

A camada pública saiu do legado. Restam **duas peças de infraestrutura** — ambas com caminho de baixo atrito:

- **Banco:** SQL Server 2017 **já roda nativamente em Linux** — mesma engine, mesmos *stored procedures*, sem reescrita.
- **Arquivos:** FTP Windows → **SFTP/Object Storage** com transferência **cifrada** (a camada de acesso dos apps já foi modernizada; é repontar).

Fechando essas duas, **o ciclo da fundação se encerra**: zero Windows legado, zero licença desnecessária, zero superfície de risco herdada.

### E o alvo que a casa inteira sente todos os dias: o ERP interno

O **ERP administrativo/financeiro** — o sistema que sustenta o dia a dia interno do Instituto — é hoje **a peça mais deteriorada do parque**: construído sobre a **mesma fundação morta** (ColdFusion 11 + Windows legado), acumula anos sem evolução, telas que ninguém consegue melhorar, manutenção cada vez mais cara e dependência de pouquíssimas pessoas que ainda dominam o código.

Ele tem duas metades, **já diagnosticadas linha a linha — e o resgate já começou**:

- **[SGF — Gestão Financeira](sgf/resumo-executivo-modernizacao.md)**: vendas, boletos, faturas, remessas bancárias e comissões — **207 páginas `.cfm`, ~49 mil linhas** a modernizar. É onde o dinheiro entra.
- **[SGC — Gestão de Clientes](sgc/resumo-executivo-modernizacao.md)**: clientes, contratos, propostas e atendimentos — **79 páginas `.cfm`** e um front de **356 arquivos de script** a reconstruir em componentes modernos.

Os serviços novos **já entraram no host Docker consolidado**, ao lado das demais frentes — herdando CI, autenticação e as camadas de segurança desde o primeiro dia.

**É exatamente para resgatá-lo que este programa importa:**

- **A fundação já está pronta** — contêineres, CI, autenticação, WAF/SIEM/SELinux e o host consolidado: o ERP novo **não começa do zero**, ele **herda tudo**.
- **O método já foi provado no pior caso** — o SIEJ tinha ~20 anos de legado e migrou **módulo a módulo, lendo o mesmo banco, com rollback** e sem parar um dia. **O ERP é o mesmo filme**, com roteiro já escrito.
- **Cada frente entregue barateia a próxima** — o custo de reconstruir o ERP **caiu a cada sistema entregue**, porque plataforma, esteira e equipe treinada já existem.
- **O retorno é diário e interno:** quem sofre com o ERP em ruínas é **a própria equipe** — cada tela modernizada vira produtividade **dentro de casa**, todos os dias.

## 7. O pedido

1. **Aprovar o cutover gradual** das frentes já validadas (começando pelo SAI3, que provou 0 incompatibilidades).
2. **Aprovar a frente de Infraestrutura** — banco e arquivos para Linux, fechando o ciclo da fundação.
3. **Sustentar o resgate do ERP interno** — já iniciado (SGF + SGC), sobre a fundação e o método já provados.
4. **Dar visibilidade ao programa** — ele posiciona o IMAP como **referência em governo digital**.

---

> ### Em uma frase
> **O IMAP trocou uma fundação morta e paga por uma fundação viva, blindada e gratuita — sem parar um único dia, com prova de cada passo — e agora tem método, plataforma e equipe para a próxima década.**
>
> O trabalho está feito. Falta só a decisão de colher tudo.

*Detalhes: **[Programa](PROGRAMA-MODERNIZACAO-IMAP.md)** · **[Por que sair do legado](POR-QUE-SAIR-DO-LEGADO.md)** · **[Tecnologias](TECNOLOGIAS.md)** · frentes nas pastas.*
