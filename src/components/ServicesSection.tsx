import React, { useState } from 'react';
import { DENTAL_SERVICES } from '../data/dentalData';
import { DentalService, ServiceCategory } from '../types/dental';
import { Clock, Sparkles, Check, ArrowRight, Activity, Shield, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories: { key: ServiceCategory; label: string }[] = [
    { key: 'all', label: 'All Treatments' },
    { key: 'preventive', label: 'Preventive & Cleanings' },
    { key: 'cosmetic', label: 'Cosmetic & Veneers' },
    { key: 'ortho', label: 'Invisalign & Aligners' },
    { key: 'restorative', label: 'Implants & Restorative' },
    { key: 'pediatric', label: 'Pediatric Dentistry' }
  ];

  const filteredServices = activeCategory === 'all'
    ? DENTAL_SERVICES
    : DENTAL_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-[#08090d]/75 backdrop-blur-md text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-rose-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Treatments</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
            Comprehensive oral wellness & aesthetic artistry.
          </h2>
          
          <p className="text-base text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            Every procedure pairs computerized micro-precision instruments, biocompatible materials, and digital 3D previews for gentle, enduring health.
          </p>

          {/* Filter Pills with Hover States */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-[#e5b882] to-[#c59b6d] text-[#0a0b0e] font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-[#151821] text-stone-300 border border-white/10 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Services Cards Grid with Staggered Scroll & Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: DentalService, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(229, 184, 130, 0.45)' }}
              className="bg-[#141720] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl shadow-black/40 transition-all flex flex-col justify-between group hover:bg-[#181b26] relative overflow-hidden"
            >
              {/* Subtle card corner gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Header row: category badge + pain indicator */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/5 text-amber-200 border border-white/10">
                    {service.category}
                  </span>
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                    service.painLevel === 'Painless'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}>
                    <Activity className="w-3 h-3" />
                    {service.painLevel}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-medium text-white group-hover:text-[#e5b882] transition-colors leading-snug">
                  {service.name}
                </h3>
                
                <p className="text-xs text-amber-400/90 font-medium mt-1 mb-3">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed mb-5 font-light">
                  {service.description}
                </p>

                {/* Service Features checklist */}
                <div className="space-y-2 mb-6 bg-[#0e1017] p-3.5 rounded-xl border border-white/5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer: pricing, duration, CTA with hover feedback */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] text-stone-400 font-medium">Starting from</div>
                  <div className="text-xl font-bold text-white font-serif">
                    ₹{service.startingPrice.toLocaleString()} <span className="text-xs font-sans font-normal text-stone-400">INR</span>
                  </div>
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>~{service.durationMinutes} mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={CLINIC_CALL_URL}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition-colors"
                    title={`Call ${CLINIC_PHONE_NUMBER}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                  </a>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openWhatsAppBooking(`Hello, I would like to book an appointment for ${service.name} (from ₹${service.startingPrice.toLocaleString()}) at Botanica Dental Clinic, Narayangaon.`)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
                    title={`Book ${service.name} via WhatsApp (${CLINIC_PHONE_NUMBER})`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Guarantee Banner with Dark Luxury Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 bg-gradient-to-r from-[#171a24] via-[#1c202d] to-[#171a24] border border-amber-500/25 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-1.5 z-10">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Complimentary 3D Smile Assessment</span>
            </div>
            <h4 className="text-lg sm:text-xl font-serif font-medium text-white">
              Unsure which treatment is ideal for your smile?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl">
              Schedule a comprehensive 3D Smile Assessment. Our specialists provide a transparent digital simulation with zero obligation.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0 z-10">
            <a
              href={CLINIC_CALL_URL}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {CLINIC_PHONE_NUMBER}</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openWhatsAppBooking('Hello, I would like to schedule a Complimentary 3D Smile Assessment at Botanica Dental Clinic.')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 cursor-pointer flex items-center gap-2"
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
