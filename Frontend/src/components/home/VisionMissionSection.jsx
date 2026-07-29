import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Counter({ to, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(start);
    }, 16);
    return () => clearInterval(t);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function VisionMissionSection() {
  const [secRef, secInView] = useInView(0.08);

  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">



      {/* ═══ MAIN SECTION ═══ */}
      <div
        ref={secRef}
        className="relative max-w-5xl mx-auto px-6 lg:px-10 pt-6 pb-10 lg:pt-8 lg:pb-14"
      >

        {/* ── BIG DECORATIVE WATERMARK ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="text-[18vw] font-black text-slate-900/[0.025] uppercase tracking-tighter leading-none"
            style={{ userSelect: "none" }}
          >
            MYZO
          </span>
        </div>

        {/* ── SECTION LABEL ── */}
        <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${secInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
          <span className="px-5 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-[#033e74] text-xs font-bold uppercase tracking-[0.3em]">
            Our Core Purpose
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-0 relative">

          {/* ── CENTER DIVIDER (desktop) ── */}
          <div className="hidden lg:flex absolute inset-y-0 left-1/2 -translate-x-1/2 flex-col items-center z-10 pointer-events-none">
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
            <div className="w-10 h-10 rounded-full bg-white border-2 border-[#20b2aa] flex items-center justify-center shadow-lg z-10">
              <div className="w-3 h-3 rounded-full bg-[#20b2aa]" />
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          </div>

          {/* ══════ VISION SIDE ══════ */}
          <div className={`pr-0 lg:pr-10 pb-10 lg:pb-0 transition-all duration-1000 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`} style={{ transitionDelay: "100ms" }}>

            {/* Large "01" number */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-black text-[#20b2aa]/15 leading-none select-none">01</span>
              <div>
                <span className="block text-[#20b2aa] text-[10px] font-extrabold uppercase tracking-[0.4em] mb-1">Our Vision</span>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  Leading India to a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-[#033e74]">
                    Smarter Energy Era
                  </span>
                </h2>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-12 bg-[#20b2aa] rounded-full" />
              <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              We envision an India where reliable, clean electricity is not a privilege — it is a right. By building intelligent, high-density lithium-ion storage at every level of the energy pyramid, MYZO is making a future where blackouts are extinct, diesel generators are obsolete, and every kilowatt-hour comes from the sun.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              That means decentralized clean energy accessible to every home, zero-emission backup replacing every diesel generator, and smart grid-ready storage from rooftop to utility scale.
            </p>
          </div>

          {/* ══════ MISSION SIDE ══════ */}
          <div className={`pl-0 lg:pl-10 pt-10 lg:pt-0 border-t lg:border-t-0 border-slate-100 transition-all duration-1000 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{ transitionDelay: "250ms" }}>

            {/* Large "02" number */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-black text-[#033e74]/10 leading-none select-none">02</span>
              <div>
                <span className="block text-[#033e74] text-[10px] font-extrabold uppercase tracking-[0.4em] mb-1">Our Mission</span>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  Replace Lead-Acid with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#033e74] to-[#1a6bb5]">
                    Intelligent Lithium
                  </span>
                </h2>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-12 bg-[#033e74] rounded-full" />
              <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Our mission is precise: make advanced lithium-ion energy storage affordable, accessible, and maintainable for every tier of the Indian market. We engineer our batteries in-house — from cell selection and precision welding to BMS firmware and cloud telemetry — so quality is never compromised.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              That includes in-house BMS firmware with Kalman filter SoC accuracy, precision cell-matching at ±0.5 mV pack tolerance, and end-to-end quality from cell welding to cloud telemetry.
            </p>
          </div>
        </div>

      </div>
    </section>

  );
}
