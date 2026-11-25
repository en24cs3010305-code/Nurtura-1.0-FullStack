import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { Medication } from '../models/Medication.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.medications.filter(m => m.babyId === babyId) : store.medications;
  res.json({ success: true, data: list });
});

router.post('/', (req, res) => {
  const store = getStore();
  const newMed = {
    ...req.body,
    id: `med_${Date.now()}`
  };
  store.medications.push(newMed);
  saveStore();
  if (isMongoConnected) {
    Medication.create(newMed).catch(() => {});
  }
  res.status(201).json({ success: true, data: newMed });
});

router.patch('/:id', (req, res) => {
  const store = getStore();
  const index = store.medications.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Medication reminder not found' });

  store.medications[index] = { ...store.medications[index], ...req.body };
  saveStore();
  if (isMongoConnected) {
    Medication.updateOne({ _id: req.params.id }, { $set: req.body }).catch(() => {});
  }
  res.json({ success: true, data: store.medications[index] });
});

export default router;
