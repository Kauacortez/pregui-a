import React, { useRef } from 'react';

export interface OrbitSettings {
  enabled: boolean;
  speed: number;
  scale: number;
  angle: number;
  showTrail: boolean;
  selectedCharacter?: string;
  isCustomUpload?: boolean;
  customImg1: string | null;
  customImg2: string | null;
  customImg3: string | null;
}

export const DEFAULT_ORBIT_SETTINGS: OrbitSettings = {
  enabled: true,
  speed: 8,
  scale: 0.9,
  angle: 0,
  showTrail: true,
  selectedCharacter: 'personagem-1-padrao',
  customImg1: null,
  customImg2: null,
  customImg3: null,
};

export const ORBIT_SETTINGS_KEY = 'modo_foco_orbit_settings_v1';

export const loadOrbitSettings = (): OrbitSettings => {
  try {
    const raw = localStorage.getItem(ORBIT_SETTINGS_KEY);
    if (!raw) return DEFAULT_ORBIT_SETTINGS;
    return { ...DEFAULT_ORBIT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ORBIT_SETTINGS;
  }
};

interface OrbitTimerAnimationProps {
  orbitAnimState: 1 | 2 | 3;
  isActive: boolean;
  isPaused: boolean;
  settings: OrbitSettings;
  themeColor?: string;
}

const ASSETS_VERSION = '20261021_v4_purple_fix';

const getOrbitThemeConfig = (theme?: string) => {
  if (theme === 'azul') {
    return {
      trail1: '#DBEAFE',
      trail2: '#93C5FD',
      trail3: '#60A5FA',
      trail4: '#3B82F6',
      sparkle1: '#DBEAFE',
      sparkle2: '#93C5FD',
      sparkle3: '#60A5FA',
      ghostFilter: 'drop-shadow(-4px 0 6px #60A5FA)',
      fallback1: `./assets/characters/personagem-azul/frame1-normal.png?v=${ASSETS_VERSION}`,
      fallback2: `./assets/characters/personagem-azul/frame2-impulso.png?v=${ASSETS_VERSION}`,
      fallback3: `./assets/characters/personagem-azul/frame3-voo.png?v=${ASSETS_VERSION}`,
    };
  }
  if (theme === 'roxo') {
    return {
      trail1: '#F3E8FF',
      trail2: '#D8B4FE',
      trail3: '#C084FC',
      trail4: '#A855F7',
      sparkle1: '#F3E8FF',
      sparkle2: '#D8B4FE',
      sparkle3: '#C084FC',
      ghostFilter: 'drop-shadow(-4px 0 6px #C084FC)',
      fallback1: `./assets/characters/personagem-roxo/frame1-normal.png?v=${ASSETS_VERSION}`,
      fallback2: `./assets/characters/personagem-roxo/frame2-impulso.png?v=${ASSETS_VERSION}`,
      fallback3: `./assets/characters/personagem-roxo/frame3-voo.png?v=${ASSETS_VERSION}`,
    };
  }
  return {
    trail1: '#FFF0B3',
    trail2: '#FFD27F',
    trail3: '#FFB84D',
    trail4: '#FFA057',
    sparkle1: '#FFF0B3',
    sparkle2: '#FFD27F',
    sparkle3: '#FFB84D',
    ghostFilter: 'sepia(1) saturate(5)',
    fallback1: `./assets/characters/personagem-1-padrao/frame1-normal.png?v=${ASSETS_VERSION}`,
    fallback2: `./assets/characters/personagem-1-padrao/frame2-impulso.png?v=${ASSETS_VERSION}`,
    fallback3: `./assets/characters/personagem-1-padrao/frame3-voo.png?v=${ASSETS_VERSION}`,
  };
};

export const OrbitTimerAnimation: React.FC<OrbitTimerAnimationProps> = ({
  orbitAnimState,
  isActive,
  isPaused,
  settings,
  themeColor,
}) => {
  if (!settings || settings.enabled === false) return null;

  const isSpinning = orbitAnimState === 3 && (isActive || isPaused);
  const isPausedState = isPaused;
  const orbitTheme = getOrbitThemeConfig(themeColor);

  const isManualUpload = Boolean(settings && settings.isCustomUpload && settings.customImg1);
  const charF1 = isManualUpload ? settings.customImg1! : orbitTheme.fallback1;
  const charF2 = isManualUpload ? (settings.customImg2 || settings.customImg1!) : orbitTheme.fallback2;
  const charF3 = isManualUpload ? (settings.customImg3 || settings.customImg1!) : orbitTheme.fallback3;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ ['--orbit-speed' as string]: `${settings.speed || 8}s` }}
    >
      <svg
        className="orbit-svg pixelated"
        viewBox="0 0 340 340"
        style={{ width: '305px', height: '305px' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          className={`rotating-group ${isSpinning ? 'spinning' : ''} ${
            isPausedState ? 'paused' : ''
          }`}
        >
          {/* RASTRO E BRILHOS (Visíveis no Estado 3 quando ativado) */}
          <g
            style={{
              opacity: orbitAnimState === 3 && settings.showTrail !== false ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <g>
              <path
                className="trail-pulse"
                d="M 55.6 194.3 A 117 117 0 0 1 75.3 101.2"
                fill="none"
                stroke={orbitTheme.trail1}
                strokeWidth="6"
                strokeDasharray="10 4"
                opacity="0.65"
              />
              <path
                className="trail-pulse"
                d="M 71.2 107.4 A 117 117 0 0 1 124.3 62.3"
                fill="none"
                stroke={orbitTheme.trail2}
                strokeWidth="12"
                strokeDasharray="16 2"
                opacity="0.9"
              />
              <path
                d="M 119.5 64.5 A 117 117 0 0 1 170 53"
                fill="none"
                stroke={orbitTheme.trail3}
                strokeWidth="18"
              />
              <path
                d="M 95.0 82.0 A 117 117 0 0 1 168 53"
                fill="none"
                stroke={orbitTheme.trail4}
                strokeWidth="8"
                strokeDasharray="12 4"
              />
              <rect className="sparkle-move" x="54" y="180" width="6" height="6" fill={orbitTheme.sparkle1} />
              <rect className="sparkle-move d1" x="62" y="196" width="5" height="5" fill={orbitTheme.sparkle2} />
              <rect className="sparkle-move d2" x="58" y="155" width="7" height="7" fill={orbitTheme.sparkle3} />
            </g>

            <g>
              <g transform="translate(142, 55)">
                <g className="sparkle-move">
                  <rect x="3" y="0" width="3" height="9" fill="#FFFFFF" />
                  <rect x="0" y="3" width="9" height="3" fill="#FFFFFF" />
                </g>
              </g>
              <g transform="translate(106, 75)">
                <g className="sparkle-move d1">
                  <rect x="3" y="0" width="3" height="9" fill="#FFFFFF" />
                  <rect x="0" y="3" width="9" height="3" fill="#FFFFFF" />
                </g>
              </g>
              <g transform="translate(76, 115)">
                <g className="sparkle-move d2">
                  <rect x="2" y="0" width="2" height="6" fill="#FFFFFF" />
                  <rect x="0" y="2" width="6" height="2" fill="#FFFFFF" />
                </g>
              </g>
            </g>
          </g>

          {/* POSICIONADOR DA PERSONAGEM */}
          <g id="charPositioner" transform="translate(170, 53)">
            <g
              id="charWrapper"
              transform={`rotate(${settings.angle || 0}) scale(${settings.scale || 0.9})`}
            >
              <g className="flight-Physics smooth">
                {/* SPRITE 1: NORMAL / PARADA */}
                <g
                  className="sprite-frame"
                  style={{ display: orbitAnimState === 1 ? 'block' : 'none' }}
                >
                  <image
                    href={charF1}
                    x="-34"
                    y="-34"
                    width="68"
                    height="68"
                    className="pixelated"
                  />
                </g>

                {/* SPRITE 2: INDO AO CÍRCULO (IMPULSO / DECOLAGEM) */}
                <g
                  className="sprite-frame"
                  style={{ display: orbitAnimState === 2 ? 'block' : 'none' }}
                >
                  <image
                    href={charF2}
                    x="-36"
                    y="-34"
                    width="72"
                    height="68"
                    className="pixelated"
                  />
                </g>

                {/* SPRITE 3: VOO DO SUPERMAN GIRANDO NO CÍRCULO */}
                <g
                  className="sprite-frame"
                  style={{ display: orbitAnimState === 3 ? 'block' : 'none' }}
                >
                  <g>
                    <image
                      href={charF3}
                      x="-44"
                      y="-32"
                      width="74"
                      height="64"
                      className="pixelated"
                      style={{
                        opacity: 0.4,
                        filter: orbitTheme.ghostFilter,
                      }}
                    />
                    <image
                      href={charF3}
                      x="-34"
                      y="-34"
                      width="74"
                      height="64"
                      className="pixelated"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
