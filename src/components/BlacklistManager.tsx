import React, { useState } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const BlacklistManager: React.FC = () => {
  const { distractionsList, addDistraction, removeDistraction, isActive } = useFocusStore();
  const [newDistraction, setNewDistraction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-full max-w-md bg-[#FFFDF7] border border-amber-200/90 rounded-2xl shadow-sm mt-6 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => {
          soundEffects.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 flex justify-between items-center text-left hover:bg-amber-100/40 active:bg-amber-100/60 transition-colors cursor-pointer select-none"
      >
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
          <span>Restrições Configuradas</span>
        </h3>
        <svg
          className={`w-4 h-4 text-amber-800/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Conteúdo expandido sob clique */}
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-amber-200/60">
          <div className="flex flex-wrap gap-2 mb-3 mt-2 max-h-32 overflow-y-auto pr-1">
            {distractionsList.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 text-amber-950 border border-amber-300/90 rounded-lg text-xs font-semibold shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {item}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="hover:text-red-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors ml-1 text-xs"
                    title="Remover distração"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            {distractionsList.length === 0 && (
              <p className="text-xs text-amber-800/60 italic">
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
                placeholder="Ex: Rede Social, Notícias..."
                maxLength={30}
                className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs text-slate-900 placeholder-amber-800/40 focus:outline-none focus:border-amber-600 transition-colors shadow-inner"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-200/80 hover:bg-amber-300 active:bg-amber-400 text-amber-950 border border-amber-300 rounded-lg text-xs font-bold transition-all"
              >
                + Adicionar
              </button>
            </form>
          )}

          {isActive && (
            <p className="text-[11px] text-amber-800/60 font-medium italic mt-2 text-center">
              Lista bloqueada para edição durante a sessão ativa.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
