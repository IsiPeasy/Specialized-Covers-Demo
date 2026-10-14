import { THEMES, type StyleId } from "@/lib/themes";

export default async function StyleHome({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const { Home, Hero, Section } = THEMES[style as StyleId].components;
  return <Home hero={<Hero />} section={<Section />} />;
}
