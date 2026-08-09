# MTG Drafting
I want to create an app used for magic the gathering drafting. In particular, for the MVP, I want the possibility to draft from a specific set and with some restriction on the pool.
The draft will be like this:
- An host decides the pool restrictions (set, include duplicates, forcing some identity ecc...) and the number of players
- The web app generates a link for each player with 3 cards exctracted from the pool.
- The link will show 2 of the cards to the player opening the link and he can chose one of them or try his luck. If he tries his luck he is assigned the third chosen card.

The web site can be static and work with query values (hidden to not make the option obvious to anyone). The card pool and queries can be done to the open api of [Scryfall](https://scryfall.com/docs/api).
We will offer this site on an open link in github pages.

## How it works

- `index.html` — host page. Enter any Scryfall search query (e.g. `set:neo t:creature identity<=wu`), choose whether duplicates are allowed across the draft, and set the number of players. Submitting fetches the eligible card pool from Scryfall and generates one link per player.
- `player.html` — player page. Opened via a generated link, it reveals 2 of the player's 3 assigned cards; the player can choose one, or "try their luck" to reveal the hidden third card instead.

The whole site is static (plain HTML/CSS/vanilla JS, no build step, no backend). Each player link encodes its 3 card ids in a base64 query parameter (`?d=...`) so the cards aren't in plaintext in the URL — this is obfuscation to preserve the surprise, not real security. There is no server-side state: nothing is persisted, and the host can't see what a player ultimately picked.

## Running locally

Open `index.html` directly in a browser (double-click, or `file://...`), or serve the folder with any static file server, e.g.:

```
python -m http.server
```

## Deploying to GitHub Pages

Deployment is automated via [.github/workflows/deploy.yml](.github/workflows/deploy.yml): every push to `master` builds no artifacts (there's nothing to build) and publishes the repo root straight to GitHub Pages.

One-time setup on the GitHub repo:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to "GitHub Actions" (not "Deploy from a branch").
3. Push to `master` — the workflow runs automatically and the site publishes at `https://<username>.github.io/<repo-name>/`.
