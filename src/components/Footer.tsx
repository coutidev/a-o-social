import React from 'react';
import { Heart, ArrowUp, Calendar, MapPin } from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-14 sm:py-16 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Subtle Brand Emblems Line */}
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-heading font-black text-white uppercase mb-4">
          <span>JUREF</span>
          <span className="text-zinc-600 font-normal">•</span>
          <span>JUPES</span>
          <span className="text-zinc-600 font-normal">•</span>
          <span>JUVENTUDE F.C.</span>
        </div>

        {/* The Motto */}
        <p className="text-base sm:text-lg text-zinc-200 font-medium max-w-md">
          “Unidos por uma causa. Unidos pela nossa criançada.”
        </p>

        {/* Event Edition & Location Tag */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Dia 18/10 (18 de Outubro)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-300" />
            <span>Praça Napoleão Côrtes Filho (Los Manos)</span>
          </div>
        </div>

        {/* Back to top & credits */}
        <div className="mt-10 pt-8 border-t border-zinc-900/80 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Feito com amor e união</span>
              <Heart className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" />
              <span>pela comunidade do Sítio Cercado</span>
            </p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-zinc-300 font-medium">
              Feito por <span className="text-white font-semibold">Nicolas Couti</span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer text-xs"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
