# Fashion Portfolio — Guia de Personalização & Publicação

Este portfólio web de moda foi desenvolvido como uma demonstração visual de alta qualidade editorial para uma estudante de Design de Moda. A arquitetura foi concebida com separação estrita entre layout e conteúdo, permitindo ao desenvolvedor substituir 100% dos dados, imagens, croquis e contatos sem alterar a estrutura de componentes.

---

## 1. Estrutura de Arquivos

```
src/
├── config/
│   └── site.ts           # Identidade provisória, nome da designer, manifesto e contatos
├── data/
│   ├── projects.ts       # Coleções, fotos de lookbook, fichas técnicas e processos
│   └── atelier.ts        # Caderno de pesquisa: croquis, amostras têxteis e moulage
├── types/
│   └── portfolio.ts      # Tipagens TypeScript para validação dos dados
├── components/
│   ├── Header.tsx        # Top Bar editorial de 3 zonas (marca, links, contato)
│   ├── Footer.tsx        # Rodapé monográfico elegante com índice e canais
│   └── Lightbox.tsx      # Ampliador de imagens em alta resolução com controle por teclado
├── pages/
│   ├── HomePage.tsx      # Abertura editorial, manifesto e destaque
│   ├── SelectedWorksPage.tsx # Galeria com filtros de categoria
│   ├── ProjectDetailPage.tsx # Página dinâmica com narrativa, galeria, ficha técnica e processo
│   ├── AtelierPage.tsx   # Estudos, croquis e arquivo têxtil
│   ├── AboutPage.tsx     # Apresentação, pilares de criação e formação
│   └── ContactPage.tsx   # Formulário validado e canais de comunicação
└── utils/
    ├── portfolio.ts      # Funções de busca, filtros e validação
    └── portfolio.test.ts # Testes unitários automatizados
```

---

## 2. Como Personalizar o Portfólio

### Passo 1: Informações da Designer & Contato
Abra o arquivo `src/config/site.ts` e substitua pelos dados reais:
- `atelierName`: Nome da designer ou marca (Ex: "FASHION PORTFOLIO" ou nome pessoal)
- `designerRole`: Sua especialidade (Ex: "Design de Moda & Alfaiataria")
- `manifesto`: Frases ou parágrafos autorais que expressem sua visão estética
- `contactEmail`: E-mail profissional de contato
- `instagramHandle`: Perfil no Instagram

### Passo 2: Adicionando Coleções & Projetos Reais
Abra o arquivo `src/data/projects.ts`:
- Cada projeto possui:
  - `title`: Nome da peça ou coleção
  - `category`: Categoria ('tailoring', 'draping', 'textile', 'conceptual')
  - `concept`: Parágrafos explicando a narrativa e conceito
  - `coverImage`: Caminho da fotografia principal
  - `galleryImages`: Fotos adicionais para o lookbook
  - `technical`: Ficha técnica com tecidos, silhueta e acabamentos manuais
  - `process`: Fotos e notas de croquis, moulage e ensaios

### Passo 3: Adicionando Fotos e Croquis
1. Coloque os arquivos JPG/PNG de alta resolução dentro da pasta `src/assets/images/`.
2. No arquivo `projects.ts` ou `atelier.ts`, aponte para o caminho correspondente (exemplo: `"/src/assets/images/meu_croquis_01.jpg"`).
3. Todas as imagens contam com ampliação em tela cheia com alta fidelidade e legendas explicativas.

---

## 3. Comandos de Desenvolvimento e Produção

### Rodar localmente:
```bash
npm run dev
```

### Executar os testes unitários:
```bash
npx --yes tsx --test src/utils/portfolio.test.ts
```

### Compilar para produção:
```bash
npm run build
```
Os arquivos otimizados e prontos para publicação serão gerados na pasta `dist/`.
