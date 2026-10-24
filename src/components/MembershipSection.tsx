import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from '../data/luxuryData';
import { MembershipTier } from '../types';
import { Check, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface MembershipSectionProps {
  onApplyTier: (tierName: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onApplyTier }) => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="membership" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] text-[#F5F3EF] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Privileged Guild
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              Membership & Privileges
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-xs uppercase tracking-wider text-[#D6B477] hover:text-[#F2E3C6] underline underline-offset-4 cursor-pointer font-medium"
            >
              {showComparison ? 'Close Privilege Matrix' : 'View Full Privilege Matrix'}
            </button>
            <span className="text-xs text-neutral-400">
              Sample pricing and tier models for concept demonstration
            </span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-xl transition-all duration-300 ${
                tier.recommended
                  ? 'bg-[#121212] border-2 border-[#D6B477] shadow-2xl shadow-[#D6B477]/15 lg:-translate-y-2'
                  : 'bg-[#0E0E0E] border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D6B477] text-black font-semibold text-[10px] tracking-[0.2em] uppercase rounded-full">
                  Atelier Recommendation
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#D6B477] font-medium">
                    {tier.tierLevel}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#D6B477]" />
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light mb-6">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="py-6 border-y border-neutral-800 mb-8">
                  <div className="font-display text-4xl font-bold text-white tracking-tight tabular-nums">
                    {tier.annualDues}
                    <span className="text-xs font-normal text-neutral-400 font-sans tracking-normal ml-2">
                      / annual
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 font-light">
                    {tier.initiation}
                  </div>
                </div>

                {/* Privileges Checklist */}
                <ul className="space-y-3.5 mb-10 text-xs sm:text-sm text-neutral-300">
                  {tier.privileges.map((privilege, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#D6B477] shrink-0 mt-0.5" />
                      <span className="font-light leading-relaxed">{privilege}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onApplyTier(tier.name)}
                className={`w-full py-3.5 rounded text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  tier.recommended
                    ? 'bg-[#D6B477] hover:bg-[#F2E3C6] text-black shadow-lg shadow-[#D6B477]/20'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-[#D6B477]'
                }`}
              >
                <span>Request Candidacy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Full Comparison Matrix Drawer */}
        {showComparison && (
          <div className="p-8 rounded-xl bg-[#0F0F0F] border border-neutral-800 overflow-x-auto transition-all duration-300 mb-12">
            <h4 className="font-display text-xl font-bold text-white mb-6">
              Sovereign Privilege Matrix Comparison
            </h4>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-medium">Privilege Class</th>
                  <th className="py-3 px-4 font-medium">The Obsidian Key</th>
                  <th className="py-3 px-4 font-medium text-[#D6B477]">The Aurex Sovereign</th>
                  <th className="py-3 px-4 font-medium">The Infinity Crest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Aeronautica Build Slots</td>
                  <td className="py-3 px-4 text-neutral-400">Waitlist Only</td>
                  <td className="py-3 px-4 text-[#D6B477]">Guaranteed Allocation</td>
                  <td className="py-3 px-4">Instant Sovereign Command</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Suborbital Orbital Expeditions</td>
                  <td className="py-3 px-4 text-neutral-400">Subject to Capacity</td>
                  <td className="py-3 px-4 text-[#D6B477]">Priority Window</td>
                  <td className="py-3 px-4">Direct Council Cabin</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Bespoke Horlogerie Atelier</td>
                  <td className="py-3 px-4 text-neutral-400">Catalog Previews</td>
                  <td className="py-3 px-4 text-[#D6B477]">Unique Piece Collaboration</td>
                  <td className="py-3 px-4">Master Watchmaker On-Demand</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Private Island Access</td>
                  <td className="py-3 px-4 text-neutral-400">Seasonal Charter</td>
                  <td className="py-3 px-4 text-[#D6B477]">Dedicated Residency</td>
                  <td className="py-3 px-4">Full Sovereignty Leasehold</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Biometric Vault Custody</td>
                  <td className="py-3 px-4">1 Vault Location</td>
                  <td className="py-3 px-4 text-[#D6B477]">Global Multilateral Vaults</td>
                  <td className="py-3 px-4">Sovereign Deep Storage</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
