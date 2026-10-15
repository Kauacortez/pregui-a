# Modo Foco — Web App de Gestão Comportamental Anti-Procrastinação

Aplicação web focada em produtividade contínua, vigilância comportamental de presença no navegador, sinal sonoro ininterrupto e validação de retorno anti-trapaça.

---

## Funcionalidades Principais

* **Agente Reativo de Supervisão:** Reage em tempo real com estados de acompanhamento (*Em espera*, *Focado*, *Alerta*, *Crítico*, *Concluído*), tremores físicos com micro-interações e orientações de disciplina.
* **Sentinela de Foco (Page Visibility API):** Detecta no milissegundo em que o usuário troca de aba, abre outra janela ou tenta minimizar o navegador durante uma sessão de foco ativa.
* **Sinal Sonoro de Emergência Contínuo (Web Audio API):** Síntese procedural modulada por osciladores (LFO) gerada diretamente pelo hardware de áudio do navegador, sem dependência de arquivos externos. Imune ao estrangulamento de abas em segundo plano (*tab-throttling*).
* **Tela de Bloqueio e Validação de Retorno Anti-Trapaça:**
  * Temporizador obrigatório de estabilização (10 segundos de reflexão).
  * Frase de compromisso blindada contra seleção e cópia (`user-select: none`, intercepção de `onCopy` e `onContextMenu`).
  * Bloqueio estrito de colagem (`Ctrl+V` e `Drop`) no campo de texto com detecção sonora de violação.
* **Gerenciador de Restrições:** Lista de distrações cadastradas (Redes Sociais, Notícias, Jogos, etc.) com bloqueio de edição durante sessões ativas.
* **Cronômetro Pomodoro Circular:** Mostrador vetorial SVG com indicador animado de progresso.

---

## Arquitetura e Tecnologias

* **Frontend:** React 18 / TypeScript
* **Estilização:** Tailwind CSS (Dark Theme minimalista e profissional)
* **Ícones:** Vetores SVG nativos
* **Áudio:** Web Audio API nativa (síntese procedural em tempo real)
* **Gerenciamento de Estado:** Zustand
* **Sentinela de Navegador:** `document.visibilitychange`

---

## Como Executar

### Opção 1: Execução Imediata via Servidor Leve (Python)
Para visualização instantânea sem necessidade de build:
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

## Estrutura do Projeto

```text
├── index.html                  # Versão standalone pronta para servir diretamente
├── package.json                # Dependências do ecossistema Vite/React
├── tailwind.config.js          # Configuração de design system e animações
├── tsconfig.json               # Configurações do TypeScript
├── src/
│   ├── components/
│   │   ├── BlacklistManager.tsx    # Gerenciador de restrições
│   │   ├── DistractionDetector.tsx # Sentinela de fuga da aba
│   │   ├── Mascot.tsx              # Agente reativo com micro-animações
│   │   ├── MonsterTimer.tsx        # Cronômetro circular
│   │   └── PenaltyLockScreen.tsx   # Modal de validação e retenção anti-cópia
│   ├── store/
│   │   └── useFocusStore.ts        # Gerenciamento de estado global com Zustand
│   ├── utils/
│   │   └── soundEffects.ts         # Sintetizador procedural de áudio
│   ├── App.tsx                     # Orquestrador principal da aplicação
│   ├── index.css                   # Diretivas Tailwind
│   └── main.tsx                    # Ponto de montagem no DOM
```
