"use client";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { FABRICS, SHAPES, SIZE_LENGTH, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";

const BASE = FABRICS[0]; // Prestige Plus · Indoor Plus
/** 13 stacked panels: the theme's model colour, darker towards the outer faces. */
const SHADES = Array.from({ length: 13 }, (_, k) => `color-mix(in srgb, var(--color-model) ${100 - Math.abs(k - 6) * 11}%, #000)`);

/** E01 — stacked-panel 3D extrusion of the selected shape. */
export default function ShapeStep() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const sel = SHAPES.find((x) => x.id === s.shape)!;
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_400px]">
      <section className="flex min-w-0 flex-col gap-4 px-4 py-7 sm:px-10">
        <StepTitle n={2} kicker="Cover shape" title={<>{v.make} {v.model} ({v.generation}) is a <em>{sel.name}</em>.</>} sub="We matched it automatically from the pattern archive. Turn the shape, or pick another if yours was converted or modified." />
        <div className="perspective relative min-h-[260px] flex-grow overflow-hidden bg-sand sm:min-h-[320px]">
          <div className="absolute left-1/2 top-[62%] h-[560px] w-[560px] rounded-full border border-dashed border-brass-2/50" style={{ transform: "translate(-50%,-50%) rotateX(78deg)" }} />
          <div className="preserve absolute left-1/2 top-1/2 aspect-[620/260] w-[min(620px,88%)] -translate-x-1/2 -translate-y-1/2" style={{ animation: "spin-y 16s linear infinite" }}>
            {SHADES.map((g, k) => (
              <svg key={k} viewBox="0 0 200 80" className="absolute inset-0 h-full w-full" style={{ transform: `translateZ(${(k - 6) * 11}px)` }} aria-hidden="true">
                <path d={sel.path} style={{ fill: g }} />
                {(k === 1 || k === 11) && (<><circle cx="50" cy="62" r="11" fill="#050807" /><circle cx="150" cy="62" r="11" fill="#050807" /></>)}
              </svg>
            ))}
          </div>
          <div className="absolute bottom-4 left-5 font-mono text-xs text-ink-2">{sel.name} · size {s.size} · factor × {sel.factor.toFixed(2)}</div>
        </div>
        <div role="radiogroup" aria-label="Cover shapes" className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SHAPES.map((sh) => {
            const on = sh.id === s.shape;
            return (
              <button key={sh.id} type="button" role="radio" aria-checked={on} onClick={() => s.set({ shape: sh.id })}
                className="t-theme flex cursor-pointer flex-col gap-1.5 bg-ivory-2 p-3 text-left text-ink transition" style={{ border: on ? "2px solid var(--color-accent)" : "2px solid var(--color-surface-3)", transform: on ? "translateY(-3px)" : "none" }}>
                <svg viewBox="0 0 200 80" className="w-full" aria-hidden="true"><circle cx="50" cy="62" r="11" fill="#1A1A17" /><circle cx="150" cy="62" r="11" fill="#1A1A17" /><path d={sh.path} style={{ fill: on ? "var(--color-model)" : "var(--color-ink-3)" }} /></svg>
                <span className="flex justify-between font-mono text-xs"><strong>{sh.name}</strong><span className="text-ink-3">× {sh.factor.toFixed(2)}</span></span>
                <span className="text-xs text-ink-3">{sh.examples}</span>
              </button>
            );
          })}
        </div>
      </section>
      <PriceAside next={1} nextLabel="CONTINUE — FABRIC">
        <span className="eyebrow">How the shape sets the price</span>
        <p className="text-sm leading-relaxed text-ink-2">The shape and the car's length set how much fabric we cut. The cut itself always follows your car's own pattern.</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-ink-3">Base</dt><dd>{BASE.line} {gbp(BASE.base)}</dd>
          <dt className="text-ink-3">× Shape</dt><dd>{sel.name} × {sel.factor.toFixed(2)}</dd>
          <dt className="text-ink-3">× Size</dt><dd>{s.size} ({SIZE_LENGTH[s.size]})</dd>
          <dt className="text-ink-3">= Cover</dt><dd className="font-mono">{gbp(coverBase(BASE.id, s.shape, s.size))}</dd>
        </dl>
      </PriceAside>
    </main>
  );
}
