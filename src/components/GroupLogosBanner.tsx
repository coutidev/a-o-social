import React, { useState, useRef, useEffect } from 'react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { 
  Sparkles, 
  Upload, 
  Crop, 
  Sliders, 
  RotateCcw, 
  Download, 
  Check, 
  Info,
  Maximize2
} from 'lucide-react';

interface GroupLogosBannerProps {
  className?: string;
}

export const GroupLogosBanner: React.FC<GroupLogosBannerProps> = ({
  className = ''
}) => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(() => {
    return localStorage.getItem('acao_social_custom_logo') || DONATION_CONFIG.groupsLogoUrl;
  });
  const [zoom, setZoom] = useState<number>(() => {
    return Number(localStorage.getItem('acao_social_logo_zoom')) || 1;
  });
  const [offsetY, setOffsetY] = useState<number>(() => {
    return Number(localStorage.getItem('acao_social_logo_offset_y')) || 0;
  });
  const [isAdjusting, setIsAdjusting] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically detect if the loaded image is a vertical screenshot (9:16)
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    // If vertical aspect ratio (height much larger than width, typical WhatsApp mobile screenshot)
    if (ratio < 0.8) {
      setIsPortrait(true);
      // If user hasn't set manual zoom yet, auto-zoom to frame the 3 logos
      if (!localStorage.getItem('acao_social_logo_zoom')) {
        setZoom(2.8);
        setOffsetY(0);
      }
    } else {
      setIsPortrait(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          // Check image dimensions
          const testImg = new Image();
          testImg.onload = () => {
            const ratio = testImg.naturalWidth / testImg.naturalHeight;
            if (ratio < 0.8) {
              // Automatically apply the ideal zoom for the WhatsApp 9:16 image
              setIsPortrait(true);
              setZoom(2.8);
              setOffsetY(0);
              localStorage.setItem('acao_social_logo_zoom', '2.8');
              localStorage.setItem('acao_social_logo_offset_y', '0');
            } else {
              setIsPortrait(false);
              setZoom(1);
              setOffsetY(0);
            }
            setCurrentImageSrc(result);
            localStorage.setItem('acao_social_custom_logo', result);
            setIsAdjusting(true);
          };
          testImg.src = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('acao_social_custom_logo');
    localStorage.removeItem('acao_social_logo_zoom');
    localStorage.removeItem('acao_social_logo_offset_y');
    setCurrentImageSrc(DONATION_CONFIG.groupsLogoUrl);
    setZoom(1);
    setOffsetY(0);
    setIsPortrait(false);
    setIsAdjusting(false);
  };

  const handleSaveAdjustments = () => {
    localStorage.setItem('acao_social_logo_zoom', String(zoom));
    localStorage.setItem('acao_social_logo_offset_y', String(offsetY));
    setIsAdjusting(false);
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-black to-black p-4 sm:p-7 shadow-2xl ${className}`}>
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-white/5 blur-3xl rounded-full" />
      
      {/* Header bar of the crest presentation */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
            União Oficial: JUREF • J.U.P.E.S. • JUVENTUDE F.C.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 hover:border-zinc-500 text-xs font-medium text-zinc-200 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 text-white" />
            <span>Inserir Foto Original</span>
          </button>

          <button
            onClick={() => setIsAdjusting(!isAdjusting)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              isAdjusting
                ? 'bg-white text-black border-white'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Ajustar zoom e enquadramento da logo"
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden sm:inline">Enquadramento</span>
          </button>

          {currentImageSrc !== DONATION_CONFIG.groupsLogoUrl && (
            <button
              onClick={handleResetToDefault}
              className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
              title="Restaurar emblema vetor padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Display Frame: Auto-frames and centers the 3 circular logos */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[300px] flex items-center justify-center bg-black rounded-2xl border border-zinc-900 overflow-hidden shadow-inner">
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoom}) translateY(${offsetY}px)`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={currentImageSrc}
            alt="Logos JUREF, J.U.P.E.S. e JUVENTUDE F.C."
            onLoad={handleImageLoad}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
            loading="eager"
          />
        </div>

        {/* Helpful indicator when image is adjusted */}
        {isPortrait && !isAdjusting && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur border border-zinc-800 text-[10px] text-zinc-400 font-mono pointer-events-none">
            Enquadramento automático ativo (3 logos ampliadas)
          </div>
        )}
      </div>

      {/* Quick Adjuster Drawer (Zoom & Vertical alignment) */}
      {isAdjusting && (
        <div className="mt-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>Ajustar Enquadramento da Logo</span>
            </div>
            <button
              onClick={handleSaveAdjustments}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Concluir</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Zoom Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Tamanho / Zoom</span>
                <span className="font-mono text-white">{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="4.0"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Vertical Position Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Posição Vertical</span>
                <span className="font-mono text-white">{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={offsetY}
                onChange={(e) => setOffsetY(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          <p className="text-[11px] text-zinc-400">
            Dica: Se você enviou o print do celular (que tem barras pretas em cima e embaixo), basta ajustar o zoom em ~<strong>2.8x</strong> para as 3 logos preencherem a tela perfeitamente!
          </p>
        </div>
      )}

      {/* Caption bottom bar with each group's label */}
      <div className="mt-4 pt-3 border-t border-zinc-850 grid grid-cols-3 text-center text-xs divide-x divide-zinc-850">
        <div className="px-2">
          <span className="font-heading font-black text-white tracking-wider block text-xs sm:text-sm">JUREF</span>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 block">Lobo &amp; Estrelas</span>
        </div>
        <div className="px-2">
          <span className="font-heading font-black text-white tracking-wider block text-xs sm:text-sm">J.U.P.E.S.</span>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 block">Águia &amp; Cruz</span>
        </div>
        <div className="px-2">
          <span className="font-heading font-black text-white tracking-wider block text-xs sm:text-sm">JUVENTUDE F.C.</span>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 block">Curitiba 1981</span>
        </div>
      </div>
    </div>
  );
};
