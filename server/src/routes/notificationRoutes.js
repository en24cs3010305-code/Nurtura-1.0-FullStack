import express from 'express';
import { getStore, saveStore } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.notifications });
});

router.patch('/:id/read', (req, res) => {
  const store = getStore();
  const item = store.notifications.find(n => n.id === req.params.id);
  if (item) item.read = true;
  saveStore();
  res.json({ success: true });
});

router.post('/mark-all-read', (req, res) => {
  const store = getStore();
  store.notifications.forEach(n => { n.read = true; });
  saveStore();
  res.json({ success: true });
});

export default router;
