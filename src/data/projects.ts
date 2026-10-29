/**
 * PORTFÓLIO DE MODA — FONTE ÚNICA DE DADOS DOS PROJETOS
 * 
 * Os projetos são descobertos e sincronizados automaticamente a partir das pastas
 * individuais em `/projects/[identificador]/project.json` durante o build.
 * 
 * Para adicionar um novo projeto:
 * 1. Duplique a pasta `/projects/_template/` com um novo identificador (ex: `projects/minha-colecao/`).
 * 2. Adicione sua capa (`cover.jpg` ou `cover.webp`) e imagens na subpasta `images/`.
 * 3. Preencha o `project.json` e altere `"published": true` quando desejar torná-lo público.
 * 4. Execute `npm run build` ou suba para o GitHub: o projeto é detectado e publicado automaticamente.
 */

import { Project } from '../types/portfolio';
import generatedProjects from './projects.generated.json';

export const projectsData: Project[] = generatedProjects as Project[];

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
