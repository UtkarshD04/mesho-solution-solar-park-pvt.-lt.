import { useEffect, useRef, useState } from "react";

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

function StageRow({ s }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className={`relative group ${s.flip ? "lg:order-2" : ""}`}>
        <div className="absolute -inset-3 bg-gradient-to-br from-[#20b2aa]/20 to-[#033e74]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
          <img src={s.img} alt={s.imgAlt} className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 bg-[#20b2aa] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            {s.tag}
          </div>
        </div>
        <div className="absolute -bottom-5 left-8 right-8 flex gap-3">
          {s.metrics.map((m, mi) => (
            <div key={mi} className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-center shadow-lg">
              <div className="text-xl font-extrabold text-[#033e74]">{m.val}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={`space-y-5 ${s.flip ? "lg:order-1" : ""} mt-8 lg:mt-0`}>
        <span className="text-[#20b2aa] text-xs font-extrabold uppercase tracking-[0.3em]">{s.tag}</span>
        <h3 className="text-2xl lg:text-3xl font-extrabold text-[#033e74] leading-tight">{s.title}</h3>
        <div className="space-y-3">
          {s.body.map((p, pi) => <p key={pi} className="text-slate-600 text-sm leading-relaxed">{p}</p>)}
        </div>
        <div className="w-10 h-0.5 bg-[#20b2aa] rounded-full" />
      </div>
    </div>
  );
}

const certifications = [
  { name: "CE", desc: "European Conformity — meets EU safety, health & environmental protection standards across all product categories.", icon: "🇪🇺" },
  { name: "IEC 62619", desc: "International standard for safety requirements of secondary lithium cells and batteries for use in industrial applications.", icon: "⚡" },
  { name: "UN 38.3", desc: "United Nations transport testing for lithium batteries across all modes: air, sea and road freight logistics.", icon: "🌍" },
  { name: "CB Scheme", desc: "International electrotechnical safety certification accepted in 50+ countries by national certification bodies.", icon: "🏅" },
  { name: "IP65 / IP67", desc: "Dust-tight and water-resistant enclosures for outdoor solar farms, monsoon-season rooftops and coastal environments.", icon: "🛡️" },
  { name: "MSDS", desc: "Material Safety Data Sheet — complete chemical safety documentation for every LiFePO4 cell grade we produce.", icon: "📋" },
];

const stages = [
  {
    tag: "Stage 01",
    title: "Grade-A LiFePO4 Cell Sorting",
    body: [
      "We source exclusively Grade-A Lithium Iron Phosphate cells from tier-1 suppliers. B-grade or reconditioned cells are never used in any MYZO product.",
      "Each incoming cell undergoes individual internal resistance measurement (< 0.5 mΩ tolerance), open-circuit voltage check (± 2 mV band), and weight verification before being batched into matched groups.",
      "Our precision matching algorithm groups cells within ±0.3% capacity tolerance — eliminating the weakest-link effect that limits most competitor packs.",
    ],
    img: "/quality-cell-v5.png",
    imgAlt: "LiFePO4 cell grading and matching process",
    metrics: [{ label: "Tolerance Band", val: "±0.3%" }, { label: "Reject Rate", val: "< 0.8%" }],
  },
  {
    tag: "Stage 02",
    title: "Automated BMS Calibration & EOL Testing",
    body: [
      "After final assembly, every MYZO battery pack is connected to our End-of-Line (EOL) tester for a full 100% inspection before shipment.",
      "The BMS firmware is flashed, calibrated and validated: overvoltage cutoff, undervoltage protection, short-circuit response time, temperature probe accuracy, and SoC estimation error are all verified against our spec sheets.",
      "Pass/fail results and telemetry calibration coefficients are cryptographically signed and stored per serial number for lifetime warranty tracking.",
    ],
    img: "/quality-bms-v5.png",
    imgAlt: "End-of-line BMS calibration station",
    metrics: [{ label: "Coverage", val: "100%" }, { label: "Parameters Checked", val: "24+" }],
    flip: true,
  },
  {
    tag: "Stage 03",
    title: "Thermal Stress & Cycle Life Validation",
    body: [
      "Random samples from each production lot are placed in environmental test chambers and cycled at 45°C and -10°C to simulate India's most extreme seasons.",
      "Pack thermal imaging detects hotspot formation caused by uneven current distribution. Packs with a hotspot delta above 3°C are flagged for teardown analysis.",
      "Our independent lab-validated 11,000-cycle claim is backed by accelerated aging data — not marketing projections — ensuring real-world performance.",
    ],
    img: "/quality-thermal-v5.png",
    imgAlt: "Environmental chamber thermal stress testing",
    metrics: [{ label: "Validated Cycles", val: "11,000+" }, { label: "Temperature Range", val: "-10 to 55°C" }],
  },
  {
    tag: "Stage 04",
    title: "Chemical Safety & Hazardous Material Audit",
    body: [
      "Before any batch ships, our quality team conducts a material audit cross-referencing the chemical composition against our MSDS and IEC 62619 requirements.",
      "Electrolyte composition, cathode material, and separator grade are independently verified via third-party mass spectrometry on quarterly production audits.",
      "Every shipment includes a full traceability report linking each pack's serial number to its cell batch, production shift, and quality gate timestamps.",
    ],
    img: "/reliability-enclosure-v5.png",
    imgAlt: "Battery cabinet enclosure and fault protection system",
    metrics: [{ label: "Standards Met", val: "6 Global" }, { label: "Audit Frequency", val: "Quarterly" }],
    flip: true,
  },
];

export default function Quality() {
  const [heroRef, heroInView] = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [certRef, certInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center">
        <img
          src="/hero-quality-v5.png"
          alt="MYZO Quality Control Laboratory"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "heroZoom 20s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div
          ref={heroRef}
          className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-40 transition-all duration-1200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#20b2aa]" />
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">MYZO QUALITY ASSURANCE</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Quality Is Not<br />a Feature —<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-teal-300">
                It's a Standard
              </span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10">
              Every MYZO battery pack passes a rigorous 4-stage quality gate — from Grade-A cell sorting to international certification — before it reaches your site.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/products" className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a938c] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-teal-500/30 text-sm">
                View Certified Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-sm backdrop-blur-sm">
                Request Quality Report
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#20b2aa] to-transparent" />
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <section ref={statsRef} className="py-16 bg-[#011d37] border-y border-[#20b2aa]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#20b2aa 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            { val: 11000, suffix: "+", label: "Validated Charge Cycles" },
            { val: 100, suffix: "%", label: "End-of-Line Tested" },
            { val: 6, suffix: "", label: "International Certifications" },
            { val: 99, suffix: ".8%", label: "First-Pass Yield Rate" },
          ].map((s, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-black text-white mb-1">
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUALITY STAGES ── */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-28">
          <div className="text-center">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">Precision Engineering</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Our 4-Stage Quality Gate</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-[#20b2aa] to-[#033e74] rounded-full mx-auto mt-5" />
          </div>
          {stages.map((s, idx) => <StageRow key={idx} s={s} />)}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section ref={certRef} className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#20b2aa]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#033e74]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative">
          <div className={`text-center mb-16 transition-all duration-1000 ${certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">Global Standards</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">International Certifications</h2>
            <p className="mt-4 text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              MYZO batteries carry the world's most demanding safety and quality certifications — earned through independent lab testing, not self-declaration.
            </p>
            <div className="w-14 h-1 bg-gradient-to-r from-[#20b2aa] to-[#033e74] rounded-full mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((c, i) => (
              <div
                key={i}
                className={`group bg-white border border-slate-200 hover:border-[#20b2aa] rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <div className="text-3xl mb-4">{c.icon}</div>
                <div className="text-2xl font-extrabold text-[#033e74] mb-2 group-hover:text-[#20b2aa] transition-colors duration-300">{c.name}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                <div className="mt-4 w-6 h-0.5 bg-[#20b2aa] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#011d37]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#20b2aa 1px, transparent 1px), linear-gradient(90deg, #20b2aa 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#20b2aa]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#033e74]/30 rounded-full blur-3xl" />
        <div className={`max-w-4xl mx-auto px-6 text-center relative transition-all duration-1000 ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#20b2aa]/10 border border-[#20b2aa]/30">
            <div className="w-2 h-2 rounded-full bg-[#20b2aa] animate-pulse" />
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Certified. Tested. Trusted.</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
            Every Battery. Every Time.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-teal-300">No Exceptions.</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed mb-10">
            Our certifications aren't just badges — they're proof that every MYZO pack has survived the world's toughest electrochemical and safety tests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/products" className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a938c] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-teal-500/30 text-sm">
              Explore Certified Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-sm">
              Request Lab Report
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
      `}</style>
    </div>
  );
}
