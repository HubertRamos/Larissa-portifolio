import React, { useMemo } from 'react';
import { Project, SiteConfig, AtelierStudy } from '../types/portfolio';
import { getRecentProjects } from '../utils/portfolio';
import { ScrollRevealCoverImage } from './SelectedWorksPage';
import { ArrowRight, ArrowUpRight, Eye, ChevronDown } from 'lucide-react';

interface HomePageProps {
  siteConfig: SiteConfig;
  projects: Project[];
  atelierStudies: AtelierStudy[];
  navigate: (route: string, param?: string) => void;
  onOpenImage: (image: { url: string; caption: string; credit?: string; title?: string }) => void;
}

/**
 * Editorial Scroll Fade Wrapper
 * Smoothly reveals section content using IntersectionObserver with cubic-bezier timing.
 */
const EditorialScrollFade: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  siteConfig,
  projects,
  atelierStudies,
  navigate,
  onOpenImage,
}) => {
  // Dynamic automatic selection of recent published projects (sorted by publishedAt descending)
  const recentProjects = useMemo(() => getRecentProjects(projects, 4), [projects]);
  const primaryProject = recentProjects[0];
  const satellite1 = recentProjects[1];
  const satellite2 = recentProjects[2];
  const satellite3 = recentProjects[3];

  const publishedProjects = useMemo(() => projects.filter((p) => p.published === true), [projects]);
  const featuredProject = publishedProjects.find((p) => p.featured || p.isFeatured) || publishedProjects[0];
  const secondaryProjects = publishedProjects.filter((p) => p.id !== featuredProject?.id).slice(0, 2);
  const recentFragments = atelierStudies.slice(0, 3);

  // Format date helper for editorial display (e.g. "Outubro 2026")
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
    <div className="space-y-28 sm:space-y-40">
      {/* 1. Abertura Editorial — Composição Assimétrica Estática & Intencional */}
      <section className="relative min-h-[88vh] flex flex-col justify-between pt-6 sm:pt-8 pb-10 border-b border-[#201E1C]/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-between space-y-12">

          {/* Top Monographic Issue Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-[#201E1C]/60 pb-4 border-b border-[#201E1C]/10">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#713C42]">ATELIER NOIR</span>
              <span aria-hidden="true">·</span>
              <span>CADERNO EDITORIAL</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{siteConfig.edition}</span>
              {primaryProject?.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{formatEditorialDate(primaryProject.publishedAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Editorial Masthead: Typographic Anchor */}
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[1px] bg-[#713C42]" />
              <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold">
                Atelier de Criação · Pesquisa Têxtil & Forma
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#201E1C] font-normal leading-[1.04] tracking-tight text-balance">
                  Arquitetura branda sobre o <span className="italic font-light">corpo em movimento</span>.
                </h1>
              </div>

              <div className="lg:col-span-4 space-y-5">
                <p className="text-sm text-[#201E1C]/80 font-light leading-relaxed font-sans">
                  Espaço autoral de investigação têxtil, corte e experimentação tridimensional. Cada obra documenta a transição contínua entre a ideia, a matéria e a forma.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate('works')}
                    className="group inline-flex items-center gap-2 px-5 py-3 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
                  >
                    <span>Explorar Catálogo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => navigate('atelier')}
                    className="inline-flex items-center gap-2 px-4 py-3 border border-[#201E1C]/30 text-xs uppercase tracking-widest text-[#201E1C] hover:border-[#201E1C] hover:bg-white/70 transition-all cursor-pointer"
                  >
                    <span>Caderno de Ateliê</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content: Fixed Asymmetric Spread when projects exist OR Elegant Empty State */}
          {recentProjects.length > 0 && primaryProject ? (
            <div className="relative pt-6 pb-4">
              {/* DESKTOP FIXED ASYMMETRIC COMPOSITION (Diagramada com proporções e escalas estáticas) */}
              <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
                
                {/* 1. Main Focal Piece: Obra Mais Recente (Ocupa 7 colunas, proporção vertical de alta-costura) */}
                <div className="md:col-span-7 relative z-20">
                  <article
                    onClick={() => navigate('work-detail', primaryProject.slug)}
                    className="group relative cursor-pointer"
                  >
                    {/* Moldura de apoio assimétrica com recuo em linha tênue */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 sm:-inset-5 bg-[#201E1C]/[0.03] border border-[#201E1C]/15 -z-10 translate-x-3 translate-y-3 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
                    />

                    {/* Imagem com proporção 4/5 estável */}
                    <div className="relative overflow-hidden aspect-4/5 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-sm">
                      <img
                        src={primaryProject.coverImage}
                        alt={primaryProject.title}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Etiqueta monográfica elegante */}
                      <div className="absolute top-4 left-4 bg-[#F2EEE7]/95 backdrop-blur-xs px-3.5 py-1.5 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#713C42]" />
                        <span>EDIÇÃO ATUAL</span>
                        {primaryProject.issueNumber && (
                          <>
                            <span aria-hidden="true" className="opacity-40">·</span>
                            <span className="font-mono">{primaryProject.issueNumber}</span>
                          </>
                        )}
                      </div>

                      {/* Botão de ampliação sutil */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenImage({
                            url: primaryProject.coverImage,
                            title: primaryProject.title,
                            caption: primaryProject.summary || primaryProject.description,
                            credit: primaryProject.issueNumber || primaryProject.title,
                          });
                        }}
                        className="absolute bottom-4 right-4 p-2.5 bg-[#201E1C]/80 hover:bg-[#201E1C] text-[#F2EEE7] text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer z-10"
                        aria-label={`Ampliar imagem de ${primaryProject.title}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ampliar</span>
                      </button>
                    </div>

                    {/* Ficha tipográfica unboxed integrada */}
                    <div className="pt-4 space-y-2 border-t border-[#201E1C]/15 mt-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#201E1C]/60 font-semibold">
                        <span className="text-[#713C42]">{primaryProject.categoryLabel || primaryProject.category}</span>
                        {primaryProject.publishedAt && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{formatEditorialDate(primaryProject.publishedAt)}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-editorial text-3xl sm:text-4xl text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-tight">
                          {primaryProject.title}
                        </h2>

                        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#201E1C] group-hover:text-[#713C42] transition-colors shrink-0">
                          <span>Acessar Estudo</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      {(primaryProject.technical?.silhouette || primaryProject.materials) && (
                        <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#201E1C]/70">
                          {primaryProject.technical?.silhouette && (
                            <span><strong className="font-medium text-[#201E1C]">Silhueta:</strong> {primaryProject.technical.silhouette}</span>
                          )}
                          {primaryProject.materials && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>
                                <strong className="font-medium text-[#201E1C]">Matéria:</strong>{' '}
                                {Array.isArray(primaryProject.materials) ? primaryProject.materials[0] : primaryProject.materials}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </div>

                {/* 2. Coluna de Satélites Asimétricos (Ocupa 5 colunas com posições fixas intencionais) */}
                <div className="md:col-span-5 space-y-10 lg:space-y-12 relative z-10 pt-4">

                  {/* Satélite 1 (Proporção esguia com recuo vertical superior fixo) */}
                  {satellite1 && (
                    <div className="lg:-translate-y-6">
                      <article
                        onClick={() => navigate('work-detail', satellite1.slug)}
                        className="group max-w-[320px] ml-auto space-y-3 cursor-pointer"
                      >
                        <div className="relative overflow-hidden aspect-2/3 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-xs">
                          <img
                            src={satellite1.coverImage}
                            alt={satellite1.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />

                          <div className="absolute top-2.5 left-2.5 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold border border-[#201E1C]/10">
                            02
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#201E1C]/60">
                            <span className="text-[#713C42] font-semibold">{satellite1.categoryLabel || satellite1.category}</span>
                            {satellite1.publishedAt && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{formatEditorialDate(satellite1.publishedAt)}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-editorial text-xl text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-snug">
                            {satellite1.title}
                          </h3>
                        </div>
                      </article>
                    </div>
                  )}

                  {/* Satélite 2 (Panorâmica horizontal com foco na textura têxtil) */}
                  {satellite2 && (
                    <div className="pt-2">
                      <article
                        onClick={() => navigate('work-detail', satellite2.slug)}
                        className="group space-y-3 cursor-pointer"
                      >
                        <div className="relative overflow-hidden aspect-16/10 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-xs">
                          <img
                            src={satellite2.coverImage}
                            alt={satellite2.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />

                          <div className="absolute top-2.5 left-2.5 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold border border-[#201E1C]/10">
                            03
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#201E1C]/60">
                            <span className="text-[#713C42] font-semibold">{satellite2.categoryLabel || satellite2.category}</span>
                            {satellite2.publishedAt && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{formatEditorialDate(satellite2.publishedAt)}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-editorial text-xl text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-snug">
                            {satellite2.title}
                          </h3>
                        </div>
                      </article>
                    </div>
                  )}

                  {/* Satélite 3 (Prancha gráfica quadrada com leve inclinação editorial estável) */}
                  {satellite3 && (
                    <div className="pt-2">
                      <article
                        onClick={() => navigate('work-detail', satellite3.slug)}
                        className="group max-w-[240px] p-2.5 bg-white border border-[#201E1C]/15 shadow-sm rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 cursor-pointer space-y-2.5"
                      >
                        <div className="relative overflow-hidden aspect-square bg-[#201E1C]/5">
                          <img
                            src={satellite3.coverImage}
                            alt={satellite3.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold">
                            04
                          </div>
                        </div>

                        <div className="space-y-1 px-1">
                          <div className="text-[9px] uppercase tracking-wider text-[#713C42] font-semibold">
                            {satellite3.categoryLabel || satellite3.category}
                          </div>
                          <h4 className="font-editorial text-base text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-tight line-clamp-1">
                            {satellite3.title}
                          </h4>
                        </div>
                      </article>
                    </div>
                  )}

                </div>
              </div>

              {/* MOBILE FLUID EDITORIAL STREAM (< 768px: ritmo vertical assimétrico intencional) */}
              <div className="md:hidden space-y-10">
                {/* 1. Mobile Primary */}
                <article
                  onClick={() => navigate('work-detail', primaryProject.slug)}
                  className="group space-y-3 cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-4/5 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-xs">
                    <img
                      src={primaryProject.coverImage}
                      alt={primaryProject.title}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#F2EEE7]/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#713C42]" />
                      <span>EDIÇÃO ATUAL</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#201E1C]/60">
                      <span className="text-[#713C42] font-semibold">{primaryProject.categoryLabel || primaryProject.category}</span>
                      {primaryProject.publishedAt && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{formatEditorialDate(primaryProject.publishedAt)}</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-editorial text-2xl text-[#201E1C] leading-snug">
                      {primaryProject.title}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#713C42] pt-1">
                      <span>Ver Estudo Completo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>

                {/* 2. Mobile Satellite 1 (Recuo à esquerda) */}
                {satellite1 && (
                  <article
                    onClick={() => navigate('work-detail', satellite1.slug)}
                    className="group space-y-3 pl-6 cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-3/4 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-xs">
                      <img
                        src={satellite1.coverImage}
                        alt={satellite1.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold">
                        02
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-[#713C42] font-semibold">
                        {satellite1.categoryLabel || satellite1.category}
                      </div>
                      <h3 className="font-editorial text-xl text-[#201E1C]">
                        {satellite1.title}
                      </h3>
                    </div>
                  </article>
                )}

                {/* 3. Mobile Satellite 2 (Panorâmica) */}
                {satellite2 && (
                  <article
                    onClick={() => navigate('work-detail', satellite2.slug)}
                    className="group space-y-3 cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-16/10 bg-[#201E1C]/5 border border-[#201E1C]/20 shadow-xs">
                      <img
                        src={satellite2.coverImage}
                        alt={satellite2.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold">
                        03
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-[#713C42] font-semibold">
                        {satellite2.categoryLabel || satellite2.category}
                      </div>
                      <h3 className="font-editorial text-xl text-[#201E1C]">
                        {satellite2.title}
                      </h3>
                    </div>
                  </article>
                )}

                {/* 4. Mobile Satellite 3 (Estudo Quadrado) */}
                {satellite3 && (
                  <article
                    onClick={() => navigate('work-detail', satellite3.slug)}
                    className="group max-w-[260px] mx-auto p-3 bg-white border border-[#201E1C]/15 shadow-sm space-y-2.5 cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-square bg-[#201E1C]/5">
                      <img
                        src={satellite3.coverImage}
                        alt={satellite3.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-[#F2EEE7]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#201E1C] font-semibold">
                        04
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[9px] uppercase tracking-wider text-[#713C42] font-semibold">
                        {satellite3.categoryLabel || satellite3.category}
                      </div>
                      <h4 className="font-editorial text-base text-[#201E1C]">
                        {satellite3.title}
                      </h4>
                    </div>
                  </article>
                )}
              </div>

            </div>
          ) : (
            /* COMPOSIÇÃO EDITORIAL VAZIA — Elegante, serena e alinhada à direção de arte */
            <div className="relative py-8 sm:py-14">
              <div className="max-w-3xl mx-auto border border-[#201E1C]/15 bg-white/60 backdrop-blur-xs p-8 sm:p-14 text-center space-y-6 shadow-xs relative">
                {/* Linha tênue de apoio no fundo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 sm:-inset-4 bg-[#201E1C]/[0.02] border border-[#201E1C]/10 -z-10 translate-x-2 translate-y-2 pointer-events-none"
                />

                <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#713C42] font-semibold">
                  <span className="w-6 h-[1px] bg-[#713C42]" />
                  <span>Caderno de Criação · Volume I</span>
                  <span className="w-6 h-[1px] bg-[#713C42]" />
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl text-[#201E1C] font-normal leading-snug">
                  Arquivo de Coleções em Preparação
                </h2>

                <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed max-w-lg mx-auto font-sans">
                  As pesquisas de silhueta, experimentos de draping e registros de ateliê desta temporada estão sendo organizados. Cada nova peça publicada integrará este catálogo editorial com suas respectivas fichas técnicas e fotografias.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => navigate('atelier')}
                    className="px-6 py-3 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
                  >
                    Ver Estudos do Ateliê
                  </button>

                  <button
                    onClick={() => navigate('about')}
                    className="px-5 py-3 border border-[#201E1C]/30 text-xs uppercase tracking-widest text-[#201E1C] hover:border-[#201E1C] hover:bg-white transition-all cursor-pointer"
                  >
                    Sobre a Criadora
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Discreet Monographic Footer Bar */}
          <div className="flex items-center justify-between pt-4 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#201E1C]/50 border-t border-[#201E1C]/10 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#713C42] font-semibold">Volume I</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Documentação contínua de pesquisas e criações</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Role para explorar o manifesto</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Manifesto de Criação (Rítmico, Noturno e Espaçoso com Scroll Reveal) */}
      <EditorialScrollFade>
        <section className="bg-[#201E1C] text-[#F2EEE7] py-24 sm:py-32 border-y border-[#F2EEE7]/10">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#B7A18B]">
              <span className="w-8 h-[1px] bg-[#B7A18B]" />
              <span>Manifesto de Criação</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {siteConfig.manifesto.map((paragraph, index) => (
                <div key={index} className="space-y-4">
                  <span className="font-mono text-xs text-[#B7A18B] block">
                    0{index + 1}.
                  </span>
                  <p className="text-sm sm:text-base font-light text-[#F2EEE7]/90 leading-relaxed font-sans">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditorialScrollFade>

      {/* 3. Acervo de Ateliê: Obras Publicadas (Exibido somente quando há projetos públicos) */}
      {featuredProject && (
        <EditorialScrollFade>
          <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#201E1C]/15">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold block">
                  Acervo de Ateliê
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#201E1C] font-normal">
                  Coleções & Silhuetas Selecionadas
                </h2>
              </div>
              <button
                onClick={() => navigate('works')}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#201E1C] hover:text-[#713C42] transition-colors cursor-pointer"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Primary Featured Showcase Card (Expansive Asymmetric Spread with Scroll Reveal) */}
            <div
              className="group relative border border-[#201E1C]/15 bg-white p-6 sm:p-10 shadow-xs cursor-pointer transition-all duration-500 hover:border-[#201E1C]/40"
              onClick={() => navigate('work-detail', featuredProject.slug)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 relative overflow-hidden bg-[#201E1C]/5">
                  <ScrollRevealCoverImage
                    src={featuredProject.coverImage}
                    alt={featuredProject.title}
                    aspectClass="aspect-4/3 sm:aspect-16/10"
                  />
                  {featuredProject.issueNumber && (
                    <div className="absolute top-4 left-4 bg-[#F2EEE7]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10 z-10">
                      {featuredProject.issueNumber}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#201E1C]/60 tracking-wider">
                      <span className="uppercase text-[#713C42] font-semibold">
                        {featuredProject.categoryLabel || featuredProject.category}
                      </span>
                      {featuredProject.year && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{featuredProject.year}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-editorial text-3xl sm:text-4xl text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-tight">
                      {featuredProject.title}
                    </h3>

                    <p className="text-sm text-[#201E1C]/80 font-light leading-relaxed">
                      {featuredProject.summary || featuredProject.description}
                    </p>
                  </div>

                  {(featuredProject.technical?.silhouette || featuredProject.materials || featuredProject.technical?.fabrication?.[0]) && (
                    <div className="border-t border-[#201E1C]/10 pt-4 space-y-2 text-xs">
                      {featuredProject.technical?.silhouette && (
                        <div className="flex justify-between py-1 border-b border-[#201E1C]/5">
                          <span className="text-[#201E1C]/60 uppercase tracking-wider">Silhueta:</span>
                          <span className="text-[#201E1C] font-medium text-right max-w-xs">
                            {featuredProject.technical.silhouette}
                          </span>
                        </div>
                      )}
                      {(featuredProject.materials || featuredProject.technical?.fabrication?.[0]) && (
                        <div className="flex justify-between py-1 border-b border-[#201E1C]/5">
                          <span className="text-[#201E1C]/60 uppercase tracking-wider">Material:</span>
                          <span className="text-[#201E1C] font-medium text-right">
                            {Array.isArray(featuredProject.materials)
                              ? featuredProject.materials[0]
                              : featuredProject.materials || featuredProject.technical?.fabrication?.[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#201E1C] group-hover:text-[#713C42] transition-colors">
                      <span>Ver Ficha Técnica & Processo</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>

                    <span className="text-[11px] font-mono text-[#201E1C]/40">
                      ESTUDO 01
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Asymmetric Pairs with Staggered Vertical Spacing */}
            {secondaryProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 pt-4">
                {secondaryProjects.map((project, idx) => (
                  <article
                    key={project.id}
                    className={`group flex flex-col justify-between space-y-4 border border-[#201E1C]/15 bg-white p-5 sm:p-6 shadow-xs cursor-pointer transition-all duration-500 hover:border-[#201E1C]/40 ${
                      idx % 2 === 1 ? 'md:translate-y-8' : ''
                    }`}
                    onClick={() => navigate('work-detail', project.slug)}
                  >
                    <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                      <ScrollRevealCoverImage
                        src={project.coverImage}
                        alt={project.title}
                        aspectClass="aspect-4/3"
                      />

                      {project.issueNumber && (
                        <div className="absolute top-3 left-3 bg-[#F2EEE7]/90 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10 z-10">
                          {project.issueNumber}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#201E1C]/60 tracking-wider">
                        <span className="uppercase text-[#713C42] font-semibold">
                          {project.categoryLabel || project.category}
                        </span>
                        {project.year && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-editorial text-2xl text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed line-clamp-2">
                        {project.summary || project.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-[#201E1C]/10">
                        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#201E1C] group-hover:text-[#713C42] font-medium">
                          <span>Acessar Projeto</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] font-mono text-[#201E1C]/40">
                          REF. {project.id.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </EditorialScrollFade>
      )}

      {/* 4. Processo Criativo (Caderno Editorial de Criação — Estudos Institucionais de Ateliê) */}
      <EditorialScrollFade>
        <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#201E1C]/15">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold block">
                Caderno de Ateliê
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#201E1C] font-normal">
                O Processo de Criação
              </h2>
            </div>
            <button
              onClick={() => navigate('atelier')}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#201E1C] hover:text-[#713C42] transition-colors cursor-pointer"
            >
              <span>Explorar Todas as Pranchas</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Editorial Sketchbook Triptych */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentFragments.map((study) => (
              <div
                key={study.id}
                className="group cursor-pointer space-y-4 border border-[#201E1C]/15 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-[#201E1C]/40"
                onClick={() =>
                  onOpenImage({
                    url: study.imageUrl,
                    title: study.title,
                    caption: study.description,
                    credit: study.medium,
                  })
                }
              >
                <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover img-editorial"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#201E1C]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F2EEE7]">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#201E1C]/80 text-xs uppercase tracking-widest">
                      <Eye className="w-4 h-4" />
                      <span>Ampliar</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-widest text-[#B7A18B] font-semibold">
                    {study.series}
                  </div>
                  <h4 className="font-editorial text-lg text-[#201E1C] group-hover:text-[#713C42] transition-colors leading-snug">
                    {study.title}
                  </h4>
                  <p className="text-xs text-[#201E1C]/70 line-clamp-2 font-light leading-relaxed">
                    {study.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </EditorialScrollFade>

      {/* 5. Poética Assinatura Final & Convite ao Diálogo */}
      <EditorialScrollFade>
        <section className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 py-12">
          <span className="w-12 h-[1px] bg-[#713C42] mx-auto block" />
          <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#201E1C] font-normal leading-tight max-w-3xl mx-auto text-balance">
            &ldquo;A criação de moda como um diálogo contínuo entre a gravidade, a fibra e o silêncio da forma.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-[#201E1C]/70 font-light max-w-lg mx-auto leading-relaxed">
            Para consultas editoriais, análises de coleções ou empréstimo de peças conceituais, entre em contato com o atelier.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-3.5 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
            >
              Iniciar Diálogo
            </button>
          </div>
        </section>
      </EditorialScrollFade>
    </div>
  );
};
