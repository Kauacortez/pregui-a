import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const PenaltyLockScreen: React.FC = () => {
  const { isPenalized, penaltyChallenge, resolvePenalty, distractionStrikes } = useFocusStore();
  const [typedInput, setTypedInput] = useState('');
  const [penaltySecondsLeft, setPenaltySecondsLeft] = useState(10);
  const [cheatAttempt, setCheatAttempt] = useState(false);

  // Reinicia o estado a cada nova penalidade
  useEffect(() => {
    if (isPenalized) {
      setTypedInput('');
      setCheatAttempt(false);
      setPenaltySecondsLeft(10);
      soundEffects.playBuzzer();
    }
  }, [isPenalized]);

  // Contagem regressiva de vergonha (10 segundos)
  useEffect(() => {
    if (!isPenalized || penaltySecondsLeft <= 0) return;

    const timer = setInterval(() => {
      setPenaltySecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPenalized, penaltySecondsLeft]);

  if (!isPenalized) return null;

  const isChallengeFulfilled = typedInput.trim().toLowerCase() === penaltyChallenge.trim().toLowerCase();
  const canUnlock = isChallengeFulfilled && penaltySecondsLeft === 0;

  const handleUnlock = () => {
    if (canUnlock) {
      soundEffects.playClick();
      resolvePenalty();
    }
  };

  const handlePasteCheat = (e: React.ClipboardEvent) => {
    e.preventDefault();
    soundEffects.playBuzzer();
    setCheatAttempt(true);
    setTimeout(() => setCheatAttempt(false), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-[#FFFDF7] border-2 border-red-500/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl"
        >
          <div className="w-14 h-14 bg-red-100 border-2 border-red-400 rounded-2xl mx-auto flex items-center justify-center text-red-600 mb-3 shadow-md">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-red-600 uppercase tracking-tight">
            Sessão Interrompida
          </h2>

          <p className="text-xs text-slate-700 mt-1">
            Evasão de tela detectada ({distractionStrikes}ª ocorrência). Conclua a validação para retomar o cronômetro:
          </p>

          {/* Micro-tarefa 1: Temporizador de reflexão obrigatório */}
          <div className="my-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-amber-900/70 font-bold block mb-1">
              Período de estabilização forçado:
            </span>
            <span className="text-2xl font-mono font-black text-amber-600">
              {penaltySecondsLeft > 0 ? `${penaltySecondsLeft}s restantes` : 'Tempo cumprido'}
            </span>
          </div>

          {/* Micro-tarefa 2: Digitar a frase de compromisso com proteção anti-cópia */}
          <div className="text-left my-4">
            <div className="mb-1">
              <label className="text-xs text-slate-700 font-bold block">
                Digite exatamente a frase abaixo para comprovar arrependimento:
              </label>
            </div>

            {/* Container da frase 100% blindado contra seleção e clique direito */}
            <div
              onCopy={(e) => { e.preventDefault(); soundEffects.playBuzzer(); setCheatAttempt(true); }}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-xs sm:text-sm font-semibold text-red-700 select-none cursor-not-allowed mb-2 font-mono tracking-wide shadow-inner text-center"
            >
              "{penaltyChallenge}"
            </div>

            {/* Input com trava total de Paste / Drop */}
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              onPaste={handlePasteCheat}
              onDrop={(e) => { e.preventDefault(); soundEffects.playBuzzer(); }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Digite a frase aqui para provar sua redenção..."
              className="w-full px-4 py-3 bg-white border border-amber-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-slate-900 placeholder-amber-800/40 focus:outline-none transition-all font-mono text-sm shadow-inner"
            />

            {cheatAttempt && (
              <div className="mt-2 p-2 bg-red-50 border border-red-400 rounded-lg text-center animate-shake flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-red-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-red-700 font-semibold">
                  Ação bloqueada: a colagem de texto não é permitida. Digite a frase manualmente.
                </p>
              </div>
            )}
          </div>

          {/* Botão de desbloqueio */}
          <button
            onClick={handleUnlock}
            disabled={!canUnlock}
            className={`w-full py-3.5 rounded-xl font-black text-base transition-all mt-2 ${
              canUnlock
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 cursor-pointer active:scale-95'
                : 'bg-amber-100 text-amber-800/50 cursor-not-allowed border border-amber-200'
            }`}
          >
            {penaltySecondsLeft > 0
              ? `AGUARDE ${penaltySecondsLeft}S...`
              : !isChallengeFulfilled
              ? 'DIGITE A FRASE COMPLETA'
              : 'RETOMAR O FOCO (NÃO ERRE DE NOVO)'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
