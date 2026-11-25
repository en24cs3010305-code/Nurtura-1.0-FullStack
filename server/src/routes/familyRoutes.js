import express from 'express';
import { getStore, saveStore } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.family });
});

router.post('/', (req, res) => {
  const store = getStore();
  const newMember = {
    ...req.body,
    id: `fam_${Date.now()}`,
    status: 'invited',
    invitedAt: new Date().toISOString().split('T')[0]
  };
  store.family.push(newMember);
  saveStore();
  res.status(201).json({ success: true, data: newMember });
});

router.delete('/:id', (req, res) => {
  const store = getStore();
  store.family = store.family.filter(f => f.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Family access revoked' });
});

export default router;
