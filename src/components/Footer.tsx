import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail.trim())) {
      setError('Please enter a valid confidential email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#050505] text-[#F5F3EF] border-t border-neutral-900 pt-20 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Wordmark & Newsletter Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white block">
              AUREX INFINITY
            </span>
            <p className="font-serif italic text-lg text-neutral-300 max-w-md">
              "Beyond Luxury. Beyond Limits. Designed for perpetuity."
            </p>
            <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
              Geneva · London · Monaco · Zurich · Tokyo · Dubai
            </p>
          </div>

          {/* Newsletter / Gazette Subscription */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D6B477] font-medium block mb-2">
              The Sovereign Gazette
            </span>
            <p className="text-xs text-neutral-400 font-light mb-4">
              Receive confidential quarterly monographs documenting privately declassified acquisitions and horological innovations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-neutral-900/90 border border-[#D6B477]/40 rounded text-xs text-[#D6B477]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your private dispatch subscription has been confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter confidential dispatch email"
                    className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6B477]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D6B477] hover:bg-[#F2E3C6] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Navigation Links & Realms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-neutral-900 text-xs">
          <div>
            <h4 className="uppercase tracking-widest text-neutral-300 font-semibold mb-4 text-[11px]">
              The Portfolio
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><a href="#experiences" className="hover:text-[#D6B477] transition-colors">Haute Horlogerie</a></li>
              <li><a href="#experiences" className="hover:text-[#D6B477] transition-colors">Supersonic Aeronautica</a></li>
              <li><a href="#experiences" className="hover:text-[#D6B477] transition-colors">Naval Flagships</a></li>
              <li><a href="#experiences" className="hover:text-[#D6B477] transition-colors">Sovereign Cliffside Estates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-neutral-300 font-semibold mb-4 text-[11px]">
              The Guild
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><a href="#philosophy" className="hover:text-[#D6B477] transition-colors">Geneva Manifesto</a></li>
              <li><a href="#innovation" className="hover:text-[#D6B477] transition-colors">Innovation Lab</a></li>
              <li><a href="#membership" className="hover:text-[#D6B477] transition-colors">Membership Privileges</a></li>
              <li><a href="#philosophy" className="hover:text-[#D6B477] transition-colors">Craftsmanship Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-neutral-300 font-semibold mb-4 text-[11px]">
              Private Desks
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><span className="text-white">Geneva:</span> +41 22 819 00 00</li>
              <li><span className="text-white">Mayfair:</span> +44 20 7946 0991</li>
              <li><span className="text-white">Monaco:</span> +377 98 06 20 00</li>
              <li><span className="text-white">Zurich:</span> +41 44 226 70 00</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-neutral-300 font-semibold mb-4 text-[11px]">
              Governance
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-[#D6B477] transition-colors cursor-pointer text-left"
                >
                  Sovereignty & Privacy Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-[#D6B477] transition-colors cursor-pointer text-left"
                >
                  Swiss Banking Standard Custody
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-[#D6B477] transition-colors cursor-pointer text-left"
                >
                  Bespoke Nondisclosure Charter
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <p>© {new Date().getFullYear()} AUREX INFINITY S.A. All rights reserved. Registered in the Canton of Geneva, Switzerland.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Concept Digital Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Non-Commercial Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
