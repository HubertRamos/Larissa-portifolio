import React from 'react';
import { SiteConfig } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  siteConfig: SiteConfig;
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#201E1C] text-[#F2EEE7] border-t border-[#F2EEE7]/10 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F2EEE7]/15">
          {/* Brand & Statement Column */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-3xl tracking-widest block font-light">
              {siteConfig.atelierName}
            </span>
            <p className="text-xs uppercase tracking-widest text-[#B7A18B]">
              {siteConfig.designerRole}
            </p>
            <p className="text-sm text-[#F2EEE7]/70 font-light max-w-md leading-relaxed">
              Publicação monográfica que documenta a transição entre o pensamento conceitual no croquis e a tridimensionalidade da forma têxtil.
            </p>
          </div>

          {/* Navigation Directory */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B7A18B]">
              Índice Editorial
            </h4>
            <ul className="space-y-2 text-xs tracking-wider uppercase text-[#F2EEE7]/80">
              <li>
                <button
                  onClick={() => navigate('works')}
                  className="hover:text-[#F2EEE7] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Selected Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('atelier')}
                  className="hover:text-[#F2EEE7] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  The Atelier & Processo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-[#F2EEE7] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-[#F2EEE7] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B7A18B]">
              Contato & Canais
            </h4>
            <div className="space-y-1.5 text-xs text-[#F2EEE7]/80">
              <p>
                Email:{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-[#F2EEE7] underline underline-offset-2"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p>
                Instagram:{' '}
                <span className="text-[#B7A18B]">{siteConfig.instagramHandle}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2EEE7]/50 tracking-wider">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {siteConfig.atelierName}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.edition}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.season}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F2EEE7] transition-colors cursor-pointer py-1"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
