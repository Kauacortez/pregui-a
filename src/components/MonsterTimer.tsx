import React, { useEffect, useState } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const MonsterTimer: React.FC = () => {
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [customSeconds, setCustomSeconds] = useState(0);

  const {
    isActive,
    timeLeft,
    initialDuration,
    startSession,
    stopSession,
    tick,
    mascotMood,
  } = useFocusStore();

  // Tick a cada 1 segundo quando a sessão está ativa
  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, tick]);

  // Efeito sonoro ao vencer a sessão
  useEffect(() => {
    if (mascotMood === 'comemorando') {
      soundEffects.playCelebration();
    }
  }, [mascotMood]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Cálculo da barra de progresso circular
  const progressPercent = initialDuration > 0 ? ((initialDuration - timeLeft) / initialDuration) * 100 : 0;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  const handleStart = (h: number, m: number, s: number) => {
    soundEffects.playClick();
    const totalMinutes = Math.max(1, Math.round(((h * 3600) + (m * 60) + s) / 60));
    startSession(totalMinutes);
  };

  const handleStop = () => {
    soundEffects.playBuzzer();
    stopSession();
  };

  const currentConfiguredSecs = (customHours * 3600) + (customMinutes * 60) + customSeconds;

  return (
    <div className="flex flex-col items-center justify-center my-4 w-full">
      {/* Indicador Circular de Progresso */}
      <div className="relative flex items-center justify-center w-64 h-64">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-slate-800"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            className={`transition-all duration-1000 ease-linear ${
              isActive ? 'stroke-emerald-400' : 'stroke-slate-600'
            }`}
            strokeWidth="10"
            strokeDasharray="440"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Mostrador Numérico no Centro: HH:MM:SS */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-3xl font-mono font-black text-slate-100 tracking-normal drop-shadow-lg">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
            {isActive ? 'Foco em Andamento' : 'Pronto para Ativar'}
          </span>
        </div>
      </div>

      {/* Controles de Duração (quando inativo) */}
      {!isActive ? (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm mt-4">
          {/* Predefinições Rápidas */}
          <div className="grid grid-cols-4 gap-2 w-full">
            {[
              { label: '15 min', h: 0, m: 15, s: 0 },
              { label: '25 min', h: 0, m: 25, s: 0 },
              { label: '45 min', h: 0, m: 45, s: 0 },
              { label: '1 hora', h: 1, m: 0, s: 0 },
            ].map((p) => {
              const isSelected = customHours === p.h && customMinutes === p.m && customSeconds === p.s;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setCustomHours(p.h);
                    setCustomMinutes(p.m);
                    setCustomSeconds(p.s);
                  }}
                  className={`py-2 border rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Painel de Ajuste Manual: Horas, Minutos e Segundos */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
              <span>Ajuste manual de tempo:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {formatTime(currentConfiguredSecs)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center bg-slate-950 border border-slate-800 rounded-lg p-1.5 focus-within:border-emerald-500 transition-colors">
                <label className="text-[10px] text-slate-400 uppercase font-mono font-bold mb-0.5">Horas</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={customHours}
                  onChange={(e) => setCustomHours(Math.max(0, Math.min(23, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-emerald-400 text-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-center bg-slate-950 border border-slate-800 rounded-lg p-1.5 focus-within:border-emerald-500 transition-colors">
                <label className="text-[10px] text-slate-400 uppercase font-mono font-bold mb-0.5">Minutos</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-emerald-400 text-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-center bg-slate-950 border border-slate-800 rounded-lg p-1.5 focus-within:border-emerald-500 transition-colors">
                <label className="text-[10px] text-slate-400 uppercase font-mono font-bold mb-0.5">Segundos</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-emerald-400 text-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Botão Principal */}
          <button
            onClick={() => handleStart(customHours, customMinutes, customSeconds)}
            className="w-full py-4 mt-1 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black rounded-xl text-base shadow-lg shadow-emerald-500/25 transition-all tracking-wide flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-slate-950" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            <span>INICIAR SESSÃO ({formatTime(currentConfiguredSecs > 0 ? currentConfiguredSecs : 25 * 60)})</span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm mt-4">
          <button
            onClick={handleStop}
            className="w-full py-4 bg-red-600/90 hover:bg-red-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/30 active:scale-98 transition-all uppercase tracking-wider border border-red-500/50 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
            <span>Interromper Sessão</span>
          </button>
        </div>
      )}
    </div>
  );
};
