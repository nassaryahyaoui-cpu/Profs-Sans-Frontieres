import { createContext, useContext, useEffect, useState } from 'react';

interface Progression {
  [taleId: string]: {
    [epIdx: string]: {
      done: boolean;
      xp: number;
    };
  };
}

interface AppContextType {
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
  xp: number;
  addXP: (taleId: string, epIdx: number, amount: number) => void;
  isPremium: boolean;
  setPremium: (p: boolean) => void;
  progression: Progression;
  userName: string;
  setUserName: (n: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [xp, setXp] = useState(0);
  const [isPremium, setPremium] = useState(false);
  const [userName, setUserName] = useState('');
  const [progression, setProgression] = useState<Progression>({});

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('cq_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.xp) setXp(parsed.xp);
      if (parsed.isPremium) setPremium(parsed.isPremium);
      if (parsed.userName) setUserName(parsed.userName);
      if (parsed.progression) setProgression(parsed.progression);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cq_state', JSON.stringify({ xp, isPremium, userName, progression }));
  }, [xp, isPremium, userName, progression]);

  const addXP = (taleId: string, epIdx: number, amount: number) => {
    if (progression[taleId]?.[epIdx]?.done) return;
    
    setXp(prev => prev + amount);
    setProgression(prev => ({
      ...prev,
      [taleId]: {
        ...(prev[taleId] || {}),
        [epIdx]: { done: true, xp: amount }
      }
    }));
  };

  return (
    <AppContext.Provider value={{ lang, setLang, xp, addXP, isPremium, setPremium, progression, userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
