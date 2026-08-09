(function () {
  const form = document.getElementById('draft-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('status');
  const resultsEl = document.getElementById('results');
  const resultsSummaryEl = document.getElementById('results-summary');
  const playerListEl = document.getElementById('player-list');

  const t = window.I18n.t;
  document.title = t('host.title');
  document.documentElement.lang = window.I18n.getLang();
  window.I18n.applyStaticTranslations();
  window.I18n.renderLangSwitcher(document.getElementById('lang-switcher'));

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

  function buildPlayerLink(cardIds) {
    const encoded = window.Encoding.encodePayload(cardIds);
    return new URL(`player.html?d=${encoded}`, document.baseURI).toString();
  }

  function renderResults(poolSize, playerHands) {
    const cardPhrase = t(poolSize === 1 ? 'host.cardPhraseSingular' : 'host.cardPhrasePlural', { n: poolSize });
    const linkPhrase = t(playerHands.length === 1 ? 'host.linkPhraseSingular' : 'host.linkPhrasePlural', { n: playerHands.length });
    resultsSummaryEl.textContent = `${cardPhrase} ${linkPhrase}`;
    playerListEl.innerHTML = '';

    playerHands.forEach((hand, index) => {
      const link = buildPlayerLink(hand.map((c) => c.id));

      const row = document.createElement('div');
      row.className = 'player-row';

      const label = document.createElement('span');
      label.className = 'player-label';
      label.textContent = t('host.playerLabel', { n: index + 1 });

      const input = document.createElement('input');
      input.type = 'text';
      input.readOnly = true;
      input.value = link;

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'secondary';
      copyBtn.textContent = t('host.copy');
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(link);
          copyBtn.textContent = t('host.copied');
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = t('host.copy');
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

    const query = document.getElementById('scryfall-query').value.trim();
    const includeDuplicates = document.getElementById('include-duplicates').checked;
    const numPlayers = parseInt(document.getElementById('num-players').value, 10);

    if (!query) {
      setStatus(t('host.statusQueryRequired'), true);
      return;
    }
    if (!Number.isInteger(numPlayers) || numPlayers < 1) {
      setStatus(t('host.statusNumPlayersInvalid'), true);
      return;
    }

    submitBtn.disabled = true;
    setStatus(t('host.statusLoading'), false);

    try {
      const query = buildQuery(setCode, identityQueryValue);
      const pool = await window.Scry.searchCards(query);

      if (pool.length === 0) {
        setStatus(t('host.statusNoCards'), true);
        return;
      }

      const playerHands = window.Sampling.assignPlayers(pool, numPlayers, includeDuplicates);

      setStatus(null);
      renderResults(pool.length, playerHands);
    } catch (err) {
      setStatus(err.message || t('host.statusGenericError'), true);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
