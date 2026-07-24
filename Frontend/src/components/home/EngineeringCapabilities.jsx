import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function EngineeringCapabilities({ divisions }) {
  const [ref, inView] = useInView();

  return (
    <section className="relative overflow-hidden py-24 bg-white">
      {/* Soft ambient blobs — light theme */}
      <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-[#e8f4f8] rounded-full blur-[130px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-[110px] opacity-70 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(#033e74 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16 relative">

        {/* ── Header ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[#20b2aa] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              <span className="w-6 h-px bg-[#20b2aa]" />
              Engineering &amp; Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-light text-slate-800 leading-snug">
              Built In-House, <span className="font-extrabold text-slate-900">Engineered for Every Scale</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed lg:text-right">
            From residential wall units to multi-megawatt grid containers — every Myzo product shares the same
            cell testing, precision welding, and in-house BMS engineering pipeline.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((item, i) => {
            const featured = i === 0;
            return (
              <div
                key={item.title}
                className={`group relative rounded-3xl border ${featured ? "border-[#20b2aa]/30" : "border-slate-100"} ${item.bg} p-8 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${i * 130 + 100}ms`,
                  transitionProperty: "opacity, transform, box-shadow",
                }}
              >
                {/* Oversized numeral watermark */}
                <span className="absolute -top-3 right-4 text-7xl font-black text-slate-900/[0.05] select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {featured && (
                  <span className="absolute top-6 right-6 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white bg-[#20b2aa] px-2.5 py-1 rounded-full shadow-sm">
                    Flagship
                  </span>
                )}

                <div className="relative flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${item.icon_bg} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shrink-0`}>
                    {item.icon}
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900 leading-snug group-hover:text-[#033e74] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                    {item.desc}
                  </p>

                  <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#20b2aa] hover:text-[#033e74] transition-colors duration-300 group/link w-fit"
                  >
                    Explore
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Accent border glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-[#20b2aa]/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
