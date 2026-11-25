import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { Milestone } from '../models/Milestone.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.milestones.filter(m => m.babyId === babyId) : store.milestones;
  res.json({ success: true, data: list });
});

router.patch('/:id', (req, res) => {
  const store = getStore();
  const index = store.milestones.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Milestone record not found' });

  store.milestones[index] = { ...store.milestones[index], ...req.body };
  saveStore();
  if (isMongoConnected) {
    Milestone.updateOne({ _id: req.params.id }, { $set: req.body }).catch(() => {});
  }
  res.json({ success: true, data: store.milestones[index] });
});

export default router;
