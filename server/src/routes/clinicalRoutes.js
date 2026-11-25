import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { SoapNote, Prescription } from '../models/Clinical.js';

const router = express.Router();

// SOAP Notes
router.get('/soap-notes', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.soapNotes.filter(n => n.babyId === babyId) : store.soapNotes;
  res.json({ success: true, data: list });
});

router.post('/soap-notes', authenticateToken, requireRole('doctor'), (req, res) => {
  const store = getStore();
  const newNote = {
    ...req.body,
    id: `soap_${Date.now()}`,
    signed: true
  };
  store.soapNotes.unshift(newNote);
  saveStore();
  if (isMongoConnected) {
    SoapNote.create(newNote).catch(() => {});
  }
  res.status(201).json({ success: true, data: newNote });
});

// Prescriptions
router.get('/prescriptions', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.prescriptions.filter(p => p.babyId === babyId) : store.prescriptions;
  res.json({ success: true, data: list });
});

router.post('/prescriptions', authenticateToken, requireRole('doctor'), (req, res) => {
  const store = getStore();
  const newRx = {
    ...req.body,
    id: `rx_${Date.now()}`
  };
  store.prescriptions.unshift(newRx);
  saveStore();
  if (isMongoConnected) {
    Prescription.create(newRx).catch(() => {});
  }
  res.status(201).json({ success: true, data: newRx });
});

export default router;
