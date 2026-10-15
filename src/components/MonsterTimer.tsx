import React, { useEffect, useState } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const MonsterTimer: React.FC = () => {
  const [customMinutes, setCustomMinutes] = useState(25);
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cálculo da barra de progresso circular
  const progressPercent = initialDuration > 0 ? ((initialDuration - timeLeft) / initialDuration) * 100 : 0;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  const handleStart = (minutes: number) => {
    soundEffects.playClick();
    startSession(minutes);
  };

  const handleStop = () => {
    soundEffects.playBuzzer();
    stopSession();
  };

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

        {/* Mostrador Numérico no Centro */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-black text-slate-100 tracking-tight drop-shadow-lg">
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
            {[15, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setCustomMinutes(mins);
                }}
                className={`py-2 border rounded-xl font-bold text-xs transition-all ${
                  customMinutes === mins
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* Campo de Digitação Manual de Tempo */}
          <div className="flex items-center justify-between w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5">
            <label htmlFor="timer-custom-mins" className="text-xs text-slate-300 font-semibold">
              Definir tempo manual:
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="timer-custom-mins"
                type="number"
                min="1"
                max="360"
                value={customMinutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCustomMinutes(isNaN(val) ? 1 : Math.max(1, Math.min(360, val)));
                }}
                className="w-16 px-2 py-1 bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg text-center font-mono font-bold text-emerald-400 text-sm focus:outline-none transition-all"
              />
              <span className="text-xs text-slate-400 font-medium">min</span>
            </div>
          </div>

          {/* Botão Principal */}
          <button
            onClick={() => handleStart(customMinutes)}
            className="w-full py-4 mt-1 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black rounded-xl text-base shadow-lg shadow-emerald-500/25 transition-all tracking-wide flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-slate-950" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            <span>INICIAR SESSÃO ({customMinutes}M)</span>
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
