import React, { useEffect, useState, useRef } from 'react';
import { DEMO_METRICS } from '../data/luxuryData';
import { Info } from 'lucide-react';

export const MetricsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 sm:px-12 bg-[#070707] text-[#F5F3EF] border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with clear demo notice badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-1">
              Curated Scope
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              The Horizon in Numbers
            </h2>
          </div>

          {/* Transparent demo data notice adhering to prompt instruction */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900/80 border border-neutral-800 rounded text-xs text-neutral-400">
            <Info className="w-3.5 h-3.5 text-[#D6B477]" />
            <span>Illustrative sample metrics for concept demonstration</span>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {DEMO_METRICS.map((metric) => (
            <div key={metric.id} className="flex flex-col space-y-2">
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight tabular-nums flex items-baseline">
                {metric.prefix && <span className="text-[#D6B477]">{metric.prefix}</span>}
                <span>{isVisible ? metric.value : 0}</span>
                {metric.suffix && <span className="text-[#D6B477] text-3xl sm:text-4xl">{metric.suffix}</span>}
              </div>

              <h3 className="font-display text-base font-semibold text-neutral-200 tracking-wide pt-2">
                {metric.label}
              </h3>

              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
