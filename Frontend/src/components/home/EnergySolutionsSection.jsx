import { useState } from "react";
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

const inverterFeatures = [
  "100% Unbalanced Output — Supports full three-phase phase imbalance to maximize system flexibility.",
  "Seamless AC Coupling — Easily retrofit existing on-grid solar power systems with robust battery storage.",
  "High Scalability — Parallel up to 10 units for robust on-grid and off-grid utility-scale operations.",
  "Rapid 200A Energy Flow — Industry-leading charge and discharge current for fast power transfer.",
  "High-Voltage Battery Integration — Engineered for high-voltage batteries to ensure peak conversion efficiency.",
  "Smart Load Scheduling — Configure up to 6 custom charging and discharging time periods daily.",
  "Diesel Generator Support — Directly stores excess generator output and manages automatic grid switches.",
];

export default function EnergySolutionsSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-white py-16 lg:py-20 overflow-hidden">

      {/* ── Section Header ── */}
      <div className="text-center mb-10 px-6 lg:px-10">
        <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em]">Our Solutions</span>
        <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Energy Solutions for Every Scale</h2>
      </div>

      {/* ── Tiles Grid - Full Width ── */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {solutionTiles.map((tile, i) => (
          <Link
            key={tile.title}
            to={tile.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group relative h-[310px] overflow-hidden bg-slate-900 sm:h-[360px] lg:h-[clamp(360px,31vw,500px)]"
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


      {/* ── Hybrid Inverter Section — Parallax BG ── */}
      <div className="relative mt-20 overflow-hidden min-h-[560px]">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1800&q=85&auto=format&fit=crop')" }}
        />
        {/* Dark brand-blue/teal hour overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-[#033e74]/80" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Product Image Card */}
          <div className="flex justify-center">
            <div className="relative group/img overflow-hidden rounded-3xl bg-white/95 border border-[#20b2aa]/20 p-8 shadow-2xl shadow-black/60 transition-all duration-500 hover:scale-[1.02] hover:border-[#20b2aa]/40">
              <img
                src="/myzo-hybrid-inverter.png"
                alt="MYZO Hybrid Solar Inverter"
                className="w-full max-w-md h-[400px] object-contain drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20b2aa]/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right — Details */}
          <div className="space-y-6">
            <div>
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-[#20b2aa]/10 border border-[#20b2aa]/30 rounded-full">
                Featured Innovation
              </span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Advanced Three-Phase <br />Hybrid Inverter
              </h2>
              <h3 className="mt-2 text-lg font-extrabold text-[#20b2aa] tracking-wide">
                SUN-100/125K-SG02HP3-EU-GM10
              </h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xl">
                Engineered for maximum reliability and scaling. This commercial-grade hybrid system seamlessly coordinates solar arrays, utility grid supply, battery storage, and generators to deliver uninterrupted, high-efficiency clean power.
              </p>
            </div>

            <ul className="space-y-3">
              {inverterFeatures.map((feature, i) => {
                const [title, desc] = feature.split(" — ");
                return (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#20b2aa] shadow-md shadow-[#20b2aa]/50" />
                    <span className="text-white/70 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                      <strong className="text-white font-semibold">{title}</strong> {desc ? `— ${desc}` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a938c] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-teal-500/20"
            >
              View Specifications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
