# Portfólio de Moda — Guia de Manutenção & Publicação (Vercel & GitHub)

Este projeto é uma publicação digital editorial de moda voltada para estudantes e designers, desenvolvida em React, TypeScript, Vite e Tailwind CSS.

A aplicação foi estruturada para ser **100% autônoma, sem necessidade de banco de dados, painéis administrativos complexos ou autenticação**. Toda a gestão de projetos é feita diretamente no código e nas pastas locais do repositório, garantindo máximo controle criativo, segurança e facilidade de deploy contínuo na Vercel via GitHub.

---

## Sumário do Guia

1. [Onde colocar as imagens do novo projeto](#1-onde-colocar-as-imagens-do-novo-projeto)
2. [Onde cadastrar as informações do projeto](#2-onde-cadastrar-as-informações-do-projeto)
3. [Como escolher a imagem de capa](#3-como-escolher-a-imagem-de-capa)
4. [Como adicionar imagens à galeria](#4-como-adicionar-imagens-à-galeria)
5. [Como configurar categoria, ano, créditos e materiais (Campos Opcionais)](#5-como-configurar-categoria-ano-créditos-e-materiais)
6. [Como destacar um projeto na página inicial (`featured: true`)](#6-como-destacar-um-projeto-na-página-inicial)
7. [Como esconder um projeto sem apagar seus dados (`published: false`)](#7-como-esconder-um-projeto-sem-apagar-seus-dados)
8. [Como conferir se o caminho das imagens está correto](#8-como-conferir-se-o-caminho-das-imagens-está-correto)
9. [Como testar localmente antes de publicar](#9-como-testar-localmente-antes-de-publicar)
10. [Como publicar as alterações no Vercel pelo GitHub](#10-como-publicar-as-alterações-no-vercel-pelo-github)

---

## 1. Onde colocar as imagens do novo projeto

Todas as imagens de projetos devem ser salvas dentro do diretório `public/projects/`.

Para manter a organização, crie uma subpasta com o mesmo **slug** (identificador) do seu projeto:

```bash
public/
  └── projects/
        ├── estrutura-escultural/
        │     ├── cover.jpg
        │     ├── 01.jpg
        │     └── 02.jpg
        ├── meu-novo-projeto/      <-- Pasta do seu novo projeto
        │     ├── cover.jpg
        │     ├── 01.jpg
        │     └── 02.jpg
```

> **Dica**: Utilize formatos otimizados para web como `.jpg`, `.png` ou `.webp`. Mantenha as imagens com boa resolução (ex.: largura entre 1600px e 2400px para fotografia editorial), comprimidas para não deixar o carregamento pesado.

---

## 2. Onde cadastrar as informações do projeto

Todas as informações de conteúdo ficam centralizadas no arquivo:

📁 **`src/data/projects.ts`**

Para adicionar um novo projeto, abra esse arquivo e insira um novo objeto dentro do array `projectsData`:

```typescript
{
  id: "proj-06",
  title: "Capa Monolítica em Sarja",
  slug: "capa-monolitica",
  category: "tailoring",
  year: "2026",
  description: "Investigação sobre a geometria pura da alfaiataria sem costuras laterais.",
  coverImage: "/projects/capa-monolitica/cover.jpg",
  gallery: [
    "/projects/capa-monolitica/cover.jpg",
    "/projects/capa-monolitica/01.jpg",
    "/projects/capa-monolitica/02.jpg"
  ],
  materials: [
    "Sarja de algodão encerado 380g/m²",
    "Entretela de crina de cavalo armada à mão"
  ],
  credits: [
    "Direção Criativa: Nome da Designer",
    "Fotografia Editorial: Arquivo de Ateliê"
  ],
  references: [
    "Cristóbal Balenciaga (1958)",
    "Arquitetura Brutalista & Formas Monolíticas"
  ],
  featured: true,
  published: true
}
```

Ao salvar o arquivo, o site atualiza a listagem automaticamente.

---

## 3. Como escolher a imagem de capa

No campo `coverImage`, indique o caminho relativo à pasta `public`:

```typescript
coverImage: "/projects/meu-novo-projeto/cover.jpg",
```

Essa imagem será utilizada:
- Como banner principal no catálogo de obras (`Selected Works`).
- No card da página inicial (se estiver marcado como destaque).
- No topo da página de detalhes do projeto, com suporte ao zoom em tela cheia (lightbox).

---

## 4. Como adicionar imagens à galeria

O campo `gallery` aceita duas formas simples:

### Opção A — Apenas os caminhos das imagens (Mais simples)
```typescript
gallery: [
  "/projects/meu-novo-projeto/01.jpg",
  "/projects/meu-novo-projeto/02.jpg",
  "/projects/meu-novo-projeto/03.jpg"
]
```

### Opção B — Com legendas editoriais e créditos específicos
```typescript
gallery: [
  {
    url: "/projects/meu-novo-projeto/01.jpg",
    caption: "Vista das costas com pregas duplas invertidas.",
    credit: "Fotografia de Lookbook"
  },
  {
    url: "/projects/meu-novo-projeto/02.jpg",
    caption: "Detalhe do acabamento interno em viés de seda marfim."
  }
]
```

Ambas as formas abrem a imagem em alta resolução ao clicar.

---

## 5. Como configurar categoria, ano, créditos e materiais

### Categorias disponíveis:
Você pode utilizar qualquer categoria. As mais comuns no portfólio:
- `"tailoring"`: Alfaiataria e modelagem estruturada
- `"draping"`: Moulage, drapeados e fluidez têxtil
- `"textile"`: Pesquisa de tecidos, materiais e superfícies
- `"conceptual"`: Estudos de silhueta, croquis e coleções experimentais

### O que acontece se os campos opcionais não forem preenchidos?
O sistema foi desenvolvido de forma resiliente para **nunca quebrar o layout nem deixar rótulos vazios**:
- Se `year` não for informado, a data simplesmente não é exibida na etiqueta.
- Se `materials` não for preenchido, a seção de materiais é omitida elegantemente sem deixar espaços em branco.
- Se `credits` ou `references` não forem preenchidos, seus respectivos blocos não aparecem na página de detalhes.
- Se `technical` ou `process` não forem definidos, as abas correspondentes na página de detalhes não são geradas, mantendo a leitura limpa e focada no conceito e nas fotografias.

---

## 6. Como destacar um projeto na página inicial

Basta definir o campo `featured` como `true`:

```typescript
featured: true,
```

- O primeiro projeto com `featured: true` ocupará a posição de destaque principal na página inicial (`Hero Showcase`), com visual amplo e assimétrico.
- Os demais projetos destacados aparecem nos blocos secundários logo abaixo.
- Para remover o destaque, defina `featured: false`.

---

## 7. Como esconder um projeto sem apagar seus dados

Se você estiver preparando um projeto novo que ainda não está pronto para ser visto, ou quiser arquivar uma peça temporariamente, altere o campo `published`:

```typescript
published: false,
```

### O que acontece com `published: false`:
- O projeto **desaparece instantaneamente** da página inicial.
- Não aparece no catálogo de obras (`Selected Works`).
- Não é contabilizado nas categorias nem nos filtros.
- A página de detalhes não fica acessível nem mesmo digitando o link direto (exibe mensagem de projeto não localizado).
- Os botões de navegação "Obra Anterior" e "Próxima Obra" pulam esse projeto.
- Quando quiser publicá-lo, basta alterar de volta para `published: true`.

---

## 8. Como conferir se o caminho das imagens está correto

Lembre-se da regra de ouro do Vite / Vercel para arquivos na pasta `public`:

| Onde o arquivo está salvo | Como deve ser escrito no código |
| :--- | :--- |
| `public/projects/obra-01/cover.jpg` | `"/projects/obra-01/cover.jpg"` |
| `public/projects/obra-01/01.jpg` | `"/projects/obra-01/01.jpg"` |

⚠️ **Atenção**:
- Sempre inicie o caminho com barra `/` (ex.: `"/projects/..."` e **não** `"projects/..."` nem `"./public/..."`).
- Os nomes de arquivos e pastas no Linux / Vercel diferenciam maiúsculas de minúsculas (`cover.jpg` é diferente de `Cover.JPG`). Mantenha tudo em minúsculas e sem espaços ou acentos.

---

## 9. Como testar localmente antes de publicar

Antes de enviar alterações para o GitHub ou Vercel, teste no seu computador:

1. **Instalar dependências (caso seja a primeira vez)**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador para navegar pelas páginas e conferir imagens e textos.

3. **Verificar se a compilação de produção passa sem erros**:
   ```bash
   npm run build
   ```
   Se o comando gerar a pasta `dist` sem mensagens de erro, o projeto está 100% pronto para publicação!

4. **Rodar os testes automatizados**:
   ```bash
   npm test
   ```
   (Executa `npx tsx --test src/utils/portfolio.test.ts` para verificar os filtros e buscas).

---

## 10. Como publicar as alterações no Vercel pelo GitHub

### Passo 1 — Enviar as mudanças para o GitHub
Após adicionar suas fotos e editar `src/data/projects.ts`, rode no terminal:

```bash
git add .
git commit -m "Adiciona novo projeto de alfaiataria ao portfólio"
git push origin main
```

### Passo 2 — Importação e Deploy no Vercel (Configuração Inicial)
1. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
2. Clique em **Add New...** > **Project**.
3. Selecione o repositório do portfólio.
4. O Vercel detectará automaticamente o framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Clique em **Deploy**.

### Passo 3 — Deploys Automáticos
A partir de agora, **a cada `git push` no branch `main`**, a Vercel compila e atualiza o seu site no ar automaticamente em poucos segundos!

O arquivo `vercel.json` incluso na raiz do projeto já contém a regra de reescrita para Single Page Application (SPA), garantindo que URLs diretas e recarregamentos de página funcionem perfeitamente.
