import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Menu,
  X,
  Heart,
  Baby,
  ArrowRight,
  Shield,
  Stethoscope,
  Sparkles,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: 'About', path: '/about' },
    { label: t('nav.features'), path: '/features' },
    { label: t('nav.howItWorks'), path: '/how-it-works' },
    { label: t('nav.aiAssistant'), path: '/ai-assistant' },
    { label: t('nav.forParents'), path: '/for-parents' },
    { label: t('nav.forDoctors'), path: '/for-doctors' },
    { label: t('nav.faq'), path: '/faq' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkBg text-nurturaText-primary dark:text-cream-100 selection:bg-sage-200">
      <DemoRoleSwitcher />

      {/* Main Public Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-darkBg-surface/90 backdrop-blur-md border-b border-sage-100 dark:border-darkBg-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-sage-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-heading font-bold text-sage-800 dark:text-cream-50 tracking-tight flex items-center gap-1">
                Nurtura
                <span className="w-2 h-2 rounded-full bg-peach-300 inline-block" />
              </span>
              <p className="text-[10px] text-nurturaText-secondary dark:text-stone-400 font-medium tracking-wide">
                Pediatric Care Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-sage-700 bg-sage-50 dark:text-sage-300 dark:bg-darkBg-card'
                      : 'text-nurturaText-secondary dark:text-stone-300 hover:text-sage-700 dark:hover:text-cream-100 hover:bg-stone-50 dark:hover:bg-darkBg-card/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-xl text-nurturaText-secondary hover:text-nurturaText-primary hover:bg-stone-100 dark:hover:bg-darkBg-card text-xs font-semibold flex items-center gap-1"
              title="Language toggle"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-nurturaText-secondary hover:text-nurturaText-primary hover:bg-stone-100 dark:hover:bg-darkBg-card transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-stone-600" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            {user ? (
              <Link to={`/${user.role}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('nav.dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-nurturaText-secondary"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-nurturaText-primary dark:text-cream-100 hover:bg-stone-100 dark:hover:bg-darkBg-card"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sage-100 dark:border-darkBg-border bg-white dark:bg-darkBg-surface px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-darkBg-border">
              <span className="text-xs font-semibold text-nurturaText-secondary">Menu</span>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="text-xs font-semibold text-sage-600 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" />
                Language: {language.toUpperCase()}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 py-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-nurturaText-primary dark:text-stone-200 hover:bg-sage-50 dark:hover:bg-darkBg-card"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-stone-100 dark:border-darkBg-border flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full text-xs">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-sage-900 text-white border-t border-sage-800 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sage-800">
            {/* Col 1: Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white text-sage-700 flex items-center justify-center font-bold">
                  <Baby className="w-6 h-6 text-sage-700" />
                </div>
                <span className="text-2xl font-heading font-bold text-white tracking-tight">
                  Nurtura
                </span>
              </div>
              <p className="text-xs text-sage-200/90 leading-relaxed max-w-sm">
                A Smarter Way to Care for Your Little One. Connecting parents and pediatricians with AI-guided routines, milestone monitoring, and comprehensive infant health logs.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-800/80 text-sage-200 text-xs border border-sage-700">
                  <Shield className="w-3.5 h-3.5 text-sage-300" />
                  Frontend Architecture 3.0
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-800/80 text-peach-200 text-xs border border-sage-700">
                  <Heart className="w-3.5 h-3.5 text-peach-300" />
                  Family Centered
                </span>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-sage-200">Platform</h5>
              <ul className="space-y-2 text-xs text-sage-200">
                <li><Link to="/features" className="hover:text-white transition-colors">Features Overview</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How Nurtura Works</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-white transition-colors">Nurtura AI Companion</Link></li>
                <li><Link to="/for-parents" className="hover:text-white transition-colors">Parent Experience</Link></li>
                <li><Link to="/for-doctors" className="hover:text-white transition-colors">Pediatrician Portal</Link></li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-sage-200">Resources</h5>
              <ul className="space-y-2 text-xs text-sage-200">
                <li><Link to="/faq" className="hover:text-white transition-colors">Knowledge Base & FAQ</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Our Mission</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><span className="text-sage-400">API Documentation</span></li>
                <li><span className="text-sage-400">Clinical Guidelines</span></li>
              </ul>
            </div>

            {/* Col 4: Portals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-sage-200">Portals</h5>
              <ul className="space-y-2 text-xs text-sage-200">
                <li><Link to="/parent" className="hover:text-white transition-colors">Parent Portal</Link></li>
                <li><Link to="/doctor" className="hover:text-white transition-colors">Pediatrician Portal</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Account Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Registration</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-300">
            <p>© {new Date().getFullYear()} Nurtura 3.0 Platform. All rights reserved. Designed for newborn & infant health management.</p>
            <p className="text-[11px] text-sage-300 text-center sm:text-right">
              Medical Disclaimer: Nurtura does not provide emergency medical diagnosis. Always consult certified healthcare professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
