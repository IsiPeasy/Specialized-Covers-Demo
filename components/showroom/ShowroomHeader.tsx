import Link from "next/link";
import { ThemedLink } from "@/components/theme/ThemeProvider";

const link = "text-[12px] tracking-[.24em] text-ink no-underline hover:text-ink-2";

/** T4 header: quiet nav left, spaced wordmark centred, configure right. */
export default function ShowroomHeader() {
  return (
    <header className="mx-auto grid max-w-[1360px] grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 px-4 py-6 sm:px-10 lg:grid-cols-[1fr_auto_1fr]">
      <nav aria-label="Main" className="order-3 col-span-2 flex flex-wrap gap-x-7 gap-y-2 lg:order-none lg:col-span-1">
        <ThemedLink href="/#range" className={link}>COVERS</ThemedLink>
        <ThemedLink href="/shapes" className={link}>SHAPES</ThemedLink>
        <ThemedLink href="/admin" className={link}>PRICING</ThemedLink>
      </nav>
      <Link href="/" title="All styles" className="font-display -mr-[.6em] text-[17px] tracking-[.6em] text-ink no-underline hover:text-ink sm:text-[22px]">COVERCAR</Link>
      <div className="flex justify-end"><ThemedLink href="/configure" className={`${link} border-b border-ink pb-0.5`}>CONFIGURE</ThemedLink></div>
    </header>
  );
}
