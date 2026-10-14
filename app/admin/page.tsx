import Link from "next/link";
import { FABRICS, OPTIONS, SHAPES, SIZE_FACTOR, SIZE_LENGTH, VEHICLES, type SizeClass } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

/** C10 — pricing back-office (read-only in the demo). */
export default function Admin() {
  return (
    <div className="grid min-h-screen grid-cols-[220px_minmax(0,1fr)] bg-[#F7F6F2]">
      <nav aria-label="Back-office" className="flex flex-col gap-1 bg-green p-4 text-[#EDE6D6]">
        <Link href="/" className="px-2.5 pb-5 font-display text-lg font-semibold tracking-[.16em] text-[#EDE6D6] no-underline">SC · CONFIGURATOR</Link>
        {["Models & shapes", "Fabrics & lines", "Options & extras", "Colours", "Quotes", "Pattern requests"].map((t, i) => (<span key={t} className={`px-2.5 py-2.5 ${i === 0 ? "bg-[#EDE6D6] font-bold text-green" : ""}`}>{t}</span>))}
      </nav>
      <main className="flex flex-col gap-6 p-9">
        <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-[28px] font-bold">Models &amp; shapes</h1><span className="font-mono text-xs text-ink-3">Read-only demo · data in lib/data.ts</span></div>
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="border border-line bg-white p-5"><h2 className="font-bold">Price formula</h2><pre className="mt-3 bg-[#F1ECDF] p-3.5 font-mono text-sm leading-relaxed">price = line_base{"\n"}  × shape_factor × size_factor{"\n"}  + Σ option_prices{"\n"}  → round to £1</pre><p className="mt-2 text-[13px] text-ink-3">A model-level override replaces shape × size for one-offs.</p></section>
          <section className="border border-line bg-white p-5"><h2 className="font-bold">Shape factors</h2><table className="mt-2 w-full text-sm"><tbody>{SHAPES.map((s) => (<tr key={s.id} className="border-b border-line"><td className="py-2">{s.name}</td><td className="py-2 font-mono">× {s.factor.toFixed(2)}</td><td className="py-2 text-ink-3">{VEHICLES.filter((v) => v.shape === s.id).length} in sample</td></tr>))}</tbody></table></section>
          <section className="border border-line bg-white p-5"><h2 className="font-bold">Size factors · by overall length</h2><table className="mt-2 w-full text-sm"><tbody>{(Object.keys(SIZE_FACTOR) as SizeClass[]).map((k) => (<tr key={k} className="border-b border-line"><td className="py-2">{k}</td><td className="py-2 font-mono">{SIZE_LENGTH[k]}</td><td className="py-2 font-mono">× {SIZE_FACTOR[k].toFixed(2)}</td></tr>))}</tbody></table></section>
        </div>
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="border border-line bg-white p-5"><h2 className="font-bold">Lines (base “from” prices)</h2><table className="mt-2 w-full text-sm"><tbody>{FABRICS.map((f) => (<tr key={f.id} className="border-b border-line"><td className="py-2">{f.line}</td><td className="py-2 text-ink-3">{f.name} · {f.gsm}</td><td className="py-2 text-right font-mono">{gbp(f.base)}</td></tr>))}</tbody></table></div>
          <div className="border border-line bg-white p-5"><h2 className="font-bold">Options (placeholders)</h2><table className="mt-2 w-full text-sm"><tbody>
            {[["Two-tone panels", OPTIONS.twoTone], ["Racing stripe", OPTIONS.stripe], ["Embroidered text", OPTIONS.text], ["Embroidered roundel", OPTIONS.emblem.crest], ["Upgraded bag", OPTIONS.bag], ["Extended guarantee", OPTIONS.guarantee], ["Fast track 10", OPTIONS.speed.ft10], ["Fast track 5", OPTIONS.speed.ft5]].map(([k, v]) => (<tr key={k as string} className="border-b border-line"><td className="py-2">{k}</td><td className="py-2 text-right font-mono">{gbp(v as number)}</td></tr>))}
          </tbody></table></div>
        </section>
        <section className="overflow-x-auto border border-line bg-white">
          <table className="w-full whitespace-nowrap text-sm">
            <thead><tr className="bg-[#F1ECDF] text-left font-mono text-xs text-ink-2">{["Make", "Model", "Gen", "Years", "Shape", "Size", "Pattern", "Indoor Plus", "Outdoor Elite"].map((h) => <th key={h} className="px-3 py-2.5">{h}</th>)}</tr></thead>
            <tbody>{VEHICLES.map((v) => (<tr key={v.make + v.model + v.generation} className={`border-t border-line ${v.patternOnFile ? "" : "bg-[#FBF6E9]"}`}><td className="px-3 py-2.5">{v.make}</td><td className="px-3 py-2.5">{v.model}</td><td className="px-3 py-2.5">{v.generation}</td><td className="px-3 py-2.5">{v.years}</td><td className="px-3 py-2.5">{SHAPES.find((s) => s.id === v.shape)?.name}</td><td className="px-3 py-2.5">{v.size}</td><td className={`px-3 py-2.5 ${v.patternOnFile ? "text-green-ok" : "text-[#A4462E]"}`}>{v.patternOnFile ? "● On file" : "○ Needs pattern"}</td><td className="px-3 py-2.5 font-mono">{v.patternOnFile ? gbp(coverBase("prestige-plus", v.shape, v.size)) : "POA"}</td><td className="px-3 py-2.5 font-mono">{v.patternOnFile ? gbp(coverBase("stormtex-plus", v.shape, v.size)) : "POA"}</td></tr>))}</tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
