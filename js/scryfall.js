// Thin wrapper around the Scryfall API (https://scryfall.com/docs/api).
(function () {
  async function searchCards(query) {
    const cards = [];
    let url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`;

    while (url) {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });

      if (res.status === 404) {
        return cards;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error((err && err.details) || `Scryfall error ${res.status}`);
      }

      const data = await res.json();
      cards.push(...data.data);
      url = data.has_more ? data.next_page : null;
      if (url) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return cards;
  }

  async function getCardById(id) {
    const res = await fetch(`https://api.scryfall.com/cards/${id}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error('Card not found.');
    }
    return res.json();
  }

  window.Scry = { searchCards, getCardById };
})();
