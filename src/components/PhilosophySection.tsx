import React from 'react';
import { PHILOSOPHY_PILLARS } from '../data/luxuryData';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] text-[#F5F3EF] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Minimal Editorial Kicker and Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              The Architecture of Exclusivity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              The Philosophy Behind Aurex Infinity
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            We exist at the confluence of ancient craftsmanship and celestial engineering—curating experiences that cannot be booked, only bestowed.
          </p>
        </div>

        {/* 2-Column Editorial Grid: Visual Statement & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Atmospheric Editorial Vessel Image */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-lg border border-neutral-800">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/hero_luxury_vessel_1792820171701.jpg"
                alt="Aurex oceanic flagship cruiser navigating calm twilight waters"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Subtle Gradient Scrim & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-[11px] uppercase tracking-widest text-[#D6B477]">
                Kinetic Commission 01
              </span>
              <p className="font-serif italic text-lg text-white mt-1">
                "Silence is the ultimate luxury on open water."
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div>
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-neutral-200 leading-snug border-l border-[#D6B477]/40 pl-6 mb-12">
                "True exclusivity does not seek validation from the masses. It exists as an unbroken bond between visionary patrons and the artisans who shape eternity."
              </blockquote>
              <div className="text-xs uppercase tracking-widest text-neutral-400 pl-6">
                Aurex Sovereign Council · Geneva Manifesto
              </div>
            </div>

            {/* 3 Editorial Numbered Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-neutral-800">
              {PHILOSOPHY_PILLARS.map((pillar, idx) => (
                <div key={pillar.title} className="flex flex-col space-y-3">
                  <span className="font-display text-sm text-[#D6B477] font-semibold tracking-widest">
                    0{idx + 1}.
                  </span>
                  <h3 className="font-display text-base font-semibold text-white tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {pillar.statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Proof Badges Strip */}
        <div className="p-8 rounded-lg bg-[#0E0E0E] border border-neutral-800/80 flex flex-wrap items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D6B477]" />
            <div>
              <div className="text-white font-medium">Bespoke Sovereign Custody</div>
              <div className="text-neutral-400 text-[11px]">Vaulted physical assets authenticated by Swiss gemological guilds</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D6B477]" />
            <div>
              <div className="text-white font-medium">Private Aerodynamic Atelier</div>
              <div className="text-neutral-400 text-[11px]">Certified civilian supersonic delivery allocations</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#D6B477]" />
            <div>
              <div className="text-white font-medium">Invitation-Only Guild</div>
              <div className="text-neutral-400 text-[11px]">Strict annual patron quota capped at 100 sovereign members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
