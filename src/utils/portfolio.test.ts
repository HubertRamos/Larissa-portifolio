import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getProjectBySlug,
  getPublishedProjects,
  getFeaturedProjects,
  filterProjects,
  getNextAndPrevProjects,
  validateContactForm,
  getDisciplinesList
} from './portfolio.ts';
import { projectsData } from '../data/projects.ts';

test('getPublishedProjects filters out projects with published: false', () => {
  const published = getPublishedProjects(projectsData);
  assert.ok(published.length > 0);
  assert.ok(published.every((p) => p.published === true));

  // The draft project and the template folder must not be included in published projects
  const hasDraft = published.some((p) => p.id === 'proj-05-draft' || p.slug === 'projeto-oculto-rascunho');
  assert.equal(hasDraft, false);

  const hasTemplate = published.some((p) => p.id === 'nome-do-projeto' || p.slug === '_template');
  assert.equal(hasTemplate, false);
});

test('getFeaturedProjects returns only published projects that have featured: true', () => {
  const featured = getFeaturedProjects(projectsData);
  assert.ok(featured.length > 0);
  assert.ok(featured.every((p) => p.published === true && (p.featured === true || p.isFeatured === true)));
});

test('getProjectBySlug retrieves project accurately and blocks unpublished drafts', () => {
  const proj = getProjectBySlug(projectsData, 'estrutura-escultural');
  assert.ok(proj);
  assert.equal(proj?.id, 'proj-01');
  assert.equal(proj?.title, 'Silhueta I: Estrutura Escultural');

  // Should return undefined for draft / published: false project
  const hidden = getProjectBySlug(projectsData, 'projeto-oculto-rascunho');
  assert.equal(hidden, undefined);

  // Non-existent slug returns undefined
  const missing = getProjectBySlug(projectsData, 'non-existent-project');
  assert.equal(missing, undefined);
});

test('filterProjects handles "all" and specific categories on published projects only', () => {
  const all = filterProjects(projectsData, 'all');
  const published = getPublishedProjects(projectsData);
  assert.equal(all.length, published.length);
  assert.ok(all.every((p) => p.published === true));

  const tailoring = filterProjects(projectsData, 'tailoring');
  assert.ok(tailoring.length >= 1);
  assert.ok(tailoring.every((p) => p.category === 'tailoring' && p.published === true));

  const empty = filterProjects(projectsData, 'non-existing-cat');
  assert.equal(empty.length, 0);
});

test('getNextAndPrevProjects provides circular navigation strictly between published projects', () => {
  const published = getPublishedProjects(projectsData);
  const nav = getNextAndPrevProjects(projectsData, 'estrutura-escultural');
  assert.ok(nav);
  assert.equal(nav?.next.slug, 'draping-crepe-vies');
  assert.equal(nav?.prev.slug, published[published.length - 1].slug);

  // Draft project is never next or prev
  assert.notEqual(nav?.next.slug, 'projeto-oculto-rascunho');
  assert.notEqual(nav?.prev.slug, 'projeto-oculto-rascunho');
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
  const published = getPublishedProjects(projectsData);
  const list = getDisciplinesList(projectsData);
  assert.ok(list.length > 1);
  assert.equal(list[0].id, 'all');
  assert.equal(list[0].count, published.length);
});

test('syncProjects dynamically resolves project folders and paths correctly', async () => {
  const { syncProjects } = await import('../../scripts/build-projects.ts');
  const allProjects = syncProjects();
  assert.ok(allProjects.length >= 5);

  const escultural = allProjects.find((p) => p.slug === 'estrutura-escultural');
  assert.ok(escultural);
  assert.equal(escultural?.coverImage, '/projects/estrutura-escultural/cover.jpg');
  assert.ok(escultural?.gallery.includes('/projects/estrutura-escultural/images/01.jpg'));

  // Ensure published is boolean
  assert.equal(typeof escultural?.published, 'boolean');
  assert.equal(typeof escultural?.featured, 'boolean');
});

