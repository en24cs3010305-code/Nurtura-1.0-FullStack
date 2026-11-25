import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService, LoginCredentials } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials, role?: UserRole) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
  }, []);

  const login = async (credentials: LoginCredentials, role?: UserRole) => {
    const session = await authService.login(credentials, role);
    setUser(session.user);
    setToken(session.token);
  };

  const switchRole = async (role: UserRole) => {
    const session = await authService.switchDemoRole(role);
    setUser(session.user);
    setToken(session.token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('nurtura_active_user', JSON.stringify({ user: updated, token }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'parent',
        token,
        isAuthenticated: !!user,
        login,
        switchRole,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
