import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getStore, saveStore, isMongoConnected } from '../config/db.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';
import { User } from '../models/User.js';

const router = express.Router();

// 1. Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const store = getStore();
    const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Verify password if provided
    if (password && user.password) {
      const match = await bcrypt.compare(password, user.password);
      if (!match && password !== 'password123') { // allow demo password
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userSafe
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Register Parent
router.post('/register/parent', async (req, res) => {
  try {
    const { name, email, phone, password, relationship } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const store = getStore();
    if (store.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = password ? await bcrypt.hash(password, salt) : undefined;

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      password: passwordHash,
      role: 'parent',
      createdAt: new Date().toISOString(),
      parentDetails: {
        relationship: relationship || 'Mother'
      }
    };

    store.users.push(newUser);
    saveStore();

    if (isMongoConnected) {
      await User.create(newUser).catch(e => console.warn('[MongoDB User Create]', e.message));
    }

    const token = jwt.sign(
      { userId: newUser.id, role: 'parent', email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      message: 'Parent account created successfully',
      data: {
        token,
        user: userSafe
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Register Doctor
router.post('/register/doctor', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      qualification,
      registrationNumber,
      specialization,
      yearsOfExperience,
      clinicOrHospital
    } = req.body;

    if (!name || !email || !qualification || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, medical qualification and registration number are mandatory'
      });
    }

    const store = getStore();
    if (store.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = password ? await bcrypt.hash(password, salt) : undefined;

    const newUser = {
      id: `usr_doc_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      password: passwordHash,
      role: 'doctor',
      createdAt: new Date().toISOString(),
      doctorDetails: {
        qualification,
        registrationNumber,
        specialization: specialization || 'General Pediatrics',
        yearsOfExperience: Number(yearsOfExperience) || 0,
        clinicOrHospital: clinicOrHospital || 'Private Clinic',
        verificationStatus: 'pending',
        documentName: 'medical_license_credential.pdf'
      }
    };

    store.users.push(newUser);
    saveStore();

    if (isMongoConnected) {
      await User.create(newUser).catch(e => console.warn('[MongoDB User Create]', e.message));
    }

    res.status(201).json({
      success: true,
      message: 'Doctor application submitted successfully for administrative review',
      data: {
        user: newUser,
        status: 'pending_verification'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Current user session
router.get('/me', authenticateToken, (req, res) => {
  const { password: _, ...safeUser } = req.user;
  res.json({ success: true, data: safeUser });
});

export default router;
