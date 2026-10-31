import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectsDir = path.join(rootDir, 'projects');
const publicProjectsDir = path.join(rootDir, 'public', 'projects');
const generatedFile = path.join(rootDir, 'src', 'data', 'projects.generated.json');

const COMMON_IMAGE_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.avif', '.gif', '.svg'];
const STANDARD_COVER_CANDIDATES = [
  'cover.webp',
  'cover.jpg',
  'cover.jpeg',
  'cover.png',
  'cover.avif',
  'capa.webp',
  'capa.jpg',
  'capa.jpeg',
  'capa.png',
  'capa.avif',
  'hero.webp',
  'hero.jpg',
  'hero.jpeg',
  'hero.png',
  'hero.avif',
];

/**
 * Normalizes and resolves a requested image path against the actual files on disk inside a project folder.
 * Supports:
 * - Relative paths: "cover.jpg", "images/look-01.jpg", "./images/look-01.jpg"
 * - Root-relative and project-prefixed paths: "/projects/Ben10/cover.jpg", "projects/Ben10/cover.jpg", "/images/01.jpg"
 * - Automatic search in root or images/ subfolder if omitted
 * - Case-insensitive matching on disk
 * - Common extension matching (.webp, .jpg, .jpeg, .png, .avif)
 */
function resolveProjectImagePath(
  projectFolder: string,
  dirName: string,
  rawPath?: string
): string | null {
  if (!rawPath || typeof rawPath !== 'string') return null;
  const trimmed = rawPath.trim();
  if (!trimmed) return null;

  // Preserve external URLs (HTTP, HTTPS, Data URLs)
  if (/^(https?:|\/\/|data:)/i.test(trimmed)) {
    return trimmed;
  }

  // Clean path: strip leading slashes, dot-slashes, and redundant /projects/[dirName]/ prefix
  let cleanRel = trimmed.replace(/^\.?\/+/, '');
  const prefixRegex = new RegExp(`^projects\/${dirName}\/`, 'i');
  cleanRel = cleanRel.replace(prefixRegex, '');

  // 1. Exact match on disk
  const exactDiskPath = path.join(projectFolder, cleanRel);
  if (fs.existsSync(exactDiskPath) && fs.statSync(exactDiskPath).isFile()) {
    return `/projects/${dirName}/${cleanRel}`;
  }

  // 2. Check in images/ subfolder if not prefixed, or at root if prefixed with images/
  if (!cleanRel.startsWith('images/')) {
    const insideImagesDisk = path.join(projectFolder, 'images', cleanRel);
    if (fs.existsSync(insideImagesDisk) && fs.statSync(insideImagesDisk).isFile()) {
      return `/projects/${dirName}/images/${cleanRel}`;
    }
  } else {
    const strippedImagesDisk = path.join(projectFolder, cleanRel.replace(/^images\//, ''));
    if (fs.existsSync(strippedImagesDisk) && fs.statSync(strippedImagesDisk).isFile()) {
      return `/projects/${dirName}/${cleanRel.replace(/^images\//, '')}`;
    }
  }

  // 3. Case-insensitive search on disk in projectFolder or projectFolder/images
  const targetBaseName = path.basename(cleanRel);
  const targetDirName = path.dirname(cleanRel);
  const searchDirs = [
    targetDirName !== '.' ? path.join(projectFolder, targetDirName) : projectFolder,
    path.join(projectFolder, 'images'),
    projectFolder,
  ];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    try {
      const files = fs.readdirSync(dir);
      // Case-insensitive exact name
      const matchedExact = files.find((f) => f.toLowerCase() === targetBaseName.toLowerCase());
      if (matchedExact) {
        const rel = path.relative(projectFolder, path.join(dir, matchedExact)).replace(/\\/g, '/');
        return `/projects/${dirName}/${rel}`;
      }

      // Base name with alternative common extension
      const targetNameWithoutExt = path.parse(targetBaseName).name.toLowerCase();
      const matchedAltExt = files.find((f) => {
        const parsed = path.parse(f);
        return (
          parsed.name.toLowerCase() === targetNameWithoutExt &&
          COMMON_IMAGE_EXTENSIONS.includes(parsed.ext.toLowerCase())
        );
      });
      if (matchedAltExt) {
        const rel = path.relative(projectFolder, path.join(dir, matchedAltExt)).replace(/\\/g, '/');
        return `/projects/${dirName}/${rel}`;
      }
    } catch {
      // Continue search
    }
  }

  return null;
}

/**
 * Finds all image files currently present on disk inside a project folder.
 */
function discoverAllProjectImages(projectFolder: string, dirName: string): string[] {
  const discovered: string[] = [];
  const scanDirs = [projectFolder, path.join(projectFolder, 'images')];

  for (const dir of scanDirs) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (COMMON_IMAGE_EXTENSIONS.includes(ext)) {
          const rel = path.relative(projectFolder, path.join(dir, entry.name)).replace(/\\/g, '/');
          const webPath = `/projects/${dirName}/${rel}`;
          if (!discovered.includes(webPath)) {
            discovered.push(webPath);
          }
        }
      }
    } catch {
      // Continue
    }
  }

  // Sort naturally (e.g. look-01 before look-02)
  discovered.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  return discovered;
}

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

  // Ensure public/projects and public/assets/images exist
  fs.mkdirSync(publicProjectsDir, { recursive: true });
  const srcAssetsDir = path.join(rootDir, 'src', 'assets', 'images');
  const publicAssetsDir = path.join(rootDir, 'public', 'assets', 'images');
  if (fs.existsSync(srcAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
    fs.cpSync(srcAssetsDir, publicAssetsDir, { recursive: true });
  }

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

      // Copy project folder to public/projects/[dirName] so Vite serves it in dev and bundles it in build
      const destDir = path.join(publicProjectsDir, dirName);
      fs.mkdirSync(destDir, { recursive: true });
      fs.cpSync(projectFolder, destDir, { recursive: true });

      // Discover all physical images in project for smart fallback
      const availableImagesOnDisk = discoverAllProjectImages(projectFolder, dirName);

      // 1. Resolve coverImage
      const specifiedCover = data.cover || data.coverImage;
      let coverImage: string | null = null;

      if (specifiedCover) {
        coverImage = resolveProjectImagePath(projectFolder, dirName, specifiedCover);
      }

      // Fallback search for cover if specified file not found on disk
      if (!coverImage) {
        // Try candidate names in project root or images folder
        for (const candidate of STANDARD_COVER_CANDIDATES) {
          const resolvedCandidate = resolveProjectImagePath(projectFolder, dirName, candidate);
          if (resolvedCandidate) {
            coverImage = resolvedCandidate;
            break;
          }
        }

        // If still no candidate, pick the first image found on disk
        if (!coverImage && availableImagesOnDisk.length > 0) {
          coverImage = availableImagesOnDisk[0];
        }

        // Default to conventional /projects/${dirName}/cover.jpg if no files exist on disk
        if (!coverImage) {
          coverImage = `/projects/${dirName}/${specifiedCover || 'cover.jpg'}`;
        }

        if (specifiedCover && coverImage !== `/projects/${dirName}/${specifiedCover}`) {
          console.warn(
            `[sync-projects] Note: Cover file "${specifiedCover}" for "${dirName}" was auto-resolved to available file "${coverImage}".`
          );
        }
      }

      // 2. Resolve gallery images
      const rawImages = Array.isArray(data.images)
        ? data.images
        : Array.isArray(data.gallery)
        ? data.gallery
        : [];

      let gallery: any[] = [];

      if (rawImages.length > 0) {
        gallery = rawImages.map((img: any, idx: number) => {
          if (typeof img === 'string') {
            const resolved = resolveProjectImagePath(projectFolder, dirName, img);
            if (!resolved) {
              console.warn(
                `[sync-projects] Notice: Image "${img}" (item ${idx + 1}) in project "${dirName}" was not found on disk.`
              );
              // Normalize path so browser still attempts to load correctly
              const clean = img.replace(/^\.?\/+/, '');
              return `/projects/${dirName}/${clean}`;
            }
            return resolved;
          }

          if (img && typeof img === 'object') {
            const resolvedUrl = resolveProjectImagePath(projectFolder, dirName, img.url || '');
            return {
              ...img,
              url: resolvedUrl || `/projects/${dirName}/${(img.url || '').replace(/^\.?\/+/, '')}`,
            };
          }

          return img;
        });
      } else if (availableImagesOnDisk.length > 0) {
        // Auto-discover images if gallery is omitted in project.json
        gallery = availableImagesOnDisk;
      }

      // Ensure gallery has at least the cover image if empty
      if (gallery.length === 0 && coverImage) {
        gallery.push(coverImage);
      }

      // Resolve publishedAt if present and valid (YYYY-MM-DD)
      const publishedAt =
        typeof data.publishedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt.trim())
          ? data.publishedAt.trim()
          : undefined;

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
        ...(publishedAt ? { publishedAt } : {}),
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
  console.log(
    `[sync-projects] Synchronized ${loadedProjects.length} projects (${loadedProjects.filter(p => p.published).length} published) to ${generatedFile}`
  );

  return loadedProjects;
}

// Run directly if invoked from CLI
if (
  process.argv[1] &&
  (process.argv[1].endsWith('build-projects.ts') || process.argv[1].endsWith('build-projects.js'))
) {
  syncProjects();
}
