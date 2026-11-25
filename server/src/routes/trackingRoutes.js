import express from 'express';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { Tracking } from '../models/Tracking.js';

const router = express.Router();

// WHO growth standard reference percentiles (Boys 0-12 months)
const whoBoysStandards = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4, babyWeight: 3.3 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8, babyWeight: 4.3 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1, babyWeight: 5.4 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0, babyWeight: 6.1 },
  { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7, babyWeight: 6.8 },
  { month: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3, babyWeight: 7.3 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8, babyWeight: 7.8 },
  { month: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3 },
  { month: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7 },
  { month: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 11.0 },
  { month: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4 },
  { month: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 }
];

// FEEDING
router.get('/feeding', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.feedings.filter(f => f.babyId === babyId) : store.feedings;
  res.json({ success: true, data: list });
});

router.post('/feeding', (req, res) => {
  const store = getStore();
  const newFeed = {
    ...req.body,
    id: `feed_${Date.now()}`
  };
  store.feedings.unshift(newFeed);
  saveStore();
  if (isMongoConnected) {
    Tracking.create({ ...newFeed, category: 'feeding' }).catch(() => {});
  }
  res.status(201).json({ success: true, data: newFeed });
});

// SLEEP
router.get('/sleep', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.sleeps.filter(s => s.babyId === babyId) : store.sleeps;
  res.json({ success: true, data: list });
});

router.post('/sleep', (req, res) => {
  const store = getStore();
  const newSleep = {
    ...req.body,
    id: `sleep_${Date.now()}`
  };
  store.sleeps.unshift(newSleep);
  saveStore();
  if (isMongoConnected) {
    Tracking.create({ ...newSleep, category: 'sleep' }).catch(() => {});
  }
  res.status(201).json({ success: true, data: newSleep });
});

// DIAPER
router.get('/diaper', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.diapers.filter(d => d.babyId === babyId) : store.diapers;
  res.json({ success: true, data: list });
});

router.post('/diaper', (req, res) => {
  const store = getStore();
  const newDiaper = {
    ...req.body,
    id: `diaper_${Date.now()}`
  };
  store.diapers.unshift(newDiaper);
  saveStore();
  if (isMongoConnected) {
    Tracking.create({ ...newDiaper, category: 'diaper' }).catch(() => {});
  }
  res.status(201).json({ success: true, data: newDiaper });
});

// GROWTH
router.get('/growth', (req, res) => {
  const store = getStore();
  const { babyId } = req.query;
  const list = babyId ? store.growth.filter(g => g.babyId === babyId) : store.growth;
  res.json({ success: true, data: list });
});

router.post('/growth', (req, res) => {
  const store = getStore();
  const newGrowth = {
    ...req.body,
    id: `growth_${Date.now()}`
  };
  store.growth.push(newGrowth);
  if (isMongoConnected) {
    Tracking.create({ ...newGrowth, category: 'growth' }).catch(() => {});
  }

  // Update current weight in baby profile
  if (req.body.babyId && req.body.weightKg) {
    const baby = store.babies.find(b => b.id === req.body.babyId);
    if (baby) {
      baby.currentWeightKg = Number(req.body.weightKg);
      if (req.body.heightCm) baby.currentHeightCm = Number(req.body.heightCm);
    }
  }

  saveStore();
  res.status(201).json({ success: true, data: newGrowth });
});

// WHO Standards
router.get('/who-standards', (req, res) => {
  res.json({ success: true, data: whoBoysStandards });
});

export default router;
