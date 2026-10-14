import Link from "next/link";
import { ThemedLink } from "@/components/theme/ThemeProvider";

/** T3 header: boxed mono wordmark, path-style nav, blue CTA. */
export default function PatternHeader() {
  return (
    <header className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-8">
      <Link href="/" title="All styles" className="border-2 border-ink px-3 py-2 font-mono text-[16px] font-semibold tracking-[.06em] text-ink no-underline hover:text-ink sm:text-[18px]">SPECIALISED COVERS <span className="text-accent-2">[SC]</span></Link>
      <nav aria-label="Main" className="order-3 flex w-full flex-wrap gap-x-6 gap-y-2 font-mono text-[14px] lg:order-none lg:w-auto">
        <ThemedLink href="/#archive-query">/archive</ThemedLink>
        <ThemedLink href="/#fabrics">/fabrics</ThemedLink>
        <ThemedLink href="/shapes">/shapes</ThemedLink>
        <ThemedLink href="/admin">/pricing</ThemedLink>
      </nav>
      <ThemedLink href="/configure" className="bg-accent px-4 py-3 font-mono text-[14px] text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent">Find my pattern →</ThemedLink>
    </header>
  );
}
