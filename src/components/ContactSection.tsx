import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { ShieldCheck, Send, CheckCircle2, AlertCircle, RefreshCw, Lock } from 'lucide-react';

interface ContactSectionProps {
  initialAssetInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialAssetInterest }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    assetInterest: initialAssetInterest || 'Bespoke Atelier Commission',
    timeframe: 'Strategic Allocation (3–6 Months)',
    confidentialNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full legal or representative name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid confidential correspondence email.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      newErrors.phone = 'Please provide a direct contact or diplomatic office telephone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury concierge dispatch with deliberate latency
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `AX-SOV-${Math.floor(1000 + Math.random() * 9000)}-CH`;
      setSubmittedRef(generatedRef);
    }, 1200);
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      assetInterest: 'Bespoke Atelier Commission',
      timeframe: 'Strategic Allocation (3–6 Months)',
      confidentialNotes: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#070707] text-[#F5F3EF] border-t border-neutral-900 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium block mb-3">
              Private Liaison
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-xl text-balance">
              Initiate Sovereign Inquiry
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Lock className="w-3.5 h-3.5 text-[#D6B477]" />
              <span>Confidential Encrypted Protocol</span>
            </div>
            <span>Geneva Desk: +41 22 819 00 00</span>
          </div>
        </div>

        {/* Demo Mode Notice Banner as mandated */}
        <div className="mb-8 p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-lg flex items-center gap-3 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-[#D6B477] shrink-0" />
          <p>
            <strong className="text-neutral-200">Concept Verification Notice:</strong> This inquiry conduit operates in simulated sandbox mode. Submissions generate a certified local dossier reference without transmitting private data to remote third-party systems.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#111111] border border-neutral-800 rounded-xl p-8 sm:p-12 shadow-2xl">
          {submittedRef ? (
            /* Success State */
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#D6B477]/10 border border-[#D6B477] flex items-center justify-center text-[#D6B477] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-[#D6B477] font-medium mb-2">
                Dossier Lodged Successfully
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Inquiry Reference: <span className="font-mono text-[#D6B477]">{submittedRef}</span>
              </h3>

              <p className="text-sm text-neutral-300 max-w-lg font-light leading-relaxed mb-8">
                Your bespoke inquiry regarding <strong className="text-white">{formData.assetInterest}</strong> has been registered with the Geneva Senior Partner Desk. A confidential client director will initiate contact with <strong className="text-white">{formData.email}</strong> within four business hours.
              </p>

              <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 text-xs text-neutral-400 max-w-md w-full mb-8 text-left space-y-1">
                <div><span className="text-neutral-500">Representative:</span> {formData.fullName}</div>
                <div><span className="text-neutral-500">Asset Interest:</span> {formData.assetInterest}</div>
                <div><span className="text-neutral-500">Target Horizon:</span> {formData.timeframe}</div>
                <div><span className="text-neutral-500">Encrypted Hash:</span> SHA-256 Verified</div>
              </div>

              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider rounded border border-neutral-700 hover:border-[#D6B477] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Dossier</span>
              </button>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Principal or Legal Representative *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Alistair Sterling / Trust Officer"
                    className={`w-full px-4 py-3 bg-[#090909] border rounded text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#D6B477]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Confidential Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="liaison@sovereigncapital.ch"
                    className={`w-full px-4 py-3 bg-[#090909] border rounded text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#D6B477]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Telephone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Secure Telephone / Signal *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 22 000 0000"
                    className={`w-full px-4 py-3 bg-[#090909] border rounded text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#D6B477]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Asset Interest */}
                <div>
                  <label htmlFor="assetInterest" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    Primary Realm of Interest
                  </label>
                  <select
                    id="assetInterest"
                    value={formData.assetInterest}
                    onChange={(e) => setFormData({ ...formData, assetInterest: e.target.value })}
                    className="w-full px-4 py-3 bg-[#090909] border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D6B477] transition-colors"
                  >
                    <option value="Haute Horlogerie Commission">Haute Horlogerie Celestial Commission</option>
                    <option value="Supersonic Aeronautica Build Slot">Supersonic Aeronautica Build Slot</option>
                    <option value="Naval Flagship Explorer Superyacht">Naval Flagship Explorer Superyacht</option>
                    <option value="Sovereign Cliffside Estate Acquisition">Sovereign Cliffside Estate Acquisition</option>
                    <option value="Private Orbital Flight Residency">Private Orbital Flight Residency</option>
                    <option value="The Obsidian Key Membership">The Obsidian Key Membership</option>
                    <option value="The Aurex Sovereign Membership">The Aurex Sovereign Membership</option>
                    <option value="The Infinity Crest Council">The Infinity Crest Council</option>
                  </select>
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label htmlFor="timeframe" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  Acquisition Horizon
                </label>
                <select
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full px-4 py-3 bg-[#090909] border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D6B477] transition-colors"
                >
                  <option value="Immediate Commission (Within 30 Days)">Immediate Commission (Within 30 Days)</option>
                  <option value="Strategic Allocation (3–6 Months)">Strategic Allocation (3–6 Months)</option>
                  <option value="Multi-Year Syndicate Planning">Multi-Year Syndicate Planning</option>
                </select>
              </div>

              {/* Confidential Notes */}
              <div>
                <label htmlFor="notes" className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  Confidential Particulars / Bespoke Specifications
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={formData.confidentialNotes}
                  onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                  placeholder="Detail any bespoke customization, sovereign port requirements, or privacy stipulations..."
                  className="w-full px-4 py-3 bg-[#090909] border border-neutral-800 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D6B477] transition-colors resize-none"
                />
              </div>

              {/* Submission Action */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Protected under strict Swiss banking-grade nondisclosure standards.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#D6B477] hover:bg-[#F2E3C6] disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-semibold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-lg shadow-[#D6B477]/15 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Private Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
