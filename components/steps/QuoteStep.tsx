"use client";
import { useState } from "react";
import CarSvg from "@/components/CarSvg";
import { StepTitle } from "@/components/ConfigShell";
import { quote, gbp } from "@/lib/pricing";
import { QUOTE_NO, QuoteActions, QuoteControls, useQuoteFacts } from "./QuoteControls";

const face = "backface-hidden flex flex-col gap-3 border border-line p-6 lg:absolute lg:inset-0";
const panel = "preserve relative lg:absolute lg:top-0 lg:h-[520px] lg:w-[320px]";

/**
 * E05 — the quote as a CSS 3D tri-fold brochure (Atelier, Showroom).
 * The cover colours come from --color-quote-cover(-ink). Below lg the brochure lies open, panels stacked.
 */
export default function QuoteStep() {
  const { s, v, fabric, shape, colours } = useQuoteFacts();
  const [open, setOpen] = useState(false);
  const { items, total } = quote(s);
  const fold = (closed: string) => ({ ["--fold" as string]: open ? "rotateY(0)" : closed });
  return (
    <main className="perspective relative flex min-h-0 flex-col items-center gap-6 px-4 pb-24 pt-6 lg:justify-center lg:p-0" style={{ background: "radial-gradient(ellipse at 50% 60%, var(--color-surface-3) 0%, var(--color-surface-2) 60%)" }}>
      <div className="z-10 self-start lg:absolute lg:left-9 lg:top-6"><StepTitle n={6} kicker={`Your quote · ${QUOTE_NO}`} title={open ? "Your quote, opened." : "Your quote is ready."} /></div>
      <button type="button" onClick={() => setOpen(!open)} className="btn-primary z-10 hidden cursor-pointer lg:absolute lg:right-9 lg:top-7 lg:inline-flex">{open ? "FOLD IT AWAY" : "OPEN THE QUOTE"}</button>

      <div className="preserve t-theme relative flex w-full max-w-[480px] flex-col gap-3 transition-transform lg:block lg:h-[520px] lg:w-[960px] lg:max-w-none lg:[transform:var(--tilt)]" style={{ ["--tilt" as string]: open ? "rotateX(6deg)" : "rotateX(10deg) rotateY(-18deg)" }}>
        <div className={`${panel} order-2 transition-transform duration-1000 lg:left-0 lg:[transform:var(--fold)]`} style={{ transformOrigin: "right center", ...fold("translateZ(4px) rotateY(180deg)") }}>
          <div className={`${face} bg-ivory-2`}>
            <span className="eyebrow">Your cover</span>
            <CarSvg side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripeOn && fabric.colourChoice ? s.stripe : null} mirror={!s.cameraMirrors} className="w-full" label="Your configured cover" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
              <dt className="text-ink-3">Car</dt><dd>{v.make} {v.model} ({v.generation})</dd>
              <dt className="text-ink-3">Shape</dt><dd>{shape.name} · {s.size} · {v.patternOnFile ? "pattern on file" : "pattern to source"}</dd>
              <dt className="text-ink-3">Fabric</dt><dd>{fabric.name} {fabric.gsm}</dd>
              <dt className="text-ink-3">Colours</dt><dd>{colours}</dd>
              {s.text && (<><dt className="text-ink-3">Embroidery</dt><dd>“{s.text.toUpperCase()}” · {s.placement}</dd></>)}
            </dl>
          </div>
          <div className={`${face} hidden items-center justify-between bg-quote-cover text-center text-quote-cover-ink lg:flex`} style={{ transform: "rotateY(180deg)" }}>
            <span className="font-mono text-[11px] tracking-[.2em] text-brass">QUOTE</span>
            <span className="font-display text-[34px] leading-tight">A cover tailored<br />for a {v.make} {v.model}</span>
            <span className="font-display text-base font-medium tracking-[.45em]">COVERCAR</span>
          </div>
        </div>

        <div className={`${panel} order-1 lg:left-[320px]`}>
          <div className={`${face} justify-between bg-ivory-2`}>
            <div className="flex flex-col gap-2.5">
              <span className="eyebrow">Price breakdown</span>
              <table className="w-full text-[13px]"><tbody>
                {items.map((it) => (<tr key={it.label}><td className="border-b border-dashed border-line py-1.5">{it.label}</td><td className="border-b border-dashed border-line py-1.5 text-right font-mono">{it.included ? "Incl." : gbp(it.amount)}</td></tr>))}
              </tbody></table>
            </div>
            <div className="flex items-baseline justify-between border-t-2 border-ink pt-2.5"><span className="text-sm">Total inc. VAT</span><strong className="font-display text-[40px]">{gbp(total)}</strong></div>
          </div>
        </div>

        <div className={`${panel} order-3 transition-transform duration-1000 lg:left-[640px] lg:[transform:var(--fold)]`} style={{ transformOrigin: "left center", ...fold("rotateY(-180deg)") }}>
          <div className={`${face} justify-between bg-ivory-2`}>
            <div className="flex flex-col gap-2.5"><span className="eyebrow">Delivery</span><QuoteControls compact /></div>
            <QuoteActions />
          </div>
          <div className={`${face} hidden justify-end bg-sand lg:flex`} style={{ transform: "rotateY(180deg)" }}><span className="font-mono text-[11px] text-ink-3">Shipley, West Yorkshire · 01943 864646 · since 1981</span></div>
        </div>
      </div>
      <div className="font-mono text-[11px] text-ink-2 lg:absolute lg:bottom-5 lg:left-9">CSS 3D tri-fold · the same quote is emailed as a PDF</div>
    </main>
  );
}
