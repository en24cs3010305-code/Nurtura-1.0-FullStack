import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { NotificationBell } from '../components/common/NotificationBell';
import { useAuth } from '../contexts/AuthContext';
import { useBaby } from '../contexts/BabyContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard,
  Baby,
  Activity,
  LineChart,
  Utensils,
  Moon,
  Sparkles,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Bot,
  FileText,
  Users,
  Bell,
  Settings,
  Pill,
  Menu,
  X,
  ChevronDown,
  LogOut,
  PlusCircle,
  Sun
} from 'lucide-react';
import { cn } from '../utils/cn';

export const ParentLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [babyDropdownOpen, setBabyDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { babies, selectedBaby, setSelectedBabyId } = useBaby();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/parent', icon: LayoutDashboard },
    { label: 'My Babies', path: '/parent/babies', icon: Baby },
    { label: 'Health Timeline', path: '/parent/timeline', icon: Activity },
    { label: 'Growth Tracker', path: '/parent/growth', icon: LineChart },
    { label: 'Feeding Tracker', path: '/parent/feeding', icon: Utensils },
    { label: 'Sleep Tracker', path: '/parent/sleep', icon: Moon },
    { label: 'Diaper Tracker', path: '/parent/diaper', icon: Sparkles },
    { label: 'Vaccinations', path: '/parent/vaccinations', icon: ShieldCheck },
    { label: 'Development Milestones', path: '/parent/milestones', icon: Sparkles },
    { label: 'Medication Reminders', path: '/parent/medications', icon: Pill },
    { label: 'Doctor Appointments', path: '/parent/appointments', icon: Calendar },
    { label: 'Messages', path: '/parent/messages', icon: MessageSquare },
    { label: 'Nurtura AI', path: '/parent/ai', icon: Bot, badge: 'AI' },
    { label: 'Medical Reports', path: '/parent/reports', icon: FileText },
    { label: 'Family Access', path: '/parent/family', icon: Users },
    { label: 'Notifications', path: '/parent/notifications', icon: Bell },
    { label: 'Settings', path: '/parent/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkBg text-nurturaText-primary dark:text-cream-100 selection:bg-sage-200">
      <DemoRoleSwitcher />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-darkBg-surface border-r border-sage-100 dark:border-darkBg-border flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Logo & Close on mobile */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-sage-100/60 dark:border-darkBg-border">
            <Link to="/parent" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-sage-600 flex items-center justify-center text-white shadow-soft">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-sage-800 dark:text-cream-100 tracking-tight">
                  Nurtura
                </span>
                <p className="text-[10px] text-sage-600 dark:text-sage-400 font-semibold tracking-wide">
                  Parent Care Portal
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Baby Profile Card in Sidebar */}
          {selectedBaby && (
            <div className="p-4 mx-4 my-3 rounded-2xl bg-sage-50/70 dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBaby.avatarUrl || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=128'}
                  alt={selectedBaby.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-sage-300 dark:ring-sage-700"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100 truncate">
                    {selectedBaby.name}
                  </h4>
                  <p className="text-[10px] text-nurturaText-secondary dark:text-stone-300 font-medium truncate">
                    {selectedBaby.ageText || '6 months old'} • {selectedBaby.currentWeightKg} kg
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Nav Links */}
          <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/parent'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-sage-600 text-white shadow-soft font-semibold'
                        : 'text-nurturaText-secondary dark:text-stone-300 hover:text-sage-700 dark:hover:text-cream-100 hover:bg-sage-50/60 dark:hover:bg-darkBg-card'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-peach-200 text-amber-900 uppercase">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer User info & Signout */}
          <div className="p-4 border-t border-sage-100/60 dark:border-darkBg-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100 truncate">
                    {user?.name || 'Sarah Jenkins'}
                  </p>
                  <p className="text-[10px] text-nurturaText-secondary dark:text-stone-300 capitalize truncate">
                    Parent Account
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <header className="h-16 bg-white/90 dark:bg-darkBg-surface/90 backdrop-blur-md border-b border-sage-100 dark:border-darkBg-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-nurturaText-primary dark:text-cream-100 hover:bg-stone-100 dark:hover:bg-darkBg-card"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Baby Profile Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setBabyDropdownOpen(!babyDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sage-50 dark:bg-darkBg-card border border-sage-200/60 dark:border-darkBg-border hover:bg-sage-100/60 transition-colors text-xs font-semibold text-sage-800 dark:text-cream-100"
                >
                  <Baby className="w-4 h-4 text-sage-600" />
                  <span>{selectedBaby ? selectedBaby.name : 'Select Baby'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {babyDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setBabyDropdownOpen(false)} />
                    <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-darkBg-card shadow-lifted border border-sage-100 dark:border-darkBg-border py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Switch Active Baby
                      </div>
                      {babies.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBabyId(b.id);
                            setBabyDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-sage-50 dark:hover:bg-darkBg-surface transition-colors ${
                            selectedBaby?.id === b.id ? 'font-bold text-sage-700 bg-sage-50/80 dark:text-sage-300' : 'text-stone-600 dark:text-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <img src={b.avatarUrl} alt={b.name} className="w-6 h-6 rounded-full object-cover" />
                            <span>{b.name}</span>
                          </div>
                          <span className="text-[10px] text-stone-400">{b.ageText?.split(' ')[0]} {b.ageText?.split(' ')[1]}</span>
                        </button>
                      ))}
                      <div className="border-t border-stone-100 dark:border-darkBg-border mt-1 pt-1 px-2">
                        <Link
                          to="/parent/babies"
                          onClick={() => setBabyDropdownOpen(false)}
                          className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-50 dark:hover:bg-darkBg-surface rounded-lg"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Manage / Add Baby Profile</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Topbar items */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-nurturaText-secondary hover:text-nurturaText-primary hover:bg-stone-100 dark:hover:bg-darkBg-card transition-colors"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
              </button>

              <NotificationBell />

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-darkBg-border">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-sage-300"
                />
                <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">
                  {user?.name || 'Sarah'}
                </span>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
