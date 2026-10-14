import { THEMES, type StyleId } from "@/lib/themes";
import ShapesExplainer from "@/components/ShapesExplainer";

export default async function Shapes({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const { Header } = THEMES[style as StyleId].components;
  return (
    <>
      <Header />
      <ShapesExplainer />
    </>
  );
}
