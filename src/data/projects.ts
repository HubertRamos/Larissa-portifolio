/**
 * PORTFÓLIO DE MODA — ARQUIVO CENTRAL DE PROJETOS & OBRAS
 * 
 * NOTA EDITORIAL DE DEMONSTRAÇÃO:
 * Os projetos listados abaixo são estudos de caso conceituais e fictícios,
 * criados para demonstrar a direção de arte, a hierarquia tipográfica e o layout editorial
 * deste portfólio. Ao personalizar para a proprietária, basta substituir os textos e
 * imagens pelos trabalhos reais de moda.
 * 
 * ESTRUTURA DOS CAMPOS DE CADA PROJETO:
 * - id: Identificador único e estável (ex: "proj-01")
 * - title: Título da peça ou coleção (ex: "Silhueta I: Estrutura Escultural")
 * - slug: Identificador amigável para URL (ex: "estrutura-escultural")
 * - category: Categoria do trabalho (ex: "tailoring", "draping", "textile", "conceptual")
 * - year: Ano de criação (opcional, ex: "2026")
 * - description: Descrição e conceito da criação
 * - coverImage: Caminho da imagem de capa (ex: "/projects/estrutura-escultural/cover.jpg")
 * - gallery: Lista de imagens adicionais (caminhos de string ou objetos com legenda)
 * - materials: Materiais e técnicas (opcional, string ou lista de strings)
 * - credits: Créditos de modelo, fotografia, ateliê (opcional, string ou lista de strings)
 * - references: Referências visuais, bibliográficas ou conceituais (opcional, string ou lista de strings)
 * - featured: Se true, aparece em destaque na página inicial (boolean)
 * - published: Se true, está visível no site; se false, fica completamente oculto (boolean)
 */

import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: "proj-01",
    title: "Silhueta I: Estrutura Escultural",
    slug: "estrutura-escultural",
    category: "tailoring",
    categoryLabel: "Alfaiataria Arquitetural",
    year: "2026",
    issueNumber: "VOL. 01 / PEÇA 01",
    description: "Estudo formal de casaco estruturado em lã pesada com gola escultural e forro acetinado em bordeaux. O projeto parte da rigidez da alfaiataria masculina tradicional e a descontrói através de curvas hiperbólicas e acolchoamento interno termo-moldado.",
    summary: "Estudo formal de casaco estruturado em lã pesada com gola escultural e forro acetinado em bordeaux.",
    concept: [
      "O projeto parte da rigidez da alfaiataria masculina tradicional e a descontrói através de curvas hiperbólicas e acolchoamento interno termo-moldado.",
      "A gola alta em camadas sobrepostas cria uma moldura cinemática para a clavícula, contrastando a austeridade do exterior sóbrio com a intimidade táctil do veludo bordeaux na face interna.",
      "A silhueta expandida nos ombros afunila organicamente em direção à cintura e quadril, explorando a ilusão de peso e levitação têxtil."
    ],
    coverImage: "/projects/estrutura-escultural/cover.jpg",
    gallery: [
      {
        url: "/projects/estrutura-escultural/cover.jpg",
        caption: "Vista frontal da peça montada. Lã fria pesada, acabamento entretelado manual.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/estrutura-escultural/01.jpg",
        caption: "Composição de materiais: lã pura preta, veludo bordeaux e tela de entretela.",
        credit: "Documentação de Materiais"
      },
      {
        url: "/projects/estrutura-escultural/02.jpg",
        caption: "Prova de manequim no atelier: ajuste de caimento e drapeado angular.",
        credit: "Arquivo de Ateliê"
      }
    ],
    galleryImages: [
      {
        url: "/projects/estrutura-escultural/cover.jpg",
        caption: "Vista frontal da peça montada. Lã fria pesada, acabamento entretelado manual.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/estrutura-escultural/01.jpg",
        caption: "Composição de materiais: lã pura preta, veludo bordeaux e tela de entretela.",
        credit: "Documentação de Materiais"
      },
      {
        url: "/projects/estrutura-escultural/02.jpg",
        caption: "Prova de manequim no atelier: ajuste de caimento e drapeado angular.",
        credit: "Arquivo de Ateliê"
      }
    ],
    materials: [
      "Lã virgem 480g/m² (Preto suave #201E1C)",
      "Veludo de seda pura (Bordeaux interno #713C42)",
      "Entretela de crina de cavalo armada à mão",
      "Cupro acetinado para mangas e forro estrutural"
    ],
    credits: [
      "Direção de Criação: Atelier de Moda (Demonstração)",
      "Modelagem e Alfaiataria: Confecção Experimental",
      "Documentação Fotográfica: Arquivo Editorial de Moda"
    ],
    references: [
      "Cristóbal Balenciaga — Os Casacos Esculturais dos Anos 50",
      "Brancusi — A Simplificação das Formas no Espaço",
      "Tratado de Alfaiataria Masculina Britânica & Desconstrução Japonesa"
    ],
    technical: {
      silhouette: "Estruturada em ampulheta geométrica com ombros ampliados e gola em funil facetado.",
      fabrication: [
        "Lã virgem 480g/m² (Preto suave)",
        "Veludo de seda pura (Bordeaux interno)",
        "Entretela de crina de cavalo armada à mão",
        "Cupro acetinado para mangas"
      ],
      colorPalette: ["#201E1C", "#713C42", "#B7A18B"],
      constructionTechniques: [
        "Pesponto picado invisível manual nas lapelas",
        "Costuras estruturais com pesponto de alívio térmico",
        "Cavas reforçadas com ombreiras esculturais em camadas graduadas"
      ],
      sampleSize: "Tamanho Protótipo 38 (Atelier Sample)",
      year: "2026"
    },
    process: [
      {
        id: "proc-01-1",
        title: "Estudo de Peso & Proporção",
        category: "sketch",
        caption: "Croquis inicial explorando o ângulo de abertura da gola e a linha de ombro rebaixada.",
        imageUrl: "/projects/croquis-anatomia-movimento/cover.jpg"
      },
      {
        id: "proc-01-2",
        title: "Seleção Têxtil Tátil",
        category: "textile",
        caption: "Ensaios de drapeado com sarja de lã vs lã cardada para determinar a resistência à gravidade.",
        imageUrl: "/projects/materia-tensao-trama/cover.jpg"
      },
      {
        id: "proc-01-3",
        title: "Draping no Busto de Alta-Costura",
        category: "draping",
        caption: "Modelagem tridimensional direta em tecido cru (moulage) para definir o volume das lapelas.",
        imageUrl: "/projects/estrutura-escultural/02.jpg"
      }
    ],
    outcomes: [
      "Protótipo funcional executado em escala 1:1 para ensaio editorial.",
      "Desenvolvimento de molde modular de 14 painéis para replicação e ajuste sob medida.",
      "Registro de resistência mecânica e comportamento da gola em repouso."
    ],
    featured: true,
    published: true,
    isFeatured: true,
    isDemo: true
  },
  {
    id: "proj-02",
    title: "Draping II: Crepe em Viés",
    slug: "draping-crepe-vies",
    category: "draping",
    categoryLabel: "Moulage & Fluidez",
    year: "2026",
    issueNumber: "VOL. 01 / PEÇA 02",
    description: "Vestido assimétrico de seda marfim moldado diretamente no busto com dobras plissadas em leque radial. Uma investigação sobre as leis da gravidade e a elasticidade natural de fios tecidos em corte enviesado a 45 graus.",
    summary: "Vestido assimétrico de seda marfim moldado diretamente no busto com dobras plissadas em leque radial.",
    concept: [
      "Uma investigação sobre as leis da gravidade e a elasticidade natural de fios tecidos em corte enviesado a 45 graus.",
      "Diferente da alfaiataria cortada em plano, o vestido nasce da manipulação contínua do tecido marfim no corpo tridimensional, sem costuras laterais rígidas.",
      "O leque de plissados assimétricos envolve o tronco, criando uma cascata rítmica que altera sua silhueta conforme o movimento da modelo."
    ],
    coverImage: "/projects/draping-crepe-vies/cover.jpg",
    gallery: [
      {
        url: "/projects/draping-crepe-vies/cover.jpg",
        caption: "Vestido completo em movimento contra concreto aparente e luz natural matinal.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/draping-crepe-vies/01.jpg",
        caption: "Anotações de proporção e ângulo de inclinação do decote assimétrico.",
        credit: "Arquivo de Caderno de Croquis"
      },
      {
        url: "/projects/draping-crepe-vies/02.jpg",
        caption: "Amostragem de densidade do crepe marfim e caimento com fio torcido.",
        credit: "Laboratório de Tecelagem"
      }
    ],
    galleryImages: [
      {
        url: "/projects/draping-crepe-vies/cover.jpg",
        caption: "Vestido completo em movimento contra concreto aparente e luz natural matinal.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/draping-crepe-vies/01.jpg",
        caption: "Anotações de proporção e ângulo de inclinação do decote assimétrico.",
        credit: "Arquivo de Caderno de Croquis"
      },
      {
        url: "/projects/draping-crepe-vies/02.jpg",
        caption: "Amostragem de densidade do crepe marfim e caimento com fio torcido.",
        credit: "Laboratório de Tecelagem"
      }
    ],
    materials: [
      "Crepe georgette de seda pura 100% (Marfim Ivory #F2EEE7)",
      "Linho rústico cru para estrutura do corselete interno",
      "Fios de seda pura para acabamentos de bainha de lenço rolottê"
    ],
    credits: [
      "Moulage & Drapeado: Estudo Experimental de Ateliê",
      "Fotografia Editorial: Arquivo de Demonstração"
    ],
    references: [
      "Madeleine Vionnet — A Revolução do Corte em Viés (1920-1930)",
      "Madame Grès — Os Plissados Esculturais Clássicos",
      "Gravidade e Tensão Têxtil na Escultura Moderna"
    ],
    technical: {
      silhouette: "Fluida e assimétrica em coluna desconstruída com leque plissado diagonal.",
      fabrication: [
        "Crepe georgette de seda pura 100% (Marfim Ivory #F2EEE7)",
        "Linho rústico cru para estrutura do corselete interno",
        "Fios de seda pura para acabamentos de bainha de lenço"
      ],
      colorPalette: ["#F2EEE7", "#B7A18B", "#201E1C"],
      constructionTechniques: [
        "Corte enviesado a 45° sem tensão mecânica de tração",
        "Plissado artesanal fixado ponto a ponto com agulha fina",
        "Bainha de lenço rolottê feita à mão com 2mm de espessura"
      ],
      sampleSize: "Ajustável (Estrutura de Amarração Interna)",
      year: "2026"
    },
    process: [
      {
        id: "proc-02-1",
        title: "Estudos de Moulage em Algodão",
        category: "draping",
        caption: "Alfinetamento em algodão fino para mapear a linha de tensão dorsal e decote.",
        imageUrl: "/projects/estrutura-escultural/02.jpg"
      },
      {
        id: "proc-02-2",
        title: "Cálculo de Transição Angular",
        category: "sketch",
        caption: "Diagrama do plissado radial e cálculo da abertura da saia em movimento.",
        imageUrl: "/projects/croquis-anatomia-movimento/cover.jpg"
      }
    ],
    outcomes: [
      "Peça de corte contínuo sem quebras no viés central.",
      "Comportamento cinético testado em passarela simulada.",
      "Técnica de rolottê manual refinada para peças fluidas."
    ],
    featured: true,
    published: true,
    isFeatured: true,
    isDemo: true
  },
  {
    id: "proj-03",
    title: "Matéria III: Tensão & Trama",
    slug: "materia-tensao-trama",
    category: "textile",
    categoryLabel: "Pesquisa Têxtil & Textura",
    year: "2026",
    issueNumber: "VOL. 01 / PEÇA 03",
    description: "Laboratório de contrastes tácteis entre a rusticidade do linho artesanal e o brilho velado do cetim bordeaux. Uma investigação sobre a união física de tecidos com elasticidades opostas sob costura manual.",
    summary: "Laboratório de contrastes tácteis entre a rusticidade do linho artesanal e o brilho velado do cetim bordeaux.",
    concept: [
      "Uma ode à materialidade pura da confecção: o que acontece quando tecidos com coeficientes de elasticidade diametralmente opostos são unidos sob costura manual?",
      "Este estudo documenta o diálogo tátil entre a trama irregular do linho cru e a densidade de veludo e cetim estruturado.",
      "As amostras foram submetidas a testes de vapor, corte desfiado e engomagem natural para criar novas superfícies para coleções futuras."
    ],
    coverImage: "/projects/materia-tensao-trama/cover.jpg",
    gallery: [
      {
        url: "/projects/materia-tensao-trama/cover.jpg",
        caption: "Mesa de corte com amostras selecionadas: lã cardada, linho cru e cetim bordeaux.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/materia-tensao-trama/01.jpg",
        caption: "Intercalação de camadas têxteis sobre o manequim de madeira.",
        credit: "Ensaio de Composição Têxtil"
      }
    ],
    galleryImages: [
      {
        url: "/projects/materia-tensao-trama/cover.jpg",
        caption: "Mesa de corte com amostras selecionadas: lã cardada, linho cru e cetim bordeaux.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/materia-tensao-trama/01.jpg",
        caption: "Intercalação de camadas têxteis sobre o manequim de madeira.",
        credit: "Ensaio de Composição Têxtil"
      }
    ],
    materials: [
      "Linho rústico desfiado à mão com urdume irregular",
      "Cetim duchesse bordeaux de alta densidade",
      "Lã bouclé crua preta com textura tridimensional"
    ],
    credits: [
      "Pesquisa Têxtil: Laboratório de Superfícies",
      "Ensaios de Fricção: Oficina de Prototipagem"
    ],
    references: [
      "Anni Albers — On Weaving e a Tensão Estrutural do Fio",
      "Arte Povera — A Valorização da Matéria Crua e Textura",
      "Arquivos Têxteis de Lyon & Amostragem Artesanal"
    ],
    technical: {
      silhouette: "Painéis têxteis experimentais e estudo de lapela híbrida desmontável.",
      fabrication: [
        "Linho rústico desfiado à mão com urdume irregular",
        "Cetim duchesse bordeaux de alta densidade",
        "Lã bouclé crua preta com textura tridimensional"
      ],
      colorPalette: ["#201E1C", "#F2EEE7", "#713C42", "#B7A18B"],
      constructionTechniques: [
        "União de tramas sem costura visível por entrelaçamento",
        "Desfiamento controlado com fixação por ponto caseado fino",
        "Tratamento de encolhimento prévio em banho frio"
      ],
      sampleSize: "Série de Swatches de 40x60cm",
      year: "2026"
    },
    process: [
      {
        id: "proc-03-1",
        title: "Desfiamento & Borda Viva",
        category: "textile",
        caption: "Remoção fio a fio para revelar a espinha dorsal da trama de linho.",
        imageUrl: "/projects/materia-tensao-trama/cover.jpg"
      },
      {
        id: "proc-03-2",
        title: "Ensaios de Combinação Cromática",
        category: "sketch",
        caption: "Anotações de refletância entre o mate da lã e o brilho contido do bordeaux.",
        imageUrl: "/projects/croquis-anatomia-movimento/cover.jpg"
      }
    ],
    outcomes: [
      "Catálogo tátil de 8 variações de toque e espessura.",
      "Fórmula de costura mista entre linho e cetim sem repuxo térmico.",
      "Definição da paleta têxtil da monografia inaugural."
    ],
    featured: false,
    published: true,
    isFeatured: false,
    isDemo: true
  },
  {
    id: "proj-04",
    title: "Croquis IV: Anatomia do Movimento",
    slug: "croquis-anatomia-movimento",
    category: "conceptual",
    categoryLabel: "Estudos de Silhueta",
    year: "2026",
    issueNumber: "VOL. 01 / PEÇA 04",
    description: "Caderno de desenhos gestuais a grafite e lavagem de aquarela investigando o volume em transição corporal. Uma série de croquis de moda que captura a tensão muscular e a inércia da alfaiataria em passo acelerado.",
    summary: "Caderno de desenhos gestuais a grafite e lavagem de aquarela investigando o volume em transição corporal.",
    concept: [
      "Antes do corte, existe o traço. Uma série de croquis de moda que não busca apenas representar roupas, mas capturar a tensão muscular e a inércia da alfaiataria em passo acelerado.",
      "Traços rápidos em carvão e grafite combinados com aguadas taupe e marfim definem a atitude, o peso dos tecidos e o equilíbrio da figura contemporânea.",
      "Estes estudos servem como a base visual para as proporções das futuras coleções do portfólio."
    ],
    coverImage: "/projects/croquis-anatomia-movimento/cover.jpg",
    gallery: [
      {
        url: "/projects/croquis-anatomia-movimento/cover.jpg",
        caption: "Croquis em papel artesanal de algodão com acabamento em barbas naturais.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/croquis-anatomia-movimento/01.jpg",
        caption: "Transposição do desenho bidimensional para o busto volumétrico.",
        credit: "Arquivo de Ateliê"
      }
    ],
    galleryImages: [
      {
        url: "/projects/croquis-anatomia-movimento/cover.jpg",
        caption: "Croquis em papel artesanal de algodão com acabamento em barbas naturais.",
        credit: "Estudo Conceitual de Demonstração / Fashion Portfolio"
      },
      {
        url: "/projects/croquis-anatomia-movimento/01.jpg",
        caption: "Transposição do desenho bidimensional para o busto volumétrico.",
        credit: "Arquivo de Ateliê"
      }
    ],
    materials: [
      "Papel algodão 300g/m² com fibra aparente e borda rústica",
      "Grafite macio 6B, carvão vegetal e tinta nanquim japonesa",
      "Pigmentos de aquarela em tons taupe e terra"
    ],
    credits: [
      "Ilustração e Pesquisa Visual: Atelier Autoral",
      "Técnicas de Aguada: Arquivo de Desenho de Moda"
    ],
    references: [
      "René Gruau — A Síntese do Traço e a Elegância Gráfica",
      "Yves Saint Laurent — Croquis de Trabalho e Anotações Marginais",
      "Desenho Anatômico de Egon Schiele"
    ],
    technical: {
      silhouette: "Desenho figurativo de alta proporção (10 cabeças) e estudo de drapeado linear.",
      fabrication: [
        "Papel algodão 300g/m² com fibra aparente",
        "Grafite macio 6B, carvão vegetal e tinta nanquim",
        "Pigmentos aquarela em tons taupe e terra"
      ],
      colorPalette: ["#F2EEE7", "#201E1C", "#B7A18B"],
      constructionTechniques: [
        "Desenho gestual livre sem rascunho geométrico prévio",
        "Lavagem de aguada para demarcação de sombras e profundidade",
        "Anotações marginais de medidas e instruções de moulage"
      ],
      sampleSize: "Folhas A3 Avulsas",
      year: "2026"
    },
    process: [
      {
        id: "proc-04-1",
        title: "Traço Direto & Proporção",
        category: "sketch",
        caption: "Exploração de três variações de comprimento de casaco com barra assimétrica.",
        imageUrl: "/projects/croquis-anatomia-movimento/cover.jpg"
      }
    ],
    outcomes: [
      "24 pranchas de silhueta aprovadas para pesquisa de modelagem plana.",
      "Definição dos códigos visuais: cintura marcada, ombro projetado e bainhas em movimento.",
      "Base de proporções adotada para os protótipos em tecido."
    ],
    featured: false,
    published: true,
    isFeatured: false,
    isDemo: true
  },
  {
    // PROJETO DEMONSTRATIVO EM RASCUNHO / OCULTO:
    // Este projeto está com published: false. Ele existe no arquivo de dados
    // mas está 100% oculto da navegação, catálogo e página inicial.
    // Para ativá-lo no site, basta alterar published para true.
    id: "proj-05-draft",
    title: "Estudo Oculto: Arquivo em Desenvolvimento (Rascunho)",
    slug: "projeto-oculto-rascunho",
    category: "tailoring",
    categoryLabel: "Estudos Experimentais",
    year: "2026",
    issueNumber: "VOL. 01 / RASCUNHO",
    description: "Projeto experimental em processo de maturação têxtil no atelier. Permanece oculto até a conclusão dos testes de modelagem.",
    summary: "Projeto experimental em processo de maturação têxtil no atelier.",
    coverImage: "/projects/projeto-oculto-rascunho/cover.jpg",
    gallery: [
      "/projects/projeto-oculto-rascunho/cover.jpg"
    ],
    materials: "Linho encerado e sarja pesada",
    credits: "Equipe de Modelagem",
    references: "Pesquisa interna de atelier",
    featured: false,
    published: false,
    isFeatured: false,
    isDemo: true
  }
];

/**
 * Retorna todos os projetos cadastrados (incluindo rascunhos não publicados)
 */
export function getAllProjects(): Project[] {
  return projectsData;
}

/**
 * Retorna somente os projetos ativos para exibição no site (published: true)
 */
export function getPublishedProjects(): Project[] {
  return projectsData.filter((p) => p.published === true);
}

/**
 * Retorna os projetos em destaque para a página inicial (published: true && featured: true)
 */
export function getFeaturedProjects(): Project[] {
  return projectsData.filter((p) => p.published === true && (p.featured === true || p.isFeatured === true));
}

/**
 * Busca um projeto publicado pelo slug ou id
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  return getPublishedProjects().find((p) => p.slug === slug || p.id === slug);
}
