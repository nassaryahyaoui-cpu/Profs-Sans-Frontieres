import { useState, useRef, useEffect } from 'react';
import { motion, Reorder } from 'motion/react';
import { Volume2, Trophy, Eye, EyeOff, CheckCircle2, Languages, Book, Save, Share2, Printer } from 'lucide-react';
import { useApp } from './AppContext';
import { TaleContent } from './data';
import { useAudio } from './hooks/useAudio';

// --- Global Helpers ---

function XPBadge({ amount }: { amount: number }) {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gold text-white rounded-full font-fun text-[10px] shadow-lg animate-bounce">
      <Trophy className="w-3 h-3" /> +{amount} XP
    </div>
  );
}

// --- Episodes ---

/** EP1: Tableau Narratif **/
function EP1({ content }: { content: TaleContent }) {
  const { lang } = useApp();
  const { speak } = useAudio();
  const [revealed, setRevealed] = useState<string[]>([]);

  const toggle = (k: string) => {
    if (!revealed.includes(k)) setRevealed([...revealed, k]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Object.entries(content.tableau).map(([k, cell]) => (
        <motion.div 
          key={k} 
          onClick={() => toggle(k)}
          whileTap={{ scale: 0.98 }}
          className={`p-6 md:p-8 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-center ${
            revealed.includes(k) ? 'bg-white border-gold shadow-md' : 'bg-gold-light/40 border-dashed border-gold/40 hover:bg-gold-light/60'
          }`}
        >
          <div className="font-fun text-crimson text-2xl mb-1">{cell.q}</div>
          <div className="font-head text-[11px] text-gold-dark mb-4 tracking-[0.2em] font-bold uppercase">{cell.label}</div>
          
          {revealed.includes(k) ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="font-tale text-lg md:text-xl text-[#5D4037] whitespace-pre-wrap leading-relaxed">{cell.answer}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); speak(cell.answer, lang); }}
                className="mt-6 flex items-center gap-2 text-crimson hover:text-red-700 transition-colors py-2 px-4 rounded-lg bg-red-50"
              >
                <Volume2 className="w-5 h-5" /> 
                <span className="text-xs font-bold uppercase tracking-widest">Écouter</span>
              </button>
            </motion.div>
          ) : (
            <div className="font-magic text-base text-gold-dark italic opacity-50">Clique pour révéler les secrets...</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** EP3: Vocab & Dictation **/
function EP3({ content }: { content: TaleContent }) {
  const { lang } = useApp();
  const { speak } = useAudio();
  const [answers, setAnswers] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);

  return (
    <div className="space-y-10">
      <div className="bg-gold-light/30 p-6 rounded-xl border-2 border-gold/20">
        <h4 className="font-head text-[11px] text-forest mb-6 tracking-[0.2em] font-bold uppercase">Banque de mots enchantés</h4>
        <div className="flex flex-wrap gap-3">
          {content.vocab.map(w => (
            <button 
              key={w} 
              onClick={() => speak(w, lang, 0.8)}
              className="px-6 py-2.5 bg-white border border-gold rounded-lg font-fun text-sm text-forest hover:bg-gold hover:text-white transition-all shadow-sm active:translate-y-1"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="font-head text-sm text-crimson mb-6 uppercase tracking-widest font-bold">Dictée Mystère</h4>
        {content.dictee.map((d, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 bg-white border-2 border-gold-light rounded-xl shadow-sm hover:border-gold transition-colors">
             <div className="flex items-center gap-4">
               <button onClick={() => speak(d.blank + d.rest, lang)} className="w-12 h-12 bg-crimson/10 text-crimson hover:bg-crimson hover:text-white rounded-full transition-all flex items-center justify-center border border-crimson/20"><Volume2 className="w-5 h-5"/></button>
               <input 
                 type="text"
                 placeholder="Tape ton mot ici..."
                 className="flex-1 bg-transparent border-b-4 border-gold-light focus:border-crimson outline-none py-2 font-tale text-2xl text-forest italic px-2 transition-colors"
                 onChange={(e) => {
                   const newAns = [...answers];
                   newAns[i] = e.target.value;
                   setAnswers(newAns);
                 }}
               />
               <button 
                 onClick={() => setRevealed(prev => [...prev, i])}
                 className="p-3 text-gold-dark hover:text-crimson transition-colors"
               >
                 {revealed.includes(i) ? <EyeOff className="w-6 h-6"/> : <Eye className="w-6 h-6"/>}
               </button>
             </div>
             {revealed.includes(i) && (
               <div className="text-xs font-bold font-head text-green-600 bg-green-50 p-2 rounded border border-green-200 uppercase tracking-widest">
                 Révélation: <span className="font-tale italic text-lg ml-2">{d.blank} {d.rest}</span>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** EP4: Grammar **/
function EP4({ content }: { content: TaleContent }) {
  const { lang } = useApp();
  const [selected, setSelected] = useState<Record<number, string>>({});
  const items = content.grammar.determinants.items;

  return (
    <div className="space-y-8">
      {items.map((it: any, i: number) => (
        <div key={i} className="space-y-4">
          <div className="font-tale text-xl text-gold-dark">
            {it.sentence}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {it.opts.map((opt: string) => {
              const isSelected = selected[i] === opt;
              const isCorrect = opt === it.answer;
              return (
                <button
                  key={opt}
                  onClick={() => setSelected({ ...selected, [i]: opt })}
                  className={`p-3 rounded-xl border text-sm font-head transition-all ${
                    isSelected 
                      ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700')
                      : 'bg-white border-gold/10 text-gold hover:border-gold/40'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** EP5: Reconstruction **/
function EP5({ content }: { content: TaleContent }) {
  const [items, setItems] = useState<string[]>([]);
  
  useEffect(() => {
    setItems([...content.reconstruction].sort(() => Math.random() - 0.5));
  }, [content]);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-head text-gold/60 mb-4 text-center uppercase tracking-widest">Drag to order</div>
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
        {items.map(item => (
          <Reorder.Item 
            key={item} 
            value={item}
            className="p-4 bg-white border border-gold/20 rounded-xl shadow-sm cursor-grab active:cursor-grabbing font-tale text-sm hover:border-gold transition-colors"
          >
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

/** EP6: Creation **/
function EP6({ taleId, content }: { taleId: string, content: TaleContent }) {
  const { lang, userName } = useApp();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`creation_${taleId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTitle(parsed.title || '');
      setText(parsed.text || '');
    }
  }, [taleId]);

  const save = () => {
    localStorage.setItem(`creation_${taleId}`, JSON.stringify({ title, text }));
    const savedCreations = JSON.parse(localStorage.getItem('creationData') || '{}');
    savedCreations[taleId] = { title, text };
    localStorage.setItem('creationData', JSON.stringify(savedCreations));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-head text-gold uppercase">Titre de mon conte</label>
        <input 
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); save(); }}
          className="w-full bg-transparent border-b-2 border-gold/20 focus:border-gold outline-none p-2 font-title text-xl text-crimson text-center"
          placeholder="..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
           <label className="text-[10px] font-head text-gold uppercase">Il était une fois...</label>
           <span className="text-[9px] text-gold/40">{text.length} characters</span>
        </div>
        <textarea 
          value={text}
          onChange={(e) => { setText(e.target.value); save(); }}
          className="w-full min-h-[300px] p-6 bg-gold/5 border border-gold/10 rounded-2xl outline-none focus:border-gold/40 font-tale text-lg leading-relaxed resize-none"
          placeholder="Laisse libre cours à ton imagination..."
        />
      </div>

      <div className="bg-gold/5 p-4 rounded-xl space-y-4">
        <h4 className="text-[10px] font-head text-gold uppercase">Word Inspiration</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(content.wordBank).map(([cat, words]) => (
            words.map(w => (
              <button 
                key={w} 
                onClick={() => setText(prev => prev + ' ' + w)}
                className="text-xs font-fun text-gold/60 hover:text-gold"
              >
                + {w}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

/** EP7: Mon Livre & Diploma **/
function EP7({ taleId, content }: { taleId: string, content: TaleContent }) {
  const { lang, userName } = useApp();
  const [creation, setCreation] = useState({ title: '', text: '' });

  useEffect(() => {
    const saved = localStorage.getItem(`creation_${taleId}`);
    if (saved) setCreation(JSON.parse(saved));
  }, [taleId]);

  return (
    <div className="space-y-16">
      <div className="book-preview p-8 md:p-12 bg-white border-8 border-double border-gold rounded-2xl shadow-2xl text-center relative overflow-hidden">
        <div className="paper-texture !opacity-20" />
        <h2 className="font-title text-4xl md:text-5xl text-crimson mb-4 relative z-10 leading-tight">{creation.title || content.title}</h2>
        <p className="font-head text-[13px] font-bold tracking-[0.3em] uppercase text-gold-dark mb-12 relative z-10">Par {userName || 'Anonyme Exploirateur'}</p>
        <div className="font-tale text-xl md:text-2xl leading-[2.2] text-[#5D4037] text-left whitespace-pre-wrap max-h-[500px] overflow-y-auto pr-6 relative z-10 custom-scrollbar italic lg:px-12">
          {creation.text || (lang === 'fr' ? 'La plume attend ton inspiration...' : 'The quill awaits your inspiration...')}
        </div>
        <div className="mt-12 flex justify-center gap-6 relative z-10">
          <button onClick={() => window.print()} className="w-14 h-14 bg-crimson/5 text-crimson hover:bg-crimson hover:text-white rounded-full transition-all flex items-center justify-center border-2 border-crimson/20 shadow-md">
            <Printer className="w-6 h-6"/>
          </button>
          <button className="w-14 h-14 bg-gold/5 text-gold-dark hover:bg-gold hover:text-white rounded-full transition-all flex items-center justify-center border-2 border-gold/20 shadow-md">
            <Share2 className="w-6 h-6"/>
          </button>
        </div>
      </div>

      <div className="p-10 md:p-16 border-[12px] border-double border-gold text-center relative overflow-hidden bg-[#FAF3E0] shadow-inner mb-12">
        <div className="paper-texture !opacity-30" />
        <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-crimson/20 m-6 opacity-40" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-crimson/20 m-6 opacity-40" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-crimson rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-gold shadow-2xl transform -rotate-3">
             <Trophy className="w-10 h-10 text-gold" />
          </div>
          <h3 className="font-title text-3xl md:text-5xl text-forest mb-4 tracking-tight">SCEAU DE LÉNGE</h3>
          <p className="font-head text-[11px] font-bold tracking-[0.4em] uppercase text-crimson mb-10">Certifié par M. Yahyaoui Nabil</p>
          
          <div className="font-head text-[10px] text-gold-dark mb-4 uppercase tracking-[0.5em] font-bold opacity-60">Décerné solennellement à</div>
          <div className="font-title text-4xl md:text-6xl text-forest mb-12 border-b-4 border-crimson inline-block px-12 md:px-24 pb-4">
            {userName || 'VALEUREUX SCRIBE'}
          </div>
          
          <p className="font-tale text-2xl text-[#8B5E3C] max-w-2xl mx-auto leading-[1.8] italic mb-12">
            Puisse ton courage et ton éloquence résonner <br/>
            à travers les âges, car tu as maîtrisé l'art bilingue <br/>
            sacré de la légende de <br/>
            <span className="text-crimson font-bold uppercase tracking-widest font-head not-italic text-lg ml-2">"{content.title}"</span>
          </p>
          
          <div className="mt-16 flex justify-between items-end border-t border-gold/30 pt-10">
            <div className="text-left">
              <div className="text-[10px] font-head text-gold-dark font-bold uppercase tracking-widest mb-1">DATE SACRÉE</div>
              <div className="font-magic font-bold text-lg md:text-xl text-forest">{new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB')}</div>
            </div>
            
            <div className="text-center opacity-70 group hover:opacity-100 transition-opacity">
               <div className="text-[8px] font-bold font-head uppercase tracking-widest mb-2">Sceau du Royaume</div>
               <div className="w-16 h-16 rounded-full border-4 border-gold border-dashed flex items-center justify-center animate-spin-slow">
                 <CheckCircle2 className="w-8 h-8 text-gold drop-shadow-md" />
               </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-head text-gold-dark font-bold uppercase tracking-widest mb-1">SIGNATURE</div>
              <div className="font-fun text-xl md:text-2xl text-crimson -rotate-2">Contes en Quête</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Exporter ---

export default function EpisodeContent({ taleId, epIdx }: { taleId: string, epIdx: number }) {
  const { lang } = useApp();
  const tale = require('./data').TALES.find((t: any) => t.id === taleId);
  const content = tale?.[lang] as TaleContent;

  if (!content) return null;

  switch (epIdx) {
    case 0: return <EP1 content={content} />;
    case 1: return null; // Handled in App.tsx directly for text flow
    case 2: return <EP3 content={content} />;
    case 3: return <EP4 content={content} />;
    case 4: return <EP5 content={content} />;
    case 5: return <EP6 taleId={taleId} content={content} />;
    case 6: return <EP7 taleId={taleId} content={content} />;
    default: return <div className="text-center text-gold/20 font-magic italic">Indisponible</div>;
  }
}
