import { Project, ContactInquiry } from '../types/portfolio';

/**
 * Filtra e retorna apenas projetos publicados (published !== false)
 */
export function getPublishedProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.published !== false);
}

/**
 * Filtra projetos em destaque publicados
 */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return getPublishedProjects(projects).filter((p) => p.featured === true || p.isFeatured === true);
}

/**
 * Busca um projeto publicado por slug ou id.
 * Retorna undefined se o projeto não existir ou se published for false.
 */
export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
  if (!slug) return undefined;
  const published = getPublishedProjects(projects);
  return published.find((p) => p.slug === slug || p.id === slug);
}

/**
 * Filtra projetos por categoria, considerando apenas projetos publicados
 */
export function filterProjects(projects: Project[], category: string): Project[] {
  const published = getPublishedProjects(projects);
  if (!category || category === 'all') return published;
  return published.filter((p) => p.category === category);
}

/**
 * Retorna o projeto anterior e o próximo na lista de projetos publicados.
 * Garante navegação circular contínua sem vazar projetos ocultos.
 */
export function getNextAndPrevProjects(
  projects: Project[],
  currentSlug: string
): { next: Project; prev: Project } | null {
  const published = getPublishedProjects(projects);
  if (!published.length) return null;

  const currentIndex = published.findIndex((p) => p.slug === currentSlug || p.id === currentSlug);
  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % published.length;
  const prevIndex = (currentIndex - 1 + published.length) % published.length;

  return {
    next: published[nextIndex],
    prev: published[prevIndex],
  };
}

/**
 * Validação do formulário de contato do atelier
 */
export function validateContactForm(data: Partial<ContactInquiry>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Por favor, informe seu nome completo.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Informe um endereço de e-mail válido.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'A mensagem deve conter pelo menos 10 caracteres explicativos.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Constrói a lista de categorias disponíveis e suas contagens
 * a partir unicamente de projetos publicados.
 */
export function getDisciplinesList(projects: Project[]): { id: string; label: string; count: number }[] {
  const published = getPublishedProjects(projects);
  const map = new Map<string, { label: string; count: number }>();

  published.forEach((p) => {
    const label = p.categoryLabel || p.category.charAt(0).toUpperCase() + p.category.slice(1);
    const existing = map.get(p.category);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(p.category, { label, count: 1 });
    }
  });

  const list = Array.from(map.entries()).map(([id, val]) => ({
    id,
    label: val.label,
    count: val.count,
  }));

  return [
    { id: 'all', label: 'Todas as Obras', count: published.length },
    ...list,
  ];
}
