"use client";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { SHAPES, SIZE_LENGTH, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";

const GREENS = ["#0E2419", "#12301F", "#163A26", "#1A432C", "#1E4B32", "#225337", "#2A6341", "#225337", "#1E4B32", "#1A432C", "#163A26", "#12301F", "#0E2419"];

/** E01 — stacked-panel 3D extrusion of the selected shape. */
export default function ShapeStep() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const sel = SHAPES.find((x) => x.id === s.shape)!;
  return (
    <main className="grid min-h-0 grid-cols-[minmax(0,1fr)_400px]">
      <section className="flex flex-col gap-4 px-10 py-7">
        <StepTitle n={2} kicker="Cover shape" title={<>{v.make} {v.model} ({v.generation}) is a <em>{sel.name}</em>.</>} sub="We matched it automatically from the pattern archive. Turn the shape, or pick another if yours was converted or modified." />
        <div className="perspective relative min-h-[320px] flex-grow bg-sand">
          <div className="absolute left-1/2 top-[62%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brass-2/50" style={{ transform: "translate(-50%,-50%) rotateX(78deg)" }} />
          <div className="preserve absolute left-1/2 top-1/2 h-[260px] w-[620px] -translate-x-1/2 -translate-y-1/2" style={{ animation: "spin-y 16s linear infinite" }}>
            {GREENS.map((g, k) => (
              <svg key={k} viewBox="0 0 200 80" className="absolute inset-0 h-full w-full" style={{ transform: `translateZ(${(k - 6) * 11}px)` }} aria-hidden="true">
                <path d={sel.path} fill={g} />
                {(k === 1 || k === 11) && (<><circle cx="50" cy="62" r="11" fill="#050807" /><circle cx="150" cy="62" r="11" fill="#050807" /></>)}
              </svg>
            ))}
          </div>
          <div className="absolute bottom-4 left-5 font-mono text-xs text-ink-2">{sel.name} · size {s.size} · factor × {sel.factor.toFixed(2)}</div>
        </div>
        <div role="radiogroup" aria-label="Cover shapes" className="grid grid-cols-5 gap-3">
          {SHAPES.map((sh) => {
            const on = sh.id === s.shape;
            return (
              <button key={sh.id} type="button" role="radio" aria-checked={on} onClick={() => s.set({ shape: sh.id })}
                className="flex cursor-pointer flex-col gap-1.5 bg-ivory-2 p-3 text-left transition" style={{ border: on ? "2px solid var(--color-green)" : "2px solid var(--color-sand-2)", transform: on ? "translateY(-3px)" : "none" }}>
                <svg viewBox="0 0 200 80" className="w-full"><circle cx="50" cy="62" r="11" fill="#1A1A17" /><circle cx="150" cy="62" r="11" fill="#1A1A17" /><path d={sh.path} fill={on ? "#1F3B2E" : "#8C8577"} /></svg>
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
          <dt className="text-ink-3">Base</dt><dd>Indoor Plus {gbp(389)}</dd>
          <dt className="text-ink-3">× Shape</dt><dd>{sel.name} × {sel.factor.toFixed(2)}</dd>
          <dt className="text-ink-3">× Size</dt><dd>{s.size} ({SIZE_LENGTH[s.size]})</dd>
          <dt className="text-ink-3">= Cover</dt><dd className="font-mono">{gbp(coverBase("prestige-plus", s.shape, s.size))}</dd>
        </dl>
      </PriceAside>
    </main>
  );
}
