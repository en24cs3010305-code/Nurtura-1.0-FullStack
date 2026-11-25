import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data/db.json');

// Memory store backed by persistent file
let store = {
  users: [],
  babies: [],
  feedings: [],
  sleeps: [],
  diapers: [],
  growth: [],
  vaccinations: [],
  milestones: [],
  medications: [],
  appointments: [],
  soapNotes: [],
  prescriptions: [],
  family: [],
  notifications: [],
  auditLogs: [],
  support: []
};

// Initialize file if doesn't exist
function initFileStore() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      store = { ...store, ...JSON.parse(content) };
    } catch (err) {
      console.warn('[Storage] Reading db.json failed, starting fresh:', err.message);
    }
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2));
  }
}

export function saveStore() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error('[Storage Error] Could not save db.json:', err.message);
  }
}

export function getStore() {
  return store;
}

export let isMongoConnected = false;

export async function connectDB() {
  initFileStore();

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nurtura';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log('✅ [MongoDB] Successfully connected to MongoDB database:', uri);
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ️  [MongoDB] Local/Cloud MongoDB not currently accessible (using resilient local database at server/data/db.json).');
    console.log('   All data will persist in server/data/db.json. Connect MongoDB Atlas URI in server/.env anytime!');
  }
}
