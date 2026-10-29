import { SiteConfig } from '../types/portfolio';

/**
 * CONFIGURAÇÃO GLOBAL DO PORTFÓLIO
 * -------------------------------------------------------------
 * Todos os textos, redes, contatos e identificação podem ser facilmente
 * personalizados neste único arquivo pelo desenvolvedor.
 */
export const defaultSiteConfig: SiteConfig = {
  atelierName: "LARISSA PORTFOLIO",
  tagline: "Estudos de Silhueta, Draping & Construção Vestimentar",
  subtitle: "Portfólio Editorial de Design de Moda",
  designerRole: "Design de Moda & Pesquisa Têxtil",
  manifesto: [
    "A roupa como arquitetura sobre a anatomia em repouso e movimento.",
    "Investigação contínua da transição entre o croquis e a tridimensionalidade da forma no busto.",
    "Rigor na escolha dos materiais: a precisão da alfaiataria, a fluidez do draping e a autenticidade das fibras."
  ],
  edition: "EDIÇÃO MONOGRÁFICA 01",
  season: "COLEÇÃO EXPERIMENTAL 2026",
  location: "Brasil",
  contactEmail: "contato@nãosei",
  instagramHandle: "@nãosei",
  linkedinUrl: "https://linkedin.com",
  showDemoNotice: false,
  notesForOwner: "Demonstração visual desenvolvida para apresentação. Os dados de projetos e contatos podem ser substituídos em src/config/site.ts e src/data/projects.ts."
};
