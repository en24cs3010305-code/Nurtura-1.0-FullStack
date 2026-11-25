import mongoose from 'mongoose';

const SoapNoteSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    default: 'Dr. Ananya Sharma'
  },
  date: {
    type: String,
    required: true
  },
  subjective: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  assessment: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  signed: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PrescriptionSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    default: 'Dr. Ananya Sharma'
  },
  date: {
    type: String,
    required: true
  },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String, required: true },
      instructions: { type: String, default: '' }
    }
  ],
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const SoapNote = mongoose.models.SoapNote || mongoose.model('SoapNote', SoapNoteSchema);
export const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', PrescriptionSchema);
