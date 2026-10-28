import React, { useState, useMemo } from 'react';
import { Project, SiteConfig, GalleryItem } from '../types/portfolio';
import { getNextAndPrevProjects } from '../utils/portfolio';
import { ArrowLeft, ArrowRight, Eye, Layers, Scissors, Palette, Sparkles, BookOpen, Users } from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  siteConfig: SiteConfig;
  navigate: (route: string, param?: string) => void;
  onOpenImage: (image: { url: string; caption: string; credit?: string; title?: string }) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  navigate,
  onOpenImage,
}) => {
  const nav = getNextAndPrevProjects(allProjects, project.slug);

  // Normalize gallery items (supports string[] or GalleryItem[])
  const normalizedGallery: GalleryItem[] = useMemo(() => {
    const raw = project.gallery?.length ? project.gallery : project.galleryImages || [];
    return raw.map((item, idx) => {
      if (typeof item === 'string') {
        return {
          url: item,
          caption: `${project.title} — Registro ${idx + 1}`,
          credit: project.title,
        };
      }
      return {
        url: item.url,
        caption: item.caption || `${project.title} — Registro ${idx + 1}`,
        credit: item.credit || project.title,
      };
    });
  }, [project]);

  // Normalize concept / narrative paragraphs
  const conceptParagraphs: string[] = useMemo(() => {
    if (project.concept && project.concept.length > 0) return project.concept;
    if (project.description) return [project.description];
    if (project.summary) return [project.summary];
    return [];
  }, [project]);

  // Normalize materials (string or string[])
  const materialsList: string[] = useMemo(() => {
    if (!project.materials) return [];
    if (Array.isArray(project.materials)) return project.materials;
    return [project.materials];
  }, [project.materials]);

  // Normalize credits (string or string[])
  const creditsList: string[] = useMemo(() => {
    if (!project.credits) return [];
    if (Array.isArray(project.credits)) return project.credits;
    return [project.credits];
  }, [project.credits]);

  // Normalize references (string or string[])
  const referencesList: string[] = useMemo(() => {
    if (!project.references) return [];
    if (Array.isArray(project.references)) return project.references;
    return [project.references];
  }, [project.references]);

  const hasTechnicalData = Boolean(
    project.technical &&
      (project.technical.silhouette ||
        (project.technical.fabrication && project.technical.fabrication.length > 0) ||
        (project.technical.constructionTechniques && project.technical.constructionTechniques.length > 0) ||
        (project.technical.colorPalette && project.technical.colorPalette.length > 0))
  );

  const hasProcessData = Boolean(project.process && project.process.length > 0);

  const [activeTab, setActiveTab] = useState<'concept' | 'technical' | 'process'>('concept');

  return (
    <article className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#201E1C]/15 pb-4">
        <button
          onClick={() => navigate('works')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#201E1C]/70 hover:text-[#201E1C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Índice de Obras</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#201E1C]/60 tracking-wider">
          <span className="uppercase text-[#713C42] font-semibold">
            {project.categoryLabel || project.category}
          </span>
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
      </div>

      {/* Project Title & Editorial Header */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#201E1C] font-normal leading-tight">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[#201E1C]/80 font-light leading-relaxed">
          {project.description || project.summary}
        </p>
      </div>

      {/* Hero Exhibition Image */}
      <div className="space-y-3">
        <div
          className="relative group cursor-pointer overflow-hidden border border-[#201E1C]/15 bg-[#201E1C]/5 shadow-sm"
          onClick={() =>
            onOpenImage({
              url: project.coverImage,
              title: project.title,
              caption: project.description || project.summary || project.title,
              credit: project.issueNumber ? `${project.issueNumber} — Fotografia de Catálogo` : 'Documentação Editorial',
            })
          }
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full max-h-[75vh] object-cover img-editorial"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-[#201E1C]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F2EEE7]">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#201E1C]/80 backdrop-blur-xs text-xs uppercase tracking-widest">
              <Eye className="w-4 h-4" />
              <span>Clique para Ampliar em Alta Resolução</span>
            </div>
          </div>
        </div>
        <p className="text-right text-[11px] text-[#201E1C]/60 uppercase tracking-widest">
          Documentação de Peça Finalizada {project.year ? `· Coleção ${project.year}` : ''}
        </p>
      </div>

      {/* Content Tabs: Concept, Technical Sheet (if available), Process (if available) */}
      <div className="space-y-8">
        {(hasTechnicalData || hasProcessData) && (
          <div className="flex border-b border-[#201E1C]/15 gap-8 text-xs uppercase tracking-wider" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'concept'}
              onClick={() => setActiveTab('concept')}
              className={`pb-3 border-b-2 font-medium cursor-pointer transition-colors ${
                activeTab === 'concept'
                  ? 'border-[#201E1C] text-[#201E1C]'
                  : 'border-transparent text-[#201E1C]/60 hover:text-[#201E1C]'
              }`}
            >
              Conceito & Narrativa
            </button>

            {hasTechnicalData && (
              <button
                role="tab"
                aria-selected={activeTab === 'technical'}
                onClick={() => setActiveTab('technical')}
                className={`pb-3 border-b-2 font-medium cursor-pointer transition-colors ${
                  activeTab === 'technical'
                    ? 'border-[#201E1C] text-[#201E1C]'
                    : 'border-transparent text-[#201E1C]/60 hover:text-[#201E1C]'
                }`}
              >
                Ficha Técnica de Confecção
              </button>
            )}

            {hasProcessData && (
              <button
                role="tab"
                aria-selected={activeTab === 'process'}
                onClick={() => setActiveTab('process')}
                className={`pb-3 border-b-2 font-medium cursor-pointer transition-colors ${
                  activeTab === 'process'
                    ? 'border-[#201E1C] text-[#201E1C]'
                    : 'border-transparent text-[#201E1C]/60 hover:text-[#201E1C]'
                }`}
              >
                Processo de Ateliê ({project.process?.length})
              </button>
            )}
          </div>
        )}

        {/* Tab 1: Concept & Narrative */}
        {activeTab === 'concept' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="font-editorial text-2xl text-[#201E1C]">
                  Princípio Construtivo & Narrativa
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-[#201E1C]/85 font-light leading-relaxed">
                  {conceptParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Materiais & Técnicas (Optional) */}
              {materialsList.length > 0 && (
                <div className="pt-6 border-t border-[#201E1C]/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#713C42]">
                    <Sparkles className="w-4 h-4" />
                    <span>Materiais & Técnicas Empregadas</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#201E1C]/80 font-light">
                    {materialsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#713C42] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Créditos & Colaboradores (Optional) */}
              {creditsList.length > 0 && (
                <div className="pt-6 border-t border-[#201E1C]/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#713C42]">
                    <Users className="w-4 h-4" />
                    <span>Créditos & Colaboração</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#201E1C]/80 font-light">
                    {creditsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#201E1C] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Referências Visuais / Bibliográficas (Optional) */}
              {referencesList.length > 0 && (
                <div className="pt-6 border-t border-[#201E1C]/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#713C42]">
                    <BookOpen className="w-4 h-4" />
                    <span>Referências & Fundamentação</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#201E1C]/80 font-light">
                    {referencesList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B7A18B] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcomes (Optional) */}
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="pt-6 border-t border-[#201E1C]/10 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#713C42]">
                    Resultados & Validação
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#201E1C]/80 font-light">
                    {project.outcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#201E1C] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Lookbook Gallery Grid */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-editorial text-2xl text-[#201E1C]">
                Registros de Lookbook
              </h3>
              <div className="space-y-6">
                {normalizedGallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer space-y-2 border border-[#201E1C]/15 p-2 bg-white"
                    onClick={() =>
                      onOpenImage({
                        url: img.url,
                        title: `${project.title} — Imagem ${idx + 1}`,
                        caption: img.caption || '',
                        credit: img.credit,
                      })
                    }
                  >
                    <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                      <img
                        src={img.url}
                        alt={img.caption || project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#201E1C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F2EEE7]">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    {img.caption && (
                      <p className="text-xs text-[#201E1C]/80 px-1 font-light">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technical Sheet (if available) */}
        {activeTab === 'technical' && project.technical && (
          <div className="bg-white border border-[#201E1C]/15 p-6 sm:p-10 space-y-8">
            <div className="border-b border-[#201E1C]/10 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold">
                  Especificação Formal
                </span>
                <h3 className="font-editorial text-2xl text-[#201E1C]">
                  Ficha Técnica de Confecção & Amostragem
                </h3>
              </div>
              {project.issueNumber && (
                <span className="font-mono text-xs text-[#201E1C]/50">
                  PROTÓTIPO N° {project.issueNumber}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                {project.technical.silhouette && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#201E1C]">
                      <Scissors className="w-4 h-4 text-[#713C42]" />
                      <span>Silhueta & Modelagem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#201E1C]/80 font-light leading-relaxed pl-6">
                      {project.technical.silhouette}
                    </p>
                  </>
                )}

                {project.technical.colorPalette && project.technical.colorPalette.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#201E1C] pt-2">
                      <Palette className="w-4 h-4 text-[#713C42]" />
                      <span>Amostragem Cromática</span>
                    </div>
                    <div className="flex items-center gap-3 pl-6">
                      {project.technical.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs font-mono text-[#201E1C]/70">
                          <span
                            className="w-5 h-5 border border-black/20"
                            style={{ backgroundColor: color }}
                            aria-hidden="true"
                          />
                          <span>{color}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                {project.technical.fabrication && project.technical.fabrication.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#201E1C]">
                      <Layers className="w-4 h-4 text-[#713C42]" />
                      <span>Composição de Tecidos</span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#201E1C]/80 font-light pl-6">
                      {project.technical.fabrication.map((fab, idx) => (
                        <li key={idx} className="list-disc">{fab}</li>
                      ))}
                    </ul>
                  </>
                )}

                {project.technical.constructionTechniques && project.technical.constructionTechniques.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#201E1C] pt-2">
                      <Scissors className="w-4 h-4 text-[#713C42]" />
                      <span>Técnicas de Acabamento Manual</span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#201E1C]/80 font-light pl-6">
                      {project.technical.constructionTechniques.map((tech, idx) => (
                        <li key={idx} className="list-disc">{tech}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {(project.technical.sampleSize || project.technical.year) && (
              <div className="pt-4 border-t border-[#201E1C]/10 flex justify-between text-xs text-[#201E1C]/70">
                {project.technical.sampleSize && (
                  <span>Graduação do Molde: {project.technical.sampleSize}</span>
                )}
                {project.technical.year && (
                  <span>Ano de Desenvolvimento: {project.technical.year}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Process (if available) */}
        {activeTab === 'process' && hasProcessData && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h3 className="font-editorial text-2xl text-[#201E1C]">
                Da Ideia ao Busto
              </h3>
              <p className="text-xs sm:text-sm text-[#201E1C]/75 font-light leading-relaxed mt-1">
                Registros do processo criativo: desenhos gestuais, testes de densidade têxtil e manipulação direta no manequim.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.process?.map((step) => (
                <div
                  key={step.id}
                  className="group cursor-pointer space-y-3 border border-[#201E1C]/15 bg-white p-3 shadow-xs"
                  onClick={() =>
                    onOpenImage({
                      url: step.imageUrl,
                      title: step.title,
                      caption: step.caption,
                      credit: `Etapa: ${step.category.toUpperCase()}`,
                    })
                  }
                >
                  <div className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#201E1C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F2EEE7]">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#713C42] font-semibold">
                      {step.category}
                    </span>
                    <h4 className="font-editorial text-lg text-[#201E1C] leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#201E1C]/70 font-light leading-relaxed">
                      {step.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next and Previous Project Navigation Bar (Only amongst published projects) */}
      {nav && (
        <div className="pt-12 border-t border-[#201E1C]/15 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            onClick={() => navigate('work-detail', nav.prev.slug)}
            className="group flex flex-col items-start p-6 border border-[#201E1C]/15 hover:border-[#201E1C] bg-white transition-all text-left cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#201E1C]/60 mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Obra Anterior</span>
            </span>
            <span className="font-editorial text-xl text-[#201E1C] group-hover:text-[#713C42] transition-colors">
              {nav.prev.title}
            </span>
            <span className="text-xs text-[#201E1C]/60 mt-1">
              {nav.prev.categoryLabel || nav.prev.category}
            </span>
          </button>

          <button
            onClick={() => navigate('work-detail', nav.next.slug)}
            className="group flex flex-col items-end p-6 border border-[#201E1C]/15 hover:border-[#201E1C] bg-white transition-all text-right cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#201E1C]/60 mb-2">
              <span>Próxima Obra</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-editorial text-xl text-[#201E1C] group-hover:text-[#713C42] transition-colors">
              {nav.next.title}
            </span>
            <span className="text-xs text-[#201E1C]/60 mt-1">
              {nav.next.categoryLabel || nav.next.category}
            </span>
          </button>
        </div>
      )}
    </article>
  );
};
