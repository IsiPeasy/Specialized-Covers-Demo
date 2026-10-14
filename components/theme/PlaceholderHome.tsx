import SiteHeader from "@/components/SiteHeader";
import type { HomeSlots } from "@/lib/themes";

/** Phase-1 stand-in home: header, hero slot, section slot. */
export default function PlaceholderHome({ hero, section }: HomeSlots) {
  return (
    <>
      <SiteHeader />
      {hero}
      {section}
      <footer className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-6 px-4 py-10 pb-24 text-sm text-ink-3 sm:px-8">
        <span className="font-display font-semibold tracking-[.2em] text-ink">SPECIALISED COVERS</span>
        <span>Shipley, West Yorkshire · since 1981</span>
      </footer>
    </>
  );
}
