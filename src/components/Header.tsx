import React, { useState } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  BookOpen, 
  Handshake, 
  MessageSquareHeart, 
  Home, 
  ArrowRight
} from 'lucide-react';

export type PageType = 'inicio' | 'projeto' | 'patrocinadores' | 'fazer-parte' | 'mural';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, subSection?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; icon?: React.ElementType }[] = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'projeto', label: 'O Projeto', icon: BookOpen },
    { id: 'patrocinadores', label: 'Patrocinadores', icon: Handshake },
    { id: 'fazer-parte', label: 'Faça Parte', icon: Heart },
    { id: 'mural', label: 'Mural', icon: MessageSquareHeart },
  ];

  const handleSelectPage = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/95 border-b border-zinc-800 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Logo / Marca do Projeto JJJ em Preto e Branco */}
        <button 
          onClick={() => handleSelectPage('inicio')}
          className="flex flex-col group transition-transform active:scale-95 shrink-0 text-left cursor-pointer"
          aria-label="Ir para Início"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" />
            <span className="font-anton text-xl sm:text-2xl md:text-3xl tracking-tight text-white group-hover:text-zinc-200 transition-colors select-none uppercase">
              PROJETO JJJ
            </span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400 font-semibold group-hover:text-white transition-colors uppercase">
            JUPES • JUVENTUDE • JUREF
          </span>
        </button>

        {/* Menu Desktop: 5 Páginas em Preto e Branco */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" aria-label="Navegação principal">
          {[
            { id: 'inicio' as PageType, label: 'Início' },
            { id: 'projeto' as PageType, label: 'O Projeto' },
            { id: 'patrocinadores' as PageType, label: 'Patrocinadores' },
            { id: 'fazer-parte' as PageType, label: 'Faça Parte' },
            { id: 'mural' as PageType, label: 'Mural' },
          ].map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPage(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-anton tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botão de Destaque "QUERO FAZER PARTE" em Preto e Branco */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleSelectPage('fazer-parte')}
            className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-anton text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-black text-black group-hover:scale-110 transition-transform" />
            <span>QUERO FAZER PARTE</span>
            <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
          </button>

          {/* Botão Hambúrguer Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white md:hidden cursor-pointer active:scale-95 transition-all"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu Gaveta Mobile Expandido */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-850 bg-black/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {[
              { id: 'inicio' as PageType, label: 'Início', icon: Home },
              { id: 'projeto' as PageType, label: 'O Projeto', icon: BookOpen },
              { id: 'patrocinadores' as PageType, label: 'Patrocinadores', icon: Handshake },
              { id: 'fazer-parte' as PageType, label: 'Faça Parte', icon: Heart },
              { id: 'mural' as PageType, label: 'Mural', icon: MessageSquareHeart },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectPage(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left text-sm font-anton uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-zinc-950/80 border border-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-900 text-center">
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
              JUPES • JUVENTUDE • JUREF • 2026
            </span>
          </div>
        </div>
      )}

      {/* Mobile Top Navigation Pills em Preto e Branco */}
      <div className="flex md:hidden items-center justify-between gap-1 px-2.5 py-1.5 border-t border-zinc-900 bg-zinc-950/95 overflow-x-auto no-scrollbar">
        {[
          { id: 'inicio' as PageType, label: 'Início' },
          { id: 'projeto' as PageType, label: 'O Projeto' },
          { id: 'patrocinadores' as PageType, label: 'Patrocinadores' },
          { id: 'fazer-parte' as PageType, label: 'Faça Parte' },
          { id: 'mural' as PageType, label: 'Mural' },
        ].map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectPage(item.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-anton uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
