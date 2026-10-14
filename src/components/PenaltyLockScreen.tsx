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
          className="bg-slate-900 border-2 border-red-500/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl shadow-red-500/20"
        >
          <div className="w-16 h-16 bg-red-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-black mb-4 animate-bounce">
            ⚠️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-red-500 uppercase tracking-tight">
            Bloqueio de Redenção!
          </h2>

          <p className="text-sm text-slate-300 mt-2">
            Você foi flagrado abandonando a aba de foco ({distractionStrikes}ª infração).
            Para retomar o cronômetro, você precisa cumprir a penitência:
          </p>

          {/* Micro-tarefa 1: Temporizador de reflexão obrigatório */}
          <div className="my-4 p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Tempo de reflexão forçado:
            </span>
            <span className="text-2xl font-mono font-black text-amber-400">
              {penaltySecondsLeft > 0 ? `${penaltySecondsLeft}s de castigo` : '✓ Tempo cumprido'}
            </span>
          </div>

          {/* Micro-tarefa 2: Digitar a frase de compromisso com proteção anti-cópia */}
          <div className="text-left my-4">
            <div className="mb-1">
              <label className="text-xs text-slate-400 font-bold block">
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
              className="p-3 bg-red-950/50 border-2 border-red-800/80 rounded-xl text-xs sm:text-sm font-semibold text-red-200 select-none cursor-not-allowed mb-2 font-mono tracking-wide shadow-inner text-center"
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
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none transition-all font-mono text-sm"
            />

            {cheatAttempt && (
              <div className="mt-2 p-2 bg-red-950 border border-red-600 rounded-lg text-center animate-shake">
                <p className="text-xs text-red-300 font-black">
                  🚨 TENTATIVA DE TRAPAÇA DETECTADA!
                </p>
                <p className="text-[11px] text-red-400">
                  É proibido colar texto. Digite cada letra manualmente para pagar o castigo!
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
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
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
