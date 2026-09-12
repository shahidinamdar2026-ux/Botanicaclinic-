import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Cookie, Check, AlertCircle, Phone, MessageSquare, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange
}) => {
  // Cookie preference states
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [preferenceCookies, setPreferenceCookies] = useState(true);
  const [cookieSavedNotification, setCookieSavedNotification] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('botanica_cookie_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnalyticsCookies(Boolean(parsed.analytics));
        setPreferenceCookies(Boolean(parsed.preferences));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCookiePreferences = (acceptAll = false) => {
    const prefs = {
      necessary: true,
      analytics: acceptAll ? true : analyticsCookies,
      preferences: acceptAll ? true : preferenceCookies,
      timestamp: new Date().toISOString()
    };
    if (acceptAll) {
      setAnalyticsCookies(true);
      setPreferenceCookies(true);
    }
    localStorage.setItem('botanica_cookie_preferences', JSON.stringify(prefs));
    setCookieSavedNotification(true);
    setTimeout(() => {
      setCookieSavedNotification(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#06070a]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0e1017] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-200 z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#12141e]/80 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5" />}
                {activeTab === 'terms' && <FileText className="w-5 h-5" />}
                {activeTab === 'cookies' && <Cookie className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-serif font-medium text-white">
                  {activeTab === 'privacy' && 'Privacy Policy'}
                  {activeTab === 'terms' && 'Terms & Conditions'}
                  {activeTab === 'cookies' && 'Cookie Consent & Preferences'}
                </h2>
                <p className="text-[11px] text-stone-400">Botanica Dental Clinic Sanctuary · Narayangaon, Pune</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-white/5 bg-[#0e1017] shrink-0 overflow-x-auto">
            <button
              onClick={() => onTabChange('privacy')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'privacy'
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => onTabChange('terms')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'terms'
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms & Conditions</span>
            </button>
            <button
              onClick={() => onTabChange('cookies')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'cookies'
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Consent</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
            {activeTab === 'privacy' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-[#141722] border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-white">Patient Confidentiality & Data Protection</p>
                    <p className="text-stone-400">
                      Botanica Dental Clinic upholds stringent medical data protection standards under prevailing health privacy norms and Dental Council of India (DCI) / MSDC ethical clinical guidelines.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    1. Information We Collect
                  </h3>
                  <p className="text-stone-400">
                    To deliver bespoke clinical care and seamless concierge reservations, we collect:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-300">
                    <li><strong className="text-stone-100">Patient Contact:</strong> Patient name and telephone/WhatsApp contact number.</li>
                    <li><strong className="text-stone-100">Zero Email Policy:</strong> We do not mandate, collect, or store your email address for general bookings; all real-time reservations are conducted through our encrypted WhatsApp concierge line and direct phone line.</li>
                    <li><strong className="text-stone-100">Clinical History & 3D Scans:</strong> Medical alerts, intraoral 3D scans, and treatment notes recorded during physical consultations in our clinic.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    2. Purpose of Data Processing
                  </h3>
                  <p className="text-stone-400">
                    Your personal information is utilized strictly to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-300">
                    <li>Schedule and confirm your clinical appointment via WhatsApp or telephone call.</li>
                    <li>Prepare customized clinical suites (including our Botanical Fear-Free and anxiety-relief protocol).</li>
                    <li>Maintain statutory medical and diagnostic records in accordance with healthcare standards.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    3. Data Security & Storage
                  </h3>
                  <p className="text-stone-400">
                    All digital intraoral scan records are safeguarded with enterprise-grade AES-256 encryption. We do not sell, rent, or trade your personal or medical data to any commercial third-party marketing entities.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    4. Inquiries & Data Protection Officer
                  </h3>
                  <p className="text-stone-400">
                    For requests concerning data access, correction, or withdrawal of consent, contact our concierge directly:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => openWhatsAppBooking('Hello, I have an inquiry regarding privacy policy / personal data at Botanica Dental Clinic.')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp DPO: {CLINIC_PHONE_NUMBER}</span>
                    </button>
                    <a
                      href={CLINIC_CALL_URL}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call Concierge: {CLINIC_PHONE_NUMBER}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-[#141722] border border-white/10 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-white">General Terms of Clinical Service</p>
                    <p className="text-stone-400">
                      By scheduling an appointment or utilizing Botanica Dental Clinic digital platforms, you agree to the conditions detailed below.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    1. Clinical Treatment Estimates
                  </h3>
                  <p className="text-stone-400">
                    Estimates provided via our digital Smile Estimator or online service catalog represent indicative starting fees in Indian Rupees (₹ INR). Precise fees depend on individual anatomical complexity, 3D intraoral findings, and clinical diagnosis finalized during in-person specialist consultation in Narayangaon, Pune.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    2. Appointment Policy & Cancellation
                  </h3>
                  <p className="text-stone-400">
                    We maintain dedicated private surgical suites reserved solely for your session:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-300">
                    <li>Zero upfront reservation fees are required when booking through our concierge.</li>
                    <li>We kindly request at least <strong className="text-white">4 hours notice</strong> should you need to reschedule or cancel your visit.</li>
                    <li>Emergency priority relief triage slots are prioritized based on clinical acute urgency.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    3. Medical Disclaimer
                  </h3>
                  <p className="text-stone-400">
                    Information published on this website is for educational and appointment reservation purposes only and does not constitute formal medical diagnosis. Treatments are performed exclusively by registered dental practitioners holding active Dental Council of India (DCI) / MSDC registrations.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                    4. Transparent Billing & Insurance
                  </h3>
                  <p className="text-stone-400">
                    Botanica Dental Clinic provides itemized fee schedules prior to any procedural commencement. We assist in filing direct claims for major health insurance partners and cashless Mediclaim TPAs.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-[#141722] border border-white/10 flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-white">Your Privacy Choices & Cookie Settings</p>
                    <p className="text-stone-400">
                      We use minimal, high-privacy cookies and local storage to preserve your browsing preferences and ensure optimal navigation across our dental sanctuary portal.
                    </p>
                  </div>
                </div>

                {/* Cookie Category 1: Strictly Necessary */}
                <div className="p-4 rounded-2xl bg-[#141722]/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white text-xs sm:text-sm">Strictly Necessary Cookies</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Essential for secure navigation, CSRF protection, and core UI rendering. These cannot be disabled as the site cannot function securely without them.
                  </p>
                </div>

                {/* Cookie Category 2: Functional / Preferences */}
                <div className="p-4 rounded-2xl bg-[#141722]/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚙️</span>
                      <span className="font-semibold text-white text-xs sm:text-sm">Functional & Preference Cookies</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferenceCookies}
                        onChange={(e) => setPreferenceCookies(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Remembers your smile calculation preferences and custom treatment plan configurations for seamless return visits.
                  </p>
                </div>

                {/* Cookie Category 3: Analytics & Performance */}
                <div className="p-4 rounded-2xl bg-[#141722]/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📊</span>
                      <span className="font-semibold text-white text-xs sm:text-sm">Anonymous Performance & Analytics</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsCookies}
                        onChange={(e) => setAnalyticsCookies(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Aggregates de-identified traffic metrics to help us optimize load speeds and mobile accessibility for patients.
                  </p>
                </div>

                {/* Confirmation badge */}
                {cookieSavedNotification && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Your cookie preferences have been successfully updated and saved.</span>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleSaveCookiePreferences(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
                  >
                    Accept All Cookies
                  </button>
                  <button
                    onClick={() => handleSaveCookiePreferences(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 font-semibold text-xs border border-white/10 transition-colors cursor-pointer"
                  >
                    Save Current Preferences
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#12141e] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
            <div className="text-stone-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Concierge: {CLINIC_PHONE_NUMBER}</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
