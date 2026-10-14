import { ThemedLink } from "@/components/theme/ThemeProvider";
import CarSvg from "@/components/CarSvg";
import { CAR, FABRICS, VEHICLES } from "@/lib/data";
import { coverBase, gbp } from "@/lib/pricing";

/** The panels are masked by the cover outline itself — CAR.body, stretched over the same 800×260 box as CarSvg. */
const MASK = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 260' preserveAspectRatio='none'><path d='${CAR.body}'/></svg>`)}") 0 0 / 100% 100% no-repeat`;

/** D05 — the cover drapes onto the car panel by panel, in CSS 3D. */
export default function DrapeSection() {
  const v = VEHICLES[0], f = FABRICS[0];
  return (
    <section className="overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="flex flex-col gap-5">
          <span className="eyebrow">The fit</span>
          <h2 className="font-display text-[44px] leading-[1] font-medium sm:text-[60px]">It drapes like it was <em>made for it.</em> Because it was.</h2>
          <p className="text-[16px] leading-relaxed text-ink-2">Panel by panel, the cover settles onto the body it was cut for. Fewer seams, wider rolls, no excess cloth.</p>
          <div className="flex flex-wrap items-center gap-5">
            <ThemedLink href="/configure" className="btn-primary">CONFIGURE</ThemedLink>
            <span className="text-[15px]">{f.line} · {v.model} ({v.generation}) <strong className="font-display text-[28px]">{gbp(coverBase(f.id, v.shape, v.size))}</strong></span>
          </div>
        </div>
        <div className="relative">
          <CarSvg side="#B9BBBD" window className="w-full" label="A car with its cover draping onto it" />
          <div aria-hidden="true" className="absolute inset-0" style={{ perspective: "1200px", mask: MASK, WebkitMask: MASK }}>
            {Array.from({ length: 8 }, (_, k) => (
              <div key={k} className="absolute top-[24%] h-[54%] origin-top border-r border-[#ffffff14]"
                style={{ left: `${k * 12.5}%`, width: "12.5%", background: k % 2 ? "#22412F" : "#1F3B2E", animation: `at-fold 9s ${(k * 0.12).toFixed(2)}s ease-in-out infinite` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
