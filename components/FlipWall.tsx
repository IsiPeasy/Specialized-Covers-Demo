import Link from "next/link";
import { SHAPES } from "@/lib/data";

/** D08 — 40 tiles flipping in a wave to reveal archive silhouettes. */
export default function FlipWall() {
  const tiles = Array.from({ length: 40 }, (_, i) => ({
    path: SHAPES[i % SHAPES.length].path,
    back: i % 7 === 1 ? "#B3302A" : i % 5 === 4 ? "#1D3A8A" : "#16203A",
    delay: ((i % 10) * 0.1 + Math.floor(i / 10) * 0.15).toFixed(2),
  }));
  return (
    <section id="archive" className="mx-auto grid max-w-[1320px] items-center gap-12 px-8 py-20 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <span className="eyebrow">The archive</span>
        <h2 className="font-display text-[96px] leading-[.9] font-semibold">30,000<br /><span className="text-[40px] font-medium">car patterns, and counting.</span></h2>
        <p className="max-w-[400px] text-[15px] leading-relaxed text-ink-2">Collected since the early eighties from collectors, race teams and marques. Yours is probably in here. If not, we'll pattern it.</p>
        <Link href="/configure" className="btn-primary w-fit">SEARCH THE ARCHIVE</Link>
      </div>
      <div className="perspective">
        <div className="preserve grid grid-cols-10 gap-1.5" style={{ transform: "rotateX(16deg) rotateY(-14deg)" }}>
          {tiles.map((t, i) => (
            <div key={i} className="preserve relative aspect-square" style={{ animation: `flip 6s ease-in-out ${t.delay}s infinite` }}>
              <div className="backface-hidden absolute inset-0 rounded-sm border border-line bg-ivory-2" />
              <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-sm" style={{ background: t.back, transform: "rotateY(180deg)" }}>
                <svg viewBox="0 0 200 80" className="w-[80%]"><path d={t.path} fill="#EDEBE4" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
