"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { SHAPES, SIZE_FACTOR, SIZE_LENGTH, type SizeClass } from "@/lib/data";
import { gbp } from "@/lib/pricing";

/** D06 — coverflow of the five cover shapes, with the pricing factor. */
export default function Shapes() {
  const [i, setI] = useState(1);
  const sel = SHAPES[i];
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1320px] px-8 pb-16">
        <div className="flex flex-col items-center gap-2 pt-6 text-center">
          <span className="eyebrow">5 shapes · 5,000 cars</span>
          <h1 className="font-display text-[54px] font-medium leading-none">Which shape is <strong className="font-semibold">your</strong> car?</h1>
        </div>

        <div className="perspective relative mt-6 h-[420px]">
          {SHAPES.map((s, k) => {
            const d = k - i, on = d === 0;
            const tf = on ? "translateX(0) translateZ(80px)" : `translateX(${d * 330}px) translateZ(${-120 * Math.abs(d)}px) rotateY(${d < 0 ? 42 : -42}deg)`;
            return (
              <button key={s.id} type="button" onClick={() => setI(k)} aria-pressed={on}
                className="absolute left-1/2 top-1/2 flex h-[300px] w-[460px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col justify-between border bg-ivory-2 p-6 text-left transition-[transform,opacity,filter] duration-700"
                style={{ transform: `translate(-50%,-50%) ${tf}`, opacity: Math.abs(d) > 2 ? 0 : on ? 1 : 0.75, filter: on ? "none" : "brightness(.85)", zIndex: 10 - Math.abs(d), borderColor: on ? "var(--color-green)" : "var(--color-line)" }}>
                <span className="flex justify-between font-mono text-xs text-ink-3"><span>S{k + 1}</span><span>[n] models</span></span>
                <svg viewBox="0 0 200 80" className="w-full"><circle cx="50" cy="62" r="11" fill="#1A1A17" /><circle cx="150" cy="62" r="11" fill="#1A1A17" /><path d={s.path} fill={on ? "#1F3B2E" : "#8C8577"} /></svg>
                <span className="flex items-baseline justify-between"><strong className="font-display text-[26px] font-semibold">{s.name}</strong><span className="font-mono text-sm text-brass-2">× {s.factor.toFixed(2)}</span></span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button type="button" onClick={() => setI((i + 4) % 5)} aria-label="Previous" className="h-12 w-12 rounded-full border border-line bg-ivory-2 text-lg">‹</button>
          <span className="min-w-[360px] text-center font-mono text-[13px] text-ink-3">{sel.name} — {sel.examples}</span>
          <button type="button" onClick={() => setI((i + 1) % 5)} aria-label="Next" className="h-12 w-12 rounded-full border border-line bg-ivory-2 text-lg">›</button>
        </div>

        <section className="mx-auto mt-12 grid max-w-[960px] gap-6 border-t border-line pt-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[30px] font-medium">How the shape sets the price</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">Every car in the archive maps to one of five shapes. The shape and the car's length set how much fabric we cut — that's the only thing it changes. The cut itself always follows the car's own pattern.</p>
            <p className="mt-3 font-mono text-[13px] text-ink-3">price = line base × shape factor × size factor + options</p>
          </div>
          <table className="text-sm">
            <thead><tr className="text-left font-mono text-xs text-ink-3"><th className="pb-2">Indoor Plus £389 ×</th><th className="pb-2">Size</th><th className="pb-2 text-right">From</th></tr></thead>
            <tbody>
              {(Object.keys(SIZE_FACTOR) as SizeClass[]).map((sz) => (
                <tr key={sz} className="border-t border-line"><td className="py-2">{sel.name} × {sel.factor.toFixed(2)}</td><td className="py-2">{sz} · {SIZE_LENGTH[sz]}</td><td className="py-2 text-right font-mono">{gbp(389 * sel.factor * SIZE_FACTOR[sz])}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="mt-8 text-center"><Link href="/configure" className="btn-primary">FIND MY EXACT CAR</Link></div>
      </main>
    </>
  );
}
