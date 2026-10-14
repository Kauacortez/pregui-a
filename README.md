# 👾 Modo Monstro — Web App Anti-Procrastinação Gamificado

Aplicação web focada em quebrar ciclos de procrastinação através de humor agressivo, vigilância comportamental de foco no navegador, alarme estridente ininterrupto e mecânicas impiedosas de gamificação.

---

## 🚀 Funcionalidades Principais

* **👾 Mascote Reativo:** Reage em tempo real com estados de humor (*Dormindo*, *Focado*, *Julgando*, *Furioso*, *Comemorando*), tremores físicos com animações e balões sarcásticos.
* **👁️ Sentinela de Foco (`Page Visibility API`):** Detecta no milissegundo em que o usuário troca de aba, abre outra janela ou tenta minimizar o navegador durante uma sessão de foco ativa.
* **🚨 Sirene de Emergência Contínua (Web Audio API):** Som procedural modulado por osciladores (LFO) gerado direto pelo hardware de áudio do navegador, sem dependência de arquivos externos. Não engasga com *tab-throttling* e toca sem parar até o usuário voltar para a aba.
* **🔒 Tela de Bloqueio e Redenção Anti-Trapaça:**
  * Temporizador obrigatório de reflexão (10 segundos de castigo).
  * Frase de compromisso **blindada contra seleção e cópia** (`user-select: none`, intercepção de `onCopy` e `onContextMenu`).
  * Bloqueio estrito de colagem (`Ctrl+V` e `Drop`) no campo de texto com detecção sonora de trapaça.
* **🎯 Gerenciador de Tentações Proibidas:** Lista visual de distrações cadastradas (Instagram, TikTok, Twitter/X, YouTube Shorts, etc.) com bloqueio de edição durante sessões ativas.
* **⏱️ Cronômetro Pomodoro Circular:** Mostrador imersivo em SVG com indicador animado de progresso.

---

## 🛠️ Arquitetura e Tecnologias

* **Frontend:** React 18 / TypeScript
* **Estilização:** Tailwind CSS (tema Dark/Neo-brutalist)
* **Animações:** Framer Motion / CSS Keyframes
* **Áudio:** Web Audio API nativa (síntese procedural)
* **Gerenciamento de Estado:** Zustand
* **Sentinela de Navegador:** `document.visibilitychange`

---

## 💻 Como Executar

### Opção 1: Execução Imediata via Servidor Leve (Python)
Caso você queira visualizar ou testar imediatamente sem compilação:
```bash
python -m http.server 3000
```
Acesse: [http://localhost:3000](http://localhost:3000)

### Opção 2: Ambiente de Desenvolvimento Completo (Node / Vite)
Após instalar o Node.js:
```bash
npm install
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

---

## 📂 Estrutura do Projeto

```text
├── index.html                  # Versão standalone pronta para servir diretamente
├── package.json                # Dependências do ecossistema Vite/React
├── tailwind.config.js          # Configuração de design system e animações
├── tsconfig.json               # Configurações do TypeScript
├── src/
│   ├── components/
│   │   ├── BlacklistManager.tsx    # Gerenciador de distrações
│   │   ├── DistractionDetector.tsx # Sentinela de fuga da aba
│   │   ├── Mascot.tsx              # Mascote animado com expressões e falas
│   │   ├── MonsterTimer.tsx        # Cronômetro circular
│   │   └── PenaltyLockScreen.tsx   # Modal de castigo e redenção anti-cópia
│   ├── store/
│   │   └── useFocusStore.ts        # Gerenciamento de estado global com Zustand
│   ├── utils/
│   │   └── soundEffects.ts         # Sintetizador procedural de áudio
│   ├── App.tsx                     # Orquestrador principal da aplicação
│   ├── index.css                   # Diretivas Tailwind
│   └── main.tsx                    # Ponto de montagem no DOM
```
