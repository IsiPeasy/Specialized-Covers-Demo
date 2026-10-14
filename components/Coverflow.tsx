"use client";
import { useState } from "react";
import { SHAPES } from "@/lib/data";

/** D06 — coverflow of the five cover shapes, with the pricing factor. Coloured by theme tokens. */
export default function Coverflow({ initial = 1, onChange }: { initial?: number; onChange?: (i: number) => void }) {
  const [i, setRaw] = useState(initial);
  const setI = (n: number) => { setRaw(n); onChange?.(n); };
  const sel = SHAPES[i];
  return (
    <div className="flex flex-col gap-4" style={{ ["--cf-step" as string]: "min(330px, 62vw)" }}>
      <div className="perspective relative h-[300px] overflow-hidden sm:h-[420px]">
        {SHAPES.map((s, k) => {
          const d = k - i, on = d === 0;
          const tf = on ? "translateZ(80px)" : `translateX(calc(${d} * var(--cf-step))) translateZ(${-120 * Math.abs(d)}px) rotateY(${d < 0 ? 42 : -42}deg)`;
          return (
            <button key={s.id} type="button" onClick={() => setI(k)} aria-pressed={on}
              className="t-theme absolute left-1/2 top-1/2 flex h-[220px] w-[min(460px,78vw)] cursor-pointer flex-col justify-between border bg-surface p-5 text-left text-ink transition-[transform,opacity,filter] sm:h-[300px] sm:p-6"
              style={{ transform: `translate(-50%,-50%) ${tf}`, opacity: Math.abs(d) > 2 ? 0 : on ? 1 : 0.75, filter: on ? "none" : "brightness(.85)", zIndex: 10 - Math.abs(d), borderColor: on ? "var(--color-accent)" : "var(--color-line)" }}>
              <span className="flex justify-between font-mono text-xs text-ink-3"><span>S{k + 1}</span><span>[n] models</span></span>
              <svg viewBox="0 0 200 80" className="w-full" aria-hidden="true"><circle cx="50" cy="62" r="11" fill="#1A1A17" /><circle cx="150" cy="62" r="11" fill="#1A1A17" /><path d={s.path} style={{ fill: on ? "var(--color-model)" : "var(--color-ink-3)" }} /></svg>
              <span className="flex items-baseline justify-between"><strong className="font-display text-[26px] font-semibold">{s.name}</strong><span className="font-mono text-sm text-brass-2">× {s.factor.toFixed(2)}</span></span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button type="button" onClick={() => setI((i + 4) % 5)} aria-label="Previous shape" className="h-12 w-12 shrink-0 cursor-pointer rounded-pill border border-line bg-surface text-lg text-ink">‹</button>
        <span className="min-w-0 text-center font-mono text-[13px] text-ink-3 sm:min-w-[360px]" aria-live="polite">{sel.name} — {sel.examples}</span>
        <button type="button" onClick={() => setI((i + 1) % 5)} aria-label="Next shape" className="h-12 w-12 shrink-0 cursor-pointer rounded-pill border border-line bg-surface text-lg text-ink">›</button>
      </div>
    </div>
  );
}
