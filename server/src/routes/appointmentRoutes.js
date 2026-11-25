import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { Appointment } from '../models/Appointment.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  const { babyId, doctorId } = req.query;
  let list = store.appointments;
  if (babyId) list = list.filter(a => a.babyId === babyId);
  if (doctorId) list = list.filter(a => a.doctorId === doctorId);
  res.json({ success: true, data: list });
});

router.post('/', (req, res) => {
  const store = getStore();
  const newApt = {
    ...req.body,
    id: `apt_${Date.now()}`
  };
  store.appointments.push(newApt);
  saveStore();
  if (isMongoConnected) {
    Appointment.create(newApt).catch(() => {});
  }
  res.status(201).json({ success: true, data: newApt });
});

router.patch('/:id', (req, res) => {
  const store = getStore();
  const index = store.appointments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Appointment not found' });

  store.appointments[index] = { ...store.appointments[index], ...req.body };
  saveStore();
  if (isMongoConnected) {
    Appointment.updateOne({ _id: req.params.id }, { $set: req.body }).catch(() => {});
  }
  res.json({ success: true, data: store.appointments[index] });
});

export default router;
