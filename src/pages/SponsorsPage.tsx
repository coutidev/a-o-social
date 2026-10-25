import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Handshake, 
  Instagram, 
  ExternalLink, 
  Building2, 
  CheckCircle2, 
  X,
  Send,
  Search
} from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';

interface SponsorsPageProps {
  onNavigateToJoin?: () => void;
}

export const SponsorsPage: React.FC<SponsorsPageProps> = ({ onNavigateToJoin }) => {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);
  const [partnerData, setPartnerData] = useState({
    companyName: '',
    responsibleName: '',
    whatsapp: '',
    segment: '',
    message: ''
  });

  const categories = ['Todas', ...Array.from(new Set(DONATION_CONFIG.sponsors.map(s => s.category || 'Apoiador')))];

  const filteredSponsors = DONATION_CONFIG.sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (sponsor.instagramHandle && sponsor.instagramHandle.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (sponsor.category && sponsor.category.toLowerCase().includes(searchFilter.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'Todas' || sponsor.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerFormSubmitted(true);
    setTimeout(() => {
      setPartnerFormSubmitted(false);
      setPartnerModalOpen(false);
      setPartnerData({
        companyName: '',
        responsibleName: '',
        whatsapp: '',
        segment: '',
        message: ''
      });
    }, 2500);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO CABEÇALHO DA PÁGINA PATROCINADORES (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden text-center">
        {/* Subtle Ambient Monochrome Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-white/[0.03] blur-3xl rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-black">
            <Handshake className="w-3.5 h-3.5 text-white" />
            <span>Patrocinadores & Parceiros Oficiais</span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            Quem Acredita no <br className="hidden sm:inline" />
            <span>Futuro das Nossas Crianças</span>
          </h1>

          {/* Mensagem de agradecimento obrigatória com slide-up */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-3xl mx-auto relative shadow-2xl pix-subtle-glow"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="text-base sm:text-lg text-zinc-200 font-medium italic leading-relaxed">
              “Cada contribuição fez parte dessa história. Obrigado por acreditar no poder da solidariedade e por ajudar a transformar esse projeto em realidade.”
            </p>
            <span className="block mt-3 text-xs uppercase tracking-widest text-zinc-400 font-bold">
              — Coordenação Projeto JJJ (JUPES • Juventude • JUREF)
            </span>
          </motion.div>

          {/* Botão de Destaque "SEJA UM PARCEIRO" */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-anton text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 className="w-5 h-5 text-black" />
              <span>SEJA UM PARCEIRO</span>
            </button>

            {onNavigateToJoin && (
              <button
                onClick={onNavigateToJoin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Fazer Doação Individual</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FILTROS E BUSCA */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-lg"
        >
          
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Buscar parceiro por nome, segmento ou @..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Filtro de Categorias em Preto e Branco */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GRADE DE PATROCINADORES COM SCROLL-TRIGGERED SLIDE-UP */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {filteredSponsors.length === 0 ? (
          /* Estado Vazio */
          <div className="p-12 text-center rounded-3xl bg-zinc-950 border border-zinc-800 max-w-xl mx-auto space-y-4">
            <Building2 className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="font-anton text-xl text-white uppercase">Nenhum parceiro encontrado</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Não encontramos nenhum patrocinador com o filtro selecionado. Limpe a busca para visualizar todos os 15 parceiros oficiais.
            </p>
            <button
              onClick={() => { setSearchFilter(''); setCategoryFilter('Todas'); }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] pix-subtle-glow transition-all duration-300"
              >
                <div>
                  {/* Topo do Card: Categoria */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                      {sponsor.category || 'Parceiro Social'}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Oficial 2026
                    </span>
                  </div>

                  {/* Moldura do Logotipo em Fundo Preto e Branco */}
                  <div className="relative h-28 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center p-4 mb-4 group-hover:border-zinc-600 transition-colors overflow-hidden">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={`Logo ${sponsor.name}`}
                        className="max-h-full max-w-full object-contain filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                          const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Monograma estilizado */}
                    <div 
                      className={`flex flex-col items-center justify-center text-center ${sponsor.logoUrl ? 'hidden' : 'flex'}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-anton text-xl mb-1">
                        {sponsor.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        Apoiador Confirmado
                      </span>
                    </div>
                  </div>

                  {/* Nome do Patrocinador */}
                  <h3 className="font-anton text-xl text-white uppercase tracking-wide group-hover:text-zinc-200 transition-colors">
                    {sponsor.name}
                  </h3>

                  {/* Descrição Opcional */}
                  {sponsor.description && (
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {sponsor.description}
                    </p>
                  )}
                </div>

                {/* Rodapé do Card: Instagram Preto e Branco */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between gap-3">
                  {sponsor.instagramHandle ? (
                    <a
                      href={sponsor.instagramUrl || `https://www.instagram.com/${sponsor.instagramHandle.replace('@', '')}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors group/insta"
                      title={`Abrir perfil do Instagram: ${sponsor.instagramHandle}`}
                    >
                      <Instagram className="w-4 h-4 text-zinc-400 group-hover/insta:text-white transition-colors" />
                      <span>{sponsor.instagramHandle}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-400">Comunidade Local</span>
                  )}

                  {sponsor.instagramUrl && (
                    <a
                      href={sponsor.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                      aria-label={`Acessar página de ${sponsor.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. MODAL "SEJA UM PARCEIRO" (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {partnerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPartnerModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Fechar */}
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                  <span>Seja um Parceiro Oficial</span>
                </div>
                <h3 className="font-anton text-2xl text-white uppercase tracking-tight">
                  Sua Marca Transformando Vidas
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Preencha os dados abaixo para receber a apresentação do Projeto JJJ e apoiar com doação financeira, materiais, brinquedos ou alimentação.
                </p>
              </div>

              {partnerFormSubmitted ? (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-700 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                  <h4 className="font-anton text-lg text-white uppercase">Interesse Registrado!</h4>
                  <p className="text-xs text-zinc-300">
                    A coordenação do Projeto JJJ entrará em contato pelo WhatsApp informado em breve. Obrigado pelo apoio à nossa comunidade!
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Nome da Empresa / Marca *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerData.companyName}
                      onChange={(e) => setPartnerData({ ...partnerData, companyName: e.target.value })}
                      placeholder="Ex: Minha Empresa Ltda"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        Nome do Responsável *
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerData.responsibleName}
                        onChange={(e) => setPartnerData({ ...partnerData, responsibleName: e.target.value })}
                        placeholder="Seu nome"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                        WhatsApp de Contato *
                      </label>
                      <input
                        type="tel"
                        required
                        value={partnerData.whatsapp}
                        onChange={(e) => setPartnerData({ ...partnerData, whatsapp: e.target.value })}
                        placeholder="(41) 99999-9999"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Segmento / Como Gostaria de Apoiar
                    </label>
                    <input
                      type="text"
                      value={partnerData.segment}
                      onChange={(e) => setPartnerData({ ...partnerData, segment: e.target.value })}
                      placeholder="Ex: Cota Pix, fornecimento de lanches, brinquedos..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Mensagem Adicional (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={partnerData.message}
                      onChange={(e) => setPartnerData({ ...partnerData, message: e.target.value })}
                      placeholder="Deixe um recado para nossa equipe..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-anton text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-black"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Enviar Proposta de Parceria</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
