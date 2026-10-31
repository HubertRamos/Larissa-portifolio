import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import { syncProjects } from './scripts/build-projects.ts';

function projectsAutoDiscoveryPlugin(): Plugin {
  return {
    name: 'vite-plugin-projects-auto-discovery',
    buildStart() {
      syncProjects();
    },
    configureServer(server) {
      syncProjects();

      // Watch projects folder for changes in dev
      const projectsRoot = path.resolve(import.meta.dirname ?? process.cwd(), 'projects');
      server.watcher.add(projectsRoot);

      server.watcher.on('all', (event, filePath) => {
        if (filePath.includes('/projects/') || filePath.includes('\\projects\\')) {
          try {
            syncProjects();
          } catch (err) {
            console.error('[vite-plugin-projects] Error during hot re-sync:', err);
          }
        }
      });
    },
    closeBundle() {
      const srcDir = path.resolve(import.meta.dirname ?? process.cwd(), 'projects');
      const distDir = path.resolve(import.meta.dirname ?? process.cwd(), 'dist', 'projects');
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(distDir, { recursive: true });
        fs.cpSync(srcDir, distDir, { recursive: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), projectsAutoDiscoveryPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

