import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MascotMood = 'dormindo' | 'focado' | 'julgando' | 'furioso' | 'comemorando';

interface FocusState {
  isActive: boolean;
  isPenalized: boolean; // Flag ativada quando o usuário abandona a aba
  timeLeft: number;
  initialDuration: number;
  distractionStrikes: number;
  mascotMood: MascotMood;
  mascotMessage: string;
  distractionsList: string[];
  penaltyChallenge: string;

  // Ações
  startSession: (durationInMinutes: number) => void;
  stopSession: () => void;
  tick: () => void;
  registerBetrayal: () => void;
  resolvePenalty: () => void;
  addDistraction: (name: string) => void;
  removeDistraction: (name: string) => void;
  setMood: (mood: MascotMood, message?: string) => void;
}

const TAUNTS = [
  "Eu vi você trocando de aba! O Instagram não vai pagar seus boletos.",
  "Flagrado em flagrante! A dopamina rápida te venceu de novo?",
  "Mais uma aba de fofoca e eu deleto sua autoestima em código.",
  "Alerta de traição! Foco zero, desculpas mil.",
  "Você prometeu foco e correu pro feed na primeira oportunidade?"
];

const PENALTY_PHRASES = [
  "Eu sou mais forte que a minha vontade de abrir redes sociais",
  "Procrastinar é roubar tempo do meu próprio futuro",
  "Fechei a outra aba e assumo meu compromisso de foco",
  "Meu mascote tem razão e eu voltei para trabalhar"
];

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
  isActive: false,
  isPenalized: false,
  timeLeft: 25 * 60,
  initialDuration: 25 * 60,
  distractionStrikes: 0,
  mascotMood: 'dormindo',
  mascotMessage: "Estou dormindo. Não me acorde a menos que vá focar de verdade.",
  distractionsList: ['Instagram', 'TikTok', 'Twitter / X', 'YouTube Shorts', 'Jogos'],
  penaltyChallenge: PENALTY_PHRASES[0],

  startSession: (minutes) => {
    const duration = minutes * 60;
    set({
      isActive: true,
      isPenalized: false,
      timeLeft: duration,
      initialDuration: duration,
      distractionStrikes: 0,
      mascotMood: 'focado',
      mascotMessage: "Modo Monstro ATIVADO! Olhos na tela e mãos no trabalho."
    });
  },

  stopSession: () => {
    set({
      isActive: false,
      isPenalized: false,
      mascotMood: 'dormindo',
      mascotMessage: "Sessão encerrada precocemente. A preguiça venceu desta vez?"
    });
  },

  tick: () => {
    const { timeLeft, isActive, isPenalized } = get();
    // Se o usuário estiver na tela de penalidade, o cronômetro do foco pausa
    if (!isActive || isPenalized) return;

    if (timeLeft <= 1) {
      set({
        timeLeft: 0,
        isActive: false,
        mascotMood: 'comemorando',
        mascotMessage: "Meta atingida! Sessão de foco concluída integralmente com sucesso."
      });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  registerBetrayal: () => {
    const { isActive, distractionStrikes } = get();
    if (!isActive) return;

    const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
    const randomPhrase = PENALTY_PHRASES[Math.floor(Math.random() * PENALTY_PHRASES.length)];

    set({
      isPenalized: true,
      distractionStrikes: distractionStrikes + 1,
      mascotMood: 'furioso',
      mascotMessage: `Atenção (${distractionStrikes + 1}ª ocorrência): ${randomTaunt}`,
      penaltyChallenge: randomPhrase
    });
  },

  resolvePenalty: () => {
    set({
      isPenalized: false,
      mascotMood: 'focado',
      mascotMessage: "Penitência cumprida! Retomando o contador. Não ouse sair de novo."
    });
  },

  addDistraction: (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    set((state) => {
      if (state.distractionsList.includes(trimmed)) return state;
      return { distractionsList: [...state.distractionsList, trimmed] };
    });
  },

  removeDistraction: (name) => {
    set((state) => ({
      distractionsList: state.distractionsList.filter((item) => item !== name)
    }));
  },

  setMood: (mood, message) => {
    set((state) => ({
      mascotMood: mood,
      mascotMessage: message || state.mascotMessage
    }));
  }
}),
    {
      name: 'modo_foco_zustand_storage',
    }
  )
);
