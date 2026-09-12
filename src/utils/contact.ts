/**
 * Contact and Booking Utilities for Botanica Dental Clinic
 * Phone & WhatsApp: 7378671779
 */

export const CLINIC_PHONE_NUMBER = '7378671779';
export const CLINIC_PHONE_FORMATTED = '+91 7378671779';
export const CLINIC_CALL_URL = 'tel:+917378671779';

export const getWhatsAppUrl = (customMessage?: string): string => {
  const defaultMessage = 'Hello, I would like to book an appointment at Botanica Dental Clinic.';
  const message = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/917378671779?text=${message}`;
};

export const openWhatsAppBooking = (customMessage?: string): void => {
  const url = getWhatsAppUrl(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openPhoneCall = (): void => {
  window.location.href = CLINIC_CALL_URL;
};
