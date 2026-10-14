"use client";
import CarSvg from "@/components/CarSvg";
import { THEMES } from "@/lib/themes";
import { ThemedLink, useStyle } from "./ThemeProvider";

/** Phase-1 stand-in: the theme's tokens on a plain hero, until its own hero lands. */
export default function PlaceholderHero() {
  const t = THEMES[useStyle()];
  return (
    <section className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-5">
        <span className="eyebrow">{t.name} · hero placeholder</span>
        <h1 className="font-display text-[48px] font-medium leading-none sm:text-[72px]">{t.tagline}</h1>
        <p className="max-w-[460px] text-ink-2">{t.audience}</p>
        <ThemedLink href="/configure" className="btn-primary w-fit">CONFIGURE YOUR COVER</ThemedLink>
      </div>
      <CarSvg side="var(--color-model)" piping="var(--color-model-trim)" className="w-full" />
    </section>
  );
}
