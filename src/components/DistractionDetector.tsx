import React, { useEffect, useRef } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { soundEffects } from '../utils/soundEffects';

export const DistractionDetector: React.FC = () => {
  const { isActive, registerBetrayal } = useFocusStore();
  const titleIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isActive) {
        // 1. Inicia a sirene de emergência contínua
        soundEffects.startEmergencySiren();

        // 2. Faz o título da aba piscar em modo alarme
        if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
        let toggle = false;
        titleIntervalRef.current = window.setInterval(() => {
          document.title = toggle ? "🚨 VOLTE JÁ AQUI! 🚨" : "⚠️ ALARME DE PROCRASTINAÇÃO! ⚠️";
          toggle = !toggle;
        }, 500);

        // 3. Registra a traição
        registerBetrayal();

        // 4. Notificação push com requisição de interação
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('🚨 VOLTE JÁ PARA O FOCO!', {
            body: 'O alarme não vai parar de tocar até você voltar para a aba!',
            requireInteraction: true,
          });
        }
      } else if (!document.hidden) {
        // Usuário retornou: desliga a sirene imediatamente e restaura o título
        soundEffects.stopEmergencySiren();
        if (titleIntervalRef.current) {
          clearInterval(titleIntervalRef.current);
          titleIntervalRef.current = null;
        }
        document.title = "Modo Monstro — Anti-Procrastinação Gamificado";
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      soundEffects.stopEmergencySiren();
      if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
    };
  }, [isActive, registerBetrayal]);

  return null;
};
