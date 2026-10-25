import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Handshake, 
  Receipt, 
  Sparkles, 
  Building2, 
  HeartHandshake, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Construction
} from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';

export type TabType = 'patrocinadores' | 'prestacao';

interface TransparencyModalProps {
  isOpen: boolean;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose: () => void;
  onDonateClick: () => void;
}

// Custom Minimal Monochrome Instagram Icon
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
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

const SponsorCard: React.FC<{ sponsor: (typeof DONATION_CONFIG.sponsors)[0] }> = ({ sponsor }) => {
  const [logoFailed, setLogoFailed] = React.useState(false);

  const initials = sponsor.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('');

  const igUrl = sponsor.instagramUrl || (sponsor.instagramHandle ? `https://www.instagram.com/${sponsor.instagramHandle.replace('@', '')}/` : undefined);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-inner p-1.5 group-hover:border-zinc-600 transition-colors">
            {sponsor.logoUrl && !logoFailed ? (
              <img
                src={sponsor.logoUrl}
                alt={`Logo ${sponsor.name}`}
                className="w-full h-full object-contain filter grayscale contrast-125"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="font-anton text-base text-zinc-300 tracking-wider">
                {initials || <Building2 className="w-5 h-5 text-zinc-500" />}
              </span>
            )}
          </div>

          <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 text-right">
            {sponsor.category || 'Apoio Local'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-zinc-200 transition-colors">
          {sponsor.name}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
        <span className="text-[11px] text-zinc-500 font-medium">Patrocinador</span>

        {igUrl ? (
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-white hover:text-black text-zinc-200 text-xs font-semibold transition-all group/ig border border-zinc-700"
            title={`Abrir Instagram de ${sponsor.name}`}
          >
            <InstagramIcon className="w-3.5 h-3.5 text-zinc-400 group-hover/ig:text-black transition-colors" />
            <span className="font-mono text-[11px] sm:text-xs">
              {sponsor.instagramHandle || '@instagram'}
            </span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover/ig:text-black group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@instagram</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const TransparencyModal: React.FC<TransparencyModalProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  onDonateClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalRaised = DONATION_CONFIG.pixGoal.current;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-zinc-100"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
            <div className="flex items-center gap-1 sm:gap-2 p-1 bg-zinc-900 rounded-2xl border border-zinc-800">
              <button
                type="button"
                onClick={() => onTabChange('patrocinadores')}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'patrocinadores'
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>Patrocinadores ({DONATION_CONFIG.sponsors.length})</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange('prestacao')}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'prestacao'
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>Prestação de Contas</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6 sm:space-y-8">
            
            {/* ================= TAB 1: PATROCINADORES ================= */}
            {activeTab === 'patrocinadores' && (
              <motion.div
                key="tab-patrocinadores"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Notice: EM DESENVOLVIMENTO */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-start gap-3 sm:gap-4 shadow-lg">
                  <div className="p-2 rounded-xl bg-zinc-800 text-white shrink-0 mt-0.5">
                    <Construction className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white text-black">
                        EM DESENVOLVIMENTO
                      </span>
                      <span className="font-bold text-white text-sm sm:text-base">
                        Lista de Parceiros em Atualização
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Estamos organizando as marcas e adicionando os logos e perfis do Instagram de cada apoiador. Quer apoiar a festa? Fale com a gente!
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Apoio Comunitário & Marcas Parceiras ({DONATION_CONFIG.sponsors.length})</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-anton uppercase tracking-wide text-white">
                    Patrocinadores da Ação Social
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                    Conheça os comércios, empresas e apoiadores que somam forças com a nossa união em prol do Dia das Crianças.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {DONATION_CONFIG.sponsors.map((sp) => (
                    <SponsorCard key={sp.id} sponsor={sp} />
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-750 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-bold text-base sm:text-lg">
                      <HeartHandshake className="w-5 h-5 text-white" />
                      <span>Sua empresa quer patrocinar esta ação social?</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                      Doe itens para a festa (brinquedos, pães, refrigerantes ou apoio financeiro) e coloque sua marca visível na praça e nos materiais das torcidas e grupos unidos!
                    </p>
                  </div>

                  <a
                    href={`mailto:${DONATION_CONFIG.pixEmail}?subject=Patrocínio%20Ação%20Social%202026`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all shrink-0 w-full sm:w-auto shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Quero ser Patrocinador</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* ================= TAB 2: PRESTAÇÃO DE CONTAS ================= */}
            {activeTab === 'prestacao' && (
              <motion.div
                key="tab-prestacao"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-start gap-3 sm:gap-4 shadow-xl">
                  <div className="p-2 rounded-xl bg-zinc-800 text-white shrink-0 mt-0.5">
                    <Construction className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white text-black">
                        EM DESENVOLVIMENTO
                      </span>
                      <span className="font-bold text-white text-sm sm:text-base">
                        Valores e Gastos Finais em Consolidação
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      Ainda não temos todos os gastos fechados. As compras de brinquedos, guloseimas, lanches e locações de brinquedos estão sendo realizadas. A tabela abaixo apresenta o planejamento preliminar e será 100% atualizada com cada comprovante e nota fiscal definitiva após o fechamento da festa!
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Transparência e Responsabilidade Social</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-anton uppercase tracking-wide text-white">
                    Prestação de Contas da Ação
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                    Cada centavo doado pela comunidade tem destino certo e público. Nosso compromisso é com a alegria das crianças e total clareza com quem ajuda.
                  </p>
                </div>

                {/* Key Financial Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">
                      Total Arrecadado no Pix
                    </span>
                    <span className="font-anton text-3xl sm:text-4xl text-white tracking-tight mt-1 block">
                      R$ {totalRaised.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      {DONATION_CONFIG.pixGoal.targetLabel || 'Meta livre e comunitária'}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">
                      Destino dos Recursos
                    </span>
                    <span className="font-anton text-3xl sm:text-4xl text-white tracking-tight mt-1 block">
                      100%
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Crianças, lanches, brinquedos e recreação
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">
                      Status da Prestação
                    </span>
                    <div className="flex items-center gap-1.5 mt-2 text-white font-bold text-sm">
                      <Clock className="w-4 h-4 text-white" />
                      <span>Em Arrecadação Ativa</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Notas e fotos publicadas após o evento
                    </span>
                  </div>
                </div>

                {/* Detailed Table */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
                  <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm sm:text-base tracking-wide uppercase">
                      Planejamento de Destinação dos Recursos
                    </h3>
                    <span className="text-xs text-zinc-400">
                      Atualizado em {DONATION_CONFIG.accountability.lastUpdated}
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-800/80">
                    {DONATION_CONFIG.accountability.allocatedExpenses.map((item, idx) => (
                      <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900 transition-colors">
                        <div className="space-y-1 max-w-lg">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm sm:text-base">
                              {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800/50">
                          <span className="font-anton text-lg sm:text-xl text-white">
                            R$ {item.estimatedOrSpentAmount.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-zinc-400">
                            ~{item.percentage}% do valor
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Como funciona a conferência pública:</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-400 space-y-2 list-disc list-inside">
                    <li>
                      <strong>Comprovantes de compra:</strong> Todas as notas fiscais de brinquedos, pães, salsichas e locações são arquivadas pela organização.
                    </li>
                    <li>
                      <strong>Fotos & Vídeos da entrega:</strong> No dia 18/10, todo o evento será registrado e publicado nos perfis oficiais (@juventude1981, @jupesneles e @grupo_juref).
                    </li>
                    <li>
                      <strong>Dúvidas financeiras:</strong> Qualquer doador ou voluntário pode solicitar esclarecimentos diretamente pelo e-mail oficial: <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">{DONATION_CONFIG.pixEmail}</code>.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-zinc-400 text-center sm:text-left">
                    Ajude a completar a meta e garantir mais brinquedos para as crianças!
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onDonateClick();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    Fazer uma Doação Agora
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-4 sm:px-8 py-3.5 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <span>Ação Social Unidos • JUPES • Juventude F.C. • JUREF</span>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
