"use client";
import { useState } from "react";
import CarSvg from "@/components/CarSvg";
import { StepTitle } from "@/components/ConfigShell";
import { COLOURS, FABRICS, OPTIONS, SHAPES, SPEEDS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { gbp, quote } from "@/lib/pricing";

const nameOf = (h: string) => COLOURS.find((c) => c.hex.toLowerCase() === h.toLowerCase())?.name ?? h;
const face = "backface-hidden absolute inset-0 flex flex-col gap-3 border border-line p-6";

/** E05 — the quote as a CSS 3D tri-fold brochure. */
export default function QuoteStep() {
  const s = useConfig();
  const [open, setOpen] = useState(false);
  const { items, total } = quote(s);
  const v = VEHICLES[s.vehicleIndex];
  const fabric = FABRICS.find((f) => f.id === s.fabricId)!;
  const shape = SHAPES.find((x) => x.id === s.shape)!;
  return (
    <main className="perspective relative flex min-h-0 items-center justify-center" style={{ background: "radial-gradient(ellipse at 50% 60%, #E2DAC8 0%, #EAE3D3 60%)" }}>
      <div className="absolute left-9 top-6 z-10"><StepTitle n={6} kicker="Your quote · SCQ-26-10-0418" title={open ? "Your quote, opened." : "Your quote is ready."} /></div>
      <button type="button" onClick={() => setOpen(!open)} className="btn-primary absolute right-9 top-7 z-10 cursor-pointer">{open ? "FOLD IT AWAY" : "OPEN THE QUOTE"}</button>

      <div className="preserve relative h-[520px] w-[960px] transition-transform duration-700" style={{ transform: open ? "rotateX(6deg)" : "rotateX(10deg) rotateY(-18deg)" }}>
        <div className="preserve absolute left-0 top-0 h-[520px] w-[320px] transition-transform duration-1000" style={{ transformOrigin: "right center", transform: open ? "rotateY(0)" : "translateZ(4px) rotateY(180deg)" }}>
          <div className={`${face} bg-ivory-2`}>
            <span className="eyebrow">Your cover</span>
            <CarSvg side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripeOn && fabric.colourChoice ? s.stripe : null} mirror={!s.cameraMirrors} className="w-full" label="Your configured cover" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
              <dt className="text-ink-3">Car</dt><dd>{v.make} {v.model} ({v.generation})</dd>
              <dt className="text-ink-3">Shape</dt><dd>{shape.name} · {s.size} · {v.patternOnFile ? "pattern on file" : "pattern to source"}</dd>
              <dt className="text-ink-3">Fabric</dt><dd>{fabric.name} {fabric.gsm}</dd>
              <dt className="text-ink-3">Colours</dt><dd>{nameOf(s.centre)}{s.centre !== s.side ? ` / ${nameOf(s.side)}` : ""} · {nameOf(s.piping)} piping</dd>
              {s.text && (<><dt className="text-ink-3">Embroidery</dt><dd>“{s.text.toUpperCase()}” · {s.placement}</dd></>)}
            </dl>
          </div>
          <div className={`${face} items-center justify-between bg-green text-center text-ivory`} style={{ transform: "rotateY(180deg)" }}>
            <span className="font-mono text-[11px] tracking-[.2em] text-brass">QUOTE</span>
            <span className="font-display text-[34px] leading-tight">A cover tailored<br />for a {v.make} {v.model}</span>
            <span className="font-display text-base font-semibold tracking-[.2em]">SPECIALISED COVERS</span>
          </div>
        </div>

        <div className="absolute left-[320px] top-0 h-[520px] w-[320px]">
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

        <div className="preserve absolute left-[640px] top-0 h-[520px] w-[320px] transition-transform duration-1000" style={{ transformOrigin: "left center", transform: open ? "rotateY(0)" : "rotateY(-180deg)" }}>
          <div className={`${face} justify-between bg-ivory-2`}>
            <div className="flex flex-col gap-2.5">
              <span className="eyebrow">Delivery</span>
              <div role="radiogroup" aria-label="Production speed" className="flex flex-col gap-1.5">
                {SPEEDS.map((sp) => (<button key={sp.id} type="button" role="radio" aria-checked={s.speed === sp.id} onClick={() => s.set({ speed: sp.id })} className="flex cursor-pointer justify-between gap-2 bg-ivory px-2.5 py-2 text-left text-[13px]" style={{ border: s.speed === sp.id ? "2px solid var(--color-green)" : "2px solid var(--color-sand-2)" }}><span><strong className="block">{sp.label}</strong><span className="text-[11px] text-ink-3">{sp.when}</span></span><span className="font-mono">{OPTIONS.speed[sp.id] ? "+" + gbp(OPTIONS.speed[sp.id]) : "Included"}</span></button>))}
              </div>
              <label className="flex items-center justify-between text-[13px]"><span>Upgraded storage bag · +£39</span><input type="checkbox" checked={s.bag} onChange={(e) => s.set({ bag: e.target.checked })} className="h-5 w-5 accent-green" /></label>
              <label className="flex items-center justify-between text-[13px]"><span>Extended guarantee · +£29</span><input type="checkbox" checked={s.guarantee} onChange={(e) => s.set({ guarantee: e.target.checked })} className="h-5 w-5 accent-green" /></label>
              <div className="text-xs text-ink-3">Valid 30 days · UK delivery [RATE]</div>
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => window.print()} className="btn-primary cursor-pointer text-[13px]">DOWNLOAD PDF</button>
              <label className="flex text-xs"><input type="email" placeholder="you@example.com" className="min-w-0 flex-grow border border-line-2 bg-white px-2.5 py-2.5 text-[13px]" /><button type="button" className="cursor-pointer bg-ink px-3 font-bold text-ivory">Email</button></label>
              <button type="button" disabled className="border-2 border-dashed border-ink-3 px-2 py-2.5 text-xs font-bold text-ink-3">BUY NOW · PHASE 2</button>
            </div>
          </div>
          <div className={`${face} justify-end bg-sand`} style={{ transform: "rotateY(180deg)" }}><span className="font-mono text-[11px] text-ink-3">Shipley, West Yorkshire · 01943 864646 · since 1981</span></div>
        </div>
      </div>
      <div className="absolute bottom-5 left-9 font-mono text-[11px] text-ink-2">CSS 3D tri-fold · the same quote is emailed as a PDF</div>
    </main>
  );
}
