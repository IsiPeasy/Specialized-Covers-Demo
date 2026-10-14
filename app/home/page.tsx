import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import TailorHero from "@/components/TailorHero";
import FlipWall from "@/components/FlipWall";
import { FABRICS } from "@/lib/data";
import { gbp } from "@/lib/pricing";

export default function Home() {
  const range = FABRICS.filter((f) => ["prestige", "prestige-plus", "prestige-recycled", "stormtex-plus"].includes(f.id));
  return (
    <>
      <div className="bg-green text-[13px] tracking-wider text-[#EDE6D6]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-4 px-8 py-2.5">
          <span>Tailored in Shipley, West Yorkshire — since 1981</span>
          <span>01943 864646 · 4-week production · Free storage bag with every cover</span>
        </div>
      </div>
      <SiteHeader />
      <TailorHero />

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-8 py-10 sm:grid-cols-3">
          {[["1981", "Founded by Carole & Douglas Long. Still family run."], ["30,000+", "Car patterns in our archive, from daily drivers to one-offs."], ["Made in Britain", "Designed, cut and sewn under one roof in Shipley."]].map(([n, t]) => (
            <div key={n}><div className="font-display text-[44px] font-medium">{n}</div><div className="text-[15px] text-ink-2">{t}</div></div>
          ))}
        </div>
      </section>

      <section id="range" className="mx-auto max-w-[1280px] px-8 py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[48px] font-medium">The car cover range</h2>
          <Link href="/configure?step=1" className="text-[15px]">Compare every fabric</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {range.map((f) => (
            <Link key={f.id} href={`/configure?step=1`} className="flex flex-col gap-3.5 border border-line bg-ivory-2 p-6 text-ink no-underline hover:border-green">
              <div className="h-[120px]" style={{ background: f.hex }} />
              <span className="eyebrow">{f.use}{f.colourChoice ? " · 15 colours" : ""}</span>
              <span className="font-display text-[28px] font-semibold">{f.line}</span>
              <span className="text-sm text-ink-2">{f.bestFor}</span>
              <span className="text-[15px]">From <strong>{gbp(f.base)}</strong></span>
            </Link>
          ))}
        </div>
      </section>

      <FlipWall />

      <section className="bg-green text-[#EDE6D6]">
        <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-8 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="eyebrow" style={{ color: "#C9A35A" }}>The pattern room</span>
            <h2 className="font-display text-[52px] leading-[1.05] font-medium">Measured like Savile Row. Built for the garage.</h2>
            <p className="text-[17px] leading-relaxed text-[#D6CDB8]">We pattern cars the way a tailor measures a client — and where we can't reach the car, we work from 3D models and CAD.</p>
          </div>
          <ol className="grid grid-cols-3 gap-5">
            {[["01", "Pattern", "From our archive, or taken from your car."], ["02", "Cut", "Wide fabric rolls, fewer seams."], ["03", "Sewn", "By hand, in Shipley, in about four weeks."]].map(([n, t, d]) => (
              <li key={n} className="flex flex-col gap-2 border-t border-brass pt-4"><span className="font-mono text-[13px] text-brass">{n}</span><span className="font-display text-[26px]">{t}</span><span className="text-sm text-[#D6CDB8]">{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-6 px-8 py-10 text-sm text-ink-3">
        <span className="font-display font-semibold tracking-[.2em] text-ink">SPECIALISED COVERS</span>
        <span>Knowledge Centre · Delivery &amp; Returns · Contact</span>
      </footer>
    </>
  );
}
