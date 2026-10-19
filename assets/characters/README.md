# Guia de Folhas de Sprites dos Personagens (Timer Orbital)

Esta pasta contém as pastas de cada um dos 5 personagens que você pode utilizar na animação orbital do cronômetro.

## Estrutura das Pastas

```text
assets/characters/
├── personagem-1-padrao/       <-- Personagem principal que substitui o exemplo
│   ├── spritesheet.png        <-- Folha de sprites com os 3 frames da animação
│   └── README.md
├── personagem-2/
│   ├── spritesheet.png
│   └── README.md
├── personagem-3/
│   ├── spritesheet.png
│   └── README.md
├── personagem-4/
│   ├── spritesheet.png
│   └── README.md
└── personagem-5/
    ├── spritesheet.png
    └── README.md
```

## Como preparar a sua Folha de Sprites (`spritesheet.png`)

O sistema orbital utiliza **3 estágios de animação**:
1. **Frame 1 (Normal / Parado):** O personagem em pé, olhando para a frente. Fica no topo do cronômetro enquanto a sessão não começou ou após ser zerada.
2. **Frame 2 (Impulso / Decolagem):** O personagem inclinado, se preparando para arrancar no círculo (duração de 500ms).
3. **Frame 3 (Voo Superman):** O personagem na horizontal (deitado), com os braços apontando na direção do voo horário, com cabelos/capa para trás.

### Formato Recomendado:

- **Arquivo:** `spritesheet.png` com fundo transparente.
- **Disposição:** Faixa horizontal com os 3 frames lado a lado, com a mesma largura e altura:
  - Exemplo: 3 frames de $64 \times 64\text{px}$ $\rightarrow$ imagem total de **$192 \times 64\text{px}$**.
  - Exemplo: 3 frames de $128 \times 128\text{px}$ $\rightarrow$ imagem total de **$384 \times 128\text{px}$**.
  - Exemplo: 3 frames de $32 \times 32\text{px}$ $\rightarrow$ imagem total de **$96 \times 32\text{px}$**.
- **Ordem dos frames da esquerda para a direita:**
  `[ Frame 1: Normal ]` `[ Frame 2: Impulso ]` `[ Frame 3: Voo ]`

### Alternativa com Frames Separados:
Se você preferir salvar cada pose em um arquivo individual em vez de juntar na mesma folha, você também pode colocar:
- `frame1-normal.png`
- `frame2-impulso.png`
- `frame3-voo.png`
