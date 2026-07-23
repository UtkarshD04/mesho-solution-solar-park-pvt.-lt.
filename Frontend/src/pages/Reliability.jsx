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

function PillarRow({ p }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className={`relative group ${p.flip ? "lg:order-2" : ""}`}>
        <div className="absolute -inset-3 bg-gradient-to-br from-[#20b2aa]/15 to-[#033e74]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
          <img src={p.img} alt={p.imgAlt} className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 bg-[#20b2aa] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            {p.tag}
          </div>
        </div>
        <div className="absolute -bottom-5 left-8 right-8 flex gap-3">
          {p.metrics.map((m, mi) => (
            <div key={mi} className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-center shadow-lg">
              <div className="text-xl font-extrabold text-[#033e74]">{m.val}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={`space-y-5 ${p.flip ? "lg:order-1" : ""} mt-8 lg:mt-0`}>
        <span className="text-[#20b2aa] text-xs font-extrabold uppercase tracking-[0.3em]">{p.tag}</span>
        <h3 className="text-2xl lg:text-3xl font-extrabold text-[#033e74] leading-tight">{p.title}</h3>
        <div className="space-y-3">
          {p.body.map((t, ti) => <p key={ti} className="text-slate-600 text-sm leading-relaxed">{t}</p>)}
        </div>
        <div className="w-10 h-0.5 bg-[#20b2aa] rounded-full" />
      </div>
    </div>
  );
}

const pillars = [
  {
    tag: "Pillar 01",
    title: "IP65–IP67 Sealed Steel Enclosures",
    body: [
      "MYZO enclosures are fabricated from 1.2mm cold-rolled steel, powder-coated with a UV-stable marine-grade finish. Each seam is laser-welded — not glued — ensuring zero electrolyte vapour egress under pressure.",
      "Our IP67-rated units withstand continuous dust ingress and short-term water immersion up to 1 metre. Battery walls sustain impacts up to 9J without cell exposure — verified by IEC 62619 mechanical abuse tests.",
      "Thermal break gaskets at the lid interface prevent condensation migration, protecting BMS electronics from humid monsoon environments that plague conventional VRLA and open-cell lithium systems.",
    ],
    img: "/reliability-uptime-v5.png",
    imgAlt: "IP67 steel battery enclosure in outdoor installation",
    metrics: [{ val: "IP67", label: "Ingress Rating" }, { val: "1.2mm", label: "Steel Wall" }],
  },
  {
    tag: "Pillar 02",
    title: "Industrial Laser-Welded Bus Bars",
    body: [
      "Cell-to-cell connections in MYZO packs use precision-cut nickel-plated copper bus bars joined by fibre laser welding — a method common in automotive and aerospace manufacturing, but rare in the energy storage industry.",
      "Compared to ultrasonic spot welds used by low-cost competitors, our laser welds exhibit 95%+ weld pull strength, contact resistance below 0.05 mΩ, and no micro-crack propagation under vibration — critical for installations on rooftops or near heavy machinery.",
      "Each weld is individually inspected by automated optical inspection (AOI) systems, and batch samples undergo destructive tensile testing monthly.",
    ],
    img: "/reliability-weld-v5.png",
    imgAlt: "Laser welding bus bars on battery cell stack",
    metrics: [{ val: "95%+", label: "Weld Strength" }, { val: "<0.05mΩ", label: "Contact R" }],
    flip: true,
  },
  {
    tag: "Pillar 03",
    title: "Active Thermal Management System",
    body: [
      "Uncontrolled temperature differentials between cells are the silent killer of battery lifespan. MYZO packs integrate a dual-zone thermal management layer with ceramic-filled thermal interface material (TIM) between all cell groups.",
      "Our BMS monitors up to 16 individual cell temperatures simultaneously, activating internal airflow or optional liquid-cooling modules when any cell deviates beyond 3°C from the group mean.",
      "In addition, every pack ships with passive heater foils for cold-climate markets where charge efficiency below 0°C drops sharply. This ensures our guaranteed cycle life holds from Rajasthan deserts to Kashmir hillsides.",
    ],
    img: "/reliability-thermal-v5.png",
    imgAlt: "Thermal imaging camera scan showing cell temperature uniformity",
    metrics: [{ val: "±3°C", label: "Temp Delta" }, { val: "16", label: "Temp Probes" }],
  },
  {
    tag: "Pillar 04",
    title: "Multi-Layer Fault Protection Architecture",
    body: [
      "MYZO's protection architecture is layered in depth — no single point of failure can compromise the pack. Software limits in the BMS are backed by independent hardware fuses, and hardware fuses are backed by a mechanical pressure relief vent.",
      "Protections include: cell-level overvoltage (> 3.65V), pack undervoltage (< 2.5V), overcurrent (hardware cutoff at 2.5×C), short-circuit response time < 200µs, and thermal runaway containment via intumescent cell separators.",
      "Critical fault logs are stored in non-volatile memory with timestamps. These logs can be extracted remotely via our cloud dashboard or via USB-C service port — enabling accurate warranty assessments and root-cause analysis.",
    ],
    img: "/quality-lab-v5.png",
    imgAlt: "BMS fault protection architecture diagram",
    metrics: [{ val: "<200µs", label: "Short Circuit" }, { val: "5-Layer", label: "Protection" }],
    flip: true,
  },
];

const reliabilityMetrics = [
  { icon: "🔋", title: "15-Year Design Life", desc: "Engineered for a minimum 15-year field lifespan at 1 cycle per day in typical Indian climate conditions." },
  { icon: "🌡️", title: "-10°C to +55°C", desc: "Operational in full charging mode across the widest temperature band of any commercial LiFePO4 pack in India." },
  { icon: "🌊", title: "IP67 Waterproofing", desc: "Complete dust-tight, water-immersion-resistant enclosures rated for outdoor placement in all-weather environments." },
  { icon: "📡", title: "Remote Fault Alerts", desc: "Proactive cloud-based health alerts notify owners of anomalies before they escalate to failure events." },
  { icon: "⚡", title: "200µs Short-Circuit Response", desc: "Hardware-level cutoff detects and isolates shorts before any cell or external component is stressed." },
  { icon: "🔩", title: "Vibration & Shock Rated", desc: "Meets IEC 62619 mechanical shock and vibration test spec — suitable for mobile and rooftop deployments." },
];

export default function Reliability() {
  const [heroRef, heroInView] = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [metricsRef, metricsInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center">
        <img
          src="/hero-reliability-v5.png"
          alt="MYZO Industrial Reliability Testing"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "heroZoom 20s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Floating badge top-right */}
        <div className="absolute top-10 right-10 hidden lg:flex items-center gap-3 bg-white/8 border border-white/15 backdrop-blur-md rounded-2xl px-5 py-4">
          <div className="w-10 h-10 rounded-full bg-[#20b2aa]/20 flex items-center justify-center text-lg">🛡️</div>
          <div>
            <div className="text-white text-xs font-bold">IEC 62619 Certified</div>
            <div className="text-white/50 text-[10px]">Industrial Safety Standard</div>
          </div>
        </div>

        <div
          ref={heroRef}
          className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-40 transition-all duration-1200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#20b2aa]" />
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">MYZO RELIABILITY ENGINEERING</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Built to Endure<br />India's Harshest<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-teal-300">
                Conditions
              </span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
              From laser-welded bus bars to IP67 enclosures, every structural and electronic decision in a MYZO pack is made for one reason — to never fail in the field.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/products" className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a938c] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-teal-500/30 text-sm">
                View All Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-sm backdrop-blur-sm">
                Talk to an Engineer
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
            { val: 15, suffix: " Yr", label: "Design Lifespan" },
            { val: 11000, suffix: "+", label: "Cycle Validated" },
            { val: 200, suffix: "µs", label: "Short-Circuit Response" },
            { val: 5, suffix: " Layer", label: "Fault Protection" },
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

      {/* ── RELIABILITY PILLARS ── */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-28">
          <div className="text-center">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">Structural Integrity</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Four Pillars of MYZO Reliability</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-[#20b2aa] to-[#033e74] rounded-full mx-auto mt-5" />
          </div>

          {pillars.map((p, idx) => <PillarRow key={idx} p={p} />)}
        </div>
      </section>




      <style>{`
        @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
      `}</style>
    </div>
  );
}
