import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, isMongoConnected } from './config/db.js';
import { seedInitialData } from './data/seedData.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import babyRoutes from './routes/babyRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import vaccinationRoutes from './routes/vaccinationRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import clinicalRoutes from './routes/clinicalRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development ports
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Nurtura 3.0 Real Backend API',
    database: isMongoConnected ? 'MongoDB' : 'JSON Persistent Engine (server/data/db.json)',
    isMongoConnected
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/babies', babyRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinical', clinicalRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Server Initialization
async function startServer() {
  await connectDB();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(`🚀 [Nurtura Backend] Live & listening on http://localhost:${PORT}`);
    console.log(`📡 [API Healthcheck] http://localhost:${PORT}/api/health`);
  });
}

startServer();
