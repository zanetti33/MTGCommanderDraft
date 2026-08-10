*[Read this in English](README.md)*

# MTG Commander Draft

Un piccolo sito statico per organizzare un **draft "2 su 3"** di carte Magic: The Gathering, pensato per un pool Commander ma utilizzabile con qualsiasi ricerca [Scryfall](https://scryfall.com/docs/api).

**🔗 Prova il sito: [zanetti33.github.io/MTGCommanderDraft](https://zanetti33.github.io/MTGCommanderDraft/)**

## Di cosa si tratta

L'host (chi organizza il draft) definisce un pool di carte tramite una query Scryfall (es. un set, un'identità colore, dei filtri) e il numero di giocatori. Il sito genera automaticamente un link personale per ciascun giocatore, con 3 carte estratte casualmente dal pool.

Aprendo il proprio link, ogni giocatore vede solo **2 delle 3 carte** e deve scegliere una delle due — oppure "tentare la sorte" e ricevere invece la terza carta nascosta, senza possibilità di tornare indietro.

Non serve installare nulla né creare un account: l'host genera i link dalla pagina principale e li condivide (es. in chat) con i rispettivi giocatori.

## Come si usa

**Come host**
1. Vai su [zanetti33.github.io/MTGCommanderDraft](https://zanetti33.github.io/MTGCommanderDraft/).
2. Inserisci una query di ricerca Scryfall per definire il pool di carte (es. `set:neo t:creature identity<=wu`).
3. Scegli il numero di giocatori e le opzioni del pool: se ammettere duplicati e se imporre colori "unici" all'interno del pool di ogni giocatore.
4. Genera i link e condividi ciascuno con il rispettivo giocatore.

**Come giocatore**
1. Apri il link ricevuto dall'host.
2. Guarda le 2 carte proposte e scegline una, oppure prova a "tentare la sorte" per scoprire la terza carta nascosta.

Il sito è disponibile in **italiano e inglese** (selezionabile dall'alto della pagina).

## Funzionalità principali

- Pool di carte definito con qualsiasi query Scryfall valida (set, colori, tipo, rarità, ecc.).
- Numero di giocatori configurabile, con o senza duplicati nel pool complessivo.
- Filtro opzionale "colori unici" per evitare che un giocatore riceva carte dagli stessi colori (con una modalità più permissiva e una più rigida).
- Nessun backend: le carte di ogni giocatore sono codificate direttamente nel link, e l'host non può vedere cosa sceglierà il giocatore.

## Sviluppo locale

Il sito è completamente statico (HTML/CSS/JS puro, nessuna build). Basta aprire `index.html` nel browser, oppure servire la cartella con un semplice web server, ad esempio:

```
python -m http.server
```

## Dettagli tecnici

- `index.html` — pagina host, descritta sopra.
- `player.html` — pagina giocatore, descritta sopra.
- Ogni link generato codifica gli id delle 3 carte del giocatore in un parametro `?d=...` in base64: questo serve solo a non mostrare le carte in chiaro nell'URL (per non rovinare la sorpresa), non è una vera misura di sicurezza.
- Non c'è alcuno stato salvato lato server: niente viene persistito, e l'host non può vedere cosa ha scelto un giocatore.

## Deploy su GitHub Pages

Il deploy è automatizzato tramite [.github/workflows/deploy.yml](.github/workflows/deploy.yml): ogni push su `master` pubblica direttamente la root del repo su GitHub Pages (non c'è nulla da compilare).

Setup una tantum sul repo GitHub:

1. Vai su **Settings → Pages**.
2. In **Build and deployment**, imposta **Source** su "GitHub Actions" (non "Deploy from a branch").
3. Fai push su `master` — il workflow parte automaticamente e il sito viene pubblicato su `https://<username>.github.io/<repo-name>/`.
