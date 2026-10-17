import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusStore, MascotMood } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const Mascot: React.FC = () => {
  const { mascotMood, mascotMessage, distractionStrikes } = useFocusStore();

  const getVisualConfig = (mood: MascotMood) => {
    switch (mood) {
      case 'focado':
        return {
          isBoxing: true,
          armLeft: 'ง',
          faceCenter: ' •̀_•́ ',
          armRight: 'ง',
          eyes: '(ง •̀_•́)ง',
          mouth: '',
          bg: 'bg-emerald-500',
          ring: 'border-emerald-300 ring-4 ring-emerald-500/30',
          title: 'Monstro Concentrado',
          horns: true,
        };
      case 'furioso':
        return {
          eyes: 'ಠ益ಠ',
          mouth: '▲',
          bg: 'bg-red-600',
          ring: 'border-red-400 ring-8 ring-red-600/50',
          title: 'MONSTRO FURIOSO COM SUA TRAIÇÃO',
          horns: true,
        };
      case 'julgando':
        return {
          eyes: '¬_¬',
          mouth: '〜',
          bg: 'bg-amber-500',
          ring: 'border-amber-300 ring-4 ring-amber-500/30',
          title: 'Monstro Julgador',
          horns: false,
        };
      case 'comemorando':
        return {
          eyes: '(。•̀ᴗ-)✧',
          mouth: '',
          eyesClass: 'text-2xl md:text-3xl tracking-normal',
          bg: 'bg-purple-600',
          ring: 'border-purple-300 ring-6 ring-purple-500/40',
          title: 'Monstro Triunfante',
          horns: true,
        };
      case 'dormindo':
      default:
        return {
          eyes: '(¯﹃¯)',
          mouth: 'ᶻ 𝗓 𐰁',
          eyesClass: 'text-2xl md:text-3xl tracking-normal',
          mouthClass: 'text-lg md:text-xl text-slate-300 font-bold',
          bg: 'bg-slate-700',
          ring: 'border-slate-600 ring-2 ring-slate-700/20',
          title: 'Monstro Hibernando',
          horns: false,
        };
    }
  };

  const visual = getVisualConfig(mascotMood);

  const handlePoke = () => {
    soundEffects.playClick();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 my-2 select-none w-full max-w-md">
      {/* Balão de Diálogo do Mascote */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mascotMessage}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative px-5 py-3 mb-6 bg-slate-900/90 border-2 border-slate-700 rounded-2xl text-center shadow-xl backdrop-blur-sm max-w-sm"
        >
          <p className="text-sm md:text-base font-bold text-slate-100 leading-snug">
            {mascotMessage}
          </p>
          {/* Ponta do balão */}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-slate-700 rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* Avatar do Monstrinho com Framer Motion */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePoke}
        animate={
          mascotMood === 'furioso'
            ? {
                x: [-6, 6, -6, 6, 0],
                y: [-3, 3, -3, 3, 0],
                transition: { repeat: Infinity, duration: 0.18 },
              }
            : mascotMood === 'focado'
            ? {
                y: [0, -4, 0],
                transition: { repeat: Infinity, duration: 2.0, ease: 'easeInOut' },
              }
            : mascotMood === 'comemorando'
            ? {
                rotate: [0, -12, 12, -12, 0],
                scale: [1, 1.12, 1],
                transition: { repeat: Infinity, duration: 0.9 },
              }
            : {}
        }
        className={`relative w-36 h-36 md:w-44 md:h-44 rounded-3xl flex flex-col items-center justify-center ${visual.bg} ${visual.ring} border-4 transition-colors duration-500 shadow-2xl cursor-pointer`}
      >
        {/* Chifrinhos fofos/cômicos do monstrinho */}
        {visual.horns && (
          <>
            <div className="absolute -top-3 left-4 w-4 h-6 bg-slate-900 rounded-t-full -rotate-12 border-2 border-slate-800" />
            <div className="absolute -top-3 right-4 w-4 h-6 bg-slate-900 rounded-t-full rotate-12 border-2 border-slate-800" />
          </>
        )}

        {/* Olhinhos expressivos */}
        {(visual as any).isBoxing ? (
          <div className="flex items-center justify-center font-mono font-black text-white text-3xl md:text-4xl drop-shadow-md select-none tracking-normal">
            <span className="text-white select-none">(</span>
            <span className="inline-block animate-punch-left origin-right text-emerald-100 will-change-transform">
              {(visual as any).armLeft}
            </span>
            <span className="inline-block select-none px-0.5">
              {(visual as any).faceCenter}
            </span>
            <span className="text-white select-none">)</span>
            <span className="inline-block animate-punch-right origin-left text-emerald-100 will-change-transform">
              {(visual as any).armRight}
            </span>
          </div>
        ) : (
          <span className={`font-black text-white font-mono drop-shadow-md ${(visual as any).eyesClass || 'text-3xl md:text-4xl tracking-widest'}`}>
            {visual.eyes}
          </span>
        )}

        {/* Boca expressiva */}
        {visual.mouth && (
          <span className={`font-black mt-1 ${(visual as any).mouthClass || 'text-xl md:text-2xl text-slate-950'}`}>
            {visual.mouth}
          </span>
        )}
      </motion.div>

      {/* Indicador de infrações */}
      {distractionStrikes > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 px-3 py-1 bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-semibold tracking-wider uppercase rounded-full shadow-inner flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>{distractionStrikes} {distractionStrikes === 1 ? 'interrupção registrada' : 'interrupções registradas'}</span>
        </motion.div>
      )}
    </div>
  );
};
