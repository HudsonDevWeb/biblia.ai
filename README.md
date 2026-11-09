# 📖 Bíblia Desktop com IA

Um aplicativo moderno, rápido e elegante de leitura e estudo bíblico para Windows, desenvolvido com **Tauri v2**, **React 19**, **Tailwind CSS** e **shadcn/ui**.

Funciona **100% offline** para leitura das Escrituras, sem depender de nenhuma API ou conexão com a internet, contando adicionalmente com um **Assistente Bíblico inteligente** para tirar dúvidas teológicas e históricas.

---

## ✨ Funcionalidades

### 📚 Leitura Bíblica 100% Offline
* **3 Traduções Embutidas:**
  * **NVI** (Nova Versão Internacional)
  * **NTLH** (Nova Tradução na Linguagem de Hoje)
  * **ACF** (Almeida Corrigida Fiel)
* **Navegação Ágil:** Seletor visual organizado de livros (Antigo e Novo Testamento) e capítulos.
* **Pesquisa Global:** Busca instantânea por palavras e frases em todos os 66 livros da Bíblia (`Ctrl + K`).
* **Seleção de Versículos:** Destaque ao clicar, com atalhos para copiar para a área de transferência ou enviar direto para a IA.

### 🎨 Personalização Visual e Tipografia
* **Temas:** Modo **Claro**, **Escuro** e **Sépia** (conforto visual estilo e-reader).
* **Tipografia:** Alternância entre fontes **Serifada** (livro impresso) e **Sans-serif** (moderna).
* **Tamanho de Fonte:** Ajuste contínuo de 14px a 32px com botões rápidos `A-` e `A+`.
* **Modos de Exibição:** Leitura **Versículo por Linha** ou **Texto Corrido** (parágrafos).

### 🤖 Assistente Bíblico Integrado
* **Painel Lateral Redimensionável:** Arraste a borda para ajustar a largura do chat conforme a sua preferência.
* **Perspectiva Teológica IASD:** Fundamentado nos princípios da Igreja Adventista do Sétimo Dia (*Sola Scriptura*, *Grande Conflito*, *Sábado*, *Santuário*, *Estado dos Mortos*, volta literal de Jesus).
* **Respostas Enxutas e Bíblicas:** Formatação limpa em negrito, tópicos e botão de cópia rápida.
* **Privacidade Total:** Sua chave de API fica salva exclusivamente no seu computador (`localStorage`). Nenhuma informação é compartilhada ou enviada a servidores de terceiros além da própria API do Google.

---

## 🚀 Como Baixar e Usar (.exe)

1. Acesse a aba **[Releases](../../releases)** deste repositório.
2. Baixe o instalador mais recente: `Bíblia_x64-setup.exe`.
3. Execute o instalador e abra o aplicativo no Windows.

> **Nota sobre o Assistente de IA:** Para usar a IA, basta gerar uma chave gratuita em [aistudio.google.com](https://aistudio.google.com/), clicar no ícone de engrenagem (⚙️) no painel do assistente e colar sua chave. O leitor bíblico continua funcionando 100% offline mesmo sem chave de IA.

---

## 🛠️ Desenvolvimento Local

Se você deseja executar ou compilar o código-fonte:

### Pré-requisitos
* [Node.js](https://nodejs.org/) (v18+) e [pnpm](https://pnpm.io/)
* [Rust](https://rustup.rs/) e Visual Studio C++ Build Tools (apenas para compilar o `.exe`)

### Comandos

```bash
# 1. Instalar dependências
pnpm install

# 2. Rodar no navegador (desenvolvimento com Hot Reload)
pnpm dev

# 3. Compilar o frontend
pnpm build

# 4. Gerar o instalador desktop do Windows (.exe)
pnpm tauri:build
```

---

## 📄 Licença

Distribuído sob a licença MIT. Textos bíblicos utilizados para fins educacionais e de estudo pessoal.
