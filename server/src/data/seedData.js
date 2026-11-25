import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Baby } from '../models/Baby.js';

export async function seedInitialData() {
  const store = getStore();

  if (store.users.length > 0) {
    return; // Already initialized
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  // 1. Initial Users
  store.users = [
    {
      id: 'usr_parent_sarah',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      password: passwordHash,
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
      id: 'usr_doctor_ananya',
      name: 'Dr. Ananya Sharma',
      email: 'dr.ananya@nurturacare.com',
      password: passwordHash,
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
      id: 'usr_admin',
      name: 'Platform Administrator',
      email: 'admin@nurtura.app',
      password: passwordHash,
      role: 'admin',
      phone: '+1 (555) 000-1122',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      createdAt: '2025-08-01T09:00:00Z'
    }
  ];

  // 2. Initial Babies
  store.babies = [
    {
      id: 'baby_aarav',
      parentId: 'usr_parent_sarah',
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
      medicalHistory: ['Mild neonatal jaundice (resolved)'],
      avatarUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=256',
      pediatricianName: 'Dr. Ananya Sharma',
      emergencyContact: {
        name: 'David Jenkins (Father)',
        relationship: 'Father',
        phone: '+1 (555) 987-6543'
      }
    },
    {
      id: 'baby_tara',
      parentId: 'usr_parent_sarah',
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
      medicalHistory: ['Viral bronchiolitis at 10 months (resolved)'],
      avatarUrl: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=256',
      pediatricianName: 'Dr. Ananya Sharma',
      emergencyContact: {
        name: 'David Jenkins (Father)',
        relationship: 'Father',
        phone: '+1 (555) 987-6543'
      }
    }
  ];

  // 3. Initial Feedings
  store.feedings = [
    {
      id: 'feed_1',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      time: '07:30',
      type: 'breast',
      durationMinutes: 20,
      side: 'both',
      notes: 'Fed calmly, latched well',
      loggedBy: 'Sarah'
    },
    {
      id: 'feed_2',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      time: '10:45',
      type: 'expressed',
      quantityMl: 150,
      notes: 'Bottle fed without reflux',
      loggedBy: 'David'
    },
    {
      id: 'feed_3',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      time: '13:30',
      type: 'breast',
      durationMinutes: 18,
      side: 'left',
      notes: 'Good appetite after nap',
      loggedBy: 'Sarah'
    }
  ];

  // 4. Initial Sleeps
  store.sleeps = [
    {
      id: 'sleep_1',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      startTime: '08:45',
      endTime: '10:15',
      durationMinutes: 90,
      type: 'nap',
      quality: 'peaceful',
      notes: 'Morning nap in crib'
    },
    {
      id: 'sleep_2',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      startTime: '14:00',
      endTime: '15:30',
      durationMinutes: 90,
      type: 'nap',
      quality: 'peaceful',
      notes: 'Afternoon nap with white noise'
    }
  ];

  // 5. Initial Diapers
  store.diapers = [
    {
      id: 'diaper_1',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      time: '08:15',
      type: 'wet',
      notes: 'Normal morning wet diaper'
    },
    {
      id: 'diaper_2',
      babyId: 'baby_aarav',
      date: '2026-11-21',
      time: '11:00',
      type: 'mixed',
      color: 'Mustard yellow',
      notes: 'Normal healthy consistency'
    }
  ];

  // 6. Growth Records
  store.growth = [
    {
      id: 'growth_0',
      babyId: 'baby_aarav',
      date: '2026-05-15',
      ageInMonths: 0,
      weightKg: 3.3,
      heightCm: 50.0,
      headCircumferenceCm: 35.0,
      percentileWeight: 50,
      percentileHeight: 52
    },
    {
      id: 'growth_1',
      babyId: 'baby_aarav',
      date: '2026-06-15',
      ageInMonths: 1,
      weightKg: 4.3,
      heightCm: 54.2,
      headCircumferenceCm: 37.2,
      percentileWeight: 52,
      percentileHeight: 53
    },
    {
      id: 'growth_2',
      babyId: 'baby_aarav',
      date: '2026-07-15',
      ageInMonths: 2,
      weightKg: 5.4,
      heightCm: 57.8,
      headCircumferenceCm: 39.0,
      percentileWeight: 54,
      percentileHeight: 55
    },
    {
      id: 'growth_4',
      babyId: 'baby_aarav',
      date: '2026-11-15',
      ageInMonths: 6,
      weightKg: 7.8,
      heightCm: 67.5,
      headCircumferenceCm: 43.2,
      percentileWeight: 56,
      percentileHeight: 58,
      notes: '6-month well-child visit. Thriving along 56th percentile.'
    }
  ];

  // 7. Vaccinations
  store.vaccinations = [
    {
      id: 'vac_1',
      babyId: 'baby_aarav',
      vaccineName: 'BCG (Bacillus Calmette-Guérin)',
      diseaseTarget: 'Tuberculosis',
      recommendedAgeMonths: 0,
      recommendedAgeLabel: 'At birth',
      dueDate: '2026-05-15',
      administeredDate: '2026-05-16',
      status: 'completed',
      batchNumber: 'BCG-2026-90',
      clinicName: 'St. Mary Maternity Wing'
    },
    {
      id: 'vac_2',
      babyId: 'baby_aarav',
      vaccineName: 'Hepatitis B (Dose 1)',
      diseaseTarget: 'Hepatitis B',
      recommendedAgeMonths: 0,
      recommendedAgeLabel: 'At birth',
      dueDate: '2026-05-15',
      administeredDate: '2026-05-16',
      status: 'completed'
    },
    {
      id: 'vac_8',
      babyId: 'baby_aarav',
      vaccineName: 'DTaP-IPV-Hib-HepB (6-in-1 Dose 3)',
      diseaseTarget: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B',
      recommendedAgeMonths: 6,
      recommendedAgeLabel: '6 Months',
      dueDate: '2026-11-28',
      status: 'upcoming'
    }
  ];

  // 8. Milestones
  store.milestones = [
    {
      id: 'mile_1',
      babyId: 'baby_aarav',
      title: 'Social Smiling',
      description: 'Smiles spontaneously at people and familiar voices',
      category: 'social_emotional',
      expectedAgeMonths: 2,
      achievedDate: '2026-07-04',
      status: 'achieved'
    },
    {
      id: 'mile_2',
      babyId: 'baby_aarav',
      title: 'Steady Head Control',
      description: 'Holds head steady without support when upright',
      category: 'motor',
      expectedAgeMonths: 4,
      achievedDate: '2026-09-10',
      status: 'achieved'
    },
    {
      id: 'mile_5',
      babyId: 'baby_aarav',
      title: 'Sitting with Tripod Support',
      description: 'Balances with hand support on floor play',
      category: 'motor',
      expectedAgeMonths: 6,
      status: 'emerging'
    }
  ];

  // 9. Medications
  store.medications = [
    {
      id: 'med_1',
      babyId: 'baby_aarav',
      medicineName: 'Vitamin D3 Pediatric Drops',
      dosage: '400 IU (1 ml)',
      frequency: 'Once daily',
      instructions: 'Administer directly into mouth or with feed in morning',
      startDate: '2026-05-20',
      endDate: '2027-05-20',
      reminderTimes: ['09:00'],
      status: 'active'
    }
  ];

  // 10. Appointments
  store.appointments = [
    {
      id: 'apt_1',
      babyId: 'baby_aarav',
      babyName: 'Aarav Sharma',
      parentId: 'usr_parent_sarah',
      parentName: 'Sarah Jenkins',
      doctorId: 'usr_doctor_ananya',
      doctorName: 'Dr. Ananya Sharma',
      specialization: 'Neonatology & Pediatrics',
      date: '2026-11-28',
      time: '10:30 AM',
      status: 'confirmed',
      type: 'in-person',
      reason: '6-Month Well-Baby Health & Vaccination Checkup',
      clinicAddress: 'Blossom Pediatric Clinic, Suite 402'
    }
  ];

  // 11. Family Members
  store.family = [
    {
      id: 'fam_1',
      parentId: 'usr_parent_sarah',
      name: 'David Jenkins',
      email: 'david.j@example.com',
      relationship: 'Father',
      accessType: 'daily_logging',
      status: 'active',
      invitedAt: '2026-05-18'
    }
  ];

  // 12. Notifications
  store.notifications = [
    {
      id: 'notif_1',
      userId: 'usr_parent_sarah',
      title: 'Upcoming Vaccination Due',
      message: 'Aarav is due for 6-month immunizations on Nov 28. Dr. Sharma appointment is confirmed.',
      type: 'vaccination',
      read: false,
      timestamp: '2 hours ago',
      link: '/parent/vaccinations'
    }
  ];

  // 13. Audit logs
  store.auditLogs = [
    {
      id: 'log_1',
      userId: 'usr_admin',
      userName: 'Platform Administrator',
      role: 'admin',
      action: 'SERVER_BOOTSTRAP',
      target: 'Nurtura 3.0 Real Backend Initialized',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '127.0.0.1'
    }
  ];

  saveStore();
  console.log('🌱 [Seed] Initialized database with users, babies, growth, and clinical records.');

  if (isMongoConnected) {
    try {
      const uCount = await User.countDocuments();
      if (uCount === 0 && store.users.length > 0) {
        await User.insertMany(store.users.map(({ id, ...u }) => u)).catch(() => {});
        console.log('🌱 [MongoDB Sync] Synced initial users into MongoDB.');
      }
      const bCount = await Baby.countDocuments();
      if (bCount === 0 && store.babies.length > 0) {
        await Baby.insertMany(store.babies.map(({ id, ...b }) => b)).catch(() => {});
        console.log('🌱 [MongoDB Sync] Synced initial babies into MongoDB.');
      }
    } catch (err) {
      console.warn('⚠️ [MongoDB Sync Notice]', err.message);
    }
  }
}
