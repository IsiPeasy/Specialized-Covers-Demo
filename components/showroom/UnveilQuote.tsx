"use client";
import { useState } from "react";
import CarSvg from "@/components/CarSvg";
import { StepTitle } from "@/components/ConfigShell";
import { QUOTE_NO, QuoteActions, QuoteControls, useQuoteFacts } from "@/components/steps/QuoteControls";
import { gbp, quote } from "@/lib/pricing";

const EASE = "cubic-bezier(.2,.8,.2,1)";
const SILK = "repeating-linear-gradient(104deg, #ECE6D8 0 46px, #DCD3C1 72px, #ECE6D8 104px), #ECE6D8";

/** Showroom quote — "the unveiling": the quote card waits under ivory silk; the cloth slides off and the lines arrive one by one. */
export default function UnveilQuote() {
  const { s, v, fabric, shape, colours } = useQuoteFacts();
  const { items, total } = quote(s);
  const [shown, setShown] = useState(false);
  const fade = (k: number) => ({ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(10px)", transition: `opacity .9s ${EASE} ${0.6 + k * 0.12}s, transform .9s ${EASE} ${0.6 + k * 0.12}s` });
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="relative flex min-w-0 flex-col items-center gap-8 overflow-hidden px-4 py-7 sm:px-10 lg:overflow-y-auto" style={{ background: "radial-gradient(ellipse at 50% 30%, #1d1d1f 0%, #0a0a0b 65%)" }}>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-160px] h-[900px] w-[760px] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,243,220,.16) 0%, transparent 60%)", opacity: shown ? 1 : 0.4, transition: `opacity 1.6s ${EASE}` }} />
        <div className="relative z-10 flex w-full flex-wrap items-end justify-between gap-4">
          <StepTitle n={6} kicker={`Your quote · ${QUOTE_NO}`} title={shown ? <>Your quote, <em className="font-serif">revealed</em>.</> : "Your quote is ready."} />
          <button type="button" onClick={() => setShown(!shown)} aria-expanded={shown} aria-controls="quote-card" className="btn-primary cursor-pointer tracking-[.24em]">{shown ? "COVER IT AGAIN" : "REVEAL YOUR QUOTE"}</button>
        </div>

        <div className="relative w-full max-w-[720px]">
          <article id="quote-card" aria-hidden={!shown} className="flex flex-col gap-6 border border-line bg-surface p-6 sm:p-10">
            <div className="flex flex-col items-center gap-2 text-center" style={fade(0)}>
              <span className="text-[11px] tracking-[.32em] text-ink-3">A COVER TAILORED FOR</span>
              <span className="font-display text-[28px] sm:text-[36px]">{v.make} {v.model} <span className="text-ink-2">({v.generation})</span></span>
            </div>
            <div style={fade(1)}><CarSvg side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripeOn && fabric.colourChoice ? s.stripe : null} mirror={!s.cameraMirrors} className="mx-auto w-full max-w-[480px]" label="Your configured cover" /></div>
            <p className="text-center text-[13px] tracking-[.08em] text-ink-2" style={fade(2)}>{shape.name} · {fabric.name} {fabric.gsm} · {colours}</p>
            <ul className="flex flex-col">
              {items.map((it, k) => (
                <li key={it.label} className="flex justify-between gap-4 border-b border-line py-2.5 text-[14px]" style={fade(3 + k)}>
                  <span>{it.label}</span><span className="shrink-0 text-ink-2">{it.included ? "Included" : gbp(it.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between" style={fade(3 + items.length)}>
              <span className="text-[11px] tracking-[.32em] text-ink-3">TOTAL INC. VAT</span>
              <strong className="font-display text-[48px] font-light sm:text-[64px]">{gbp(total)}</strong>
            </div>
          </article>

          {/* The silk: covers the card, slides up and off to the right like the hero's cloth */}
          <div aria-hidden="true" className="absolute -inset-3 flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,.5)]"
            style={{ background: SILK, borderRadius: "18px 22px 10px 14px", transformOrigin: "90% 20%", transform: shown ? "translate(60%, -70%) rotate(-14deg)" : "none", opacity: shown ? 0 : 1, transition: `transform 1.6s ${EASE}, opacity 1.2s ${EASE} .5s`, pointerEvents: shown ? "none" : "auto" }}>
            <span className="text-[13px] tracking-[.42em] text-[#6b6455]">SPECIALISED COVERS</span>
          </div>
        </div>
      </section>
      <aside className="flex flex-col gap-5 border-t border-line bg-sand px-4 py-6 pb-24 sm:px-7 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <span className="eyebrow">Delivery</span>
        <QuoteControls />
        <QuoteActions />
      </aside>
    </main>
  );
}
