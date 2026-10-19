import React, { useRef } from 'react';

export interface OrbitSettings {
  enabled: boolean;
  speed: number;
  scale: number;
  angle: number;
  showTrail: boolean;
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
}

export const OrbitTimerAnimation: React.FC<OrbitTimerAnimationProps> = ({
  orbitAnimState,
  isActive,
  isPaused,
  settings,
}) => {
  if (!settings || settings.enabled === false) return null;

  const isSpinning = orbitAnimState === 3 && (isActive || isPaused);
  const isPausedState = isPaused;

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
                stroke="#FFF0B3"
                strokeWidth="6"
                strokeDasharray="10 4"
                opacity="0.65"
              />
              <path
                className="trail-pulse"
                d="M 71.2 107.4 A 117 117 0 0 1 124.3 62.3"
                fill="none"
                stroke="#FFD27F"
                strokeWidth="12"
                strokeDasharray="16 2"
                opacity="0.9"
              />
              <path
                d="M 119.5 64.5 A 117 117 0 0 1 170 53"
                fill="none"
                stroke="#FFB84D"
                strokeWidth="18"
              />
              <path
                d="M 95.0 82.0 A 117 117 0 0 1 168 53"
                fill="none"
                stroke="#FFA057"
                strokeWidth="8"
                strokeDasharray="12 4"
              />
              <rect className="sparkle-move" x="54" y="180" width="6" height="6" fill="#FFF0B3" />
              <rect className="sparkle-move d1" x="62" y="196" width="5" height="5" fill="#FFD27F" />
              <rect className="sparkle-move d2" x="58" y="155" width="7" height="7" fill="#FFB84D" />
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
                  {settings.customImg1 ? (
                    <image
                      href={settings.customImg1}
                      x="-34"
                      y="-34"
                      width="68"
                      height="68"
                      className="pixelated"
                    />
                  ) : (
                    <g className="fallback-group" transform="translate(-28, -28) scale(3.5)">
                      <path d="M1 2h4v4H1zM11 2h4v4h-4z" fill="#6e4e43" />
                      <path d="M4 3h8v7H4z" fill="#e6c3a1" />
                      <path d="M4 2h8v2H4zM3 4h1v5H3zM12 4h1v5h-1zM4 10h8v1H4z" fill="#231123" />
                      <rect x="4" y="5" width="3" height="4" fill="#131626" />
                      <rect x="9" y="5" width="3" height="4" fill="#131626" />
                      <rect x="5" y="6" width="1" height="1" fill="#ffffff" />
                      <rect x="10" y="6" width="1" height="1" fill="#ffffff" />
                      <rect x="6" y="11" width="4" height="2" fill="#e5b55f" />
                      <rect x="4" y="11" width="2" height="2" fill="#e6c3a1" />
                      <rect x="10" y="11" width="2" height="2" fill="#e6c3a1" />
                      <rect x="6" y="13" width="4" height="2" fill="#231123" />
                    </g>
                  )}
                </g>

                {/* SPRITE 2: INDO AO CÍRCULO (IMPULSO / DECOLAGEM) */}
                <g
                  className="sprite-frame"
                  style={{ display: orbitAnimState === 2 ? 'block' : 'none' }}
                >
                  {settings.customImg2 ? (
                    <image
                      href={settings.customImg2}
                      x="-36"
                      y="-34"
                      width="72"
                      height="68"
                      className="pixelated"
                    />
                  ) : (
                    <g
                      className="fallback-group"
                      transform="translate(-28, -28) rotate(25 8 8) scale(3.5)"
                    >
                      <path d="M0 3h4v4H0zM10 1h4v4h-4z" fill="#6e4e43" />
                      <path d="M4 3h8v7H4z" fill="#e6c3a1" />
                      <path d="M4 2h8v2H4zM4 10h8v1H4z" fill="#231123" />
                      <rect x="5" y="5" width="3" height="4" fill="#131626" />
                      <rect x="10" y="5" width="3" height="4" fill="#131626" />
                      <rect x="6" y="5" width="1" height="1" fill="#ffffff" />
                      <rect x="11" y="5" width="1" height="1" fill="#ffffff" />
                      <rect x="5" y="11" width="4" height="2" fill="#e5b55f" />
                      <rect x="9" y="10" width="3" height="2" fill="#e6c3a1" />
                      <rect x="4" y="13" width="3" height="2" fill="#231123" />
                    </g>
                  )}
                </g>

                {/* SPRITE 3: VOO DO SUPERMAN GIRANDO NO CÍRCULO */}
                <g
                  className="sprite-frame"
                  style={{ display: orbitAnimState === 3 ? 'block' : 'none' }}
                >
                  {settings.customImg3 ? (
                    <g>
                      <image
                        href={settings.customImg3}
                        x="-44"
                        y="-32"
                        width="74"
                        height="64"
                        className="pixelated"
                        style={{ opacity: 0.4, filter: 'sepia(1) saturate(5)' }}
                      />
                      <image
                        href={settings.customImg3}
                        x="-34"
                        y="-34"
                        width="74"
                        height="64"
                        className="pixelated"
                      />
                    </g>
                  ) : (
                    <g className="fallback-group" transform="translate(-32, -26) scale(3.5)">
                      <rect x="1" y="8" width="3" height="2" fill="#ffffff" />
                      <rect x="3" y="8" width="3" height="3" fill="#231123" />
                      <rect x="5" y="7" width="4" height="3" fill="#e5b55f" />
                      <path d="M3 1h4v4H3zM11 0h4v4h-4z" fill="#6e4e43" />
                      <path d="M7 3h8v7H7z" fill="#e6c3a1" />
                      <path d="M7 2h8v2H7zM6 4h1v5H6zM15 4h1v5h-1zM7 10h8v1H7z" fill="#231123" />
                      <rect x="9" y="5" width="3" height="4" fill="#131626" />
                      <rect x="13" y="5" width="3" height="4" fill="#131626" />
                      <rect x="10" y="6" width="1" height="1" fill="#ffffff" />
                      <rect x="14" y="6" width="1" height="1" fill="#ffffff" />
                      <rect x="14" y="9" width="4" height="2" fill="#e6c3a1" />
                      <rect x="14" y="8" width="4" height="1" fill="#231123" />
                    </g>
                  )}
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
