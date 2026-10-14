# COVERCAR — configurator demo

Demo per il cliente: un sito in quattro stili, un configuratore con prezzo live, una logica di prezzo.
Next.js 15 (static export) · Tailwind 4 · three.js · Zustand. Nessun backend: tutti i dati sono in `lib/data.ts`.

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statico in ./out
```

## Pagine

| Route | Cosa |
|---|---|
| `/` | Landing: quattro "porte", una per stile, ognuna nei propri token con un'anteprima animata |
| `/[style]/` | Homepage dello stile (hero + sezioni proprie, vedi sotto) |
| `/[style]/shapes/` | Coverflow delle 5 silhouette con tabella prezzi (D06) |
| `/[style]/configure/?step=0..4` | Forma 3D → Tessuti → Colori WebGL → Monogramma → Preventivo; tessuti, colori e preventivo cambiano per stile |
| `/[style]/admin/` | Back-office prezzi (read-only), identico in tutti gli stili, solo ricolorato (C10) |

`[style]` = `atelier` · `showroom` · `paddock` · `pattern-room`. Le vecchie route (`/home`, `/configure`…) reindirizzano ad `/atelier/…`.
Il logo "COVERCAR" riporta sempre a `/` per riscegliere lo stile. La pill in basso a destra cambia stile **mantenendo la route e lo step**; lo stato del configuratore (Zustand) sopravvive al cambio.

## Stili

Stessa logica, stessi dati, stesso prezzo: cambiano pelle, tipografia, motion e alcune interazioni.

| Stile | Per chi | Hero | Sezioni proprie in home | Step tessuto | Step colori (Cover3D) | Preventivo |
|---|---|---|---|---|---|---|
| **Atelier** | collezionisti, artigianato | Tailor's bench (I08) — `TailorHero` | Flip wall (D08) `FlipWall`, Drape (D05) `atelier/DrapeSection` | Swatch book (E02) `steps/FabricStep` | sfondo sabbia, auto-rotate `steps/ColourStep` | Tri-fold CSS 3D (E05) `steps/QuoteStep` |
| **Showroom** | lusso, 3D in vetrina | The Unveil (I02) `showroom/UnveilHero` | Turntable trascinabile (D01) `showroom/Turntable`, cubo dei tessuti (D04) `showroom/CubeSection` | Fabric cube trascinabile (D04) `showroom/FabricCube` | sfondo nero, luce fredda, vista top, niente auto-rotate `showroom/ShowroomColour` | "The unveiling": il telo scivola via dalla card `showroom/UnveilQuote` |
| **Paddock** | motorsport, dati in vista | Night Scan (I01) `paddock/NightScanHero` | Exploded layers (I04) `paddock/ExplodedLayers`, Inspection bay WebGL trascinabile `paddock/InspectionBay`, Coverflow | Scheda tecnica HUD `paddock/HudFabric` | luce arancio di taglio, griglia teal, HUD camera + fps `paddock/PaddockColour` | Scheda gara + timeline di produzione `paddock/RaceSheet` |
| **Pattern Room** | ingegneri, restauratori | Fabric in motion (I03) `pattern-room/FabricMotionHero` | Query live sull'archivio + FIG. 1 `pattern-room/ArchiveQuery`, tavolo di taglio isometrico (D03) `pattern-room/CuttingTable`, Flip wall | Tabella comparativa completa `pattern-room/SpecTable` | wireframe sul solido, quote dimensionali `pattern-room/PatternColour` | Foglio tecnico A4 stampabile con timbro `pattern-room/TechSheet` |

Il registry è in `lib/themes.ts` (token + mappa componenti `Header`, `Home`, `Hero`, `Section`, `Preview`, `FabricStep`, `ColourStepVariant`, `QuoteVariant`); i colori sono variabili CSS semantiche in `app/globals.css`, sovrascritte sotto `[data-theme="…"]`.

### Placeholder e dati da confermare negli stili
- Showroom: i riquadri `[PHOTO — …]` della gamma.
- Paddock: la riga team (Williams, McLaren, Mercedes-AMG Petronas, United Autosports, Extreme E) viene dal brief, **non** da `lib/data.ts` — da confermare col cliente prima di mostrarla fuori. La barra "breathability" è `[DATA]`: il dato non c'è; gsm e waterproof sono derivati dai testi di `FABRICS`.
- Pattern Room: `[L] mm`, `[H] mm`, `No. [####]`, `[name], pattern room`, la data è quella del browser.
- Tutti: numero preventivo `SCQ-26-10-0418`, `UK delivery [RATE]`.

## QA

```bash
npm run build && (cd out && python3 -m http.server 4173) &   # o qualunque server statico
npm run qa                    # screenshot di /, e per ogni stile home, shapes, admin, configure 0–4 a 1440×900 e 390×844
npm run qa -- paddock         # solo uno stile
```
Gli screenshot finiscono in `qa/screenshots/`; lo script segnala overflow orizzontale ed errori in console.

## Struttura

```
app/            route (App Router): / (porte) e [style]/{,shapes,configure,admin}
components/     condivisi: CarSvg, Cover3D (three.js), ConfigShell, Coverflow, steps/ (Shape, Monogram, ColourStudio, QuoteControls)
components/<stile>/  componenti propri di ogni stile (atelier, showroom, paddock, pattern-room)
components/theme/    ThemeProvider (data-theme, ThemedLink), StyleSwitcher, useSpin (drag-to-turn)
lib/themes.ts   registry dei temi
lib/data.ts     catalogo: forme, taglie, veicoli campione, tessuti, colori, opzioni, path SVG
lib/pricing.ts  formula: base linea × fattore forma × fattore taglia + opzioni
lib/store.ts    stato del configuratore
app/globals.css token semantici (@theme = Atelier), override per tema, keyframes
```

## Deploy su VPS (Docker + Caddy, TLS automatico, basic auth)

```bash
cp .env.example .env            # DEMO_HOST, DEMO_USER, DEMO_HASH
docker run --rm caddy caddy hash-password --plaintext 'la-password'   # → DEMO_HASH
docker compose up -d --build
```

Il DNS di `DEMO_HOST` deve puntare al VPS, porte 80/443 aperte. Per togliere la password, elimina il blocco `basic_auth` dal `Caddyfile`.

## Dati da confermare con il cliente

Reali (dal sito pubblico): prezzi "starting from" delle linee, specifiche tessuti, nomi prodotti.
**Placeholder** da sostituire in `lib/data.ts`: fattori forma e taglia, prezzi delle opzioni (striscia, ricamo, borsa, fast-track, garanzia), cartella colori Prestige Plus, spedizione, il campione di veicoli.

## Prossimi passi verso il prodotto

1. Backend Go + Postgres: tabella `vehicles` (5.000 righe, shape, size_class, pattern_status, override), `fabrics`, `options`; endpoint `/quote` che replica `pricing.ts`.
2. Ricerca veicolo (make/model/gen/year) al posto del campione in `VEHICLES`.
3. Un GLB per silhouette (5 modelli low-poly) in `Cover3D` al posto dell'estrusione del Coupé.
4. Preventivo PDF server-side + email; poi checkout (WooCommerce o Stripe) in fase 2.
