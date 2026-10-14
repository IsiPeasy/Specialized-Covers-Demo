import CarSvg from "@/components/CarSvg";

/** Phase-1 stand-in for a door preview: the car in the theme's model colours. */
export default function PlaceholderPreview() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <CarSvg side="var(--color-model)" piping="var(--color-model-trim)" className="w-full" label="Preview" />
    </div>
  );
}
