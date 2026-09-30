import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { motion } from 'motion/react';

// Custom Minimal Monochrome Instagram Icon
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const InstagramSection: React.FC = () => {
  return (
    <section id="grupos" className="py-20 sm:py-28 border-t border-zinc-900 bg-gradient-to-b from-black via-zinc-950/60 to-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <InstagramIcon className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Redes Oficiais
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Acompanhe nossos grupos
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal">
            Siga os perfis para conferir as novidades, a preparação da ação e cada momento da entrega dos brinquedos.
          </p>
        </div>

        {/* The 3 Instagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DONATION_CONFIG.groups.map((group, index) => (
            <motion.a
              key={group.id}
              href={group.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-500 transition-all duration-300 hover:bg-zinc-900/70 hover:-translate-y-1.5 shadow-xl cursor-pointer"
            >
              {/* Subtle top sheen on hover */}
              <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header row: Instagram icon + external arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-750 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <InstagramIcon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                    <span className="hidden sm:inline">Ver perfil</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Group Identification */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-2xl text-white tracking-wide">
                      {group.name}
                    </h3>
                    {group.badgeText && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {group.badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    {group.fullName}
                  </p>
                </div>

                {/* Instagram Handle */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono text-sm font-semibold group-hover:border-zinc-600 transition-colors">
                  <span className="text-zinc-500 font-normal">ig/</span>
                  <span className="text-white">{group.handle}</span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {group.description}
                </p>
              </div>

              {/* Action pill in footer of card */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="text-[11px] text-zinc-500">Instagram Oficial</span>
                <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors flex items-center gap-1">
                  Acessar perfil <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Hashtag & Community Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs tracking-widest uppercase text-zinc-400 font-mono">
            #AcaoSocial2026 • #JuntosPelaNossaCriancada • #Solidariedade
          </p>
        </div>

      </div>
    </section>
  );
};
