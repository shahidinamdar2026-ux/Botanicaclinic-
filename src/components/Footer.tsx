import React from 'react';
import { Sparkles, MapPin, Phone, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_PHONE_FORMATTED, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenBooking: () => void;
  onScrollTo: (sectionId: string) => void;
  onOpenLegal?: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onScrollTo, onOpenLegal }) => {
  return (
    <footer className="bg-[#06070a]/85 backdrop-blur-md text-stone-300 pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5b882] to-[#b38550] text-[#0a0b0e] flex items-center justify-center shadow-lg shadow-amber-900/20">
                <Sparkles className="w-5 h-5 text-[#0a0b0e]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Botanica Dental
                </span>
                <span className="text-[11px] text-amber-300/80 uppercase tracking-widest font-semibold">
                  Aesthetic Oral Sanctuary
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-md">
              A serene retreat for gentle dental health and artistic smile transformation in Narayangaon, Pune. Powered by computer-guided painless anesthesia, biological materials, and experienced master clinicians.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                DCI & ISO Certified Standards
              </span>
              <span className="text-stone-700">•</span>
              <span>Maharashtra State Dental Council (MSDC) Registered</span>
            </div>

            {/* Quick Contact & WhatsApp Booking */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openWhatsAppBooking()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
              </button>
              <a
                href={CLINIC_CALL_URL}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {CLINIC_PHONE_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#e5b882] font-semibold">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Preventive Ultrasonic Scaling
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Artisan Porcelain Veneers
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Invisalign Clear Aligners
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Guided 3D Dental Implants
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Cold-Laser Teeth Whitening
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Gentle Kids Dentistry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Experience */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#e5b882] font-semibold">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onScrollTo('doctors')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Our Dental Specialists
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('estimator')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Treatment Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Dental Anxiety Care & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => openWhatsAppBooking()} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5 cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge ({CLINIC_PHONE_NUMBER})</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#e5b882] font-semibold">
              Sanctuary Location
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">Pune-Nashik Highway, Near Bus Station, Narayangaon, Pune, Maharashtra 410504</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={CLINIC_CALL_URL} className="hover:text-white text-stone-200 transition-colors font-medium">
                  {CLINIC_PHONE_FORMATTED} (Call)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <button onClick={() => openWhatsAppBooking()} className="hover:text-emerald-300 text-stone-200 transition-colors font-medium cursor-pointer">
                  {CLINIC_PHONE_NUMBER} (WhatsApp)
                </button>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-300">Mon – Fri: 8:30 AM – 7:00 PM</p>
                  <p className="text-stone-300">Saturday: 9:00 AM – 4:00 PM</p>
                  <p className="text-amber-300/90 text-[11px] font-medium">Sunday: Emergency Triage by Appointment</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Botanica Dental Clinic. Narayangaon, Pune, Maharashtra 410504.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.('cookies')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Cookie Consent
            </button>
            <span>•</span>
            <span className="text-stone-400">DCI Registered</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
