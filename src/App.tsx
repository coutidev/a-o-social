/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DonationSection } from './components/DonationSection';
import { InstagramSection } from './components/InstagramSection';
import { MessagesSection } from './components/MessagesSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  const scrollToDonation = () => {
    const el = document.getElementById('doacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('sobre');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-white selection:text-black">
      {/* Subtle top edge bar */}
      <div className="h-1 w-full bg-gradient-to-r from-zinc-800 via-white to-zinc-800" />

      {/* Header */}
      <Header onDonateClick={scrollToDonation} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onDonateClick={scrollToDonation} 
          onLearnMoreClick={scrollToAbout} 
        />

        {/* About & Purpose Section */}
        <AboutSection />

        {/* Primary Donation Centerpiece (QR Code + PIX Copia e Cola) */}
        <DonationSection />

        {/* Instagram Groups Section */}
        <InstagramSection />

        {/* Public Messages Wall Section (Supabase Mural) */}
        <MessagesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Bar (Visible upon scrolling on phones) */}
      <MobileQuickBar onDonateClick={scrollToDonation} />
    </div>
  );
}
