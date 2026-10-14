import { FABRICS, OPTIONS, SHAPES, SIZE_FACTOR, type ShapeId, type SizeClass } from "./data";

export interface Config {
  vehicleIndex: number;
  shape: ShapeId;
  size: SizeClass;
  fabricId: string;
  centre: string;
  side: string;
  piping: string;
  stripe: string;
  stripeOn: boolean;
  text: string;
  placement: "bonnet" | "door" | "boot";
  thread: string;
  emblem: "none" | "sc" | "crest";
  cameraMirrors: boolean;
  bag: boolean;
  guarantee: boolean;
  speed: "std" | "ft10" | "ft5";
}

export interface LineItem { label: string; amount: number; included?: boolean }

export const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/** Cover price before options: line base × shape factor × size factor, rounded to £1. */
export function coverBase(fabricId: string, shape: ShapeId, size: SizeClass): number {
  const fabric = FABRICS.find((f) => f.id === fabricId) ?? FABRICS[0];
  const sh = SHAPES.find((s) => s.id === shape) ?? SHAPES[1];
  return Math.round(fabric.base * sh.factor * SIZE_FACTOR[size]);
}

export function quote(c: Config): { items: LineItem[]; total: number } {
  const fabric = FABRICS.find((f) => f.id === c.fabricId) ?? FABRICS[0];
  const items: LineItem[] = [];
  items.push({ label: `Tailored ${fabric.line} cover, storage bag`, amount: coverBase(c.fabricId, c.shape, c.size) });
  if (fabric.colourChoice) {
    const two = c.centre !== c.side;
    items.push({ label: two ? "Two-tone panels" : "Single colour panels", amount: two ? OPTIONS.twoTone : 0, included: !two });
    items.push({ label: "Contrast piping", amount: 0, included: true });
    if (c.stripeOn) items.push({ label: "Racing stripe", amount: OPTIONS.stripe });
  }
  if (c.text.trim()) items.push({ label: `Embroidered text “${c.text.toUpperCase()}”`, amount: OPTIONS.text });
  if (c.emblem !== "none") items.push({ label: c.emblem === "crest" ? "Embroidered initials roundel" : "COVERCAR logo", amount: OPTIONS.emblem[c.emblem], included: c.emblem === "sc" });
  if (c.cameraMirrors) items.push({ label: "Camera mirrors — no pockets", amount: 0, included: true });
  if (c.bag) items.push({ label: "Upgraded storage bag", amount: OPTIONS.bag });
  if (c.guarantee) items.push({ label: "Extended guarantee", amount: OPTIONS.guarantee });
  if (c.speed !== "std") items.push({ label: c.speed === "ft5" ? "Fast track — 5 working days" : "Fast track — 10 working days", amount: OPTIONS.speed[c.speed] });
  const total = items.reduce((a, i) => a + i.amount, 0);
  return { items, total };
}
