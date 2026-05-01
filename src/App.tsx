import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowLeft, 
  Trophy, 
  Settings, 
  Lock, 
  Crown,
  Volume2,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { AppProvider, useApp } from './AppContext';
import { TALES, Tale } from './data';
import { useAudio } from './hooks/useAudio';
import { useReporting } from './hooks/useReporting';
import confetti from 'canvas-confetti';

// --- Components ---

function NavBar({ onBack, title }: { onBack?: () => void; title?: string }) {
  const { lang, setLang, xp } = useApp();
  
  return (
    <div className="sticky top-0 z-50 bg-gold-light shadow-sm border-b-2 border-gold px-8 py-4 flex items-center justify-between rounded-t-lg">
      <div className="flex items-center gap-4">
        {onBack ? (
          <button onClick={onBack} className="w-12 h-12 bg-crimson rounded-full flex items-center justify-center border-2 border-gold shadow-md hover:scale-105 transition-transform">
            <ArrowLeft className="w-5 h-5 text-gold" />
          </button>
        ) : (
          <div className="w-12 h-12 bg-crimson rounded-full flex items-center justify-center border-4 border-gold shadow-lg">
            <span className="text-gold text-2xl font-bold">🏰</span>
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-forest leading-tight tracking-tight font-head uppercase">{title || 'Contes en Quête'}</h1>
          <p className="text-[10px] text-gold-dark uppercase tracking-widest font-bold opacity-60">© M. Yahyaoui Nabil — E.P Jugurtha KEF</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end mr-2">
           <div className="text-[9px] text-gold-dark uppercase font-bold mb-1">Progression</div>
           <div className="w-24 h-1.5 bg-gold/20 rounded-full border border-gold/30 overflow-hidden">
             <div className="h-full bg-crimson" style={{ width: `${Math.min(100, (xp/5000)*100)}%` }} />
           </div>
        </div>

        <div className="flex bg-[#EAD7B0] rounded-full p-1 border border-gold">
          <button 
            onClick={() => setLang('fr')}
            className={`px-3 py-1 text-[10px] font-head rounded-full transition-all ${lang === 'fr' ? 'bg-crimson text-white shadow-sm' : 'text-forest hover:bg-gold/10'}`}
          >
            🇫🇷 FR
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-[10px] font-head rounded-full transition-all ${lang === 'en' ? 'bg-crimson text-white shadow-sm' : 'text-forest hover:bg-gold/10'}`}
          >
            🇬🇧 EN
          </button>
        </div>
        
        <div className="flex items-center gap-1.5 p-1">
          <span className="text-gold text-xl drop-shadow-sm">⭐</span>
          <span className="font-fun text-lg text-forest tracking-tight">{xp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { lang } = useApp();
  
  return (
    <div className="relative min-h-[35vh] flex flex-col items-center justify-center text-center p-8 overflow-hidden rounded-xl bg-gold-light/30 border-2 border-gold/20 mb-8 mx-6 mt-6">
      <div className="absolute inset-0 bg-linear-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10"
      >
        <div className="text-5xl mb-6 animate-float">🏰</div>
        <div className="font-head text-[11px] tracking-[0.2em] text-gold-dark font-bold mb-3 uppercase">
          {lang === 'fr' ? '✦ Bibliothèque Enchantée ✦' : '✦ Enchanted Library ✦'}
        </div>
        <h1 className="font-title text-5xl md:text-7xl text-forest mb-4 drop-shadow-md">Bibliothèque Enchantée</h1>
        <p className="font-magic italic text-[#8B5E3C] text-xl max-w-sm mx-auto opacity-70">
          {lang === 'fr' ? 'Explore les légendes bilingues' : 'Explore bilingual legends'}
        </p>
        <div className="w-32 h-0.5 bg-linear-to-r from-transparent via-gold to-transparent mx-auto my-8" />
      </motion.div>
    </div>
  );
}

function TaleCard({ tale, onClick }: { tale: Tale, onClick: () => void }) {
  const { lang, progression, isPremium } = useApp();
  const p = progression[tale.id] || {};
  const doneCount = Object.values(p).filter(e => e.done).length;
  const t = tale[lang];
  
  const isLocked = !isPremium && ['chaperon', 'blanche', 'pinocchio'].indexOf(tale.id) === -1;

  return (
    <motion.div 
      whileHover={{ y: -8, rotate: Math.random() * 2 - 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={isLocked ? undefined : onClick}
      className={`magic-panel p-3 cursor-pointer flex flex-col items-center text-center transform ${isLocked ? 'grayscale opacity-60 grayscale' : 'hover:shadow-2xl'}`}
    >
      <div className={`w-full aspect-[4/5] bg-gold-light/20 flex flex-col items-center justify-center relative overflow-hidden rounded-lg border border-gold/10`}>
        {isLocked && (
           <div className="absolute inset-0 bg-forest/20 backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity">
              <div className="bg-crimson text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-gold">PREMIUM</div>
           </div>
        )}
        
        <div className="absolute top-2 right-2 flex gap-0.5">
          {[1,2,3].map(i => (
            <span key={i} className={`text-xs ${i <= Math.floor(doneCount/2) ? 'text-gold opacity-100' : 'text-forest/10'}`}>⭐</span>
          ))}
        </div>

        <span className="text-6xl mb-4 drop-shadow-xl animate-float">{tale.emoji}</span>
        <div className="font-title text-sm text-forest px-4 h-12 flex items-center justify-center leading-tight">
          {t.title}
        </div>
      </div>
      
      <div className="w-full mt-3 px-2 flex justify-between items-center bg-gold-light/50 py-2 rounded-md">
        <span className={`text-[9px] font-bold uppercase tracking-tighter ${doneCount === 7 ? 'text-green-600' : 'text-crimson'}`}>
          {doneCount === 7 ? 'Complété' : doneCount > 0 ? 'En cours' : 'Découvrir'}
        </span>
        <span className="text-[9px] text-[#5D4037] font-bold">{doneCount}/7 Épisodes</span>
      </div>
    </motion.div>
  );
}

// --- Main Screens ---

function Application() {
  const [currentTaleId, setCurrentTaleId] = useState<string | null>(null);
  const [currentEpIdx, setCurrentEpIdx] = useState<number | null>(null);
  const { xp, progression, setPremium, isPremium, lang } = useApp();
  
  // Reporting hook
  useReporting(xp, Object.keys(progression).length);

  // Protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const currentTale = TALES.find(t => t.id === currentTaleId);

  return (
    <div className="magic-frame selection:bg-gold/20 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="paper-texture" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-full">
        <AnimatePresence mode="wait">
          {!currentTaleId ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <NavBar />
              <Hero />
              
              <div className="px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-24">
                {TALES.map(tale => (
                  <TaleCard key={tale.id} tale={tale} onClick={() => setCurrentTaleId(tale.id)} />
                ))}
              </div>

              <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-6">
                {!isPremium && (
                  <button 
                    onClick={() => setPremium(true)}
                    className="w-full magic-button py-5 text-lg"
                  >
                    <Crown className="w-6 h-6" />
                    {lang === 'fr' ? 'DÉBLOQUER LE ROYAUME' : 'UNLOCK FULL REALM'}
                  </button>
                )}
              </div>
              
              <footer className="mt-auto border-t border-gold py-6 flex justify-center">
                 <div className="flex flex-wrap items-center justify-center gap-8 text-gold-dark text-[11px] font-bold uppercase tracking-widest px-8 text-center">
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                       DISPONIBLE HORS-LIGNE
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]"></span>
                       BILINGUE FR / EN
                    </div>
                    <div className="opacity-40 italic lowercase">
                      Watermark: © M. Yahyaoui Nabil — E.P Jugurtha KEF
                    </div>
                 </div>
              </footer>
            </motion.div>
          ) : !currentEpIdx && currentEpIdx !== 0 ? (
            <motion.div 
              key="tale-detail"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <NavBar onBack={() => setCurrentTaleId(null)} title={currentTale?.[lang].title} />
              
              <div className="relative h-80 overflow-hidden flex flex-col items-center justify-center text-center px-4 mt-4 rounded-xl border-2 border-gold/10">
                <div className="absolute inset-0 z-0" style={{ background: currentTale?.bg }} />
                <div className="absolute inset-0 bg-linear-to-t from-parchment to-transparent z-1" />
                
                <div className="relative z-10">
                  <div className="text-8xl mb-6 animate-float">{currentTale?.emoji}</div>
                  <h2 className="font-title text-3xl md:text-5xl text-forest mb-2">{currentTale?.[lang].title}</h2>
                  <div className="font-magic text-lg italic text-gold-dark/60">{currentTale?.[lang].entitle}</div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="grid gap-4">
                  {[0,1,2,3,4,5,6].map(idx => {
                    const items = [
                      { fr: 'Épisode 1: Découverte', en: 'Episode 1: Discovery', emoji: '🔍' },
                      { fr: 'Épisode 2: Lecture', en: 'Episode 2: Reading', emoji: '📖' },
                      { fr: 'Épisode 3: Vocabulaire', en: 'Episode 3: Vocabulary', emoji: '📝' },
                      { fr: 'Épisode 4: Grammaire', en: 'Episode 4: Grammar', emoji: '✏️' },
                      { fr: 'Épisode 5: Reconstitution', en: 'Episode 5: Reconstruction', emoji: '🗂️' },
                      { fr: 'Épisode 6: Création', en: 'Episode 6: Creation', emoji: '🖊️' },
                      { fr: 'Épisode 7: Mon Livre', en: 'Episode 7: My Book', emoji: '📚' },
                    ];
                    
                    const isEpLocked = !isPremium && idx > 3;
                    const isDone = progression[currentTaleId]?.[idx]?.done;

                    return (
                      <button
                        key={idx}
                        disabled={isEpLocked}
                        onClick={() => setCurrentEpIdx(idx)}
                        className={`group flex items-center justify-between p-6 rounded-xl border-2 transition-all ${
                          isEpLocked ? 'bg-black/5 border-transparent opacity-30 grayscale' : 
                          isDone ? 'bg-white border-gold/40 shadow-md' : 'bg-white border-gold/10 hover:border-gold hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner border-2 ${isDone ? 'bg-gold border-gold/20' : 'bg-gold-light border-gold/40'}`}>
                            {items[idx].emoji}
                          </div>
                          <div className="text-left">
                            <div className="font-head text-sm text-forest uppercase tracking-tighter">
                              {lang === 'fr' ? items[idx].fr : items[idx].en}
                            </div>
                            {isEpLocked ? (
                               <div className="flex items-center gap-1.5 mt-1">
                                 <Lock className="w-3 h-3 text-crimson" />
                                 <span className="text-[10px] text-crimson font-bold uppercase tracking-widest">Sceau Royal Requis</span>
                               </div>
                            ) : (
                               <div className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1 opacity-60">
                                 {isDone ? 'Quête accomplie' : 'Commencer l\'aventure'}
                               </div>
                            )}
                          </div>
                        </div>
                        {isDone && (
                           <div className="flex flex-col items-center">
                              <CheckCircle2 className="w-6 h-6 text-green-600 mb-1" />
                              <span className="text-[9px] font-bold text-green-600">VALIDÉ</span>
                           </div>
                        )}
                        {isEpLocked && <Lock className="w-5 h-5 text-gold-dark/40" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <EpisodeRenderer 
              taleId={currentTaleId} 
              epIdx={currentEpIdx} 
              onBack={() => setCurrentEpIdx(null)} 
            />
          )}
        </AnimatePresence>
      </div>
      <div className="watermark">© M. Yahyaoui Nabil — E.P Jugurtha KEF — DRE KEF 2025-2026</div>
    </div>
  );
}

// --- Placeholder EpisodeRenderer for structure ---

import EpisodeContent from './EpisodeContent';

function EpisodeRenderer({ taleId, epIdx, onBack }: { taleId: string, epIdx: number, onBack: () => void }) {
  const { lang, addXP, userName, setUserName } = useApp();
  const { speak, stop, isSpeaking } = useAudio();
  const tale = TALES.find(t => t.id === taleId);
  const t = tale?.[lang];

  if (!tale || !t) return null;

  const items = [
    { fr: 'Découverte', en: 'Discovery', emoji: '🔍' },
    { fr: 'Lecture', en: 'Reading', emoji: '📖' },
    { fr: 'Vocabulaire', en: 'Vocabulary', emoji: '📝' },
    { fr: 'Grammaire', en: 'Grammar', emoji: '✏️' },
    { fr: 'Reconstitution', en: 'Reconstruction', emoji: '🗂️' },
    { fr: 'Création', en: 'Creation', emoji: '🖊️' },
    { fr: 'Mon Livre', en: 'My Book', emoji: '📚' },
  ];

  const handleFinish = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#990000', '#FAF3E0']
    });
    addXP(taleId, epIdx, 50);
    onBack();
  };

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-4 pt-24 max-w-5xl mx-auto"
    >
      <div className="fixed top-0 left-0 right-0 z-50 bg-gold-light/95 backdrop-blur-md p-4 flex items-center justify-between border-b-2 border-gold rounded-t-lg mx-2 sm:mx-6 md:mx-10 mt-2 sm:mt-4 md:mt-8">
        <button onClick={onBack} className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center border border-gold shadow-md hover:scale-110 transition-transform">
          <ArrowLeft className="w-4 h-4 text-gold" />
        </button>
        <div className="flex flex-col items-center">
           <div className="font-head text-[9px] text-crimson font-bold tracking-[0.2em] uppercase">{items[epIdx][lang === 'fr' ? 'fr' : 'en']}</div>
           <div className="font-title text-base sm:text-xl text-forest">{t.title}</div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="magic-panel p-6 sm:p-12 min-h-[75vh] flex flex-col relative border-2 border-gold shadow-2xl mt-4">
        <div className="flex-1">
          {epIdx === 1 ? (
             <div className="space-y-10">
                <div className="flex flex-wrap gap-4 mb-12 border-b border-gold/10 pb-6">
                  <button 
                    onClick={() => speak(t.readAloud, lang)} 
                    className={`magic-button !py-3 !px-6 ${isSpeaking ? 'animate-pulse ring-4 ring-crimson/20' : ''}`}
                  >
                    <Volume2 className="w-5 h-5" /> {lang === 'fr' ? 'Écouter' : 'Listen'}
                  </button>
                  <button onClick={stop} className="px-6 py-2 text-[11px] font-head font-bold text-forest border border-gold rounded-lg hover:bg-gold-light/50 transition-colors uppercase tracking-widest">Stop</button>
                  
                  <div className="ml-auto flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-head font-bold text-gold-dark uppercase tracking-wider">Moteur Bilingue</span>
                  </div>
                </div>
                <div 
                  className="story-text text-xl sm:text-2xl lg:text-3xl leading-[2] sm:leading-[2.5] lg:leading-[2.8]" 
                  dangerouslySetInnerHTML={{ __html: t.text }} 
                />
             </div>
          ) : epIdx === 6 && !userName ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center text-gold border-4 border-gold shadow-xl">
                <Settings className="w-10 h-10"/>
              </div>
              <h3 className="font-title text-2xl text-forest uppercase tracking-tight">Scribe de Légende</h3>
              <p className="font-tale text-gold-dark opacity-70 text-lg">Quel est ton nom ? Il sera gravé pour l'éternité.</p>
              <input 
                type="text"
                placeholder="Ex: Clara, Yanis..."
                className="w-full max-w-md bg-transparent border-b-4 border-gold outline-none p-4 text-center font-title text-3xl text-crimson"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          ) : (
            <EpisodeContent taleId={taleId} epIdx={epIdx} />
          )}
        </div>

        <div className="mt-16 flex justify-center border-t border-gold pb-4 pt-12">
          <button onClick={handleFinish} className="magic-button w-full max-w-sm py-5 text-xl tracking-widest shadow-[0_10px_30px_rgba(153,0,0,0.3)]">
            <CheckCircle2 className="w-6 h-6" />
            {lang === 'fr' ? 'QUÊTE ACCOMPLIE' : 'QUEST COMPLETE'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Application />
    </AppProvider>
  );
}
