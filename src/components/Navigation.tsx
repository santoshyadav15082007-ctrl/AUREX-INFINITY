import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenInquiry?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Innovation', href: '#innovation' },
    { label: 'Collection', href: '#collection' },
    { label: 'Membership', href: '#membership' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070707]/90 backdrop-blur-md border-b border-[#D6B477]/15 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-lg sm:text-xl font-bold tracking-[0.25em] text-[#F5F3EF] hover:text-[#D6B477] transition-colors whitespace-nowrap shrink-0"
            aria-label="Aurex Infinity Homepage"
          >
            AUREX INFINITY
          </a>

          {/* Zone 2: 4–5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-[#F5F3EF]/70 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#D6B477] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D6B477] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                if (onOpenInquiry) {
                  e.preventDefault();
                  onOpenInquiry();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-black bg-[#D6B477] hover:bg-[#F2E3C6] rounded transition-all duration-200 shadow-md shadow-[#D6B477]/10 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inquire Concierge</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F3EF] hover:text-[#D6B477] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden transition-opacity duration-300">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl tracking-wider text-[#F5F3EF] hover:text-[#D6B477] transition-colors py-2 border-b border-neutral-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-neutral-800 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry();
              }}
              className="w-full py-3.5 text-center text-xs font-semibold tracking-widest uppercase text-black bg-[#D6B477] rounded transition-colors"
            >
              Inquire Concierge
            </a>
            <p className="text-xs text-neutral-500 text-center tracking-wider">
              Private Client Sovereign Registry · Geneva · Mayfair · Zurich
            </p>
          </div>
        </div>
      )}
    </>
  );
};
