/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbienceTheme, SignatureExperience, CollectionItem } from './types';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { SignatureExperiences } from './components/SignatureExperiences';
import { InnovationLab } from './components/InnovationLab';
import { ExclusiveCollection } from './components/ExclusiveCollection';
import { AmbienceSelector } from './components/AmbienceSelector';
import { MetricsSection } from './components/MetricsSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { MembershipSection } from './components/MembershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { PrivacyProtocolModal } from './components/PrivacyProtocolModal';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<AmbienceTheme>('solaris-gold');
  const [selectedItem, setSelectedItem] = useState<SignatureExperience | CollectionItem | null>(null);
  const [prefilledAsset, setPrefilledAsset] = useState<string>('Bespoke Atelier Commission');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromModal = (itemName: string) => {
    setPrefilledAsset(itemName);
    scrollToSection('contact');
  };

  const handleApplyMembership = (tierName: string) => {
    setPrefilledAsset(`${tierName} Membership`);
    scrollToSection('contact');
  };

  return (
    <div
      className={`relative min-h-screen bg-[#070707] text-[#F5F3EF] selection:bg-[#D6B477]/30 selection:text-[#F5F3EF] transition-colors duration-500 ${
        currentTheme === 'midnight-obsidian'
          ? 'theme-obsidian'
          : currentTheme === 'platinum-aurora'
          ? 'theme-platinum'
          : 'theme-gold'
      }`}
    >
      {/* Dynamic Ambient Background Aura according to chosen theme */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
          currentTheme === 'midnight-obsidian'
            ? 'opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/10 via-black to-black'
            : currentTheme === 'platinum-aurora'
            ? 'opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#070707] to-[#070707]'
            : 'opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D6B477]/10 via-[#070707] to-[#070707]'
        }`}
      />

      {/* Advanced UI Layer: Custom Cursor & Hairline Scroll Progress */}
      <CustomCursor />
      <ScrollProgress />

      {/* Floating Top Navigation */}
      <Navigation
        onOpenInquiry={() => scrollToSection('contact')}
      />

      <main className="relative z-10 flex flex-col">
        {/* Section A — Hero */}
        <HeroSection
          theme={currentTheme}
          onExploreClick={() => scrollToSection('experiences')}
          onDiscoverClick={() => scrollToSection('philosophy')}
        />

        {/* Section B — The Philosophy */}
        <PhilosophySection />

        {/* Section C — Signature Experiences */}
        <SignatureExperiences
          onSelectExperience={(exp) => setSelectedItem(exp)}
        />

        {/* Section D — Innovation Lab (3D Interactive Objects) */}
        <InnovationLab />

        {/* Section E — Exclusive Collection (Editorial Gallery) */}
        <ExclusiveCollection
          onSelectItem={(item) => setSelectedItem(item)}
        />

        {/* Section F — Interactive Ambience Experience Selector */}
        <AmbienceSelector
          currentTheme={currentTheme}
          onThemeChange={(newTheme) => setCurrentTheme(newTheme)}
        />

        {/* Section G — The Numbers (Illustrative Metrics) */}
        <MetricsSection />

        {/* Section H — Testimonials (Patron Chronicles Slider) */}
        <TestimonialCarousel />

        {/* Section I — Membership (3 Tiers & Comparison Matrix) */}
        <MembershipSection
          onApplyTier={handleApplyMembership}
        />

        {/* Section J — Contact (Concierge Inquiry Form) */}
        <ContactSection
          initialAssetInterest={prefilledAsset}
        />
      </main>

      {/* Section K — Footer */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

      {/* Detail Inspection Modal for Experiences & Curated Collection Items */}
      <ExperienceDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onInquire={handleInquireFromModal}
      />

      {/* Privacy, Sovereignty & Non-disclosure Protocol Modal */}
      <PrivacyProtocolModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
