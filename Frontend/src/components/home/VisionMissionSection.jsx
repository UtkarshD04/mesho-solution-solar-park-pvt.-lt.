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

const visionPoints = [
  "Decentralised clean energy accessible to every home",
  "Zero-emission backup replacing every diesel generator",
  "Smart grid-ready storage from rooftop to utility scale",
];

const missionPoints = [
  "In-house BMS firmware with Kalman filter SoC accuracy",
  "Precision cell-matching at ±0.5 mV pack tolerance",
  "End-to-end quality from cell welding to cloud telemetry",
];

export default function VisionMissionSection() {
  const [secRef, secInView] = useInView(0.08);

  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">



      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-14px) rotate(-3deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50%       { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>

      {/* ═══ MAIN SECTION ═══ */}
      <div
        ref={secRef}
        className="relative max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32"
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
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${secInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
          <div className={`pr-0 lg:pr-16 pb-16 lg:pb-0 transition-all duration-1000 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`} style={{ transitionDelay: "100ms" }}>

            {/* Large "01" number */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-7xl font-black text-[#20b2aa]/15 leading-none select-none">01</span>
              <div>
                <span className="block text-[#20b2aa] text-[10px] font-extrabold uppercase tracking-[0.4em] mb-1">Our Vision</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  Leading India to a<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-[#033e74]">
                    Smarter Energy Era
                  </span>
                </h2>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-0.5 w-12 bg-[#20b2aa] rounded-full" />
              <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
            </div>

            <p className="text-slate-500 text-sm leading-loose mb-8">
              We envision an India where reliable, clean electricity is not a privilege — it is a right. By building intelligent, high-density lithium-ion storage at every level of the energy pyramid, MYZO is making a future where blackouts are extinct, diesel generators are obsolete, and every kilowatt-hour comes from the sun.
            </p>

            {/* Bullet points */}
            <ul className="space-y-4 mb-10">
              {visionPoints.map((pt, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-700 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  <span className="mt-1.5 w-5 h-5 rounded-full bg-[#20b2aa]/10 border border-[#20b2aa]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#20b2aa]" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z"/>
                    </svg>
                  </span>
                  <span className="text-slate-600 text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            {/* Vision stat pills */}
            <div
              className="inline-flex gap-3 flex-wrap"
              style={{ animation: "floatA 5s ease-in-out infinite" }}
            >
              <div className="bg-white border border-[#20b2aa]/20 rounded-2xl px-5 py-3 shadow-md text-center">
                <div className="text-2xl font-black text-[#20b2aa]">2030</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Carbon-Zero</div>
              </div>
              <div className="bg-white border border-[#20b2aa]/20 rounded-2xl px-5 py-3 shadow-md text-center">
                <div className="text-2xl font-black text-slate-800">1M+</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Homes Powered</div>
              </div>
              <div className="bg-white border border-[#20b2aa]/20 rounded-2xl px-5 py-3 shadow-md text-center">
                <div className="text-2xl font-black text-slate-800">25+</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">States</div>
              </div>
            </div>
          </div>

          {/* ══════ MISSION SIDE ══════ */}
          <div className={`pl-0 lg:pl-16 pt-16 lg:pt-0 border-t lg:border-t-0 border-slate-100 transition-all duration-1000 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{ transitionDelay: "250ms" }}>

            {/* Large "02" number */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-7xl font-black text-[#033e74]/10 leading-none select-none">02</span>
              <div>
                <span className="block text-[#033e74] text-[10px] font-extrabold uppercase tracking-[0.4em] mb-1">Our Mission</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  Replace Lead-Acid with<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#033e74] to-[#1a6bb5]">
                    Intelligent Lithium
                  </span>
                </h2>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-0.5 w-12 bg-[#033e74] rounded-full" />
              <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
            </div>

            <p className="text-slate-500 text-sm leading-loose mb-8">
              Our mission is precise: make advanced lithium-ion energy storage affordable, accessible, and maintainable for every tier of the Indian market. We engineer our batteries in-house — from cell selection and precision welding to BMS firmware and cloud telemetry — so quality is never compromised.
            </p>

            {/* Bullet points */}
            <ul className="space-y-4 mb-10">
              {missionPoints.map((pt, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-700 ${secInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                  style={{ transitionDelay: `${350 + i * 120}ms` }}
                >
                  <span className="mt-1.5 w-5 h-5 rounded-full bg-[#033e74]/10 border border-[#033e74]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#033e74]" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z"/>
                    </svg>
                  </span>
                  <span className="text-slate-600 text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            {/* Mission animated tech pills */}
            <div
              className="inline-flex gap-3 flex-wrap"
              style={{ animation: "floatB 6s ease-in-out infinite" }}
            >
              {[
                { top: "10,000+", bot: "Cycles" },
                { top: "99.2%", bot: "Efficiency" },
                { top: "15 yr", bot: "Lifespan" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-[#033e74]/15 rounded-2xl px-5 py-3 shadow-md text-center">
                  <div className="text-2xl font-black text-[#033e74]">{s.top}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">{s.bot}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>

  );
}
