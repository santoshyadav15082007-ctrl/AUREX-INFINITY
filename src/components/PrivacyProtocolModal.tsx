import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PrivacyProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyProtocolModal: React.FC<PrivacyProtocolModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-protocol-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0E0E0E] border border-neutral-800 rounded-xl p-8 sm:p-10 text-[#F5F3EF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close protocol modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#D6B477]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#D6B477] font-medium block">
              Geneva Sovereign Registry
            </span>
            <h2 id="privacy-protocol-title" className="font-display text-xl font-bold text-white">
              Sovereignty & Nondisclosure Protocol
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D6B477]" />
              1. Discretion by Architecture
            </h3>
            <p className="text-neutral-400">
              Aurex Infinity operates on the principle of sovereign zero-knowledge. Communications initiated through our private desks are encrypted using post-quantum cryptographic primitives, and physical commission records are housed exclusively in Swiss sovereign archives.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D6B477]" />
              2. Private Client Asset Custody
            </h3>
            <p className="text-neutral-400">
              All physical deliveries—whether limited-run mechanical tourbillons, naval flagship builds, or supersonic aeronautica flight agreements—are executed through bilateral fiduciary escrow structures, shielding our patrons from public registries.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D6B477]" />
              3. Concept Demonstration Statement
            </h3>
            <p className="text-neutral-400">
              This interactive digital web experience is created as an ultra-luxury digital showcase and architectural concept. Metrics, prices, and membership tiers shown throughout this application are curated illustrative demonstration assets.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#D6B477] hover:bg-[#F2E3C6] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Acknowledge Charter
          </button>
        </div>
      </div>
    </div>
  );
};
