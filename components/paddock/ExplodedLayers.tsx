import { ThemedLink } from "@/components/theme/ThemeProvider";
import { CAR, FABRICS } from "@/lib/data";
import { gbp } from "@/lib/pricing";

const LOOP = "12s ease-in-out infinite";

/** I04 — the outdoor cover pulled apart into its layers. Every label comes from FABRICS. */
export default function ExplodedLayers() {
  const f = FABRICS.find((x) => x.id === "stormtex-plus")!;
  const layers = [
    { anim: "pd-explode-1", label: `01 OUTER · ${f.build} · ${f.gsm}`, color: "var(--color-accent)", top: "6%",
      svg: <><path d={CAR.body} fill="#2B3036" stroke="var(--color-accent)" strokeWidth="2" /><path d={CAR.piping} fill="none" stroke="var(--color-accent)" strokeWidth="3" /></> },
    { anim: "pd-explode-2", label: `02 PROTECTION · ${f.waterproof}`, color: "var(--color-accent-2)", top: "42%",
      svg: <path d={CAR.body} fill="rgba(94,234,212,.22)" stroke="var(--color-accent-2)" strokeWidth="1.5" strokeDasharray="6 5" /> },
    { anim: "pd-explode-3", label: `03 INNER · ${f.inner}`, color: "var(--color-ink)", top: "74%",
      svg: <><path d={CAR.body} fill="#D9D2C5" /><circle cx="190" cy="205" r="38" fill="#0E0F11" /><circle cx="610" cy="205" r="38" fill="#0E0F11" /></> },
  ];
  return (
    <section id="layers" className="overflow-hidden border-y border-line" style={{ background: "linear-gradient(180deg, #0D1117 0%, #151C26 100%)" }}>
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,440px)_1fr]">
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] tracking-[.2em] text-accent">{f.line.toUpperCase()} · {f.name.toUpperCase()}</span>
          <h2 className="font-display text-[52px] leading-[.95] sm:text-[68px]">Layered. Then tailored.</h2>
          <p className="text-[16px] leading-relaxed text-ink-2">Each layer has one job. Cut to your car's own pattern, so there's nothing left to flap in a crosswind.</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 font-mono text-[13px]">
            <dt className="text-ink-3">WEIGHT</dt><dd>{f.gsm}</dd>
            <dt className="text-ink-3">CARE</dt><dd>{f.care}</dd>
            <dt className="text-ink-3">FROM</dt><dd className="text-accent">{gbp(f.base)}</dd>
          </dl>
          <ThemedLink href="/configure?step=1" className="w-fit bg-ink px-6 py-3.5 font-display text-[18px] tracking-[.1em] text-bg no-underline hover:bg-accent hover:text-on-accent">BUILD MINE</ThemedLink>
        </div>
        <div className="relative mx-auto aspect-[820/600] w-full max-w-[820px]" style={{ perspective: "1400px" }}>
          {layers.map((l) => (
            <div key={l.anim} className="preserve absolute inset-x-0 top-[22%]" style={{ animation: `${l.anim} ${LOOP}`, transform: "rotateX(55deg) rotateZ(-18deg)" }}>
              <svg viewBox="0 0 800 260" className="w-full" aria-hidden="true">{l.svg}</svg>
            </div>
          ))}
          <ul className="absolute right-0 top-0 h-full w-[46%] font-mono text-[12px] tracking-[.08em] sm:text-[13px]">
            {layers.map((l) => <li key={l.anim} className="absolute right-0 uppercase" style={{ top: l.top, color: l.color, animation: `pd-label ${LOOP}` }}>{l.label}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
