"use client";
import { useRef, useState } from "react";
import { FABRICS } from "@/lib/data";

/** Face placement on the cube and the cube rotation that brings it to the front: [rotateX, rotateY]. */
const FACES = [
  { place: "", turn: [0, 0] },                      // front
  { place: "rotateY(90deg)", turn: [0, -90] },       // right
  { place: "rotateY(180deg)", turn: [0, -180] },     // back
  { place: "rotateY(-90deg)", turn: [0, 90] },       // left
  { place: "rotateX(90deg)", turn: [-90, 0] },       // top
  { place: "rotateX(-90deg)", turn: [90, 0] },       // bottom
] as const;
const TEX = {
  knit: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1.2px)",
  weave: "linear-gradient(45deg, rgba(255,255,255,.08) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.08) 75%)",
};
const describe = (f: (typeof FABRICS)[number]) => `${f.gsm} · ${f.build.toLowerCase()} · ${f.use === "Indoor" && f.waterproof.startsWith("No") ? "indoor" : f.waterproof.toLowerCase()}`;

/**
 * D04 — the six FABRICS on a CSS 3D cube. `index` turns its face to the front (1.2 s, theme easing).
 * Drag to look around it; it springs back on release.
 */
export default function CubeView({ index, size = "min(360px, 62vw)" }: { index: number; size?: string }) {
  const [drag, setDrag] = useState({ x: 0, y: 0, on: false });
  const start = useRef({ x: 0, y: 0 });
  const [fx, fy] = FACES[index].turn;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] cursor-grab select-none active:cursor-grabbing" style={{ perspective: "1400px", touchAction: "pan-y", ["--cube" as string]: size }}
      onPointerDown={(e) => { start.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); setDrag({ x: 0, y: 0, on: true }); }}
      onPointerMove={(e) => { if (drag.on) setDrag({ x: (e.clientX - start.current.x) * 0.5, y: (e.clientY - start.current.y) * -0.4, on: true }); }}
      onPointerUp={() => setDrag({ x: 0, y: 0, on: false })} onPointerCancel={() => setDrag({ x: 0, y: 0, on: false })}>
      <div className="preserve t-theme absolute left-1/2 top-1/2 transition-transform"
        style={{ width: "var(--cube)", height: "var(--cube)", margin: "calc(var(--cube) / -2) 0 0 calc(var(--cube) / -2)", transform: `rotateX(${-12 + fx + drag.y}deg) rotateY(${18 + fy + drag.x}deg)`, transitionDuration: drag.on ? "0s" : "1.2s" }}>
        {FABRICS.map((f, k) => (
          <div key={f.id} aria-hidden={k !== index} className="backface-hidden absolute inset-0 flex flex-col justify-end gap-1 border border-[#ffffff1f] p-5 text-[#f2f2f0]"
            style={{ transform: `${FACES[k].place} translateZ(calc(var(--cube) / 2))`, backgroundColor: f.hex, backgroundImage: TEX[f.texture], backgroundSize: "6px 6px" }}>
            <strong className="font-display text-[22px] font-normal">{f.name}</strong>
            <span className="text-[12px] tracking-[.08em] text-[#d6d6d2]">{describe(f)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
