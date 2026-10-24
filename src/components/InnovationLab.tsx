import React from 'react';
import { InnovationLabCanvas } from './InnovationLabCanvas';
import { Cpu, ShieldCheck, Gauge, Compass } from 'lucide-react';

export const InnovationLab: React.FC = () => {
  return (
    <section id="innovation" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] text-[#F5F3EF] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Experimental Engineering
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              The Innovation Lab
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Where classical haute horlogerie meets aerospace material science. Test our interactive kinetic model in real-time below.
          </p>
        </div>

        {/* 2-Column Split: 3D Interactive Canvas & Engineering Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: 3D Interactive Astrolabe Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <InnovationLabCanvas />
          </div>

          {/* Right: Technical Storytelling & Live Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#0D0D0D] p-8 rounded-xl border border-neutral-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#D6B477] block mb-2">
                Atelier Research Project
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Harmonic Kinetic Astrolabe
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-6">
                Engineered from 18-karat honey gold alloy and aerospace-grade sapphire crystal. The dual-axis concentric gimbal isolates sidereal time measurement against gravitational torque, ensuring chronometric perfection regardless of attitude.
              </p>
            </div>

            {/* Technical Sub-systems */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#141414] border border-neutral-800 flex items-start gap-4">
                <div className="p-2 rounded bg-neutral-900 text-[#D6B477] shrink-0">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">Tri-Axial Inertia Balance</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    Micro-machined titanium balance wheel operating at 36,000 vibrations per hour with variable inertia screws.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#141414] border border-neutral-800 flex items-start gap-4">
                <div className="p-2 rounded bg-neutral-900 text-[#D6B477] shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">Cryogenic Metrology</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    Zero thermal coefficient escapement calibrated between -40°C and +85°C for high-altitude aeronautica.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#141414] border border-neutral-800 flex items-start gap-4">
                <div className="p-2 rounded bg-neutral-900 text-[#D6B477] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">Sovereign Physical Encapsulation</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    Laser-welded sapphire monobloc casing providing water resistance to 300 meters and magnetic immunity to 15,000 Gauss.
                  </p>
                </div>
              </div>
            </div>

            {/* Status footer */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span className="text-[11px] uppercase tracking-wider">Status: Patent Active</span>
              <span className="font-mono text-[#D6B477] tabular-nums">AX-PATENT-2026.04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
