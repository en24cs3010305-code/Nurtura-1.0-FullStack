import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['motor', 'cognitive', 'communication', 'social'],
    required: true
  },
  expectedAgeMonths: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['achieved', 'in_progress', 'upcoming'],
    default: 'upcoming'
  },
  achievedDate: {
    type: String
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Milestone = mongoose.models.Milestone || mongoose.model('Milestone', MilestoneSchema);
