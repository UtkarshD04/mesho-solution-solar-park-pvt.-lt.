import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const solutionTiles = [
  {
    title: "Commercial Energy Storage Systems",
    image: "/commercial-bess.png",
    href: "/products",
    description: "Utility-scale lithium-ion battery containers designed for grid stability, peak shaving, and high-capacity backup.",
  },
  {
    title: "Commercial PV Systems",
    image: "/commercial-pv.png",
    href: "/products",
    description: "High-yield commercial solar PV systems installed on business rooftops and solar parks to lower operational power costs.",
  },
  {
    title: "Residential Energy Storage Systems",
    image: "/residential-bess.png",
    href: "/products",
    description: "Compact wall-mounted home energy storage solutions providing seamless black-out protection and solar self-sufficiency.",
  },
  {
    title: "Residential PV Systems",
    image: "/residential-pv.png",
    href: "/products",
    description: "Sleek and efficient residential solar panel arrays custom-engineered for modern homes to generate clean electricity.",
  },
];

export default function EnergySolutionsSection() {
  const [hovered, setHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white pt-10 pb-4 lg:pt-12 lg:pb-4 overflow-hidden">

      {/* ── Section Header ── */}
      <div
        className="text-center mb-10 px-6 lg:px-10 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em]">Our Solutions</span>
        <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Energy Solutions for Every Scale</h2>
      </div>

      {/* ── Tiles Grid - Full Width ── */}
      <div ref={sectionRef} className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {solutionTiles.map((tile, i) => (
          <Link
            key={tile.title}
            to={tile.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group relative h-[310px] overflow-hidden bg-slate-900 sm:h-[360px] lg:h-[clamp(360px,31vw,500px)] transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-[clamp(1.25rem,2vw,2rem)] text-white">
              <h3 className="mb-2 text-[clamp(1.25rem,1.7vw,1.8rem)] font-extrabold leading-[1.15] drop-shadow-lg">
                {tile.title}
              </h3>

              <div className={`overflow-hidden transition-all duration-500 ${hovered === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="h-0.5 w-6 rounded-full bg-[#20b2aa] mb-1.5" />
                <p className="text-[clamp(0.82rem,0.95vw,1.05rem)] leading-relaxed text-white/90">
                  {tile.description || `Explore our ${tile.title.toLowerCase()} tailored for maximum efficiency and reliability.`}
                </p>
              </div>

              <div className={`mt-3 flex items-center gap-1 text-[clamp(0.82rem,0.95vw,1.05rem)] font-bold text-[#20b2aa] transition-all duration-500 ${hovered === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                Explore
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>


    </section>
  );
}
