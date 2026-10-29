# Portfólio de Moda — Guia de Manutenção de Projetos

Este guia técnico destina-se exclusivamente ao desenvolvedor responsável pela manutenção do portfólio. A aplicação opera **sem banco de dados ou painel administrativo**: toda a descoberta de projetos ocorre de forma automática durante o build a partir das pastas locais em `projects/`.

---

## 1. Estrutura de Pastas de um Projeto

Todos os projetos do portfólio residem dentro do diretório `/projects/` na raiz do repositório. Cada projeto possui sua própria pasta independente contendo seus dados e suas imagens:

```text
projects/
├── _template/                      <-- Molde pronto para duplicação (published: false)
│   ├── project.json
│   ├── cover.jpg
│   └── images/
│       └── look-01.jpg
├── estrutura-escultural/            <-- Pasta do projeto (slug amigável)
│   ├── project.json                <-- Arquivo único de dados do projeto
│   ├── cover.jpg                   <-- Imagem de capa
│   └── images/                     <-- Imagens adicionais da galeria
│       ├── 01.jpg
│       └── 02.jpg
└── draping-crepe-vies/
    ├── project.json
    ├── cover.jpg
    └── images/
        ├── 01.jpg
        └── 02.jpg
```

---

## 2. Como Cadastrar um Novo Projeto

Não é necessário editar listas em arquivos de código. Para adicionar uma nova peça ou coleção:

### Passo 1 — Duplicar a pasta molde
Copie a pasta `projects/_template/` e renomeie-a com o identificador do novo projeto (use letras minúsculas e hífens):
```bash
cp -r projects/_template projects/minha-nova-colecao
```

### Passo 2 — Inserir as imagens
- Coloque a imagem principal na raiz da pasta do projeto como `cover.jpg` (ou `.png` / `.webp`).
- Coloque os registros de lookbook e detalhes dentro da subpasta `images/` (ex: `images/01.jpg`, `images/croqui.jpg`).

### Passo 3 — Preencher o `project.json`
Abra `projects/minha-nova-colecao/project.json` e configure os campos.

---

## 3. Molde Completo e Válido (`project.json`)

```json
{
  "id": "proj-06",
  "title": "Capa Monolítica em Sarja Encerada",
  "slug": "capa-monolitica",
  "category": "tailoring",
  "categoryLabel": "Alfaiataria",
  "year": "2026",
  "issueNumber": "VOL. 01 / PEÇA 06",
  "description": "Estudo sobre geometria pura e rigidez material através de casaco arquitetural cortado em uma única peça de sarja pesada.",
  "summary": "Estudo sobre geometria pura e rigidez material através de casaco arquitetural.",
  "cover": "cover.jpg",
  "images": [
    "images/01.jpg",
    "images/02.jpg"
  ],
  "materials": [
    "Sarja de algodão encerado 420g/m²",
    "Entretela de crina armada à mão",
    "Forro de cupro acetinado"
  ],
  "credits": [
    "Criação e Modelagem: Larissa",
    "Fotografia Editorial: Arquivo de Ateliê"
  ],
  "references": [
    "Cristóbal Balenciaga — Os Casacos Esculturais dos Anos 50",
    "Arquitetura Monolítica & Brutalismo"
  ],
  "featured": true,
  "published": true
}
```

### Especificação dos Campos:

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único e estável do projeto. |
| `title` | string | Sim | Título da obra ou coleção para títulos e cabeçalhos. |
| `slug` | string | Opcional | Identificador amigável para a rota URL (padrão: nome da pasta). |
| `category` | string | Sim | Categoria técnica (`tailoring`, `draping`, `textile`, `conceptual`). |
| `description` | string | Sim | Conceito poético e explicação do processo. |
| `cover` | string | Sim | Nome do arquivo de capa dentro da pasta (ex: `"cover.jpg"`). |
| `images` | array | Opcional | Lista de imagens adicionais relativas à pasta (ex: `["images/01.jpg"]`). |
| `year` | string/null | Opcional | Ano de desenvolvimento. Se ausente, não deixa rótulo vazio. |
| `materials` | array/string | Opcional | Materiais e técnicas. Se omitido, a seção não é renderizada. |
| `credits` | array/string | Opcional | Créditos de fotografia, ateliê e colaboração. |
| `references` | array/string | Opcional | Fundamentação e referências visuais/artísticas. |
| `featured` | boolean | Opcional | Se `true`, exibe o projeto em destaque na página inicial. |
| `published` | boolean | Sim | Controla a visibilidade pública (`true` = visível, `false` = rascunho oculto). |

---

## 4. Como Publicar ou Manter em Rascunho

- **Projeto Público**: Defina `"published": true`. O projeto aparecerá na home, no catálogo de obras (`Selected Works`) e em sua rota individual.
- **Rascunho Oculto**: Defina `"published": false`. O projeto fica completamente invisível de toda a interface pública, rotas, filtros e navegações circulares.

---

## 5. Carregamento Automático no Build

O sistema utiliza um script de sincronização estática (`scripts/build-projects.ts`) integrado nativamente ao Vite:
1. Durante `npm run dev` ou `npm run build`, o script vasculha todas as pastas em `projects/`.
2. Lê e valida cada `project.json`.
3. Resolve os caminhos das imagens (`/projects/[pasta]/cover.jpg` e `/projects/[pasta]/images/...`).
4. Sincroniza os arquivos com `public/projects/` e compila `src/data/projects.generated.json`.
5. Em produção (`dist/projects/`), o Vite inclui todos os arquivos de imagem estáticos prontos para distribuição em CDN.

---

## 6. Testes Locais e Deploy (GitHub & Vercel)

### Testar localmente:
```bash
# Executa a descoberta de projetos e inicia o servidor local
npm run dev

# Executa a suíte de testes automatizados (testa resolução, rotas e filtros)
npm test

# Valida o build de produção
npm run build
```

### Publicar no Vercel:
Como a descoberta é automatizada no build, basta commitar a nova pasta e enviar para o GitHub:
```bash
git add projects/minha-nova-colecao
git commit -m "feat: adiciona nova colecao ao catalogo"
git push origin main
```
O Vercel executa `npm run build` automaticamente e atualiza o site no ar em segundos.
