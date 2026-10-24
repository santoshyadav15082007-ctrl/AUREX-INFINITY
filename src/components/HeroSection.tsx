import React from 'react';
import { ArrowDown, Compass, Shield } from 'lucide-react';
import { HeroThreeCanvas } from './HeroThreeCanvas';

interface HeroSectionProps {
  theme?: string;
  onExploreClick: () => void;
  onDiscoverClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme = 'solaris-gold',
  onExploreClick,
  onDiscoverClick,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 pt-32 pb-12 overflow-hidden bg-[#070707]">
      {/* Three.js Interactive 3D Golden Torus / Sculpture Background */}
      <HeroThreeCanvas theme={theme} />

      {/* Ambient Radial Vignette & Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(214,180,119,0.06)_0%,rgba(7,7,7,0.85)_75%,#070707_100%)] z-1" />

      {/* Top Subtle Brand Seal */}
      <div className="relative z-10 text-center max-w-xl mx-auto pt-4">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#D6B477]/80">
          <span>Private Client Atelier</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Est. Geneva MMXXIV</span>
        </div>
      </div>

      {/* Hero Headline & Value Proposition */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto px-4 flex flex-col items-center">
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.06em] leading-[1.12] text-[#F5F3EF] mb-6 text-balance">
          Beyond Luxury. <br className="hidden sm:inline" />
          <span className="text-gold-gradient font-serif italic font-normal">Beyond Limits.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide text-balance">
          A new dimension of extraordinary digital experiences, bespoke sovereign acquisitions, and transcendent physical artifacts.
        </p>

        {/* Dual Primary CTA Action Buttons with Magnetic Feel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#D6B477] hover:bg-[#F2E3C6] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded transition-all duration-300 shadow-xl shadow-[#D6B477]/15 hover:shadow-2xl hover:shadow-[#D6B477]/30 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore Experience</span>
          </button>

          <button
            onClick={onDiscoverClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-[#F5F3EF] hover:text-[#D6B477] border border-[#D6B477]/30 hover:border-[#D6B477] font-medium text-xs tracking-[0.2em] uppercase rounded transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#D6B477]" />
            <span>Discover More</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Trust Marker Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D6B477]" />
          <span className="tracking-widest uppercase text-[11px] text-neutral-300">
            Sovereign Concierge Live Allocation
          </span>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#philosophy"
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-400 hover:text-[#D6B477] transition-colors group cursor-pointer"
          aria-label="Scroll to Philosophy section"
        >
          <span>Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center p-1 group-hover:border-[#D6B477] transition-colors">
            <div className="w-1 h-2 bg-[#D6B477] rounded-full animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px] tracking-wider">
          <span>Geneva</span>
          <span aria-hidden="true">·</span>
          <span>Monaco</span>
          <span aria-hidden="true">·</span>
          <span>London</span>
          <span aria-hidden="true">·</span>
          <span>Tokyo</span>
        </div>
      </div>
    </section>
  );
};
