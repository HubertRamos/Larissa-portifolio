import React, { useState } from 'react';
import { AtelierStudy, SiteConfig } from '../types/portfolio';
import { Eye, Layers } from 'lucide-react';

interface AtelierPageProps {
  studies: AtelierStudy[];
  siteConfig: SiteConfig;
  onOpenImage: (image: { url: string; caption: string; credit?: string; title?: string }) => void;
}

export const AtelierPage: React.FC<AtelierPageProps> = ({
  studies,
  siteConfig,
  onOpenImage,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('todos');

  // Extract all distinct tags
  const allTags = ['todos', ...Array.from(new Set(studies.flatMap((s) => s.tags)))];

  const filteredStudies =
    selectedTag === 'todos'
      ? studies
      : studies.filter((s) => s.tags.includes(selectedTag));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-[#201E1C]/15">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#713C42] font-semibold">
          <span>{siteConfig.edition}</span>
          <span aria-hidden="true">·</span>
          <span>Caderno de Pesquisa</span>
        </div>

        <div className="max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#201E1C] font-normal">
            The Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#201E1C]/75 font-light mt-2 leading-relaxed">
            O espaço onde as ideias são ensaiadas antes de se tornarem peças finais. Croquis gestuais, ensaios de caimento em manequim de madeira e arquivo tátil de tecidos nobres.
          </p>
        </div>
      </div>

      {/* Filter Tabs by Tag */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#201E1C]/10 pb-4">
        {allTags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#201E1C] text-[#F2EEE7]'
                  : 'bg-white border border-[#201E1C]/15 text-[#201E1C]/70 hover:text-[#201E1C]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Studies Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {filteredStudies.map((study) => (
          <article
            key={study.id}
            className="group space-y-4 border border-[#201E1C]/15 bg-white p-4 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div
              className="relative overflow-hidden aspect-4/3 bg-[#201E1C]/5 cursor-pointer"
              onClick={() =>
                onOpenImage({
                  url: study.imageUrl,
                  title: study.title,
                  caption: study.description,
                  credit: study.medium,
                })
              }
            >
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-[#201E1C]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F2EEE7]">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#201E1C]/80 text-xs uppercase tracking-widest">
                  <Eye className="w-4 h-4" />
                  <span>Ampliar Estudo</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-[#201E1C]/60 tracking-wider">
                <span className="uppercase text-[#713C42] font-semibold">{study.series}</span>
                <span>{study.date}</span>
              </div>

              <h2 className="font-editorial text-2xl text-[#201E1C] leading-snug group-hover:text-[#713C42] transition-colors">
                {study.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#201E1C]/80 font-light leading-relaxed">
                {study.description}
              </p>

              <div className="pt-2 border-t border-[#201E1C]/10 text-xs text-[#201E1C]/60 space-y-1">
                <p>
                  <strong className="text-[#201E1C]/80 font-normal">Técnica & Meio:</strong> {study.medium}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.tags.map((t) => (
                    <span key={t} className="text-[10px] text-[#B7A18B] uppercase tracking-wider">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Tactile Swatch Archive Explanatory Bar */}
      <div className="bg-[#201E1C] text-[#F2EEE7] p-8 sm:p-12 border border-[#F2EEE7]/10 space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B7A18B]">
          <Layers className="w-4 h-4" />
          <span>Diretriz de Pesquisa de Materiais</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl max-w-2xl font-light">
          A autenticidade de uma silhueta repousa na integridade das fibras.
        </h3>
        <p className="text-xs sm:text-sm text-[#F2EEE7]/80 font-light max-w-3xl leading-relaxed">
          O atelier prioriza tecidos puros e de origem rastreável: lãs virgens de gramatura pesada para sustentação de alfaiataria, linhos artesanais para rigidez estrutural arejada e sedas puras para respostas cinéticas de drapeado.
        </p>
      </div>
    </div>
  );
};
