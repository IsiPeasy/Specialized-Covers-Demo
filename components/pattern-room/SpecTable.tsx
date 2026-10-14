"use client";
import CarSvg from "@/components/CarSvg";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { FABRICS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";

const COLS: [string, (f: (typeof FABRICS)[number]) => string][] = [
  ["Line", (f) => f.line], ["Use", (f) => f.use], ["Weight", (f) => f.gsm], ["Construction", (f) => f.build],
  ["Waterproof", (f) => f.waterproof], ["Inner", (f) => f.inner], ["Colours", (f) => f.colours], ["Care", (f) => f.care], ["Best for", (f) => f.bestFor],
];

/** Pattern Room fabric step — the engineer's version: every column of FABRICS, side by side. */
export default function SpecTable() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const sel = FABRICS.find((f) => f.id === s.fabricId)!;
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="flex min-w-0 flex-col gap-5 px-4 py-7 sm:px-8 lg:overflow-y-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <StepTitle n={3} kicker="Fabric" title="Fabric specification" sub="All six fabrics, every property we hold. Select a row." />
          <figure className="w-[220px] border-2 border-ink bg-surface p-2">
            <CarSvg side={sel.hex} piping="#B3302A" className="w-full" label={`${sel.name} on your car`} />
            <figcaption className="font-mono text-[11px] text-ink-2">{`${v.make} ${v.model}`.toUpperCase()} · {sel.name.toUpperCase()}</figcaption>
          </figure>
        </div>
        <div className="overflow-x-auto border-2 border-ink bg-surface">
          <table className="w-full min-w-[1100px] border-collapse text-left text-[13px]">
            <caption className="sr-only">Fabric comparison — select a row to choose that fabric</caption>
            <thead><tr className="bg-ink font-mono text-[12px] text-surface"><th className="px-3 py-2.5 font-medium">FABRIC</th>{COLS.map(([h]) => <th key={h} className="px-3 py-2.5 font-medium">{h.toUpperCase()}</th>)}<th className="px-3 py-2.5 text-right font-medium">ON YOUR CAR</th></tr></thead>
            <tbody>
              {FABRICS.map((f) => {
                const on = f.id === sel.id;
                return (
                  <tr key={f.id} onClick={() => s.set({ fabricId: f.id })} className={`t-theme cursor-pointer border-t border-surface-3 transition-colors ${on ? "bg-accent text-on-accent" : "hover:bg-surface-2"}`}>
                    <th scope="row" className="px-3 py-2.5 font-normal">
                      <button type="button" role="radio" aria-checked={on} onClick={(e) => { e.stopPropagation(); s.set({ fabricId: f.id }); }} className="flex cursor-pointer items-center gap-2 font-mono font-semibold text-inherit">
                        <span aria-hidden="true" className="h-3 w-3 border-2" style={{ borderColor: "currentColor", background: on ? "currentColor" : "transparent" }} />{f.name}
                      </button>
                    </th>
                    {COLS.map(([h, get]) => <td key={h} className="px-3 py-2.5">{get(f)}</td>)}
                    <td className="px-3 py-2.5 text-right font-mono">{gbp(coverBase(f.id, s.shape, s.size))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[12px] text-ink-3">Prices: line base × {s.shape} factor × size {s.size} — see /pricing. Free swatches posted on request.</p>
      </section>
      <PriceAside next={2} nextLabel="CONTINUE — COLOURS">
        <span className="font-mono text-[13px] text-accent-2">SELECTED · {sel.name.toUpperCase()}</span>
      </PriceAside>
    </main>
  );
}
