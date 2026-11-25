import mongoose from 'mongoose';

const TrackingSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    enum: ['feeding', 'sleep', 'diaper', 'growth'],
    required: true,
    index: true
  },
  // Feeding fields
  type: { type: String }, // breastfeeding, formula, expressed, or wet/dirty/mixed for diaper
  time: { type: String },
  durationMinutes: { type: Number },
  quantityMl: { type: Number },

  // Sleep fields
  startTime: { type: String },
  endTime: { type: String },
  durationHours: { type: Number },
  sleepType: { type: String }, // nap, night
  quality: { type: String }, // restful, interrupted, fussy

  // Diaper fields
  condition: { type: String }, // normal, loose, dry

  // Growth fields
  ageInMonths: { type: Number },
  weightKg: { type: Number },
  heightCm: { type: Number },
  headCircumferenceCm: { type: Number },
  recordedDate: { type: String },

  notes: { type: String, default: '' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Tracking = mongoose.models.Tracking || mongoose.model('Tracking', TrackingSchema);
