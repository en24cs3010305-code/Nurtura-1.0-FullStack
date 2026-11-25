import mongoose from 'mongoose';

const BabySchema = new mongoose.Schema({
  parentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  ageText: {
    type: String,
    default: 'Newborn'
  },
  bloodGroup: {
    type: String,
    default: 'O+'
  },
  birthWeightKg: {
    type: Number,
    required: true
  },
  birthHeightCm: {
    type: Number,
    required: true
  },
  headCircumferenceCm: {
    type: Number,
    default: 35.0
  },
  currentWeightKg: {
    type: Number,
    required: true
  },
  currentHeightCm: {
    type: Number,
    required: true
  },
  allergies: {
    type: [String],
    default: []
  },
  medicalHistory: {
    type: [String],
    default: []
  },
  avatarUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=256'
  },
  pediatricianName: {
    type: String,
    default: 'Dr. Ananya Sharma'
  },
  emergencyContact: {
    name: { type: String, default: 'Parent' },
    relationship: { type: String, default: 'Mother' },
    phone: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Baby = mongoose.models.Baby || mongoose.model('Baby', BabySchema);
