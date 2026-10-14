"use client";
import { useState } from "react";
import { PriceAside, StepTitle } from "@/components/ConfigShell";
import { CAR, EMBLEMS, OPTIONS, PLACEMENTS, THREADS } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import { useConfig } from "@/lib/store";

/** E04 — embroidery and emblem on a mouse-tilted cover. */
export default function MonogramStep() {
  const s = useConfig();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const p = PLACEMENTS.find((q) => q.id === s.placement)!;
  const text = s.text.toUpperCase().slice(0, 12);
  const initials = text.split(/[^A-Z]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 3) || "SC";
  return (
    <main className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_420px]">
      <section className="perspective relative flex min-h-[460px] min-w-0 items-center justify-center overflow-hidden bg-sand px-4 pt-32 pb-16 lg:p-0"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 }); }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
        <div className="absolute left-4 top-6 z-10 sm:left-9"><StepTitle n={5} kicker="Personalise" title="Your name, stitched in." sub="Move the mouse to look around the cover." /></div>
        <div className="preserve relative w-[min(880px,100%)] transition-transform duration-200 ease-out" style={{ transform: `rotateY(${tilt.x * 18}deg) rotateX(${-tilt.y * 10}deg)` }}>
          <svg viewBox="0 0 800 300" className="w-full" role="img" aria-label="Your cover with embroidery">
            <ellipse cx="400" cy="262" rx="370" ry="12" fill="rgba(0,0,0,.14)" />
            <circle cx="190" cy="225" r="38" fill="#1a1a17" /><circle cx="610" cy="225" r="38" fill="#1a1a17" />
            <g transform="translate(0,20)">
              <path d={CAR.body} fill={s.side} /><path d={CAR.centre} fill={s.centre} />
              {s.stripeOn && <path d={CAR.stripe} fill={s.stripe} />}
              <path d={CAR.piping} fill="none" stroke={s.piping} strokeWidth="3.5" />
              {!s.cameraMirrors && <ellipse cx="585" cy="132" rx="14" ry="8" fill={s.side} />}
            </g>
            {text && (
              <g>
                <text x={p.x} y={p.y} textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600" fontSize={p.size} letterSpacing="3" fill={s.thread}>{text}</text>
                <text x={p.x} y={p.y} textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600" fontSize={p.size} letterSpacing="3" fill="none" stroke="rgba(0,0,0,.45)" strokeWidth=".8" strokeDasharray="2 2" style={{ animation: "stitch 1.2s linear infinite" }}>{text}</text>
              </g>
            )}
            {s.emblem !== "none" && (
              <g transform={`translate(${s.placement === "bonnet" ? 400 : 640},215)`}>
                <circle r="22" fill="none" stroke={s.thread} strokeWidth="2" strokeDasharray="3 2" />
                <text y="6" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600" fontSize="20" fill={s.thread}>{s.emblem === "sc" ? "SC" : initials}</text>
              </g>
            )}
          </svg>
          <div className="absolute top-1 border border-line-2 bg-ivory px-2 py-1 font-mono text-[11px] text-ink-2" style={{ left: s.placement === "bonnet" ? "72%" : s.placement === "door" ? "42%" : "10%", transform: "translateZ(60px)" }}>{p.label.toUpperCase()} · {p.mm}</div>
        </div>
        <div className="absolute bottom-5 left-4 right-4 font-mono text-[11px] text-ink-2 sm:left-9">Embroidery is stitched before the panels are sewn together — placement is exact to the pattern.</div>
      </section>

      <PriceAside next={4} nextLabel="CONTINUE — QUOTE">
        <label className="flex flex-col gap-1.5 text-[13px] text-ink-3">Embroidered text, up to 12 characters · +{gbp(OPTIONS.text)}
          <input value={s.text} onChange={(e) => s.set({ text: e.target.value.slice(0, 12) })} maxLength={12} className="min-w-0 border border-line-2 bg-ivory-2 px-3 py-2.5 font-display text-[22px] text-ink" />
        </label>
        <div role="group" aria-label="Placement" className="grid grid-cols-3 gap-2">
          {PLACEMENTS.map((q) => (<button key={q.id} type="button" onClick={() => s.set({ placement: q.id })} aria-pressed={s.placement === q.id} className="cursor-pointer bg-ivory-2 px-2 py-2.5 text-[13px] text-ink" style={{ border: s.placement === q.id ? "2px solid var(--color-accent)" : "2px solid var(--color-surface-3)" }}>{q.label}</button>))}
        </div>
        <div className="flex flex-col gap-1.5"><span className="text-[13px] text-ink-3">Thread</span>
          <div className="flex flex-wrap gap-2" aria-label="Thread colours">{THREADS.map((t) => (<button key={t.hex} type="button" onClick={() => s.set({ thread: t.hex })} aria-label={t.name} aria-pressed={s.thread === t.hex} className="h-11 w-11 cursor-pointer rounded-swatch border-0" style={{ background: t.hex, boxShadow: s.thread === t.hex ? "0 0 0 3px var(--color-surface-2), 0 0 0 5px var(--color-accent)" : "inset 0 0 0 1px rgba(127,127,127,.4)" }} />))}</div>
        </div>
        <div className="flex flex-col gap-2"><span className="text-[13px] text-ink-3">Emblem</span>
          {EMBLEMS.map((e) => (<button key={e.id} type="button" onClick={() => s.set({ emblem: e.id })} aria-pressed={s.emblem === e.id} className="flex cursor-pointer justify-between bg-ivory-2 px-3 py-2.5 text-left text-sm text-ink" style={{ border: s.emblem === e.id ? "2px solid var(--color-accent)" : "2px solid var(--color-surface-3)" }}><span>{e.label}</span><span className="font-mono text-xs">{OPTIONS.emblem[e.id] ? "+" + gbp(OPTIONS.emblem[e.id]) : "Included"}</span></button>))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm"><span>Camera wing mirrors — no pockets</span><input type="checkbox" checked={s.cameraMirrors} onChange={(e) => s.set({ cameraMirrors: e.target.checked })} className="h-5 w-5 accent-[var(--color-accent)]" /></label>
      </PriceAside>
    </main>
  );
}
