(function () {
  const LANG_KEY = 'mtgDraftLang';

  const TRANSLATIONS = {
    en: {
      lang: { en: 'EN', it: 'IT' },

      host: {
        title: 'MTG Commander Drafting — Host',
        h1: 'MTG Commander Drafting',
        subtitle: 'Set up a draft pool and generate a private link for each player.',
        setCodeLabel: 'Set code',
        setCodePlaceholder: 'e.g. neo',
        setCodeHint: 'The Scryfall three-letter set code (e.g. "neo" for Kamigawa: Neon Dynasty).',
        identityLabel: 'Color identity restriction',
        identityWhite: 'White',
        identityBlue: 'Blue',
        identityBlack: 'Black',
        identityRed: 'Red',
        identityGreen: 'Green',
        identityHint: 'Only cards whose color identity fits within the checked colors are eligible. Uncheck all five to restrict to colorless-identity cards only.',
        duplicatesLabel: 'Include duplicates (allow the same card to be dealt more than once across the draft)',
        numPlayersLabel: 'Number of players',
        submit: 'Generate draft links',
        resultsH2: 'Player links',
        playerLabel: 'Player {n}',
        copy: 'Copy',
        copied: 'Copied!',
        statusLoading: 'Loading card pool from Scryfall…',
        statusSetCodeRequired: 'Please enter a set code.',
        statusNumPlayersInvalid: 'Number of players must be a positive whole number.',
        statusNoCards: 'No cards found matching these restrictions. Check the set code and color identity filters.',
        statusGenericError: 'Something went wrong.',
        cardPhraseSingular: '1 eligible card found.',
        cardPhrasePlural: '{n} eligible cards found.',
        linkPhraseSingular: '1 link generated below.',
        linkPhrasePlural: '{n} links generated below.',
      },

      player: {
        title: 'MTG Commander Drafting — Your Pick',
        h1: 'Your draft options',
        subtitle: 'Pick one of the two cards below, or try your luck for a hidden third card.',
        loading: 'Loading your cards…',
        luckPrompt: 'Not feeling either of these? Try your luck for a hidden third card instead.',
        luckBtn: 'Try your luck',
        luckRevealing: 'Revealing…',
        chooseBtn: 'Choose this card',
        resultChose: 'You chose:',
        resultLuck: 'Your luck card:',
        errorMissingData: 'This link is missing its draft data. Ask your host for a fresh link.',
        errorInvalidLink: 'This link is invalid or incomplete. Ask your host for a fresh link.',
        errorLoadCards: 'Could not load your cards from Scryfall. Please refresh to try again.',
        errorLoadLuck: 'Could not load your luck card from Scryfall. Please try again.',
        rulesToggle: 'Contest rules',
      },

      rules: {
        intro: [
          'Welcome to the first edition of the Commander build draft contest — Pinarella di Cervia 2k26.',
          "If you've made it this far, it means you've passed all the other trials and now you've earned some deckbuilding time with your friends. Well done, soldier.",
          'Here are a few simple rules so everyone has fun together:',
        ],
        bullets: [
          "Your Commander is chosen randomly from the Mystery Booster Commander Edition pool. You get 2 picks to choose from; if you don't like them and want to try your luck, you can ask for a third pick — but then you won't be able to change it again.",
          'Time limit: 1 hour.',
          'Budget: max €50, converted to EUR via Cardmarket through Archidekt (cheapest print option for all cards, +10% tolerance).',
          'Build your deck on your site of choice, then export the list to Archidekt (for price checking).',
          "You may not use EDHREC — let your imagination run free.",
        ],
        bannedHeading: 'Banned cards',
        banned: {
          colorless: 'Colorless',
          white: 'White',
          green: 'Green',
          red: 'Red',
          blue: 'Blue',
          black: 'Black',
        },
      },
    },

    it: {
      lang: { en: 'EN', it: 'IT' },

      host: {
        title: 'MTG Commander Drafting — Host',
        h1: 'MTG Commander Drafting',
        subtitle: 'Configura un pool di draft e genera un link privato per ogni giocatore.',
        setCodeLabel: 'Codice set',
        setCodePlaceholder: 'es. neo',
        setCodeHint: 'Il codice set a tre lettere di Scryfall (es. "neo" per Kamigawa: Neon Dynasty).',
        identityLabel: 'Restrizione identità di colore',
        identityWhite: 'Bianco',
        identityBlue: 'Blu',
        identityBlack: 'Nero',
        identityRed: 'Rosso',
        identityGreen: 'Verde',
        identityHint: 'Sono ammesse solo le carte la cui identità di colore rientra nei colori selezionati. Deseleziona tutti e cinque per restringere solo alle carte con identità incolore.',
        duplicatesLabel: 'Includi duplicati (permetti che la stessa carta venga assegnata più di una volta nel draft)',
        numPlayersLabel: 'Numero di giocatori',
        submit: 'Genera i link del draft',
        resultsH2: 'Link dei giocatori',
        playerLabel: 'Giocatore {n}',
        copy: 'Copia',
        copied: 'Copiato!',
        statusLoading: 'Caricamento del pool di carte da Scryfall…',
        statusSetCodeRequired: 'Inserisci un codice set.',
        statusNumPlayersInvalid: 'Il numero di giocatori deve essere un numero intero positivo.',
        statusNoCards: 'Nessuna carta trovata con queste restrizioni. Controlla il codice set e i filtri di identità di colore.',
        statusGenericError: 'Qualcosa è andato storto.',
        cardPhraseSingular: '1 carta idonea trovata.',
        cardPhrasePlural: '{n} carte idonee trovate.',
        linkPhraseSingular: '1 link generato qui sotto.',
        linkPhrasePlural: '{n} link generati qui sotto.',
      },

      player: {
        title: 'MTG Commander Drafting — La tua scelta',
        h1: 'Le tue opzioni di draft',
        subtitle: 'Scegli una delle due carte qui sotto, oppure tenta la sorte per una terza carta nascosta.',
        loading: 'Caricamento delle tue carte…',
        luckPrompt: 'Non ti convincono? Tenta la sorte per una terza carta nascosta.',
        luckBtn: 'Tenta la sorte',
        luckRevealing: 'Rivelazione…',
        chooseBtn: 'Scegli questa carta',
        resultChose: 'Hai scelto:',
        resultLuck: 'La tua carta fortunata:',
        errorMissingData: 'A questo link mancano i dati del draft. Chiedi al tuo host un nuovo link.',
        errorInvalidLink: 'Questo link non è valido o è incompleto. Chiedi al tuo host un nuovo link.',
        errorLoadCards: 'Impossibile caricare le tue carte da Scryfall. Aggiorna la pagina per riprovare.',
        errorLoadLuck: 'Impossibile caricare la tua carta fortunata da Scryfall. Riprova.',
        rulesToggle: 'Regole del contest',
      },

      rules: {
        intro: [
          'Benvenuti alla prima edizione della draft build Commander contest Pinarella di Cervia 2k26.',
          "Se sei arrivato fino a qui vuol dire che hai superato tutte le altre prove e ora ti meriti un po' di deckbuilding con i tuoi amici, bravo soldato.",
          'Ecco poche e semplici regole per divertirsi tutti insieme:',
        ],
        bullets: [
          'Il Commander è scelto randomicamente tra la pool di Mystery Booster Commander Edition, hai 2 pick da cui scegliere, se non ti piacciono e vuoi tentare la sorte puoi chiedere un terzo pick, ma poi non lo potrai cambiare nuovamente.',
          '1h di tempo.',
          'Max 50 euro di budget, costo in euro convertito per Cardmarket tramite Archidekt (opzione stampa più economica per tutte le carte, tolleranza +10%).',
          'Si builda utilizzando il sito preferito, poi si esporta la lista su Archidekt (per controllo prezzo).',
          'Non puoi utilizzare EDHREC, libera la fantasia.',
        ],
        bannedHeading: 'Carte bannate',
        banned: {
          colorless: 'Incolore',
          white: 'Bianco',
          green: 'Verde',
          red: 'Rosso',
          blue: 'Blu',
          black: 'Nero',
        },
      },
    },
  };

  const BANNED_CARDS = {
    colorless: ['Sol Ring'],
    white: [
      'Swords to Plowshares',
      'Path to Exile',
      'Smothering Tithe',
      'Generous Gift',
      "Teferi's Protection",
      'Austere Command',
      'Farewell',
      'Esper Sentinel',
      'Enlightened Tutor',
      'Flawless Maneuver',
    ],
    green: [
      'Cultivate',
      "Kodama's Reach",
      "Nature's Lore",
      'Rampant Growth',
      'Beast Within',
      'Heroic Intervention',
      'Llanowar Elves',
      'Elvish Mystic',
      'Eternal Witness',
      'Beast Whisperer',
    ],
    red: [
      'Chaos Warp',
      'Blasphemous Act',
      'Vandalblast',
      "Jeska's Will",
      'Deflecting Swat',
      'Faithless Looting',
      'Lightning Bolt',
      'Abrade',
      'Thrill of Possibility',
      'Mana Geyser',
    ],
    blue: [
      'Counterspell',
      'Rhystic Study',
      'Cyclonic Rift',
      'Ponder',
      'Brainstorm',
      'Arcane Denial',
      "An Offer You Can't Refuse",
      'Swan Song',
      'Pongify',
      'Rapid Hybridization',
    ],
    black: [
      'Dark Ritual',
      'Demonic Tutor',
      'Vampiric Tutor',
      'Reanimate',
      'Toxic Deluge',
      'Feed the Swarm',
      'Deadly Rollick',
      'Deadly Dispute',
      "Phyrexian Arena",
      "Bolas's Citadel",
    ],
  };

  const BANNED_ORDER = ['colorless', 'white', 'green', 'red', 'blue', 'black'];

  function detectDefaultLang() {
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('it') ? 'it' : 'en';
  }

  function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'it') {
      return stored;
    }
    return detectDefaultLang();
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    location.reload();
  }

  function t(path, vars) {
    const lang = getLang();
    const parts = path.split('.');
    let node = TRANSLATIONS[lang];
    for (const part of parts) {
      node = node && node[part];
    }
    if (node === undefined) {
      return path;
    }
    if (vars) {
      return Object.keys(vars).reduce((str, key) => str.replace(`{${key}}`, vars[key]), node);
    }
    return node;
  }

  function applyStaticTranslations(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    scope.querySelectorAll('[data-i18n-title]').forEach((el) => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
  }

  function renderLangSwitcher(container) {
    if (!container) {
      return;
    }
    container.innerHTML = '';
    const current = getLang();

    ['en', 'it'].forEach((lang) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-btn' + (lang === current ? ' active' : '');
      btn.textContent = lang === 'en' ? 'EN' : 'IT';
      btn.disabled = lang === current;
      btn.addEventListener('click', () => setLang(lang));
      container.appendChild(btn);
    });
  }

  function renderRules(container) {
    if (!container) {
      return;
    }
    container.innerHTML = '';

    t('rules.intro').forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      container.appendChild(p);
    });

    const bulletList = document.createElement('ul');
    t('rules.bullets').forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      bulletList.appendChild(li);
    });
    container.appendChild(bulletList);

    const bannedHeading = document.createElement('h3');
    bannedHeading.textContent = t('rules.bannedHeading');
    container.appendChild(bannedHeading);

    const bannedGrid = document.createElement('div');
    bannedGrid.className = 'banned-grid';

    BANNED_ORDER.forEach((colorKey) => {
      const group = document.createElement('div');
      group.className = 'banned-group';

      const groupHeading = document.createElement('h4');
      groupHeading.textContent = t(`rules.banned.${colorKey}`);
      group.appendChild(groupHeading);

      const list = document.createElement('ol');
      BANNED_CARDS[colorKey].forEach((cardName) => {
        const li = document.createElement('li');
        li.textContent = cardName;
        list.appendChild(li);
      });
      group.appendChild(list);

      bannedGrid.appendChild(group);
    });

    container.appendChild(bannedGrid);
  }

  window.I18n = {
    getLang,
    setLang,
    t,
    applyStaticTranslations,
    renderLangSwitcher,
    renderRules,
  };
})();
