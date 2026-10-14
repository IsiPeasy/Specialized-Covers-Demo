import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";

/**
 * Theme registry. Every style shares data, pricing, store, CarSvg and Cover3D;
 * what changes lives here (tokens + component map) or in the CSS variables
 * under [data-theme="…"] in app/globals.css (keep the hexes in step).
 */
export type StyleId = "atelier" | "showroom" | "paddock" | "pattern-room";

export interface ThemeTokens {
  colors: { bg: string; surface: string; ink: string; accent: string; accent2: string; line: string };
  fonts: { display: string; body: string; mono: string; href: string };
  radius: string;
}

export interface HomeSlots { hero: ReactNode; section: ReactNode }

export interface ThemeComponents {
  /** Site header for pages without their own (shapes) */
  Header: ComponentType;
  Home: ComponentType<HomeSlots>;
  Hero: ComponentType;
  Section: ComponentType;
  /** Mini animated hero for the landing-page door */
  Preview: ComponentType;
  FabricStep: ComponentType;
  ColourStepVariant: ComponentType;
  QuoteVariant: ComponentType;
}

export interface Theme {
  slug: StyleId;
  name: string;
  tagline: string;
  audience: string;
  tokens: ThemeTokens;
  components: ThemeComponents;
}

const fonts = (families: string[]) => `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;

export const THEMES: Record<StyleId, Theme> = {
  atelier: {
    slug: "atelier",
    name: "Atelier",
    tagline: "Measured like a suit. Cut like one too.",
    audience: "For collectors who buy craft — the tailor's story, told in ivory, green and brass.",
    tokens: {
      colors: { bg: "#F4F0E8", surface: "#FBF9F4", ink: "#1A1A17", accent: "#1F3B2E", accent2: "#C9A35A", line: "#DDD6C8" },
      fonts: { display: "Cormorant Garamond", body: "Karla", mono: "IBM Plex Mono", href: fonts(["Cormorant+Garamond:ital,wght@0,500;0,600;1,500", "Karla:wght@400;500;700", "IBM+Plex+Mono:wght@400;500"]) },
      radius: "0",
    },
    components: {
      Header: dynamic(() => import("@/components/SiteHeader")),
      Home: dynamic(() => import("@/components/atelier/AtelierHome")),
      Hero: dynamic(() => import("@/components/TailorHero")),
      Section: dynamic(() => import("@/components/FlipWall")),
      Preview: dynamic(() => import("@/components/atelier/AtelierPreview")),
      FabricStep: dynamic(() => import("@/components/steps/FabricStep")),
      ColourStepVariant: dynamic(() => import("@/components/steps/ColourStep")),
      QuoteVariant: dynamic(() => import("@/components/steps/QuoteStep")),
    },
  },
  showroom: {
    slug: "showroom",
    name: "Showroom",
    tagline: "Every car deserves a reveal.",
    audience: "For the luxury buyer — black stage, silver light, the cover in 3D at the centre.",
    tokens: {
      colors: { bg: "#0E0E0F", surface: "#161616", ink: "#F4F4F2", accent: "#F4F4F2", accent2: "#8F9193", line: "#2A2A2A" },
      fonts: { display: "Jost", body: "Hanken Grotesk", mono: "Jost", href: fonts(["Jost:wght@300;400;500", "Hanken+Grotesk:wght@400;500;600", "Bodoni+Moda:ital,opsz,wght@1,6..96,400"]) },
      radius: "0",
    },
    components: {
      Header: dynamic(() => import("@/components/showroom/ShowroomHeader")),
      Home: dynamic(() => import("@/components/showroom/ShowroomHome")),
      Hero: dynamic(() => import("@/components/showroom/UnveilHero")),
      Section: dynamic(() => import("@/components/showroom/Turntable")),
      Preview: dynamic(() => import("@/components/showroom/ShowroomPreview")),
      FabricStep: dynamic(() => import("@/components/showroom/FabricCube")),
      ColourStepVariant: dynamic(() => import("@/components/showroom/ShowroomColour")),
      QuoteVariant: dynamic(() => import("@/components/showroom/UnveilQuote")),
    },
  },
  paddock: {
    slug: "paddock",
    name: "Paddock",
    tagline: "Built for the paddock. Made for your garage.",
    audience: "For track-day owners and race teams — dark, fast, every number on show.",
    tokens: {
      colors: { bg: "#0E0F11", surface: "#17191C", ink: "#F2F2F0", accent: "#FF6A13", accent2: "#5EEAD4", line: "#26282D" },
      fonts: { display: "Barlow Condensed", body: "Barlow", mono: "Share Tech Mono", href: fonts(["Barlow+Condensed:wght@600;700;800", "Barlow:wght@400;500;600", "Share+Tech+Mono"]) },
      radius: "2px",
    },
    components: {
      Header: dynamic(() => import("@/components/paddock/PaddockHeader")),
      Home: dynamic(() => import("@/components/paddock/PaddockHome")),
      Hero: dynamic(() => import("@/components/paddock/NightScanHero")),
      Section: dynamic(() => import("@/components/paddock/ExplodedLayers")),
      Preview: dynamic(() => import("@/components/paddock/PaddockPreview")),
      FabricStep: dynamic(() => import("@/components/paddock/HudFabric")),
      ColourStepVariant: dynamic(() => import("@/components/paddock/PaddockColour")),
      QuoteVariant: dynamic(() => import("@/components/paddock/RaceSheet")),
    },
  },
  "pattern-room": {
    slug: "pattern-room",
    name: "Pattern Room",
    tagline: "Every cover starts as a pattern.",
    audience: "For engineers and restorers — the archive on graph paper, every spec in a table.",
    tokens: {
      colors: { bg: "#EDEBE4", surface: "#F7F6F1", ink: "#16203A", accent: "#1D3A8A", accent2: "#B3302A", line: "#16203A" },
      fonts: { display: "IBM Plex Mono", body: "IBM Plex Sans", mono: "IBM Plex Mono", href: fonts(["IBM+Plex+Mono:wght@400;500;600", "IBM+Plex+Sans:wght@400;500;600"]) },
      radius: "0",
    },
    components: {
      Header: dynamic(() => import("@/components/pattern-room/PatternHeader")),
      Home: dynamic(() => import("@/components/pattern-room/PatternHome")),
      Hero: dynamic(() => import("@/components/pattern-room/FabricMotionHero")),
      Section: dynamic(() => import("@/components/FlipWall")),
      Preview: dynamic(() => import("@/components/pattern-room/PatternPreview")),
      FabricStep: dynamic(() => import("@/components/pattern-room/SpecTable")),
      ColourStepVariant: dynamic(() => import("@/components/pattern-room/PatternColour")),
      QuoteVariant: dynamic(() => import("@/components/pattern-room/TechSheet")),
    },
  },
};

export const STYLE_IDS = Object.keys(THEMES) as StyleId[];
export const isStyleId = (s: string): s is StyleId => s in THEMES;

/** Prefix an internal path with the style: ("showroom", "/configure?step=2") → "/showroom/configure/?step=2". */
export function styleHref(style: StyleId, href: string): string {
  if (!href.startsWith("/")) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  let path = m[1] === "/" ? "" : m[1];
  if (path && !path.endsWith("/")) path += "/";
  return `/${style}/${path.replace(/^\//, "")}${m[2]}`;
}

/** Swap the style segment of a path, keeping the rest of the route. */
export function swapStyle(pathname: string, to: StyleId): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isStyleId(parts[0])) parts.shift();
  return `/${[to, ...parts].join("/")}/`;
}
