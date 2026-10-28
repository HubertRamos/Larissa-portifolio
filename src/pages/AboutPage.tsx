import React from 'react';
import { SiteConfig } from '../types/portfolio';
import { Award, GraduationCap, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  siteConfig: SiteConfig;
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  siteConfig,
  navigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-[#201E1C]/15">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#713C42] font-semibold">
          <span>{siteConfig.edition}</span>
          <span aria-hidden="true">·</span>
          <span>Apresentação & Trajetória</span>
        </div>

        <div className="max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#201E1C] font-normal">
            Sobre a Designer & Processo
          </h1>
          <p className="text-sm sm:text-base text-[#201E1C]/75 font-light mt-2 leading-relaxed">
            Direção criativa com foco em modelagem tridimensional, alfaiataria contemporânea e pesquisa tátil de matérias-primas nobres.
          </p>
        </div>
      </div>

      {/* Main Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Portrait / Atelier space placeholder */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative border border-[#201E1C]/15 bg-white p-3 shadow-xs">
            <img
              src="/src/assets/images/hero_fashion_atelier_1793050101693.jpg"
              alt="Ambiente de atelier de moda"
              className="w-full aspect-3/4 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 text-center border-t border-[#201E1C]/10 text-xs text-[#201E1C]/70">
              <span className="font-editorial text-base block text-[#201E1C]">Espaço de Pesquisa & Atelier</span>
              <span className="text-[10px] uppercase tracking-wider text-[#B7A18B]">
                Registro fotográfico de ensaio de manequim
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Statement, Pillars, Education Placeholder */}
        <div className="lg:col-span-7 space-y-10">
          {/* Statement */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#713C42] font-semibold">
              Declaração de Intenção
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#201E1C] leading-snug">
              &ldquo;Construir uma peça de moda é esculpir a proporção entre a intimidade do corpo e o espaço que ele ocupa.&rdquo;
            </h2>
            <div className="space-y-3 text-sm text-[#201E1C]/85 font-light leading-relaxed">
              <p>
                A formação em moda representa um mergulho rigoroso nas técnicas manuais que sustentam a alta costura e o prêt-à-porter autoral. Da precisão da modelagem à fluidez intuitiva do draping em manequim de prova, o foco reside na criação de silhuetas atemporais.
              </p>
              <p>
                Este espaço digital reúne o repertório de projetos conceituais e experimentações de atelier, servindo como documento de evolução criativa e técnica.
              </p>
            </div>
          </div>

          {/* Pillars of Design */}
          <div className="pt-6 border-t border-[#201E1C]/10 space-y-6">
            <h3 className="font-editorial text-2xl text-[#201E1C]">
              Pilares de Criação
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="border border-[#201E1C]/15 p-4 bg-white space-y-2">
                <span className="font-mono text-[10px] text-[#713C42]">01</span>
                <h4 className="font-semibold text-sm text-[#201E1C]">Rigor Construtivo</h4>
                <p className="text-[#201E1C]/75 font-light leading-relaxed">
                  Atenção aos acabamentos internos: forros, entretelas manuais, costuras francesas e pespontos estruturais.
                </p>
              </div>

              <div className="border border-[#201E1C]/15 p-4 bg-white space-y-2">
                <span className="font-mono text-[10px] text-[#713C42]">02</span>
                <h4 className="font-semibold text-sm text-[#201E1C]">Pureza Material</h4>
                <p className="text-[#201E1C]/75 font-light leading-relaxed">
                  Seleção de fibras autênticas: lã pura, linho rústico, algodão cru e sedas fluidas de alta densidade.
                </p>
              </div>

              <div className="border border-[#201E1C]/15 p-4 bg-white space-y-2">
                <span className="font-mono text-[10px] text-[#713C42]">03</span>
                <h4 className="font-semibold text-sm text-[#201E1C]">Anatomia & Movimento</h4>
                <p className="text-[#201E1C]/75 font-light leading-relaxed">
                  Criação pensada para o corpo em deslocamento, priorizando liberdade articular e caimento cinético.
                </p>
              </div>

              <div className="border border-[#201E1C]/15 p-4 bg-white space-y-2">
                <span className="font-mono text-[10px] text-[#713C42]">04</span>
                <h4 className="font-semibold text-sm text-[#201E1C]">Experimentação Táctil</h4>
                <p className="text-[#201E1C]/75 font-light leading-relaxed">
                  Testes laboratoriais de desfiamento, plissados radiais e combinações cromáticas contrastantes.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Trajectory Placeholder (Clearly documented) */}
          <div className="pt-6 border-t border-[#201E1C]/10 space-y-4">
            <h3 className="font-editorial text-2xl text-[#201E1C]">
              Formação & Repertório
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4 p-4 border border-[#201E1C]/15 bg-white">
                <GraduationCap className="w-5 h-5 text-[#713C42] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#201E1C]">Bacharelado em Design de Moda</span>
                  </div>
                  <p className="text-[#201E1C]/70 font-light">
                    Pesquisa e desenvolvimento em modelagem plana, moulage, história do vestuário e alfaiataria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-[#201E1C]/15 bg-white">
                <Award className="w-5 h-5 text-[#713C42] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#201E1C]">Projetos Acadêmicos & Pranchas de Coleção</span>
                  </div>
                  <p className="text-[#201E1C]/70 font-light">
                    Desenvolvimento de coleções cápsula, ensaios de estilo e documentação de protótipos têxteis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3 bg-[#201E1C] text-[#F2EEE7] text-xs uppercase tracking-widest hover:bg-[#713C42] transition-colors cursor-pointer"
            >
              Contato
            </button>
            <button
              onClick={() => navigate('works')}
              className="text-xs uppercase tracking-wider text-[#201E1C] hover:text-[#713C42] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Projetos Selecionados</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
