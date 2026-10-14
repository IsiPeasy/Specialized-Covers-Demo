"use client";
import CarSvg from "@/components/CarSvg";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { FABRICS, VEHICLES, type Fabric } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";

const maxGsm = Math.max(...FABRICS.map((f) => parseInt(f.gsm)));
/** Bars derived from the FABRICS text only — no new client data. Breathability isn't in the data yet. */
const bars = (f: Fabric) => [
  { k: "GSM", v: Math.round((parseInt(f.gsm) / maxGsm) * 100), label: f.gsm },
  { k: "WATERPROOF", v: f.waterproof.startsWith("Yes") ? 100 : f.waterproof.startsWith("Shower") ? 50 : 0, label: f.waterproof.split(" — ")[0] },
  { k: "BREATHABILITY", v: null, label: "[DATA]" },
];

/** Paddock fabric step — the swatch book rewritten as a technical HUD sheet. */
export default function HudFabric() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const sel = FABRICS.find((f) => f.id === s.fabricId)!;
  const selPrice = coverBase(sel.id, s.shape, s.size);
  // label, value, point on the car (viewBox 800×260, drawn 30 down), label corner: top/bottom × left/right
  const leaders: [string, string, number, number, "tl" | "tr" | "bl" | "br"][] = [
    ["INNER", sel.inner, 250, 160, "tl"],
    ["SHELL", sel.build, 420, 90, "tr"],
    ["CARE", sel.care, 300, 185, "bl"],
    ["WATER", sel.waterproof, 660, 150, "br"],
  ];
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="grid min-w-0 content-start gap-8 px-4 py-7 sm:px-8 xl:grid-cols-[minmax(0,440px)_1fr] xl:content-center">
        <div className="flex flex-col gap-4">
          <StepTitle n={3} kicker="Fabric" title="Spec sheet" sub="Six fabrics, measured. Select a line to load it onto your car." />
          <div role="radiogroup" aria-label="Fabrics" className="flex flex-col border border-line">
            {FABRICS.map((f) => {
              const on = f.id === sel.id, d = coverBase(f.id, s.shape, s.size) - selPrice;
              return (
                <button key={f.id} type="button" role="radio" aria-checked={on} onClick={() => s.set({ fabricId: f.id })}
                  className={`t-theme flex cursor-pointer flex-col gap-2 border-b border-line px-4 py-3 text-left text-ink transition-colors last:border-b-0 ${on ? "bg-surface-3" : "bg-surface hover:bg-surface-2"}`}
                  style={{ boxShadow: on ? "inset 3px 0 0 var(--color-accent)" : "none" }}>
                  <span className="flex items-baseline justify-between gap-3">
                    <strong className="font-display text-[22px] leading-none">{f.name}</strong>
                    <span className={`font-mono text-[13px] ${on ? "text-accent-2" : "text-ink-2"}`}>{on ? "SELECTED" : `${d >= 0 ? "+" : "−"}${gbp(Math.abs(d))}`}</span>
                  </span>
                  <span className="grid grid-cols-[110px_1fr_auto] items-center gap-x-3 gap-y-1 font-mono text-[11px] text-ink-3">
                    {bars(f).map((b) => (
                      <span key={b.k} className="contents">
                        <span>{b.k}</span>
                        <span className="relative h-1.5 bg-surface-3" aria-hidden="true">
                          {b.v === null
                            ? <span className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-line-2) 0 4px, transparent 4px 8px)" }} />
                            : <span className="absolute inset-y-0 left-0 bg-accent-2" style={{ width: `${b.v}%` }} />}
                        </span>
                        <span className="text-right">{b.label}</span>
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <figure className="relative flex flex-col gap-3">
          <div className="flex justify-between font-mono text-[12px] text-ink-3"><span>{`${v.make} ${v.model} (${v.generation})`.toUpperCase()}</span><span>{s.shape.toUpperCase()} · {s.size}</span></div>
          <div className="relative mt-4 aspect-[800/330] w-full">
            <CarSvg side={sel.hex} piping="var(--color-accent)" className="absolute left-0 top-[9.09%] w-full" label={`${sel.name} on your car`} />
            <svg viewBox="0 0 800 330" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              {leaders.map(([k, val, x, y, c]) => {
                const top = c[0] === "t", left = c[1] === "l";
                const lx = left ? 40 : 760, ly = top ? 22 : 318, end = top ? 30 : 304;
                return (
                  <g key={k + sel.id} className="font-mono" style={{ fontSize: 13, animation: "fade-in .4s steps(4) both" }}>
                    <circle cx={x} cy={y + 30} r="4" style={{ fill: "var(--color-accent-2)" }} />
                    <polyline points={`${x},${y + 30} ${x},${end} ${lx},${end}`} fill="none" strokeDasharray="4 4" strokeWidth="1" style={{ stroke: "var(--color-accent-2)" }} />
                    <text x={lx} y={top ? ly - 2 : ly + 8} textAnchor={left ? "start" : "end"} style={{ fill: "var(--color-ink)" }}>{k} · {val.toUpperCase()}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <figcaption className="font-mono text-[11px] text-ink-3">Breathability figures [DATA] to come from the fabric spec sheets · free swatches posted on request</figcaption>
        </figure>
      </section>

      <PriceAside next={2} nextLabel="CONTINUE — COLOURS">
        <span className="font-mono text-[13px] tracking-[.14em] text-accent">{sel.line.toUpperCase()}</span>
        <p className="text-sm text-ink-2">{sel.bestFor}. {sel.colours}.</p>
      </PriceAside>
    </main>
  );
}
