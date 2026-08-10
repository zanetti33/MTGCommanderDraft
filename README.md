*[Leggi questo in italiano](README.it.md)*

# MTG Commander Draft

A small static site for running a **"2 of 3" draft** of Magic: The Gathering cards, built for Commander card pools but usable with any [Scryfall](https://scryfall.com/docs/api) search.

**🔗 Try it live: [zanetti33.github.io/MTGCommanderDraft](https://zanetti33.github.io/MTGCommanderDraft/)**

## What it is

The host (whoever runs the draft) defines a card pool with a Scryfall search query (e.g. a set, a color identity, some filters) and the number of players. The site automatically generates a personal link for each player, with 3 cards randomly drawn from the pool.

Opening their link, each player only sees **2 of the 3 cards** and must pick one of them — or "try their luck" and get the hidden third card instead, with no way back.

Nothing to install, no account needed: the host generates the links from the main page and shares each one (e.g. in chat) with the corresponding player.

## How to use it

**As host**
1. Go to [zanetti33.github.io/MTGCommanderDraft](https://zanetti33.github.io/MTGCommanderDraft/).
2. Enter a Scryfall search query to define the card pool (e.g. `set:neo t:creature identity<=wu`).
3. Choose the number of players and the pool options: whether to allow duplicates, and whether to enforce "unique colors" within each player's pool.
4. Generate the links and share each one with its player.

**As player**
1. Open the link you received from the host.
2. Look at the 2 proposed cards and pick one, or "try your luck" to reveal the hidden third card instead.

The site is available in **Italian and English** (switchable from the top of the page).

## Main features

- Card pool defined with any valid Scryfall query (set, colors, type, rarity, etc.).
- Configurable number of players, with or without duplicates across the whole pool.
- Optional "unique colors" filter so a player doesn't get cards of the same colors (with a looser and a stricter mode).
- No backend: each player's cards are encoded directly in their link, and the host can't see what a player ultimately picks.