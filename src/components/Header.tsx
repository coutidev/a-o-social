import React from 'react';
import { Heart, ArrowDownRight, Calendar, MapPin } from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';

interface HeaderProps {
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/85 border-b border-zinc-800/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left branding */}
        <a 
          href="#inicio" 
          className="flex flex-col group transition-transform active:scale-95"
          aria-label="Ir para o topo"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" />
            <span className="bubble-graffiti text-2xl sm:text-3xl tracking-wide text-white group-hover:scale-105 transition-transform origin-left select-none">
              AÇÃO SOCIAL
            </span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400 font-semibold group-hover:text-white transition-colors">
            JUPES • JUVENTUDE • JUREF
          </span>
        </a>

        {/* Center discrete date badge (desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-zinc-200 font-semibold">{DONATION_CONFIG.eventDateShort}</span>
          <span>•</span>
          <span className="text-zinc-400">Praça Napoleão Côrtes Filho (Los Manos)</span>
        </div>

        {/* Right CTA button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onDonateClick}
            className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black group-hover:scale-110 transition-transform" />
            <span>Quero doar</span>
            <ArrowDownRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-black group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all hidden sm:inline-block" />
          </button>
        </div>

      </div>
    </header>
  );
};
