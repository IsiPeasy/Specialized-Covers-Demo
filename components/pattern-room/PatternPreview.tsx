import { CAR } from "@/lib/data";

/** Door preview — the pattern drawing itself on graph paper, looping. */
export default function PatternPreview() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-3 px-6">
      <span className="font-mono text-[11px] text-accent-2">FIG. 1 — CUT PATTERN, SIDE ELEVATION</span>
      <svg viewBox="0 0 800 280" className="w-full" role="img" aria-label="A car cover pattern being drawn">
        <path d={CAR.body} fill="none" stroke="#1D3A8A" strokeWidth="3" strokeDasharray="2400" style={{ animation: "draw 8s ease-in-out infinite" }} />
        <path d={`${CAR.piping} M340,82 L340,200 M480,72 L480,200`} fill="none" stroke="#B3302A" strokeWidth="1.5" strokeDasharray="6 5" />
        <path d="M70,250 L740,250 M70,242 L70,258 M740,242 L740,258" fill="none" stroke="#16203A" strokeWidth="1.5" />
        <text x="405" y="274" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="16" fill="#16203A">OVERALL LENGTH [L] mm</text>
      </svg>
    </div>
  );
}
