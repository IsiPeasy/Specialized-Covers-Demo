import Link from "next/link";
import { ThemedLink } from "@/components/theme/ThemeProvider";

const nav = "font-display text-[18px] tracking-[.06em] text-ink no-underline hover:text-accent";

/** T2 header: condensed wordmark with the orange slash, upper-case nav, orange CTA. */
export default function PaddockHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-8">
        <Link href="/" title="All styles" className="font-display text-[26px] tracking-[.08em] text-ink no-underline hover:text-ink">SPECIALISED<span className="text-accent">/</span>COVERS</Link>
        <nav aria-label="Main" className="order-3 flex w-full flex-wrap gap-x-7 gap-y-2 lg:order-none lg:w-auto">
          <ThemedLink href="/#scan" className={nav}>Car</ThemedLink>
          <ThemedLink href="/#bay" className={nav}>3D bay</ThemedLink>
          <ThemedLink href="/shapes" className={nav}>Shapes</ThemedLink>
          <ThemedLink href="/admin" className={nav}>Pricing</ThemedLink>
        </nav>
        <ThemedLink href="/configure" className="bg-accent px-5 py-3 font-display text-[18px] tracking-[.06em] text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent">BUILD YOUR COVER</ThemedLink>
      </div>
    </header>
  );
}
