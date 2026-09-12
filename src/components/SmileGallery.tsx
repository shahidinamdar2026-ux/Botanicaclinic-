import React, { useState } from 'react';
import { SMILE_TRANSFORMATIONS, TESTIMONIALS } from '../data/dentalData';
import { Sparkles, Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface SmileGalleryProps {
  onOpenBooking: () => void;
}

export const SmileGallery: React.FC<SmileGalleryProps> = ({ onOpenBooking }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const currentCase = SMILE_TRANSFORMATIONS[sliderIndex];

  return (
    <section id="transformations" className="py-24 bg-[#08090d]/75 backdrop-blur-md text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smile Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
            Before & after artistry, documented.
          </h2>

          <p className="text-base text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            Real patient transformations achieved through digital smile design, ceramic craftsmanship, and invisible orthodontics.
          </p>
        </motion.div>

        {/* Featured Case Showcase with Hover Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#141722] rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl shadow-black/70 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Transformation Simulation Card with Hover Glow */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Simulated Before State */}
                <div className="rounded-2xl overflow-hidden bg-[#0d0f15] border border-white/10 p-5 space-y-3 relative group hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/10 text-stone-300">
                      Before Treatment
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Day 01</span>
                  </div>

                  <div className="h-44 sm:h-52 rounded-xl bg-[#090a0e] border border-white/5 flex flex-col items-center justify-center p-4 text-center group-hover:bg-[#0c0e14] transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 mb-2">
                      <span className="font-serif text-xl italic font-bold">B</span>
                    </div>
                    <p className="text-xs font-medium text-stone-300">Initial Clinical Presentation</p>
                    <p className="text-[11px] text-stone-400 mt-1 max-w-[180px]">Discoloration, uneven incisal edges & wear</p>
                  </div>
                </div>

                {/* Simulated After State with Gold Highlight */}
                <div className="rounded-2xl overflow-hidden bg-[#181c28] border border-amber-500/40 p-5 space-y-3 relative group hover:border-amber-400 transition-all shadow-lg shadow-amber-950/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#e5b882] to-[#c59b6d] text-[#0a0b0e]">
                      Completed Smile
                    </span>
                    <span className="text-xs text-amber-300 font-mono">Final Result</span>
                  </div>

                  <div className="h-44 sm:h-52 rounded-xl bg-gradient-to-br from-amber-500/10 via-[#141722] to-emerald-500/10 border border-amber-500/20 flex flex-col items-center justify-center p-4 text-center group-hover:border-amber-400/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#e5b882]/20 border border-[#e5b882]/40 flex items-center justify-center text-amber-300 mb-2">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <p className="text-xs font-semibold text-white">Full Harmonious Radiance</p>
                    <p className="text-[11px] text-amber-200/90 mt-1 max-w-[180px]">Custom ceramic shade, broad smile arc</p>
                  </div>
                </div>

              </div>

              {/* Slider Case Indicators */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {SMILE_TRANSFORMATIONS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSliderIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        sliderIndex === idx ? 'w-8 bg-[#e5b882]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`View case ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSliderIndex((sliderIndex - 1 + SMILE_TRANSFORMATIONS.length) % SMILE_TRANSFORMATIONS.length)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-stone-200 border border-white/10 cursor-pointer transition-all hover:scale-105"
                    aria-label="Previous case"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSliderIndex((sliderIndex + 1) % SMILE_TRANSFORMATIONS.length)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-stone-200 border border-white/10 cursor-pointer transition-all hover:scale-105"
                    aria-label="Next case"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-amber-300 border border-amber-500/20 inline-block">
                Case Study {sliderIndex + 1} of {SMILE_TRANSFORMATIONS.length} · {currentCase.tag}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                {currentCase.title}
              </h3>

              <div className="space-y-2 py-3 border-y border-white/10 text-xs sm:text-sm text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Treatment Plan:</span>
                  <span className="font-semibold text-white">{currentCase.treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Treatment Duration:</span>
                  <span className="font-semibold text-white">{currentCase.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Lead Clinician:</span>
                  <span className="font-semibold text-amber-300">{currentCase.dentistName}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed font-light">
                {currentCase.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="pt-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#e5b882] to-[#c59b6d] text-[#0a0b0e] font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                Discuss Similar Transformation
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* Patient Testimonials Grid with Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(229, 184, 130, 0.4)' }}
              className="bg-[#141722] rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/40 flex flex-col justify-between transition-all hover:bg-[#181c28]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-600" />
                </div>

                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  \"{testimonial.quote}\"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-semibold text-white font-serif">
                  {testimonial.name}
                </h4>
                <p className="text-[11px] text-stone-400">{testimonial.role}</p>
                <span className="inline-block mt-2 text-[10px] uppercase font-semibold tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {testimonial.treatment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
