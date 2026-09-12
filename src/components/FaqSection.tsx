import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/dentalData';
import { HelpCircle, ChevronDown, Phone, MessageSquare, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#08090d]/75 backdrop-blur-md text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Guidance & Clarity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
            Frequently asked questions.
          </h2>

          <p className="text-base text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our fear-free protocols, insurance reimbursement, and transparent dental treatments.
          </p>
        </motion.div>

        {/* FAQ Accordion with Hover and Smooth Expand Animation */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#151924] border-amber-500/40 shadow-lg shadow-black/50 ring-1 ring-amber-500/20'
                    : 'bg-[#12141c] border-white/10 hover:border-white/20 hover:bg-[#161924]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-white">
                    {item.q}
                  </span>
                  <div className={`p-1.5 rounded-lg border transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-[#e5b882] border-[#e5b882] text-[#0a0b0e] rotate-180'
                      : 'bg-white/5 border-white/10 text-stone-400 rotate-0'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-stone-300/85 leading-relaxed font-light border-t border-white/5 pt-4"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support & Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 bg-gradient-to-r from-[#141722] via-[#1a1e2b] to-[#141722] rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif text-xl font-medium text-white">
              Have an individual concern or dental emergency?
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              Our clinical concierges are on standby to answer treatment questions or arrange same-day priority relief.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={CLINIC_CALL_URL}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {CLINIC_PHONE_NUMBER}</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openWhatsAppBooking('Hello Botanica Dental, I have an urgent enquiry / would like to book a priority relief appointment.')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
