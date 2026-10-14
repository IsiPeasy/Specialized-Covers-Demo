import { ThemedLink } from "@/components/theme/ThemeProvider";
import { CAR, FABRICS } from "@/lib/data";

const WAVES = [
  { d: "M0,260 C200,180 380,340 600,260 C820,180 980,320 1200,250 C1380,190 1500,260 1600,230 L1600,500 L0,500 Z", fill: "#D9D3C4", top: "24%", anim: "pr-w1 16s" },
  { d: "M0,300 C220,220 360,380 620,300 C860,230 1000,360 1240,290 C1420,240 1520,300 1600,270 L1600,500 L0,500 Z", fill: "#B8AE94", top: "36%", anim: "pr-w2 20s" },
  { d: "M0,320 C240,250 420,400 660,320 C900,250 1040,380 1280,310 C1440,260 1540,320 1600,300 L1600,560 L0,560 Z", fill: "#1D3A8A", top: "50%", anim: "pr-w3 24s" },
];
const NAMES = ["prestige-plus", "stormshield-plus", "stormtex-plus"].map((id) => FABRICS.find((f) => f.id === id)!);

/** Three parallax waves of cloth in paper, khaki and blue. */
export function Waves() {
  return (
    <>
      {WAVES.map((w) => (
        <svg key={w.top} viewBox="0 0 1600 500" preserveAspectRatio="none" aria-hidden="true" className="absolute left-[-10%] h-[60%] w-[120%]" style={{ top: w.top, animation: `${w.anim} ease-in-out infinite` }}>
          <path d={w.d} fill={w.fill} />
        </svg>
      ))}
    </>
  );
}

/** I03 adapted — fabric in motion on graph paper; the car floats, fabric names cycle in mono. */
export default function FabricMotionHero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden border-y-2 border-ink lg:min-h-[calc(100vh-90px)]">
      <Waves />
      <div className="relative mx-auto grid h-full max-w-[1320px] gap-8 px-4 pt-14 sm:px-8 lg:grid-cols-[minmax(0,560px)_1fr]">
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] text-accent-2">SHEET 00 / 04 — MATERIALS</span>
          <h1 className="font-display text-[40px] leading-[1.04] sm:text-[60px]">Fabric chosen for the job. Cut for the car.</h1>
          <p className="max-w-[460px] text-[17px] leading-relaxed text-ink-2">Soft fleece for the garage. Laminates for the drive. Every pattern nested to keep seams to a minimum.</p>
          <ThemedLink href="/configure?step=1" className="w-fit bg-accent px-5 py-3 font-mono text-[14px] text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent">Compare the fabrics →</ThemedLink>
        </div>
        <div className="mx-auto w-full max-w-[600px] lg:mt-24" style={{ animation: "pr-float 7s ease-in-out infinite" }}>
          <svg viewBox="0 0 800 260" className="w-full" role="img" aria-label="A covered car floating over waves of fabric">
            <circle cx="190" cy="205" r="38" fill="#16203A" /><circle cx="610" cy="205" r="38" fill="#16203A" />
            <path d={CAR.body} fill="#16203A" /><path d={CAR.centre} fill="#24315A" />
            <path d={CAR.piping} fill="none" stroke="#B3302A" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-24 left-4 right-4 h-8 font-mono text-[15px] text-[#F7F6F1] sm:left-8 sm:text-[20px]">
        {NAMES.map((f, k) => (
          <p key={f.id} className="absolute left-0 max-w-full truncate bg-[#16203A] px-2 py-0.5" style={{ animation: `pr-name-${k + 1} 15s linear infinite`, opacity: k === 0 ? 1 : 0 }}>
            {f.name} · {f.gsm} · {f.build.toLowerCase()} · {f.waterproof.split(" — ")[0].toLowerCase() === "no" ? "indoor" : "waterproof"}
          </p>
        ))}
      </div>
      <div className="absolute bottom-6 left-4 right-4 flex flex-wrap justify-between gap-3 font-mono text-[12px] text-[#F7F6F1] sm:left-8 sm:right-8">
        <span>SHIPLEY, WEST YORKSHIRE · SINCE 1981</span><span>FIG. 0 — FABRIC IN MOTION</span>
      </div>
    </section>
  );
}
