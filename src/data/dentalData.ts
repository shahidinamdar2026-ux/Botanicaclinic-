import { DentalService, Dentist, SmileTransformation } from '../types/dental';

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: 'checkup-clean',
    name: 'Comprehensive Exam & Ultrasonic Scaling',
    category: 'preventive',
    tagline: 'Gentle biofilm removal and full digital diagnostics',
    description: 'A soothing preventative session including low-radiation 3D intraoral scans, gentle ultrasonic plaque scaling, airflow stain polish, and enamel remineralization therapy.',
    durationMinutes: 45,
    startingPrice: 500,
    painLevel: 'Painless',
    recommendedFor: 'Routine 6-month checkup, bad breath prevention, and gum health.',
    features: ['Low-dose digital radiographs', 'Airflow salt-micro polishing', 'Individual gum depth charting', 'Fluoride lacquer seal']
  },
  {
    id: 'laser-whitening',
    name: 'Botanical Zoom Laser Whitening',
    category: 'cosmetic',
    tagline: 'Lift stains up to 8 shades in a single relaxing hour',
    description: 'Advanced in-chair cold-light laser activation paired with soothing botanical desensitizing serums. Designed specifically for sensitive teeth to deliver naturally brilliant radiance.',
    durationMinutes: 60,
    startingPrice: 3500,
    painLevel: 'Painless',
    recommendedFor: 'Coffee, tea, or smoking stains; wedding or event preparation.',
    features: ['Instant results in 1 visit', 'Enamel-safe pH neutral gel', 'Custom home maintenance tray included', 'Anti-sensitivity potassium nitrate prep']
  },
  {
    id: 'porcelain-veneers',
    name: 'Artisan Ceramic Veneers & Smile Design',
    category: 'cosmetic',
    tagline: 'Precision hand-layered ultra-thin porcelain veneers',
    description: 'Digital Smile Design (DSD) simulation allowing you to preview your bespoke smile before minimal enamel preparation. Individually shaded by master ceramists to mimic natural translucency.',
    durationMinutes: 90,
    startingPrice: 7500,
    painLevel: 'Painless',
    recommendedFor: 'Crooked, discolored, uneven, worn, or chipped front teeth.',
    features: ['3D digital preview mock-up', 'Ultra-thin 0.3mm preparation', 'Stain-resistant high-grade ceramic', '10-year clinic warranty']
  },
  {
    id: 'clear-aligners',
    name: 'Clear Aligners & Invisalign® Diamond',
    category: 'ortho',
    tagline: 'Discreet orthodontic correction for adults and teens',
    description: 'Custom transparent aligners engineered with SmartTrack material. Straighten teeth comfortably without uncomfortable metal brackets or dietary restrictions.',
    durationMinutes: 40,
    startingPrice: 35000,
    painLevel: 'Very Mild',
    recommendedFor: 'Crowded teeth, gaps, overbites, underbites, and relapse.',
    features: ['Virtually invisible wear', 'iTero 5D outcome simulator', 'Fewer clinic visits needed', 'Complimentary retainers included']
  },
  {
    id: 'dental-implants',
    name: 'Guided 3D Titanium Dental Implants',
    category: 'restorative',
    tagline: 'Permanent, life-like tooth replacement with bone preservation',
    description: 'Computer-guided surgical placement of medical-grade titanium roots topped with handcrafted zirconia crowns. Feels, bites, and looks exactly like your natural tooth.',
    durationMinutes: 75,
    startingPrice: 18500,
    painLevel: 'Local Anesthesia Provided',
    recommendedFor: 'Single missing tooth, multiple teeth loss, or replacing loose dentures.',
    features: ['CBCT 3D guided precision', 'Lifetime implant body guarantee', 'Same-day temporary tooth options', 'Sedation comfort available']
  },
  {
    id: 'pediatric-care',
    name: 'Gentle Kids Dental Sanctuary',
    category: 'pediatric',
    tagline: 'Anxiety-free, magical introductory visits for little smiles',
    description: 'Designed to turn dental visits into positive adventures. Includes fun bubble-gum cleanings, tooth decay defense varnishes, space maintenance, and happy-gas comfort if requested.',
    durationMinutes: 35,
    startingPrice: 400,
    painLevel: 'Painless',
    recommendedFor: 'Children aged 1 to 14, first-time visits, cavity prevention.',
    features: ['Child psychologist-approved rapport', 'No-needle painless anesthesia wand', 'Ceiling screen cartoons & noise-cancelling headphones', 'Toy treasure chest reward']
  },
  {
    id: 'root-canal-therapy',
    name: 'Microscopic Endodontic Care (Root Canal)',
    category: 'restorative',
    tagline: 'Save your natural tooth with painless microscope precision',
    description: 'Gentle removal of infected pulp tissue using German Zeiss operating microscopes and rotary thermal obturation. Relieves throbbing ache instantly and protects tooth longevity.',
    durationMinutes: 60,
    startingPrice: 2500,
    painLevel: 'Painless',
    recommendedFor: 'Severe toothaches, deep cavities, abscesses, or trauma.',
    features: ['Zeiss 25x surgical magnification', 'Rotary nickel-titanium instrumentation', 'Single-visit completion in 90% cases', 'Immediate ache alleviation']
  }
];

export const DENTISTS: Dentist[] = [
  {
    id: 'dr-cheryl-tan',
    name: 'Dr. Cheryl Tan',
    title: 'Clinical Director & Aesthetic Dentist',
    degrees: 'BDS, MDS Aesthetic Dentistry (King\'s College London)',
    specialty: 'Smile Design, Porcelain Veneers, Full Mouth Rehabilitation',
    experienceYears: 14,
    bio: 'Renowned for her gentle touch and artistic eye, Dr. Tan combines international dental aesthetic training with botanical calm to make smile transformations effortless and serene in Narayangaon, Pune.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    daysAvailable: ['Monday', 'Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: 'dr-julian-rivera',
    name: 'Dr. Julian Rivera',
    title: 'Senior Specialist Orthodontist',
    degrees: 'BDS, MDS Orthodontics, Invisalign® Diamond Provider',
    specialty: 'Clear Aligners, Accelerated Orthodontics, Airway-Centric Care',
    experienceYears: 12,
    bio: 'Specializing in invisible orthodontics and facial symmetry, Dr. Rivera crafts harmonious, confidence-boosting smiles for patients across Pune district.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    daysAvailable: ['Tuesday', 'Wednesday', 'Friday', 'Saturday']
  },
  {
    id: 'dr-meng-to',
    name: 'Dr. Meng To',
    title: 'Restorative & Implant Specialist',
    degrees: 'BDS, MDS (Oral Surgery & Implants), Dip. Implantology',
    specialty: 'Computer-Guided Implants, Micro-Restorations, Sedation Care',
    experienceYears: 16,
    bio: 'Pioneer of minimally invasive surgical protocols in Pune & Maharashtra. Believes that modern dental care should feel as calming as an art studio, eliminating patient fear entirely.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    daysAvailable: ['Monday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'dr-aileen-vance',
    name: 'Dr. Aileen Vance',
    title: 'Pediatric Dental Specialist',
    degrees: 'BDS, MDS Paediatric & Preventive Dentistry',
    specialty: 'Child Behavioral Dentistry, Early Orthodontics, Preventive Varnishes',
    experienceYears: 9,
    bio: 'Warm, patient, and beloved by anxious children. Dr. Vance creates unforgettable positive memories so children grow up loving visits to the dentist.',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ee0e50058e57?auto=format&fit=crop&w=400&q=80',
    daysAvailable: ['Monday', 'Wednesday', 'Saturday', 'Sunday']
  }
];

export const SMILE_TRANSFORMATIONS: SmileTransformation[] = [
  {
    id: 't-1',
    title: 'Natural Radiance Veneers',
    treatment: '8 Handcrafted Porcelain Veneers',
    duration: '2 appointments over 10 days',
    description: 'Patient presented with tetracycline discoloration and enamel chipping. Custom shaded in Bleach-3 with translucent incisal edges for a youthful, natural radiance.',
    dentistName: 'Dr. Cheryl Tan',
    tag: 'Cosmetic Veneers'
  },
  {
    id: 't-2',
    title: 'Discreet Overbite Correction',
    treatment: 'Invisalign® Diamond Express Aligners',
    duration: '7 months active wear',
    description: 'Severe crowding and deep anterior bite resolved completely without extractions, creating a broader, balanced smile arc.',
    dentistName: 'Dr. Julian Rivera',
    tag: 'Clear Aligners'
  },
  {
    id: 't-3',
    title: 'Single Day Implant Restoration',
    treatment: 'Immediate Guided Titanium Implant + Zirconia Crown',
    duration: '1 primary visit + final polish',
    description: 'Replaced a fractured central incisor following a sports injury. Guided 3D placement achieved immediate gingival preservation and zero patient downtime.',
    dentistName: 'Dr. Meng To',
    tag: 'Restorative Implant'
  }
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Claire Kensington',
    role: 'Architect & Patient for 4 Years',
    quote: 'I had severe dental phobia since childhood. Botanica Dental changed everything. From the gentle herbal mist and noise-cancelling headphones to Dr. Tan\'s soothing bedside manner, I never felt a trace of discomfort.',
    rating: 5,
    treatment: 'Veneers & Regular Preventative Care'
  },
  {
    id: 'rev-2',
    name: 'Marcus Wee',
    role: 'Tech Founder',
    quote: 'Invisalign with Dr. Julian was completely frictionless. The 3D simulator showed me the finish line before we even began, and my smile is now totally transformed without anyone noticing I wore aligners.',
    rating: 5,
    treatment: 'Invisalign Clear Aligners'
  },
  {
    id: 'rev-3',
    name: 'Sarah & Noah (age 6)',
    role: 'Mother & Son',
    quote: 'My 6-year-old son actually asks when he can go back to Dr. Vance! The clinic feels like a botanical sanctuary with cartoons on the ceiling, zero needle sights, and incredible warmth.',
    rating: 5,
    treatment: 'Pediatric Dentistry'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Do your dental treatments hurt?',
    a: 'Not at all. We specialize in fear-free and pain-free dentistry. We utilize painless computer-assisted local anesthesia wands (which eliminate the sting of traditional needles), gentle ultrasonic airflow tools, and optional nitrous oxide (happy gas) or twilight sedation for anxious patients.'
  },
  {
    q: 'Do you accept corporate insurance and dental benefits?',
    a: 'Yes, we are accredited with major insurers including AIA, Bupa, Cigna, Great Eastern, AXA, and corporate direct-billing networks. We provide itemized receipts and submit direct claims wherever applicable.'
  },
  {
    q: 'How fast can I get an appointment for dental emergencies?',
    a: 'We keep dedicated daily emergency slots reserved for severe toothache, chipped teeth, lost crowns, or accidental dental trauma. Call our emergency triage line directly for same-day relief.'
  },
  {
    q: 'What is the difference between composite bonding and porcelain veneers?',
    a: 'Composite bonding is sculpted directly in-chair in one session using aesthetic resin (great for minor chips and gaps, lasting 5–7 years). Porcelain veneers are custom kiln-crafted ceramic shells bonded to teeth that offer superior stain resistance, lifelike translucency, and last 15+ years.'
  },
  {
    q: 'How long does clear aligner (Invisalign) treatment take?',
    a: 'Most mild to moderate smile corrections take between 4 to 11 months. Complex bite adjustments take 12 to 18 months. During your first digital 3D scan, we show you the exact week-by-week timeline.'
  }
];
