import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { Baby } from '../models/Baby.js';

const router = express.Router();

// GET all babies
router.get('/', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.babies });
});

// GET baby by ID
router.get('/:id', (req, res) => {
  const store = getStore();
  const baby = store.babies.find(b => b.id === req.params.id);
  if (!baby) return res.status(404).json({ success: false, message: 'Baby record not found' });
  res.json({ success: true, data: baby });
});

// POST new baby
router.post('/', authenticateToken, (req, res) => {
  try {
    const store = getStore();
    const newBaby = {
      ...req.body,
      id: `baby_${Date.now()}`,
      parentId: req.user ? req.user.id : 'usr_parent_sarah',
      createdAt: new Date().toISOString()
    };
    store.babies.push(newBaby);
    saveStore();

    if (isMongoConnected) {
      Baby.create(newBaby).catch(e => console.warn('[MongoDB Baby Create]', e.message));
    }
    res.status(201).json({ success: true, data: newBaby });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update baby
router.put('/:id', authenticateToken, (req, res) => {
  const store = getStore();
  const index = store.babies.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Baby not found' });

  store.babies[index] = { ...store.babies[index], ...req.body };
  saveStore();

  if (isMongoConnected) {
    Baby.updateOne({ _id: req.params.id }, { $set: req.body }).catch(() => {});
  }
  res.json({ success: true, data: store.babies[index] });
});

// DELETE baby
router.delete('/:id', authenticateToken, (req, res) => {
  const store = getStore();
  const index = store.babies.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Baby record not found' });

  const deleted = store.babies.splice(index, 1)[0];
  saveStore();

  if (isMongoConnected) {
    Baby.deleteOne({ _id: req.params.id }).catch(() => {});
  }
  res.json({ success: true, message: 'Baby profile deleted successfully', data: deleted });
});

export default router;
