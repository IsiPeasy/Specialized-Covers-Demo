"use client";
import { COLOURS, FABRICS, OPTIONS, SHAPES, SPEEDS, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";
import { gbp } from "@/lib/pricing";

/** Placeholder quote number — in production it comes from the quotes table. */
export const QUOTE_NO = "SCQ-26-10-0418";
export const nameOf = (h: string) => COLOURS.find((c) => c.hex.toLowerCase() === h.toLowerCase())?.name ?? h;

/** Everything a quote variant shows about the configured cover, in one place. */
export function useQuoteFacts() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  const fabric = FABRICS.find((f) => f.id === s.fabricId)!;
  const shape = SHAPES.find((x) => x.id === s.shape)!;
  const speed = SPEEDS.find((x) => x.id === s.speed)!;
  const colours = `${nameOf(s.centre)}${s.centre !== s.side ? ` / ${nameOf(s.side)}` : ""} · ${nameOf(s.piping)} piping`;
  return { s, v, fabric, shape, speed, colours };
}

/** Delivery speed, extras, PDF / email / buy — shared by every quote variant. */
export function QuoteControls({ compact = false }: { compact?: boolean }) {
  const s = useConfig();
  const box = (on: boolean) => ({ border: on ? "2px solid var(--color-accent)" : "2px solid var(--color-surface-3)" });
  return (
    <div className={`flex flex-col ${compact ? "gap-2" : "gap-2.5"}`}>
      <div role="radiogroup" aria-label="Production speed" className="flex flex-col gap-1.5">
        {SPEEDS.map((sp) => (
          <button key={sp.id} type="button" role="radio" aria-checked={s.speed === sp.id} onClick={() => s.set({ speed: sp.id })} className="flex cursor-pointer justify-between gap-2 bg-ivory px-2.5 py-2 text-left text-[13px] text-ink" style={box(s.speed === sp.id)}>
            <span><strong className="block">{sp.label}</strong><span className="text-[11px] text-ink-3">{sp.when}</span></span>
            <span className="font-mono">{OPTIONS.speed[sp.id] ? "+" + gbp(OPTIONS.speed[sp.id]) : "Included"}</span>
          </button>
        ))}
      </div>
      <label className="flex items-center justify-between gap-3 text-[13px]"><span>Upgraded storage bag · +{gbp(OPTIONS.bag)}</span><input type="checkbox" checked={s.bag} onChange={(e) => s.set({ bag: e.target.checked })} className="h-5 w-5 accent-[var(--color-accent)]" /></label>
      <label className="flex items-center justify-between gap-3 text-[13px]"><span>Extended guarantee · +{gbp(OPTIONS.guarantee)}</span><input type="checkbox" checked={s.guarantee} onChange={(e) => s.set({ guarantee: e.target.checked })} className="h-5 w-5 accent-[var(--color-accent)]" /></label>
      <div className="text-xs text-ink-3">Valid 30 days · UK delivery [RATE]</div>
    </div>
  );
}

export function QuoteActions() {
  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={() => window.print()} className="btn-primary cursor-pointer text-[13px]">DOWNLOAD PDF</button>
      <div className="flex text-xs">
        <label htmlFor="quote-email" className="sr-only">Email address</label>
        <input id="quote-email" type="email" placeholder="you@example.com" className="min-w-0 flex-grow border border-line-2 bg-surface px-2.5 py-2.5 text-[13px] text-ink" />
        <button type="button" className="cursor-pointer bg-ink px-3 font-bold text-bg">Email</button>
      </div>
      <button type="button" disabled className="border-2 border-dashed border-ink-3 px-2 py-2.5 text-xs font-bold text-ink-3">BUY NOW · PHASE 2</button>
    </div>
  );
}
