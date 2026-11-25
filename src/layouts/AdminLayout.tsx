import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { NotificationBell } from '../components/common/NotificationBell';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  Baby,
  Calendar,
  HelpCircle,
  Bell,
  ScrollText,
  Lock,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '../utils/cn';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Doctor Verification', path: '/admin/verifications', icon: ShieldCheck, badge: '14 Pending' },
    { label: 'Baby Profiles', path: '/admin/babies', icon: Baby },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Support Requests', path: '/admin/support', icon: HelpCircle },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText },
    { label: 'Security Monitoring', path: '/admin/security', icon: Lock },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-darkBg text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200">
      <DemoRoleSwitcher />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Admin Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 text-zinc-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-20 px-6 flex items-center justify-between border-b border-zinc-800">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 font-bold shadow-soft">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-white tracking-tight">
                  Nurtura Admin
                </span>
                <p className="text-[10px] text-zinc-400 font-mono tracking-wide">
                  Enterprise Console
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
              <span>Environment</span>
              <span className="text-emerald-400 font-mono">Development UI</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug">
              Connected to local mock adapters. Awaiting Express/MongoDB backends.
            </p>
          </div>

          <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold shadow-xs border border-zinc-700/80'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Console</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-16 bg-white/90 dark:bg-darkBg-surface/90 backdrop-blur-md border-b border-zinc-200 dark:border-darkBg-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                ROLE: SYSTEM_ADMINISTRATOR
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-darkBg-card transition-colors"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
              </button>

              <NotificationBell />

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-darkBg-border">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'}
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-400"
                />
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {user?.name || 'Administrator'}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
