import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { DONATION_CONFIG } from '../config/donationConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Target: December 20th at 09:00 (Month 11 is December in JS 0-indexed months)
    let target = new Date(currentYear, 11, 20, 9, 0, 0);
    
    // If December 20 of current year has passed, target next year's 20/12
    if (now.getTime() > target.getTime()) {
      target = new Date(currentYear + 1, 11, 20, 9, 0, 0);
    }

    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isCompleted: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Dias', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 pix-subtle-glow shadow-2xl relative overflow-hidden text-center ${className}`}>
      
      {/* Subtle top aura */}
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-28 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10 blur-3xl rounded-full" />

      {/* Header Tag / Event Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-cyan-500/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Próxima Grande Ação: {DONATION_CONFIG.eventDateFormatted}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.3)]">
          <Clock className="w-3.5 h-3.5 text-white" />
          <span>Contagem Regressiva</span>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="font-anton text-2xl sm:text-4xl text-white uppercase tracking-tight">
        Faltam poucos dias para a nossa <span className="text-jjj-gradient">grande união</span>
      </h3>

      <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl mx-auto">
        Brinquedos, gincanas, frutas, doces, algodão-doce, pipas e alegria para as famílias do Sítio Cercado no Parque do Semeador.
      </p>

      {/* Counter Digits Grid */}
      {timeLeft.isCompleted ? (
        <div className="my-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-anton text-lg sm:text-xl tracking-wide uppercase shadow-xl animate-pulse">
          <Sparkles className="w-5 h-5 text-white" />
          <span>É HOJE! GRANDE AÇÃO NO PARQUE DO SEMEADOR!</span>
        </div>
      ) : (
        <div className="my-6 flex items-center justify-center gap-2 sm:gap-4">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center justify-center bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/50 px-3 sm:px-6 py-3 sm:py-4 rounded-2xl min-w-[68px] sm:min-w-[92px] shadow-lg transition-all group hover:shadow-[0_0_20px_rgba(0,210,255,0.15)]">
                <span className="font-anton text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none group-hover:scale-105 group-hover:text-cyan-300 transition-all">
                  {unit.value}
                </span>
                <span className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-widest font-bold mt-1.5">
                  {unit.label}
                </span>
              </div>

              {index < timeUnits.length - 1 && (
                <span className="text-cyan-500/60 font-anton text-2xl sm:text-4xl -mt-4 font-bold select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Localização e Endereço Oficial Solicitado pelo Usuário */}
      <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-white shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-white">
                Local Confirmado:
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                Sítio Cercado
              </span>
            </div>
            <h4 className="font-anton text-base sm:text-lg text-white uppercase tracking-wide mt-0.5">
              {DONATION_CONFIG.eventLocationName}
            </h4>
            <p className="text-xs text-zinc-400">
              {DONATION_CONFIG.eventAddress} • {DONATION_CONFIG.eventCity}
            </p>
          </div>
        </div>

        {/* Link / Botão Google Maps */}
        <a
          href={DONATION_CONFIG.eventGoogleMapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 hover:border-white text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 w-full sm:w-auto justify-center cursor-pointer group"
        >
          <span>Ver Local no Mapa</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black transition-colors" />
        </a>
      </div>

    </div>
  );
};
