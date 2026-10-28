import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  url: string;
  caption: string;
  credit?: string;
  title?: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    if (images.length > 1) {
      onNavigate((currentIndex + 1) % images.length);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (images.length > 1) {
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador ampliado de imagem"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#201E1C]/95 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-10" onClick={(e) => e.stopPropagation()}>
        <span className="text-xs uppercase tracking-widest text-[#F2EEE7]/60">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#F2EEE7]/10 hover:bg-[#F2EEE7]/20 text-[#F2EEE7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2EEE7]"
          aria-label="Fechar visualizador"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-[#F2EEE7]/10 hover:bg-[#F2EEE7]/20 text-[#F2EEE7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2EEE7]"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-[#F2EEE7]/10 hover:bg-[#F2EEE7]/20 text-[#F2EEE7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2EEE7]"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Image Container */}
      <div
        className="max-w-5xl max-h-[85vh] p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[72vh] flex items-center justify-center overflow-hidden">
          <img
            src={currentImage.url}
            alt={currentImage.caption || 'Fotografia editorial'}
            className="max-h-[72vh] w-auto max-w-full object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption & credit */}
        <div className="mt-4 text-center max-w-2xl px-4">
          {currentImage.title && (
            <h3 className="font-editorial text-lg text-[#F2EEE7] tracking-wider mb-1">
              {currentImage.title}
            </h3>
          )}
          <p className="text-xs text-[#F2EEE7]/80 leading-relaxed font-light">
            {currentImage.caption}
          </p>
          {currentImage.credit && (
            <p className="text-[10px] uppercase tracking-widest text-[#B7A18B] mt-1">
              {currentImage.credit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
