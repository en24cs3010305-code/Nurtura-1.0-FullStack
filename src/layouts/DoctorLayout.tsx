import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { NotificationBell } from '../components/common/NotificationBell';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FolderHeart,
  LineChart,
  Calendar,
  FileSpreadsheet,
  Pill,
  BellRing,
  MessageSquare,
  Sparkles,
  UserCheck,
  Settings,
  Menu,
  X,
  LogOut,
  Stethoscope,
  Sun,
  Moon,
  BadgeCheck
} from 'lucide-react';
import { cn } from '../utils/cn';

export const DoctorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/doctor', icon: LayoutDashboard },
    { label: 'My Patients', path: '/doctor/patients', icon: Users },
    { label: 'Patient Requests', path: '/doctor/requests', icon: UserPlus, badge: '2 New' },
    { label: 'Patient Records', path: '/doctor/records', icon: FolderHeart },
    { label: 'Growth Reports', path: '/doctor/growth-reports', icon: LineChart },
    { label: 'Appointments', path: '/doctor/appointments', icon: Calendar },
    { label: 'Clinical Notes', path: '/doctor/clinical-notes', icon: FileSpreadsheet },
    { label: 'Prescriptions', path: '/doctor/prescriptions', icon: Pill },
    { label: 'Health Alerts', path: '/doctor/alerts', icon: BellRing, badgeAlert: true },
    { label: 'Messages', path: '/doctor/messages', icon: MessageSquare },
    { label: 'AI Summaries', path: '/doctor/ai-summaries', icon: Sparkles },
    { label: 'Profile', path: '/doctor/profile', icon: UserCheck },
    { label: 'Settings', path: '/doctor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-darkBg text-nurturaText-primary dark:text-cream-100 selection:bg-sage-200">
      <DemoRoleSwitcher />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Doctor Clinical Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-darkBg-surface border-r border-slate-200 dark:border-darkBg-border flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Logo & Clinical Badge */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 dark:border-darkBg-border">
            <Link to="/doctor" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-sage-700 flex items-center justify-center text-white shadow-soft">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-sage-900 dark:text-cream-100 tracking-tight">
                  Nurtura MD
                </span>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-emerald-600 inline" />
                  Clinical Portal
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Doctor Info Card */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-emerald-50/50 dark:bg-darkBg-card border border-emerald-100 dark:border-darkBg-border">
            <div className="flex items-center gap-2.5">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=128'}
                alt={user?.name || 'Dr. Sharma'}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/40"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-heading font-bold text-slate-800 dark:text-cream-100 truncate">
                  {user?.name || 'Dr. Ananya Sharma'}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-stone-300 truncate">
                  {user?.doctorDetails?.specialization || 'Pediatrics Specialist'}
                </p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/doctor'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-sage-700 text-white shadow-soft font-semibold'
                        : 'text-slate-600 dark:text-stone-300 hover:text-sage-800 dark:hover:text-cream-100 hover:bg-slate-100/70 dark:hover:bg-darkBg-card'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                  {item.badgeAlert && (
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer Sign out */}
          <div className="p-4 border-t border-slate-100 dark:border-darkBg-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Portal</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <header className="h-16 bg-white/90 dark:bg-darkBg-surface/90 backdrop-blur-md border-b border-slate-200 dark:border-darkBg-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-cream-100 hover:bg-slate-100 dark:hover:bg-darkBg-card"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Authorized Clinical Workspace
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-darkBg-card transition-colors"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
              </button>

              <NotificationBell />

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-darkBg-border">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=128'}
                  alt="Doctor"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-400"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-cream-100">
                  {user?.name || 'Dr. Sharma'}
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
