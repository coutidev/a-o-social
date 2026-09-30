import React from 'react';
import { Gift, Smile, Users, HeartHandshake, CheckCircle2, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const cards = [
    {
      icon: Gift,
      title: "Brinquedos",
      bgImage: "/card-brinquedos.jpeg",
      quote: "Ajude a levar presentes e alegria para as crianças.",
      description:
        "Cada doação se transforma em brinquedos novos, bolas, jogos pedagógicos e lembrancinhas escolhidas com amor para acender o sorriso no rosto dos pequenos.",
      details: ["Brinquedos novos e seguros", "Kits de recreação", "Lembranças especiais"],
    },
    {
      icon: Smile,
      title: "Brincadeiras",
      bgImage: "/card-brincadeiras.jpeg",
      quote: "Queremos proporcionar um dia divertido, leve e inesquecível.",
      description:
        "Estruturamos um dia inteiro de gincanas saudáveis, pintura no rosto, brincadeiras esportivas, lanches gostosos e muita animação para a garotada.",
      details: ["Gincanas e esportes", "Lanches e guloseimas", "Monitores voluntários"],
    },
    {
      icon: Users,
      title: "Comunidade",
      bgImage: "/card-comunidade.jpeg",
      quote: "Três grupos unidos por uma mesma missão: servir e fazer o bem.",
      description:
        "JUPES, Juventude F.C. e JUREF somam suas histórias, jovens e dedicação voluntária. Quando a comunidade se abraça, o futuro das crianças se torna mais brilhante.",
      details: ["Ação 100% sem fins lucrativos", "Transparência total", "União de bairros"],
    },
  ];

  return (
    <section id="sobre" className="py-16 sm:py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ========================================================================= */}
        {/* SPECIAL EVENT ANNOUNCEMENT BOX (18/10 na Praça Napoleão Côrtes Filho) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle light accent */}
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-white/5 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Data Confirmada</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                Grande Ação Social no Dia {DONATION_CONFIG.eventDateShort}
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Venha participar ou contribua para que este dia seja mágico! Um dia repleto de atrações gratuitas, distribuição de brinquedos, brincadeiras recreativas e lanches para todas as crianças.
              </p>

              {/* Location Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white shrink-0" />
                  <span className="font-semibold text-white">
                    {DONATION_CONFIG.eventLocationName}
                  </span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-zinc-400">{DONATION_CONFIG.eventCity}</span>
              </div>
            </div>

            {/* Action Map Button */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={DONATION_CONFIG.eventGoogleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all border border-zinc-700 hover:border-zinc-500 shadow-md cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Ver Local no Mapa</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <a
                href="#doacao"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Apoiar esta Ação</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Section title & main purpose text with scroll fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <HeartHandshake className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              O Propósito da Arrecadação
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Solidariedade que se transforma em sorrisos reais.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Nos unimos para transformar solidariedade em momentos de alegria. A arrecadação será
            destinada à realização de uma ação social para nossa criançada, com brinquedos,
            brincadeiras e atividades preparadas com muito carinho e responsabilidade.
          </p>
        </motion.div>

        {/* The 3 Cards with staggered scroll fade-in */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
              },
            },
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 45, scale: 0.96 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }
                  },
                }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 shadow-2xl overflow-hidden min-h-[440px]"
              >
                {/* Background Photo with zoom and smooth dark gradient overlay */}
                {card.bgImage && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${card.bgImage})` }}
                    />
                    {/* Deep dark gradient overlay for optimal reading contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/92 via-black/85 to-black/95 transition-opacity duration-300 group-hover:opacity-90" />
                    <div className="absolute inset-0 backdrop-blur-[0.5px]" />
                  </>
                )}

                {/* Top glow effect on hover */}
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className="h-13 w-13 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 flex items-center justify-center mb-6 shadow-md group-hover:border-white/50 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mb-2 drop-shadow-sm">
                    {card.title}
                  </h3>

                  {/* Highlight Quote */}
                  <blockquote className="text-xs sm:text-sm font-semibold text-zinc-200 mb-4 border-l-2 border-white/70 bg-white/5 py-1.5 px-3 rounded-r-xl backdrop-blur-sm italic">
                    "{card.quote}"
                  </blockquote>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {card.description}
                  </p>
                </div>

                {/* Bullet details */}
                <div className="relative z-10 pt-4 border-t border-zinc-700/70 space-y-2 bg-black/40 -mx-2 px-3 py-2 rounded-xl backdrop-blur-sm">
                  {card.details.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 drop-shadow" />
                      <span className="font-medium drop-shadow-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commitment note with scroll fade-in */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 rounded-2xl border border-zinc-800 bg-zinc-950 text-center max-w-2xl mx-auto shadow-lg"
        >
          <p className="text-xs sm:text-sm text-zinc-400">
            <strong className="text-white">Prestação de Contas Aberta:</strong> Todas as fotos, vídeos e a prestação do evento na Praça Napoleão Côrtes Filho (Los Manos) serão compartilhados diretamente nos perfis oficiais do Instagram do JUPES, Juventude e JUREF.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
