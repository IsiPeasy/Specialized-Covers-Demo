"use client";
import dynamic from "next/dynamic";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { COLOURS, FABRICS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { coverBase, gbp } from "@/lib/pricing";
import FpsCounter from "./FpsCounter";

const Cover3D = dynamic(() => import("@/components/Cover3D"), { ssr: false, loading: () => <div className="flex h-full items-center justify-center font-mono text-xs text-ink-3">LOADING 3D…</div> });
const nameOf = (h: string) => COLOURS.find((c) => c.hex.toLowerCase() === h.toLowerCase())?.name ?? h;

/** Home section — the real-time cover on a lit grid. Drag to inspect; it is the cover from the configurator. */
export default function InspectionBay() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const fabric = FABRICS.find((f) => f.id === s.fabricId)!;
  return (
    <section id="bay" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_minmax(0,360px)]">
        <div className="relative h-[420px] overflow-hidden border border-line bg-[#0b0c0e] sm:h-[560px]">
          <Cover3D side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripe} stripeOn={s.stripeOn && fabric.colourChoice} view="three" className="block h-full w-full"
            background="#0b0c0e" rimColor="#ff6a13" grid="#5eead4" lightIntensity={0.9} dragRotate />
          <div className="pointer-events-none absolute left-4 top-4 font-mono text-[12px] leading-relaxed text-accent-2">BAY 01 · LIVE<br /><FpsCounter /></div>
          <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[12px] text-ink-2">◀ DRAG TO ROTATE ▶</div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] tracking-[.2em] text-accent">REAL-TIME 3D · WEBGL</span>
          <h2 className="font-display text-[52px] leading-[.95] sm:text-[64px]">Inspection bay</h2>
          <p className="text-[16px] leading-relaxed text-ink-2">The same cover the configurator builds, lit like a garage at night. Grab it and turn it — every seam follows the pattern.</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[13px]">
            <dt className="text-ink-3">CAR</dt><dd>{`${v.make} ${v.model}`.toUpperCase()}</dd>
            <dt className="text-ink-3">FABRIC</dt><dd>{fabric.name.toUpperCase()} · {fabric.gsm}</dd>
            <dt className="text-ink-3">PANELS</dt><dd>{nameOf(s.centre).toUpperCase()}{s.side !== s.centre ? ` / ${nameOf(s.side).toUpperCase()}` : ""}</dd>
            <dt className="text-ink-3">COVER</dt><dd className="text-accent-2">{gbp(coverBase(s.fabricId, s.shape, s.size))}</dd>
          </dl>
          <ThemedLink href="/configure?step=2" className="w-fit bg-accent px-6 py-3.5 font-display text-[18px] tracking-[.06em] text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent">CHANGE THE COLOURS</ThemedLink>
        </div>
      </div>
    </section>
  );
}
