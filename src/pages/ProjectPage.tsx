import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Camera, 
  PieChart, 
  Heart, 
  Users, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  CheckCircle2, 
  AlertCircle,
  FolderOpen,
  ExternalLink
} from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { GroupLogosBanner } from '../components/GroupLogosBanner';

interface ProjectPageProps {
  onNavigateToJoin?: () => void;
  initialSubSection?: 'historia' | 'galeria' | 'transparencia';
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ 
  onNavigateToJoin,
  initialSubSection = 'historia'
}) => {
  const [activeTab, setActiveTab] = useState<'historia' | 'galeria' | 'transparencia'>(initialSubSection);
  
  // Gallery states
  const [galleryCategory, setGalleryCategory] = useState<'Todos' | 'Brinquedos' | 'Brincadeiras' | 'Comunidade'>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = galleryCategory === 'Todos' 
    ? DONATION_CONFIG.gallery 
    : DONATION_CONFIG.gallery.filter(item => item.category === galleryCategory);

  const currentLightboxItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredGallery.length - 1));
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredGallery.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO DA PÁGINA O PROJETO (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Subtle Ambient Monochrome Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-white/[0.03] blur-3xl rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-black">
            <BookOpen className="w-3.5 h-3.5" />
            <span>O Projeto JJJ</span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            Nossa História, Ação e <br className="hidden sm:inline" />
            <span>Transparência Real</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Conheça as raízes da aliança entre JUPES, Juventude e JUREF, veja os registros visuais da ação e acompanhe a destinação de cada recurso doado.
          </p>

          {/* Subnavegação Interna em Abas (Preto e Branco) */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl max-w-full overflow-x-auto">
              <button
                onClick={() => setActiveTab('historia')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-anton uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'historia'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Nossa História</span>
              </button>

              <button
                onClick={() => setActiveTab('galeria')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-anton uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'galeria'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Galeria de Fotos</span>
              </button>

              <button
                onClick={() => setActiveTab('transparencia')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-anton uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'transparencia'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Impacto & Transparência</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO PRINCIPAL (BASEADO NA ABA SELECIONADA) */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 1: NOSSA HISTÓRIA */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'historia' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Banner Oficial dos Três Grupos */}
            <GroupLogosBanner />

            {/* Grid da História e Propósito */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Coluna 1 & 2: A Origem e o Propósito */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55 }}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 pix-subtle-glow"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Propósito Social & Comunitário</span>
                  </div>

                  <h2 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    A Força da União: JUPES, Juventude e JUREF
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    O <strong>Projeto JJJ</strong> nasceu de um sonho compartilhado entre três entidades com profundas raízes na juventude, no esporte e na solidariedade comunitária de Curitiba: o <strong>Grupo JUPES</strong>, o tradicional <strong>Juventude Futebol Clube (fundado em 1981)</strong> e o <strong>Grupo JUREF</strong>.
                  </p>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    Mais do que organizar um evento comemorativo no Dia das Crianças, o objetivo do projeto é fortalecer os vínculos da comunidade do Sítio Cercado, oferecendo um dia inteiro de dignidade, brincadeiras gratuitas, presentes de qualidade e afeto genuíno para crianças em vulnerabilidade social.
                  </p>

                  <div className="pt-4 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <span className="font-anton text-xl text-white block">JUPES</span>
                      <span className="text-[11px] text-zinc-400">Fé, acolhimento e presença contínua</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <span className="font-anton text-xl text-white block">JUVENTUDE 1981</span>
                      <span className="text-[11px] text-zinc-400">Tradição esportiva & cidadania</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <span className="font-anton text-xl text-white block">JUREF</span>
                      <span className="text-[11px] text-zinc-400">Juventude, garra e ação direta</span>
                    </div>
                  </div>
                </motion.div>

                {/* Relato da Edição de 2026 */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 pix-subtle-glow"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-white" />
                    <span>Relato Oficial da Edição 2026</span>
                  </div>

                  <h3 className="font-anton text-2xl text-white uppercase tracking-tight">
                    Um Dia Inesquecível na Praça Penetras
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    Em 2026, a Praça Professora Marli Queiroz de Azevedo (conhecida carinhosamente como Penetras) reuniu mais de <strong>500 crianças</strong> acompanhadas de suas famílias. 
                  </p>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    Graças à arrecadação de <strong>R$ 2.225 via Pix</strong> e o suporte decisivo dos 15 patrocinadores oficiais, foram distribuídos centenas de brinquedos novos, frutas frescas, doces variados, algodão-doce, pipas, além de estações de cama elástica, gincanas de futebol, pintura facial e música.
                  </p>
                </motion.div>
              </div>

              {/* Coluna 3: Agradecimento aos Voluntários e Apoiadores */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 h-full flex flex-col justify-between pix-subtle-glow"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                      <Users className="w-6 h-6" />
                    </div>

                    <h3 className="font-anton text-xl text-white uppercase tracking-tight">
                      Aos Voluntários & Apoiadores
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Nenhum brinquedo ou pipa seria entregue, e nenhuma fruta ou algodão-doce seria distribuído sem os mais de <strong>60 voluntários</strong> que doaram seu sábado, acordaram cedo e colocaram o coração na preparação.
                    </p>

                    <blockquote className="p-4 rounded-2xl bg-zinc-900 border-l-2 border-white text-xs text-zinc-300 italic leading-relaxed">
                      “A recompensa de cada gota de suor é ver o sorriso sincero e a alegria radiante no olhar de uma criança que ganhou seu brinquedo novo.”
                    </blockquote>

                    <p className="text-xs text-zinc-500">
                      Nosso respeito e admiração a cada comerciante do bairro, amigo, voluntário e família que somou forças com o Projeto JJJ.
                    </p>
                  </div>

                  {onNavigateToJoin && (
                    <div className="mt-6 pt-4 border-t border-zinc-900">
                      <button
                        onClick={onNavigateToJoin}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-anton text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                      >
                        <Heart className="w-3.5 h-3.5 fill-black text-black" />
                        <span>Quero ser Voluntário</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 2: GALERIA DE FOTOS (Com Zoom, Navegação e Responsividade) */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'galeria' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Filtros de Categoria em Preto e Branco */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-white" />
                <span className="text-xs sm:text-sm font-bold text-zinc-300 uppercase tracking-wider">
                  Registros Reais da Ação
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['Todos', 'Brinquedos', 'Brincadeiras', 'Comunidade'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      galleryCategory === cat
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Imagens com Efeito de Hover e Zoom com Scroll-Triggered Slide-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredGallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-500 pix-subtle-glow transition-all duration-300 shadow-xl"
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-zinc-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
                    
                    {/* Badge de Categoria */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-zinc-700 text-white text-[11px] font-bold uppercase tracking-wider">
                      {item.category}
                    </div>

                    {/* Botão de Zoom no Hover */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/80 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>

                    {/* Legenda na base */}
                    <div className="absolute bottom-4 inset-x-4 text-left">
                      <h4 className="font-anton text-lg sm:text-xl text-white uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox / Modal de Foto Ampliada */}
            <AnimatePresence>
              {lightboxIndex !== null && currentLightboxItem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                  onClick={() => setLightboxIndex(null)}
                >
                  <div 
                    className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Botão Fechar */}
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="absolute -top-12 right-0 p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Fechar ampliação"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Imagem Ampliada */}
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl max-h-[70vh]">
                      <img
                        src={currentLightboxItem.imageUrl}
                        alt={currentLightboxItem.title}
                        className="max-h-[70vh] w-auto object-contain mx-auto filter grayscale contrast-125"
                      />
                    </div>

                    {/* Info da Foto e Navegação */}
                    <div className="mt-4 w-full flex items-center justify-between text-left px-2">
                      <div>
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                          {currentLightboxItem.category} • Foto {lightboxIndex + 1} de {filteredGallery.length}
                        </span>
                        <h3 className="font-anton text-lg sm:text-xl text-white uppercase mt-0.5">
                          {currentLightboxItem.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
                          {currentLightboxItem.description}
                        </p>
                      </div>

                      {/* Botões Anterior e Próxima */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handlePrevImage}
                          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white transition-all cursor-pointer"
                          aria-label="Foto anterior"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white transition-all cursor-pointer"
                          aria-label="Próxima foto"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 3: IMPACTO E TRANSPARÊNCIA FINANCEIRA */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'transparencia' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Cartões dos 4 Indicadores Reais com Scroll-Triggered Slide-up */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { val: DONATION_CONFIG.impactNumbers.children, label: DONATION_CONFIG.impactNumbers.childrenLabel },
                { val: DONATION_CONFIG.impactNumbers.raised, label: DONATION_CONFIG.impactNumbers.raisedLabel },
                { val: DONATION_CONFIG.impactNumbers.volunteers, label: DONATION_CONFIG.impactNumbers.volunteersLabel },
                { val: '15', label: 'Patrocinadores Oficiais' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 text-center pix-subtle-glow"
                >
                  <span className="font-anton text-3xl sm:text-4xl text-white block">
                    {stat.val}
                  </span>
                  <span className="text-xs text-zinc-400 uppercase font-bold mt-1 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bloco Oficial de Prestação de Contas no Google Drive */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-6 pix-subtle-glow relative overflow-hidden"
            >
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-white/[0.04] blur-3xl rounded-full" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Prestação de Contas 100% Aberta</span>
                </div>

                <h3 className="font-anton text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-tight">
                  Comprovantes & Notas Fiscais
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Para garantir total transparência com cada doador, patrocinador e voluntário, todos os comprovantes, notas fiscais, extratos e recibos do Projeto JJJ estão disponibilizados publicamente para consulta na nossa pasta oficial do Google Drive.
                </p>

                {/* Botão de Destaque para Acesso ao Google Drive */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={DONATION_CONFIG.accountability.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-anton text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <FolderOpen className="w-5 h-5 text-black" />
                    <span>Acessar Prestação de Contas no Drive</span>
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>
                </div>

                {/* Badges de garantia */}
                <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Notas Fiscais de Compras
                  </span>
                  <span className="hidden sm:inline text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Comprovantes & Extratos Pix
                  </span>
                  <span className="hidden sm:inline text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Recibos de Doações e Insumos
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>

    </div>
  );
};
