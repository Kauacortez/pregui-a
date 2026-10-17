import React, { useState } from 'react';
import { Mascot } from './components/Mascot';
import { MonsterTimer } from './components/MonsterTimer';
import { BlacklistManager } from './components/BlacklistManager';
import { DistractionDetector } from './components/DistractionDetector';
import { PenaltyLockScreen } from './components/PenaltyLockScreen';
import { Bell, BellOff, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  const requestNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF7CD] text-slate-900 flex flex-col justify-between items-center p-4 sm:p-6 selection:bg-amber-500 selection:text-white">
      {/* Sentinela de fuga da aba e tela de penitência */}
      <DistractionDetector />
      <PenaltyLockScreen />

      {/* Barra Superior */}
      <header className="w-full max-w-xl flex justify-between items-center border-b border-amber-200/90 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-700 shadow-lg shadow-amber-500/10">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
              MODO FOCO <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-mono font-semibold">ANTI-PROCRASTINAÇÃO</span>
            </h1>
            <p className="text-[11px] text-amber-900/70 font-medium">Vigilância Comportamental de Produtividade</p>
          </div>
        </div>

        {/* Botão de Notificação */}
        <button
          onClick={requestNotifications}
          className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
            notificationsEnabled
              ? 'bg-amber-600 border-amber-700 text-white shadow-sm'
              : 'bg-amber-100/70 hover:bg-amber-200/80 border-amber-300/80 text-amber-950'
          }`}
          title={notificationsEnabled ? 'Notificações Ativas' : 'Ativar Notificações no Navegador'}
        >
          {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
          <span className="hidden sm:inline">
            {notificationsEnabled ? 'Alertas ON' : 'Ativar Alertas'}
          </span>
        </button>
      </header>

      {/* Conteúdo Central */}
      <main className="w-full max-w-xl flex flex-col items-center justify-center my-6">
        {/* Aviso de como funciona a vigilância */}
        <div className="w-full mb-2 px-4 py-2.5 bg-[#FFFDF7] border border-amber-200/90 shadow-sm rounded-xl flex items-center gap-2 text-xs text-slate-800">
          <ShieldAlert size={16} className="text-amber-600 shrink-0" />
          <span>
            <strong>Regra de Ouro:</strong> Se você trocar de aba ou minimizar a tela durante a sessão, o monstro vai soar o alarme e travar a aplicação!
          </span>
        </div>

        {/* Mascote Reativo */}
        <Mascot />

        {/* Cronômetro */}
        <MonsterTimer />

        {/* Gerenciador de distrações */}
        <BlacklistManager />
      </main>

      {/* Rodapé */}
      <footer className="w-full max-w-xl text-center border-t border-amber-200/90 pt-4 text-xs text-amber-900/70 font-medium">
        Desenvolvido com carinho e intolerância a desculpas. Mantenha os olhos aqui!
      </footer>
    </div>
  );
};

export default App;
