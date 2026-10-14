import Link from "next/link";
import { ThemedLink } from "@/components/theme/ThemeProvider";

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-ivory" : "text-ink";
  return (
    <header className={`flex flex-wrap items-center justify-between gap-x-5 gap-y-3 px-4 py-5 sm:px-8 sm:py-6 ${c}`}>
      <Link href="/" title="All styles" className={`font-display -mr-[.45em] text-[20px] font-medium tracking-[.45em] no-underline sm:text-[22px] ${c}`}>COVERCAR</Link>
      <nav aria-label="Main" className="order-3 flex w-full flex-wrap gap-x-7 gap-y-2 text-[15px] lg:order-none lg:w-auto">
        <ThemedLink href="/" className={`no-underline ${c}`}>Car</ThemedLink>
        <ThemedLink href="/shapes" className={`no-underline ${c}`}>Shapes</ThemedLink>
        <ThemedLink href="/#range" className={`no-underline ${c}`}>Range</ThemedLink>
        <ThemedLink href="/#archive" className={`no-underline ${c}`}>Archive</ThemedLink>
        <ThemedLink href="/admin" className={`no-underline ${c}`}>Pricing</ThemedLink>
      </nav>
      <ThemedLink href="/configure" className="btn-primary">CONFIGURE YOUR COVER</ThemedLink>
    </header>
  );
}
