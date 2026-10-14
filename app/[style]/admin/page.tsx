import Link from "next/link";
import { FABRICS, OPTIONS, SHAPES, SIZE_FACTOR, SIZE_LENGTH, VEHICLES, type SizeClass } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

const card = "border border-line bg-surface p-5";

/** C10 — pricing back-office (read-only in the demo). Same in every style, only recoloured. */
export default function Admin() {
    return (
    <div className="grid min-h-screen bg-surface-2 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="Back-office" className="flex flex-wrap gap-1 bg-accent p-4 text-on-accent lg:flex-col lg:flex-nowrap">
        <Link href="/" title="All styles" className="w-full px-2.5 pb-3 flex flex-col gap-1 font-display text-lg font-medium tracking-[.32em] text-on-accent no-underline hover:text-on-accent lg:pb-5">COVERCAR<span className="font-sans text-[11px] font-semibold tracking-[.3em] opacity-80">CONFIGURATOR</span></Link>
        {["Models & shapes", "Fabrics & lines", "Options & extras", "Colours", "Quotes", "Pattern requests"].map((t, i) => (<span key={t} className={`px-2.5 py-2.5 text-sm ${i === 0 ? "bg-on-accent font-bold text-accent" : ""}`}>{t}</span>))}
      </nav>
      <main className="flex min-w-0 flex-col gap-6 p-4 pb-24 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-[28px] font-bold">Models &amp; shapes</h1><span className="font-mono text-xs text-ink-3">Read-only demo · data in lib/data.ts</span></div>
        <div className="grid gap-4 lg:grid-cols-3">
          <section className={card}><h2 className="font-bold">Price formula</h2><pre className="mt-3 overflow-x-auto bg-surface-3 p-3.5 font-mono text-sm leading-relaxed">price = line_base{"\n"}  × shape_factor × size_factor{"\n"}  + Σ option_prices{"\n"}  → round to £1</pre><p className="mt-2 text-[13px] text-ink-3">A model-level override replaces shape × size for one-offs.</p></section>
          <section className={card}><h2 className="font-bold">Shape factors</h2><table className="mt-2 w-full text-sm"><tbody>{SHAPES.map((s) => (<tr key={s.id} className="border-b border-line"><td className="py-2">{s.name}</td><td className="py-2 font-mono">× {s.factor.toFixed(2)}</td><td className="py-2 text-ink-3">{VEHICLES.filter((v) => v.shape === s.id).length} in sample</td></tr>))}</tbody></table></section>
          <section className={card}><h2 className="font-bold">Size factors · by overall length</h2><table className="mt-2 w-full text-sm"><tbody>{(Object.keys(SIZE_FACTOR) as SizeClass[]).map((k) => (<tr key={k} className="border-b border-line"><td className="py-2">{k}</td><td className="py-2 font-mono">{SIZE_LENGTH[k]}</td><td className="py-2 font-mono">× {SIZE_FACTOR[k].toFixed(2)}</td></tr>))}</tbody></table></section>
        </div>
        <section className="grid gap-4 lg:grid-cols-2">
          <div className={card}><h2 className="font-bold">Lines (base “from” prices)</h2><table className="mt-2 w-full text-sm"><tbody>{FABRICS.map((f) => (<tr key={f.id} className="border-b border-line"><td className="py-2">{f.line}</td><td className="py-2 text-ink-3">{f.name} · {f.gsm}</td><td className="py-2 text-right font-mono">{gbp(f.base)}</td></tr>))}</tbody></table></div>
          <div className={card}><h2 className="font-bold">Options (placeholders)</h2><table className="mt-2 w-full text-sm"><tbody>
            {[["Two-tone panels", OPTIONS.twoTone], ["Racing stripe", OPTIONS.stripe], ["Embroidered text", OPTIONS.text], ["Embroidered roundel", OPTIONS.emblem.crest], ["Upgraded bag", OPTIONS.bag], ["Extended guarantee", OPTIONS.guarantee], ["Fast track 10", OPTIONS.speed.ft10], ["Fast track 5", OPTIONS.speed.ft5]].map(([k, v]) => (<tr key={k as string} className="border-b border-line"><td className="py-2">{k}</td><td className="py-2 text-right font-mono">{gbp(v as number)}</td></tr>))}
          </tbody></table></div>
        </section>
        <section className="overflow-x-auto border border-line bg-surface">
          <table className="w-full whitespace-nowrap text-sm">
            <thead><tr className="bg-surface-3 text-left font-mono text-xs text-ink-2">{["Make", "Model", "Gen", "Years", "Shape", "Size", "Pattern", "Indoor Plus", "Outdoor Elite"].map((h) => <th key={h} className="px-3 py-2.5">{h}</th>)}</tr></thead>
            <tbody>{VEHICLES.map((v) => (<tr key={v.make + v.model + v.generation} className={`border-t border-line ${v.patternOnFile ? "" : "bg-surface-2"}`}><td className="px-3 py-2.5">{v.make}</td><td className="px-3 py-2.5">{v.model}</td><td className="px-3 py-2.5">{v.generation}</td><td className="px-3 py-2.5">{v.years}</td><td className="px-3 py-2.5">{SHAPES.find((s) => s.id === v.shape)?.name}</td><td className="px-3 py-2.5">{v.size}</td><td className={`px-3 py-2.5 ${v.patternOnFile ? "text-ok" : "text-warn"}`}>{v.patternOnFile ? "● On file" : "○ Needs pattern"}</td><td className="px-3 py-2.5 font-mono">{v.patternOnFile ? gbp(coverBase("prestige-plus", v.shape, v.size)) : "POA"}</td><td className="px-3 py-2.5 font-mono">{v.patternOnFile ? gbp(coverBase("stormtex-plus", v.shape, v.size)) : "POA"}</td></tr>))}</tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
