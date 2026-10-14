import { ThemedLink } from "@/components/theme/ThemeProvider";
import { CAR } from "@/lib/data";

/** I08 — chalk pattern lines drawing themselves on a blackboard. */
export default function TailorHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#22302A] text-ivory">
      <div className="pointer-events-none absolute inset-0 opacity-[.06]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px)" }} />
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <span className="eyebrow" style={{ color: "#F5D37A" }}>Bespoke car covers · since 1981</span>
          <h1 className="font-display text-[48px] leading-[.98] sm:text-[72px] font-medium">Measured like a suit.<br /><em>Cut like one too.</em></h1>
          <p className="max-w-[460px] text-[16px] leading-relaxed text-[#C9CFC8]">Patterns taken from the car, or drawn from CAD when it can't come to Shipley. Fewer seams, no flapping, nothing universal. Choose your car, fabric and colours — the price updates as you go.</p>
          <div className="flex flex-wrap gap-3">
            <ThemedLink href="/configure" className="btn" style={{ background: "#F5D37A", color: "#22302A" }}>START MY PATTERN</ThemedLink>
            <ThemedLink href="/shapes" className="btn border border-ivory text-ivory">HOW IT'S PRICED</ThemedLink>
          </div>
        </div>
        <svg viewBox="0 0 800 300" className="w-full overflow-visible" role="img" aria-label="Pattern lines drawn in chalk">
          <path d={CAR.body} fill="none" stroke="#F2EEE4" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2400" style={{ animation: "draw 10s ease-in-out infinite" }} />
          <path d={`${CAR.piping} M340,82 L340,200 M480,72 L480,200 ${CAR.window}`} fill="none" stroke="#F5D37A" strokeWidth="1.6" strokeDasharray="6 6" />
          <circle cx="190" cy="205" r="38" fill="none" stroke="#F2EEE4" strokeWidth="1.6" strokeDasharray="3 5" />
          <circle cx="610" cy="205" r="38" fill="none" stroke="#F2EEE4" strokeWidth="1.6" strokeDasharray="3 5" />
          <text x="96" y="130" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill="#F5D37A">centre panel — 178 cm roll, no pin-on</text>
          <text x="560" y="250" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill="#F5D37A">mirror pocket, left ↑</text>
          <text x="400" y="290" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#F2EEE4">OVERALL LENGTH [L] mm · PATTERN No. [####]</text>
        </svg>
      </div>
    </section>
  );
}
