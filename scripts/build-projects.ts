import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectsDir = path.join(rootDir, 'projects');
const publicProjectsDir = path.join(rootDir, 'public', 'projects');
const generatedFile = path.join(rootDir, 'src', 'data', 'projects.generated.json');

/**
 * Scans the /projects/ folder at repository root, validates each project.json,
 * resolves cover and gallery paths, copies assets to public/projects/,
 * and outputs the compiled projects array into src/data/projects.generated.json.
 */
export function syncProjects() {
  if (!fs.existsSync(projectsDir)) {
    console.warn(`[sync-projects] Warning: "${projectsDir}" not found.`);
    return [];
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const projectDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.'));

  const loadedProjects: any[] = [];

  // Ensure public/projects exists
  fs.mkdirSync(publicProjectsDir, { recursive: true });

  for (const dir of projectDirs) {
    const dirName = dir.name;
    const projectFolder = path.join(projectsDir, dirName);
    const jsonPath = path.join(projectFolder, 'project.json');

    if (!fs.existsSync(jsonPath)) {
      continue;
    }

    try {
      const rawContent = fs.readFileSync(jsonPath, 'utf-8');
      const data = JSON.parse(rawContent);

      // Core fields and fallback defaults
      const id = String(data.id || dirName).trim();
      const title = String(data.title || dirName).trim();
      const slug = String(data.slug || dirName).trim();
      const category = String(data.category || 'editorial').trim();
      const description = String(data.description || '').trim();
      const published = data.published === true;
      const featured = data.featured === true;

      // Copy assets to public/projects/[dirName] so Vite serves them in dev and bundles them in build
      const destDir = path.join(publicProjectsDir, dirName);
      fs.mkdirSync(destDir, { recursive: true });
      fs.cpSync(projectFolder, destDir, { recursive: true });

      // Resolve coverImage
      let cover = data.cover || data.coverImage || 'cover.jpg';
      let coverImage = cover;
      if (!cover.startsWith('/') && !cover.startsWith('http')) {
        coverImage = `/projects/${dirName}/${cover}`;
      }

      // Resolve gallery images
      const rawImages = Array.isArray(data.images)
        ? data.images
        : Array.isArray(data.gallery)
        ? data.gallery
        : [];

      const gallery = rawImages.map((img: any) => {
        if (typeof img === 'string') {
          if (!img.startsWith('/') && !img.startsWith('http')) {
            return `/projects/${dirName}/${img}`;
          }
          return img;
        }
        if (img && typeof img === 'object') {
          let url = img.url || '';
          if (!url.startsWith('/') && !url.startsWith('http')) {
            url = `/projects/${dirName}/${url}`;
          }
          return {
            ...img,
            url,
          };
        }
        return img;
      });

      // Default gallery to cover if no gallery images provided
      if (gallery.length === 0 && coverImage) {
        gallery.push(coverImage);
      }

      // Build normalized project representation
      const project = {
        ...data,
        id,
        title,
        slug,
        category,
        description,
        coverImage,
        gallery,
        featured,
        published,
      };

      loadedProjects.push(project);
    } catch (err) {
      console.error(`[sync-projects] Error reading ${jsonPath}:`, err);
    }
  }

  // Predictable sorting: explicit order, or natural number in ID (e.g. proj-01), or alphabetical
  loadedProjects.sort((a, b) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order;
    }
    const numA = parseInt(String(a.id || '').replace(/\D/g, ''), 10);
    const numB = parseInt(String(b.id || '').replace(/\D/g, ''), 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return String(a.id || '').localeCompare(String(b.id || ''));
  });

  // Ensure src/data exists
  fs.mkdirSync(path.dirname(generatedFile), { recursive: true });
  fs.writeFileSync(generatedFile, JSON.stringify(loadedProjects, null, 2), 'utf-8');
  console.log(`[sync-projects] Synchronized ${loadedProjects.length} projects (${loadedProjects.filter(p => p.published).length} published) to ${generatedFile}`);

  return loadedProjects;
}

// Run directly if invoked from CLI
if (process.argv[1] && (process.argv[1].endsWith('build-projects.ts') || process.argv[1].endsWith('build-projects.js'))) {
  syncProjects();
}
