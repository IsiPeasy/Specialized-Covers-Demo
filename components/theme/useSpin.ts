"use client";
import { useEffect, useRef } from "react";

/**
 * Drag-to-turn for CSS 3D rigs. Writes the transform straight to the element (no re-render per frame):
 * spins on its own at `speed` deg/s, pauses while dragged and for a moment after, and stays still
 * under prefers-reduced-motion. `render(yaw, pitch)` returns the transform string.
 */
export function useSpin<T extends HTMLElement>(render: (yaw: number, pitch: number) => string, { speed = 20, pitch0 = 0 } = {}) {
  const el = useRef<T>(null);
  const surface = useRef<HTMLDivElement>(null);
  const draw = useRef(render);
  draw.current = render;

  useEffect(() => {
    const node = el.current, area: HTMLElement | null = surface.current ?? node;
    if (!node || !area) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let yaw = -30, pitch = pitch0, last = performance.now(), raf = 0, idleUntil = 0;
    let drag: { x: number; y: number } | null = null;
    const tick = (now: number) => {
      if (!still && !drag && now > idleUntil) yaw += ((now - last) / 1000) * speed;
      last = now;
      node.style.transform = draw.current(yaw, pitch);
      raf = requestAnimationFrame(tick);
    };
    const down = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY }; area.setPointerCapture(e.pointerId); area.style.cursor = "grabbing"; };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      yaw += (e.clientX - drag.x) * 0.5;
      pitch = Math.max(-40, Math.min(25, pitch - (e.clientY - drag.y) * 0.3));
      drag = { x: e.clientX, y: e.clientY };
      idleUntil = performance.now() + 2000;
    };
    const up = () => { drag = null; area.style.cursor = "grab"; };
    area.style.cursor = "grab"; area.style.touchAction = "pan-y";
    area.addEventListener("pointerdown", down); area.addEventListener("pointermove", move);
    area.addEventListener("pointerup", up); area.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("pointerdown", down); area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerup", up); area.removeEventListener("pointercancel", up);
    };
  }, [speed, pitch0]);

  return { el, surface };
}
