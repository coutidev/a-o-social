import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquareHeart, 
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  fetchApprovedMessages, 
  submitMuralMessage, 
  formatMessageDate, 
  MuralMessage 
} from '../lib/supabase';

const COOLDOWN_SECONDS = 30;
const LAST_SUBMIT_STORAGE_KEY = 'mural_last_submission_time';

export const MuralPage: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  
  // Lista de mensagens aprovadas
  const [messages, setMessages] = useState<MuralMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);

  // Carrega as mensagens do Supabase
  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const data = await fetchApprovedMessages();
      setMessages(data);
    } catch (err) {
      console.error('Falha ao carregar mural:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Cooldown timer logic para evitar spam de múltiplos envios consecutivos
  useEffect(() => {
    const lastSubmitTime = localStorage.getItem(LAST_SUBMIT_STORAGE_KEY);
    if (lastSubmitTime) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmitTime, 10)) / 1000);
      if (elapsed < COOLDOWN_SECONDS) {
        setCooldownRemaining(COOLDOWN_SECONDS - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    // Verificação de cooldown anti-spam
    if (cooldownRemaining > 0) {
      setErrorMessage(`Aguarde ${cooldownRemaining}s antes de enviar outra mensagem.`);
      return;
    }

    const trimmedName = name.trim() || 'Amigo(a) da Comunidade';
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setErrorMessage('Por favor, escreva uma mensagem de carinho pra nossa criançada.');
      return;
    }

    if (trimmedMessage.length < 3) {
      setErrorMessage('A mensagem precisa ter pelo menos 3 caracteres.');
      return;
    }

    if (trimmedMessage.length > 200) {
      setErrorMessage('A mensagem não pode ultrapassar 200 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitMuralMessage(trimmedName, trimmedMessage);

      if (!result.success) {
        setErrorMessage(result.error || 'Não foi possível enviar sua mensagem. Tente novamente.');
        return;
      }

      setSuccessNotice(
        'Mensagem enviada com carinho! 🤍 Ela passa por uma aprovação rápida da moderação antes de ser exibida no mural.'
      );

      setName('');
      setMessage('');

      localStorage.setItem(LAST_SUBMIT_STORAGE_KEY, Date.now().toString());
      setCooldownRemaining(COOLDOWN_SECONDS);

      await loadMessages();
    } catch (err: any) {
      setErrorMessage('Ocorreu um erro inesperado ao conectar. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO CABEÇALHO DO MURAL (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden text-center">
        {/* Subtle Ambient Monochrome Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-white/[0.03] blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-black">
            <MessageSquareHeart className="w-3.5 h-3.5 text-white" />
            <span>Vozes da Comunidade</span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            Mural de Esperança & <br className="hidden sm:inline" />
            <span>Palavras de Afeto</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Deixe seu recado, torcida e mensagem de incentivo para as crianças do Projeto JJJ e para os voluntários de JUPES, Juventude e JUREF.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FORMULÁRIO DE ENVIO (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <section className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
            <div>
              <h3 className="font-anton text-xl text-white uppercase tracking-wide">
                Enviar Recado ao Mural
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Compartilhe boas energias com a comunidade.
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome ou apelido (Opcional) */}
            <div>
              <label htmlFor="mural-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Seu Nome ou Apelido <span className="text-zinc-500 font-normal lowercase">(opcional)</span>
              </label>
              <input
                id="mural-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                placeholder="Ex: Maria, Torcida Juventude, Vizinho do Sítio Cercado..."
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* Mensagem */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="mural-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Sua Mensagem de Positividade *
                </label>
                <span className={`text-[11px] font-mono ${message.length >= 190 ? 'text-white font-bold' : 'text-zinc-500'}`}>
                  {message.length}/200
                </span>
              </div>
              <textarea
                id="mural-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                rows={4}
                required
                placeholder="Escreva palavras de amor, incentivo ou fé para as crianças..."
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* Alertas */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-white" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {successNotice && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-zinc-900 border border-white/40 text-center shadow-lg"
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-white text-black flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="text-white font-bold text-sm">Mensagem Registrada com Sucesso! 🤍</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {successNotice}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão de Envio Preto e Branco */}
            <button
              type="submit"
              disabled={isSubmitting || cooldownRemaining > 0}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-anton uppercase text-base tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>ENVIANDO...</span>
                </>
              ) : cooldownRemaining > 0 ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>AGUARDE {cooldownRemaining}S</span>
                </>
              ) : (
                <>
                  <span>PUBLICAR NO MURAL 🤍</span>
                  <Send className="w-4 h-4 text-black" />
                </>
              )}
            </button>

            {/* Selo de Moderação & Privacidade */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Moderação ativa e proteção de privacidade para preservar as crianças.</span>
            </div>
          </form>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LISTA DE MENSAGENS APROVADAS (Preto e Branco) */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs uppercase font-mono text-zinc-400 tracking-widest">
                Mensagens da Comunidade
              </span>
            </div>
            <h2 className="font-anton text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Recados de Amor & Incentivo
            </h2>
          </div>
          <span className="text-xs text-zinc-400">
            {messages.length} {messages.length === 1 ? 'mensagem publicada' : 'mensagens publicadas'}
          </span>
        </div>

        {/* Estado de Carregamento */}
        {isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-white" />
            <p className="text-xs font-mono uppercase tracking-wider">Carregando mensagens da comunidade...</p>
          </div>
        ) : messages.length === 0 ? (
          /* Estado Vazio */
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 text-center max-w-md mx-auto space-y-3">
            <MessageSquareHeart className="w-12 h-12 text-zinc-600 mx-auto" />
            <h4 className="text-white font-anton text-lg uppercase">Seja o primeiro a deixar uma mensagem!</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deixe um recado carinhoso no formulário acima para incentivar nossas crianças e voluntários.
            </p>
          </div>
        ) : (
          /* Grid de Cards em Preto e Branco */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-500 pix-subtle-glow transition-all duration-300 shadow-xl"
              >
                {/* Linha superior sutil */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-anton text-base sm:text-lg text-white tracking-wide truncate">
                      {item.name}
                    </span>
                    <Heart className="w-4 h-4 text-zinc-400 fill-zinc-400/40 group-hover:fill-white group-hover:text-white transition-colors shrink-0" />
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line break-words">
                    “{item.message}”
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{formatMessageDate(item.created_at)}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Comunidade JJJ</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
