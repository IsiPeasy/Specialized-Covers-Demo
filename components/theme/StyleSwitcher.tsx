"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { STYLE_IDS, THEMES, swapStyle } from "@/lib/themes";
import { useConfig } from "@/lib/store";
import { useStyle } from "./ThemeProvider";

/** Fixed pill, bottom right: same route, other skin. Client-side navigation keeps the configurator state. */
export default function StyleSwitcher() {
  const current = useStyle();
  const pathname = usePathname();
  const step = useConfig((s) => s.step);
  const [open, setOpen] = useState(false);
  const query = pathname.includes("/configure") ? `?step=${step}` : "";

  return (
    <nav aria-label="Style" className="no-print fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-[#ffffff33] bg-[#141414e6] p-1 font-[Karla,system-ui,sans-serif] text-[13px] text-[#f4f4f2] shadow-lg backdrop-blur">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="style-list" className="cursor-pointer rounded-full px-3 py-2 sm:hidden">
        Style · {THEMES[current].name}
      </button>
      <ul id="style-list" className={`${open ? "flex" : "hidden"} absolute bottom-full right-0 mb-2 flex-col gap-1 rounded-2xl bg-[#141414] p-1 sm:static sm:mb-0 sm:flex sm:flex-row sm:bg-transparent sm:p-0`}>
        {STYLE_IDS.map((id) => {
          const t = THEMES[id], on = id === current;
          return (
            <li key={id}>
              <Link href={swapStyle(pathname, id) + query} aria-current={on ? "page" : undefined} onClick={() => setOpen(false)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 no-underline transition-colors ${on ? "bg-[#f4f4f2] text-[#141414]" : "text-[#f4f4f2] hover:bg-[#ffffff1f] hover:text-[#f4f4f2]"}`}>
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: t.tokens.colors.accent, boxShadow: `0 0 0 2px ${t.tokens.colors.bg}` }} />
                {t.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/" className="rounded-full px-3 py-2 text-[#c8c8c4] no-underline hover:text-[#f4f4f2]" aria-label="All styles">All</Link>
    </nav>
  );
}
