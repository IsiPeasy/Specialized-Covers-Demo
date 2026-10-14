# Specialised Covers — configurator demo

Demo per il cliente: un sito (Atelier), un configuratore con prezzo live, una logica di prezzo.
Next.js 15 (static export) · Tailwind 4 · three.js · Zustand. Nessun backend: tutti i dati sono in `lib/data.ts`.

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statico in ./out
```

## Pagine

| Route | Cosa | Origine nel canvas |
|---|---|---|
| `/` | Landing con le 10 card | — |
| `/home` | Homepage Atelier: hero "Tailor's bench", gamma, flip wall archivio, pattern room | T1 + I08 + D08 |
| `/shapes` | Coverflow delle 5 silhouette con tabella prezzi | D06 |
| `/configure?step=0..4` | Forma 3D → Tessuti → Colori WebGL → Monogramma → Preventivo pieghevole | E01–E05 |
| `/admin` | Back-office prezzi (read-only) | C10 |

Lo step si può aprire direttamente da URL (`?step=2`); lo stato del configuratore è condiviso (Zustand) e resta finché la tab è aperta.

## Struttura

```
app/            route (App Router)
components/     CarSvg (silhouette condivisa), Cover3D (three.js), step del configuratore, hero, flip wall
lib/data.ts     catalogo: forme, taglie, veicoli campione, tessuti, colori, opzioni, path SVG
lib/pricing.ts  formula: base linea × fattore forma × fattore taglia + opzioni
lib/store.ts    stato del configuratore
app/globals.css token Atelier (@theme) e keyframes
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
