import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Project, SiteConfig } from '../types/portfolio';
import { filterProjects, getDisciplinesList } from '../utils/portfolio';
import { ArrowUpRight, Eye } from 'lucide-react';

interface ScrollRevealCoverImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  aspectClass?: string;
}

/**
 * Editorial Scroll-Triggered Reveal Component
 * Uses IntersectionObserver to smoothly fade in and elevate cover images as they enter the viewport.
 * Complies with prefers-reduced-motion and provides an editorial fallback container.
 */
export const ScrollRevealCoverImage: React.FC<ScrollRevealCoverImageProps> = ({
  src,
  alt,
  className = '',
  onClick,
  aspectClass = 'aspect-4/3',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${aspectClass} bg-[#201E1C]/5 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.98]'
      }`}
    >
      {/* Editorial shimmer/wash while loading image asset */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#201E1C]/5 animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] cursor-pointer ${className}`}
          onClick={onClick}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          onClick={onClick}
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#201E1C]/5 text-[#201E1C]/60 cursor-pointer"
        >
          <span className="font-editorial text-lg italic text-[#201E1C]">{alt}</span>
          <span className="text-[11px] uppercase tracking-widest mt-1 text-[#713C42]">Atelier Editorial Archive</span>
        </div>
      )}
    </div>
  );
};

interface SelectedWorksPageProps {
  projects: Project[];
  siteConfig: SiteConfig;
  navigate: (route: string, param?: string) => void;
  onOpenImage: (image: { url: string; caption: string; credit?: string; title?: string }) => void;
}

export const SelectedWorksPage: React.FC<SelectedWorksPageProps> = ({
  projects,
  siteConfig,
  navigate,
  onOpenImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => getDisciplinesList(projects), [projects]);
  const filtered = useMemo(
    () => filterProjects(projects, selectedCategory),
    [projects, selectedCategory]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-[#201E1C]/15">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#713C42] font-semibold">
          <span>{siteConfig.edition}</span>
          <span aria-hidden="true">·</span>
          <span>Catálogo de Obras</span>
        </div>
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#201E1C] font-normal">
            Selected Works
          </h1>
          <p className="text-sm text-[#201E1C]/75 font-light max-w-xl mt-2 leading-relaxed">
            Coleções conceituais, peças únicas de alta-costura, estudos tridimensionais de draping e documentação técnica de confecção.
          </p>
        </div>
      </div>

      {/* Interactive Category Filter Bar (Functional buttons) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#201E1C]/10 pb-4" role="tablist" aria-label="Filtrar projetos por categoria">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#201E1C] ${
                isActive
                  ? 'bg-[#201E1C] text-[#F2EEE7]'
                  : 'bg-white border border-[#201E1C]/15 text-[#201E1C]/70 hover:text-[#201E1C] hover:border-[#201E1C]/40'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 opacity-60 font-mono text-[10px]">({cat.count})</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid with Scroll Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 pt-4">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col justify-between space-y-4 border-b border-[#201E1C]/10 pb-10"
          >
            {/* Visual Container with Scroll-Triggered Reveal */}
            <div className="relative overflow-hidden border border-[#201E1C]/15 bg-[#201E1C]/5 shadow-xs">
              <ScrollRevealCoverImage
                src={project.coverImage}
                alt={project.title}
                onClick={() => navigate('work-detail', project.slug)}
              />

              {/* Action Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenImage({
                      url: project.coverImage,
                      title: project.title,
                      caption: project.summary || project.description,
                      credit: project.issueNumber || project.title,
                    });
                  }}
                  className="p-2 rounded-full bg-[#201E1C]/80 hover:bg-[#201E1C] text-[#F2EEE7] transition-colors cursor-pointer"
                  aria-label={`Ampliar imagem de ${project.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editorial Metadata (Zero-Pill discipline) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#201E1C]/60 tracking-wider">
                <span className="uppercase text-[#713C42] font-semibold">{project.categoryLabel || project.category}</span>
                {project.issueNumber && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px]">{project.issueNumber}</span>
                  </>
                )}
                {project.year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </>
                )}
              </div>

              <h2
                onClick={() => navigate('work-detail', project.slug)}
                className="font-editorial text-2xl sm:text-3xl text-[#201E1C] group-hover:text-[#713C42] transition-colors cursor-pointer leading-tight"
              >
                {project.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed line-clamp-2">
                {project.summary || project.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => navigate('work-detail', project.slug)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#201E1C] group-hover:text-[#713C42] transition-colors cursor-pointer"
                >
                  <span>Ver Ficha & Processo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <span className="text-[11px] font-mono text-[#201E1C]/40">
                  REF. {project.id.toUpperCase()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center space-y-3 border border-dashed border-[#201E1C]/20 bg-white/40 p-8">
          <p className="font-editorial text-xl text-[#201E1C]">Nenhuma obra encontrada nesta categoria.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs uppercase tracking-wider text-[#713C42] underline cursor-pointer"
          >
            Exibir todas as obras
          </button>
        </div>
      )}
    </div>
  );
};

