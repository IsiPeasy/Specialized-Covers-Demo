"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigHeader } from "@/components/ConfigShell";
import ShapeStep from "@/components/steps/ShapeStep";
import FabricStep from "@/components/steps/FabricStep";
import ColourStep from "@/components/steps/ColourStep";
import MonogramStep from "@/components/steps/MonogramStep";
import QuoteStep from "@/components/steps/QuoteStep";
import { useConfig } from "@/lib/store";

const STEP_VIEWS = [ShapeStep, FabricStep, ColourStep, MonogramStep, QuoteStep];

function Configurator() {
  const params = useSearchParams();
  const { step, setStep } = useConfig();
  useEffect(() => { const q = Number(params.get("step")); if (!Number.isNaN(q) && q >= 0 && q < STEP_VIEWS.length) setStep(q); }, [params, setStep]);
  const View = STEP_VIEWS[step];
  return (
    <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
      <ConfigHeader />
      <View />
    </div>
  );
}

export default function ConfigurePage() {
  return <Suspense fallback={null}><Configurator /></Suspense>;
}
