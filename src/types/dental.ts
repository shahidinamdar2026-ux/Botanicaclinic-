export type ServiceCategory = 'all' | 'preventive' | 'cosmetic' | 'ortho' | 'restorative' | 'pediatric';

export interface DentalService {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  durationMinutes: number;
  startingPrice: number;
  painLevel: 'Painless' | 'Very Mild' | 'Local Anesthesia Provided';
  recommendedFor: string;
  features: string[];
}

export interface Dentist {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  avatar: string;
  daysAvailable: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  email?: string;
  phone: string;
  serviceId: string;
  dentistId: string;
  date: string;
  timeSlot: string;
  hasAnxiety: boolean;
  notes?: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface SmileTransformation {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  description: string;
  dentistName: string;
  tag: string;
}
