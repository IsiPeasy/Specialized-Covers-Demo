"use client";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { useSpin } from "@/components/theme/useSpin";
import { CAR } from "@/lib/data";

/** 15 panels from −84 to +84 px: the theme's model colour at the centre, darker towards the outer faces. */
const SLICES = Array.from({ length: 15 }, (_, k) => {
  const d = Math.abs(k - 7);
  return { z: (k - 7) * 12, fill: `color-mix(in srgb, var(--color-model) ${100 - d * 8}%, #000)`, wheels: d === 6, piping: d === 0 || d === 7 };
});

/** D01 — the cover extruded in CSS 3D on a dashed disc. Turns by itself; drag to turn it by hand. No WebGL. */
export default function Turntable() {
  const { el, surface } = useSpin<HTMLDivElement>((yaw, pitch) => `rotateX(${pitch}deg) rotateY(${yaw}deg)`, { speed: 20, pitch0: -14 });
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1360px] items-center gap-6 px-4 py-20 sm:px-10 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="relative z-10 flex flex-col gap-5">
          <span className="eyebrow">360° · Indoor Plus · silver</span>
          <h2 className="font-display text-[44px] leading-none sm:text-[60px]">Turn it. Every angle fits.</h2>
          <p className="text-[15px] leading-relaxed text-ink-2">Cut from your car's own pattern, so the cover follows the body from any side — no slack, no flap. Drag the car to turn it.</p>
          <ThemedLink href="/configure" className="btn-primary w-fit tracking-[.24em]">CONFIGURE MINE</ThemedLink>
        </div>
        <div ref={surface} className="relative mx-auto aspect-[760/520] w-full max-w-[760px] select-none" style={{ perspective: "1600px" }}>
          <div aria-hidden="true" className="absolute left-1/2 top-[58%] aspect-square w-full -translate-x-1/2 -translate-y-1/2">
            <div className="h-full w-full rounded-full border border-dashed border-accent-2" style={{ background: "radial-gradient(circle, rgba(143,145,147,.18) 0%, rgba(143,145,147,.05) 45%, transparent 70%)", animation: "sr-disc 18s linear infinite", transform: "rotateX(76deg)" }} />
          </div>
          <div ref={el} className="preserve absolute inset-0" style={{ transform: "rotateX(-14deg) rotateY(-30deg)" }}>
            {SLICES.map((s, k) => (
              <svg key={k} viewBox="0 0 800 300" className="absolute inset-0 h-full w-full" style={{ transform: `translateZ(${s.z}px)` }} {...(k === 7 ? { role: "img", "aria-label": "Tailored cover on a turntable — drag to turn" } : { "aria-hidden": true })}>
                <path d={CAR.body} style={{ fill: s.fill }} />
                {s.wheels && <><circle cx="190" cy="205" r="38" fill="#050505" /><circle cx="610" cy="205" r="38" fill="#050505" /></>}
                {s.piping && <path d={CAR.piping} fill="none" style={{ stroke: "var(--color-model-trim)" }} strokeWidth="3" />}
              </svg>
            ))}
          </div>
          <span className="absolute bottom-0 right-0 text-[11px] tracking-[.24em] text-ink-3">DRAG TO TURN</span>
        </div>
      </div>
    </section>
  );
}
