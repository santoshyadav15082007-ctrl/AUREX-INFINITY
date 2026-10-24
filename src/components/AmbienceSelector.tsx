import React from 'react';
import { AmbienceTheme } from '../types';
import { Sun, Moon, Sparkles, Check } from 'lucide-react';

interface AmbienceSelectorProps {
  currentTheme: AmbienceTheme;
  onThemeChange: (theme: AmbienceTheme) => void;
}

export const AmbienceSelector: React.FC<AmbienceSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: {
    id: AmbienceTheme;
    title: string;
    description: string;
    accentColor: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'solaris-gold',
      title: 'Solaris Gold',
      description: 'Opulent champagne gold warmth inspired by twilight over Mediterranean yachting harbours.',
      accentColor: '#D6B477',
      icon: <Sun className="w-4 h-4 text-[#D6B477]" />,
    },
    {
      id: 'midnight-obsidian',
      title: 'Midnight Obsidian',
      description: 'Ultra-stealth deep charcoal and carbon tones engineered for covert nocturnal discretion.',
      accentColor: '#A3A3A3',
      icon: <Moon className="w-4 h-4 text-neutral-300" />,
    },
    {
      id: 'platinum-aurora',
      title: 'Platinum Aurora',
      description: 'Crystalline iced platinum and aerospace titanium reflections reminiscent of suborbital horizons.',
      accentColor: '#E2E8F0',
      icon: <Sparkles className="w-4 h-4 text-blue-200" />,
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-[#080808] text-[#F5F3EF] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Sensory Orchestration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              The Interactive Ambience
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Select your preferred visual atmosphere. The digital architecture, 3D kinetic lighting, and ambient radiance will calibrate in real-time.
          </p>
        </div>

        {/* 3 Interactive Atmosphere Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`p-8 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-[#141414] border-[#D6B477] shadow-xl shadow-[#D6B477]/10'
                    : 'bg-[#0E0E0E] border-neutral-800 hover:border-neutral-700 hover:bg-[#121212]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                      {t.icon}
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-1.5 text-xs text-[#D6B477] font-medium tracking-wider uppercase">
                        <Check className="w-4 h-4" />
                        <span>Active Ambience</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">Atmosphere Filter</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: t.accentColor }}
                    />
                    <span className="text-neutral-300 text-xs">{isSelected ? 'Calibrated' : 'Calibrate'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
