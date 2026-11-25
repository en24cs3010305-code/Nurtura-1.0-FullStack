import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { Vaccination } from '../models/Vaccination.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.vaccinations.filter(v => v.babyId === babyId) : store.vaccinations;
  res.json({ success: true, data: list });
});

router.post('/', (req, res) => {
  const store = getStore();
  const newVac = {
    ...req.body,
    id: `vac_${Date.now()}`
  };
  store.vaccinations.push(newVac);
  saveStore();
  if (isMongoConnected) {
    Vaccination.create(newVac).catch(() => {});
  }
  res.status(201).json({ success: true, data: newVac });
});

router.patch('/:id', (req, res) => {
  const store = getStore();
  const index = store.vaccinations.findIndex(v => v.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Vaccine record not found' });

  store.vaccinations[index] = { ...store.vaccinations[index], ...req.body };
  saveStore();
  if (isMongoConnected) {
    Vaccination.updateOne({ _id: req.params.id }, { $set: req.body }).catch(() => {});
  }
  res.json({ success: true, data: store.vaccinations[index] });
});

export default router;
