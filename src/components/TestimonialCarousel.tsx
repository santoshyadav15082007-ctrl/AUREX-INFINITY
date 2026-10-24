import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/luxuryData';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-[#0A0A0A] text-[#F5F3EF] border-t border-neutral-900 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-2">
              Patron Chronicles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Private Accolades
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-light">
            Verified sample testimonials from private commissions
          </span>
        </div>

        {/* Carousel Slide Card */}
        <div className="relative bg-[#111111] border border-neutral-800 rounded-2xl p-8 sm:p-14 shadow-2xl">
          <Quote className="w-12 h-12 text-[#D6B477]/25 mb-8" />

          {/* Testimonial Quote */}
          <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-neutral-100 leading-relaxed mb-10 min-h-[140px] flex items-center">
            "{current.quote}"
          </blockquote>

          {/* Patron Identification & Attribution */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-neutral-800">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                {current.clientName}
              </h3>
              <p className="text-xs sm:text-sm text-[#D6B477] font-medium">
                {current.title} · {current.location}
              </p>
              <div className="text-xs text-neutral-400 mt-1">
                Commission: {current.acquisitionType} ({current.year})
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Auto-Advance' : 'Resume Auto-Advance'}
                aria-label={isPlaying ? 'Pause Auto-Advance' : 'Resume Auto-Advance'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === i ? 'w-6 bg-[#D6B477]' : 'w-1.5 bg-neutral-700'
                    }`}
                    aria-label={`Jump to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
