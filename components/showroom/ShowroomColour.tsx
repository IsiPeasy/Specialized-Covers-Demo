"use client";
import ColourStudio from "@/components/steps/ColourStudio";

/** Colour studio on a black stage: cold key light, top view, no auto-rotate, borderless swatches. */
export default function ShowroomColour() {
  return (
    <ColourStudio
      defaultView="top"
      stage="radial-gradient(ellipse at 50% 45%, #1a1a1c 0%, #0e0e0f 60%)"
      scene={{ background: "#0e0e0f", keyColor: "#dfe8ff", lightIntensity: 1.7, autoRotate: false }}
      footnote="WebGL · three.js · colours on screen are a guide — swatches posted free"
    />
  );
}
