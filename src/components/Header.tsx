import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../types/portfolio';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string, param?: string) => void;
  siteConfig: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  siteConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'works', label: 'Selected Works' },
    { id: 'atelier', label: 'The Atelier' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#F2EEE7]/95 backdrop-blur-md border-[#201E1C]/10 py-3.5 shadow-xs'
          : 'bg-[#F2EEE7] border-[#201E1C]/10 py-5'
      }`}
    >
      {/* Discrete Editorial Reading Progress Hairline */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#201E1C]/5 overflow-hidden">
        <div
          className="h-full bg-[#713C42] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#201E1C]"
          aria-label={`${siteConfig.atelierName} - Início`}
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-widest font-normal text-[#201E1C] whitespace-nowrap shrink-0 transition-opacity group-hover:opacity-80">
            {siteConfig.atelierName}
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text with subtle underline hover) */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-[#201E1C]/80"
          aria-label="Navegação Principal"
        >
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#201E1C] ${
                  isActive
                    ? 'border-[#201E1C] text-[#201E1C] font-semibold'
                    : 'border-transparent text-[#201E1C]/70 hover:text-[#201E1C] hover:border-[#201E1C]/30'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-[#F2EEE7] bg-[#201E1C] hover:bg-[#713C42] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#713C42]"
          >
            Contato
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#201E1C] focus-visible:outline-2 focus-visible:outline-[#201E1C] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#201E1C]/10 bg-[#F2EEE7] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-sm uppercase tracking-widest py-2 ${
                currentRoute === 'home' ? 'font-semibold text-[#201E1C]' : 'text-[#201E1C]/70'
              }`}
            >
              Home
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm uppercase tracking-widest py-2 ${
                  currentRoute === item.id ? 'font-semibold text-[#201E1C]' : 'text-[#201E1C]/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#201E1C]/10">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs uppercase tracking-wider text-[#F2EEE7] bg-[#201E1C]"
            >
              <span>Contato</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
