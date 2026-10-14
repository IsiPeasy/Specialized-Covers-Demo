import Link from "next/link";

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-ivory" : "text-ink";
  return (
    <header className={`flex flex-wrap items-center justify-between gap-5 px-8 py-6 ${c}`}>
      <Link href="/home" className={`font-display font-semibold text-[22px] tracking-[.2em] no-underline ${c}`}>SPECIALISED COVERS</Link>
      <nav aria-label="Main" className="flex flex-wrap gap-7 text-[15px]">
        <Link href="/home" className={`no-underline ${c}`}>Car</Link>
        <Link href="/shapes" className={`no-underline ${c}`}>Shapes</Link>
        <Link href="/home#range" className={`no-underline ${c}`}>Range</Link>
        <Link href="/home#archive" className={`no-underline ${c}`}>Archive</Link>
        <Link href="/admin" className={`no-underline ${c}`}>Pricing</Link>
      </nav>
      <Link href="/configure" className="btn-primary">CONFIGURE YOUR COVER</Link>
    </header>
  );
}
