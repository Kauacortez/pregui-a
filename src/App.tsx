import React, { useState } from 'react';
import { Mascot } from './components/Mascot';
import { MonsterTimer } from './components/MonsterTimer';
import { BlacklistManager } from './components/BlacklistManager';
import { DistractionDetector } from './components/DistractionDetector';
import { PenaltyLockScreen } from './components/PenaltyLockScreen';
import { Bell, BellOff, ShieldAlert } from 'lucide-react';

// Presets de temas visuais (Azul, Rosa, Amarelo [padrão], Verde, Roxo)
const THEME_PRESETS = {
  azul: {
    id: 'azul',
    name: 'Azul',
    dotColor: '#2563EB',
    bg: '#BFDBFE',
    headerBg: 'rgba(219, 234, 254, 0.90)',
    borderColor: 'rgba(147, 197, 253, 0.9)',
    accentBg: 'bg-blue-100',
    accentText: 'text-blue-950',
    accentBorder: 'border-blue-300',
    accentIcon: 'text-blue-100',
    accentIconBg: 'bg-[#1E3A8A]/15 border-[#1E3A8A]/40 text-[#1E3A8A] shadow-blue-900/10',
    badge: 'bg-[#1E3A8A] text-white border-[#172554]',
    button: 'bg-[#1E3A8A] hover:bg-[#1E40AF] active:bg-[#172554] border border-[#172554] text-white shadow-sm',
    footerText: 'text-blue-950/80',
  },
  rosa: {
    id: 'rosa',
    name: 'Rosa',
    dotColor: '#EC4899',
    bg: '#FCE7F3',
    headerBg: 'rgba(253, 242, 248, 0.85)',
    borderColor: 'rgba(251, 207, 232, 0.9)',
    accentBg: 'bg-pink-100',
    accentText: 'text-pink-900',
    accentBorder: 'border-pink-300',
    accentIcon: 'text-pink-700',
    accentIconBg: 'bg-pink-500/15 border-pink-500/40 text-pink-700 shadow-pink-500/10',
    badge: 'bg-pink-100 text-pink-900 border-pink-300',
    button: 'bg-pink-100/80 hover:bg-pink-200/90 active:bg-pink-300 border-pink-300/90 text-pink-950',
    footerText: 'text-pink-900/70',
  },
  amarelo: {
    id: 'amarelo',
    name: 'Amarelo (Padrão)',
    dotColor: '#F59E0B',
    bg: '#FEF7CD',
    headerBg: 'rgba(255, 253, 247, 0.85)',
    borderColor: 'rgba(253, 230, 138, 0.9)',
    accentBg: 'bg-amber-100',
    accentText: 'text-amber-900',
    accentBorder: 'border-amber-300',
    accentIcon: 'text-amber-700',
    accentIconBg: 'bg-amber-500/15 border-amber-500/40 text-amber-700 shadow-amber-500/10',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    button: 'bg-amber-100/80 hover:bg-amber-200/90 active:bg-amber-300 border-amber-300/90 text-amber-950',
    footerText: 'text-amber-900/70',
  },
  verde: {
    id: 'verde',
    name: 'Verde',
    dotColor: '#10B981',
    bg: '#DCFCE7',
    headerBg: 'rgba(240, 253, 244, 0.85)',
    borderColor: 'rgba(167, 243, 208, 0.9)',
    accentBg: 'bg-emerald-100',
    accentText: 'text-emerald-900',
    accentBorder: 'border-emerald-300',
    accentIcon: 'text-emerald-700',
    accentIconBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 shadow-emerald-500/10',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    button: 'bg-emerald-100/80 hover:bg-emerald-200/90 active:bg-emerald-300 border-emerald-300/90 text-emerald-950',
    footerText: 'text-emerald-900/70',
  },
  roxo: {
    id: 'roxo',
    name: 'Roxo',
    dotColor: '#8B5CF6',
    bg: '#EDE9FE',
    headerBg: 'rgba(250, 245, 255, 0.85)',
    borderColor: 'rgba(221, 214, 254, 0.9)',
    accentBg: 'bg-purple-100',
    accentText: 'text-purple-900',
    accentBorder: 'border-purple-300',
    accentIcon: 'text-purple-700',
    accentIconBg: 'bg-purple-500/15 border-purple-500/40 text-purple-700 shadow-purple-500/10',
    badge: 'bg-purple-100 text-purple-900 border-purple-300',
    button: 'bg-purple-100/80 hover:bg-purple-200/90 active:bg-purple-300 border-purple-300/90 text-purple-950',
    footerText: 'text-purple-900/70',
  }
};

const THEME_OPTIONS = [
  THEME_PRESETS.azul,
  THEME_PRESETS.rosa,
  THEME_PRESETS.amarelo,
  THEME_PRESETS.verde,
  THEME_PRESETS.roxo
];

interface ColorPaletteSelectorProps {
  currentTheme: string;
  onSelectTheme: (id: string) => void;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ currentTheme, onSelectTheme }) => {
  return (
    <div
      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:py-1.5 rounded-full bg-slate-200/70 hover:bg-slate-200/90 border border-slate-300/80 shadow-xs backdrop-blur-xs transition-all"
      role="radiogroup"
      aria-label="Seletor de cores"
    >
      {THEME_OPTIONS.map((theme) => {
        const isSelected = currentTheme === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectTheme(theme.id)}
            title={theme.name}
            aria-label={theme.name}
            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
              isSelected
                ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-400 scale-110 shadow-sm'
                : 'opacity-80 hover:opacity-100 hover:scale-115 active:scale-95'
            }`}
            style={{ backgroundColor: theme.dotColor }}
          >
            {isSelected && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-xs pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export const App: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  const [themeColor, setThemeColor] = useState(() => {
    try {
      return localStorage.getItem('focus_theme_color') || 'amarelo';
    } catch(e) {
      return 'amarelo';
    }
  });

  const currentThemeConfig = THEME_PRESETS[themeColor as keyof typeof THEME_PRESETS] || THEME_PRESETS.amarelo;

  const [showPresenceProtocol, setShowPresenceProtocol] = useState(true);
  const [presenceFading, setPresenceFading] = useState(false);

  React.useEffect(() => {
    try {
      localStorage.setItem('focus_theme_color', themeColor);
    } catch(e) {}
    document.body.style.backgroundColor = currentThemeConfig.bg;
  }, [themeColor, currentThemeConfig]);

  React.useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setPresenceFading(true);
    }, 7000);
    const removeTimer = setTimeout(() => {
      setShowPresenceProtocol(false);
    }, 7600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const requestNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  return (
    <div
      className="min-h-screen text-slate-900 flex flex-col justify-between selection:bg-amber-500 selection:text-white transition-colors duration-300"
      style={{ backgroundColor: currentThemeConfig.bg }}
    >
      {/* Sentinela de fuga da aba e tela de penitência */}
      <DistractionDetector />
      <PenaltyLockScreen />

      {/* Barra Superior Alinhada aos Cantos (Responsivo: PC, Tablet e Celular) */}
      <header
        className="w-full border-b backdrop-blur-sm sticky top-0 z-40 shadow-xs transition-colors duration-300"
        style={{ backgroundColor: currentThemeConfig.headerBg, borderColor: currentThemeConfig.borderColor }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex justify-between items-center gap-3 relative">
          {/* Canto Esquerdo: Título Modo de Foco */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-left z-10">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/10 shrink-0 transition-colors ${currentThemeConfig.accentIconBg}`}>
              <ShieldAlert className={`w-4 h-4 sm:w-5 sm:h-5 ${currentThemeConfig.accentIcon}`} />
            </div>
            <div>
              <h1 className="text-xs sm:text-base md:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 sm:gap-2">
                <span className="whitespace-nowrap">MODO DE FOCO</span>
                <span className={`hidden lg:inline-block text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-mono font-semibold whitespace-nowrap transition-colors ${currentThemeConfig.badge}`}>
                  ANTI-PROCRASTINAÇÃO
                </span>
              </h1>
              <p className={`hidden lg:block text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${currentThemeConfig.footerText}`}>
                Vigilância Comportamental de Produtividade
              </p>
            </div>
          </div>

          {/* Centro (Desktop e Tablet): 5 Botões de Cores (Azul, Rosa, Amarelo, Verde, Roxo) */}
          <div className="hidden sm:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            <ColorPaletteSelector
              currentTheme={themeColor}
              onSelectTheme={setThemeColor}
            />
          </div>

          {/* Canto Direito: Botão de Notificação */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 z-10">
            <button
              onClick={requestNotifications}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs whitespace-nowrap ${currentThemeConfig.button}`}
              title={notificationsEnabled ? 'Notificações Ativas' : 'Ativar Notificações no Navegador'}
            >
              {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
              <span className="hidden sm:inline">
                {notificationsEnabled ? 'Alertas ON' : 'Ativar Alertas'}
              </span>
            </button>
          </div>
        </div>

        {/* Linha Centralizada para Celular (Mobile): 5 Botões de Cores */}
        <div className="flex sm:hidden justify-center items-center pb-2.5 pt-0.5 px-4 border-t border-black/5">
          <ColorPaletteSelector
            currentTheme={themeColor}
            onSelectTheme={setThemeColor}
          />
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="w-full max-w-xl mx-auto flex flex-col items-center justify-center px-4 py-2 sm:py-4 flex-1">
        {/* Protocolo de Presença exibido por 5 segundos ao entrar */}
        {showPresenceProtocol && (
          <div className={`w-full mb-2 px-4 py-2.5 bg-[#FFFDF7] border border-amber-200/90 shadow-sm rounded-xl flex items-center gap-2 text-xs text-slate-800 transition-all duration-500 ease-in-out ${presenceFading ? 'opacity-0 -translate-y-2 max-h-0 py-0 my-0 overflow-hidden' : 'opacity-100 max-h-24'}`}>
            <ShieldAlert size={16} className="text-amber-600 shrink-0" />
            <span>
              <strong>Protocolo de Presença:</strong> A saída desta aba durante o período de foco ativa o sinal sonoro ininterrupto até o retorno.
            </span>
          </div>
        )}

        {/* Mascote Reativo */}
        <Mascot />

        {/* Cronômetro */}
        <MonsterTimer />

        {/* Gerenciador de distrações */}
        <BlacklistManager />
      </main>

      {/* Rodapé */}
      <footer className="w-full max-w-7xl mx-auto text-center border-t border-amber-200/90 py-3 sm:py-4 px-4 text-xs text-amber-900/70 font-medium">
        Desenvolvido com carinho e intolerância a desculpas. Mantenha os olhos aqui!
      </footer>
    </div>
  );
};

export default App;
