// Draft sampling: turns a card pool into a 3-card hand per player.
(function () {
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function samplingError(code, message, data) {
    const err = new Error(message);
    err.code = code;
    Object.assign(err, data || {});
    return err;
  }

  function sampleWithoutReplacement(pool, count) {
    if (pool.length < count) {
      throw samplingError(
        'POOL_TOO_SMALL_NO_DUPLICATES',
        `Pool too small: need ${count} cards, only ${pool.length} match your filters.`,
        { needed: count, available: pool.length }
      );
    }
    return shuffle(pool).slice(0, count);
  }

  function sampleWithReplacement(pool, count) {
    if (pool.length === 0) {
      throw samplingError('EMPTY_POOL', 'No cards match your filters.');
    }
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return out;
  }

  // A card's colors, whether they live on the top-level object or (for
  // double-faced/split cards) are split across `card_faces`.
  function cardColors(card) {
    if (Array.isArray(card.colors)) {
      return card.colors;
    }
    if (Array.isArray(card.card_faces)) {
      const set = new Set();
      card.card_faces.forEach((face) => (face.colors || []).forEach((c) => set.add(c)));
      return Array.from(set);
    }
    return [];
  }

  function sameColorSet(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    const sa = a.slice().sort();
    const sb = b.slice().sort();
    return sa.every((c, i) => c === sb[i]);
  }

  function colorsOverlap(a, b) {
    return a.some((c) => b.includes(c));
  }

  // A card's colors for 'unique colors' purposes, treating colorless as its
  // own pseudo-color ('C') rather than exempting it from the constraint.
  function effectiveColors(card) {
    const colors = cardColors(card);
    return colors.length === 0 ? ['C'] : colors;
  }

  // Can `card` join a group that already contains `groupCards` under the given
  // 'unique colors' mode? Colorless counts as its own color (a player can't
  // get more than one colorless card once this is enabled).
  //  - 'default': no two cards in the group may share the exact same color set.
  //  - 'strict': no color may appear in more than one card of the group, even
  //    combined with other colors.
  function isColorCompatible(mode, groupCards, card) {
    if (!mode || mode === 'disabled') {
      return true;
    }
    const candidateColors = effectiveColors(card);
    return groupCards.every((existing) => {
      const existingColors = effectiveColors(existing);
      return mode === 'strict'
        ? !colorsOverlap(existingColors, candidateColors)
        : !sameColorSet(existingColors, candidateColors);
    });
  }

  // Bounded backtracking search for a 3-card, color-compatible group among
  // `entries` ({ card, idx }[]). Returns the chosen entries, or null if none
  // was found within the search budget.
  function findGroup(entries, mode, budget) {
    function backtrack(chosen, remaining) {
      if (chosen.length === 3) {
        return chosen;
      }
      for (let i = 0; i < remaining.length; i++) {
        if (budget.calls++ > budget.max) {
          return null;
        }
        const entry = remaining[i];
        if (isColorCompatible(mode, chosen.map((e) => e.card), entry.card)) {
          const rest = remaining.slice(0, i).concat(remaining.slice(i + 1));
          const result = backtrack(chosen.concat([entry]), rest);
          if (result) {
            return result;
          }
        }
      }
      return null;
    }

    return backtrack([], entries);
  }

  const GROUP_SEARCH_BUDGET = 4000;
  const MAX_ASSIGNMENT_ATTEMPTS = 200;

  // Draws numPlayers*3 cards from pool and splits them into groups of 3.
  // Within each group: [0] and [1] are the "shown" options, [2] is the hidden "luck" card.
  //
  // `uniqueColorsMode` ('disabled' | 'default' | 'strict', default 'disabled') constrains
  // which cards may share a single player's group of 3 — see isColorCompatible. The
  // constraint is local to each player's group; it does not compare across players.
  function assignPlayers(pool, numPlayers, includeDuplicates, uniqueColorsMode) {
    const totalNeeded = numPlayers * 3;
    const mode = uniqueColorsMode || 'disabled';

    if (mode === 'disabled') {
      const drawn = includeDuplicates
        ? sampleWithReplacement(pool, totalNeeded)
        : sampleWithoutReplacement(pool, totalNeeded);

      const players = [];
      for (let p = 0; p < numPlayers; p++) {
        players.push(drawn.slice(p * 3, p * 3 + 3));
      }
      return players;
    }

    if (!includeDuplicates && pool.length < totalNeeded) {
      throw samplingError(
        'POOL_TOO_SMALL_NO_DUPLICATES',
        `Pool too small: need ${totalNeeded} cards, only ${pool.length} match your filters.`,
        { needed: totalNeeded, available: pool.length }
      );
    }

    const basePoolEntries = pool.map((card, idx) => ({ card, idx }));

    for (let attempt = 0; attempt < MAX_ASSIGNMENT_ATTEMPTS; attempt++) {
      const players = [];
      let available = shuffle(basePoolEntries);
      let ok = true;

      for (let p = 0; p < numPlayers; p++) {
        const candidates = includeDuplicates ? shuffle(basePoolEntries) : available;
        const group = findGroup(candidates, mode, { calls: 0, max: GROUP_SEARCH_BUDGET });
        if (!group) {
          ok = false;
          break;
        }
        players.push(group.map((e) => e.card));
        if (!includeDuplicates) {
          const usedIdxs = new Set(group.map((e) => e.idx));
          available = available.filter((e) => !usedIdxs.has(e.idx));
        }
      }

      if (ok) {
        return players;
      }
    }

    throw samplingError(
      'UNSATISFIABLE_COLOR_CONSTRAINT',
      `Could not build ${numPlayers} player pools that satisfy the "unique colors" (${mode}) rule from this pool of ${pool.length} cards.`,
      { numPlayers, poolSize: pool.length, mode }
    );
  }

  window.Sampling = {
    sampleWithReplacement,
    sampleWithoutReplacement,
    assignPlayers,
    cardColors,
    isColorCompatible,
  };
})();
