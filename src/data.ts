export interface TaleContent {
  title: string;
  entitle: string;
  author: string;
  text: string;
  readAloud: string;
  tableau: {
    [key: string]: {
      q: string;
      label: string;
      icon: string;
      answer: string;
    };
  };
  vocab: string[];
  dictee: { blank: string; rest: string }[];
  extraDictee: { blank: string; rest: string }[];
  grammar: any;
  reconstruction: string[];
  wordBank: { [key: string]: string[] };
  moral: string;
}

export interface Tale {
  id: string;
  emoji: string;
  bg: string;
  fr: TaleContent;
  en: TaleContent;
}

export const TALES: Tale[] = [
  {
    id: 'chaperon',
    emoji: '🔴',
    bg: 'radial-gradient(ellipse at 30% 40%,rgba(139,26,26,.3),transparent 60%),radial-gradient(ellipse at 70% 60%,rgba(253,230,138,.15),transparent 60%),linear-gradient(180deg,#fefce8,#fef9c3)',
    fr: {
      title: 'Le Petit Chaperon Rouge',
      entitle: 'Little Red Riding Hood',
      author: 'Charles Perrault / Frères Grimm',
      text: `<span class="dropcap">I</span>l était une fois une petite fille que tout le monde aimait. Sa grand-mère lui avait offert un beau chaperon rouge. On l'appelait <strong>Le Petit Chaperon Rouge</strong>...`,
      readAloud: `Il était une fois le Petit Chaperon Rouge. Sa maman lui demanda d'apporter une galette à sa grand-mère malade...`,
      tableau: {
        qui: { q: 'Qui ? 👤', label: 'PERSONNAGES', icon: '👤', answer: 'Héroïne : Le Petit Chaperon Rouge 🔴\nAlliés : La maman, la grand-mère, le chasseur\nEnnemis : Le grand loup 🐺' },
        quoi: { q: 'Quoi ? 📖', label: 'ÉVÉNEMENTS', icon: '📖', answer: 'La petite fille apporte une galette à sa grand-mère malade. Le loup la trompe...' },
        ou: { q: 'Où ? 📍', label: 'LIEUX', icon: '📍', answer: '🏠 La maison de la maman\n🌲 La forêt sombre et profonde\n🏡 La maison de la grand-mère' },
        quand: { q: 'Quand ? ⏰', label: 'TEMPS', icon: '⏰', answer: 'Un matin de printemps. L\'histoire dure une journée entière.' }
      },
      vocab: ['chaperon', 'forêt', 'grand-mère', 'galette', 'chasseur', 'loup', 'oreilles', 'dents', 'chemin', 'inconnu'],
      dictee: [
        { blank: "D'abord", rest: ", la petite fille prépare son panier." },
        { blank: "Ensuite", rest: ", elle part dans la grande forêt." }
      ],
      extraDictee: [
        { blank: "sombre", rest: "La forêt était ___ et mystérieuse." }
      ],
      grammar: {
        determinants: {
          q: "Choisis le bon déterminant pour chaque nom :",
          items: [
            { sentence: "___ petite fille portait un chaperon rouge.", answer: "La", opts: ["La", "Le", "Les", "Un"] }
          ]
        }
      },
      reconstruction: [
        "🏠 La maman prépare une galette pour la grand-mère malade.",
        "🌲 Le Petit Chaperon Rouge part seule dans la grande forêt."
      ],
      wordBank: {
        lieux: ["la forêt", "le château"],
        persos: ["la princesse", "le loup"]
      },
      moral: "Il ne faut jamais parler aux inconnus."
    },
    en: {
      title: 'Little Red Riding Hood',
      entitle: 'Le Petit Chaperon Rouge',
      author: 'Charles Perrault / Brothers Grimm',
      text: `<span class="dropcap">O</span>nce upon a time, there was a little girl everyone loved...`,
      readAloud: `Once upon a time there was Little Red Riding Hood...`,
      tableau: {
        qui: { q: 'Who? 👤', label: 'CHARACTERS', icon: '👤', answer: 'Hero: Little Red Riding Hood 🔴\nAllies: Mother, grandmother, hunter\nVillain: The Big Bad Wolf 🐺' },
        quoi: { q: 'What? 📖', label: 'EVENTS', icon: '📖', answer: 'The girl brings a cake to her sick grandmother...' },
        ou: { q: 'Where? 📍', label: 'PLACES', icon: '📍', answer: '🏠 Mother\'s house\n🌲 The dark forest' },
        quand: { q: 'When? ⏰', label: 'TIME', icon: '⏰', answer: 'One spring morning.' }
      },
      vocab: ['hood', 'forest', 'grandmother', 'cake', 'hunter', 'wolf', 'ears', 'teeth', 'path', 'stranger'],
      dictee: [
        { blank: "First", rest: ", the little girl prepares her basket." },
        { blank: "Then", rest: ", she walks into the big forest." }
      ],
      extraDictee: [
        { blank: "dark", rest: "The forest was ___ and mysterious." }
      ],
      grammar: {
        determinants: {
          q: "Choose the right article:",
          items: [
            { sentence: "___ little girl wore a red hood.", answer: "The", opts: ["The", "A", "An", "Some"] }
          ]
        }
      },
      reconstruction: [
        "🏠 Mother prepares a cake for sick grandmother.",
        "🌲 Little Red Riding Hood walks alone into the big forest."
      ],
      wordBank: {
        lieux: ["the forest", "the castle"],
        persos: ["the princess", "the wolf"]
      },
      moral: "Never talk to strangers."
    }
  },
  {
    id: 'blanche',
    emoji: '⬜',
    bg: 'radial-gradient(ellipse at 25% 35%,rgba(26,26,58,.4),transparent 60%),radial-gradient(ellipse at 75% 65%,rgba(139,26,26,.2),transparent 60%),linear-gradient(180deg,#06060e,#fffbeb)',
    fr: {
      title: 'Blanche Neige et les 7 Nains',
      entitle: 'Snow White and the 7 Dwarfs',
      author: 'Frères Grimm',
      text: `<span class="dropcap">I</span>l était une fois une princesse à la peau blanche comme neige...`,
      readAloud: `Il était une fois Blanche Neige...`,
      tableau: {
        qui: { q: 'Qui ? 👤', label: 'PERSONNAGES', icon: '👤', answer: 'Héroïne : Blanche Neige ⬜\nAlliés : Les 7 nains, le prince' },
        quoi: { q: 'Quoi ? 📖', label: 'ÉVÉNEMENTS', icon: '📖', answer: 'La reine veut tuer Blanche Neige par jalousie...' },
        ou: { q: 'Où ? 📍', label: 'LIEUX', icon: '📍', answer: '🏰 Le château royal\n🌲 La forêt profonde' },
        quand: { q: 'Quand ? ⏰', label: 'TEMPS', icon: '⏰', answer: 'Il était une fois... dans un lointain royaume.' }
      },
      vocab: ['miroir', 'pomme', 'nains', 'reine', 'jalousie'],
      dictee: [
        { blank: "D'abord", rest: ", la reine consulte son miroir." }
      ],
      extraDictee: [],
      grammar: {},
      reconstruction: [
        "🪞 La reine interroge son miroir magique chaque matin."
      ],
      wordBank: {},
      moral: "La bonté triomphe toujours."
    },
    en: {
      title: 'Snow White',
      entitle: 'Blanche Neige',
      author: 'Brothers Grimm',
      text: `...`,
      readAloud: `...`,
      tableau: { qui: { q: 'Who?', label: 'CHARACTERS', icon: '👤', answer: 'Snow White' }, quoi: { q: 'What?', label: 'EVENTS', icon: '📖', answer: 'Queen is jealous' }, ou: { q: 'Where?', label: 'PLACES', icon: '📍', answer: 'Forest' }, quand: { q: 'When?', label: 'TIME', icon: '⏰', answer: 'Once upon a time' } },
      vocab: [],
      dictee: [],
      extraDictee: [],
      grammar: {},
      reconstruction: [],
      wordBank: {},
      moral: "Kindness triumphs"
    }
  },
  {
    id: 'pinocchio',
    emoji: '🪵',
    bg: 'radial-gradient(ellipse at 30% 40%,rgba(107,58,26,.3),transparent 60%),radial-gradient(ellipse at 70% 60%,rgba(26,74,46,.2),transparent 60%),linear-gradient(180deg,#100804,#fefce8)',
    fr: {
      title: 'Pinocchio',
      entitle: 'Pinocchio',
      author: 'Carlo Collodi',
      text: `<span class="dropcap">I</span>l était une fois un vieil homme nommé Geppetto...`,
      readAloud: `Il était une fois Geppetto...`,
      tableau: { qui: { q: 'Qui?', label: 'PERSOS', icon: '👤', answer: 'Pinocchio' }, quoi: { q: 'Quoi?', label: 'EVENTS', icon: '📖', answer: 'Mensonge' }, ou: { q: 'Où?', label: 'PLACES', icon: '📍', answer: 'Atelier' }, quand: { q: 'Quand?', label: 'TIME', icon: '⏰', answer: 'Soir' } },
      vocab: [],
      dictee: [],
      extraDictee: [],
      grammar: {},
      reconstruction: [],
      wordBank: {},
      moral: "L'honnêteté transforme les cœurs."
    },
    en: {
      title: 'Pinocchio',
      entitle: 'Pinocchio',
      author: 'Carlo Collodi',
      text: `...`,
      readAloud: `...`,
      tableau: { qui: { q: 'Who?', label: 'CHARACTERS', icon: '👤', answer: 'Pinocchio' }, quoi: { q: 'What?', label: 'EVENTS', icon: '📖', answer: 'Lies' }, ou: { q: 'Where?', label: 'PLACES', icon: '📍', answer: 'Workshop' }, quand: { q: 'When?', label: 'TIME', icon: '⏰', answer: 'Once upon a time' } },
      vocab: [],
      dictee: [],
      extraDictee: [],
      grammar: {},
      reconstruction: [],
      wordBank: {},
      moral: "Honesty transforms hearts."
    }
  }
];
