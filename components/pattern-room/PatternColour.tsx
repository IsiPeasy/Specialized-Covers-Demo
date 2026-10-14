"use client";
import ColourStudio from "@/components/steps/ColourStudio";
import { SIZE_LENGTH, VEHICLES } from "@/lib/data";
import { useConfig } from "@/lib/store";

/** Dimension lines under the model: the size class and its length band from the data. */
function Dimensions() {
  const s = useConfig();
  const v = VEHICLES[s.vehicleIndex];
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-20 z-10 sm:bottom-12 flex flex-col items-center gap-1 font-mono text-[12px] text-ink sm:inset-x-[12%]" aria-hidden="true">
      <div className="relative h-3 w-full border-x-2 border-ink"><div className="absolute inset-x-0 top-1/2 border-t border-ink" /></div>
      <span className="bg-bg px-2">OVERALL LENGTH · SIZE {s.size} · {SIZE_LENGTH[s.size]} · {`${v.make} ${v.model}`.toUpperCase()}</span>
    </div>
  );
}

/** Pattern Room colour studio: paper stage, wireframe over the solid, dimension lines beneath. */
export default function PatternColour() {
  return (
    <ColourStudio
      stage="var(--ground)"
      scene={{ wireframe: "#1d3a8a", lightIntensity: 1.05 }}
      overlay={() => <Dimensions />}
      footnote="FIG. 4 — CUT PATTERN IN 3D · WIREFRAME OVER SOLID · COLOURS ON SCREEN ARE A GUIDE"
    />
  );
}
