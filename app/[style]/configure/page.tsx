"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigHeader } from "@/components/ConfigShell";
import ShapeStep from "@/components/steps/ShapeStep";
import MonogramStep from "@/components/steps/MonogramStep";
import { useStyle } from "@/components/theme/ThemeProvider";
import { THEMES } from "@/lib/themes";
import { useConfig } from "@/lib/store";

function Configurator() {
  const params = useSearchParams();
  const { step, setStep } = useConfig();
  const { FabricStep, ColourStepVariant, QuoteVariant } = THEMES[useStyle()].components;
  const views = [ShapeStep, FabricStep, ColourStepVariant, MonogramStep, QuoteVariant];
  useEffect(() => { const q = Number(params.get("step")); if (!Number.isNaN(q) && q >= 0 && q < 5) setStep(q); }, [params, setStep]);
  const View = views[step];
  return (
    <div className="grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] lg:h-screen lg:overflow-hidden">
      <ConfigHeader />
      <View />
    </div>
  );
}

export default function ConfigurePage() {
  return <Suspense fallback={null}><Configurator /></Suspense>;
}
