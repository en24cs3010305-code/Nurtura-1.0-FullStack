import mongoose from 'mongoose';

const MedicationSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    default: 'Once Daily'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  reminderTime: {
    type: String,
    default: '09:00 AM'
  },
  instructions: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Medication = mongoose.models.Medication || mongoose.model('Medication', MedicationSchema);
