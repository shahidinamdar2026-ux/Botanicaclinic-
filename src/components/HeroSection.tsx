import React from 'react';
import { ShieldCheck, Star, ArrowRight, HeartPulse, CheckCircle2, Sparkles, Smile, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreServices
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10]/65 backdrop-blur-xs text-stone-100 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[400px] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Trust Copy with Scroll / Stagger Animations */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Tranquility badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-stone-200 backdrop-blur-md shadow-inner hover:border-amber-500/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Premier Fear-Free Dental Studio · Narayangaon, Pune</span>
                <span className="text-white/20">•</span>
                <span className="text-amber-300 font-semibold">Quiet Luxury & Comfort</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-[11px] font-medium text-pink-200 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <span>Lunar Sanctuary & Sakura Botanical Ambience</span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-normal leading-[1.14] tracking-tight"
            >
              Gentle dentistry crafted with{' '}
              <span className="italic bg-gradient-to-r from-[#e5b882] via-[#f7d6a5] to-[#c59b6d] bg-clip-text text-transparent">
                artisan care
              </span>{' '}
              and serene calm.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-stone-300/85 max-w-2xl font-light leading-relaxed"
            >
              Step into a tranquil botanical sanctuary where cutting-edge 3D intraoral diagnostics, computerized painless anesthesia, and master aesthetic smile artistry banish dental anxiety forever.
            </motion.p>

            {/* Quick action buttons with 7378671779 for WhatsApp & Call */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openWhatsAppBooking('Hello, I would like to book an appointment at Botanica Dental Clinic.')}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/40 flex items-center gap-2.5 group cursor-pointer"
                title="Book Now via WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href={CLINIC_CALL_URL}
                className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-stone-100 font-semibold text-sm sm:text-base border border-white/15 hover:border-amber-400/40 transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer shadow-xs"
                title={`Call ${CLINIC_PHONE_NUMBER}`}
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {CLINIC_PHONE_NUMBER}</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreServices}
                className="px-4 py-4 rounded-xl text-stone-400 hover:text-stone-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Explore Treatments ↓</span>
              </motion.button>
            </motion.div>

            {/* Trust Highlights Cards with Hover Micro-Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3.5"
            >
              <motion.div 
                whileHover={{ y: -3, borderColor: 'rgba(52, 211, 153, 0.4)' }}
                className="p-3.5 rounded-xl bg-[#14161d] border border-white/10 transition-all flex items-start gap-3 hover:bg-[#181b24]"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-100">Pain-Free Tech</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Computerized gentle anesthesia</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, borderColor: 'rgba(245, 158, 11, 0.4)' }}
                className="p-3.5 rounded-xl bg-[#14161d] border border-white/10 transition-all flex items-start gap-3 hover:bg-[#181b24]"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-100">4.9 / 5 Rating</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">1,200+ verified Narayangaon & Pune patients</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, borderColor: 'rgba(147, 197, 253, 0.4)' }}
                className="p-3.5 rounded-xl bg-[#14161d] border border-white/10 transition-all flex items-start gap-3 col-span-2 sm:col-span-1 hover:bg-[#181b24]"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-100">Same-Day Care</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Priority emergency relief slots</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Hero Imagery & Visual Sanctuary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image Frame with Luxury Glass & Glow */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/15 bg-[#14171f] group">
              
              {/* High-definition Modern Dental Sanctuary Suite Image */}
              <div className="h-80 sm:h-96 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern Serene Dental Clinic Suite at Botanica"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/40 to-transparent" />
                
                {/* Status chip */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#0a0c10]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-stone-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-[11px]">Private Clinical Suite · Narayangaon, Pune</span>
                </div>

                {/* Overlaid Title & Details */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-md backdrop-blur-md">
                    Quiet Luxury Care
                  </span>
                  <h3 className="text-xl font-serif mt-2 font-medium text-stone-100 leading-snug">
                    Acoustic calm, botanical air purification & zero anxiety
                  </h3>
                </div>
              </div>

              {/* Bottom Card Content with Interactive Actions */}
              <div className="p-6 bg-[#14161e] border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Smile className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-100">Welcome Assessment</p>
                      <p className="text-[11px] text-stone-400">Full 3D Intraoral Scan + Consultation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      From ₹500
                    </span>
                  </div>
                </div>

                {/* Quick actions row */}
                <div className="bg-[#0e1015] p-3 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>In-network with major insurance & cashless TPA</span>
                  </div>
                  <button
                    onClick={() => openWhatsAppBooking('Hello, I would like to book a Welcome Assessment at Botanica Dental Clinic.')}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Secondary Mini Image / Live Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -top-6 -right-4 bg-[#14161e]/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/15 hidden md:flex items-center gap-3 pr-4"
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
                alt="Dr. Cheryl Tan"
                className="w-10 h-10 rounded-xl object-cover border border-amber-500/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-semibold text-stone-100">Dr. Cheryl Tan</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> In Clinic Today
                </p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
