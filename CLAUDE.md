# CLAUDE.md — Specialised Covers configurator demo

## Cos'è
Demo cliente per un configuratore di coperture auto su misura con prezzo live. Cliente: Specialised Covers (Shipley, UK, dal 1981; 30.000+ pattern; linee Indoor Pro/Plus/Recycled/Elite/Silhouette, Outdoor Lite/Pro/Elite). Obiettivo: mostrare sito, configuratore e modello di prezzo per chiudere un preventivo; poi diventare il seme del prodotto.

## Stack e vincoli
- Next.js 15 App Router, `output: 'export'` (niente server), Tailwind 4 con token in `app/globals.css` (`@theme`), three.js puro in `components/Cover3D.tsx`, Zustand in `lib/store.ts`.
- Copy in inglese britannico. UI in stile **Atelier**: avorio `#F4F0E8`, verde `#1F3B2E`, ottone `#C9A35A`, Cormorant Garamond (display) + Karla (body) + IBM Plex Mono (dati). Non introdurre altri colori o font senza motivo.
- Tutte le anteprime 2D usano `components/CarSvg.tsx` e i path in `lib/data.ts` (`CAR`). Il 3D estrude lo stesso path. Non duplicare path.
- Il prezzo si calcola **solo** in `lib/pricing.ts` (`quote()`, `coverBase()`). Mai hardcodare cifre nei componenti.
- Accessibilità: bottoni veri, `aria-pressed`/`role=radio`, contrasto ≥ 4.5:1, `prefers-reduced-motion` rispettato (già in globals.css).
- Niente dati inventati sul cliente: prezzi "from" sono pubblici; fattori, opzioni e palette sono placeholder dichiarati in README.

## Modello di prezzo
`price = line_base × shape_factor × size_factor + Σ options`, arrotondato a £1. Cinque forme (Compact, Coupé, Saloon, Estate, SUV) × quattro taglie (S/M/L/XL per lunghezza). Override per modello per le one-off. Questo è l'argomento che permette 5.000 modelli senza render per auto.

## Convenzioni
- Un componente per step in `components/steps/`; ogni step usa `StepTitle` + `PriceAside` da `ConfigShell.tsx`.
- Stato globale solo per ciò che influenza il prezzo o persiste tra step; UI locale (zona selezionata, vista camera) con `useState`.
- 3D: CSS 3D (`perspective`/`preserve`) per effetti leggeri; three.js solo in `Cover3D`. Niente R3F finché non servono i GLB.
- Verifica con `npm run build` prima di consegnare: l'export statico fallisce su `useSearchParams` senza `Suspense` e su API server.

## Roadmap
1. Dati reali dal cliente → `lib/data.ts`.
2. Ricerca veicolo (step 0) sul campione, poi su API.
3. GLB per silhouette in `Cover3D` (loader + swap materiale).
4. PDF preventivo + email; checkout in fase 2.
