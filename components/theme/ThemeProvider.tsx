"use client";
import Link from "next/link";
import { createContext, useContext, useEffect, type ComponentProps } from "react";
import { styleHref, type StyleId } from "@/lib/themes";

const StyleCtx = createContext<StyleId>("atelier");
export const useStyle = () => useContext(StyleCtx);

/** Sets data-theme on <html> (page background, scrollbars) and on its own wrapper for the first paint. */
export default function ThemeProvider({ style, children }: { style: StyleId; children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = style;
    return () => { delete html.dataset.theme; };
  }, [style]);
  return (
    <StyleCtx.Provider value={style}>
      <div data-theme={style} className="min-h-screen">{children}</div>
    </StyleCtx.Provider>
  );
}

/** Link that stays inside the active style: href="/configure?step=1" → /paddock/configure/?step=1. */
export function ThemedLink({ href, ...rest }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const style = useStyle();
  return <Link href={styleHref(style, href)} {...rest} />;
}
