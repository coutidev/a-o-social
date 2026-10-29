import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  Users, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Award, 
  Camera, 
  Handshake, 
  ShieldCheck, 
  Gift,
  Smile,
  ChevronRight
} from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { GroupLogosBanner } from '../components/GroupLogosBanner';
import { CountdownTimer } from '../components/CountdownTimer';

interface HomePageProps {
  onNavigate: (page: 'inicio' | 'projeto' | 'patrocinadores' | 'fazer-parte' | 'mural', subSection?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [bannerLoaded, setBannerLoaded] = React.useState<boolean>(true);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (100% Preto e Branco) */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Ambient Lighting com as Cores da Logo (Ciano, Azul e Roxo) */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-purple-600/5 blur-3xl rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Logo Oficial Ação Social JJJ em Destaque no Topo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center mb-5"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/25 via-blue-600/25 to-purple-600/25 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <img
                src="/logo-acao-social-jjj.png"
                alt="Ação Social JJJ"
                className="relative w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]"
              />
            </div>
          </motion.div>

          {/* Badge de Edição e Próxima Ação */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-zinc-950/90 backdrop-blur-md mb-6 shadow-lg shadow-black"
          >
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Próxima Ação: 20 de Dezembro</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300 text-xs font-medium">
              Parque do Semeador • Sítio Cercado (Curitiba)
            </span>
          </motion.div>

          {/* Banner 3D / Composição */}
          {bannerLoaded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] border border-zinc-800 bg-zinc-950"
            >
              <img
                src="/hero-banner.png"
                alt="JUNTOS PELA NOSSA CRIANÇADA - Projeto JJJ"
                className="w-full h-auto object-contain block mx-auto"
                onError={() => setBannerLoaded(false)}
              />
              <h1 className="sr-only">Projeto JJJ - Juntos pela nossa criançada</h1>
            </motion.div>
          ) : (
            <div className="relative w-full max-w-4xl flex flex-col items-center">
              {/* Marca d'água dos 3 brasões */}
              <div 
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] aspect-[2.7/1] select-none z-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
                aria-hidden="true"
              >
                <img
                  src="/logos-unidos.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Título Principal */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 font-anton text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] uppercase"
              >
                JUNTOS PELA NOSSA <br className="hidden sm:inline" />
                <span className="text-jjj-gradient">CRIANÇADA.</span>
              </motion.h1>

              {/* Frase Complementar Obrigatória */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative z-10 mt-5 text-lg sm:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
              >
                “{DONATION_CONFIG.mottoComplement}”
              </motion.p>
            </div>
          )}

          {/* Frase de Referência em Destaque */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-2 text-zinc-200 font-bold text-sm sm:text-base tracking-wider uppercase"
          >
            <span className="w-8 h-px bg-cyan-500/50" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 font-bold">
              “{DONATION_CONFIG.mottoMain}”
            </span>
            <span className="w-8 h-px bg-purple-500/50" />
          </motion.div>

          {/* Botões de Ação Principal com Cores Vivas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => onNavigate('fazer-parte')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 hover:from-cyan-300 hover:via-blue-500 hover:to-purple-500 text-white font-anton text-base uppercase tracking-wider shadow-[0_0_30px_rgba(0,210,255,0.35)] hover:shadow-[0_0_45px_rgba(189,0,255,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>QUERO FAZER PARTE</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('projeto')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-cyan-500/40 hover:border-cyan-300 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all cursor-pointer"
            >
              <span>Conhecer a História</span>
            </button>
          </motion.div>

          {/* Contagem Regressiva para 20 de Dezembro no Parque do Semeador */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full mt-10"
          >
            <CountdownTimer />
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DESTAQUE DE IMPACTO: 500+ CRIANÇAS EM PRETO E BRANCO */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 overflow-hidden shadow-2xl pix-subtle-glow"
        >
          {/* Luz sutil de fundo */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-white/[0.04] blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-white" />
                <span>Impacto Social Comprovado</span>
              </div>

              <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
                Mais de <span>500 crianças</span> alcançadas em 2026
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                A união entre <strong>JUPES</strong>, <strong>Juventude F.C.</strong> e <strong>JUREF</strong> transformou o Dia das Crianças no Sítio Cercado em um marco de amor, brinquedos novos, frutas, doces, algodão-doce, pipas, gincanas e memórias inesquecíveis.
              </p>
            </div>

            {/* Métricas Principais em Grid Preto e Branco */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="font-anton text-2xl sm:text-3xl text-white block">500+</span>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mt-0.5">Crianças</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="font-anton text-2xl sm:text-3xl text-white block">R$ 2.225</span>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mt-0.5">Pix Arrecadado</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="font-anton text-2xl sm:text-3xl text-white block">60+</span>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mt-0.5">Voluntários</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="font-anton text-2xl sm:text-3xl text-white block">3</span>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mt-0.5">Grupos Unidos</span>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OS TRÊS PILARES DA AÇÃO (Totalmente Preto e Branco) */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>Nossos Pilares de Atuação</span>
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Como Transformamos Solidariedade em Sorrisos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Brinquedos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 pix-subtle-glow transition-all group"
          >
            <div className="space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src="/gallery/foto-1-brinquedos.jpg"
                  alt="Doces, pipas e presentes"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 text-white">
                  <Gift className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-anton text-xl text-white uppercase tracking-wide">
                  Brinquedos e Lembrancinhas
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  Cada doação se converte em presentes novos, bolas, bonecas e kits educativos entregues diretamente para cada criança da comunidade.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold">100% sem fins lucrativos</span>
              <span>Edição 2026</span>
            </div>
          </motion.div>

          {/* Card 2: Brincadeiras */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 pix-subtle-glow transition-all group"
          >
            <div className="space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src="/gallery/foto-2-brincadeiras.jpg"
                  alt="Brincadeiras e cama elástica"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 text-white">
                  <Smile className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-anton text-xl text-white uppercase tracking-wide">
                  Recreação e Alegria
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  Cama elástica, pintura facial, gincanas saudáveis, frutas frescas, doces, algodão-doce, pipas e pipoca para todas as famílias na praça.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold">Dia de diversão livre</span>
              <span>18 de Outubro</span>
            </div>
          </motion.div>

          {/* Card 3: Comunidade */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 pix-subtle-glow transition-all group"
          >
            <div className="space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src="/gallery/foto-4-voluntarios.jpg"
                  alt="Comunidade e voluntários"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 text-white">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-anton text-xl text-white uppercase tracking-wide">
                  União Comunitária
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  JUPES, Juventude e JUREF juntos com vizinhos, torcedores e amigos mostrando o poder da união quando o foco é o bem do próximo.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold">Força do Sítio Cercado</span>
              <span>Curitiba - PR</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ATALHOS RÁPIDOS EM PRETO E BRANCO */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Atalho 1: História & Galeria */}
          <motion.button
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: 0.05 }}
            onClick={() => onNavigate('projeto')}
            className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-500 pix-subtle-glow transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-zinc-900 text-white border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-anton text-lg text-white uppercase tracking-wide">
              O Projeto & Galeria
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Explore a nossa história, a transparência dos gastos e as fotos reais da ação.
            </p>
          </motion.button>

          {/* Atalho 2: Patrocinadores */}
          <motion.button
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
            onClick={() => onNavigate('patrocinadores')}
            className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-500 pix-subtle-glow transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-zinc-900 text-white border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors">
                <Handshake className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-anton text-lg text-white uppercase tracking-wide">
              15 Patrocinadores Oficiais
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Conheça as empresas, comércios locais e apoiadores que tornam a festa possível.
            </p>
          </motion.button>

          {/* Atalho 3: Faça Parte */}
          <motion.button
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: 0.25 }}
            onClick={() => onNavigate('fazer-parte')}
            className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-500 pix-subtle-glow transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-zinc-900 text-white border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-anton text-lg text-white uppercase tracking-wide">
              Faça Parte da Missão
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Cadastre-se como voluntário para as próximas ações ou faça sua doação via Pix.
            </p>
          </motion.button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BANNER DOS TRÊS LOGOS OFICIAIS */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.55 }}
        >
          <GroupLogosBanner />
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AGRADECIMENTO À COMUNIDADE */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl pix-subtle-glow"
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <span className="font-anton text-sm sm:text-base uppercase tracking-[0.2em] text-zinc-300 block mb-3">
            Gratidão à nossa gente
          </span>

          <h3 className="font-anton text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
            “Nossa eterna gratidão a cada morador, voluntário e apoiador.”
          </h3>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Ver o brilho no olhar das mais de 500 crianças que brincaram na praça nos faz ter certeza de que a união de bairros e a solidariedade transformam realidades. Que Deus abençoe cada mão estendida.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('mural')}
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Ver Mensagens do Mural
            </button>
            <button
              onClick={() => onNavigate('fazer-parte')}
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Quero Apoiar as Próximas Ações
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
