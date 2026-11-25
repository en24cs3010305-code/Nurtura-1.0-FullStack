// Nurtura 3.0 - Unified TypeScript Type Definitions

export type UserRole = 'parent' | 'doctor' | 'admin';

export type DoctorVerificationStatus = 'pending' | 'approved' | 'rejected' | 'documents_required';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  doctorDetails?: DoctorProfileDetails;
  parentDetails?: ParentProfileDetails;
}

export interface DoctorProfileDetails {
  qualification: string;
  registrationNumber: string;
  specialization: string;
  yearsOfExperience: number;
  clinicOrHospital: string;
  verificationStatus: DoctorVerificationStatus;
  documentName?: string;
  bio?: string;
}

export interface ParentProfileDetails {
  emergencyContact?: string;
  address?: string;
  relationship?: 'Mother' | 'Father' | 'Guardian';
}

export interface Baby {
  id: string;
  parentId: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  ageText?: string;
  bloodGroup: string;
  birthWeightKg: number;
  birthHeightCm: number;
  headCircumferenceCm: number;
  currentWeightKg: number;
  currentHeightCm: number;
  allergies: string[];
  medicalHistory: string[];
  avatarUrl?: string;
  pediatricianName?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export type FeedingType = 'breast' | 'formula' | 'expressed';

export interface FeedingLog {
  id: string;
  babyId: string;
  date: string;
  time: string;
  type: FeedingType;
  durationMinutes?: number;
  quantityMl?: number;
  side?: 'left' | 'right' | 'both';
  notes?: string;
  loggedBy: string;
}

export interface SleepLog {
  id: string;
  babyId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: 'nap' | 'night';
  quality: 'peaceful' | 'restless' | 'interrupted';
  notes?: string;
}

export interface DiaperLog {
  id: string;
  babyId: string;
  date: string;
  time: string;
  type: 'wet' | 'dirty' | 'mixed';
  color?: string;
  notes?: string;
}

export interface GrowthRecord {
  id: string;
  babyId: string;
  date: string;
  ageInMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm: number;
  percentileWeight?: number;
  percentileHeight?: number;
  notes?: string;
}

export type VaccineStatus = 'completed' | 'upcoming' | 'pending';

export interface Vaccination {
  id: string;
  babyId: string;
  vaccineName: string;
  diseaseTarget: string;
  recommendedAgeMonths: number;
  recommendedAgeLabel: string;
  dueDate: string;
  administeredDate?: string;
  status: VaccineStatus;
  batchNumber?: string;
  clinicName?: string;
  administeredBy?: string;
  notes?: string;
}

export type MilestoneCategory = 'motor' | 'cognitive' | 'communication' | 'social_emotional';
export type MilestoneStatus = 'achieved' | 'emerging' | 'not_yet';

export interface Milestone {
  id: string;
  babyId: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  expectedAgeMonths: number;
  achievedDate?: string;
  status: MilestoneStatus;
  notes?: string;
}

export interface MedicationReminder {
  id: string;
  babyId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  instructions: string;
  startDate: string;
  endDate: string;
  reminderTimes: string[];
  status: 'active' | 'completed' | 'paused';
}

export interface Appointment {
  id: string;
  babyId: string;
  babyName: string;
  parentId: string;
  parentName: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'requested' | 'confirmed' | 'cancelled' | 'completed';
  type: 'in-person' | 'video';
  reason: string;
  clinicAddress?: string;
  notes?: string;
}

export interface ClinicalSoapNote {
  id: string;
  babyId: string;
  babyName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  signed: boolean;
}

export interface Prescription {
  id: string;
  babyId: string;
  babyName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medicines: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  doctorSignatureRequired: boolean;
  notes?: string;
}

export interface FamilyAccessMember {
  id: string;
  parentId: string;
  name: string;
  email: string;
  relationship: string;
  accessType: 'view_only' | 'daily_logging' | 'limited_caregiver';
  status: 'active' | 'invited';
  invitedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'vaccination' | 'appointment' | 'medication' | 'doctor_request' | 'family_invitation' | 'health_alert' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isDisclaimer?: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalParents: number;
  verifiedDoctors: number;
  pendingDoctors: number;
  babyProfiles: number;
  totalAppointments: number;
  activeAccounts: number;
  suspendedAccounts: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

export interface SupportRequest {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  message: string;
}
