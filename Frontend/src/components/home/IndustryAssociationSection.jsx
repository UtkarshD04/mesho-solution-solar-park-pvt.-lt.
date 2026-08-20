import useInView from "../../hooks/useInView";

const ACCENT = "#033e74";

const associations = [
  { full: "Rimjhim Ispat Pvt Ltd", logo: "/industry-logos/rimjhim-ispat.png" },
  { full: "Amplus", logo: "/industry-logos/amplus.jpg" },
  { full: "Ampin", logo: "/industry-logos/ampin.png" },
  { full: "Fourthpartner Energy Pvt Ltd", logo: "/industry-logos/fourthpartner.png" },
  { full: "Prakash Steel", logo: "/industry-logos/prakash-steel.png" },
  { full: "Sunsure Energy", logo: "/industry-logos/sunsure.svg" },
  { full: "SunSource Energy", logo: "/industry-logos/sunsource.svg" },
  { full: "Haldiram's", logo: "/industry-logos/haldirams.png" },
];

// Duplicated for a seamless infinite loop.
const marqueeItems = [...associations, ...associations];

function Bubble({ c }) {
  return (
    <div className="group relative shrink-0">
      {/* Tooltip with full company name */}
      <div className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20 whitespace-nowrap">
        <div className="text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg" style={{ backgroundColor: ACCENT }}>
          {c.full}
        </div>
        <div className="w-2.5 h-2.5 rotate-45 mx-auto -mt-1.5" style={{ backgroundColor: ACCENT }} />
      </div>

      <div
        className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full bg-white flex items-center justify-center p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:scale-105"
        style={{ boxShadow: "0px 4px 20px 0px rgba(3,62,116,0.10)" }}
      >
        <img src={c.logo} alt={c.full} className="max-w-full max-h-full object-contain" loading="lazy" />
      </div>
    </div>
  );
}

export default function IndustryAssociationSection() {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #eaf7f5 0%, #f4fbfa 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `radial-gradient(${ACCENT} 1px, transparent 1px)`, backgroundSize: "26px 26px" }} />

      <div ref={ref} className="max-w-[1220px] mx-auto px-4 sm:px-6 text-center relative">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 mb-4">
            Our Industry Association
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-14">
            Trusted by leading energy and industrial partners across India who power their operations with Myzo.
          </p>
        </div>
      </div>

      {/* Auto-scrolling marquee — pauses on hover */}
      <div
        className="relative transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: "150ms" }}
      >
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #eaf7f5 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #f4fbfa 0%, transparent 100%)" }} />

        <div className="group/marquee overflow-hidden py-4">
          <div className="flex w-max gap-8 md:gap-10 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {marqueeItems.map((c, i) => (
              <Bubble key={`${c.full}-${i}`} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
