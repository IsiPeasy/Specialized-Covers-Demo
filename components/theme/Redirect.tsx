"use client";
import { useEffect } from "react";

/** Old single-style routes (/home, /configure…) → their Atelier equivalent. Static export has no server redirects. */
export default function Redirect({ to }: { to: string }) {
  useEffect(() => { window.location.replace(to + window.location.search + window.location.hash); }, [to]);
  return <p className="p-8 text-sm">Moved to <a href={to}>{to}</a>.</p>;
}
