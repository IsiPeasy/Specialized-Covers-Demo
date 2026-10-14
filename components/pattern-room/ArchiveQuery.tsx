"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStyle } from "@/components/theme/ThemeProvider";
import { CAR, SHAPES, SIZE_LENGTH, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";
import { styleHref } from "@/lib/themes";

/** The cut pattern drawing itself, with dimension lines. Used by the archive sheet and the door preview. */
export function PatternFigure({ length = "[L] mm", height = "[H] mm" }: { length?: string; height?: string }) {
  return (
    <svg viewBox="0 0 820 300" className="w-full" role="img" aria-label="Car cover pattern with dimension lines">
      <path d={CAR.body} fill="none" stroke="#1D3A8A" strokeWidth="2.5" strokeDasharray="1600" style={{ animation: "pr-cut 3s ease-in-out both" }} />
      <path d={CAR.piping} fill="none" stroke="#B3302A" strokeWidth="1.5" strokeDasharray="8 6" />
      <path d="M340,82 L340,200 M480,72 L480,200" fill="none" stroke="#B3302A" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M70,250 L740,250 M70,242 L70,258 M740,242 L740,258 M770,70 L770,200 M762,70 L778,70 M762,200 L778,200" fill="none" stroke="#16203A" strokeWidth="1" />
      <text x="405" y="276" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#16203A">OVERALL LENGTH {length}</text>
      <text x="786" y="135" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#16203A" transform="rotate(90 786 135)" textAnchor="middle">{height}</text>
      <text x="96" y="140" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#B3302A">PANEL A — CENTRE</text>
      <text x="96" y="190" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#B3302A">PANEL B — SIDE</text>
    </svg>
  );
}

const label = (i: number) => `${VEHICLES[i].make} ${VEHICLES[i].model}`;

/** T3 — "Query the archive": a live search over the sample of VEHICLES, with the cut pattern drawn alongside. */
export default function ArchiveQuery() {
  const [q, setQ] = useState("Jaguar E-Type Series 1");
  const style = useStyle();
  const router = useRouter();
  const selectVehicle = useConfig((s) => s.selectVehicle);
  const needle = q.trim().toLowerCase();
  const hits = needle ? VEHICLES.map((_, i) => i).filter((i) => `${label(i)} ${VEHICLES[i].generation}`.toLowerCase().includes(needle)) : [];
  const hit = hits[0];
  const v = hit !== undefined ? VEHICLES[hit] : null;
  const shape = v ? SHAPES.find((s) => s.id === v.shape)! : null;
  const use = () => { if (hit === undefined) return; selectVehicle(hit); router.push(styleHref(style, "/configure?step=0")); };

  return (
    <section id="archive-query" className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <span className="font-mono text-[13px] text-accent-2">SHEET 01 / 04 — THE ARCHIVE</span>
        <h2 className="font-display text-[34px] leading-[1.06] sm:text-[48px]">Every cover starts as a pattern. We have over 30,000 of them.</h2>
        <p className="text-[17px] leading-relaxed text-ink-2">Collected since the early '80s from collectors, race teams and marques. Search yours — if it's in the archive, you get a live price in seconds.</p>
        <form className="flex flex-col gap-3.5 border-2 border-ink bg-surface p-5" onSubmit={(e) => { e.preventDefault(); use(); }}>
          <label htmlFor="archive-q" className="font-mono text-[12px] text-ink-2">QUERY THE ARCHIVE <span className="text-ink-3">· demo sample of {VEHICLES.length} models</span></label>
          <input id="archive-q" value={q} onChange={(e) => setQ(e.target.value)} list="archive-models" autoComplete="off"
            className="min-w-0 border-0 border-b-2 border-accent bg-transparent py-1.5 text-[20px] text-ink outline-none focus-visible:border-accent-2 sm:text-[22px]" />
          <datalist id="archive-models">{VEHICLES.map((_, i) => <option key={i} value={label(i)} />)}</datalist>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[13px]" aria-live="polite">
            {v && shape ? (
              <>
                <span className={v.patternOnFile ? "text-ok" : "text-warn"}>{v.patternOnFile ? "● Pattern on file" : "○ Pattern to source"} · {shape.name} silhouette · {v.size}</span>
                <span>Indoor from {v.patternOnFile ? gbp(coverBase("prestige-plus", v.shape, v.size)) : "POA"}</span>
              </>
            ) : <span className="text-ink-3">{needle ? "Not in the sample — in production we'd pattern it." : "Type a make or model."}</span>}
          </div>
          <button type="submit" disabled={!v} className="w-fit cursor-pointer bg-accent px-4 py-2.5 font-mono text-[13px] text-on-accent disabled:cursor-not-allowed disabled:opacity-50">Use this car →</button>
        </form>
      </div>
      <figure className="relative border-2 border-ink bg-surface p-5 pt-12 sm:p-7 sm:pt-12">
        <figcaption className="absolute right-4 top-3 font-mono text-[12px] text-ink-2">FIG. 1 — CUT PATTERN, SIDE ELEVATION</figcaption>
        <PatternFigure key={hit} length={v ? `${v.size} · ${SIZE_LENGTH[v.size]}` : undefined} />
      </figure>
    </section>
  );
}
