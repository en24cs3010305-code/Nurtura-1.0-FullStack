import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['parent', 'doctor', 'admin'],
    default: 'parent'
  },
  parentDetails: {
    relationship: { type: String, default: 'Mother' }
  },
  doctorDetails: {
    qualification: { type: String, default: '' },
    registrationNumber: { type: String, default: '' },
    specialization: { type: String, default: 'General Pediatrics' },
    yearsOfExperience: { type: Number, default: 0 },
    clinicOrHospital: { type: String, default: 'Private Clinic' },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    documentName: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
