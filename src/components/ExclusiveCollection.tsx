import React, { useState } from 'react';
import { EXCLUSIVE_COLLECTION } from '../data/luxuryData';
import { CollectionItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ExclusiveCollectionProps {
  onSelectItem: (item: CollectionItem) => void;
}

export const ExclusiveCollection: React.FC<ExclusiveCollectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'horlogerie' | 'aeronautica' | 'nautical' | 'estates'>('all');

  const categories = [
    { id: 'all', label: 'Complete Portfolio' },
    { id: 'horlogerie', label: 'Haute Horlogerie' },
    { id: 'aeronautica', label: 'Supersonic Aeronautica' },
    { id: 'nautical', label: 'Naval Flagships' },
    { id: 'estates', label: 'Sovereign Estates' },
  ];

  const filteredItems = activeCategory === 'all'
    ? EXCLUSIVE_COLLECTION
    : EXCLUSIVE_COLLECTION.filter((item) => item.category === activeCategory);

  return (
    <section id="collection" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#0A0A0A] text-[#F5F3EF] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Curated Acquisitions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              The Exclusive Collection
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Tangible masterpieces produced in strictly limited editions. Every commission is recorded in the immutable Aurex Sovereign Ledger.
          </p>
        </div>

        {/* Functional Category Filter Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#D6B477] text-black font-semibold shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Collection Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-[#111111] border border-neutral-800 hover:border-[#D6B477]/40 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] overflow-hidden bg-neutral-950 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 text-[11px] font-display text-neutral-300 tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  {item.edition}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#D6B477] transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro specs teaser */}
                <div className="space-y-1.5 py-4 border-t border-neutral-800/80 text-xs text-neutral-400">
                  {item.specifications.slice(0, 2).map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between">
                      <span className="text-neutral-400 font-light">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[#D6B477] font-medium text-[11px] tracking-wider uppercase">
                    {item.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white group-hover:text-[#D6B477] font-medium">
                    <span>Inspect Details</span>
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
