# Modernização do Portal da Transparência — Resumo de 1 página
**De .NET Framework 4.6.1 / IIS / Windows → .NET 10 / Oracle Linux 9** · Junho/2026

---

**O problema:** o backend do portal rodava em **.NET Framework 4.6.1** — plataforma **descontinuada desde 2022** — em **Windows/IIS**. E o **banco de dados** e o **servidor FTP** ainda estão em **Windows legado**. Risco de segurança e de conformidade (LGPD).

**A solução (já no ar):** a aplicação **já foi migrada** para a nova API **sai3** em **.NET 10 / Oracle Linux 9**, **contrato 100% compatível** com o frontend Angular atual. Banco e FTP são as **próximas frentes**.

---

### 💰 Custo
- **Licença ≈ R$ 0 (estrutural):** SO (OL9), runtime (.NET 10), WAF (ModSecurity/OWASP), SIEM (Wazuh), bibliotecas (open-source/MIT) e TLS (Let's Encrypt) — **tudo gratuito**.
- **Fim do licenciamento Windows Server + CALs** na camada de aplicação.
- **Dependências comerciais → open-source** (ex.: iTextSharp → PdfSharpCore/MIT).
- **.NET 10 mais eficiente** → menos CPU/RAM. **Multi-tenant** → consolidar recursos duplicados numa **única região que atende a todos**.
- *(Não citamos R$ de custo atual — difícil auditar agora; o ganho certo é a eliminação de licenças.)*

### 🛡️ Segurança (defesa em profundidade — tudo open-source)
- **WAF:** ModSecurity + **OWASP CRS** (OWASP Top 10: SQLi, XSS, path traversal…).
- **Wazuh (SIEM/XDR):** detecção de intrusão, integridade de arquivos (FIM), vulnerabilidades, **relatórios de conformidade LGPD**.
- **App:** CORS whitelist, rate limiting, JWT, segredos protegidos.
- **SO:** SELinux *enforcing*, TLS automático (Let's Encrypt), superfície de ataque reduzida.

### ⚡ Modernização
- Stack atual e suportada; **multiplataforma** (pronto para containers/cloud).
- **Deploy self-contained** — previsível e reproduzível.
- Perfil de dev acessível (.NET Framework é skill legado).

### ✅ Risco de migração — baixo
- **640 requisições reais testadas (2 municípios, dados reais) → 0 incompatibilidades.**
- **Frontend não muda** · **rollback em minutos** (legado intacto) · **cutover gradual** (sem big-bang).

---

**Em andamento (próximas frentes):** **banco de dados (SQL Server)** e **servidor FTP** ainda em **Windows legado** → migração em andamento; painel administrativo MVC é **fase seguinte** (*lift* para ASP.NET Core). Não bloqueia a aplicação já no ar.

**Recomendação:** (1) aprovar cutover gradual da API pública; (2) quantificar a economia total (compute + licenças); (3) planejar a fase 2.

> **"Não estamos propondo um risco novo — estamos removendo um que já existe. Custa menos, é mais seguro, e já está provado funcionando."**
