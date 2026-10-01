import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DONATION_CONFIG } from '../config/donationConfig';
import { DonationThankYouModal } from './DonationThankYouModal';
import { ToyProgressBar } from './ToyProgressBar';
import { 
  Copy, 
  Check, 
  QrCode as QrIcon, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  Heart,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DonationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [customPixCode] = useState(DONATION_CONFIG.pixCopyPasteCode);
  const [customQrImage] = useState<string | null>(DONATION_CONFIG.pixQrCodeImageUrl);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  // Generate QR Code SVG dynamically from the PIX payload
  useEffect(() => {
    let isMounted = true;
    QRCode.toString(customPixCode, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then((svg) => {
        if (isMounted) setQrCodeSvg(svg);
      })
      .catch((err) => {
        console.error('Failed to generate QR code SVG', err);
      });

    return () => {
      isMounted = false;
    };
  }, [customPixCode]);

  // Handle Copy PIX Key (E-mail: juvetvnaarea@gmail.com)
  const handleCopyPix = async () => {
    try {
      const emailToCopy = DONATION_CONFIG.pixEmail;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (err) {
      console.error('Falha ao copiar PIX:', err);
    }
  };

  return (
    <section id="doacao" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Ambient background lighting behind the donation centerpiece */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.04] blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-zinc-400/[0.03] blur-[100px] rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header of the Donation Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-200 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Valor Livre • Doe Quanto Quiser</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Faça parte dessa ação
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-zinc-300 font-medium">
            Qualquer ajuda pode virar um sorriso.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            O Pix não tem valor pré-determinado: no aplicativo do seu banco você escolhe livremente a quantia que puder e desejar enviar.
          </p>
        </div>

        {/* Estimated Toy Fundraising Progress Bar */}
        <ToyProgressBar className="mb-10 sm:mb-12" />

        {/* ========================================================================= */}
        {/* CENTERPIECE: The Grand Donation Frame with Subtle Light Effect */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[32px] border-2 border-zinc-700/80 bg-zinc-950 p-6 sm:p-10 shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)] pix-glow-frame">
          
          {/* Subtle light aura on top border */}
          <div className="pointer-events-none absolute inset-x-12 -top-0.5 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          {/* Centralized QR Code Container */}
          <div className="flex flex-col items-center justify-center">
            
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-4">
              <QrIcon className="w-4 h-4 text-zinc-300" />
              <span>Aponte a câmera do seu banco para doar qualquer valor</span>
            </div>

            {/* QR Code White Plaque (High contrast for fast phone scanning) */}
            <div className="relative group p-4 sm:p-5 rounded-3xl bg-white shadow-2xl transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center">
              {customQrImage ? (
                <img
                  src={customQrImage}
                  alt="QR Code Oficial Pix"
                  className="w-56 h-56 sm:w-68 sm:h-68 object-contain rounded-xl"
                />
              ) : qrCodeSvg ? (
                <div
                  className="w-56 h-56 sm:w-68 sm:h-68 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                />
              ) : (
                <div className="w-56 h-56 sm:w-68 sm:h-68 flex flex-col items-center justify-center text-zinc-400 gap-2 border-2 border-dashed border-zinc-300 rounded-xl">
                  <QrIcon className="w-12 h-12 text-zinc-400 animate-pulse" />
                  <span className="text-xs text-center font-medium">Carregando QR Code...</span>
                </div>
              )}

              {/* Central small brand emblem inside QR code - only if generating SVG dynamically */}
              {!customQrImage && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-2 py-0.5 rounded-md font-heading font-black text-[10px] tracking-wider border border-white shadow-md pointer-events-none">
                  PIX
                </div>
              )}
            </div>

            {/* Recipient verification info */}
            <div className="mt-4 text-center">
              <p className="font-heading font-black text-base sm:text-lg text-white tracking-wide uppercase">
                {DONATION_CONFIG.receiverName}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-zinc-400 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-medium">Titular da Conta Pix • Ação Social</span>
                <span>•</span>
                <span>{DONATION_CONFIG.receiverCity}</span>
              </div>
            </div>

            {/* Quick secondary button right under QR code for phone scanners */}
            <div className="mt-4">
              <button
                onClick={() => setIsThankYouOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:border-zinc-500 shadow-md active:scale-95 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                <span>Já fiz minha doação ❤️</span>
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PIX CHAVE E-MAIL SECTION */}
          {/* ========================================================================= */}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <h3 className="font-heading font-bold text-sm sm:text-base uppercase tracking-wider text-white">
                  CHAVE PIX (E-MAIL) • VALOR LIVRE
                </h3>
              </div>
              <span className="text-xs text-zinc-400 hidden sm:inline">
                A pessoa digita quanto quer doar no app do banco
              </span>
            </div>

            {/* The Email Key Box + Copy Button */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 transition-all focus-within:border-zinc-500 shadow-inner">
              
              {/* Mail Icon + Email display */}
              <div className="flex items-center gap-3.5 px-2 py-1 overflow-hidden min-w-0">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-white">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                      Chave Pix Oficial
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      E-mail
                    </span>
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-mono font-bold text-white select-all truncate mt-0.5">
                    {DONATION_CONFIG.pixEmail}
                  </div>
                </div>
              </div>

              {/* COPIAR CHAVE PIX Button */}
              <button
                onClick={handleCopyPix}
                className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>CHAVE COPIADA!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR CHAVE PIX</span>
                  </>
                )}
              </button>

            </div>

            {/* Dynamic Success Alert Banner with Invitation to Confirm */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900/95 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Chave Pix copiada com sucesso! ({DONATION_CONFIG.pixEmail})</strong>
                        <span className="text-zinc-300 text-xs">
                          Cole no seu banco escolhendo a opção <strong>Pix por E-mail</strong> e digite qualquer quantia.
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsThankYouOpen(true)}
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>Já fiz minha doação ❤️</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Action Buttons Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              {/* Primary Copy Button */}
              <button
                onClick={handleCopyPix}
                className="w-full sm:w-auto min-w-[240px] group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-black font-anton text-base tracking-wide uppercase shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:bg-zinc-100 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>CHAVE COPIADA!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR CHAVE PIX (E-MAIL)</span>
                  </>
                )}
              </button>

              {/* Secondary Dedicated Button: Já fiz minha doação ❤️ */}
              <button
                onClick={() => setIsThankYouOpen(true)}
                className="w-full sm:w-auto min-w-[220px] group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-zinc-700 hover:border-zinc-500 bg-zinc-900/90 hover:bg-zinc-800 text-white font-anton text-base tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-125 transition-transform" />
                <span>JÁ FIZ MINHA DOAÇÃO ❤️</span>
              </button>
            </div>

            {/* Step-by-Step Instructions Toggle */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                <span>Como doar usando a chave Pix e-mail?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Expandable Step-by-Step Instructions */}
            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-zinc-800/80 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-2">
                        1
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">Copie a Chave E-mail</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Clique no botão "COPIAR CHAVE PIX" para copiar o e-mail <strong>{DONATION_CONFIG.pixEmail}</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-2">
                        2
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">Abra seu Banco</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Entre no aplicativo do seu banco, vá na área Pix e selecione a opção <em>"Chave E-mail"</em>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-2">
                        3
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">Digite o Valor</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Cole o e-mail, digite a quantia que quiser doar de coração, confira o nome da titular ({DONATION_CONFIG.receiverName}) e confirme.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* Modern Slide-Up Thank You Modal */}
      <DonationThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />
    </section>
  );
};
