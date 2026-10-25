import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy, X } from 'lucide-react';

export interface ToastData {
  id: string;
  title?: string;
  message: string;
  duration?: number;
  type?: 'success' | 'info' | 'error';
  pixKey?: string;
}

interface ToastContextType {
  showToast: (data: Omit<ToastData, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastData = {
      ...data,
      id,
      duration: data.duration ?? 4500,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Notification Container in screen corner - 100% Preto e Branco */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-[calc(100vw-2rem)] sm:max-w-sm pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="pointer-events-auto relative overflow-hidden rounded-2xl bg-zinc-950 backdrop-blur-xl border border-zinc-700 shadow-[0_15px_40px_rgba(0,0,0,0.95)] p-4 text-zinc-100 flex items-start gap-3 group"
            >
              {/* White accent line */}
              <div className="pointer-events-none absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              {/* White Check Icon */}
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-md">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-anton text-sm uppercase tracking-wide text-white">
                    {toast.title || 'Chave Pix Copiada!'}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>

                <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>

                {toast.pixKey && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-semibold text-white max-w-full truncate">
                    <Copy className="w-3 h-3 shrink-0 text-zinc-400" />
                    <span className="truncate">{toast.pixKey}</span>
                  </div>
                )}
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => hideToast(toast.id)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors shrink-0 cursor-pointer"
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
