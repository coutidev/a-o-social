import React from 'react';
import { GroupLogosBanner } from './GroupLogosBanner';
import { CountdownTimer } from './CountdownTimer';
import { ArrowDown, QrCode, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onDonateClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDonateClick, onLearnMoreClick }) => {
  return (
    <section id="inicio" className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-zinc-700/15 via-zinc-800/5 to-transparent blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Event Date & Location Announcement Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-zinc-700/80 bg-zinc-950/90 backdrop-blur-md mb-5 shadow-lg"
        >
          <div className="flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span>Dia 18/10 (18 de Outubro)</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-zinc-300 font-medium text-xs sm:text-sm">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
            <span>Praça Napoleão Côrtes Filho (Los Manos)</span>
          </div>
        </motion.div>

        {/* Headline & Subtle Watermark Container */}
        <div className="relative w-full max-w-5xl flex flex-col items-center">
          
          {/* Subtle Watermark: The 3 official group emblems behind the words, softened for maximum legibility */}
          <div 
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] md:w-[740px] max-w-full aspect-[2.7/1] select-none z-0 opacity-12 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
            aria-hidden="true"
          >
            <img
              src="/logos-unidos.png"
              alt=""
              className="w-full h-full object-contain filter grayscale contrast-125"
            />
          </div>

          {/* Dark backdrop vignette behind the letters to guarantee 100% clear readability */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[620px] h-48 bg-black/60 blur-2xl rounded-full z-0" />

          {/* High-Impact Headline in Anton: pesada, condensada, pôster / camisa de torcida / lambe-lambe */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.92] max-w-5xl [text-shadow:_0_4px_30px_rgba(0,0,0,1)] uppercase"
          >
            JUNTOS PELA NOSSA <br className="hidden sm:inline" />
            <span className="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]">
              CRIANÇADA.
            </span>
          </motion.h1>

          {/* Subtitle text in Barlow Condensed */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 mt-6 text-lg sm:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <strong className="text-white font-semibold">JUPES</strong>,{' '}
            <strong className="text-white font-semibold">Juventude F.C.</strong> e{' '}
            <strong className="text-white font-semibold">JUREF</strong> se unem por uma causa especial:{' '}
            proporcionar alegria, brincadeiras e momentos inesquecíveis para nossas crianças.
          </motion.p>
        </div>

        {/* Dynamic Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 sm:mt-9 relative z-10"
        >
          <CountdownTimer />
        </motion.div>

        {/* Big CTA Buttons with Barlow Condensed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto relative z-10"
        >
          <button
            onClick={onDonateClick}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-white text-black font-bold text-lg sm:text-xl tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:bg-zinc-100 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase"
          >
            <QrCode className="w-5 h-5 text-black" />
            <span>FAZER UMA DOAÇÃO (VALOR LIVRE)</span>
            <ArrowDown className="w-4 h-4 text-zinc-700 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={onLearnMoreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer uppercase tracking-wider"
          >
            <span>Informações do Evento</span>
          </button>
        </motion.div>

        {/* Confidence pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-400 font-medium relative z-10"
        >
          <span className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Doe qualquer quantia (sem valor mínimo)
          </span>
          <span className="hidden sm:inline">•</span>
          <span>100% revertido para a criançada</span>
        </motion.div>

        {/* Featured Group Logos Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full mt-10 sm:mt-14 relative z-10"
        >
          <GroupLogosBanner />
        </motion.div>

      </div>
    </section>
  );
};
