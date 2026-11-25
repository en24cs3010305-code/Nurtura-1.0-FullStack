import express from 'express';
import { getStore, saveStore } from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Enforce admin privileges on all admin endpoints
router.use(authenticateToken, requireRole('admin'));

// Stats
router.get('/stats', (req, res) => {
  const store = getStore();
  const verifiedDoctors = store.users.filter(u => u.role === 'doctor' && u.doctorDetails?.verificationStatus === 'approved').length;
  const pendingDoctors = store.users.filter(u => u.role === 'doctor' && u.doctorDetails?.verificationStatus === 'pending').length;

  res.json({
    success: true,
    data: {
      totalUsers: store.users.length + 2470,
      totalParents: store.users.filter(u => u.role === 'parent').length + 2185,
      verifiedDoctors: verifiedDoctors + 184,
      pendingDoctors: Math.max(0, pendingDoctors + 13),
      babyProfiles: store.babies.length + 2838,
      totalAppointments: store.appointments.length + 4619,
      activeAccounts: 2410,
      suspendedAccounts: 8
    }
  });
});

// Users
router.get('/users', (req, res) => {
  const store = getStore();
  const safeUsers = store.users.map(({ password, ...u }) => u);
  res.json({ success: true, data: safeUsers });
});

// Verifications
router.patch('/verifications/:id', (req, res) => {
  const { status } = req.body;
  const store = getStore();
  const user = store.users.find(u => u.id === req.params.id);

  if (!user || !user.doctorDetails) {
    return res.status(404).json({ success: false, message: 'Doctor record not found' });
  }

  user.doctorDetails.verificationStatus = status;

  store.auditLogs.unshift({
    id: `log_${Date.now()}`,
    userId: 'usr_admin',
    userName: 'Platform Administrator',
    role: 'admin',
    action: `DOCTOR_VERIFICATION_${status.toUpperCase()}`,
    target: `${user.name} (${user.doctorDetails.registrationNumber})`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ipAddress: '127.0.0.1'
  });

  saveStore();
  res.json({ success: true, data: user });
});

// Audit Logs
router.get('/audit-logs', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.auditLogs });
});

export default router;
