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
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#201E1C]/5 animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] cursor-pointer ${className}`}
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

/**
 * Editorial Masonry Configuration Generator (Composição Estática e Equilibrada)
 * Define larguras de coluna assimétricas, proporções de imagem estáveis e escalas tipográficas
 * desenhadas intencionalmente como uma publicação de luxo.
 */
interface MasonryConfig {
  gridClasses: string;
  aspectClass: string;
  hasOffsetMat?: boolean;
  isOverlapping?: boolean;
  depthClass: string;
  titleScaleClass: string;
}

const getMasonryConfig = (index: number, total: number): MasonryConfig => {
  // Se houver 1 única obra publicada: prancha monográfica centralizada
  if (total === 1) {
    return {
      gridClasses: 'col-span-1 md:col-span-12 lg:col-span-8 lg:col-start-3',
      aspectClass: 'aspect-16/10 sm:aspect-16/9',
      hasOffsetMat: true,
      depthClass: 'depth-plane-lead',
      titleScaleClass: 'text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.03] tracking-tight',
    };
  }

  // Se houver 2 obras: díptico editorial assimétrico com desnível vertical estável
  if (total === 2) {
    if (index === 0) {
      return {
        gridClasses: 'col-span-1 md:col-span-7 lg:col-span-7 relative z-10',
        aspectClass: 'aspect-4/5',
        hasOffsetMat: true,
        depthClass: 'depth-plane-lead',
        titleScaleClass: 'text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-[1.05] tracking-tight',
      };
    }
    return {
      gridClasses: 'col-span-1 md:col-span-5 lg:col-span-5 md:translate-y-8 lg:translate-y-16 relative z-10',
      aspectClass: 'aspect-3/4',
      depthClass: 'depth-plane-satellite',
      titleScaleClass: 'text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl leading-snug',
    };
  }

  // Ritmo assimétrico estático de 6 posições (repetição equilibrada e intencional)
  const rhythm = index % 6;
  switch (rhythm) {
    case 0:
      // Obra principal: 7 colunas, proporção vertical de alta-costura
      return {
        gridClasses: 'col-span-1 md:col-span-7 lg:col-span-7 relative z-10',
        aspectClass: 'aspect-4/5',
        hasOffsetMat: true,
        depthClass: 'depth-plane-lead',
        titleScaleClass: 'text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.04] tracking-tight',
      };
    case 1:
      // Satélite esguio: 5 colunas, desnível fixo para baixo
      return {
        gridClasses: 'col-span-1 md:col-span-5 lg:col-span-5 md:translate-y-8 lg:translate-y-20 relative z-10',
        aspectClass: 'aspect-2/3 sm:aspect-3/4',
        depthClass: 'depth-plane-satellite',
        titleScaleClass: 'text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl leading-snug',
      };
    case 2:
      // Prancha têxtil: 6 colunas, recuo de 1 coluna à esquerda (assimetria pura)
      return {
        gridClasses: 'col-span-1 md:col-span-6 lg:col-span-6 lg:col-start-2 md:translate-y-4 lg:translate-y-6 relative z-10',
        aspectClass: 'aspect-16/10',
        depthClass: 'depth-plane-horizontal',
        titleScaleClass: 'text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl leading-tight',
      };
    case 3:
      // Estudo com sobreposição controlada: 5 colunas na direita com elevação
      return {
        gridClasses: 'col-span-1 md:col-span-6 lg:col-span-5 lg:col-start-8 md:-translate-y-4 lg:-translate-y-12 relative z-20',
        aspectClass: 'aspect-square sm:aspect-4/5',
        isOverlapping: true,
        depthClass: 'depth-plane-overlap',
        titleScaleClass: 'text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-[1.85rem] leading-snug',
      };
    case 4:
      // Prancha panorâmica de acervo: 8 colunas a partir da borda esquerda
      return {
        gridClasses: 'col-span-1 md:col-span-7 lg:col-span-8 lg:col-start-1 md:translate-y-4 lg:translate-y-8 relative z-10',
        aspectClass: 'aspect-16/9 sm:aspect-16/10',
        hasOffsetMat: true,
        depthClass: 'depth-plane-lead',
        titleScaleClass: 'text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.03] tracking-tight',
      };
    case 5:
    default:
      // Contrapeso esguio: 4 colunas na extrema direita
      return {
        gridClasses: 'col-span-1 md:col-span-5 lg:col-span-4 lg:col-start-9 md:-translate-y-2 lg:-translate-y-6 relative z-10',
        aspectClass: 'aspect-3/4',
        depthClass: 'depth-plane-satellite',
        titleScaleClass: 'text-lg sm:text-xl md:text-xl lg:text-2xl leading-normal',
      };
  }
};

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

  // Format date helper for editorial metadata
  const formatEditorialDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length < 2) return dateStr;
      const year = parts[0];
      const month = parts[1];
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const mIdx = parseInt(month, 10) - 1;
      const monthName = months[mIdx] || month;
      return `${monthName} ${year}`;
    } catch {
      return dateStr;
    }
  };

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

      {/* Interactive Category Filter Bar (Functional buttons) — Exibido quando há categorias com projetos */}
      {categories.length > 1 && (
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
      )}

      {/* Editorial Asymmetric Masonry Grid Layout (Estático, Intencional e Equilibrado) */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-16 sm:gap-y-24 pt-6 perspective-stage preserve-3d">
          {filtered.map((project, idx) => {
            const config = getMasonryConfig(idx, filtered.length);

            return (
              <article
                key={project.id}
                className={`group flex flex-col justify-between space-y-4 border-b border-[#201E1C]/10 pb-10 ${config.gridClasses} ${config.depthClass}`}
              >
                {/* Visual Container with Scroll-Triggered Reveal & 3D Layering */}
                <div className="relative preserve-3d">
                  {/* Background Offset Mat for Lead/Major Pieces */}
                  {config.hasOffsetMat && (
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 sm:-inset-4 bg-[#201E1C]/[0.03] border border-[#201E1C]/15 translate-z-shadow translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 pointer-events-none"
                    />
                  )}

                  {/* Overlap Accent Plate styling */}
                  {config.isOverlapping && (
                    <div
                      aria-hidden="true"
                      className="absolute -inset-2 bg-white/60 -z-10 shadow-xs border border-[#201E1C]/10 pointer-events-none"
                    />
                  )}

                  <div className="relative overflow-hidden border border-[#201E1C]/15 bg-[#201E1C]/5 shadow-xs preserve-3d">
                    <ScrollRevealCoverImage
                      src={project.coverImage}
                      alt={project.title}
                      aspectClass={config.aspectClass}
                      onClick={() => navigate('work-detail', project.slug)}
                    />

                    {/* Monographic Badge */}
                    {project.issueNumber && (
                      <div className="absolute top-3 left-3 bg-[#F2EEE7]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10 z-10 translate-z-badge">
                        {project.issueNumber}
                      </div>
                    )}

                    {/* Action Overlay: Lightbox Quick View */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10 translate-z-badge">
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
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editorial Metadata with Responsive Asymmetric Typography */}
                <div className="space-y-3 pt-2 translate-z-plate">
                  <div className="flex items-center gap-2 text-xs text-[#201E1C]/60 tracking-wider">
                    <span className="uppercase text-[#713C42] font-semibold">
                      {project.categoryLabel || project.category}
                    </span>
                    {project.publishedAt && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{formatEditorialDate(project.publishedAt)}</span>
                      </>
                    )}
                    {project.year && !project.publishedAt && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </>
                    )}
                  </div>

                  <h2
                    onClick={() => navigate('work-detail', project.slug)}
                    className={`font-editorial ${config.titleScaleClass} text-[#201E1C] group-hover:text-[#713C42] transition-colors cursor-pointer text-balance`}
                  >
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed line-clamp-2">
                    {project.summary || project.description}
                  </p>

                  {(project.technical?.silhouette || project.materials) && (
                    <div className="text-[11px] text-[#201E1C]/60 pt-1 space-y-0.5 border-t border-[#201E1C]/5">
                      {project.technical?.silhouette && (
                        <div>
                          <strong className="font-medium text-[#201E1C]/80">Silhueta:</strong> {project.technical.silhouette}
                        </div>
                      )}
                      {project.materials && (
                        <div>
                          <strong className="font-medium text-[#201E1C]/80">Matéria:</strong>{' '}
                          {Array.isArray(project.materials) ? project.materials[0] : project.materials}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => navigate('work-detail', project.slug)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#201E1C] group-hover:text-[#713C42] transition-colors cursor-pointer"
                    >
                      <span>Ver Ficha & Processo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <span className="text-[10px] font-mono text-[#201E1C]/40">
                      REF. {project.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* COMPOSIÇÃO EDITORIAL VAZIA — Elegante, limpa e serena */
        <div className="py-12 sm:py-20 text-center">
          <div className="max-w-xl mx-auto border border-[#201E1C]/15 bg-white/60 p-8 sm:p-14 space-y-6 shadow-xs relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-[#201E1C]/[0.02] border border-[#201E1C]/10 -z-10 translate-x-2 translate-y-2 pointer-events-none"
            />

            <div className="w-8 h-[1px] bg-[#713C42] mx-auto" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#713C42] block">
              Catálogo de Obras
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#201E1C] font-normal leading-snug">
              Arquivo em Fase de Catalogação
            </h2>

            <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed max-w-md mx-auto font-sans">
              As obras autorais, coleções de passarela e ensaios técnicos desta temporada estão sendo organizados. Cada criação publicada integrará este catálogo com suas respectivas fichas técnicas e registros.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => navigate('atelier')}
                className="px-6 py-3 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
              >
                Explorar Pranchas de Ateliê
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
