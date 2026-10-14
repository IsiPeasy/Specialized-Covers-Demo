import ShowroomHeader from "./ShowroomHeader";
import CubeSection from "./CubeSection";
import { ThemedLink } from "@/components/theme/ThemeProvider";
import CarSvg from "@/components/CarSvg";
import { COLOURS, FABRICS } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import type { HomeSlots } from "@/lib/themes";

const from = (use: "Indoor" | "Outdoor") => gbp(Math.min(...FABRICS.filter((f) => f.use === use).map((f) => f.base)));

/** T4 — Showroom homepage, dark: header, Unveil, the range in three plates, Turntable (drag), fabric cube, colours. */
export default function ShowroomHome({ hero, section }: HomeSlots) {
  const plus = FABRICS.find((f) => f.colourChoice)!;
  const cards = [
    { title: "Indoor", line: `Fleece-lined, stretch-fit. From ${from("Indoor")}.`, side: "#2A2A28", photo: "[PHOTO — GARAGE, INDOOR COVER]" },
    { title: "Outdoor", line: `Waterproof and breathable. From ${from("Outdoor")}.`, side: "#4A4D52", photo: "[PHOTO — DRIVEWAY, RAIN]" },
    { title: "In your colours", line: `${plus.name}, ${plus.colours}. From ${gbp(plus.base)}.`, side: "#B9BBBD", photo: "[PHOTO — SHOWROOM]" },
  ];
  return (
    <>
      <ShowroomHeader />
      {hero}

      <section id="range" className="mx-auto max-w-[1360px] px-4 py-24 sm:px-10">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">The range</span>
          <h2 className="font-display text-[40px] leading-none sm:text-[56px]">Its shape. Your colours. Nothing else.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <ThemedLink key={c.title} href="/configure?step=1" className="group flex flex-col gap-4 text-ink no-underline hover:text-ink">
              <div className="t-theme relative flex aspect-[4/5] flex-col justify-between bg-surface p-6 transition-colors group-hover:bg-surface-3">
                <span className="text-[11px] tracking-[.2em] text-ink-3">{c.photo}</span>
                <CarSvg side={c.side} piping="#F4F4F2" shadow={false} className="w-full" label={`${c.title} cover`} />
              </div>
              <span className="font-display text-[26px]">{c.title}</span>
              <span className="text-[15px] text-ink-2">{c.line}</span>
            </ThemedLink>
          ))}
        </div>
      </section>

      {section}

      <CubeSection />

      <section className="mx-auto flex border-t border-line max-w-[1360px] flex-col items-center gap-8 px-4 py-24 text-center sm:px-10">
        <span className="eyebrow">{plus.name} · {COLOURS.length} colours · piping · racing stripe</span>
        <ul aria-label={`${COLOURS.length} colours`} className="flex max-w-[640px] flex-wrap justify-center gap-3">
          {COLOURS.map((c) => <li key={c.hex} title={c.name} className="h-7 w-7 rounded-full" style={{ background: c.hex }}><span className="sr-only">{c.name}</span></li>)}
        </ul>
        <ThemedLink href="/configure?step=2" className="btn-primary tracking-[.28em]">BEGIN CONFIGURATION</ThemedLink>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-4 px-4 py-8 pb-24 text-[12px] tracking-[.16em] text-ink-3 sm:px-10">
          <span>TAILORED IN SHIPLEY, WEST YORKSHIRE · SINCE 1981</span>
          <span>CONTACT · DELIVERY · CARE</span>
        </div>
      </footer>
    </>
  );
}
