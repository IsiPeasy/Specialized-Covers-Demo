"use client";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { FABRICS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";
import CubeView from "./CubeView";

/** Home section — the fabric cube. Picking a face sets the configurator's fabric, so "Continue" starts from it. */
export default function CubeSection() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const i = Math.max(0, FABRICS.findIndex((f) => f.id === s.fabricId));
  const sel = FABRICS[i];
  return (
    <section id="fabrics" className="mx-auto grid max-w-[1360px] items-center gap-10 px-4 py-24 sm:px-10 lg:grid-cols-[minmax(0,460px)_1fr]">
      <div className="flex flex-col gap-6">
        <span className="eyebrow">Six fabrics · one cube</span>
        <h2 className="font-display text-[40px] leading-none sm:text-[56px]">Turn the cube. Pick your cloth.</h2>
        <p className="text-[15px] leading-relaxed text-ink-2">Every face is a fabric we stock in Shipley. Choose one to bring it round, or drag the cube to look at the others.</p>
        <div role="radiogroup" aria-label="Fabrics" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FABRICS.map((f) => {
            const on = f.id === sel.id;
            return (
              <button key={f.id} type="button" role="radio" aria-checked={on} onClick={() => s.set({ fabricId: f.id })}
                className="t-theme flex cursor-pointer flex-col gap-1 bg-surface p-3 text-left text-[13px] text-ink transition-colors" style={{ border: on ? "1px solid var(--color-accent)" : "1px solid var(--color-line)" }}>
                <strong className="font-medium">{f.name}</strong>
                <span className="text-[12px] text-ink-3">{f.line}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
          <span className="text-sm text-ink-2">{sel.name} on a {v.make} {v.model} ({v.generation})</span>
          <strong className="font-display text-[32px] font-light">{gbp(coverBase(sel.id, s.shape, s.size))}</strong>
        </div>
        <ThemedLink href="/configure?step=1" className="btn-primary w-fit tracking-[.24em]">CONTINUE IN {sel.name.toUpperCase()}</ThemedLink>
      </div>
      <CubeView index={i} />
    </section>
  );
}
