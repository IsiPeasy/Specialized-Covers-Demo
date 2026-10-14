"use client";
import dynamic from "next/dynamic";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { COLOURS, FABRICS } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { useState } from "react";

const Cover3D = dynamic(() => import("@/components/Cover3D"), { ssr: false, loading: () => <div className="flex h-full items-center justify-center font-mono text-xs text-ink-3">Loading 3D…</div> });

type Zone = "centre" | "side" | "piping" | "stripe";
const nameOf = (h: string) => COLOURS.find((c) => c.hex.toLowerCase() === h.toLowerCase())?.name ?? h;

/** E03 — colour studio on the real-time 3D cover. */
export default function ColourStep() {
  const s = useConfig();
  const [zone, setZone] = useState<Zone>("centre");
  const [view, setView] = useState<"three" | "side" | "top">("three");
  const fabric = FABRICS.find((f) => f.id === s.fabricId)!;
  const zones: [Zone, string][] = [["centre", "Centre panel"], ["side", "Side panels"], ["piping", "Piping"], ["stripe", "Racing stripe"]];
  return (
    <main className="grid min-h-0 grid-cols-[minmax(0,1fr)_400px]">
      <section className="relative min-w-0" style={{ background: "radial-gradient(ellipse at 50% 75%, #E2DAC8 0%, #EAE3D3 55%, #F4F0E8 100%)" }}>
        <div className="absolute left-9 top-6 z-10"><StepTitle n={4} kicker={`Colours · ${fabric.name}`} title="Colour studio" /></div>
        <div role="group" aria-label="View" className="absolute right-9 top-7 z-10 flex border border-green">
          {(["three", "side", "top"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={`cursor-pointer px-3.5 py-2 text-[13px] ${view === v ? "bg-green text-ivory" : "text-green"}`}>{v === "three" ? "3/4" : v === "side" ? "Side" : "Top"}</button>
          ))}
        </div>
        <Cover3D side={s.side} centre={s.centre} piping={s.piping} stripe={s.stripe} stripeOn={s.stripeOn && fabric.colourChoice} view={view} className="block h-full w-full" />
        <div className="absolute bottom-5 left-9 font-mono text-[11px] text-ink-2">WebGL · three.js · colours on screen are a guide, swatches posted free</div>
      </section>

      <PriceAside next={3} nextLabel="CONTINUE — PERSONALISE">
        {fabric.colourChoice ? (
          <>
            <div role="tablist" aria-label="Cover zone" className="grid grid-cols-2 gap-2">
              {zones.filter(([z]) => z !== "stripe" || s.stripeOn).map(([z, label]) => (
                <button key={z} type="button" role="tab" aria-selected={zone === z} onClick={() => setZone(z)} className="flex cursor-pointer items-center gap-2.5 bg-ivory-2 px-3 py-2.5 text-left text-[13px]" style={{ border: zone === z ? "2px solid var(--color-green)" : "2px solid var(--color-sand-2)" }}>
                  <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: s[z], boxShadow: "inset 0 0 0 1px rgba(0,0,0,.2)" }} />
                  <span className="flex min-w-0 flex-col"><strong>{label}</strong><span className="text-[11px] text-ink-3">{nameOf(s[z])}</span></span>
                </button>
              ))}
            </div>
            <div aria-label="15 colours" className="grid grid-cols-5 gap-2.5">
              {COLOURS.map((c) => { const on = s[zone].toLowerCase() === c.hex.toLowerCase(); return (
                <button key={c.hex} type="button" onClick={() => s.set({ [zone]: c.hex })} aria-label={c.name} aria-pressed={on} title={c.name} className="aspect-square min-h-11 cursor-pointer rounded-full border-0" style={{ background: c.hex, boxShadow: on ? "0 0 0 3px var(--color-sand), 0 0 0 5px var(--color-green)" : "inset 0 0 0 1px rgba(0,0,0,.18)" }} />
              ); })}
            </div>
            <button type="button" onClick={() => { s.set({ stripeOn: !s.stripeOn }); if (zone === "stripe") setZone("centre"); }} aria-pressed={s.stripeOn} className="flex cursor-pointer justify-between border border-line-2 bg-ivory-2 px-3.5 py-2.5 text-sm"><span>Racing stripe</span><strong>{s.stripeOn ? "On · +£45" : "Off"}</strong></button>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-ink-2">{fabric.name} comes in {fabric.colours.toLowerCase()}. Choose Prestige Plus for the 15-colour palette, piping and racing stripe.</p>
        )}
      </PriceAside>
    </main>
  );
}
