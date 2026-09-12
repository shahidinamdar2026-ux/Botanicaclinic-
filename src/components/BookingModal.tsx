import React, { useState } from 'react';
import { DENTAL_SERVICES, DENTISTS } from '../data/dentalData';
import { Appointment } from '../types/dental';
import { X, Calendar, Clock, User, Phone, CheckCircle2, HeartPulse, Sparkles, Shield, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_PHONE_NUMBER, CLINIC_CALL_URL, openWhatsAppBooking } from '../utils/contact';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
  onBookingSuccess: (appt: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedDoctorId,
  onBookingSuccess
}) => {
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'checkup-clean');
  const [dentistId, setDentistId] = useState(preselectedDoctorId || 'dr-cheryl-tan');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasAnxiety, setHasAnxiety] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:30 AM', '11:45 AM',
    '02:00 PM', '03:15 PM', '04:30 PM', '05:45 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newAppt: Appointment = {
      id: `BOT-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName: name,
      phone,
      serviceId,
      dentistId,
      date,
      timeSlot,
      hasAnxiety,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedAppt(newAppt);
    setIsSubmitted(true);
    onBookingSuccess(newAppt);

    // Open WhatsApp pre-filled with appointment details
    const msg = `Hello Botanica Dental, I would like to confirm my appointment:\n- Patient: ${name}\n- Treatment: ${selectedService.name}\n- Doctor: ${selectedDoctor.name}\n- Date: ${date}\n- Time: ${timeSlot}\n- Phone: ${phone}${hasAnxiety ? '\n- Special care: Patient experiences dental anxiety.' : ''}`;
    openWhatsAppBooking(msg);
  };

  const selectedService = DENTAL_SERVICES.find(s => s.id === serviceId) || DENTAL_SERVICES[0];
  const selectedDoctor = DENTISTS.find(d => d.id === dentistId) || DENTISTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#12141c] text-stone-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 shadow-2xl shadow-black relative"
      >
        {/* Close button with hover state */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e5b882] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sanctuary Consultation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
              Schedule Your Dental Visit
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-4 font-light">
              Complimentary 3D intraoral scans & personal specialist consultation included.
            </p>

            {/* Instant WhatsApp / Call Quick Action Bar */}
            <div className="bg-[#181b26] border border-white/10 rounded-2xl p-3.5 mb-5 flex flex-wrap items-center justify-between gap-2.5">
              <div className="text-xs text-stone-300">
                <span className="text-emerald-400 font-semibold block">Need immediate booking or answers?</span>
                <span className="text-[11px] text-stone-400">Our concierge is active on WhatsApp and phone:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CLINIC_CALL_URL}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-medium flex items-center gap-1.5 border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call: {CLINIC_PHONE_NUMBER}</span>
                </a>
                <button
                  type="button"
                  onClick={() => openWhatsAppBooking(`Hello, I would like to book a consultation for ${selectedService.name} at Botanica Dental Clinic.`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  <span>WhatsApp: {CLINIC_PHONE_NUMBER}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Select Treatment
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26] cursor-pointer"
                >
                  {DENTAL_SERVICES.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#12141c] text-stone-200">
                      {s.name} (from ₹{s.startingPrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dentist selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Preferred Specialist
                </label>
                <select
                  value={dentistId}
                  onChange={(e) => setDentistId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26] cursor-pointer"
                >
                  {DENTISTS.map(d => (
                    <option key={d.id} value={d.id} className="bg-[#12141c] text-stone-200">
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26] cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26] cursor-pointer"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot} className="bg-[#12141c] text-stone-200">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cheryl Lee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 placeholder-stone-500 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 73786 71779"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-white/15 text-stone-200 placeholder-stone-500 text-sm focus:outline-hidden focus:border-amber-400 bg-[#181b26]"
                  />
                </div>
              </div>

              {/* Dental Anxiety Toggle with Emerald Ambient Frame */}
              <div className="bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="anxiety"
                  checked={hasAnxiety}
                  onChange={(e) => setHasAnxiety(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-500 rounded border-white/20 bg-[#181b26] focus:ring-emerald-400 cursor-pointer"
                />
                <label htmlFor="anxiety" className="text-xs text-stone-300 cursor-pointer leading-relaxed">
                  <span className="font-semibold block text-emerald-300">
                    I experience dental anxiety / fear
                  </span>
                  Our clinical team will prepare extra calming botanical aromatherapy, gentle explanation pauses, and noise-cancelling headphones.
                </label>
              </div>

              {/* Submit CTA with 7378671779 WhatsApp & Call */}
              <div className="pt-2 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Book Now: {CLINIC_PHONE_NUMBER}</span>
                </motion.button>

                <div className="flex items-center justify-between gap-3">
                  <a
                    href={CLINIC_CALL_URL}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call: {CLINIC_PHONE_NUMBER}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      openWhatsAppBooking(`Hello Botanica Dental, I need help choosing a dental service.`);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#181b26] hover:bg-[#202533] text-stone-300 text-xs font-medium border border-white/10 transition-colors cursor-pointer text-center"
                  >
                    Ask a Question
                  </button>
                </div>

                <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-stone-400" />
                  Free cancellation up to 4 hours before visit. Zero upfront fee required.
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State with Dark Card */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-serif text-white font-medium">
              Reservation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto font-light">
              We have reserved your consultation suite. An instant confirmation and appointment details have been dispatched to our WhatsApp concierge.
            </p>

            <div className="bg-[#181b26] border border-white/10 p-5 rounded-2xl text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Booking Reference:</span>
                <span className="font-mono font-bold text-amber-300">{confirmedAppt?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Patient:</span>
                <span className="font-semibold text-white">{confirmedAppt?.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Treatment:</span>
                <span className="font-semibold text-white">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Specialist:</span>
                <span className="font-semibold text-white">{selectedDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Date & Time:</span>
                <span className="font-semibold text-emerald-400">{confirmedAppt?.date} at {confirmedAppt?.timeSlot}</span>
              </div>
              {confirmedAppt?.hasAnxiety && (
                <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-medium">
                  🌿 Fear-Free Protocol activated for your suite.
                </div>
              )}
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  const msg = `Hello Botanica Dental, I would like to check on my booking #${confirmedAppt?.id} (${selectedService.name} on ${confirmedAppt?.date} at ${confirmedAppt?.timeSlot}).`;
                  openWhatsAppBooking(msg);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-semibold cursor-pointer shadow-md shadow-emerald-950/40 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat on WhatsApp: {CLINIC_PHONE_NUMBER}</span>
              </button>

              <a
                href={CLINIC_CALL_URL}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {CLINIC_PHONE_NUMBER}</span>
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs sm:text-sm font-medium cursor-pointer"
              >
                Done
              </motion.button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
