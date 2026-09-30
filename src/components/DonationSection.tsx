import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DONATION_CONFIG } from '../config/donationConfig';
import { 
  Copy, 
  Check, 
  QrCode as QrIcon, 
  ShieldCheck, 
  Smartphone, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DonationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [customPixCode, setCustomPixCode] = useState(DONATION_CONFIG.pixCopyPasteCode);
  const [customQrImage, setCustomQrImage] = useState<string | null>(DONATION_CONFIG.pixQrCodeImageUrl);

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

  // Handle Copy PIX
  const handleCopyPix = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(customPixCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = customPixCode;
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
      }, 4500);
    } catch (err) {
      console.error('Falha ao copiar PIX:', err);
    }
  };

  const handleDonateNow = () => {
    handleCopyPix();
    setShowInstructions(true);
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

              {/* Central small brand emblem inside QR code */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-2 py-0.5 rounded-md font-heading font-black text-[10px] tracking-wider border border-white shadow-md pointer-events-none">
                PIX
              </div>
            </div>

            {/* Recipient verification info */}
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-zinc-200">
                {DONATION_CONFIG.receiverName}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Conta verificada da Ação Social</span>
                <span>•</span>
                <span>{DONATION_CONFIG.receiverCity}</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PIX COPIA E COLA SECTION */}
          {/* ========================================================================= */}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <h3 className="font-heading font-bold text-sm sm:text-base uppercase tracking-wider text-white">
                  PIX COPIA E COLA (VALOR LIVRE)
                </h3>
              </div>
              <span className="text-xs text-zinc-400 hidden sm:inline">
                A pessoa digita quanto quer doar no app
              </span>
            </div>

            {/* The Code Box + Copy Button */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 transition-all focus-within:border-zinc-500">
              
              {/* Truncated / Scrollable Raw PIX text */}
              <div className="flex-1 px-3 py-2 overflow-hidden">
                <div className="text-[11px] sm:text-xs font-mono text-zinc-300 break-all select-all line-clamp-2 sm:line-clamp-1">
                  {customPixCode}
                </div>
              </div>

              {/* COPIAR PIX Button */}
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
                    <span>COPIADO!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR PIX</span>
                  </>
                )}
              </button>

            </div>

            {/* Dynamic Success Alert Banner */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                    <span>
                      <strong>PIX copiado com sucesso!</strong> Agora abra seu banco, cole na opção <em>Pix Copia e Cola</em> e digite a quantia que quiser enviar.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Big CTA "DOE AGORA" */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDonateNow}
                className="w-full sm:w-auto min-w-[280px] group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-white text-black font-heading font-black text-lg tracking-wider shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:bg-zinc-100 hover:shadow-[0_0_55px_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-black" />
                <span>DOE AGORA</span>
              </button>

              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                <span>Como funciona o Pix com valor livre?</span>
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
                      <h4 className="text-xs font-bold text-white mb-1">Copie o Código</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Clique no botão "COPIAR PIX" para guardar o código na memória do celular.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-2">
                        2
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">Abra seu Banco</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Entre no app do seu banco e selecione a opção <em>"Pix Copia e Cola"</em>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-2">
                        3
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">Digite o Valor</h4>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Digite a quantia que quiser doar de coração, confira o recebedor da Ação Social e confirme.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
