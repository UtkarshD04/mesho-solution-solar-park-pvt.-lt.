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

function TechPillarRow({ p }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className={`relative group ${p.flip ? "lg:order-2" : ""}`}>
        <div className="absolute -inset-4 bg-gradient-to-br from-[#20b2aa]/15 to-[#033e74]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
          <img src={p.img} alt={p.imgAlt} className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 bg-[#20b2aa] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            {p.tag}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {p.specs.map((spec, si) => (
            <div key={si} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-2 shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold leading-tight">{spec.label}</span>
              <span className="text-xs font-extrabold text-[#033e74] text-right">{spec.val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`space-y-6 ${p.flip ? "lg:order-1" : ""}`}>
        <div>
          <span className="text-[#20b2aa] text-xs font-extrabold uppercase tracking-[0.3em]">{p.tag}</span>
          <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-[#033e74] leading-tight">{p.title}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-400 italic">{p.subtitle}</p>
        </div>
        <div className="space-y-4">
          {p.body.map((t, ti) => (
            <div key={ti} className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#20b2aa] flex-shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
        <div className="w-10 h-0.5 bg-[#20b2aa] rounded-full" />
      </div>
    </div>
  );
}

const techPillars = [
  {
    tag: "Technology 01",
    title: "Active Cell Balancing BMS",
    subtitle: "Proprietary Charge Transfer Architecture",
    body: [
      "Conventional battery management uses passive balancing — dissipating excess cell charge as heat through bleed resistors. This wastes energy, generates unwanted heat, and does nothing to improve weaker cells.",
      "MYZO's custom BMS employs an active balancing topology using bi-directional DC-DC converters between cell groups. This actively transfers stored charge from higher-voltage cells to lower-voltage cells during every cycle — increasing total usable energy by 10–12% over the pack lifetime.",
      "Our BMS firmware runs a real-time Kalman filter for State-of-Charge (SoC) estimation with < 2% error — far exceeding the 5–8% error typical of standard coulomb-counting BMS implementations.",
    ],
    img: "/tech-balancer-v5.png",
    imgAlt: "Active balancing BMS printed circuit board",
    specs: [
      { label: "SoC Accuracy", val: "< 2%" },
      { label: "Capacity Gain", val: "+10–12%" },
      { label: "Balance Current", val: "2A per cell" },
      { label: "Protection Layers", val: "5 hardware + software" },
    ],
  },
  {
    tag: "Technology 02",
    title: "Universal Multi-Protocol Gateway",
    subtitle: "CAN · RS485 · Modbus · Ethernet",
    body: [
      "Smart energy storage lives or dies on communication. A battery that can't talk to your inverter, EMS or cloud platform is just a black box. MYZO batteries ship with a fully integrated communication gateway as standard — not as an add-on.",
      "Supported protocols include: CAN 2.0B (automotive-grade, 1Mbit/s), RS485 Modbus RTU for legacy solar controllers, RS232 for industrial PLCs, and 10/100 Ethernet for direct IP-based integration with modern EMS platforms.",
      "Pre-configured device profiles are available for Growatt, Deye, Sungrow, Victron, Voltronic, and SolarEdge inverters — reducing installation from hours to minutes. Custom profiles can be uploaded via USB-C in the field.",
    ],
    img: "/tech-comm-v5.png",
    imgAlt: "Multi-protocol gateway communication ports and circuit board",
    specs: [
      { label: "Protocols", val: "CAN / RS485 / RS232" },
      { label: "Ethernet", val: "10/100 Mbps" },
      { label: "Pre-built Profiles", val: "50+ inverter brands" },
      { label: "Config Method", val: "USB-C / OTA" },
    ],
    flip: true,
  },
  {
    tag: "Technology 03",
    title: "Real-Time Cloud Telemetry & Diagnostics",
    subtitle: "Wi-Fi · GSM · Secure Cloud Dashboard",
    body: [
      "MYZO packs integrate dual-channel wireless modules — Wi-Fi 802.11b/g/n for site-local connectivity and 4G GSM as a fallback — enabling continuous telemetry even in rural installations with no wired infrastructure.",
      "The cloud dashboard records individual cell voltages, temperatures, and current with 1-second sampling resolution. Predictive algorithms flag cells drifting beyond ±3% of the pack mean and alert owners before a protection event is triggered.",
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Customers access their system health via a branded web and mobile portal. Engineers can push firmware updates, configure protection thresholds, and pull diagnostic dumps over the air.",
    ],
    img: "/tech-telemetry-v5.png",
    imgAlt: "Cloud analytics dashboard showing cell-level telemetry",
    specs: [
      { label: "Connectivity", val: "Wi-Fi + 4G GSM" },
      { label: "Sample Rate", val: "1-second" },
      { label: "Data Encryption", val: "TLS 1.3 / AES-256" },
      { label: "OTA Updates", val: "Supported" },
    ],
  },
  {
    tag: "Technology 04",
    title: "Smart MPPT Solar Integration",
    subtitle: "Dual-Channel Maximum Power Point Tracking",
    body: [
      "MYZO hybrid inverter systems feature dual-string MPPT controllers with an input range of 100–500V and up to 98.6% peak conversion efficiency. The dual-channel design allows independent optimisation of two differently-oriented PV arrays on the same inverter.",
      "Our perturb-and-observe MPPT algorithm samples array IV characteristics every 50ms — tracking panel output changes caused by passing clouds or morning ramp-up 30× faster than typical 1.5-second interval controllers.",
      "Anti-islanding, PV arc-fault detection, and ground fault monitoring are integrated into the MPPT controller — meeting all requirements of IEEE 1547 and IEC 61727 for grid-connected PV systems.",
    ],
    img: "/tech-chip-v5.png",
    imgAlt: "MPPT solar controller chip and power electronics close-up",
    specs: [
      { label: "MPPT Efficiency", val: "98.6%" },
      { label: "Track Speed", val: "50ms" },
      { label: "Voltage Range", val: "100–500V" },
      { label: "Channels", val: "Dual-string" },
    ],
    flip: true,
  },
];

const innovations = [
  { icon: "🔬", title: "Cell-Level Monitoring", desc: "Each cell's voltage and temperature sampled at 1Hz — not just pack-level averages." },
  { icon: "🤖", title: "AI Degradation Model", desc: "Machine-learning model predicts pack capacity fade 90 days in advance based on cycling patterns." },
  { icon: "🔐", title: "Cryptographic Serial Numbers", desc: "Every pack carries a hardware security module (HSM) signed identity — counterfeit-proof for warranty." },
  { icon: "📲", title: "OTA Firmware Updates", desc: "Security patches and performance improvements pushed wirelessly — no service visit required." },
  { icon: "🌐", title: "Open API Integration", desc: "REST API available for EMS vendors, building automation systems, and energy aggregators." },
  { icon: "⚙️", title: "Modular Architecture", desc: "Rack units stack in parallel with automatic current sharing — scale from 5kWh to 500kWh without reconfiguration." },
];

export default function Technology() {
  const [heroRef, heroInView] = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [innovRef, innovInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center">
        <img
          src="/hero-technology-v5.png"
          alt="MYZO Advanced Battery Technology"
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
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">MYZO PROPRIETARY TECHNOLOGY</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              The Science<br />Behind Every<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-teal-300">
                MYZO Cell
              </span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
              Four proprietary hardware and software innovations — active balancing, multi-protocol gateways, real-time telemetry, and dual-MPPT — engineered to work as one seamless system.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/products" className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a938c] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-teal-500/30 text-sm">
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-sm backdrop-blur-sm">
                Request Tech Datasheet
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
            { val: 98, suffix: ".6%", label: "MPPT Efficiency" },
            { val: 50, suffix: "ms", label: "MPPT Track Speed" },
            { val: 50, suffix: "+", label: "Compatible Inverters" },
            { val: 4, suffix: " Cores", label: "Proprietary Technologies" },
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

      {/* ── TECH PILLARS ── */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-32">
          <div className="text-center">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.3em]">Proprietary IP</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Four Core Technologies</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-[#20b2aa] to-[#033e74] rounded-full mx-auto mt-5" />
          </div>

          {techPillars.map((p, idx) => <TechPillarRow key={idx} p={p} />)}
        </div>
      </section>




      <style>{`
        @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.5); } }
      `}</style>
    </div>
  );
}
