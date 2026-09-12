import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieBannerProps {
  onOpenCookieSettings: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookieSettings }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('botanica_cookie_preferences');
      if (!saved) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs = {
      necessary: true,
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem('botanica_cookie_preferences', JSON.stringify(prefs));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md bg-[#0e1017]/95 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-2xl text-stone-200 text-xs space-y-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-300 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Cookie Consent & Privacy</p>
              <p className="text-[11px] text-stone-400 font-light">
                We use cookies to preserve your smile estimator plans and ensure secure navigation.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer text-center"
          >
            Accept All
          </button>
          <button
            onClick={() => {
              setVisible(false);
              onOpenCookieSettings();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white font-medium text-xs border border-white/10 transition-colors cursor-pointer text-center"
          >
            Preferences
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
