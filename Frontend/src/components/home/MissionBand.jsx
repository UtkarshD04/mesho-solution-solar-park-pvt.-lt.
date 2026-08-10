import useInView from "../../hooks/useInView";

const TEAL = "#20b2aa";

export default function MissionBand() {
  const [ref, inView] = useInView(0.15);

  return (
    <section className="py-24 text-center" style={{ backgroundColor: "#033e74" }}>
      <div
        ref={ref}
        className="max-w-[900px] mx-auto px-6 transition-all duration-1000"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: TEAL }}>
          Our Mission
        </span>
        <p className="text-[26px] leading-[36px] md:text-[38px] md:leading-[48px] font-bold text-white">
          Make advanced lithium-ion energy storage affordable, accessible, and maintainable for every tier of the Indian market — engineered in-house, from cell selection to cloud telemetry.
        </p>
        <div className="flex justify-center gap-10 md:gap-16 mt-12 flex-wrap">
          <div>
            <p className="text-2xl font-bold text-white">±0.5 mV</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Cell-Match Tolerance</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">&lt; 2%</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">SoC Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">In-House Engineering</p>
          </div>
        </div>
      </div>
    </section>
  );
}
