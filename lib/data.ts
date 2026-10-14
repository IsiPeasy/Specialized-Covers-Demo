/**
 * Demo catalogue. Prices marked "starting from" come from specialisedcovers.com.
 * Everything else (factors, option prices, delivery) is a placeholder to be
 * replaced with the client's real list — see README "Dati da confermare".
 */

export type ShapeId = "compact" | "coupe" | "saloon" | "estate" | "suv";
export type SizeClass = "S" | "M" | "L" | "XL";

export interface Shape {
  id: ShapeId;
  name: string;
  factor: number;
  examples: string;
  /** 200×80 silhouette path, used by thumbnails, coverflow and the 3D stack */
  path: string;
}

export const SHAPES: Shape[] = [
  { id: "compact", name: "Compact", factor: 1.0, examples: "Mini, Golf, Fiesta", path: "M18,60 C14,48 18,32 30,28 L60,24 C75,12 120,10 140,14 C155,18 165,30 170,34 C182,38 186,48 182,60 Z" },
  { id: "coupe", name: "Coupé", factor: 1.08, examples: "911, F-Type, DB11", path: "M15,60 C12,50 16,44 28,42 L55,38 C70,30 85,22 105,20 C125,20 140,28 155,36 L178,40 C186,44 188,52 186,60 Z" },
  { id: "saloon", name: "Saloon", factor: 1.15, examples: "M3, Flying Spur, XF", path: "M12,60 C10,48 14,40 28,38 L52,36 C64,22 80,16 108,16 C130,16 142,24 152,34 L180,38 C188,42 190,52 188,60 Z" },
  { id: "estate", name: "Estate", factor: 1.22, examples: "RS6 Avant, V90", path: "M12,60 C10,46 14,26 22,20 L110,16 C130,16 142,24 152,34 L180,38 C188,42 190,52 188,60 Z" },
  { id: "suv", name: "SUV / 4x4", factor: 1.35, examples: "Cayenne, Defender, G-Class", path: "M12,60 C10,44 12,20 20,14 L118,12 C134,12 146,22 156,30 L180,34 C188,38 190,50 188,60 Z" },
];

export const SIZE_FACTOR: Record<SizeClass, number> = { S: 0.95, M: 1.0, L: 1.12, XL: 1.25 };
export const SIZE_LENGTH: Record<SizeClass, string> = { S: "< 4,100 mm", M: "4,100–4,700 mm", L: "4,700–5,200 mm", XL: "> 5,200 mm" };

export interface Vehicle {
  make: string;
  model: string;
  generation: string;
  years: string;
  shape: ShapeId;
  size: SizeClass;
  patternOnFile: boolean;
}

/** A sample of the ~5,000-model archive. In production this comes from the API. */
export const VEHICLES: Vehicle[] = [
  { make: "Porsche", model: "911 Carrera", generation: "992", years: "2019–", shape: "coupe", size: "M", patternOnFile: true },
  { make: "Porsche", model: "911 Turbo S", generation: "992", years: "2020–", shape: "coupe", size: "M", patternOnFile: true },
  { make: "Porsche", model: "Cayenne", generation: "E3", years: "2017–", shape: "suv", size: "L", patternOnFile: true },
  { make: "Porsche", model: "Taycan Sport Turismo", generation: "J1", years: "2021–", shape: "estate", size: "L", patternOnFile: true },
  { make: "Ferrari", model: "296 GTB", generation: "F171", years: "2022–", shape: "coupe", size: "M", patternOnFile: true },
  { make: "Bentley", model: "Continental GT", generation: "3rd gen", years: "2018–", shape: "coupe", size: "L", patternOnFile: true },
  { make: "Bentley", model: "Flying Spur", generation: "3rd gen", years: "2019–", shape: "saloon", size: "XL", patternOnFile: true },
  { make: "Land Rover", model: "Defender 110", generation: "L663", years: "2020–", shape: "suv", size: "L", patternOnFile: true },
  { make: "Audi", model: "RS6 Avant", generation: "C8", years: "2019–", shape: "estate", size: "L", patternOnFile: true },
  { make: "Jaguar", model: "E-Type Series 1", generation: "FHC", years: "1961–1968", shape: "coupe", size: "M", patternOnFile: true },
  { make: "McLaren", model: "750S", generation: "—", years: "2023–", shape: "coupe", size: "M", patternOnFile: true },
  { make: "BMW", model: "M3", generation: "G80", years: "2021–", shape: "saloon", size: "L", patternOnFile: true },
  { make: "Mini", model: "Cooper S", generation: "F56", years: "2014–2023", shape: "compact", size: "S", patternOnFile: true },
  { make: "Porsche", model: "918 Spyder", generation: "—", years: "2013–2015", shape: "coupe", size: "M", patternOnFile: false },
];

export interface Fabric {
  id: string;
  name: string;
  line: string;
  base: number; // "starting from" GBP, from the live site
  gsm: string;
  use: "Indoor" | "Outdoor";
  hex: string;
  texture: "knit" | "weave";
  build: string;
  waterproof: string;
  colours: string;
  inner: string;
  care: string;
  bestFor: string;
  colourChoice: boolean; // 15-colour palette available
}

export const FABRICS: Fabric[] = [
  { id: "prestige-plus", name: "Prestige Plus", line: "Indoor Plus", base: 389, gsm: "250gsm", use: "Indoor", hex: "#1F4D35", texture: "knit", build: "Knitted single layer, stretch", waterproof: "No — indoor only", colours: "15 colours", inner: "Soft fleece", care: "Cool wash 30°", bestFor: "Garage, showroom, collections", colourChoice: true },
  { id: "prestige", name: "Prestige", line: "Indoor Pro", base: 289, gsm: "150gsm", use: "Indoor", hex: "#2A2A28", texture: "knit", build: "Knitted single layer, stretch", waterproof: "No — indoor only", colours: "Black, Grey", inner: "Microfleece", care: "Cool wash 30°", bestFor: "Everyday garage use", colourChoice: false },
  { id: "prestige-recycled", name: "Prestige Plus Recycled", line: "Indoor Plus Recycled", base: 489, gsm: "250gsm", use: "Indoor", hex: "#1E1E1C", texture: "knit", build: "Knitted, recycled yarn", waterproof: "No — indoor only", colours: "Black", inner: "Soft fleece", care: "Cool wash 30°", bestFor: "Lower-impact choice", colourChoice: false },
  { id: "prestige-elite", name: "Prestige Elite", line: "Indoor Elite", base: 689, gsm: "200gsm", use: "Indoor", hex: "#141414", texture: "weave", build: "Woven, Teflon-coated", waterproof: "Showerproof", colours: "Black", inner: "None", care: "Wipe clean", bestFor: "Indoor + occasional outdoor", colourChoice: false },
  { id: "stormshield-plus", name: "Stormshield Plus", line: "Outdoor Pro", base: 289, gsm: "220gsm", use: "Outdoor", hex: "#4A4D52", texture: "weave", build: "Tri-laminate non-woven", waterproof: "Yes — membrane", colours: "Black, Grey", inner: "Grey fleecy", care: "Sponge wash", bestFor: "Long-term outdoor storage", colourChoice: false },
  { id: "stormtex-plus", name: "Stormtex Plus", line: "Outdoor Elite", base: 449, gsm: "320gsm", use: "Outdoor", hex: "#18191C", texture: "weave", build: "Knitted twin layer, bielastic", waterproof: "Yes — coated", colours: "Black", inner: "Soft fleece", care: "Sponge wash", bestFor: "All-weather, best fit outdoors", colourChoice: false },
];

export interface Colour { name: string; hex: string }
/** Placeholder palette — replace with the client's Prestige Plus colour card. */
export const COLOURS: Colour[] = [
  { name: "Black", hex: "#141414" }, { name: "Graphite", hex: "#6E7073" }, { name: "Silver", hex: "#B9BBBD" }, { name: "White", hex: "#EDEDEA" },
  { name: "Red", hex: "#B3202A" }, { name: "Burgundy", hex: "#6B1E2A" }, { name: "Orange", hex: "#E2622A" }, { name: "Brass", hex: "#C9A35A" },
  { name: "Lime", hex: "#8DB33A" }, { name: "Racing Green", hex: "#1F4D35" }, { name: "Teal", hex: "#1D6B70" }, { name: "Royal Blue", hex: "#234E9C" },
  { name: "Navy", hex: "#1C2740" }, { name: "Purple", hex: "#4F2E6E" }, { name: "Brown", hex: "#6A4A33" },
];

export const THREADS: Colour[] = [
  { name: "Brass", hex: "#C9A35A" }, { name: "Ivory", hex: "#EDE6D6" }, { name: "Racing Green", hex: "#2A6341" },
  { name: "Red", hex: "#B3202A" }, { name: "Royal Blue", hex: "#234E9C" }, { name: "Silver", hex: "#B9BBBD" },
];

/** Option prices — placeholders. */
export const OPTIONS = {
  twoTone: 30,
  stripe: 45,
  text: 40,
  emblem: { none: 0, sc: 0, crest: 65 } as Record<string, number>,
  bag: 39,
  guarantee: 29,
  speed: { std: 0, ft10: 75, ft5: 150 } as Record<string, number>,
};

export const SPEEDS = [
  { id: "std", label: "Standard", when: "3–4 weeks" },
  { id: "ft10", label: "Fast track 10", when: "10 working days" },
  { id: "ft5", label: "Fast track 5", when: "5 working days" },
] as const;

export const EMBLEMS = [
  { id: "none", label: "No emblem" },
  { id: "sc", label: "COVERCAR logo" },
  { id: "crest", label: "Embroidered initials roundel" },
] as const;

export const PLACEMENTS = [
  { id: "bonnet", label: "Bonnet", x: 640, y: 196, size: 20, mm: "120 mm" },
  { id: "door", label: "Door", x: 400, y: 222, size: 24, mm: "160 mm" },
  { id: "boot", label: "Rear", x: 150, y: 196, size: 18, mm: "100 mm" },
] as const;

/** Side-view car cover, viewBox 0 0 800 260. Shared by every preview. */
export const CAR = {
  body: "M70,200 C62,175 70,160 95,152 L190,140 C250,135 290,100 340,82 C380,68 440,66 480,72 C530,80 570,110 610,128 L700,145 C735,152 745,170 735,200 L648,200 C643,165 577,165 572,200 L228,200 C223,165 157,165 152,200 Z",
  centre: "M70,168 C68,160 75,155 95,152 L190,140 C250,135 290,100 340,82 C380,68 440,66 480,72 C530,80 570,110 610,128 L700,145 C725,150 738,160 740,168 C600,158 250,156 70,168 Z",
  piping: "M70,168 C250,156 600,158 740,168",
  stripe: "M98,153 L190,141 C250,136 290,101 340,83 C380,69 440,67 480,73 C530,81 570,111 610,129 L700,146 L697,156 L606,139 C566,121 528,91 480,85 C440,79 383,81 345,95 C297,113 254,148 192,152 L100,162 Z",
  window: "M300,140 C340,98 420,90 470,92 C520,96 560,116 590,140 Z",
};
