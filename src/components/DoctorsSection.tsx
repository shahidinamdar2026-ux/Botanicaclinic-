import React from 'react';
import { DENTISTS } from '../data/dentalData';
import { Dentist } from '../types/dental';
import { Award, CheckCircle2, HeartHandshake, Sparkles, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking }) => {
  return (
    <section id="doctors" className="py-24 bg-[#08090d]/75 backdrop-blur-md text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Master Clinicians & Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
            Distinguished care led by compassionate experts.
          </h2>

          <p className="text-base text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            Our multidisciplinary team unites British and American aesthetic dentistry masters, Invisalign Diamond providers, and gentle pediatric specialists.
          </p>
        </motion.div>

        {/* Doctors Grid with Staggered Scroll & Zoom Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DENTISTS.map((doctor: Dentist, index: number) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, borderColor: 'rgba(229, 184, 130, 0.45)' }}
              className="bg-[#141722] rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40 transition-all flex flex-col justify-between group hover:bg-[#181c28]"
            >
              <div>
                {/* Doctor Avatar with Hover Zoom & Status Badge */}
                <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-[#0e1017]">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-108 group-hover:brightness-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141722] via-transparent to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-[#0a0c10]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[11px] font-semibold text-amber-300">
                    {doctor.experienceYears}+ Years Exp.
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#e5b882] transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {doctor.title}
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-1 line-clamp-1">
                      {doctor.degrees}
                    </p>
                  </div>

                  <p className="text-xs text-stone-300/80 leading-relaxed font-light line-clamp-3">
                    {doctor.bio}
                  </p>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      Focus Specialty:
                    </span>
                    <p className="text-xs text-stone-200 font-medium mt-0.5">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Schedule & Book CTA with 7378671779 WhatsApp & Call */}
              <div className="p-5 sm:p-6 pt-0 space-y-2.5">
                <div className="bg-[#0e1017] p-2 rounded-xl border border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Available:</span>
                  <span className="text-stone-200 font-medium">{doctor.daysAvailable.slice(0, 3).join(', ')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={CLINIC_CALL_URL}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition-colors"
                    title={`Call ${CLINIC_PHONE_NUMBER}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                  </a>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openWhatsAppBooking(`Hello, I would like to book a consultation with ${doctor.name} at Botanica Dental Clinic.`)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
                    title={`Book with ${doctor.name} on WhatsApp (${CLINIC_PHONE_NUMBER})`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
