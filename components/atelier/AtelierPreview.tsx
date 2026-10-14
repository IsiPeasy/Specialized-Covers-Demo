import { CAR } from "@/lib/data";

/** Door preview — I08 in miniature: the chalk pattern drawing itself on the blackboard. */
export default function AtelierPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#22302A] px-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.06]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px)" }} />
      <svg viewBox="0 0 800 260" className="relative w-full overflow-visible" role="img" aria-label="Chalk pattern of a car cover">
        <path d={CAR.body} fill="none" stroke="#F2EEE4" strokeWidth="4" strokeLinecap="round" strokeDasharray="2400" style={{ animation: "draw 8s ease-in-out infinite" }} />
        <path d={`${CAR.piping} M340,82 L340,200 M480,72 L480,200`} fill="none" stroke="#F5D37A" strokeWidth="2.5" strokeDasharray="8 8" />
        <circle cx="190" cy="205" r="38" fill="none" stroke="#F2EEE4" strokeWidth="2.5" strokeDasharray="4 6" />
        <circle cx="610" cy="205" r="38" fill="none" stroke="#F2EEE4" strokeWidth="2.5" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}
