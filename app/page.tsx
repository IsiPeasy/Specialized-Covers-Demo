import Link from "next/link";
import { STYLE_IDS, THEMES } from "@/lib/themes";

/** Four doors, one per style. Each door is rendered in its own tokens via data-theme. */
export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0f0f0f] text-[#f4f4f2]">
      {STYLE_IDS.map((id) => <link key={id} rel="stylesheet" href={THEMES[id].tokens.fonts.href} precedence="fonts" />)}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-4 font-[Karla,system-ui,sans-serif] sm:px-8">
        <p className="text-[15px]"><strong className="tracking-[.16em]">SPECIALISED COVERS</strong> · Same logic, four skins.</p>
        <p className="text-[13px] text-[#b4b4ae]">One configurator, one price model, one set of data. Switch style any time, bottom right.</p>
      </header>
      <ul className="grid flex-grow grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {STYLE_IDS.map((id, i) => {
          const t = THEMES[id];
          const { Preview } = t.components;
          return (
            <li key={id} data-theme={id} className="flex min-h-[86vh] flex-col xl:min-h-[calc(100vh-56px)]">
              <div className="h-[44vh] min-h-[260px] overflow-hidden border-b border-line xl:h-[50vh]"><Preview /></div>
              <div className="flex flex-grow flex-col gap-4 p-6 sm:p-8">
                <span className="eyebrow">Style 0{i + 1} / 04</span>
                <h2 className="font-display text-[44px] font-medium leading-none">{t.name}</h2>
                <p className="font-display text-[20px] leading-snug text-ink-2">{t.tagline}</p>
                <p className="text-[15px] leading-relaxed text-ink-2">{t.audience}</p>
                <Link href={`/${id}/`} className="btn-primary mt-auto w-fit" aria-label={`Enter ${t.name}`}>ENTER →</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
