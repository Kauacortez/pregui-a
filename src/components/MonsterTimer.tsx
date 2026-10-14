import React, { useEffect } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const MonsterTimer: React.FC = () => {
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
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Escolha o tempo de batalha:
          </span>
          <div className="grid grid-cols-3 gap-2 w-full">
            {[15, 25, 45].map((mins) => (
              <button
                key={mins}
                onClick={() => handleStart(mins)}
                className="py-3 px-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 hover:border-emerald-500/50 rounded-xl font-bold text-sm text-slate-200 transition-all shadow-md"
              >
                {mins} min
              </button>
            ))}
          </div>
          <button
            onClick={() => handleStart(25)}
            className="w-full py-4 mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-lg shadow-lg shadow-emerald-500/25 active:scale-98 transition-all tracking-wide"
          >
            🔥 ATIVAR MODO MONSTRO (25M)
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm mt-4">
          <button
            onClick={handleStop}
            className="w-full py-4 bg-red-600/90 hover:bg-red-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/30 active:scale-98 transition-all uppercase tracking-wider border border-red-500/50"
          >
            🏳️ Desistir e Encarar o Julgamento
          </button>
        </div>
      )}
    </div>
  );
};
