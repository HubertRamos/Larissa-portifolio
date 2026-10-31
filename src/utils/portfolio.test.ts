import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getProjectBySlug,
  getPublishedProjects,
  getFeaturedProjects,
  filterProjects,
  getNextAndPrevProjects,
  validateContactForm,
  getDisciplinesList,
  getRecentProjects
} from './portfolio.ts';
import { projectsData } from '../data/projects.ts';
import { Project } from '../types/portfolio.ts';

// Mock dataset fixture for unit testing business logic independently of catalog state
const mockCatalog: Project[] = [
  {
    id: 'proj-01',
    title: 'Silhueta I: Estrutura Escultural',
    slug: 'estrutura-escultural',
    category: 'tailoring',
    categoryLabel: 'Alfaiataria & Silhueta',
    year: '2026',
    publishedAt: '2026-10-31',
    issueNumber: 'VOL. 01 / PEÇA 01',
    description: 'Estudo volumétrico em alfaiataria de corte seco.',
    coverImage: '/projects/estrutura-escultural/cover.jpg',
    gallery: ['/projects/estrutura-escultural/images/01.jpg'],
    featured: true,
    published: true,
  },
  {
    id: 'proj-02',
    title: 'Silhueta II: Draping em Crepe e Viés',
    slug: 'draping-crepe-vies',
    category: 'draping',
    categoryLabel: 'Draping & Moulage',
    year: '2026',
    publishedAt: '2026-10-24',
    issueNumber: 'VOL. 01 / PEÇA 02',
    description: 'Investigação tridimensional da gravidade do tecido.',
    coverImage: '/projects/draping-crepe-vies/cover.jpg',
    gallery: ['/projects/draping-crepe-vies/images/01.jpg'],
    featured: false,
    published: true,
  },
  {
    id: 'proj-draft',
    title: 'Projeto Rascunho',
    slug: 'projeto-rascunho',
    category: 'tailoring',
    description: 'Rascunho não publicado.',
    coverImage: '/projects/draft/cover.jpg',
    gallery: [],
    featured: false,
    published: false,
  },
];

test('Live projects catalog is currently ready and empty of published demo projects', () => {
  const published = getPublishedProjects(projectsData);
  // Must have 0 published demo projects, leaving the site clean for manual real content
  assert.equal(published.length, 0);

  // Template project must exist in raw data but have published: false
  const template = projectsData.find((p) => p.id === 'nome-do-projeto');
  assert.ok(template);
  assert.equal(template?.published, false);
});

test('getPublishedProjects filters out projects with published: false on fixtures', () => {
  const published = getPublishedProjects(mockCatalog);
  assert.equal(published.length, 2);
  assert.ok(published.every((p) => p.published === true));

  const hasDraft = published.some((p) => p.id === 'proj-draft');
  assert.equal(hasDraft, false);
});

test('getFeaturedProjects returns only published projects with featured: true on fixtures', () => {
  const featured = getFeaturedProjects(mockCatalog);
  assert.equal(featured.length, 1);
  assert.equal(featured[0].id, 'proj-01');
  assert.equal(featured[0].featured, true);
});

test('getProjectBySlug retrieves project accurately and blocks unpublished drafts', () => {
  const proj = getProjectBySlug(mockCatalog, 'estrutura-escultural');
  assert.ok(proj);
  assert.equal(proj?.id, 'proj-01');
  assert.equal(proj?.title, 'Silhueta I: Estrutura Escultural');

  // Should return undefined for draft / published: false project
  const hidden = getProjectBySlug(mockCatalog, 'projeto-rascunho');
  assert.equal(hidden, undefined);

  // Non-existent slug returns undefined
  const missing = getProjectBySlug(mockCatalog, 'non-existent-project');
  assert.equal(missing, undefined);

  // Live empty catalog returns undefined
  assert.equal(getProjectBySlug(projectsData, 'qualquer-projeto'), undefined);
});

test('filterProjects handles "all" and specific categories on published projects only', () => {
  const all = filterProjects(mockCatalog, 'all');
  assert.equal(all.length, 2);
  assert.ok(all.every((p) => p.published === true));

  const tailoring = filterProjects(mockCatalog, 'tailoring');
  assert.equal(tailoring.length, 1);
  assert.equal(tailoring[0].id, 'proj-01');

  const empty = filterProjects(mockCatalog, 'non-existing-cat');
  assert.equal(empty.length, 0);

  // Live empty catalog handles filtering gracefully
  assert.equal(filterProjects(projectsData, 'all').length, 0);
  assert.equal(filterProjects(projectsData, 'tailoring').length, 0);
});

test('getNextAndPrevProjects provides circular navigation strictly between published projects', () => {
  const nav = getNextAndPrevProjects(mockCatalog, 'estrutura-escultural');
  assert.ok(nav);
  assert.equal(nav?.next.slug, 'draping-crepe-vies');
  assert.equal(nav?.prev.slug, 'draping-crepe-vies');

  // Draft project is never next or prev
  assert.notEqual(nav?.next.slug, 'projeto-rascunho');
  assert.notEqual(nav?.prev.slug, 'projeto-rascunho');

  // Live empty catalog returns null
  assert.equal(getNextAndPrevProjects(projectsData, 'qualquer-projeto'), null);
});

test('validateContactForm checks required fields and email format', () => {
  const valid = validateContactForm({
    name: 'Helena Ribeiro',
    email: 'helena@example.com',
    type: 'collaboration',
    message: 'Gostaria de agendar uma visita editorial ao atelier.'
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const invalid = validateContactForm({
    name: '',
    email: 'invalid-email',
    message: 'short'
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);
});

test('getDisciplinesList builds list with count and all option from published items only', () => {
  const list = getDisciplinesList(mockCatalog);
  assert.ok(list.length > 1);
  assert.equal(list[0].id, 'all');
  assert.equal(list[0].count, 2);

  // Live empty catalog returns 1 item ("all" with count 0)
  const liveList = getDisciplinesList(projectsData);
  assert.equal(liveList.length, 1);
  assert.equal(liveList[0].id, 'all');
  assert.equal(liveList[0].count, 0);
});

test('syncProjects dynamically resolves project folders and paths correctly', async () => {
  const { syncProjects } = await import('../../scripts/build-projects.ts');
  const allProjects = syncProjects();
  assert.ok(allProjects.length >= 1);

  const template = allProjects.find((p) => p.slug === 'nome-do-projeto' || p.id === 'nome-do-projeto');
  assert.ok(template);
  assert.equal(template?.published, false);
});

test('getRecentProjects returns published projects sorted by publishedAt descending and filters out invalid dates', () => {
  const recent = getRecentProjects(mockCatalog, 4);
  assert.equal(recent.length, 2);
  assert.equal(recent[0].id, 'proj-01');
  assert.equal(recent[1].id, 'proj-02');

  // Must only contain published projects
  assert.ok(recent.every((p) => p.published === true));

  // Must only contain valid publishedAt dates
  assert.ok(recent.every((p) => p.publishedAt && !isNaN(Date.parse(p.publishedAt))));

  // Unpublished drafts must never appear
  const hasDraft = recent.some((p) => p.id === 'proj-draft');
  assert.equal(hasDraft, false);

  // Live empty catalog returns []
  const liveRecent = getRecentProjects(projectsData, 4);
  assert.equal(liveRecent.length, 0);
});
