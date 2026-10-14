import Link from "next/link";
import CarSvg from "@/components/CarSvg";

const CARDS = [
  { href: "/home", code: "01", title: "Atelier homepage", sub: "T1 · hero “Tailor's bench” · archive flip wall", tag: "SITE" },
  { href: "/home#hero", code: "02", title: "The tailor's bench", sub: "Chalk pattern draws itself — the bespoke story in 2 s", tag: "HERO" },
  { href: "/home#archive", code: "03", title: "Pattern flip wall", sub: "30,000 patterns, 40 tiles flipping in 3D", tag: "SECTION" },
  { href: "/shapes", code: "04", title: "Silhouette coverflow", sub: "Five shapes cover 5,000 cars — the pricing model, explained", tag: "DIDACTIC" },
  { href: "/configure?step=0", code: "05", title: "Shape in 3D", sub: "Configurator step 1 · stacked-panel extrusion", tag: "CONFIGURE" },
  { href: "/configure?step=1", code: "06", title: "Fabric swatch book", sub: "Step 2 · a tailor's swatch book, fanned in 3D", tag: "CONFIGURE" },
  { href: "/configure?step=2", code: "07", title: "Colour studio · WebGL", sub: "Step 3 · real-time three.js, four zones, live price", tag: "CONFIGURE" },
  { href: "/configure?step=3", code: "08", title: "Monogram & emblem", sub: "Step 4 · embroidery stitched onto the cover", tag: "CONFIGURE" },
  { href: "/configure?step=4", code: "09", title: "Folding quote", sub: "Step 5 · the quote as a tri-fold brochure", tag: "CONFIGURE" },
  { href: "/admin", code: "10", title: "Pricing back-office", sub: "Formula, shape & size factors, model table", tag: "ADMIN" },
];

export default function Landing() {
  return (
    <main className="mx-auto max-w-[1320px] px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Demo · Specialised Covers · configurator with live pricing</span>
          <h1 className="font-display text-[64px] leading-[1] font-medium">One site, one configurator,<br />one pricing model.</h1>
          <p className="max-w-[560px] text-[17px] text-ink-2">Ten pieces, each answering one question. Open any card full-screen; the configurator steps share state, so you can start anywhere.</p>
        </div>
        <div className="w-[360px]"><CarSvg side="#1F3B2E" centre="#26493A" piping="#C9A35A" /></div>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <li key={c.code}>
            <Link href={c.href} className="group flex h-full flex-col gap-3 border border-line bg-ivory-2 p-6 no-underline text-ink transition hover:-translate-y-0.5 hover:border-green">
              <span className="flex items-center justify-between font-mono text-xs text-brass-2"><span>{c.code}</span><span>{c.tag}</span></span>
              <span className="font-display text-[28px] font-semibold leading-tight">{c.title}</span>
              <span className="text-sm text-ink-2">{c.sub}</span>
              <span className="mt-auto pt-3 text-sm font-bold text-green group-hover:text-brass-2">Open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3">
        <span>Prices marked “from” are the client's public list; factors and options are placeholders.</span>
        <span>Built with Next.js · three.js · CSS 3D</span>
      </footer>
    </main>
  );
}
