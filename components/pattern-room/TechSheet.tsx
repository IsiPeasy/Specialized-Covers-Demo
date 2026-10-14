"use client";
import CarSvg from "@/components/CarSvg";
import { StepTitle } from "@/components/ConfigShell";
import { QUOTE_NO, QuoteActions, QuoteControls, useQuoteFacts } from "@/components/steps/QuoteControls";
import { SIZE_LENGTH } from "@/lib/data";
import { gbp, quote } from "@/lib/pricing";
import { useEffect, useState } from "react";

/** Pattern Room quote — an A4 technical sheet with a "pattern on file" stamp. Prints on its own (see @media print). */
export default function TechSheet() {
  const { s, v, fabric, shape, speed, colours } = useQuoteFacts();
  const { items, total } = quote(s);
  const [today, setToday] = useState("[DATE]"); // set after hydration — the page is prerendered at build time
  useEffect(() => setToday(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })), []);
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="flex min-w-0 flex-col items-center gap-6 px-4 py-7 sm:px-8 lg:overflow-y-auto">
        <div className="no-print self-start"><StepTitle n={6} kicker={`Sheet ${QUOTE_NO}`} title="Your pattern sheet." /></div>
        <article className="print-sheet relative flex w-full sm:aspect-[210/297] max-w-[640px] flex-col gap-4 border-2 border-ink bg-[#fdfcf8] p-6 text-[#16203A] shadow-[6px_6px_0_#16203A] sm:p-9" aria-label="Quote sheet">
          <header className="flex items-start justify-between gap-4 border-b-2 border-[#16203A] pb-3 font-mono">
            <div className="flex flex-col"><strong className="text-[15px] tracking-[.06em]">SPECIALISED COVERS <span className="text-[#B3302A]">[SC]</span></strong><span className="text-[11px]">Shipley, West Yorkshire · 01943 864646</span></div>
            <div className="flex flex-col text-right text-[11px]"><span>SHEET No.</span><strong className="text-[16px]">{QUOTE_NO}</strong><span>{today}</span></div>
          </header>
          <div className="grid grid-cols-[1fr_auto] items-end gap-4">
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px]">
              <dt>VEHICLE</dt><dd>{`${v.make} ${v.model} (${v.generation}) ${v.years}`.toUpperCase()}</dd>
              <dt>SHAPE</dt><dd>{shape.name.toUpperCase()} · SIZE {s.size} · {SIZE_LENGTH[s.size]}</dd>
              <dt>FABRIC</dt><dd>{`${fabric.name} ${fabric.gsm} · ${fabric.line}`.toUpperCase()}</dd>
              <dt>COLOURS</dt><dd>{colours.toUpperCase()}</dd>
              <dt>DELIVERY</dt><dd>{`${speed.label} · ${speed.when}`.toUpperCase()}</dd>
            </dl>
            <CarSvg side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripeOn && fabric.colourChoice ? s.stripe : null} mirror={!s.cameraMirrors} shadow={false} className="w-[150px] sm:w-[190px]" label="Your configured cover" />
          </div>
          <table className="w-full border-2 border-[#16203A] font-mono text-[11px] sm:text-[12px]">
            <thead><tr className="bg-[#16203A] text-left text-[#fdfcf8]"><th className="px-2 py-1.5 font-medium">#</th><th className="px-2 py-1.5 font-medium">ITEM</th><th className="px-2 py-1.5 text-right font-medium">GBP</th></tr></thead>
            <tbody>{items.map((it, k) => (
              <tr key={it.label} className="border-t border-[#C9C4B6]"><td className="px-2 py-1.5">{String(k + 1).padStart(2, "0")}</td><td className="px-2 py-1.5">{it.label}</td><td className="px-2 py-1.5 text-right">{it.included ? "incl." : gbp(it.amount)}</td></tr>
            ))}</tbody>
            <tfoot><tr className="border-t-2 border-[#16203A]"><td /><td className="px-2 py-2 font-semibold">TOTAL INC. VAT</td><td className="px-2 py-2 text-right text-[15px] font-semibold">{gbp(total)}</td></tr></tfoot>
          </table>
          <div className="mt-auto flex items-end justify-between gap-4 font-mono text-[11px]">
            <div className="flex flex-col gap-1"><span>Valid 30 days · UK delivery [RATE]</span><span className="mt-4 border-t border-[#16203A] pt-1 italic">[name], pattern room</span></div>
            <div aria-label={v.patternOnFile ? "Stamp: pattern on file" : "Stamp: pattern to source"} className="border-[3px] border-[#B3302A] px-3 py-2 text-center text-[13px] font-semibold leading-tight tracking-[.12em] text-[#B3302A] opacity-85" style={{ transform: "rotate(-12deg)" }}>
              PATTERN<br />{v.patternOnFile ? "ON FILE" : "TO SOURCE"}<br /><span className="text-[9px] tracking-[.2em]">No. [####]</span>
            </div>
          </div>
        </article>
      </section>
      <aside className="no-print flex flex-col gap-5 border-t-2 border-ink bg-sand px-4 py-6 pb-24 sm:px-7 lg:overflow-y-auto lg:border-l-2 lg:border-t-0">
        <span className="font-mono text-[13px] text-accent-2">DELIVERY &amp; EXTRAS</span>
        <QuoteControls />
        <QuoteActions />
      </aside>
    </main>
  );
}
