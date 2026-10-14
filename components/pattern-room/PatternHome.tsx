import PatternHeader from "./PatternHeader";
import ArchiveQuery from "./ArchiveQuery";
import CuttingTable from "./CuttingTable";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { FABRICS, SPEEDS } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import type { HomeSlots } from "@/lib/themes";

/** T3 — Pattern Room homepage: fabric in motion, archive query + FIG. 1, process, cutting table, flip wall, fabric spec. */
export default function PatternHome({ hero, section }: HomeSlots) {
  const std = SPEEDS.find((s) => s.id === "std")!;
  const steps = [
    ["01", "Measure", "Taken from the car, or from 3D models and CAD."],
    ["02", "Pattern", "From our archive — or drawn new and added to it."],
    ["03", "Cut & sew", "Wide rolls, fewer seams, sewn in Shipley."],
    ["04", "Dispatch", `Standard ${std.when}. Fast track in 5 or 10 working days.`],
  ];
  return (
    <>
      <PatternHeader />
      {hero}
      <ArchiveQuery />

      <section className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-8">
        <span className="mb-3 block font-mono text-[13px] text-accent-2">SHEET 02 / 04 — PROCESS</span>
        <ol className="grid border-2 border-ink bg-surface sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, d]) => (
            <li key={n} className="flex flex-col gap-2.5 border-ink p-7 max-lg:border-b sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"><span className="font-mono text-accent-2">{n}</span><strong className="text-[22px] font-semibold">{t}</strong><span className="text-[15px] text-ink-2">{d}</span></li>
          ))}
        </ol>
      </section>

      <CuttingTable />
      {section}

      <section id="fabrics" className="mx-auto flex max-w-[1320px] flex-col gap-4 px-4 pb-16 sm:px-8">
        <span className="font-mono text-[13px] text-accent-2">SHEET 04 / 04 — FABRIC SPECIFICATION</span>
        <div className="overflow-x-auto border-2 border-ink bg-surface">
          <table className="w-full min-w-[760px] border-collapse font-mono text-[14px]">
            <thead><tr className="bg-ink text-left text-surface">{["FABRIC", "LINE", "USE", "WEIGHT", "WATERPROOF", "COLOURS", "FROM"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{FABRICS.map((f) => (
              <tr key={f.id} className="border-t border-surface-3"><td className="px-4 py-3">{f.name}</td><td className="px-4 py-3">{f.line}</td><td className="px-4 py-3">{f.use}</td><td className="px-4 py-3">{f.gsm}</td><td className="px-4 py-3">{f.waterproof}</td><td className="px-4 py-3">{f.colours}</td><td className="px-4 py-3 text-right">{gbp(f.base)}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <ThemedLink href="/configure?step=1" className="w-fit bg-accent px-4 py-3 font-mono text-[14px] text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent">Compare them on your car →</ThemedLink>
      </section>

      <footer className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-4 border-t-2 border-ink px-4 py-8 pb-24 font-mono text-[13px] text-ink-2 sm:px-8">
        <span>DRAWN &amp; SEWN IN SHIPLEY, WEST YORKSHIRE · EST. 1981</span>
        <span>01943 864646</span>
      </footer>
    </>
  );
}
