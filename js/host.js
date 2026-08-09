(function () {
  const form = document.getElementById('draft-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('status');
  const resultsEl = document.getElementById('results');
  const resultsSummaryEl = document.getElementById('results-summary');
  const playerListEl = document.getElementById('player-list');

  function setStatus(message, isError) {
    if (!message) {
      statusEl.classList.add('hidden');
      statusEl.textContent = '';
      return;
    }
    statusEl.classList.remove('hidden');
    statusEl.classList.toggle('error', !!isError);
    statusEl.textContent = message;
  }

  function buildQuery(setCode, identityLetters) {
    let q = `set:${setCode} identity<=${identityLetters}`;
    return q.trim();
  }

  function buildPlayerLink(cardIds) {
    const encoded = window.Encoding.encodePayload(cardIds);
    return new URL(`player.html?d=${encoded}`, document.baseURI).toString();
  }

  function renderResults(poolSize, playerHands) {
    resultsSummaryEl.textContent = `${poolSize} eligible card${poolSize === 1 ? '' : 's'} found. ${playerHands.length} link${playerHands.length === 1 ? '' : 's'} generated below.`;
    playerListEl.innerHTML = '';

    playerHands.forEach((hand, index) => {
      const link = buildPlayerLink(hand.map((c) => c.id));

      const row = document.createElement('div');
      row.className = 'player-row';

      const label = document.createElement('span');
      label.className = 'player-label';
      label.textContent = `Player ${index + 1}`;

      const input = document.createElement('input');
      input.type = 'text';
      input.readOnly = true;
      input.value = link;

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'secondary';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(link);
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 1500);
        } catch (e) {
          input.select();
        }
      });

      row.appendChild(label);
      row.appendChild(input);
      row.appendChild(copyBtn);
      playerListEl.appendChild(row);
    });

    resultsEl.classList.remove('hidden');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    resultsEl.classList.add('hidden');
    setStatus(null);

    const setCode = document.getElementById('set-code').value.trim().toLowerCase();
    const includeDuplicates = document.getElementById('include-duplicates').checked;
    const numPlayers = parseInt(document.getElementById('num-players').value, 10);

    const identityLetters = Array.from(document.querySelectorAll('.identity-box'))
      .filter((box) => box.checked)
      .map((box) => box.value)
      .join('');
    const identityQueryValue = identityLetters || 'c';

    if (!setCode) {
      setStatus('Please enter a set code.', true);
      return;
    }
    if (!Number.isInteger(numPlayers) || numPlayers < 1) {
      setStatus('Number of players must be a positive whole number.', true);
      return;
    }

    submitBtn.disabled = true;
    setStatus('Loading card pool from Scryfall…', false);

    try {
      const query = buildQuery(setCode, identityQueryValue);
      const pool = await window.Scry.searchCards(query);

      if (pool.length === 0) {
        setStatus('No cards found matching these restrictions. Check the set code and color identity filters.', true);
        return;
      }

      const playerHands = window.Sampling.assignPlayers(pool, numPlayers, includeDuplicates);

      setStatus(null);
      renderResults(pool.length, playerHands);
    } catch (err) {
      setStatus(err.message || 'Something went wrong.', true);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
