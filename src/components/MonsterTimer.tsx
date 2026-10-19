import React, { useEffect, useState } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';
import { OrbitTimerAnimation, loadOrbitSettings } from './OrbitTimerAnimation';

export const MonsterTimer: React.FC = () => {
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [customSeconds, setCustomSeconds] = useState(0);

  const {
    isActive,
    isPaused,
    timeLeft,
    initialDuration,
    startSession,
    stopSession,
    resumeSession,
    resetTimer,
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
    const total = (h * 3600) + (m * 60) + s;
    if (total <= 0) {
      soundEffects.playBuzzer();
      return;
    }
    soundEffects.playClick();
    const totalMinutes = Math.max(1, Math.round(total / 60));
    startSession(totalMinutes);
  };

  const handleReset = () => {
    soundEffects.playClick();
    resetTimer();
    setCustomHours(0);
    setCustomMinutes(0);
    setCustomSeconds(0);
  };

  const handleStop = () => {
    soundEffects.playBuzzer();
    stopSession();
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    setCustomHours(h);
    setCustomMinutes(m);
    setCustomSeconds(s);
  };

  const isResumable = !isActive && isPaused && timeLeft > 0;
  const currentConfiguredSecs = (customHours * 3600) + (customMinutes * 60) + customSeconds;

  const themeColor = typeof window !== 'undefined' ? (localStorage.getItem('focus_theme_color') || 'amarelo') : 'amarelo';
  const timerThemeStyles: Record<string, { track: string; idle: string; active: string }> = {
    azul: { track: 'stroke-blue-400', idle: 'stroke-blue-500', active: 'stroke-[#1E3A8A]' },
    verde: { track: 'stroke-emerald-400', idle: 'stroke-emerald-500', active: 'stroke-emerald-600' },
    rosa: { track: 'stroke-pink-200/90', idle: 'stroke-pink-300', active: 'stroke-pink-600' },
    roxo: { track: 'stroke-purple-200/90', idle: 'stroke-purple-300', active: 'stroke-purple-600' },
    amarelo: { track: 'stroke-amber-200/90', idle: 'stroke-amber-300', active: 'stroke-amber-600' },
  };
  const currentTheme = timerThemeStyles[themeColor] || timerThemeStyles.amarelo;

  return (
    <div className="flex flex-col items-center justify-center my-4 w-full">
      {/* Indicador Circular de Progresso com Mascote Orbital */}
      <div className="relative flex items-center justify-center w-64 h-64">
        <OrbitTimerAnimation
          orbitAnimState={isActive ? 3 : 1}
          isActive={isActive}
          isPaused={isPaused}
          settings={loadOrbitSettings()}
        />
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            className={currentTheme.track}
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            className={`transition-all duration-1000 ease-linear ${
              isActive ? currentTheme.active : currentTheme.idle
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
          <span className="text-3xl sm:text-3xl font-mono font-black text-slate-900 tracking-normal drop-shadow-sm">
            {formatTime(isActive || isResumable ? timeLeft : currentConfiguredSecs)}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/70 mt-1">
            {isActive ? 'Foco em Andamento' : (isResumable ? 'Sessão Interrompida' : 'Pronto para Ativar')}
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
              const isSelected = customHours === p.h && customMinutes === p.m && customSeconds === p.s && !isPaused;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    if (isPaused) {
                      useFocusStore.setState({ isPaused: false });
                    }
                    setCustomHours(p.h);
                    setCustomMinutes(p.m);
                    setCustomSeconds(p.s);
                  }}
                  className={`py-2 border rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-600 border-amber-700 text-white shadow-md'
                      : 'bg-amber-100/70 hover:bg-amber-200/80 active:bg-amber-300 border-amber-300/80 text-amber-950'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Painel de Ajuste Manual: Horas, Minutos e Segundos */}
          <div className="w-full bg-[#FFFDF7] border border-amber-200/90 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between text-xs text-amber-950 font-semibold">
              <span>Ajuste manual de tempo:</span>
              <span className="font-mono text-amber-700 font-bold">
                {formatTime(currentConfiguredSecs)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center bg-amber-50/70 border border-amber-300/80 rounded-lg p-1.5 focus-within:border-amber-600 transition-colors">
                <label className="text-[10px] text-amber-900/70 uppercase font-mono font-bold mb-0.5">Horas</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={customHours}
                  onChange={(e) => setCustomHours(Math.max(0, Math.min(23, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-amber-700 text-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-center bg-amber-50/70 border border-amber-300/80 rounded-lg p-1.5 focus-within:border-amber-600 transition-colors">
                <label className="text-[10px] text-amber-900/70 uppercase font-mono font-bold mb-0.5">Minutos</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-amber-700 text-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-center bg-amber-50/70 border border-amber-300/80 rounded-lg p-1.5 focus-within:border-amber-600 transition-colors">
                <label className="text-[10px] text-amber-900/70 uppercase font-mono font-bold mb-0.5">Segundos</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0)))}
                  className="w-full bg-transparent text-center font-mono font-black text-amber-700 text-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Botão de Zerar Cronômetro */}
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2.5 px-3 bg-amber-100/70 hover:bg-amber-200/80 active:scale-98 border border-amber-300/80 hover:border-amber-400 text-amber-950 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 group shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-amber-800 group-hover:text-amber-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>ZERAR CRONÔMETRO</span>
          </button>

          {/* Botão Principal */}
          <button
            onClick={() => {
              if (isResumable) {
                soundEffects.playClick();
                resumeSession();
              } else {
                handleStart(customHours, customMinutes, customSeconds);
              }
            }}
            className="w-full py-4 mt-1 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-black rounded-xl text-base shadow-lg shadow-amber-600/30 transition-all tracking-wide flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            <span>
              {isResumable
                ? `RETOMAR SESSÃO (${formatTime(timeLeft)})`
                : `INICIAR SESSÃO (${formatTime(currentConfiguredSecs)})`}
            </span>
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
