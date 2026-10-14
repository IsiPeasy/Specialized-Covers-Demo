import { CAR } from "@/lib/data";

interface Props {
  side?: string;
  centre?: string;
  piping?: string;
  stripe?: string | null;
  window?: boolean;
  mirror?: boolean;
  shadow?: boolean;
  className?: string;
  label?: string;
  children?: React.ReactNode;
}

/** Side-view covered car. All previews share this one drawing. */
export default function CarSvg({ side = "#141414", centre, piping = "#C9A35A", stripe = null, window = false, mirror = true, shadow = true, className, label = "Covered car", children }: Props) {
  return (
    <svg viewBox="0 0 800 260" className={className} role="img" aria-label={label}>
      {shadow && <ellipse cx="400" cy="236" rx="360" ry="9" fill="rgba(0,0,0,.14)" />}
      <circle cx="190" cy="205" r="38" fill="#1a1a17" />
      <circle cx="610" cy="205" r="38" fill="#1a1a17" />
      <path d={CAR.body} fill={side} style={{ transition: "fill .35s" }} />
      {centre && <path d={CAR.centre} fill={centre} style={{ transition: "fill .35s" }} />}
      {window && <path d={CAR.window} fill="#2B2D30" />}
      {stripe && <path d={CAR.stripe} fill={stripe} style={{ transition: "fill .35s" }} />}
      <path d={CAR.piping} fill="none" stroke={piping} strokeWidth="3.5" style={{ transition: "stroke .35s" }} />
      {mirror && <ellipse cx="585" cy="132" rx="14" ry="8" fill={side} />}
      {children}
    </svg>
  );
}
