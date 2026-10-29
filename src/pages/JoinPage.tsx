import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Smile, 
  Gift, 
  Utensils, 
  Camera, 
  HelpCircle,
  BellRing,
  ExternalLink
} from 'lucide-react';
import { DonationSection } from '../components/DonationSection';
import { CountdownTimer } from '../components/CountdownTimer';
import { DONATION_CONFIG, buildVolunteerWhatsappLink } from '../config/donationConfig';

export const JoinPage: React.FC = () => {
  // Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    area: 'Recreação & Brincadeiras',
    availability: 'Final de semana',
    message: ''
  });

  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerSubmitting, setVolunteerSubmitting] = useState(false);
  const [volunteerWhatsappUrl, setVolunteerWhatsappUrl] = useState<string>('');

  // Future actions alert signup
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySuccess, setNotifySuccess] = useState(false);

  const areasOfHelp = [
    { id: 'recreacao', label: 'Recreação & Brincadeiras', icon: Smile, desc: 'Ajudar nas gincanas, oficinas de pipa e monitoria.' },
    { id: 'alimentacao', label: 'Alimentação, Frutas & Doces', icon: Utensils, desc: 'Distribuição de frutas frescas, doces, algodão-doce, pipoca e sucos.' },
    { id: 'brinquedos', label: 'Entrega de Brinquedos', icon: Gift, desc: 'Organização por faixa etária e entrega carinhosa dos presentes.' },
    { id: 'foto', label: 'Fotografia & Vídeo', icon: Camera, desc: 'Registrar os sorrisos e a cobertura visual da ação.' },
    { id: 'apoio', label: 'Logística & Apoio Geral', icon: HelpCircle, desc: 'Montagem de tendas, limpeza da praça e recepção das famílias.' },
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem('jjj_voluntarios') || '[]');
      existing.push({
        ...volunteerForm,
        date: new Date().toISOString()
      });
      localStorage.setItem('jjj_voluntarios', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local storage error:', err);
    }

    const whatsappLink = buildVolunteerWhatsappLink(volunteerForm);
    setVolunteerWhatsappUrl(whatsappLink);

    setTimeout(() => {
      setVolunteerSubmitting(false);
      setVolunteerSubmitted(true);

      // Tenta abrir o WhatsApp automaticamente
      try {
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocked:', err);
      }
    }, 400);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    try {
      const existing = JSON.parse(localStorage.getItem('jjj_alertas_futuras') || '[]');
      existing.push({ email: notifyEmail, date: new Date().toISOString() });
      localStorage.setItem('jjj_alertas_futuras', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage error:', err);
    }
    setNotifySuccess(true);
    setTimeout(() => setNotifySuccess(false), 4000);
    setNotifyEmail('');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO FAÇA PARTE (100% PRETO E BRANCO) */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden text-center">
        {/* Subtle Ambient Monochrome Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-white/[0.03] blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-black">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>Faça Parte do Projeto JJJ</span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            Juntos pelo Futuro, <br className="hidden sm:inline" />
            <span>Unidos de Coração</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Seja doando qualquer valor pelo Pix ou se voluntariando para estar na linha de frente com a gente, sua presença transforma realidades.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-zinc-400">
            <a 
              href="#doacao-pix" 
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white text-white transition-all cursor-pointer"
            >
              Ir para Doação Pix ↓
            </a>
            <a 
              href="#seja-voluntario" 
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white text-white transition-all cursor-pointer"
            >
              Ir para Inscrição de Voluntário ↓
            </a>
            <a 
              href="#proximas-acoes" 
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white text-white transition-all cursor-pointer"
            >
              Próximas Ações ↓
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FAÇA UMA DOAÇÃO (Preserva 100% o fluxo real Pix - Preto e Branco) */}
      {/* ========================================================================= */}
      <div id="doacao-pix">
        <DonationSection />
      </div>

      {/* ========================================================================= */}
      {/* 3. SEJA UM VOLUNTÁRIO (Formulário Completo Preto e Branco) */}
      {/* ========================================================================= */}
      <section id="seja-voluntario" className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-12 shadow-2xl relative overflow-hidden pix-subtle-glow"
        >
          
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-white/[0.03] blur-3xl rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-white" />
                <span>Voluntariado Comunitário</span>
              </div>

              <h2 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
                Doe seu tempo e seu amor
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
                Na ação do Projeto JJJ, cada voluntário é essencial. Escolha onde você mais se identifica e venha somar forças com JUPES, Juventude e JUREF.
              </p>
            </div>

            {volunteerSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 text-center space-y-4 max-w-lg mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 text-white border border-zinc-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-anton text-2xl text-white uppercase tracking-tight">Inscrição Pronta para Envio!</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Obrigado, <strong>{volunteerForm.name}</strong>! Preparamos sua ficha de voluntário para a área de <strong>{volunteerForm.area}</strong>. Caso o WhatsApp não tenha aberto automaticamente, clique no botão abaixo para nos enviar sua mensagem:
                </p>

                <a
                  href={volunteerWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-anton text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-black"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Enviar Inscrição no WhatsApp da Coordenação</span>
                  <ExternalLink className="w-4 h-4 text-black" />
                </a>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVolunteerSubmitted(false);
                      setVolunteerForm({
                        name: '',
                        whatsapp: '',
                        email: '',
                        area: 'Recreação & Brincadeiras',
                        availability: 'Final de semana',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Cadastrar outro voluntário
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                
                {/* Seleção de Área com Cards em Preto e Branco */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                    Em qual área você gostaria de ajudar? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {areasOfHelp.map((item) => {
                      const Icon = item.icon;
                      const isSelected = volunteerForm.area === item.label;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setVolunteerForm({ ...volunteerForm, area: item.label })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-zinc-900 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-white text-black' : 'bg-zinc-900 text-white border border-zinc-800'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{item.label}</div>
                              <div className="text-[11px] text-zinc-400 leading-tight mt-0.5">{item.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Campos Pessoais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      placeholder="Ex: João da Silva"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      value={volunteerForm.whatsapp}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, whatsapp: e.target.value })}
                      placeholder="(41) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      E-mail de Contato (Opcional)
                    </label>
                    <input
                      type="email"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Disponibilidade
                    </label>
                    <select
                      value={volunteerForm.availability}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    >
                      <option value="Final de semana">Final de semana (Sábados/Domingos)</option>
                      <option value="Dia todo do evento">Dia todo no grande evento</option>
                      <option value="Período da manhã">Período da manhã</option>
                      <option value="Período da tarde">Período da tarde</option>
                      <option value="Flexível">Flexível conforme necessidade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Mensagem ou Experiência Prévia (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={volunteerForm.message}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                    placeholder="Conte se já participou de ações sociais, se tem facilidade com crianças ou algo especial..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={volunteerSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 hover:from-cyan-300 hover:via-blue-500 hover:to-purple-500 text-white font-anton text-base uppercase tracking-wider shadow-[0_0_30px_rgba(0,210,255,0.35)] hover:shadow-[0_0_40px_rgba(189,0,255,0.55)] transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>{volunteerSubmitting ? 'Registrando Inscrição...' : 'CONFIRMAR INSCRIÇÃO DE VOLUNTÁRIO'}</span>
                </button>
              </form>
            )}

          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRÓXIMAS AÇÕES (Preto e Branco) */}
      {/* ========================================================================= */}
      <section id="proximas-acoes" className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 space-y-6 pix-subtle-glow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4 text-white" />
                <span>Calendário de Iniciativas</span>
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Próximas Ações & Calendário JJJ
              </h3>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Temporada 2026/2027
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            As datas, locais e inscrições são divulgadas publicamente à medida que são confirmadas junto aos órgãos municipais e associações de moradores, garantindo total segurança para as famílias.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Próxima Ação 1: 20 de Dezembro no Parque do Semeador */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-700/80 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-black">
                  Confirmado • 20/12
                </span>
                <span className="text-xs text-zinc-300 font-semibold">20 de Dezembro / 2026</span>
              </div>
              <h4 className="font-anton text-lg text-white uppercase">
                Grande Ação — Parque do Semeador
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Grande dia de alegria com distribuição de brinquedos, gincanas, frutas, doces, algodão-doce, pipas e muito amor para todas as famílias do bairro.
              </p>
              <div className="text-[11px] text-zinc-300 flex items-start gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span>Parque do Semeador • Rua Cel. Joaquim Antonio de Azevedo, 920 - Sítio Cercado</span>
              </div>
            </div>

            {/* Próxima Ação 2: Dia das Crianças 2027 */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-white border border-zinc-700">
                  Próxima Grande Edição
                </span>
                <span className="text-xs text-zinc-400">Outubro / 2027</span>
              </div>
              <h4 className="font-anton text-lg text-white uppercase">
                Ação Social Dia das Crianças 2027
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Segunda edição unificada ampliando a meta para atender ainda mais bairros e crianças com brinquedos, atrações e esportes.
              </p>
              <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Sítio Cercado • Curitiba</span>
              </div>
            </div>

          </div>

          {/* Componente de Contagem Regressiva no Faça Parte */}
          <CountdownTimer className="mt-4" />

          {/* Demonstração de Interesse / Notificação em Preto e Branco */}
          <div className="mt-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-white border border-zinc-700 shrink-0">
                <BellRing className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className="font-anton text-sm uppercase text-white">
                  Quer ser avisado em primeira mão?
                </h5>
                <p className="text-xs text-zinc-400">
                  Cadastre seu e-mail para receber as convocações e datas das próximas ações.
                </p>
              </div>
            </div>

            <form onSubmit={handleNotifySubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white w-full sm:w-56"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-anton text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                {notifySuccess ? 'Inscrito!' : 'Quero Participar'}
              </button>
            </form>
          </div>

        </motion.div>
      </section>

    </div>
  );
};
