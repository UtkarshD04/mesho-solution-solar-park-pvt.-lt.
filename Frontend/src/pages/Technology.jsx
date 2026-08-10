import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const TEAL = "#20b2aa";
const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

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
      "MYZO hybrid inverter systems feature dual-string MPPT controllers with an input range of 100–500V and up to 98.6% peak conversion efficiency. The dual-channel design allows independent optimization of two differently oriented PV arrays on the same inverter.",
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
  const [innovRef, innovInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      <SEO
        title="Technology"
        description="Explore the technology behind Myzo's battery systems — advanced cell chemistry, smart BMS, and innovative energy storage engineering."
        path="/technology"
      />

      {/* ── HERO — contained image card ── */}
      <section className="bg-white pt-24 md:pt-24 lg:pt-36 pb-14">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            ref={heroRef}
            className="relative rounded-lg overflow-hidden transition-all duration-1000"
            style={{ boxShadow: CARD_SHADOW, opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(16px)" }}
          >
            <img
              src="/hero-technology-v5.png"
              alt="MYZO Advanced Battery Technology"
              className="w-full h-[440px] md:h-[520px] object-cover"
              style={{ animation: "heroZoom 20s ease-in-out infinite alternate" }}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 md:p-12 max-w-2xl">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: TEAL }}>
                  Myzo Proprietary Technology
                </span>
                <h1 className="text-[32px] leading-[38px] md:text-[44px] md:leading-[50px] font-bold text-white mb-5">
                  The Science Behind Every Myzo Cell
                </h1>
                <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                  Four proprietary hardware and software innovations — active balancing, multi-protocol gateways, real-time telemetry, and dual-MPPT — engineered to work as one seamless system.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 font-bold rounded px-6 py-3 border-2 transition-colors text-sm"
                    style={{ backgroundColor: TEAL, borderColor: TEAL, color: "#fff" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = TEAL; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TEAL; e.currentTarget.style.color = "#fff"; }}
                  >
                    Explore Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-bold rounded px-6 py-3 border-2 border-white/50 text-white hover:bg-white/10 transition-colors text-sm"
                  >
                    Request Tech Datasheet
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
