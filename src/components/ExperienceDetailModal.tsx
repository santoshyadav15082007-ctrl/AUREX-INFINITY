import React, { useEffect } from 'react';
import { SignatureExperience, CollectionItem } from '../types';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface ExperienceDetailModalProps {
  item: SignatureExperience | CollectionItem | null;
  onClose: () => void;
  onInquire: (itemName: string) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  item,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isExperience = 'curatorNotes' in item;
  const title = 'title' in item ? item.title : item.name;
  const image = item.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0E0E0E] border border-[#D6B477]/30 rounded-2xl shadow-2xl text-[#F5F3EF] flex flex-col scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Media Preview */}
        <div className="relative aspect-[16/9] w-full bg-neutral-950 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-2">
              {item.category}
            </span>
            <h2 id="modal-title" className="font-display text-2xl sm:text-4xl font-bold text-white">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Detailed Narrative */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              Dossier Summary
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {isExperience ? item.curatorNotes : item.description}
            </p>
          </div>

          {/* Conditional Features or Specifications */}
          {isExperience ? (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Curated Privileges & Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141414] border border-neutral-800 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-[#D6B477] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Certified Engineering Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.specifications.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#141414] border border-neutral-800 text-xs">
                    <span className="text-neutral-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Call to Action */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#D6B477]" />
              <span>Priority Allocation via Sovereign Concierge Desk</span>
            </div>

            <button
              onClick={() => {
                onInquire(title);
                onClose();
              }}
              className="px-6 py-3 bg-[#D6B477] hover:bg-[#F2E3C6] text-black text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Initiate Allocation Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
