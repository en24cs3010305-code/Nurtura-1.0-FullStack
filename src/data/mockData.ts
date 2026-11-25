import {
  User,
  Baby,
  FeedingLog,
  SleepLog,
  DiaperLog,
  GrowthRecord,
  Vaccination,
  Milestone,
  MedicationReminder,
  Appointment,
  ClinicalSoapNote,
  Prescription,
  FamilyAccessMember,
  NotificationItem,
  AdminStats,
  AuditLog,
  SupportRequest
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-parent-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    role: 'parent',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    createdAt: '2026-01-15T08:00:00Z',
    parentDetails: {
      relationship: 'Mother',
      address: '742 Evergreen Terrace, Springfield',
      emergencyContact: '+1 (555) 987-6543'
    }
  },
  {
    id: 'user-doctor-1',
    name: 'Dr. Ananya Sharma',
    email: 'dr.ananya@nurturacare.com',
    role: 'doctor',
    phone: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    createdAt: '2025-11-10T10:30:00Z',
    doctorDetails: {
      qualification: 'MD, DCH (Pediatrics), FAAP',
      registrationNumber: 'MED-REG-847291',
      specialization: 'Neonatology & Child Developmental Health',
      yearsOfExperience: 12,
      clinicOrHospital: 'Blossom Children’s Hospital & Care Clinic',
      verificationStatus: 'approved',
      documentName: 'medical_license_ananya_sharma.pdf',
      bio: 'Board-certified pediatrician passionate about early infant developmental milestones, nutritional guidance, and proactive family-centered care.'
    }
  },
  {
    id: 'user-doctor-pending',
    name: 'Dr. Marcus Vance',
    email: 'marcus.vance@pediatrix.org',
    role: 'doctor',
    phone: '+1 (555) 432-1098',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    createdAt: '2026-11-18T14:20:00Z',
    doctorDetails: {
      qualification: 'MBBS, MD (Pediatrics)',
      registrationNumber: 'MED-REG-991204',
      specialization: 'General Pediatrics',
      yearsOfExperience: 6,
      clinicOrHospital: 'City General Pediatric Care',
      verificationStatus: 'pending',
      documentName: 'vance_board_cert_2026.pdf'
    }
  },
  {
    id: 'user-admin-1',
    name: 'Admin Coordinator',
    email: 'admin@nurtura.app',
    role: 'admin',
    phone: '+1 (555) 000-1122',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    createdAt: '2025-08-01T09:00:00Z'
  }
];

export const mockBabies: Baby[] = [
  {
    id: 'baby-1',
    parentId: 'user-parent-1',
    name: 'Aarav Sharma',
    gender: 'male',
    dateOfBirth: '2026-05-15',
    ageText: '6 months old',
    bloodGroup: 'O+',
    birthWeightKg: 3.3,
    birthHeightCm: 50.0,
    headCircumferenceCm: 35.0,
    currentWeightKg: 7.8,
    currentHeightCm: 67.5,
    allergies: ['None identified yet'],
    medicalHistory: ['Mild jaundice at 4 days (resolved with phototherapy)'],
    avatarUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=256',
    pediatricianName: 'Dr. Ananya Sharma',
    emergencyContact: {
      name: 'David Jenkins (Father)',
      relationship: 'Father',
      phone: '+1 (555) 987-6543'
    }
  },
  {
    id: 'baby-2',
    parentId: 'user-parent-1',
    name: 'Tara Sharma',
    gender: 'female',
    dateOfBirth: '2024-10-20',
    ageText: '2 years 1 month old',
    bloodGroup: 'A+',
    birthWeightKg: 3.1,
    birthHeightCm: 48.5,
    headCircumferenceCm: 34.2,
    currentWeightKg: 12.4,
    currentHeightCm: 88.0,
    allergies: ['Peanuts (Mild skin reaction)'],
    medicalHistory: ['Viral broncholitis at 10 months (fully recovered)'],
    avatarUrl: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=256',
    pediatricianName: 'Dr. Ananya Sharma',
    emergencyContact: {
      name: 'David Jenkins (Father)',
      relationship: 'Father',
      phone: '+1 (555) 987-6543'
    }
  }
];

export const mockFeedingLogs: FeedingLog[] = [
  {
    id: 'feed-1',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '07:30',
    type: 'breast',
    durationMinutes: 20,
    side: 'both',
    notes: 'Fed calmly, latched well',
    loggedBy: 'Sarah'
  },
  {
    id: 'feed-2',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '10:45',
    type: 'expressed',
    quantityMl: 150,
    notes: 'Bottle fed without reflux',
    loggedBy: 'David'
  },
  {
    id: 'feed-3',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '13:30',
    type: 'breast',
    durationMinutes: 18,
    side: 'left',
    notes: 'Good appetite after nap',
    loggedBy: 'Sarah'
  },
  {
    id: 'feed-4',
    babyId: 'baby-1',
    date: '2026-11-20',
    time: '19:15',
    type: 'formula',
    quantityMl: 160,
    notes: 'Evening formula feed before bed routine',
    loggedBy: 'Sarah'
  },
  {
    id: 'feed-5',
    babyId: 'baby-1',
    date: '2026-11-20',
    time: '16:00',
    type: 'breast',
    durationMinutes: 15,
    side: 'right',
    notes: 'Quick afternoon nursing session',
    loggedBy: 'Sarah'
  }
];

export const mockSleepLogs: SleepLog[] = [
  {
    id: 'sleep-1',
    babyId: 'baby-1',
    date: '2026-11-21',
    startTime: '08:45',
    endTime: '10:15',
    durationMinutes: 90,
    type: 'nap',
    quality: 'peaceful',
    notes: 'Morning nap in crib'
  },
  {
    id: 'sleep-2',
    babyId: 'baby-1',
    date: '2026-11-21',
    startTime: '14:00',
    endTime: '15:30',
    durationMinutes: 90,
    type: 'nap',
    quality: 'peaceful',
    notes: 'Afternoon nap with white noise'
  },
  {
    id: 'sleep-3',
    babyId: 'baby-1',
    date: '2026-11-20',
    startTime: '20:30',
    endTime: '06:45',
    durationMinutes: 615,
    type: 'night',
    quality: 'peaceful',
    notes: 'Slept through with one brief feeding stir at 2 AM'
  }
];

export const mockDiaperLogs: DiaperLog[] = [
  {
    id: 'diaper-1',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '08:15',
    type: 'wet',
    notes: 'Normal morning wet diaper'
  },
  {
    id: 'diaper-2',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '11:00',
    type: 'mixed',
    color: 'Mustard yellow',
    notes: 'Normal consistency'
  },
  {
    id: 'diaper-3',
    babyId: 'baby-1',
    date: '2026-11-21',
    time: '14:00',
    type: 'wet',
    notes: 'Light wet diaper'
  },
  {
    id: 'diaper-4',
    babyId: 'baby-1',
    date: '2026-11-20',
    time: '17:30',
    type: 'dirty',
    color: 'Yellow-brown',
    notes: 'Healthy consistency'
  }
];

export const mockGrowthRecords: GrowthRecord[] = [
  {
    id: 'growth-0',
    babyId: 'baby-1',
    date: '2026-05-15',
    ageInMonths: 0,
    weightKg: 3.3,
    heightCm: 50.0,
    headCircumferenceCm: 35.0,
    percentileWeight: 50,
    percentileHeight: 52,
    notes: 'Birth measurement'
  },
  {
    id: 'growth-1',
    babyId: 'baby-1',
    date: '2026-06-15',
    ageInMonths: 1,
    weightKg: 4.3,
    heightCm: 54.2,
    headCircumferenceCm: 37.2,
    percentileWeight: 52,
    percentileHeight: 53,
    notes: '1-month pediatric checkup'
  },
  {
    id: 'growth-2',
    babyId: 'baby-1',
    date: '2026-07-15',
    ageInMonths: 2,
    weightKg: 5.4,
    heightCm: 57.8,
    headCircumferenceCm: 39.0,
    percentileWeight: 54,
    percentileHeight: 55,
    notes: 'Healthy consistent weight velocity'
  },
  {
    id: 'growth-3',
    babyId: 'baby-1',
    date: '2026-09-15',
    ageInMonths: 4,
    weightKg: 6.8,
    heightCm: 63.5,
    headCircumferenceCm: 41.5,
    percentileWeight: 55,
    percentileHeight: 56,
    notes: '4-month routine evaluation'
  },
  {
    id: 'growth-4',
    babyId: 'baby-1',
    date: '2026-11-15',
    ageInMonths: 6,
    weightKg: 7.8,
    heightCm: 67.5,
    headCircumferenceCm: 43.2,
    percentileWeight: 56,
    percentileHeight: 58,
    notes: '6-month well-child visit. Ready for complementary solid foods intro.'
  }
];

// WHO Growth Reference percentiles for boys (0-12 months) for interactive Recharts comparison
export const whoGrowthStandardsBoys = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4, babyWeight: 3.3 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8, babyWeight: 4.3 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1, babyWeight: 5.4 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0, babyWeight: 6.1 },
  { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7, babyWeight: 6.8 },
  { month: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3, babyWeight: 7.3 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8, babyWeight: 7.8 },
  { month: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3 },
  { month: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7 },
  { month: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 11.0 },
  { month: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4 },
  { month: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 }
];

export const mockVaccinations: Vaccination[] = [
  {
    id: 'vac-1',
    babyId: 'baby-1',
    vaccineName: 'BCG (Bacillus Calmette-Guérin)',
    diseaseTarget: 'Tuberculosis',
    recommendedAgeMonths: 0,
    recommendedAgeLabel: 'At birth',
    dueDate: '2026-05-15',
    administeredDate: '2026-05-16',
    status: 'completed',
    batchNumber: 'BCG-2026-90',
    clinicName: 'St. Mary Maternity Wing',
    administeredBy: 'Nurse R. Miller'
  },
  {
    id: 'vac-2',
    babyId: 'baby-1',
    vaccineName: 'Hepatitis B (Dose 1)',
    diseaseTarget: 'Hepatitis B Virus',
    recommendedAgeMonths: 0,
    recommendedAgeLabel: 'At birth',
    dueDate: '2026-05-15',
    administeredDate: '2026-05-16',
    status: 'completed',
    batchNumber: 'HEP-5521',
    clinicName: 'St. Mary Maternity Wing'
  },
  {
    id: 'vac-3',
    babyId: 'baby-1',
    vaccineName: 'DTaP-IPV-Hib-HepB (6-in-1 Dose 1)',
    diseaseTarget: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B',
    recommendedAgeMonths: 2,
    recommendedAgeLabel: '2 Months',
    dueDate: '2026-07-15',
    administeredDate: '2026-07-16',
    status: 'completed',
    batchNumber: 'HEXA-8832',
    clinicName: 'Blossom Pediatric Clinic',
    administeredBy: 'Dr. Ananya Sharma'
  },
  {
    id: 'vac-4',
    babyId: 'baby-1',
    vaccineName: 'Rotavirus Vaccine (Dose 1)',
    diseaseTarget: 'Rotavirus Gastroenteritis',
    recommendedAgeMonths: 2,
    recommendedAgeLabel: '2 Months',
    dueDate: '2026-07-15',
    administeredDate: '2026-07-16',
    status: 'completed',
    batchNumber: 'ROTA-4410'
  },
  {
    id: 'vac-5',
    babyId: 'baby-1',
    vaccineName: 'Pneumococcal Conjugate (PCV Dose 1)',
    diseaseTarget: 'Pneumococcal Disease & Meningitis',
    recommendedAgeMonths: 2,
    recommendedAgeLabel: '2 Months',
    dueDate: '2026-07-15',
    administeredDate: '2026-07-16',
    status: 'completed',
    batchNumber: 'PCV-13-90'
  },
  {
    id: 'vac-6',
    babyId: 'baby-1',
    vaccineName: 'DTaP-IPV-Hib-HepB (6-in-1 Dose 2)',
    diseaseTarget: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B',
    recommendedAgeMonths: 4,
    recommendedAgeLabel: '4 Months',
    dueDate: '2026-09-15',
    administeredDate: '2026-09-17',
    status: 'completed',
    batchNumber: 'HEXA-9102'
  },
  {
    id: 'vac-7',
    babyId: 'baby-1',
    vaccineName: 'Rotavirus Vaccine (Dose 2)',
    diseaseTarget: 'Rotavirus Gastroenteritis',
    recommendedAgeMonths: 4,
    recommendedAgeLabel: '4 Months',
    dueDate: '2026-09-15',
    administeredDate: '2026-09-17',
    status: 'completed'
  },
  {
    id: 'vac-8',
    babyId: 'baby-1',
    vaccineName: 'DTaP-IPV-Hib-HepB (6-in-1 Dose 3)',
    diseaseTarget: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B',
    recommendedAgeMonths: 6,
    recommendedAgeLabel: '6 Months',
    dueDate: '2026-11-28',
    status: 'upcoming',
    notes: 'Scheduled with Dr. Sharma next week'
  },
  {
    id: 'vac-9',
    babyId: 'baby-1',
    vaccineName: 'Influenza (Annual Seasonal Dose 1)',
    diseaseTarget: 'Influenza virus',
    recommendedAgeMonths: 6,
    recommendedAgeLabel: '6 Months',
    dueDate: '2026-11-28',
    status: 'upcoming'
  },
  {
    id: 'vac-10',
    babyId: 'baby-1',
    vaccineName: 'MMR (Measles, Mumps, Rubella Dose 1)',
    diseaseTarget: 'Measles, Mumps, Rubella',
    recommendedAgeMonths: 12,
    recommendedAgeLabel: '12 Months',
    dueDate: '2027-05-15',
    status: 'pending'
  }
];

export const mockMilestones: Milestone[] = [
  {
    id: 'mile-1',
    babyId: 'baby-1',
    title: 'Social Smiling',
    description: 'Smiles spontaneously, especially at people and familiar voices',
    category: 'social_emotional',
    expectedAgeMonths: 2,
    achievedDate: '2026-07-04',
    status: 'achieved',
    notes: 'Smiled warmly at mom and dad during morning song'
  },
  {
    id: 'mile-2',
    babyId: 'baby-1',
    title: 'Steady Head Control',
    description: 'Holds head steady without support when held in an upright position',
    category: 'motor',
    expectedAgeMonths: 4,
    achievedDate: '2026-09-10',
    status: 'achieved'
  },
  {
    id: 'mile-3',
    babyId: 'baby-1',
    title: 'Rolling Over (Tummy to Back)',
    description: 'Can roll from tummy to back independently during floor play',
    category: 'motor',
    expectedAgeMonths: 5,
    achievedDate: '2026-10-18',
    status: 'achieved'
  },
  {
    id: 'mile-4',
    babyId: 'baby-1',
    title: 'Babbling & Vocal Play',
    description: 'Makes sounds like "ba-ba", "da-da", and responds to sounds with vocalizations',
    category: 'communication',
    expectedAgeMonths: 6,
    achievedDate: '2026-11-12',
    status: 'achieved'
  },
  {
    id: 'mile-5',
    babyId: 'baby-1',
    title: 'Sitting Without Support',
    description: 'Sits briefly without hand support and reaches for toys',
    category: 'motor',
    expectedAgeMonths: 6,
    status: 'emerging',
    notes: 'Balances with tripod hands support, getting stronger daily'
  },
  {
    id: 'mile-6',
    babyId: 'baby-1',
    title: 'Object Permanence Search',
    description: 'Looks for a toy or object that falls out of sight',
    category: 'cognitive',
    expectedAgeMonths: 7,
    status: 'emerging'
  },
  {
    id: 'mile-7',
    babyId: 'baby-1',
    title: 'Crawling Forward',
    description: 'Moves forward on tummy or hands and knees',
    category: 'motor',
    expectedAgeMonths: 8,
    status: 'not_yet'
  },
  {
    id: 'mile-8',
    babyId: 'baby-1',
    title: 'First Meaningful Words',
    description: 'Uses words like "Mama" or "Dada" specifically for parents',
    category: 'communication',
    expectedAgeMonths: 10,
    status: 'not_yet'
  }
];

export const mockMedicationReminders: MedicationReminder[] = [
  {
    id: 'med-1',
    babyId: 'baby-1',
    medicineName: 'Vitamin D3 Pediatric Drops',
    dosage: '400 IU (1 ml)',
    frequency: 'Once daily',
    instructions: 'Administer directly into mouth or mix with a small feed in the morning',
    startDate: '2026-05-20',
    endDate: '2027-05-20',
    reminderTimes: ['09:00'],
    status: 'active'
  },
  {
    id: 'med-2',
    babyId: 'baby-1',
    medicineName: 'Saline Nasal Drops',
    dosage: '2 drops per nostril',
    frequency: 'As needed before sleep',
    instructions: 'Apply gently if nasal congestion occurs before naps',
    startDate: '2026-11-10',
    endDate: '2026-11-25',
    reminderTimes: ['19:30'],
    status: 'active'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    babyId: 'baby-1',
    babyName: 'Aarav Sharma',
    parentId: 'user-parent-1',
    parentName: 'Sarah Jenkins',
    doctorId: 'user-doctor-1',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Neonatology & Pediatrics',
    date: '2026-11-28',
    time: '10:30 AM',
    status: 'confirmed',
    type: 'in-person',
    reason: '6-Month Well-Baby Health & Vaccination Checkup',
    clinicAddress: 'Blossom Pediatric Clinic, Suite 402, Medical Arts Building'
  },
  {
    id: 'apt-2',
    babyId: 'baby-1',
    babyName: 'Aarav Sharma',
    parentId: 'user-parent-1',
    parentName: 'Sarah Jenkins',
    doctorId: 'user-doctor-1',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Neonatology & Pediatrics',
    date: '2026-09-15',
    time: '02:00 PM',
    status: 'completed',
    type: 'in-person',
    reason: '4-Month Routine Vaccination & Growth Assessment',
    notes: 'Growth is steady along the 55th percentile. All reflexes normal.'
  },
  {
    id: 'apt-3',
    babyId: 'baby-2',
    babyName: 'Tara Sharma',
    parentId: 'user-parent-1',
    parentName: 'Sarah Jenkins',
    doctorId: 'user-doctor-1',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Neonatology & Pediatrics',
    date: '2026-12-05',
    time: '11:15 AM',
    status: 'requested',
    type: 'video',
    reason: 'Routine 2-Year Toddler Nutrition & Speech Review'
  }
];

export const mockClinicalNotes: ClinicalSoapNote[] = [
  {
    id: 'soap-1',
    babyId: 'baby-1',
    babyName: 'Aarav Sharma',
    doctorId: 'user-doctor-1',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-15',
    subjective: 'Parent reports baby is smiling, rolling from tummy to back, and feeding well on breastmilk. Sleeping stretches of 6-7 hours at night without distress.',
    objective: 'Weight: 6.8 kg (55th percentile). Height: 63.5 cm. Anterior fontanelle flat and soft. Heart: regular rate, no murmurs. Lungs clear to auscultation bilaterally. Abdomen soft, non-tender.',
    assessment: 'Healthy 4-month-old infant meeting age-appropriate physical and developmental milestones appropriately. No acute concerns.',
    plan: '1. Administer scheduled 4-month immunizations (DTaP-IPV-Hib-HepB, Rotavirus Dose 2).\n2. Continue daily Vitamin D3 400 IU.\n3. Discussed tummy time safety and safe sleep practices.\n4. Return in 2 months for 6-month checkup and introduction of solid foods.',
    signed: true
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    babyId: 'baby-1',
    babyName: 'Aarav Sharma',
    doctorId: 'user-doctor-1',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-15',
    medicines: [
      {
        name: 'Cholecalciferol (Vitamin D3) Infant Drops',
        dosage: '400 IU (1 ml)',
        frequency: 'Once a day',
        duration: 'Ongoing until 12 months',
        instructions: 'Give orally after morning feed'
      },
      {
        name: 'Purified Saline Nasal Spray',
        dosage: '1 spray each nostril',
        frequency: 'As needed',
        duration: '10 days',
        instructions: 'Use gently before feedings if congestion is observed'
      }
    ],
    doctorSignatureRequired: false,
    notes: 'Prescribed during routine 4-month assessment'
  }
];

export const mockFamilyMembers: FamilyAccessMember[] = [
  {
    id: 'fam-1',
    parentId: 'user-parent-1',
    name: 'David Jenkins',
    email: 'david.j@example.com',
    relationship: 'Father',
    accessType: 'daily_logging',
    status: 'active',
    invitedAt: '2026-05-18'
  },
  {
    id: 'fam-2',
    parentId: 'user-parent-1',
    name: 'Eleanor Jenkins',
    email: 'eleanor.grandma@example.com',
    relationship: 'Grandmother',
    accessType: 'view_only',
    status: 'active',
    invitedAt: '2026-06-01'
  },
  {
    id: 'fam-3',
    parentId: 'user-parent-1',
    name: 'Maria Santos',
    email: 'maria.santos@careangels.com',
    relationship: 'Nanny / Caregiver',
    accessType: 'limited_caregiver',
    status: 'invited',
    invitedAt: '2026-11-19'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-parent-1',
    title: 'Upcoming Vaccination Due',
    message: 'Aarav is due for 6-month immunizations on Nov 28. Dr. Sharma appointment is confirmed.',
    type: 'vaccination',
    read: false,
    timestamp: '2 hours ago',
    link: '/parent/vaccinations'
  },
  {
    id: 'notif-2',
    userId: 'user-parent-1',
    title: 'Medication Reminder',
    message: 'Time for Aarav’s morning Vitamin D3 drops (400 IU).',
    type: 'medication',
    read: false,
    timestamp: '5 hours ago',
    link: '/parent/medications'
  },
  {
    id: 'notif-3',
    userId: 'user-parent-1',
    title: 'Appointment Confirmed',
    message: 'Dr. Ananya Sharma confirmed your in-person visit on Nov 28 at 10:30 AM.',
    type: 'appointment',
    read: true,
    timestamp: '1 day ago',
    link: '/parent/appointments'
  },
  {
    id: 'notif-4',
    userId: 'user-parent-1',
    title: 'Milestone Observation',
    message: 'Aarav achieved "Babbling & Vocal Play" milestone recently!',
    type: 'health_alert',
    read: true,
    timestamp: '3 days ago',
    link: '/parent/milestones'
  }
];

export const mockAdminStats: AdminStats = {
  totalUsers: 2480,
  totalParents: 2190,
  verifiedDoctors: 185,
  pendingDoctors: 14,
  babyProfiles: 2840,
  totalAppointments: 4620,
  activeAccounts: 2410,
  suspendedAccounts: 8
};

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'user-admin-1',
    userName: 'Admin Coordinator',
    role: 'admin',
    action: 'DOCTOR_VERIFIED',
    target: 'Dr. Ananya Sharma (MED-REG-847291)',
    timestamp: '2026-11-20 16:45:10',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'log-2',
    userId: 'user-doctor-1',
    userName: 'Dr. Ananya Sharma',
    role: 'doctor',
    action: 'SOAP_NOTE_CREATED',
    target: 'Patient: Aarav Sharma (baby-1)',
    timestamp: '2026-11-20 14:12:05',
    ipAddress: '172.16.0.88'
  },
  {
    id: 'log-3',
    userId: 'user-parent-1',
    userName: 'Sarah Jenkins',
    role: 'parent',
    action: 'FAMILY_INVITE_SENT',
    target: 'maria.santos@careangels.com',
    timestamp: '2026-11-19 11:30:22',
    ipAddress: '10.0.0.12'
  },
  {
    id: 'log-4',
    userId: 'user-admin-1',
    userName: 'Admin Coordinator',
    role: 'admin',
    action: 'SYSTEM_SETTINGS_UPDATE',
    target: 'Security Policy: Session Expiry to 24h',
    timestamp: '2026-11-18 09:15:00',
    ipAddress: '192.168.1.45'
  }
];

export const mockSupportRequests: SupportRequest[] = [
  {
    id: 'sup-1',
    userId: 'user-doctor-pending',
    userName: 'Dr. Marcus Vance',
    role: 'doctor',
    subject: 'Verification Document Clarification',
    status: 'open',
    priority: 'medium',
    createdAt: '2026-11-20 10:15',
    message: 'I have uploaded my pediatric council certificate. Please confirm if hospital affiliation letter is also needed.'
  },
  {
    id: 'sup-2',
    userId: 'user-parent-1',
    userName: 'Sarah Jenkins',
    role: 'parent',
    subject: 'Exporting PDF Growth Report for Daycare',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-11-15 14:20',
    message: 'How can I print the vaccination history report with doctor signatures?'
  }
];

export const mockDoctorPatients = [
  {
    baby: mockBabies[0],
    parent: mockUsers[0],
    lastVisit: '2026-09-15',
    nextAppointment: '2026-11-28',
    status: 'Active',
    primaryNotes: 'Growing well along 55th percentile. Compliant with immunizations.'
  },
  {
    baby: mockBabies[1],
    parent: mockUsers[0],
    lastVisit: '2026-08-10',
    nextAppointment: '2026-12-05',
    status: 'Active',
    primaryNotes: 'Mild peanut skin sensitivity noted. Normal speech progress.'
  },
  {
    baby: {
      id: 'baby-3',
      parentId: 'user-parent-3',
      name: 'Liam Patel',
      gender: 'male' as const,
      dateOfBirth: '2026-08-01',
      ageText: '3.5 months old',
      bloodGroup: 'B+',
      birthWeightKg: 3.5,
      birthHeightCm: 51.0,
      headCircumferenceCm: 35.5,
      currentWeightKg: 6.2,
      currentHeightCm: 61.0,
      allergies: [],
      medicalHistory: ['Occasional mild colic in evening'],
      emergencyContact: {
        name: 'Priya Patel',
        relationship: 'Mother',
        phone: '+1 (555) 345-6789'
      }
    },
    parent: {
      id: 'user-parent-3',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      role: 'parent' as const,
      phone: '+1 (555) 345-6789',
      createdAt: '2026-08-05'
    },
    lastVisit: '2026-10-10',
    nextAppointment: '2026-12-02',
    status: 'Active',
    primaryNotes: 'Colic managed through burping techniques. Normal tone.'
  }
];
