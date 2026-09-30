import React, { useState, useEffect } from 'react';
import { Heart, QrCode, Copy, Check } from 'lucide-react';
import { DONATION_CONFIG } from '../config/donationConfig';
import { motion, AnimatePresence } from 'motion/react';

interface MobileQuickBarProps {
  onDonateClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onDonateClick }) => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(DONATION_CONFIG.pixCopyPasteCode);
      }
      setCopied(true);
      if (navigator.vibrate) navigator.vibrate(40);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error(err);
      onDonateClick();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 inset-x-4 z-40 sm:hidden"
        >
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            
            {/* Quick Pix Copy Button */}
            <button
              onClick={handleQuickCopy}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>PIX COPIADO!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Pix</span>
                </>
              )}
            </button>

            {/* Jump to QR Code Button */}
            <button
              onClick={onDonateClick}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white text-black font-extrabold text-xs tracking-wider uppercase shadow-md active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Ver QR Code</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
