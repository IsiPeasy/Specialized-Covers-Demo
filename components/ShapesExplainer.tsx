"use client";
import { useState } from "react";
import Coverflow from "@/components/Coverflow";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { FABRICS, SHAPES, SIZE_FACTOR, SIZE_LENGTH, type SizeClass } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

const BASE = FABRICS[0]; // Prestige Plus · Indoor Plus

/** /shapes — coverflow of the five silhouettes plus the price table for the selected one. */
export default function ShapesExplainer() {
  const [i, setI] = useState(1);
  const sel = SHAPES[i];
  return (
    <main className="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8">
      <div className="flex flex-col items-center gap-2 pt-6 text-center">
        <span className="eyebrow">5 shapes · 5,000 cars</span>
        <h1 className="font-display text-[40px] font-medium leading-none sm:text-[54px]">Which shape is <strong className="font-semibold">your</strong> car?</h1>
      </div>
      <div className="mt-6"><Coverflow initial={i} onChange={setI} /></div>

      <section className="mx-auto mt-12 grid max-w-[960px] gap-6 border-t border-line pt-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-[30px] font-medium">How the shape sets the price</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">Every car in the archive maps to one of five shapes. The shape and the car's length set how much fabric we cut — that's the only thing it changes. The cut itself always follows the car's own pattern.</p>
          <p className="mt-3 font-mono text-[13px] text-ink-3">price = line base × shape factor × size factor + options</p>
        </div>
        <table className="text-sm">
          <thead><tr className="text-left font-mono text-xs text-ink-3"><th className="pb-2">{BASE.line} {gbp(BASE.base)} ×</th><th className="pb-2">Size</th><th className="pb-2 text-right">From</th></tr></thead>
          <tbody>
            {(Object.keys(SIZE_FACTOR) as SizeClass[]).map((sz) => (
              <tr key={sz} className="border-t border-line"><td className="py-2">{sel.name} × {sel.factor.toFixed(2)}</td><td className="py-2">{sz} · {SIZE_LENGTH[sz]}</td><td className="py-2 text-right font-mono">{gbp(coverBase(BASE.id, sel.id, sz))}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="mt-8 text-center"><ThemedLink href="/configure" className="btn-primary">FIND MY EXACT CAR</ThemedLink></div>
    </main>
  );
}
