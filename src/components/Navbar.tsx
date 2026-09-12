import React, { useState } from 'react';
import { Sparkles, PhoneCall, Menu, X, Clock, MessageSquare, Phone, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_PHONE_FORMATTED, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';
import { LegalTab } from './LegalModal';

interface NavbarProps {
  onOpenBooking: () => void;
  onScrollTo: (sectionId: string) => void;
  onOpenLegal: (tab: LegalTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onScrollTo,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0b0e]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Emergency & Contact Top Bar */}
      <div className="bg-[#050608] text-stone-300 text-xs py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Emergency Appointments Open Today
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Mon – Sat: 8:30 AM – 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-300 font-medium">
            <a 
              href={CLINIC_CALL_URL}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors group"
              title="Direct Call"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-stone-300 group-hover:text-amber-300">Call: {CLINIC_PHONE_NUMBER}</span>
            </a>
            <span className="text-stone-600">|</span>
            <button
              onClick={() => openWhatsAppBooking()}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {CLINIC_PHONE_NUMBER}</span>
            </button>
            <span className="hidden md:inline bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-[11px] text-amber-200">
              Narayangaon, Pune
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e5b882] to-[#b38550] text-[#0a0b0e] flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:shadow-amber-500/25 transition-all">
              <Sparkles className="w-6 h-6 text-[#0a0b0e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#e5b882] transition-colors">
                  Botanica
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-amber-200 font-semibold border border-amber-500/20">
                  Dental
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium tracking-wide">
                Aesthetic Clinic & Oral Sanctuary
              </p>
            </div>
          </motion.div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => onScrollTo('services')}
              className="text-sm font-medium text-stone-300 hover:text-white hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Treatments
            </button>
            <button
              onClick={() => onScrollTo('doctors')}
              className="text-sm font-medium text-stone-300 hover:text-white hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Specialists
            </button>
            <button
              onClick={() => onScrollTo('estimator')}
              className="text-sm font-medium text-stone-300 hover:text-white hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Cost Estimator
            </button>
            <button
              onClick={() => onScrollTo('faq')}
              className="text-sm font-medium text-stone-300 hover:text-white hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Patient Care & FAQ
            </button>
          </nav>

          {/* Right Action: Call & Book Now WhatsApp buttons with 7378671779 */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={CLINIC_CALL_URL}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 text-xs font-semibold transition-all cursor-pointer"
              title={`Call ${CLINIC_PHONE_FORMATTED}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {CLINIC_PHONE_NUMBER}</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openWhatsAppBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-900/30 hover:shadow-emerald-500/40 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={CLINIC_CALL_URL}
              className="p-2.5 rounded-xl bg-white/10 text-amber-300 border border-white/10"
              title="Call 7378671779"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => openWhatsAppBooking()}
              className="p-2.5 rounded-xl bg-emerald-600 text-white font-medium shadow-md"
              title="Book Now: 7378671779 on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#0e1015] border-b border-white/10 px-5 pt-3 pb-6 space-y-3"
        >
          <button
            onClick={() => {
              onScrollTo('services');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 text-stone-200 hover:text-[#e5b882] font-medium border-b border-white/5 transition-colors"
          >
            Treatments & Services
          </button>
          <button
            onClick={() => {
              onScrollTo('doctors');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 text-stone-200 hover:text-[#e5b882] font-medium border-b border-white/5 transition-colors"
          >
            Our Dental Specialists
          </button>
          <button
            onClick={() => {
              onScrollTo('estimator');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 text-stone-200 hover:text-[#e5b882] font-medium border-b border-white/5 transition-colors"
          >
            Treatment Cost Estimator
          </button>
          <button
            onClick={() => {
              onScrollTo('faq');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 text-stone-200 hover:text-[#e5b882] font-medium border-b border-white/5 transition-colors"
          >
            Patient Care & FAQ
          </button>

          {/* Quick Contact Options for Mobile */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>Book Now: {CLINIC_PHONE_NUMBER} (WhatsApp)</span>
            </button>

            <a
              href={CLINIC_CALL_URL}
              className="w-full py-3 rounded-xl bg-white/10 text-stone-200 font-semibold text-center flex items-center justify-center gap-2 border border-white/15"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call: {CLINIC_PHONE_NUMBER}</span>
            </a>
          </div>

          {/* Legal & Policy Links in Hamburger Menu */}
          <div className="pt-3 border-t border-white/10 space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold px-1 pb-1">
              Legal & Compliance
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('privacy');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors cursor-pointer text-left"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privacy Policy (PDPA)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('terms');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors cursor-pointer text-left"
            >
              <FileText className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Terms & Conditions</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('cookies');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors cursor-pointer text-left"
            >
              <Cookie className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Cookie Consent Page</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
