import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'hi';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'brand.tagline': 'A Smarter Way to Care for Your Little One.',
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.forParents': 'For Parents',
    'nav.forDoctors': 'For Doctors',
    'nav.aiAssistant': 'AI Assistant',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.login': 'Log In',
    'nav.register': 'Get Started',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Sign Out',
    'parent.welcome': 'Good morning, {name}!',
    'parent.subtitle': "Let's make today a healthy and happy day for your little one.",
    'parent.quickActions': 'Quick Actions',
    'parent.logFeeding': 'Log Feeding',
    'parent.logSleep': 'Log Sleep',
    'parent.logDiaper': 'Record Diaper',
    'parent.addGrowth': 'Add Growth',
    'parent.bookAppointment': 'Book Doctor',
    'parent.selectedBaby': 'Selected Baby',
    'common.save': 'Save Changes',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View Details',
    'common.search': 'Search...',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.time': 'Time',
    'doctor.portal': 'Pediatric Clinical Portal',
    'admin.portal': 'Administrator Management Console',
  },
  hi: {
    'brand.tagline': 'अपने नन्हें बच्चे की देखभाल का एक समझदार तरीका।',
    'nav.home': 'मुख्य पृष्ठ',
    'nav.features': 'विशेषताएं',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.forParents': 'माता-पिता के लिए',
    'nav.forDoctors': 'डॉक्टरों के लिए',
    'nav.aiAssistant': 'एआई सहायक',
    'nav.contact': 'संपर्क करें',
    'nav.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'nav.login': 'लॉग इन करें',
    'nav.register': 'शुरू करें',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'साइन आउट',
    'parent.welcome': 'सुप्रभात, {name}!',
    'parent.subtitle': 'आइए आज का दिन अपने नन्हें बच्चे के लिए स्वस्थ और खुशहाल बनाएं।',
    'parent.quickActions': 'त्वरित कार्य',
    'parent.logFeeding': 'फीडिंग दर्ज करें',
    'parent.logSleep': 'नींद दर्ज करें',
    'parent.logDiaper': 'डायपर दर्ज करें',
    'parent.addGrowth': 'विकास मापें',
    'parent.bookAppointment': 'अपॉइंटमेंट बुक करें',
    'parent.selectedBaby': 'चुना गया बच्चा',
    'common.save': 'परिवर्तन सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'विवरण देखें',
    'common.search': 'खोजें...',
    'common.status': 'स्थिति',
    'common.date': 'तारीख',
    'common.time': 'समय',
    'doctor.portal': 'बाल रोग विशेषज्ञ क्लिनिकल पोर्टल',
    'admin.portal': 'प्रशासक प्रबंधन कंसोल',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('nurtura_lang') as SupportedLanguage) || 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('nurtura_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
