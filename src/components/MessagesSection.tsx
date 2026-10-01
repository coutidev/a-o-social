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
  Clock
} from 'lucide-react';
import { 
  fetchApprovedMessages, 
  submitMuralMessage, 
  formatMessageDate, 
  isSupabaseConfigured,
  MuralMessage 
} from '../lib/supabase';

const COOLDOWN_SECONDS = 30;
const LAST_SUBMIT_STORAGE_KEY = 'mural_last_submission_time';

export const MessagesSection: React.FC = () => {
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

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    // Validação de campos vazios e tamanho
    if (!trimmedName) {
      setErrorMessage('Por favor, informe seu nome ou apelido.');
      return;
    }

    if (trimmedName.length < 2) {
      setErrorMessage('O nome precisa ter pelo menos 2 caracteres.');
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage('Por favor, escreva uma mensagem pra nossa criançada.');
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

      // Sucesso!
      setSuccessNotice(
        'Recebemos sua mensagem 🤍\nEla vai passar por uma aprovação rapidinha antes de aparecer no mural.'
      );

      // Limpa os campos
      setName('');
      setMessage('');

      // Salva cooldown no localStorage
      localStorage.setItem(LAST_SUBMIT_STORAGE_KEY, Date.now().toString());
      setCooldownRemaining(COOLDOWN_SECONDS);

      // Re-busca a lista caso haja novas mensagens
      await loadMessages();
    } catch (err: any) {
      setErrorMessage('Ocorreu um erro inesperado ao conectar. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="mural" className="relative py-16 sm:py-24 bg-black border-t border-zinc-900 overflow-hidden">
      {/* Luz ambiente discreta */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-zinc-800/10 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-4 shadow-sm">
            <MessageSquareHeart className="w-4 h-4 text-white" />
            <span className="tracking-wide uppercase font-mono text-[11px]">Mural da Comunidade</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            DEIXA SUA MENSAGEM PRA CRIANÇADA. 🤍
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 font-medium">
            “Quem fortalece também faz parte dessa história.”
          </p>
        </div>

        {/* Formulário de Envio de Mensagem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo 1: Nome ou apelido */}
            <div>
              <label htmlFor="mural-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                1. Nome ou apelido
              </label>
              <input
                id="mural-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                placeholder="Como podemos te chamar?"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 transition-all disabled:opacity-50"
              />
            </div>

            {/* Campo 2: Mensagem */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="mural-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  2. Mensagem
                </label>
                <span className={`text-[11px] font-mono ${message.length >= 190 ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>
                  {message.length}/200
                </span>
              </div>
              <textarea
                id="mural-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                rows={4}
                placeholder="Deixa uma mensagem pra nossa criançada..."
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* Alertas de Erro ou Sucesso */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/40 border border-red-900/50 text-red-200 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {successNotice && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-zinc-900 border border-white/20 text-center shadow-lg"
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-white text-black flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="text-white font-bold text-sm">Recebemos sua mensagem 🤍</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Ela vai passar por uma aprovação rapidinha antes de aparecer no mural.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={isSubmitting || cooldownRemaining > 0}
              className="w-full group relative flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-black font-anton uppercase text-base sm:text-lg tracking-wider hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                  <span>MANDAR PRO MURAL 🤍</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Selo de Moderação & Segurança */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Moderação ativa para manter o respeito e carinho com as crianças.</span>
            </div>
          </form>
        </motion.div>

        {/* MURAL DE COMENTÁRIOS ABAIXO DO FORMULÁRIO */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-zinc-900">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs uppercase font-mono text-zinc-400 tracking-widest">
                  Mural Oficial
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                MENSAGENS DA QUEBRADA
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              {messages.length} {messages.length === 1 ? 'mensagem aprovada' : 'mensagens aprovadas'}
            </p>
          </div>

          {/* Estado de Carregamento */}
          {isLoadingMessages ? (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-zinc-400" />
              <p className="text-xs font-mono uppercase tracking-wider">Carregando mensagens da quebrada...</p>
            </div>
          ) : messages.length === 0 ? (
            /* Estado Vazio */
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-900 text-center max-w-md mx-auto">
              <MessageSquareHeart className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h4 className="text-white font-bold text-sm">Seja o primeiro a deixar uma mensagem!</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Fortaleça nossa criançada deixando uma palavra de incentivo no formulário acima.
              </p>
            </div>
          ) : (
            /* Grid de Cards (Desktop: grade, Celular: um embaixo do outro) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {messages.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
                  className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-900/60 shadow-lg"
                >
                  {/* Sheen sutil ao passar o mouse */}
                  <div className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Header do Card: Nome e Ícone de Coração */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-heading font-black text-base sm:text-lg text-white tracking-wide truncate">
                        {item.name}
                      </span>
                      <Heart className="w-4 h-4 text-zinc-400 fill-zinc-400 shrink-0 group-hover:scale-110 group-hover:text-white group-hover:fill-white transition-all" />
                    </div>

                    {/* Mensagem */}
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line break-words">
                      “{item.message}”
                    </p>
                  </div>

                  {/* Data no rodapé do Card */}
                  <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>{formatMessageDate(item.created_at)}</span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Ação Social 2026</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
