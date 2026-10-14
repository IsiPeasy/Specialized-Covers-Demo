"use client";
import { useEffect, useRef, useState } from "react";
import ColourStudio, { type View } from "@/components/steps/ColourStudio";
import FpsCounter from "./FpsCounter";

/** Camera targets per view — the same numbers Cover3D eases towards. */
const CAM: Record<View, [number, number, number]> = { three: [4.2, 3.2, 12.6], side: [0, 0.8, 13.5], top: [0, 13.5, 0.8] };

/** Camera readout that eases to the new view like the scene does. */
function CameraHud({ view }: { view: View }) {
  const [pos, setPos] = useState(CAM.three);
  const cur = useRef(CAM.three);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = CAM[view];
      cur.current = cur.current.map((c, i) => c + (t[i] - c) * 0.06) as [number, number, number];
      setPos(cur.current);
      if (cur.current.some((c, i) => Math.abs(c - t[i]) > 0.005)) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [view]);
  return (
    <dl className="pointer-events-none absolute right-4 top-44 z-10 grid sm:top-20 grid-cols-[auto_auto] gap-x-4 border border-accent-2/40 bg-[#0e0f11cc] px-3 py-2 font-mono text-[12px] text-accent-2 sm:right-9">
      <dt className="text-ink-3">CAM X/Y/Z</dt><dd>{pos.map((c) => c.toFixed(2).padStart(6, " ")).join(" ")}</dd>
      <dt className="text-ink-3">VIEW</dt><dd>{view === "three" ? "3/4 · AUTO" : view.toUpperCase()}</dd>
      <dt className="text-ink-3">RENDER</dt><dd><FpsCounter /></dd>
    </dl>
  );
}

/** Paddock colour studio: black stage, orange raking light from the right, teal ground grid, live HUD. */
export default function PaddockColour() {
  return (
    <ColourStudio
      stage="#0e0f11"
      scene={{ background: "#0e0f11", rimColor: "#ff6a13", grid: "#5eead4", lightIntensity: 0.85 }}
      overlay={(view) => <CameraHud view={view} />}
      footnote="WEBGL · THREE.JS · COLOURS ON SCREEN ARE A GUIDE"
    />
  );
}
