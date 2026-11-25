import mongoose from 'mongoose';

const VaccinationSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    default: ''
  },
  dueAge: {
    type: String,
    default: ''
  },
  dueDate: {
    type: String,
    required: true
  },
  administeredDate: {
    type: String
  },
  status: {
    type: String,
    enum: ['completed', 'due', 'upcoming', 'overdue'],
    default: 'upcoming'
  },
  batchNumber: {
    type: String,
    default: ''
  },
  clinic: {
    type: String,
    default: 'City Pediatric Center'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Vaccination = mongoose.models.Vaccination || mongoose.model('Vaccination', VaccinationSchema);
