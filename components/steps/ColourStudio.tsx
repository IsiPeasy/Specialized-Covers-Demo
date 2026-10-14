"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import type { Cover3DProps } from "@/components/Cover3D";
import { COLOURS, FABRICS, OPTIONS } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { gbp } from "@/lib/pricing";

const Cover3D = dynamic(() => import("@/components/Cover3D"), { ssr: false, loading: () => <div className="flex h-full items-center justify-center font-mono text-xs text-ink-3">Loading 3D…</div> });

export type View = "three" | "side" | "top";
type Zone = "centre" | "side" | "piping" | "stripe";
type SceneProps = Pick<Cover3DProps, "background" | "lightIntensity" | "keyColor" | "rimColor" | "autoRotate" | "wireframe" | "grid">;
const nameOf = (h: string) => COLOURS.find((c) => c.hex.toLowerCase() === h.toLowerCase())?.name ?? h;

export interface ColourStudioProps {
  scene?: SceneProps;
  defaultView?: View;
  /** Stage background (CSS) behind the canvas */
  stage?: string;
  /** Extra layer over the stage — HUD, dimension lines… gets the current view */
  overlay?: (view: View) => React.ReactNode;
  footnote?: string;
}

/** E03 — colour studio on the real-time 3D cover. Each theme passes its scene, stage and overlay. */
export default function ColourStudio({ scene, defaultView = "three", stage = "radial-gradient(ellipse at 50% 75%, var(--color-surface-3) 0%, var(--color-surface-2) 55%, var(--color-bg) 100%)", overlay, footnote = "WebGL · three.js · colours on screen are a guide, swatches posted free" }: ColourStudioProps) {
  const s = useConfig();
  const [zone, setZone] = useState<Zone>("centre");
  const [view, setView] = useState<View>(defaultView);
  const fabric = FABRICS.find((f) => f.id === s.fabricId)!;
  const zones: [Zone, string][] = [["centre", "Centre panel"], ["side", "Side panels"], ["piping", "Piping"], ["stripe", "Racing stripe"]];
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_400px]">
      <section className="relative h-[520px] min-w-0 overflow-hidden lg:h-auto" style={{ background: stage }}>
        <div className="absolute left-4 top-6 z-10 sm:left-9"><StepTitle n={4} kicker={`Colours · ${fabric.name}`} title="Colour studio" /></div>
        <div role="group" aria-label="View" className="absolute right-4 top-28 z-10 flex border border-green sm:right-9 sm:top-7">
          {(["three", "side", "top"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={`cursor-pointer px-3.5 py-2 text-[13px] ${view === v ? "bg-green text-on-accent" : "text-green"}`}>{v === "three" ? "3/4" : v === "side" ? "Side" : "Top"}</button>
          ))}
        </div>
        <Cover3D side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripe} stripeOn={s.stripeOn && fabric.colourChoice} view={view} className="block h-full w-full" {...scene} />
        {overlay?.(view)}
        <div className="absolute bottom-5 left-4 right-4 font-mono text-[11px] text-ink-2 sm:left-9">{footnote}</div>
      </section>

      <PriceAside next={3} nextLabel="CONTINUE — PERSONALISE">
        {fabric.colourChoice ? (
          <>
            <div role="tablist" aria-label="Cover zone" className="grid grid-cols-2 gap-2">
              {zones.filter(([z]) => z !== "stripe" || s.stripeOn).map(([z, label]) => (
                <button key={z} type="button" role="tab" aria-selected={zone === z} onClick={() => setZone(z)} className="flex cursor-pointer items-center gap-2.5 bg-ivory-2 px-3 py-2.5 text-left text-[13px] text-ink" style={{ border: zone === z ? "2px solid var(--color-accent)" : "2px solid var(--color-surface-3)" }}>
                  <span className="h-4 w-4 shrink-0 rounded-swatch" style={{ background: s[z], boxShadow: "inset 0 0 0 1px rgba(127,127,127,.4)" }} />
                  <span className="flex min-w-0 flex-col"><strong>{label}</strong><span className="text-[11px] text-ink-3">{nameOf(s[z])}</span></span>
                </button>
              ))}
            </div>
            <div aria-label="15 colours" className="grid grid-cols-5 gap-2.5">
              {COLOURS.map((c) => { const on = s[zone].toLowerCase() === c.hex.toLowerCase(); return (
                <button key={c.hex} type="button" onClick={() => s.set({ [zone]: c.hex })} aria-label={c.name} aria-pressed={on} title={c.name} className="swatch aspect-square min-h-11 cursor-pointer rounded-swatch border-0" style={{ background: c.hex, boxShadow: on ? "0 0 0 3px var(--color-surface-2), 0 0 0 5px var(--color-accent)" : "var(--swatch-edge, inset 0 0 0 1px rgba(0,0,0,.18))" }} />
              ); })}
            </div>
            <button type="button" onClick={() => { s.set({ stripeOn: !s.stripeOn }); if (zone === "stripe") setZone("centre"); }} aria-pressed={s.stripeOn} className="flex cursor-pointer justify-between border border-line-2 bg-ivory-2 px-3.5 py-2.5 text-sm text-ink"><span>Racing stripe</span><strong>{s.stripeOn ? `On · +${gbp(OPTIONS.stripe)}` : "Off"}</strong></button>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-ink-2">{fabric.name} comes in {fabric.colours.toLowerCase()}. Choose Prestige Plus for the 15-colour palette, piping and racing stripe.</p>
        )}
      </PriceAside>
    </main>
  );
}
