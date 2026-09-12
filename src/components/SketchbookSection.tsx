import React, { useState } from 'react';
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { BookOpen, Maximize2, Minimize2, Sparkles, Compass, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface SketchbookSectionProps {
  onBackToClinic?: () => void;
  isStandaloneView?: boolean;
}

export const SketchbookSection: React.FC<SketchbookSectionProps> = ({
  onBackToClinic,
  isStandaloneView = false
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const reloadFrame = () => {
    setKey(prev => prev + 1);
  };

  return (
    <section id="sketchbook" className={`relative bg-[#08090d]/80 backdrop-blur-md text-stone-100 ${isStandaloneView ? 'min-h-screen py-8' : 'py-24 border-b border-white/10'}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Botanical Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal tracking-tight">
              Meng To — Singapore Sketchbook
            </h2>
            <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              A tactile personal portfolio built as a Singapore sketchbook, with nine illustrated plates, curled page turns, a draggable magnifying glass, zoom controls, a botanical paper atmosphere, and an editorial index.
            </p>
          </div>

          {/* Interactive controls with hover effects */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {onBackToClinic && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onBackToClinic}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e5b882] to-[#c59b6d] text-[#0a0b0e] text-xs font-semibold shadow-md shadow-amber-500/20 cursor-pointer"
              >
                Back to Dental Clinic
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reloadFrame}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 transition-all shadow-xs cursor-pointer"
              title="Reset View"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 text-xs font-medium transition-all shadow-xs cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Expand Canvas</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Hint Ribbon */}
        <div className="mb-4 bg-[#141722] border border-white/10 rounded-2xl p-3 px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Interactive CSS 3D curler & turn effects
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Draggable magnifying glass & high-res plates
            </span>
          </div>
          <span className="text-[11px] text-amber-300 font-mono font-semibold">
            ThreeUI Component · SHA-256 e0330548b1ac
          </span>
        </div>

        {/* The Exact Configured ThreeUI Shader Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-0 z-50 p-4 bg-black/95 flex flex-col justify-center'
              : 'relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 bg-[#080808]'
          }`}
        >
          {isFullscreen && (
            <div className="flex justify-between items-center pb-3 text-white">
              <span className="text-sm font-serif">Meng To — Singapore Sketchbook</span>
              <button
                onClick={toggleFullscreen}
                className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          )}

          <div
            key={key}
            className="shader-frame w-full relative"
            style={{ height: isFullscreen ? 'calc(100vh - 70px)' : '780px' }}
          >
            <MengToSketchbookLandingPage
              headingFont="instrument-serif"
              bodyFont="newsreader"
              headingWeight="400"
              bodyWeight="400"
              primaryColor="#2b2721"
              headingSize={30}
              bodySize={20}
              headingLetterSpacing={0.010}
            />
          </div>
        </motion.div>

        {/* Editorial Footnote */}
        <div className="mt-6 text-center text-xs text-stone-500">
          Crafted with botanical paper texture, 9 hand-illustrated Singapore plates, and tactile book physics.
        </div>

      </div>
    </section>
  );
};
