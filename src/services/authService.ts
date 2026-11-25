import { User, UserRole, DoctorProfileDetails } from '../types';
import { mockUsers } from '../data/mockData';
import { apiClient } from '../api/client';

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface ParentRegistrationData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  relationship?: 'Mother' | 'Father' | 'Guardian';
}

export interface DoctorRegistrationData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  qualification: string;
  registrationNumber: string;
  specialization: string;
  yearsOfExperience: number;
  clinicOrHospital: string;
  documentFile?: File | null;
}

export interface AuthSession {
  user: User;
  token: string;
}

const STORAGE_KEY = 'nurtura_active_user';
const TOKEN_KEY = 'nurtura_auth_token';

export const authService = {
  getCurrentSession(): AuthSession | null {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  },

  async login(credentials: LoginCredentials, selectedRole?: UserRole): Promise<AuthSession> {
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/auth/login', {
        email: credentials.email,
        password: credentials.password || 'password123'
      });
      if (res.data && res.data.token && res.data.user) {
        const session: AuthSession = {
          user: res.data.user,
          token: res.data.token
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(TOKEN_KEY, session.token);
        return session;
      }
    } catch (err) {
      console.warn('Backend login unavailable or invalid, falling back to local session adapter', err);
    }

    // Fallback logic
    let matchedUser = mockUsers.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
    if (!matchedUser && selectedRole) {
      matchedUser = mockUsers.find((u) => u.role === selectedRole);
    }
    if (!matchedUser) {
      matchedUser = mockUsers[0];
    }

    const session: AuthSession = {
      user: matchedUser,
      token: `demo-jwt-token-${matchedUser.role}`
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem(TOKEN_KEY, session.token);
    return session;
  },

  async switchDemoRole(role: UserRole): Promise<AuthSession> {
    const matched = mockUsers.find((u) => u.role === role) || mockUsers[0];
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/auth/login', {
        email: matched.email,
        password: 'password123'
      });
      if (res.data?.token && res.data?.user) {
        const session: AuthSession = {
          user: res.data.user,
          token: res.data.token
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(TOKEN_KEY, session.token);
        return session;
      }
    } catch {
      // offline fallback
    }

    const session: AuthSession = {
      user: matched,
      token: `demo-dev-jwt-token-${role}`
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem(TOKEN_KEY, session.token);
    return session;
  },

  async registerParent(data: ParentRegistrationData): Promise<AuthSession> {
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/auth/register/parent', data);
      if (res.data?.token && res.data?.user) {
        const session: AuthSession = {
          user: res.data.user,
          token: res.data.token
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(TOKEN_KEY, session.token);
        return session;
      }
    } catch (err) {
      console.warn('Backend register parent failed, using local registration', err);
    }

    const newUser: User = {
      id: `user-parent-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'parent',
      createdAt: new Date().toISOString(),
      parentDetails: {
        relationship: data.relationship || 'Mother'
      }
    };
    const session: AuthSession = {
      user: newUser,
      token: `demo-dev-jwt-token-parent-${Date.now()}`
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem(TOKEN_KEY, session.token);
    return session;
  },

  async registerDoctor(data: DoctorRegistrationData): Promise<{ user: User; status: string }> {
    try {
      const res = await apiClient.post<{ user: User; status: string }>('/auth/register/doctor', {
        ...data,
        yearsOfExperience: Number(data.yearsOfExperience) || 0
      });
      if (res.data?.user) {
        return res.data;
      }
    } catch (err) {
      console.warn('Backend register doctor failed, using local registration', err);
    }

    const doctorDetails: DoctorProfileDetails = {
      qualification: data.qualification,
      registrationNumber: data.registrationNumber,
      specialization: data.specialization,
      yearsOfExperience: Number(data.yearsOfExperience),
      clinicOrHospital: data.clinicOrHospital,
      verificationStatus: 'pending',
      documentName: data.documentFile ? data.documentFile.name : 'medical_credential_document.pdf'
    };
    const newUser: User = {
      id: `user-doctor-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'doctor',
      createdAt: new Date().toISOString(),
      doctorDetails
    };
    return {
      user: newUser,
      status: 'pending_verification'
    };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
};
