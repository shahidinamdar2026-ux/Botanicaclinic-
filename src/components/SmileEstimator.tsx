import React, { useState } from 'react';
import { Calculator, CheckCircle2, Clock, Calendar, Sparkles, ArrowRight, ShieldCheck, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface EstimatorOption {
  id: string;
  label: string;
  category: string;
  price: number;
  durationWeeks: number;
  visits: number;
  description: string;
}

const ESTIMATOR_OPTIONS: EstimatorOption[] = [
  {
    id: 'clean',
    label: 'Deep Ultrasonic Cleaning & Airflow Polish',
    category: 'Preventative Health',
    price: 500,
    durationWeeks: 0,
    visits: 1,
    description: 'Plaque and tartar removal with airflow salt-micro stain polishing.'
  },
  {
    id: 'whitening',
    label: 'Botanical Cold-Laser Teeth Whitening',
    category: 'Cosmetic Brightening',
    price: 3500,
    durationWeeks: 1,
    visits: 1,
    description: 'Lifts years of tea/coffee stains in 60 minutes with zero enamel damage.'
  },
  {
    id: 'aligners',
    label: 'Invisalign® Diamond Clear Aligners',
    category: 'Teeth Straightening',
    price: 42000,
    durationWeeks: 24,
    visits: 4,
    description: 'Discreet, comfortable correction of teeth crowding, rotations, and gaps.'
  },
  {
    id: 'veneers',
    label: 'Artisan Porcelain Veneers (4 front teeth)',
    category: 'Smile Reconstruction',
    price: 30000,
    durationWeeks: 2,
    visits: 2,
    description: 'Ultra-thin handcrafted ceramic covers for chipped, uneven or discolored teeth.'
  },
  {
    id: 'implant',
    label: 'Computer-Guided 3D Dental Implant',
    category: 'Missing Tooth Replacement',
    price: 18500,
    durationWeeks: 12,
    visits: 3,
    description: 'Permanent titanium fixture and ceramic zirconia crown matching your natural bite.'
  }
];

interface SmileEstimatorProps {
  onStartBookingWithPlan: (services: string[]) => void;
}

export const SmileEstimator: React.FC<SmileEstimatorProps> = ({ onStartBookingWithPlan }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['clean', 'whitening']);

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedItems = ESTIMATOR_OPTIONS.filter(opt => selectedIds.includes(opt.id));
  const totalPrice = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const maxWeeks = Math.max(...selectedItems.map(i => i.durationWeeks));
  const totalVisits = selectedItems.reduce((acc, curr) => acc + curr.visits, 0);

  return (
    <section id="estimator" className="py-24 bg-[#08090d]/75 backdrop-blur-md text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-pink-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Smile Planner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
            Estimate your treatment journey & investment.
          </h2>

          <p className="text-base text-stone-400 font-light max-w-2xl mx-auto">
            Select the treatments you desire for transparent fee ranges, clinic visits, and personalized timelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options List with Interactive Hover and Active Glow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-3.5"
          >
            <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
              Select Your Dental Goals (Choose one or multiple):
            </p>

            {ESTIMATOR_OPTIONS.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              return (
                <motion.div
                  key={opt.id}
                  whileHover={{ y: -2, x: 2 }}
                  onClick={() => toggleOption(opt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#181c26] border-amber-500/50 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30'
                      : 'bg-[#12141c] border-white/10 hover:border-white/25 hover:bg-[#161924]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 border transition-all ${
                      isSelected
                        ? 'bg-[#e5b882] border-[#e5b882] text-[#0a0b0e]'
                        : 'border-white/20 bg-transparent text-transparent'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm sm:text-base font-semibold text-white">
                          {opt.label}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-amber-300 font-medium border border-white/10">
                          {opt.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-white font-serif">₹{opt.price.toLocaleString()}</div>
                    <div className="text-[10px] text-stone-500">est. INR</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Real-time Summary Card with Dark Luxury Card Aesthetic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-[#141722] rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-serif text-xl font-medium text-white">
                Custom Treatment Estimate
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Transparent Fees
              </span>
            </div>

            {/* Price block */}
            <div className="bg-[#0e1017] p-5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs text-stone-400 font-medium">Estimated Investment</div>
              <div className="text-3xl sm:text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#e5b882] via-[#f5d5a8] to-[#c59b6d]">
                ₹{totalPrice.toLocaleString()} <span className="text-sm font-sans font-normal text-stone-400">INR</span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                *Flexible EMI options available starting from <strong className="text-amber-300">₹{Math.round(totalPrice / 12).toLocaleString()}/month</strong>.
              </p>
            </div>

            {/* Timeline & Visit Metrics */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-[#0e1017] rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Time</span>
                </div>
                <div className="text-base font-semibold text-white">
                  {maxWeeks === 0 ? 'Same Day' : `~${maxWeeks} Weeks`}
                </div>
              </div>

              <div className="p-3.5 bg-[#0e1017] rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Visits Required</span>
                </div>
                <div className="text-base font-semibold text-white">
                  {totalVisits} appointment{totalVisits > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full diagnostic 3D intraoral scans included</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Complimentary botanical desensitizing serum therapy</span>
              </div>
            </div>

            {/* CTA Buttons with WhatsApp 7378671779 & Call */}
            <div className="space-y-2.5 pt-1">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const itemsList = selectedItems.map(o => o.label).join(', ');
                  const msg = `Hello Botanica Dental, I estimated my custom smile plan (₹${totalPrice.toLocaleString()} INR for: ${itemsList}) and would like to book an appointment at your Narayangaon clinic.`;
                  openWhatsAppBooking(msg);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2.5 cursor-pointer"
                title={`Book this plan via WhatsApp (${CLINIC_PHONE_NUMBER})`}
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.button>

              <a
                href={CLINIC_CALL_URL}
                className="w-full py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {CLINIC_PHONE_NUMBER}</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
