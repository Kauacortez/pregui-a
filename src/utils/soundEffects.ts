// Síntese de áudio procedural e nativa via Web Audio API.

class SoundFX {
  private ctx: AudioContext | null = null;
  private sirenNodes: { osc: OscillatorNode; lfo: OscillatorNode; mainGain: GainNode } | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Sirene contínua e estridente que roda no hardware de áudio enquanto o usuário estiver em outra aba
  startEmergencySiren() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopEmergencySiren(); // Evita sobreposição de sirenes

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, ctx.currentTime);

    // Oscilador LFO para modular a frequência continuamente (efeito sirene policial/alarme)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4.0, ctx.currentTime); // 4 oscilações agudas por segundo

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(320, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.28, ctx.currentTime);

    osc.connect(mainGain);
    mainGain.connect(ctx.destination);

    osc.start();
    lfo.start();

    this.sirenNodes = { osc, lfo, mainGain };
  }

  // Corta o som imediatamente no segundo em que o usuário volta à aba
  stopEmergencySiren() {
    if (this.sirenNodes && this.ctx) {
      try {
        const { osc, lfo, mainGain } = this.sirenNodes;
        mainGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        setTimeout(() => {
          try {
            osc.stop();
            lfo.stop();
            osc.disconnect();
            lfo.disconnect();
            mainGain.disconnect();
          } catch (_) {}
        }, 100);
      } catch (_) {}
      this.sirenNodes = null;
    }
  }

  // Som agradável de clique de botão
  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Fanfarra de vitória ao concluir a sessão de foco
  playCelebration() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
}

export const soundEffects = new SoundFX();
