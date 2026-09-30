import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Target: October 18th at 09:00 (Month 9 is October in JS 0-indexed months)
    let target = new Date(currentYear, 9, 18, 9, 0, 0);
    
    // If October 18 of current year has already passed, target next year's 18/10
    if (now.getTime() > target.getTime()) {
      target = new Date(currentYear + 1, 9, 18, 9, 0, 0);
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

  if (timeLeft.isCompleted) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-black font-anton text-lg tracking-wide uppercase shadow-xl animate-pulse">
        <Sparkles className="w-5 h-5 text-black" />
        <span>É HOJE! GRANDE AÇÃO NA PRAÇA NAPOLEÃO CÔRTES FILHO!</span>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Dias', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Header Tag */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold tracking-wider uppercase mb-2.5">
        <Clock className="w-3.5 h-3.5 text-zinc-300 animate-spin-slow" />
        <span>Contagem Regressiva para 18/10</span>
      </div>

      {/* Counter Digits Grid */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center justify-center bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl min-w-[64px] sm:min-w-[76px] shadow-lg backdrop-blur-md transition-all group">
              <span className="font-anton text-2xl sm:text-4xl text-white tracking-tight leading-none group-hover:scale-105 transition-transform">
                {unit.value}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-semibold mt-1">
                {unit.label}
              </span>
            </div>

            {index < timeUnits.length - 1 && (
              <span className="text-zinc-600 font-anton text-xl sm:text-2xl -mt-4 font-bold select-none">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
