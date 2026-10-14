import { ScanCar } from "./NightScanHero";

/** Door preview — the Night Scan in miniature. */
export default function PaddockPreview() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-4 overflow-hidden px-8" style={{ background: "radial-gradient(ellipse at 50% 60%, #0B1A18 0%, #030807 70%)", backgroundImage: "linear-gradient(rgba(94,234,212,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,.07) 1px, transparent 1px), radial-gradient(ellipse at 50% 60%, #0B1A18 0%, #030807 70%)", backgroundSize: "32px 32px, 32px 32px, auto" }}>
      <span className="font-mono text-[11px] tracking-[.12em] text-[#8FD9CB]" style={{ animation: "pd-blink 1.6s steps(2) infinite" }}>● SCANNING ARCHIVE</span>
      <ScanCar label="A car being scanned" />
    </div>
  );
}
