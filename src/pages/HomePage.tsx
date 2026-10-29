import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project, SiteConfig, AtelierStudy } from '../types/portfolio';
import { ArrowRight, ArrowUpRight, Eye, ChevronDown, Layers, Sparkles } from 'lucide-react';

interface HomePageProps {
  siteConfig: SiteConfig;
  projects: Project[];
  atelierStudies: AtelierStudy[];
  navigate: (route: string, param?: string) => void;
  onOpenImage: (image: { url: string; caption: string; credit?: string; title?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  siteConfig,
  projects,
  atelierStudies,
  navigate,
  onOpenImage,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Multi-plane pointer depth and living composition state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [isInspectingLayers, setIsInspectingLayers] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Multi-plane mouse parallax handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroStageRef.current) return;
    const rect = heroStageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHoveringStage(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHoveringStage(false);
    setMousePos({ x: 0, y: 0 });
    setActiveHotspot(null);
  }, []);

  const featuredProject = projects.find((p) => p.featured || p.isFeatured) || projects[0];
  const secondaryProjects = projects.filter((p) => p.id !== featuredProject?.id).slice(0, 3);
  const recentFragments = atelierStudies.slice(0, 3);

  // Scroll factor for layer divergence
  const scrollSeparation = Math.min(80, scrollY * 0.15);

  // Interactive curiosity discovery hotspots on the physical garment
  const curiosityHotspots = [
    {
      id: 0,
      label: "A Gola Escultural",
      coordinate: "top-[28%] left-[44%]",
      tag: "CAMADA OCULTA I",
      revelation: "A gola facetada em lã pesada oculta um forro interno em veludo bordeaux acetinado — visível apenas no movimento fluido do corpo.",
    },
    {
      id: 1,
      label: "O Caimento em Viés",
      coordinate: "top-[48%] left-[58%]",
      tag: "CAMADA OCULTA II",
      revelation: "Moulage tridimensional moldada diretamente sobre o busto de costura, eliminando costuras rígidas laterais em prol do fluxo anatômico.",
    },
    {
      id: 2,
      label: "A Trama da Fibra",
      coordinate: "top-[70%] left-[36%]",
      tag: "CAMADA OCULTA III",
      revelation: "Lã virgem 480g/m² estruturada com entretela francesa de crina natural para conferir gravidade sem perder a maleabilidade táctil.",
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-40">
      {/* 1. Living Editorial Tableau (Composição Editorial Viva & Revelação Gradual) */}
      <section
        ref={heroStageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[92vh] flex flex-col justify-between pt-6 sm:pt-10 pb-10 border-b border-[#201E1C]/15 overflow-hidden select-none"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-between">

          {/* Living Editorial Composition Stage */}
          <div className="py-8 sm:py-12 relative perspective-stage">
            {/* Split Composition Layout: Architectural Typography on Left, Multi-Layer Living Canvas on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Subtle Typographic Anchor */}
              <div
                className="lg:col-span-5 space-y-6 z-20 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -4}px, 0)`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[1px] bg-[#713C42]" />
                  <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold">
                    {siteConfig.subtitle}
                  </span>
                </div>

                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#201E1C] font-normal leading-[1.05] text-balance">
                  Arquitetura branda sobre o corpo em movimento.
                </h1>

                <p className="text-sm sm:text-base text-[#201E1C]/80 font-light leading-relaxed max-w-md font-sans">
                  À primeira vista, uma forma fechada e silenciosa. Ao aproximar o olhar, revelam-se a tensão da dobra, a entretela oculta em bordeaux e a fluidez táctil da matéria.
                </p>

                {/* Primary Actions & Layer Inspection Switch */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => navigate('works')}
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
                  >
                    <span>Explorar Obras</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => setIsInspectingLayers(!isInspectingLayers)}
                    className={`inline-flex items-center gap-2 px-4 py-3.5 border text-xs uppercase tracking-widest transition-all cursor-pointer ${
                      isInspectingLayers
                        ? 'bg-[#713C42] text-[#F2EEE7] border-[#713C42]'
                        : 'border-[#201E1C]/30 text-[#201E1C] hover:border-[#201E1C]'
                    }`}
                    title="Alterne entre a vista condensada e a expansão tridimensional das camadas de criação"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isInspectingLayers ? 'Vista Síntese' : 'Examinar Camadas'}</span>
                  </button>
                </div>

                {/* Discovery Hint */}
                <div className="pt-3 text-[11px] text-[#201E1C]/50 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#713C42]" />
                  <span>Aproxime o cursor dos pontos na imagem para decifrar as camadas ocultas</span>
                </div>
              </div>

              {/* Right Column: Multi-Layer Living Canvas */}
              <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[540px] flex items-center justify-center">
                
                {/* LAYER 1 (Top-Right): Translucent Ideation Croquis Sheet */}
                <div
                  onClick={() =>
                    onOpenImage({
                      url: "/src/assets/images/atelier_croquis_sketch_1793050105176.jpg",
                      title: "Prancha de Estudo I — Anatomia do Gesto",
                      caption: "Croqui a grafite sobre papel artesanal de algodão com anotações de corte e proporção.",
                      credit: "Documentação de Ateliê"
                    })
                  }
                  className={`absolute -top-4 -right-2 sm:-top-8 sm:right-0 z-30 w-44 sm:w-56 cursor-pointer bg-[#F2EEE7] border border-[#201E1C]/20 p-2 shadow-lg transition-all duration-700 ease-out animate-float-b ${
                    isInspectingLayers
                      ? 'translate-x-6 -translate-y-8 scale-105 shadow-2xl'
                      : 'hover:scale-102 hover:border-[#201E1C]/40'
                  }`}
                  style={{
                    transform: isInspectingLayers
                      ? `translate3d(${24 + mousePos.x * 20}px, ${-32 + mousePos.y * 14 - scrollSeparation * 0.4}px, 40px) rotate(-1deg)`
                      : `translate3d(${mousePos.x * 16}px, ${mousePos.y * 12 - scrollSeparation * 0.3}px, 20px) rotate(-1.8deg)`,
                  }}
                  title="Camada de Ideação: Clique para ampliar o croqui inicial"
                >
                  <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                    <img
                      src="/src/assets/images/atelier_croquis_sketch_1793050105176.jpg"
                      alt="Croqui de moda em papel artesanal com fita métrica de ateliê"
                      className="w-full h-full object-cover grayscale contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#713C42]/5 mix-blend-multiply" />
                  </div>
                  <div className="pt-2 px-1 flex items-center justify-between text-[9px] uppercase tracking-wider text-[#201E1C]/70">
                    <span className="font-semibold text-[#713C42]">01. Ideação</span>
                    <span className="font-mono">GRAFITE & PAPEL</span>
                  </div>
                </div>

                {/* LAYER 0 (Center): Monumental Atelier Living Core */}
                <div
                  className={`relative z-10 w-full max-w-[500px] border border-[#201E1C]/15 bg-[#201E1C]/5 shadow-xl transition-all duration-700 ease-out ${
                    isInspectingLayers ? 'scale-95 ring-1 ring-[#713C42]/40' : ''
                  }`}
                  style={{
                    transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -8 + scrollSeparation * 0.2}px, 0) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
                  }}
                >
                  {/* Central Breathing Photograph Container (Clipped) */}
                  <div className="relative overflow-hidden aspect-16/11 bg-[#201E1C]/5">
                    <img
                      src="/src/assets/images/hero_fashion_atelier_1793050101693.jpg"
                      alt="Manequim de alfaiataria com casaco estruturado em lã no ateliê"
                      className="w-full h-full object-cover animate-breathing"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discreet Editorial Vignette Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201E1C]/40 via-transparent to-transparent pointer-events-none" />

                    {/* Click-to-Expand affordance */}
                    <button
                      onClick={() =>
                        onOpenImage({
                          url: "/src/assets/images/hero_fashion_atelier_1793050101693.jpg",
                          title: "Atelier de Criação — Prova de Busto",
                          caption: "Manequim com alfaiataria desconstruída em lã pura e taupe, banhado por luz natural de atelier.",
                          credit: "Documentação de Ateliê"
                        })
                      }
                      className="absolute bottom-3 right-3 p-2 bg-[#201E1C]/80 hover:bg-[#201E1C] text-[#F2EEE7] text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer z-30"
                      title="Ampliar fotografia"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ampliar</span>
                    </button>
                  </div>

                  {/* Unclipped Interactive Curiosity Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-40">
                    {curiosityHotspots.map((spot) => {
                      const isActive = activeHotspot === spot.id;
                      const isTopZone = spot.id === 0;
                      return (
                        <div
                          key={spot.id}
                          className={`absolute ${spot.coordinate} -translate-x-1/2 -translate-y-1/2 group pointer-events-auto`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(isActive ? null : spot.id);
                            }}
                            onMouseEnter={() => setActiveHotspot(spot.id)}
                            className="relative flex items-center justify-center w-8 h-8 cursor-pointer focus:outline-none"
                            aria-label={`Ver camada oculta: ${spot.label}`}
                          >
                            <span
                              className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                                isActive
                                  ? 'border-[#713C42] bg-[#713C42]/30 scale-125 ring-2 ring-[#713C42]/20'
                                  : 'border-[#F2EEE7] bg-[#201E1C]/70 shadow-md group-hover:scale-115 group-hover:bg-[#201E1C]'
                              }`}
                            />
                            <span
                              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                isActive ? 'bg-[#713C42]' : 'bg-[#F2EEE7]'
                              }`}
                            />
                          </button>

                          {/* Revelation Floating Card (Never Clipped) */}
                          {isActive && (
                            <div
                              className={`absolute left-1/2 -translate-x-1/2 w-64 p-3.5 bg-[#201E1C] text-[#F2EEE7] text-left border border-[#F2EEE7]/25 shadow-2xl z-50 animate-editorial-reveal ${
                                isTopZone ? 'top-10' : 'bottom-10'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#B7A18B] pb-1.5 border-b border-[#F2EEE7]/10">
                                <span className="font-semibold text-[#713C42]">{spot.tag}</span>
                                <span className="text-[#F2EEE7]/60 font-mono">0{spot.id + 1}</span>
                              </div>
                              <div className="font-editorial text-sm font-semibold text-[#F2EEE7] pt-1.5">
                                {spot.label}
                              </div>
                              <p className="text-[11px] text-[#F2EEE7]/85 leading-relaxed font-sans pt-1">
                                {spot.revelation}
                              </p>
                              <div className="pt-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(null);
                                  }}
                                  className="text-[9px] uppercase tracking-wider text-[#B7A18B] hover:text-[#F2EEE7] transition-colors"
                                >
                                  Fechar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Editorial Figure Footnote */}
                  <div className="p-3 bg-[#F2EEE7] border-t border-[#201E1C]/10 flex items-center justify-between text-[11px] text-[#201E1C]/70">
                    <span className="font-editorial text-sm text-[#201E1C]">Figura 01. Estudo de Gravidade & Caimento</span>
                    <span className="uppercase tracking-wider text-[10px]">
                      {isInspectingLayers ? 'CAMADA 03 · FORMA ESCULPIDA' : 'MOULAGE EM ATELIÊ'}
                    </span>
                  </div>
                </div>

                {/* LAYER 2 (Bottom-Left): Tactile Textile Swatch Fragment */}
                <div
                  onClick={() =>
                    onOpenImage({
                      url: "/src/assets/images/atelier_textile_swatches_1793050105140.jpg",
                      title: "Pesquisa Têxtil — Amostragem de Superfície",
                      caption: "Amostras de lã bouclé preta, linho rústico e veludo bordeaux na bancada de corte com tesoura de alfaiate.",
                      credit: "Pesquisa Material"
                    })
                  }
                  className={`absolute -bottom-4 -left-2 sm:-bottom-8 sm:-left-4 z-30 w-44 sm:w-56 cursor-pointer bg-[#F2EEE7] border border-[#201E1C]/20 p-2 shadow-lg transition-all duration-700 ease-out animate-float-a ${
                    isInspectingLayers
                      ? '-translate-x-8 sm:-translate-x-12 translate-y-10 sm:translate-y-12 scale-105 shadow-2xl ring-1 ring-[#713C42]/50'
                      : 'hover:scale-102 hover:border-[#201E1C]/40'
                  }`}
                  style={{
                    transform: isInspectingLayers
                      ? `translate3d(${-32 + mousePos.x * -22}px, ${40 + mousePos.y * -16 + scrollSeparation * 0.4}px, 50px) rotate(1.5deg)`
                      : `translate3d(${mousePos.x * -20}px, ${mousePos.y * -14 + scrollSeparation * 0.3}px, 30px) rotate(0.8deg)`,
                  }}
                  title="Camada de Matéria: Clique para examinar a textura dos tecidos"
                >
                  <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                    <img
                      src="/src/assets/images/atelier_textile_swatches_1793050105140.jpg"
                      alt="Amostras de tecidos nobres, veludo bordeaux e tesoura de alfaiate"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#201E1C]/10 mix-blend-multiply" />
                  </div>
                  <div className="pt-2 px-1 flex items-center justify-between text-[9px] uppercase tracking-wider text-[#201E1C]/70">
                    <span className="font-semibold text-[#713C42]">
                      {isInspectingLayers ? 'Camada 02' : '02. Matéria'}
                    </span>
                    <span className="font-mono">LÃ & VELUDO</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Discreet Transition to Discovery Indicator */}
          <div className="flex items-center justify-between pt-6 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#201E1C]/50 border-t border-[#201E1C]/10 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#713C42] font-semibold">Volume I</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">A transição entre o pensamento invisível e a matéria esculpida</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Role para explorar as obras</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Manifesto de Criação (Rítmico e Espaçoso) */}
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

      {/* 3. Galeria Editorial Interativa (Projetos com Interação) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#201E1C]/15">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold block">
              Obras em Destaque
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

        {/* Primary Featured Showcase Card (Expansive Asymmetric Spread) */}
        {featuredProject && (
          <div
            className="group relative border border-[#201E1C]/15 bg-white p-6 sm:p-10 shadow-xs cursor-pointer transition-all duration-500 hover:border-[#201E1C]/40"
            onClick={() => navigate('work-detail', featuredProject.slug)}
            onMouseEnter={() => setHoveredProjectId(featuredProject.id)}
            onMouseLeave={() => setHoveredProjectId(null)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Media Column with Hover Zoom */}
              <div className="lg:col-span-7 relative overflow-hidden bg-[#201E1C]/5">
                <img
                  src={featuredProject.coverImage}
                  alt={featuredProject.title}
                  className="w-full aspect-4/3 sm:aspect-16/10 object-cover img-editorial"
                  referrerPolicy="no-referrer"
                />
                {featuredProject.issueNumber && (
                  <div className="absolute top-4 left-4 bg-[#F2EEE7]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10">
                    {featuredProject.issueNumber}
                  </div>
                )}
              </div>

              {/* Text & Specs Column */}
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

                {/* Technical highlights that subtly react on hover */}
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
        )}

        {/* Secondary Asymmetric Pairs */}
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
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover img-editorial"
                  referrerPolicy="no-referrer"
                />

                {project.issueNumber && (
                  <div className="absolute top-3 left-3 bg-[#F2EEE7]/90 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#201E1C] font-semibold border border-[#201E1C]/10">
                    {project.issueNumber}
                  </div>
                )}

                <div className="absolute top-3 right-3">
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
      </section>

      {/* 4. Processo Criativo (Caderno Editorial de Criação) */}
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

      {/* 5. Poetic Closing Signature & Invitation */}
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
    </div>
  );
};
