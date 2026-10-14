import { UnveilCar } from "./UnveilHero";

/** Door preview — the Unveil in miniature. */
export default function ShowroomPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#0a0a0b] px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(255,243,220,.2) 0%, rgba(255,243,220,0) 65%)", animation: "sr-spot 6s cubic-bezier(.6,0,.3,1) infinite" }} />
      <div className="relative w-full"><UnveilCar label="A cover sliding off a car" /></div>
    </div>
  );
}
