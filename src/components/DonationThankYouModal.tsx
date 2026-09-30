import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Instagram, ExternalLink, X, Sparkles } from 'lucide-react';

interface DonationThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupCard {
  id: string;
  name: string;
  handle: string;
  url: string;
  subtitle: string;
}

const groups: GroupCard[] = [
  {
    id: 'juref',
    name: 'JUREF',
    handle: '@grupo_juref',
    url: 'https://instagram.com/grupo_juref',
    subtitle: 'Comunidade & Solidariedade',
  },
  {
    id: 'jupes',
    name: 'JUPES',
    handle: '@jupesneles',
    url: 'https://instagram.com/jupesneles',
    subtitle: 'Juventude & Esperança',
  },
  {
    id: 'juventude',
    name: 'JUVENTUDE F.C.',
    handle: '@juventude1981',
    url: 'https://instagram.com/juventude1981',
    subtitle: 'Curitiba Desde 1981',
  },
];

export const DonationThankYouModal: React.FC<DonationThankYouModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Panel - Modern slide up from bottom */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 28, 
              stiffness: 260,
              mass: 0.95
            }}
            className="relative w-full max-w-3xl bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-10 shadow-[0_-10px_60px_rgba(0,0,0,0.9)] z-10 max-h-[92vh] overflow-y-auto my-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Drag Indicator for mobile */}
            <div className="w-12 h-1.5 bg-zinc-700/80 rounded-full mx-auto mb-4 sm:hidden" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-all cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Subtle glow orb inside modal */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-white/5 blur-3xl rounded-full" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Heart Badge with breathing animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(255,255,255,0.18)]"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                </motion.div>
              </motion.div>

              {/* Main Headline in Anton */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-anton text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.98] max-w-2xl drop-shadow-md"
              >
                VOCÊ FORTALECEU A NOSSA CRIANÇADA. 🤍
              </motion.h2>

              {/* Subtitle text */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="mt-4 text-base sm:text-xl text-zinc-300 font-normal max-w-xl leading-relaxed"
              >
                O PIX pode ser pequeno pra você, mas junto com toda a quebrada ele vira brinquedo, brincadeira, sorriso e memória.
              </motion.p>

              {/* Follow-up hook */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span className="font-anton text-sm sm:text-base text-white uppercase tracking-wider">
                  Agora cola com nós para ver como será nossa Ação Social.
                </span>
              </motion.div>

              {/* 3 Group Cards: Side-by-side on desktop, stacked on mobile */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-2">
                {groups.map((group, idx) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + idx * 0.1 }}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 shadow-lg text-left"
                  >
                    <div>
                      {/* Top bar with icon */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-anton text-xl sm:text-2xl text-white tracking-tight uppercase">
                          {group.name}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Instagram className="w-4 h-4 text-zinc-200" />
                        </div>
                      </div>

                      {/* Handle */}
                      <p className="font-mono text-xs sm:text-sm text-zinc-400 font-semibold mb-1">
                        {group.handle}
                      </p>
                      <p className="text-[11px] sm:text-xs text-zinc-500 mb-4">
                        {group.subtitle}
                      </p>
                    </div>

                    {/* Follow button */}
                    <a
                      href={group.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <Instagram className="w-3.5 h-3.5 text-black" />
                      <span>SEGUIR NO INSTAGRAM</span>
                      <ExternalLink className="w-3 h-3 text-zinc-600" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Closing community note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-7 text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed"
              >
                Obrigado por fazer parte dessa corrente. A gente vai mostrar por lá tudo que essa união tornou possível.
              </motion.p>

              {/* Discrete Back Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                onClick={onClose}
                className="mt-5 inline-flex items-center justify-center py-2 px-6 rounded-full border border-zinc-800 hover:border-zinc-600 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer uppercase tracking-wider bg-zinc-900/50 hover:bg-zinc-900"
              >
                Voltar para o site
              </motion.button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
