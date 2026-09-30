import React from 'react';
import { QrCode, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { DONATION_CONFIG } from '../config/donationConfig';

interface PixProgressBarProps {
  current?: number;
  targetLabel?: string;
  className?: string;
}

export const ToyProgressBar: React.FC<PixProgressBarProps> = ({
  current = DONATION_CONFIG.pixGoal?.current ?? 0,
  targetLabel = DONATION_CONFIG.pixGoal?.targetLabel ?? 'O que vier é bênção',
  className = '',
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-md p-5 sm:p-6 shadow-xl max-w-2xl mx-auto ${className}`}
    >
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-20 bg-white/5 blur-2xl rounded-full" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <QrCode className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-anton text-base sm:text-lg text-white uppercase tracking-wide">
                Meta de Arrecadação PIX
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                Ação Social
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Unidos pela nossa criançada • 18/10
            </p>
          </div>
        </div>

        {/* Highlight Goal Badge: O que vier é bênção */}
        <div className="inline-flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-white text-black font-anton text-xs sm:text-sm tracking-wider uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Meta: “{targetLabel}”</span>
        </div>
      </div>

      {/* Community Momentum Bar (Campanha Aberta / Valor Livre) */}
      <div className="space-y-2">
        <div className="relative w-full h-3.5 sm:h-4 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full rounded-full bg-gradient-to-r from-zinc-800 via-zinc-400 to-white relative opacity-70"
          >
            {/* Subtle inner moving shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
          </motion.div>
        </div>

        {/* Numbers & Breakdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-1">
          <div className="flex items-center gap-1.5">
            <span className="font-anton text-sm sm:text-base text-white tracking-wide">
              {formatCurrency(current)}
            </span>
            <span className="text-zinc-400">arrecadados até o momento</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-zinc-400">Objetivo:</span>
            <strong className="text-white font-semibold">“{targetLabel}”</strong>
          </div>
        </div>
      </div>

      {/* Community note */}
      <div className="mt-3.5 pt-3 border-t border-zinc-900 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-zinc-400 fill-zinc-400 shrink-0" />
          <span>Qualquer quantia fortalece a compra de brinquedos e lanches.</span>
        </div>
        <span className="text-zinc-500 font-medium hidden sm:inline shrink-0">
          Los Manos • Sítio Cercado
        </span>
      </div>
    </motion.div>
  );
};
