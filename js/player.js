(function () {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const choiceViewEl = document.getElementById('choice-view');
  const cardsRowEl = document.getElementById('cards-row');
  const luckBtn = document.getElementById('luck-btn');
  const resultViewEl = document.getElementById('result-view');
  const resultHeadingEl = document.getElementById('result-heading');
  const resultImageEl = document.getElementById('result-image');
  const resultNameEl = document.getElementById('result-name');
  const imageModalEl = document.getElementById('image-modal');
  const modalImageEl = document.getElementById('modal-image');

  const t = window.I18n.t;
  document.title = t('player.title');
  document.documentElement.lang = window.I18n.getLang();
  window.I18n.applyStaticTranslations();
  window.I18n.renderLangSwitcher(document.getElementById('lang-switcher'));
  window.I18n.renderRules(document.getElementById('rules-content'));

  function showError(message) {
    loadingEl.classList.add('hidden');
    choiceViewEl.classList.add('hidden');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  function cardImageUrl(card, size) {
    const uris = card.image_uris || (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris);
    if (!uris) {
      return '';
    }
    return uris[size || 'normal'] || uris.normal || '';
  }

  function openImageModal(url, alt) {
    modalImageEl.src = url;
    modalImageEl.alt = alt;
    imageModalEl.classList.remove('hidden');
  }

  function closeImageModal() {
    imageModalEl.classList.add('hidden');
    modalImageEl.src = '';
  }

  imageModalEl.addEventListener('click', closeImageModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeImageModal();
    }
  });

  function makeClickableFullscreen(img, card) {
    img.addEventListener('click', () => openImageModal(cardImageUrl(card, 'large'), card.name));
  }

  function showResult(heading, card) {
    choiceViewEl.classList.add('hidden');
    resultHeadingEl.textContent = heading;
    resultImageEl.src = cardImageUrl(card);
    resultImageEl.alt = card.name;
    resultNameEl.textContent = card.name;
    resultViewEl.classList.remove('hidden');
    resultImageEl.onclick = () => openImageModal(cardImageUrl(card, 'large'), card.name);
  }

  function renderChoices(shownCards, onChoose) {
    cardsRowEl.innerHTML = '';

    shownCards.forEach((card) => {
      const box = document.createElement('div');
      box.className = 'card-option';

      const img = document.createElement('img');
      img.src = cardImageUrl(card);
      img.alt = card.name;
      makeClickableFullscreen(img, card);

      const title = document.createElement('h3');
      title.textContent = card.name;

      const chooseBtn = document.createElement('button');
      chooseBtn.type = 'button';
      chooseBtn.className = 'primary';
      chooseBtn.textContent = t('player.chooseBtn');
      chooseBtn.addEventListener('click', () => onChoose(card));

      box.appendChild(img);
      box.appendChild(title);
      box.appendChild(chooseBtn);
      cardsRowEl.appendChild(box);
    });

    loadingEl.classList.add('hidden');
    choiceViewEl.classList.remove('hidden');
  }

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('d');

    if (!encoded) {
      showError(t('player.errorMissingData'));
      return;
    }

    let cardIds;
    try {
      cardIds = window.Encoding.decodePayload(encoded);
    } catch (e) {
      showError(t('player.errorInvalidLink'));
      return;
    }

    const [shownIdA, shownIdB, luckId] = cardIds;

    let shownCards;
    try {
      shownCards = await Promise.all([
        window.Scry.getCardById(shownIdA),
        window.Scry.getCardById(shownIdB),
      ]);
    } catch (e) {
      showError(t('player.errorLoadCards'));
      return;
    }

    renderChoices(shownCards, (card) => {
      luckBtn.disabled = true;
      showResult(t('player.resultChose'), card);
    });

    luckBtn.addEventListener('click', async () => {
      luckBtn.disabled = true;
      luckBtn.textContent = t('player.luckRevealing');
      try {
        const luckCard = await window.Scry.getCardById(luckId);
        showResult(t('player.resultLuck'), luckCard);
      } catch (e) {
        luckBtn.disabled = false;
        luckBtn.textContent = t('player.luckBtn');
        showError(t('player.errorLoadLuck'));
      }
    });
  }

  init();
})();
