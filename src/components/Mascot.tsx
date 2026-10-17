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
          faceCenter: '•̀_•́',
          armRight: 'ง',
          eyes: '(ง •̀_•́)ง',
          mouth: '',
          bg: 'bg-amber-600',
          ring: 'border-amber-400 ring-4 ring-amber-500/40',
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
          isWinking: true,
          eyes: '(。•̀ᴗ-)✧',
          mouth: '',
          eyesClass: 'text-2xl md:text-3xl tracking-normal text-sky-950',
          bg: 'bg-[#7DD3FC]',
          border: 'border-4 border-sky-400',
          ring: 'border-sky-400 ring-8 ring-sky-300/60',
          title: 'Monstro Triunfante',
          horns: false,
        };
      case 'dormindo':
      default:
        return {
          isSleeping: true,
          eyes: '(¯﹃¯)',
          mouth: '',
          eyesClass: 'text-2xl md:text-3xl tracking-normal text-amber-950',
          mouthClass: 'text-lg md:text-xl text-amber-900 font-bold',
          bg: 'bg-amber-300',
          ring: 'border-amber-400 ring-2 ring-amber-400/30',
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
          className="relative px-5 py-3 mb-6 bg-[#FFFDF7] border-2 border-amber-300 rounded-2xl text-center shadow-md max-w-sm"
        >
          <p className="text-sm md:text-base font-bold text-slate-900 leading-snug">
            {mascotMessage}
          </p>
          {/* Ponta do balão */}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-[#FFFDF7] border-r-2 border-b-2 border-amber-300 rotate-45" />
        </motion.div>
      </AnimatePresence>

// Componente de Partículas de Celebração (Confetes, Brilhinhos e Estrelinhas)
const CelebrationParticles: React.FC = () => {
  const particles = [
    // Brilhinhos (4-point sparkle)
    { type: 'sparkle', angle: 30, dist: 112, size: 20, color: '#38BDF8', delay: 0 },
    { type: 'sparkle', angle: 120, dist: 118, size: 18, color: '#F59E0B', delay: 0.1 },
    { type: 'sparkle', angle: 210, dist: 110, size: 22, color: '#7DD3FC', delay: 0.15 },
    { type: 'sparkle', angle: 300, dist: 122, size: 19, color: '#FBBF24', delay: 0.05 },
    { type: 'sparkle', angle: 75, dist: 128, size: 16, color: '#0284C7', delay: 0.2 },
    { type: 'sparkle', angle: 255, dist: 125, size: 17, color: '#D97706', delay: 0.12 },

    // Estrelinhas (5-point stars)
    { type: 'star', angle: 0, dist: 120, size: 18, color: '#F59E0B', delay: 0.05 },
    { type: 'star', angle: 60, dist: 112, size: 16, color: '#38BDF8', delay: 0.18 },
    { type: 'star', angle: 150, dist: 120, size: 20, color: '#FBBF24', delay: 0.1 },
    { type: 'star', angle: 180, dist: 115, size: 17, color: '#0284C7', delay: 0.22 },
    { type: 'star', angle: 270, dist: 118, size: 19, color: '#F59E0B', delay: 0.08 },
    { type: 'star', angle: 330, dist: 115, size: 16, color: '#7DD3FC', delay: 0.14 },

    // Confetes (pequenos retângulos e círculos coloridos)
    { type: 'confetti', angle: 15, dist: 98, w: 10, h: 5, color: '#38BDF8', rot: 25, delay: 0 },
    { type: 'confetti', angle: 45, dist: 130, w: 8, h: 8, color: '#F59E0B', rot: 45, delay: 0.1 },
    { type: 'confetti', angle: 90, dist: 108, w: 12, h: 5, color: '#F472B6', rot: -30, delay: 0.05 },
    { type: 'confetti', angle: 105, dist: 126, w: 7, h: 7, color: '#7DD3FC', rot: 60, delay: 0.15 },
    { type: 'confetti', angle: 135, dist: 102, w: 10, h: 4, color: '#FBBF24', rot: 15, delay: 0.08 },
    { type: 'confetti', angle: 165, dist: 130, w: 8, h: 6, color: '#34D399', rot: -50, delay: 0.2 },
    { type: 'confetti', angle: 195, dist: 102, w: 11, h: 5, color: '#38BDF8', rot: 35, delay: 0.06 },
    { type: 'confetti', angle: 225, dist: 126, w: 9, h: 9, color: '#D97706', rot: -20, delay: 0.14 },
    { type: 'confetti', angle: 240, dist: 98, w: 10, h: 5, color: '#F472B6', rot: 55, delay: 0.18 },
    { type: 'confetti', angle: 285, dist: 130, w: 12, h: 5, color: '#7DD3FC', rot: -40, delay: 0.08 },
    { type: 'confetti', angle: 315, dist: 102, w: 8, h: 7, color: '#FBBF24', rot: 30, delay: 0.12 },
    { type: 'confetti', angle: 345, dist: 130, w: 10, h: 5, color: '#0284C7', rot: -15, delay: 0.22 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-0">
      {particles.map((p, idx) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.round(Math.cos(rad) * p.dist);
        const ty = Math.round(Math.sin(rad) * p.dist);
        const driftX = idx % 2 === 0 ? 4 : -4;
        const driftY = idx % 3 === 0 ? -5 : 5;
        const baseRot = p.rot || (p.angle * 2);

        return (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
            animate={{
              x: [0, tx * 1.1, tx, tx + driftX],
              y: [0, ty * 1.1, ty, ty + driftY],
              scale: [0, 1.25, 1, 1],
              rotate: [0, baseRot * 0.5, baseRot, baseRot + 15],
              opacity: [0, 1, 1, 0.95],
            }}
            transition={{
              duration: 0.65,
              delay: p.delay,
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {p.type === 'confetti' && (
              <div
                style={{
                  width: `${p.w}px`,
                  height: `${p.h}px`,
                  backgroundColor: p.color,
                  borderRadius: p.w === p.h ? '50%' : '2px',
                  boxShadow: `0 2px 6px ${p.color}66`
                }}
              />
            )}
            {p.type === 'sparkle' && (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} style={{ filter: `drop-shadow(0 2px 6px ${p.color}88)` }}>
                <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
              </svg>
            )}
            {p.type === 'star' && (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} style={{ filter: `drop-shadow(0 2px 6px ${p.color}88)` }}>
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

      {/* Avatar do Monstrinho com Framer Motion */}
      <div className="relative flex items-center justify-center">
        {mascotMood === 'comemorando' && <CelebrationParticles />}

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
              : mascotMood === 'dormindo'
              ? {
                  y: [0, -5, -5, 0],
                  scale: [1, 1.025, 1.025, 1],
                  transition: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' },
                }
              : {}
          }
          className={`relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-3xl flex flex-col items-center justify-center ${visual.bg} ${visual.ring} ${(visual as any).border || 'border-4 border-amber-900/80'} transition-colors duration-500 shadow-2xl cursor-pointer ${(visual as any).isSleeping ? 'overflow-hidden' : ''}`}
        >
          {/* Floating Zzz contidos no canto superior direito do card */}
          {(visual as any).isSleeping && (
            <div className="absolute top-2 right-2 w-14 h-14 overflow-hidden pointer-events-none select-none z-20">
              <span className="inner-z1 text-xs select-none">z</span>
              <span className="inner-z2 text-sm select-none">z</span>
              <span className="inner-z3 text-base select-none">Z</span>
            </div>
          )}

          {/* Chifrinhos fofos/cômicos do monstrinho */}
          {visual.horns && (
            <>
              <div className="absolute -top-3 left-4 w-4 h-6 bg-slate-900 rounded-t-full -rotate-12 border-2 border-slate-800" />
              <div className="absolute -top-3 right-4 w-4 h-6 bg-slate-900 rounded-t-full rotate-12 border-2 border-slate-800" />
            </>
          )}

          {/* Olhinhos expressivos */}
          {(visual as any).isBoxing ? (
            <div className="flex items-center justify-center font-['Arial',sans-serif] font-black text-white text-3xl md:text-4xl drop-shadow-md select-none tracking-normal">
              <span className="text-white select-none mr-2">(</span>
              <span className="inline-block animate-punch-left origin-center text-amber-100 will-change-transform">
                {(visual as any).armLeft}
              </span>
              <span className="inline-block select-none px-2 font-['Arial',sans-serif]">
                {(visual as any).faceCenter}
              </span>
              <span className="text-white select-none mr-1.5">)</span>
              <span className="inline-block animate-punch-right origin-center text-amber-100 will-change-transform">
                {(visual as any).armRight}
              </span>
            </div>
          ) : (visual as any).isWinking ? (
            <div className="flex items-center justify-center font-['Arial',sans-serif] font-black text-sky-950 text-2xl md:text-3xl tracking-normal select-none drop-shadow-sm">
              <span className="select-none">(。</span>
              
              {/* Olho Esquerdo */}
              <span className="inline-block relative w-[1.1ch] h-[1.2em] overflow-visible text-center align-middle">
                <span className="anim-l-open inline-block absolute inset-0 text-center">•̀</span>
                <span className="anim-l-closed inline-block absolute inset-0 text-center text-2xl md:text-3xl leading-tight font-black">-</span>
              </span>

              <span className="select-none mx-0.5">ᴗ</span>

              {/* Olho Direito (Piscadinha charmosa) */}
              <span className="inline-block relative w-[1.1ch] h-[1.2em] overflow-visible text-center align-middle">
                <span className="anim-r-open inline-block absolute inset-0 text-center">•̀</span>
                <span className="anim-r-closed inline-block absolute inset-0 text-center text-2xl md:text-3xl leading-tight font-black">-</span>
              </span>

              <span className="select-none">)</span>

              {/* Estrelinha que brilha intensamente na piscadinha */}
              <span className="anim-sparkle inline-block origin-center ml-0.5 text-sky-800 will-change-transform">✧</span>
            </div>
          ) : (visual as any).isSleeping ? (
            /* Rosto adormecido com baba animada, sem bolha */
            <div className="flex items-center justify-center font-black text-amber-950 font-['Arial',sans-serif] drop-shadow-sm text-2xl md:text-3xl tracking-normal select-none">
              <span>(¯</span>
              <span className="anim-drool text-amber-900 mx-0.5">﹃</span>
              <span>¯)</span>
            </div>
          ) : (
            <span className={`font-black font-['Arial',sans-serif] drop-shadow-sm ${(visual as any).eyesClass || 'text-3xl md:text-4xl tracking-widest text-white'}`}>
              {visual.eyes}
            </span>
          )}

          {/* Boca expressiva */}
          {!(visual as any).isSleeping && visual.mouth && (
            <span className={`font-black mt-1 ${(visual as any).mouthClass || 'text-xl md:text-2xl text-slate-950'}`}>
              {visual.mouth}
            </span>
          )}
        </motion.div>
      </div>

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
