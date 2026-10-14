"use client";
import { create } from "zustand";
import { VEHICLES } from "./data";
import type { Config } from "./pricing";

interface State extends Config {
  step: number;
  set: (patch: Partial<Config>) => void;
  setStep: (n: number) => void;
  selectVehicle: (i: number) => void;
}

const v0 = VEHICLES[0];

export const useConfig = create<State>((set) => ({
  step: 0,
  vehicleIndex: 0,
  shape: v0.shape,
  size: v0.size,
  fabricId: "prestige-plus",
  centre: "#141414",
  side: "#141414",
  piping: "#C9A35A",
  stripe: "#C9A35A",
  stripeOn: true,
  text: "K. D. LONG",
  placement: "bonnet",
  thread: "#C9A35A",
  emblem: "crest",
  cameraMirrors: false,
  bag: true,
  guarantee: false,
  speed: "ft10",
  set: (patch) => set(patch),
  setStep: (step) => set({ step }),
  selectVehicle: (i) => set({ vehicleIndex: i, shape: VEHICLES[i].shape, size: VEHICLES[i].size }),
}));
