import { ThemedLink } from "@/components/theme/ThemeProvider";
import { FABRICS, SHAPES } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

/** Three shapes on the cutting table, each with its own fabric. Prices from the pricing module (size M). */
const PIECES = [
  { shape: "compact", fabric: "prestige-plus", fill: "#1D3A8A", edge: "#16203A", x: 70, y: 70 },
  { shape: "coupe", fabric: "stormtex-plus", fill: "#16203A", edge: "#0B1226", x: 430, y: 50 },
  { shape: "suv", fabric: "stormshield-plus", fill: "#B3302A", edge: "#7E1F1A", x: 250, y: 320 },
] as const;

/** D03 adapted — an isometric cutting table on graph paper, with three cut shapes standing on it. */
export default function CuttingTable() {
  return (
    <section className="border-y-2 border-ink bg-surface">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] text-accent-2">SHEET 03 / 04 — THE CUTTING TABLE</span>
          <h2 className="font-display text-[34px] leading-[1.06] sm:text-[44px]">Five shapes on one table.</h2>
          <p className="text-[16px] leading-relaxed text-ink-2">Every car in the archive maps to a cover shape. Shape and length set how much cloth we cut; the cut itself follows the car's own pattern.</p>
          <table className="w-full border-2 border-ink font-mono text-[13px]">
            <tbody>
              {PIECES.map((p) => {
                const s = SHAPES.find((x) => x.id === p.shape)!, f = FABRICS.find((x) => x.id === p.fabric)!;
                return <tr key={p.shape} className="border-t border-ink first:border-t-0"><td className="px-3 py-2"><span className="mr-2 inline-block h-3 w-3 align-middle" style={{ background: p.fill }} />{s.name}</td><td className="px-3 py-2 text-ink-2">{f.name}</td><td className="px-3 py-2 text-right">{gbp(coverBase(f.id, s.id, "M"))}</td></tr>;
              })}
            </tbody>
          </table>
          <ThemedLink href="/shapes" className="font-mono text-[14px]">All five shapes and their factors →</ThemedLink>
        </div>
        <div className="relative mx-auto aspect-[1060/700] w-full max-w-[860px] overflow-hidden [--table-scale:.4] sm:[--table-scale:.7] xl:[--table-scale:.9]" style={{ perspective: "2200px" }}>
          <div className="preserve absolute left-1/2 top-1/2 h-[560px] w-[820px] origin-center" style={{ transform: "translate(-50%,-50%) scale(var(--table-scale, .9))" }}>
            <div className="preserve absolute inset-0" style={{ animation: "pr-sway 14s ease-in-out infinite", transform: "rotateX(58deg) rotateZ(-38deg)" }}>
              <div className="absolute inset-0 border-2 border-ink bg-[#E6E3DA]" style={{ backgroundImage: "linear-gradient(#C9C4B6 1px, transparent 1px), linear-gradient(90deg, #C9C4B6 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
              {PIECES.map((p) => {
                const s = SHAPES.find((x) => x.id === p.shape)!;
                return (
                  <div key={p.shape} className="preserve absolute h-[180px] w-[320px]" style={{ left: p.x, top: p.y }}>
                    <div className="absolute inset-0 border-2" style={{ background: "#F7F6F1", borderColor: p.edge }} />
                    <svg viewBox="0 0 200 80" className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2" style={{ transform: "translate(-50%, -100%) rotateX(-90deg)", transformOrigin: "50% 100%" }} role="img" aria-label={`${s.name} cover shape`}>
                      <circle cx="50" cy="62" r="11" fill="#16203A" /><circle cx="150" cy="62" r="11" fill="#16203A" />
                      <path d={s.path} fill={p.fill} />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
