import PaddockHeader from "./PaddockHeader";
import InspectionBay from "./InspectionBay";
import Coverflow from "@/components/Coverflow";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import { FABRICS, OPTIONS, SPEEDS } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import type { HomeSlots } from "@/lib/themes";

/** T2 — Paddock homepage: Night Scan, numbered spec cards, exploded layers, 3D inspection bay, shapes, teams, orange band. */
export default function PaddockHome({ hero, section }: HomeSlots) {
  const indoor = FABRICS.find((f) => f.id === "prestige-plus")!;
  const outdoor = FABRICS.find((f) => f.id === "stormtex-plus")!;
  const ft5 = SPEEDS.find((s) => s.id === "ft5")!;
  const cards = [
    { n: "01 / GARAGE SPEC", title: indoor.line, body: `${indoor.name}, ${indoor.gsm}. ${indoor.inner}, ${indoor.colours.toLowerCase()}. From ${gbp(indoor.base)}.` },
    { n: "02 / OUTDOOR SPEC", title: outdoor.line, body: `${outdoor.name}, ${outdoor.gsm}. ${outdoor.waterproof}. From ${gbp(outdoor.base)}.` },
    { n: "03 / FAST TRACK", title: `Dispatched in ${ft5.when}`, body: `Need it before race weekend? Choose ${ft5.label.toLowerCase()} when you configure, +${gbp(OPTIONS.speed.ft5)}.` },
  ];
  return (
    <>
      <PaddockHeader />
      {hero}

      <section className="mx-auto grid max-w-[1320px] gap-[2px] px-4 py-16 sm:px-8 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.n} className="flex flex-col gap-3 bg-surface p-8">
            <span className="font-mono text-[14px] tracking-[.14em] text-accent">{c.n}</span>
            <span className="font-display text-[34px] leading-none">{c.title}</span>
            <span className="text-[16px] leading-relaxed text-ink-2">{c.body}</span>
          </div>
        ))}
      </section>

      {section}
      <InspectionBay />

      <section className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[48px] leading-none sm:text-[64px]">Five shapes. 5,000 cars.</h2>
          <span className="font-mono text-[13px] text-accent-2">PRICE = LINE BASE × SHAPE × SIZE + OPTIONS</span>
        </div>
        <Coverflow />
      </section>

      <section className="mx-auto flex max-w-[1320px] flex-col gap-6 border-t border-line px-4 py-14 sm:px-8">
        <span className="font-mono text-[14px] tracking-[.2em] text-ink-3">TRUSTED IN THE PIT LANE BY</span>
        <ul className="flex flex-wrap gap-x-12 gap-y-3 font-display text-[30px] sm:text-[34px]">
          {["Williams", "McLaren", "Mercedes-AMG Petronas", "United Autosports", "Extreme E"].map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <section className="bg-accent text-on-accent">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-8">
          <p className="font-display text-[40px] leading-[.95] sm:text-[56px]">Your car. Your spec.<br />Live price, every click.</p>
          <ThemedLink href="/configure" className="bg-bg px-8 py-4 font-display text-[22px] tracking-[.06em] text-ink no-underline hover:bg-surface hover:text-ink">START CONFIGURATOR</ThemedLink>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-4 px-4 py-8 pb-24 text-[14px] text-ink-3 sm:px-8">
        <span>Made in Shipley, West Yorkshire · Since 1981</span>
        <span className="font-mono">01943 864646</span>
      </footer>
    </>
  );
}
