import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole } from '../../types';
import { ShieldAlert, Sun, Moon, Globe, User, Stethoscope, ShieldCheck } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleRoleChange = async (targetRole: UserRole) => {
    await switchRole(targetRole);
    if (targetRole === 'parent') navigate('/parent');
    else if (targetRole === 'doctor') navigate('/doctor');
    else if (targetRole === 'admin') navigate('/admin');
  };

  return (
    <aside aria-label="Development Demo Controls" className="bg-sage-900 text-white text-xs px-4 py-2 border-b border-sage-800 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold tracking-wide border border-emerald-500/30 uppercase text-[10px]">
          <ShieldAlert className="w-3 h-3 text-emerald-300" />
          Dev Demo Mode
        </span>
        <span className="text-sage-200 hidden sm:inline text-[11px]">
          Frontend Prototype (Backend integration ready)
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sage-300 font-medium text-[11px]">Switch Portal:</span>
        <div className="inline-flex rounded-lg bg-sage-800/80 p-0.5 border border-sage-700/50">
          <button
            onClick={() => handleRoleChange('parent')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all text-[11px] font-medium ${
              role === 'parent'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'text-sage-300 hover:text-white'
            }`}
          >
            <User className="w-3 h-3" />
            Parent
          </button>
          <button
            onClick={() => handleRoleChange('doctor')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all text-[11px] font-medium ${
              role === 'doctor'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'text-sage-300 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3 h-3" />
            Doctor
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all text-[11px] font-medium ${
              role === 'admin'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'text-sage-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            Admin
          </button>
        </div>

        {/* Language switch */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sage-800/80 hover:bg-sage-700 text-sage-200 border border-sage-700/50 text-[11px] transition-colors"
          title="Toggle Language (English / Hindi)"
        >
          <Globe className="w-3 h-3 text-sage-300" />
          <span className="font-semibold">{language.toUpperCase()}</span>
        </button>

        {/* Theme switch */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1 p-1.5 rounded-lg bg-sage-800/80 hover:bg-sage-700 text-sage-200 border border-sage-700/50 transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
        </button>
      </div>
    </aside>
  );
};
