import React, { useState } from 'react';
import { DONATION_CONFIG } from '../config/donationConfig';

interface GroupLogosBannerProps {
  className?: string;
}

export const GroupLogosBanner: React.FC<GroupLogosBannerProps> = ({
  className = ''
}) => {
  const [imageSrc, setImageSrc] = useState<string>(DONATION_CONFIG.groupsLogoUrl);

  const handleImageError = () => {
    // If local cropped png fails, fall back to direct Imgur link, then svg
    if (imageSrc === '/logos-unidos.png') {
      setImageSrc('https://i.imgur.com/nHDd4I6.jpeg');
    } else if (imageSrc !== '/logos-unidos.svg') {
      setImageSrc('/logos-unidos.svg');
    }
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-black to-black p-4 sm:p-7 shadow-2xl ${className}`}>
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-white/5 blur-3xl rounded-full" />
      
      {/* Clean official header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
            União Oficial: JUREF • J.U.P.E.S. • JUVENTUDE F.C.
          </p>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 font-medium">Curitiba 2026</span>
      </div>

      {/* Primary Display Frame: High-definition 3 circular logos */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[300px] flex items-center justify-center bg-black rounded-2xl border border-zinc-900 overflow-hidden shadow-inner p-2 sm:p-4">
        <img
          src={imageSrc}
          alt="Logos JUREF, J.U.P.E.S. e JUVENTUDE F.C."
          onError={handleImageError}
          className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
        />
      </div>

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
