/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PageType } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { JoinPage } from './pages/JoinPage';
import { MuralPage } from './pages/MuralPage';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('inicio');
  const [projectSubSection, setProjectSubSection] = useState<'historia' | 'galeria' | 'transparencia'>('historia');

  // Synchronize initial state and back/forward browser navigation via URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'projeto' || hash === 'historia' || hash === 'galeria' || hash === 'transparencia') {
        setCurrentPage('projeto');
        if (hash === 'galeria' || hash === 'transparencia' || hash === 'historia') {
          setProjectSubSection(hash as any);
        }
      } else if (hash === 'patrocinadores') {
        setCurrentPage('patrocinadores');
      } else if (hash === 'fazer-parte' || hash === 'doacao' || hash === 'voluntario') {
        setCurrentPage('fazer-parte');
      } else if (hash === 'mural') {
        setCurrentPage('mural');
      } else {
        setCurrentPage('inicio');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageType, subSection?: string) => {
    setCurrentPage(page);
    if (page === 'projeto' && subSection && (subSection === 'historia' || subSection === 'galeria' || subSection === 'transparencia')) {
      setProjectSubSection(subSection as any);
      window.location.hash = subSection;
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileDonateClick = () => {
    navigateToPage('fazer-parte');
    setTimeout(() => {
      const el = document.getElementById('doacao-pix');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col selection:bg-white selection:text-black">
        
        {/* Top Edge Bar em Preto e Branco */}
        <div className="h-1 w-full bg-gradient-to-r from-zinc-900 via-white to-zinc-900" />

        {/* Global Header com 5 Páginas e Botão em Preto e Branco */}
        <Header 
          currentPage={currentPage}
          onNavigate={navigateToPage}
        />

        {/* Main Content Area based on Selected Page */}
        <main className="flex-1">
          {currentPage === 'inicio' && (
            <HomePage onNavigate={navigateToPage} />
          )}

          {currentPage === 'projeto' && (
            <ProjectPage 
              initialSubSection={projectSubSection}
              onNavigateToJoin={() => navigateToPage('fazer-parte')} 
            />
          )}

          {currentPage === 'patrocinadores' && (
            <SponsorsPage 
              onNavigateToJoin={() => navigateToPage('fazer-parte')}
            />
          )}

          {currentPage === 'fazer-parte' && (
            <JoinPage />
          )}

          {currentPage === 'mural' && (
            <MuralPage />
          )}
        </main>

        {/* 100% Black & White Footer */}
        <Footer onNavigate={navigateToPage} />

        {/* Mobile Sticky Quick Bar (Preto e Branco) */}
        <MobileQuickBar onDonateClick={handleMobileDonateClick} />

      </div>
    </ToastProvider>
  );
}
