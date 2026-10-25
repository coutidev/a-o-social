import React from 'react';
import { 
  Heart, 
  ArrowUp, 
  MapPin, 
  Instagram, 
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { PageType } from './Header';

interface FooterProps {
  onNavigate: (page: PageType, subSection?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (page: PageType, subSection?: string) => {
    onNavigate(page, subSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-16 sm:py-20 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Topo do Rodapé: Logo, Frase e Redes Oficiais em Preto e Branco */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">
          
          {/* Coluna 1: Identidade do Projeto JJJ */}
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <span className="font-anton text-2xl text-white tracking-tight uppercase">
                PROJETO JJJ
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">
              JUPES • JUVENTUDE F.C. • JUREF
            </p>

            <p className="text-sm text-zinc-300 max-w-md leading-relaxed font-normal">
              “{DONATION_CONFIG.mottoComplement}”
            </p>

            <p className="text-xs text-zinc-500">
              Ação social comunitária sem fins lucrativos realizada no bairro Sítio Cercado, Curitiba - PR.
            </p>
          </div>

          {/* Coluna 2: Links Principais de Navegação */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="font-anton text-sm uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('inicio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('projeto', 'historia')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nossa História
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('projeto', 'galeria')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Galeria de Fotos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('projeto', 'transparencia')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Impacto & Transparência
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('patrocinadores')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Patrocinadores Oficiais
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('fazer-parte')}
                  className="hover:text-white transition-colors cursor-pointer font-bold text-white"
                >
                  Faça Parte (Doação & Voluntariado)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('mural')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mural da Comunidade
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Perfis Oficiais no Instagram & Contato (Preto e Branco) */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="font-anton text-sm uppercase tracking-wider text-white">
              Perfis Oficiais
            </h4>
            
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/grupo_juref/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-300 hover:text-white transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="font-mono">@grupo_juref</span>
              </a>

              <a
                href="https://www.instagram.com/jupesneles/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-300 hover:text-white transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="font-mono">@jupesneles</span>
              </a>

              <a
                href="https://www.instagram.com/juventude1981/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-300 hover:text-white transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="font-mono">@juventude1981</span>
              </a>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Chave Pix Oficial
              </h5>
              <div className="text-xs font-mono text-zinc-200">
                {DONATION_CONFIG.pixEmail}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Titular: {DONATION_CONFIG.receiverName}
              </div>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                WhatsApp da Coordenação
              </h5>
              <a
                href={`https://wa.me/${DONATION_CONFIG.coordinatorWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-zinc-200 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1.5 group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span>{DONATION_CONFIG.coordinatorWhatsappDisplay}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Informações de Local e Transparência */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Parque do Semeador • Rua Cel. Joaquim Antonio de Azevedo, 920 • Sítio Cercado - Curitiba</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Prestação de Contas Aberta e Transparente</span>
          </div>
        </div>

        {/* Aviso de Privacidade */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 text-center max-w-3xl mx-auto text-[11px] text-zinc-500 leading-relaxed">
          <strong>Aviso de Privacidade & Proteção à Criança:</strong> Todas as fotografias e registros audiovisuais da ação social respeitam o Estatuto da Criança e do Adolescente (ECA) e foram capturados em espaço público com autorização dos pais e responsáveis para fins estritamente comunitários e de prestação de contas, sem fins lucrativos ou comerciais.
        </div>

        {/* Rodapé Final com Créditos e Frase Espiritual */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Feito com amor e união pela comunidade do Sítio Cercado</span>
              <Heart className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" />
            </p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-zinc-300 font-medium">
              Feito por <span className="text-white font-semibold">Nicolas Couti</span>
            </p>
          </div>

          {/* Frase Espiritual em Preto e Branco */}
          <div className="text-white text-xs font-semibold tracking-wide text-center">
            “Toda honra e glória pertencem a Deus.”
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer text-xs"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
