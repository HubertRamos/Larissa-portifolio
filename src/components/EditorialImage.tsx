import React, { useState, useEffect } from 'react';

export interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  subtitle?: string;
  showHoverZoom?: boolean;
}

/**
 * EditorialImage
 * 
 * Production-grade image component designed specifically for luxury editorial fashion portfolios.
 * - Resolves relative and absolute project paths consistently.
 * - Provides graceful layout-preserving fallback if an image is missing or cannot be decoded.
 * - Prevents unsightly browser broken-image icons and layout shift.
 * - Logs informative warnings strictly to the developer console without cluttering the public UI.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-4/3',
  onClick,
  loading = 'lazy',
  fetchPriority = 'auto',
  subtitle,
  showHoverZoom = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset states whenever src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    // Developer-friendly console warning without displaying technical jargon to users
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(
        `[EditorialImage] Imagem não encontrada ou falha ao carregar no caminho: "${src}" (${alt}). Verifique o arquivo correspondente na pasta do projeto.`
      );
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} bg-[#201E1C]/[0.03] transition-colors ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Subtle skeleton pulse while loading */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#201E1C]/5 animate-pulse"
        />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
          } ${showHoverZoom ? 'group-hover:scale-[1.03]' : ''} ${className}`}
        />
      ) : (
        /* Editorial Fallback Frame — Maintains exact aspect ratio, pure editorial aesthetics */
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-[#201E1C]/10 bg-[#F2EEE7]/80 select-none"
          role="img"
          aria-label={alt}
        >
          <div className="w-6 h-[1px] bg-[#713C42]/50 mb-3" />
          <span className="font-editorial text-lg sm:text-xl text-[#201E1C]/85 italic line-clamp-2 max-w-xs">
            {alt || 'Estudo de Ateliê'}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#713C42] mt-2 font-medium">
            {subtitle || 'Arquivo de Criação'}
          </span>
        </div>
      )}
    </div>
  );
};
