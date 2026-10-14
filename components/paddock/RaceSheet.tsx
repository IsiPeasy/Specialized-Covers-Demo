"use client";
import CarSvg from "@/components/CarSvg";
import { StepTitle } from "@/components/ConfigShell";
import { QUOTE_NO, QuoteActions, QuoteControls, useQuoteFacts } from "@/components/steps/QuoteControls";
import { gbp, quote } from "@/lib/pricing";

/** Production stages; the share of the bar each speed fills in by dispatch is the same — only the label changes. */
const STAGES = ["ORDER", "PATTERN CHECK", "CUT", "SEW", "DISPATCH"];

/** Paddock quote — a race sheet: mono table in a teal box, the quote number big, a production timeline that fills. */
export default function RaceSheet() {
  const { s, v, fabric, shape, speed, colours } = useQuoteFacts();
  const { items, total } = quote(s);
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="flex min-w-0 flex-col gap-6 px-4 py-7 sm:px-8 lg:overflow-y-auto">
        <StepTitle n={6} kicker="Race sheet" title="Your quote, on the board." />
        <div className="border border-accent-2 bg-surface">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-accent-2/40 px-5 py-4">
            <div className="flex flex-col gap-1"><span className="font-mono text-[12px] text-ink-3">QUOTE No.</span><span className="font-display text-[44px] leading-none sm:text-[64px]">{QUOTE_NO}</span></div>
            <div className="flex flex-col items-end gap-1"><span className="font-mono text-[12px] text-ink-3">TOTAL INC. VAT</span><strong key={total} className="font-display text-[44px] leading-none text-accent sm:text-[64px]" style={{ animation: "bump .3s steps(3)" }}>{gbp(total)}</strong></div>
          </div>
          <div className="grid gap-6 p-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
            <table className="w-full font-mono text-[13px]">
              <thead><tr className="text-left text-[11px] text-ink-3"><th className="pb-2 font-normal">ITEM</th><th className="pb-2 text-right font-normal">GBP</th></tr></thead>
              <tbody>
                {items.map((it, k) => (
                  <tr key={it.label} className="border-t border-line">
                    <td className="py-2 pr-3"><span className="text-ink-3">{String(k + 1).padStart(2, "0")} </span>{it.label.toUpperCase()}</td>
                    <td className="py-2 text-right">{it.included ? "INCL." : gbp(it.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col gap-3">
              <CarSvg side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripeOn && fabric.colourChoice ? s.stripe : null} mirror={!s.cameraMirrors} className="w-full" label="Your configured cover" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[12px]">
                <dt className="text-ink-3">CAR</dt><dd>{`${v.make} ${v.model} (${v.generation})`.toUpperCase()}</dd>
                <dt className="text-ink-3">SHAPE</dt><dd>{shape.name.toUpperCase()} · {s.size} · {v.patternOnFile ? "PATTERN ON FILE" : "PATTERN TO SOURCE"}</dd>
                <dt className="text-ink-3">FABRIC</dt><dd>{fabric.name.toUpperCase()} {fabric.gsm}</dd>
                <dt className="text-ink-3">COLOURS</dt><dd>{colours.toUpperCase()}</dd>
              </dl>
            </div>
          </div>
          <div className="border-t border-accent-2/40 px-5 py-5">
            <div className="mb-3 flex flex-wrap justify-between gap-2 font-mono text-[12px]"><span className="text-ink-3">PRODUCTION · {speed.label.toUpperCase()}</span><span className="text-accent-2">DISPATCH IN {speed.when.toUpperCase()}</span></div>
            <div className="relative h-2 bg-surface-3" aria-hidden="true">
              <div key={s.speed} className="absolute inset-0 origin-left bg-accent" style={{ animation: "pd-bar 1.2s cubic-bezier(.3,0,.2,1) both" }} />
            </div>
            <ol className="mt-2 grid grid-cols-5 font-mono text-[10px] text-ink-2 sm:text-[12px]">
              {STAGES.map((st, k) => <li key={st} className={k === 4 ? "text-right" : k > 0 ? "text-center" : ""}>{st}</li>)}
            </ol>
          </div>
        </div>
      </section>
      <aside className="flex flex-col gap-5 border-t border-line bg-sand px-4 py-6 pb-24 sm:px-7 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <span className="font-mono text-[13px] tracking-[.14em] text-accent">DELIVERY &amp; EXTRAS</span>
        <QuoteControls />
        <QuoteActions />
      </aside>
    </main>
  );
}
