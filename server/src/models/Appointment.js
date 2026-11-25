import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
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
  time: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    default: 'Routine Pediatric Checkup'
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
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

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
