/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { defaultSiteConfig } from './config/site';
import { projectsData } from './data/projects';
import { atelierStudies } from './data/atelier';
import { SiteConfig, Project } from './types/portfolio';
import { getPublishedProjects, getProjectBySlug } from './utils/portfolio';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox, LightboxImage } from './components/Lightbox';

import { HomePage } from './pages/HomePage';
import { SelectedWorksPage } from './pages/SelectedWorksPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AtelierPage } from './pages/AtelierPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [siteConfig] = useState<SiteConfig>(defaultSiteConfig);
  // Source projects filtered to published only
  const publishedProjects = useMemo(() => getPublishedProjects(projectsData), []);
  const [studies] = useState(atelierStudies);

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string>('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Parse hash route on load and on popstate/hashchange
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (hash.startsWith('project/')) {
      const slug = hash.replace('project/', '');
      setCurrentRoute('work-detail');
      setCurrentProjectSlug(slug);
    } else if (['home', 'works', 'atelier', 'about', 'contact'].includes(hash)) {
      setCurrentRoute(hash);
      setCurrentProjectSlug('');
    } else {
      setCurrentRoute('home');
      setCurrentProjectSlug('');
    }
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const navigate = useCallback((route: string, param?: string) => {
    if (route === 'work-detail' && param) {
      window.location.hash = `project/${param}`;
      setCurrentRoute('work-detail');
      setCurrentProjectSlug(param);
    } else {
      window.location.hash = route === 'home' ? '' : route;
      setCurrentRoute(route);
      setCurrentProjectSlug('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSingleImage = useCallback(
    (img: { url: string; caption: string; credit?: string; title?: string }) => {
      setLightboxImages([img]);
      setLightboxIndex(0);
      setLightboxOpen(true);
    },
    []
  );

  // Determine current project if on detail route (only amongst published projects)
  const currentProject = currentProjectSlug
    ? getProjectBySlug(publishedProjects, currentProjectSlug)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE7] text-[#201E1C]">
      {/* Top Header */}
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        siteConfig={siteConfig}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full" id="main-content" tabIndex={-1}>
        {currentRoute === 'home' && (
          <HomePage
            siteConfig={siteConfig}
            projects={publishedProjects}
            atelierStudies={studies}
            navigate={navigate}
            onOpenImage={openSingleImage}
          />
        )}

        {currentRoute === 'works' && (
          <SelectedWorksPage
            projects={publishedProjects}
            siteConfig={siteConfig}
            navigate={navigate}
            onOpenImage={openSingleImage}
          />
        )}

        {currentRoute === 'work-detail' && (
          currentProject ? (
            <ProjectDetailPage
              project={currentProject}
              allProjects={publishedProjects}
              siteConfig={siteConfig}
              navigate={navigate}
              onOpenImage={openSingleImage}
            />
          ) : (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
              <h1 className="font-editorial text-3xl">Projeto não localizado</h1>
              <p className="text-sm text-[#201E1C]/70">
                O estudo de moda solicitado não consta no arquivo atual ou não está publicado.
              </p>
              <button
                onClick={() => navigate('works')}
                className="px-6 py-2.5 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-wider cursor-pointer"
              >
                Retornar ao Índice de Obras
              </button>
            </div>
          )
        )}

        {currentRoute === 'atelier' && (
          <AtelierPage
            studies={studies}
            siteConfig={siteConfig}
            onOpenImage={openSingleImage}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            siteConfig={siteConfig}
            navigate={navigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            siteConfig={siteConfig}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        siteConfig={siteConfig}
        navigate={navigate}
      />

      {/* Fullscreen Lightbox Zoom Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
