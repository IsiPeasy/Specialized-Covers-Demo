"use client";
import { useEffect, useState } from "react";

/** A live frames-per-second readout for the HUD (counts requestAnimationFrame ticks, updates twice a second). */
export default function FpsCounter() {
  const [fps, setFps] = useState(0);
  useEffect(() => {
    let raf = 0, frames = 0, t0 = performance.now();
    const tick = (now: number) => {
      frames++;
      if (now - t0 >= 500) { setFps(Math.round((frames * 1000) / (now - t0))); frames = 0; t0 = now; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span aria-hidden="true">{String(fps).padStart(3, "0")} FPS</span>;
}
