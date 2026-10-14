"use client";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { FABRICS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";
import CubeView from "./CubeView";

/** D04 — six fabrics on a CSS 3D cube; picking one turns its face to the front. */
export default function FabricCube() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const i = Math.max(0, FABRICS.findIndex((f) => f.id === s.fabricId));
  const sel = FABRICS[i];
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="grid min-w-0 items-center gap-8 px-4 py-7 sm:px-10 xl:grid-cols-[minmax(0,420px)_1fr]">
        <div className="flex flex-col gap-5">
          <StepTitle n={3} kicker="Fabric" title="Turn the cube. Pick your cloth." sub="Every face is a fabric we stock in Shipley. Choose one to bring it to the front — or drag the cube to look around it." />
          <div role="radiogroup" aria-label="Fabrics" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FABRICS.map((f) => {
              const on = f.id === sel.id;
              return (
                <button key={f.id} type="button" role="radio" aria-checked={on} onClick={() => s.set({ fabricId: f.id })}
                  className="t-theme flex cursor-pointer flex-col gap-1 bg-surface p-3 text-left text-[13px] text-ink transition-colors" style={{ border: on ? "1px solid var(--color-accent)" : "1px solid var(--color-line)" }}>
                  <strong className="font-medium">{f.name}</strong>
                  <span className="font-mono text-[12px] text-ink-3">{f.line} · {gbp(coverBase(f.id, s.shape, s.size))}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <span className="text-sm text-ink-2">{sel.name} on a {v.make} {v.model} ({v.generation})</span>
            <strong className="font-display text-[30px] font-light">{gbp(coverBase(sel.id, s.shape, s.size))}</strong>
          </div>
        </div>

        <CubeView index={i} />
      </section>

      <PriceAside next={2} nextLabel="CONTINUE — COLOURS">
        <span className="eyebrow">{sel.line}</span>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {[["Construction", sel.build], ["Waterproof", sel.waterproof], ["Inner", sel.inner], ["Colours", sel.colours], ["Care", sel.care], ["Best for", sel.bestFor]].map(([k, val]) => (
            <div key={k} className="contents"><dt className="text-ink-3">{k}</dt><dd>{val}</dd></div>
          ))}
        </dl>
      </PriceAside>
    </main>
  );
}
