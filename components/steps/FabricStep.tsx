"use client";
import CarSvg from "@/components/CarSvg";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { CAR, FABRICS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";

const TEX = {
  knit: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1.2px)",
  weave: "linear-gradient(45deg, rgba(255,255,255,.08) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.08) 75%)",
};

/** E02 — tailor's swatch book, fanned out in CSS 3D. */
export default function FabricStep() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const sel = FABRICS.find((f) => f.id === s.fabricId)!;
  const selPrice = coverBase(sel.id, s.shape, s.size);
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)_380px]">
      <section className="perspective relative min-h-[460px] overflow-hidden border-line bg-sand lg:border-r">
        <div className="absolute left-4 top-6 sm:left-8"><StepTitle n={3} kicker="Fabric" title="The swatch book" sub="Tap a swatch to fan it out." /></div>
        <div className="preserve absolute bottom-10 left-[20px] h-[300px] w-[420px] origin-bottom-left max-sm:scale-[.78] sm:left-[60px]" style={{ transform: "rotateX(38deg) rotateZ(-8deg)" }}>
          {FABRICS.map((f, idx) => {
            const on = f.id === s.fabricId;
            const ang = -8 + idx * 14;
            return (
              <button key={f.id} type="button" onClick={() => s.set({ fabricId: f.id })} aria-pressed={on} aria-label={f.name}
                className="backface-hidden absolute bottom-0 left-0 h-[300px] w-[200px] cursor-pointer border-0 p-0 text-left text-[#f4f0e8] transition-transform duration-500"
                style={{ transformOrigin: "14px 286px", transform: `rotateZ(${on ? ang + 22 : ang}deg) translateZ(${on ? 40 : 0}px)`, zIndex: on ? 20 : idx, backgroundColor: f.hex, backgroundImage: TEX[f.texture], backgroundSize: "6px 6px", boxShadow: "2px 2px 0 rgba(0,0,0,.25)" }}>
                <span className="absolute left-3.5 right-3.5 top-3.5 flex flex-col gap-1"><strong className="text-[15px]">{f.name}</strong><span className="font-mono text-[11px] opacity-85">{f.gsm} · {f.use}</span></span>
                <span className="absolute bottom-2 left-2 h-3 w-3 rounded-full bg-brass" style={{ boxShadow: "inset 0 0 0 2px #1A1A17" }} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex min-w-0 flex-col gap-4 px-4 py-7 sm:px-9">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4"><h2 className="font-display text-[40px] font-medium">{sel.name}</h2><span className="font-mono text-xs text-ink-3">{sel.line}</span></div>
        <div className="relative bg-sand px-3 pb-3 pt-9 sm:px-6 sm:pt-7">
          <CarSvg side={sel.hex} piping={sel.colourChoice ? "#C9A35A" : "#EDEDEA"} className="w-full" label="Your car in the selected fabric">
            <path d={CAR.body} fill={`url(#${sel.texture})`} />
            <defs>
              <pattern id="knit" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="rgba(255,255,255,.12)" /></pattern>
              <pattern id="weave" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0,8 L8,0" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" /></pattern>
            </defs>
          </CarSvg>
          <div className="absolute right-3.5 top-2.5 font-mono text-[11px] text-ink-2">{v.make} {v.model} ({v.generation}) · {s.shape}</div>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-[13px] sm:grid-cols-3">
          {[["Construction", sel.build], ["Waterproof", sel.waterproof], ["Colours", sel.colours], ["Inner", sel.inner], ["Care", sel.care], ["Best for", sel.bestFor]].map(([k, val]) => (
            <div key={k} className="border border-line bg-ivory-2 p-3"><dt className="font-mono text-[11px] uppercase text-ink-3">{k}</dt><dd className="mt-1">{val}</dd></div>
          ))}
        </dl>
        <p className="text-[13px] text-ink-3">Free swatches posted on request — colours on screen are a guide.</p>
      </section>

      <PriceAside next={2} nextLabel="CONTINUE — COLOURS">
        <span className="eyebrow">Compared on your car</span>
        <div className="flex flex-col gap-1.5 text-sm">
          {FABRICS.filter((f) => f.id !== sel.id).map((f) => { const d = coverBase(f.id, s.shape, s.size) - selPrice; return (
            <button key={f.id} type="button" onClick={() => s.set({ fabricId: f.id })} className="flex cursor-pointer justify-between border-b border-dashed border-line-2 pb-1 text-left text-ink-3 hover:text-ink"><span>{f.name}</span><span className="font-mono">{d >= 0 ? "+" : "−"}{gbp(Math.abs(d))}</span></button>
          ); })}
        </div>
      </PriceAside>
    </main>
  );
}
