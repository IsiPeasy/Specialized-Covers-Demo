"use client";
import Link from "next/link";
import { useConfig } from "@/lib/store";
import { gbp, quote } from "@/lib/pricing";

export const STEPS = ["Shape", "Fabric", "Colours", "Personalise", "Quote"];

/** Header with step pills + live total, shared by all configurator steps. */
export function ConfigHeader() {
  const s = useConfig();
  const { total } = quote(s);
  return (
    <header className="flex flex-wrap items-center justify-between gap-5 border-b border-line px-8 py-4">
      <Link href="/" className="font-display text-[22px] font-semibold tracking-[.2em] text-ink no-underline">SPECIALISED COVERS</Link>
      <ol aria-label="Steps" className="flex flex-wrap gap-1.5">
        <li className="pill text-green-ok">✓ Vehicle</li>
        {STEPS.map((label, i) => (
          <li key={label}>
            <button type="button" onClick={() => s.setStep(i)} aria-current={s.step === i ? "step" : undefined}
              className={`pill cursor-pointer ${s.step === i ? "bg-green text-ivory" : i < s.step ? "text-green-ok" : "text-ink-3"}`}>
              {i < s.step ? "✓ " : `0${i + 2} `}{label}
            </button>
          </li>
        ))}
      </ol>
      <div className="border border-line bg-ivory-2 px-3.5 py-2 font-mono text-sm">Total <strong>{gbp(total)}</strong></div>
    </header>
  );
}

/** Right-hand price panel with the running breakdown. */
export function PriceAside({ children, next, nextLabel }: { children?: React.ReactNode; next?: number; nextLabel?: string }) {
  const s = useConfig();
  const { items, total } = quote(s);
  return (
    <aside className="flex flex-col gap-3.5 overflow-hidden border-l border-line bg-sand px-7 py-6">
      {children}
      <div className="flex flex-col gap-2 border-t border-line-2 pt-3 text-sm">
        {items.map((it) => (
          <div key={it.label} className="flex justify-between gap-3 border-b border-dashed border-line-2 pb-1.5"><span className="truncate">{it.label}</span><span className="font-mono">{it.included ? "Included" : (it.amount > 0 ? "+" : "") + gbp(it.amount)}</span></div>
        ))}
      </div>
      <div className="flex items-baseline justify-between"><span className="text-[15px]">Total</span><strong key={total} className="font-display text-[44px]" style={{ animation: "bump .4s ease-out" }}>{gbp(total)}</strong></div>
      {next !== undefined && <button type="button" onClick={() => s.setStep(next)} className="btn-primary cursor-pointer">{nextLabel ?? "CONTINUE"}</button>}
    </aside>
  );
}

export function StepTitle({ n, kicker, title, sub }: { n: number; kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow">Step {n} of 6 · {kicker}</span>
      <h1 className="font-display text-[40px] font-medium leading-[1.05]">{title}</h1>
      {sub && <p className="max-w-[620px] text-[15px] text-ink-2">{sub}</p>}
    </div>
  );
}
