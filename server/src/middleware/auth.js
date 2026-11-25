import jwt from 'jsonwebtoken';
import { getStore } from '../config/db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'nurtura_super_secure_jwt_secret_key_2026_pediatric';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Authentication Bearer token required'
    });
  }

  // Support demo token prefixes for developer testing
  if (token.startsWith('demo-dev-jwt-token-')) {
    const role = token.replace('demo-dev-jwt-token-', '').split('-')[0];
    const store = getStore();
    const matchedUser = store.users.find(u => u.role === role) || store.users[0];
    req.user = matchedUser;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    const store = getStore();
    const user = store.users.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User record not found' });
    }

    req.user = user;
    next();
  });
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${allowedRoles.join(', ')}] role privileges`
      });
    }
    next();
  };
}
