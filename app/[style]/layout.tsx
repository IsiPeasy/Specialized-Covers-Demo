import { notFound } from "next/navigation";
import ThemeProvider from "@/components/theme/ThemeProvider";
import StyleSwitcher from "@/components/theme/StyleSwitcher";
import { STYLE_IDS, THEMES, isStyleId } from "@/lib/themes";

export const dynamicParams = false;
export function generateStaticParams() {
  return STYLE_IDS.map((style) => ({ style }));
}

export default async function StyleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ style: string }> }) {
  const { style } = await params;
  if (!isStyleId(style)) notFound();
  return (
    <ThemeProvider style={style}>
      {/* React hoists stylesheet links into <head> */}
      <link rel="stylesheet" href={THEMES[style].tokens.fonts.href} precedence="fonts" />
      {children}
      <StyleSwitcher />
    </ThemeProvider>
  );
}
