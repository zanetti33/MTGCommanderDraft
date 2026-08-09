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

  function sampleWithoutReplacement(pool, count) {
    if (pool.length < count) {
      throw new Error(`Pool too small: need ${count} cards, only ${pool.length} match your filters.`);
    }
    return shuffle(pool).slice(0, count);
  }

  function sampleWithReplacement(pool, count) {
    if (pool.length === 0) {
      throw new Error('No cards match your filters.');
    }
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return out;
  }

  // Draws numPlayers*3 cards from pool and splits them into groups of 3.
  // Within each group: [0] and [1] are the "shown" options, [2] is the hidden "luck" card.
  function assignPlayers(pool, numPlayers, includeDuplicates) {
    const totalNeeded = numPlayers * 3;
    const drawn = includeDuplicates
      ? sampleWithReplacement(pool, totalNeeded)
      : sampleWithoutReplacement(pool, totalNeeded);

    const players = [];
    for (let p = 0; p < numPlayers; p++) {
      players.push(drawn.slice(p * 3, p * 3 + 3));
    }
    return players;
  }

  window.Sampling = { sampleWithReplacement, sampleWithoutReplacement, assignPlayers };
})();
