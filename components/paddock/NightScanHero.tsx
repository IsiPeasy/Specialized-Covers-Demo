import { ThemedLink } from "@/components/theme/ThemeProvider";
import { CAR, SHAPES, VEHICLES } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

const LOOP = "9s linear infinite";
const GRID = { backgroundImage: "linear-gradient(rgba(94,234,212,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,.06) 1px, transparent 1px)", backgroundSize: "48px 48px" };

/** The scanned car: dashed wireframe while the bar passes, then the filled cover wipes in behind it. */
export function ScanCar({ label = "Car being scanned and covered" }: { label?: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 800 260" className="w-full overflow-visible" role="img" aria-label={label}>
        <g style={{ animation: `pd-wire ${LOOP}` }} fill="none" stroke="#5EEAD4">
          <circle cx="190" cy="205" r="38" strokeWidth="1.2" strokeDasharray="4 4" /><circle cx="610" cy="205" r="38" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d={CAR.body} strokeWidth="1.4" strokeDasharray="6 4" />
          <path d={`${CAR.window} M340,82 L340,200 M480,72 L480,200 M190,140 L190,200 M610,128 L610,200`} strokeWidth=".8" strokeDasharray="3 4" opacity=".7" />
        </g>
        <g style={{ animation: `pd-fill ${LOOP}` }}>
          <circle cx="190" cy="205" r="38" fill="#020504" /><circle cx="610" cy="205" r="38" fill="#020504" />
          <path d={CAR.body} fill="#0E2A26" /><path d={CAR.centre} fill="#153D37" />
          <path d={CAR.piping} fill="none" stroke="#FF6A13" strokeWidth="3" />
        </g>
      </svg>
      <div aria-hidden="true" className="absolute -bottom-6 -top-6 w-[3px] bg-[#5EEAD4]" style={{ boxShadow: "0 0 24px 6px rgba(94,234,212,.6)", animation: `pd-scan ${LOOP}` }} />
    </div>
  );
}

/** I01 — Night Scan: teal grid, a scan bar sweeping the archive's car; HUD readout appears at 55 %. */
export default function NightScanHero() {
  const v = VEHICLES[0];
  const shape = SHAPES.find((s) => s.id === v.shape)!;
  const hud: [string, string][] = [
    ["VEHICLE", `${v.make} ${v.model} (${v.generation})`.toUpperCase()],
    ["PATTERN", v.patternOnFile ? "ON FILE · TAILORED" : "TO SOURCE"],
    ["SHAPE", `${shape.name} · ${v.size}`.toUpperCase()],
    ["INDOOR FROM", gbp(coverBase("prestige-plus", v.shape, v.size))],
  ];
  return (
    <section id="scan" className="relative overflow-hidden text-[#D8FFF4]" style={{ background: "radial-gradient(ellipse at 50% 60%, #0B1A18 0%, #030807 65%)" }}>
      <div aria-hidden="true" className="absolute inset-0" style={GRID} />
      <div className="relative mx-auto flex min-h-[calc(100vh-81px)] max-w-[1320px] flex-col gap-8 px-4 py-8 sm:px-8">
        <p className="font-mono text-[13px] tracking-[.12em] text-[#8FD9CB]" style={{ animation: "pd-blink 1.6s steps(2) infinite" }}>● SCANNING ARCHIVE · 30,000+ PATTERNS</p>
        <div className="mx-auto w-full max-w-[1000px] px-[3%] py-6"><ScanCar /></div>
        <div className="mt-auto flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[820px] flex-col gap-5">
            <h1 className="font-display text-[56px] leading-[.9] text-[#F2F2F0] sm:text-[104px]">Built for the paddock. Made for your garage.</h1>
            <p className="max-w-[520px] font-mono text-[14px] leading-relaxed text-[#8FD9CB]">Search your make, model and year. If it's in the archive, you get a tailored cover and a live price in seconds.</p>
            <ThemedLink href="/configure" className="w-fit bg-[#5EEAD4] px-6 py-3.5 font-display text-[18px] tracking-[.12em] text-[#030807] no-underline hover:bg-white hover:text-[#030807]">FIND MY CAR</ThemedLink>
          </div>
          <dl className="grid shrink-0 grid-cols-[auto_auto] lg:mb-16 gap-x-5 gap-y-2 font-mono text-[13px] text-[#8FD9CB]" style={{ animation: `pd-hud ${LOOP}` }}>
            {hud.map(([k, val]) => <div key={k} className="contents"><dt>{k}</dt><dd className="text-[#D8FFF4]">{val}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}
