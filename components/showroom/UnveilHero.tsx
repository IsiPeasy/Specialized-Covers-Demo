import { ThemedLink } from "@/components/theme/ThemeProvider";
import { CAR, FABRICS } from "@/lib/data";
import { gbp } from "@/lib/pricing";

const LOOP = "6s cubic-bezier(.6,0,.3,1) infinite";

/** The cover itself, drawn from CAR.body: a wide round-joined stroke makes the cloth sit proud of the body. */
export function UnveilCar({ label = "A cover pulled off a car, revealing a new colour each time" }: { label?: string }) {
  return (
    <svg viewBox="0 0 800 260" className="w-full overflow-visible" role="img" aria-label={label}>
      <ellipse cx="400" cy="238" rx="380" ry="10" fill="rgba(255,255,255,.08)" />
      <circle cx="190" cy="205" r="38" fill="#111" /><circle cx="610" cy="205" r="38" fill="#111" />
      <path d={CAR.body} style={{ fill: "#8a1c1c", animation: "sr-paint 18s linear infinite" }} />
      <path d={CAR.window} fill="#1A1A1A" />
      {/* base opacity 0: with reduced motion the car stays uncovered */}
      <g style={{ opacity: 0, transformOrigin: "700px 150px", animation: `sr-pull ${LOOP}` }}>
        <path d={CAR.body} fill="#E9E2D3" stroke="#C8BFAE" strokeWidth="20" strokeLinejoin="round" />
        <path d={CAR.body} fill="#E9E2D3" stroke="#E9E2D3" strokeWidth="16" strokeLinejoin="round" />
        <path d={CAR.piping} fill="none" stroke="#D3CAB8" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** I02 — The Unveil: black stage, a spotlight that brightens as the cover slides off. */
export default function UnveilHero() {
  const from = Math.min(...FABRICS.map((f) => f.base));
  return (
    <section id="hero" className="relative overflow-hidden bg-[#0a0a0b] text-[#f3eee6]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-200px] h-[1100px] w-[900px] max-w-[160vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,243,220,.22) 0%, rgba(255,243,220,0) 60%)", animation: `sr-spot ${LOOP}` }} />
      <div className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-[1360px] flex-col items-center justify-center gap-10 px-4 py-16 text-center sm:px-10">
        <div className="w-full max-w-[960px] px-[4%]"><UnveilCar /></div>
        <div className="flex flex-col items-center gap-5" style={{ animation: "sr-rise 1.2s cubic-bezier(.2,.8,.2,1) both" }}>
          <h1 className="font-display text-[44px] font-light leading-[1.05] sm:text-[84px]">Every car deserves <em className="font-serif font-normal">a reveal</em>.</h1>
          <p className="max-w-[560px] text-[16px] font-light tracking-[.04em] text-[#c9c2b6] sm:text-[17px]">Tailored covers, cut from your car's own pattern — indoor and outdoor, from {gbp(from)}.</p>
          <ThemedLink href="/configure" className="bg-[#f3eee6] px-9 py-4 text-[13px] font-semibold tracking-[.24em] text-[#0a0a0b] no-underline hover:bg-white hover:text-[#0a0a0b]">BEGIN</ThemedLink>
        </div>
      </div>
    </section>
  );
}
