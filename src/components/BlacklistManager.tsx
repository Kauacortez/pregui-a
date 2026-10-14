import React, { useState } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const BlacklistManager: React.FC = () => {
  const { distractionsList, addDistraction, removeDistraction, isActive } = useFocusStore();
  const [newDistraction, setNewDistraction] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDistraction.trim()) return;
    addDistraction(newDistraction.trim());
    setNewDistraction('');
    soundEffects.playClick();
  };

  const handleRemove = (name: string) => {
    if (isActive) return; // Não permite remover tentações durante a sessão de foco ativa!
    removeDistraction(name);
    soundEffects.playClick();
  };

  return (
    <div className="w-full max-w-md p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl mt-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>🎯</span> Tentações Proibidas
        </h3>
        <span className="text-[11px] text-slate-400">
          {distractionsList.length} listadas
        </span>
      </div>

      {/* Lista de tags */}
      <div className="flex flex-wrap gap-2 mb-3 max-h-32 overflow-y-auto pr-1">
        {distractionsList.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/90 text-red-300 border border-red-900/40 rounded-lg text-xs font-semibold shadow-sm"
          >
            🚫 {item}
            {!isActive && (
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="hover:text-red-100 hover:bg-red-800/40 rounded-full w-4 h-4 flex items-center justify-center transition-colors ml-1 text-xs"
                title="Remover distração"
              >
                ×
              </button>
            )}
          </span>
        ))}
        {distractionsList.length === 0 && (
          <p className="text-xs text-slate-500 italic">
            Nenhuma distração configurada. Adicione seus maiores vícios abaixo!
          </p>
        )}
      </div>

      {/* Formulário para adicionar nova tentação */}
      {!isActive && (
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newDistraction}
            onChange={(e) => setNewDistraction(e.target.value)}
            placeholder="Ex: Reddit, Anime, Shopee..."
            maxLength={30}
            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition-all"
          >
            + Adicionar
          </button>
        </form>
      )}

      {isActive && (
        <p className="text-[11px] text-amber-400/90 font-medium italic mt-2 text-center">
          🔒 Lista bloqueada para edição durante o Modo Monstro ativo.
        </p>
      )}
    </div>
  );
};
