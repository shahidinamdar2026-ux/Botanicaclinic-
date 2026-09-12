import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { SmileEstimator } from './components/SmileEstimator';
import { DoctorsSection } from './components/DoctorsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { MoonTreeBackground } from './components/MoonTreeBackground';
import { Appointment } from './types/dental';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Legal modal states: privacy | terms | cookies
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setPreselectedService(serviceId);
    setPreselectedDoctor(doctorId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (appt: Appointment) => {
    setAppointments(prev => [appt, ...prev]);
    setToastMessage(`Booking logged for ${appt.patientName} on ${appt.date} at ${appt.timeSlot}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans antialiased selection:bg-[#e5b882] selection:text-[#08090d] relative overflow-x-hidden">
      
      {/* Realistic Moon & Glowing Pink Tree Background with Falling Leaves across the entire website */}
      <MoonTreeBackground />

      {/* Toast notification with dark luxury aesthetic */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#161924]/95 backdrop-blur-md text-stone-100 px-5 py-3.5 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3.5"
          >
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onScrollTo={handleScrollTo}
        onOpenLegal={handleOpenLegal}
      />

      <main>
        {/* Hero Section with dark aesthetic, WhatsApp & Call buttons, glowing pink tree and moon backdrop */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={() => handleScrollTo('services')}
        />

        {/* Dental Treatments & Services with Book Now: 7378671779 and Call buttons */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Smile Estimator & Custom Planner with Book Now: 7378671779 and Call buttons */}
        <SmileEstimator
          onStartBookingWithPlan={(services) => handleOpenBooking(services[0])}
        />

        {/* Clinical Specialists & Dentists with Book Now: 7378671779 and Call buttons */}
        <DoctorsSection
          onSelectDoctorForBooking={(doctorName) => handleOpenBooking(undefined, doctorName)}
        />

        {/* Patient Care & FAQ with Book Now: 7378671779 and Call buttons */}
        <FaqSection
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onScrollTo={handleScrollTo}
        onOpenLegal={handleOpenLegal}
      />

      {/* Booking Modal with WhatsApp & Call actions */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedService}
        preselectedDoctorId={preselectedDoctor}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Privacy Policy, Terms & Conditions, and Cookie Consent Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        activeTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
        onTabChange={setLegalTab}
      />

      {/* Non-intrusive Cookie Consent Banner */}
      <CookieBanner
        onOpenCookieSettings={() => handleOpenLegal('cookies')}
      />

    </div>
  );
}
