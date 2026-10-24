import React from 'react';
import { SIGNATURE_EXPERIENCES } from '../data/luxuryData';
import { SignatureExperience } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface SignatureExperiencesProps {
  onSelectExperience: (exp: SignatureExperience) => void;
}

export const SignatureExperiences: React.FC<SignatureExperiencesProps> = ({ onSelectExperience }) => {
  return (
    <section id="experiences" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#0A0A0A] text-[#F5F3EF] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Unrivaled Realms
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              Signature Experiences
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Six singular journeys curated exclusively for Aurex Infinity patrons. Each expedition represents the pinnacle of private access and uncompromised discretion.
          </p>
        </div>

        {/* 6 Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="group relative flex flex-col justify-between bg-[#111111] border border-neutral-800 hover:border-[#D6B477]/40 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Media Container with Image Zoom on Hover */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                
                {/* Index identifier */}
                <div className="absolute top-4 left-4 text-xs font-display text-white/80 tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  EXP · 0{index + 1}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed metadata per Zero-Pill Discipline */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="text-[#D6B477] font-medium">{exp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.availability}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#D6B477] transition-colors mb-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 font-light leading-relaxed mb-6">
                    {exp.curatorNotes}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                    {exp.allocation}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#D6B477] group-hover:translate-x-0.5 transition-transform font-medium">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
