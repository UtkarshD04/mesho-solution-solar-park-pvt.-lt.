import { useState, useEffect, useRef } from "react";
import Hero from "../components/ui/Hero";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   Custom Hook: useInView – fires once when
   element enters the viewport
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Animated Counter component
───────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const batteryProducts = [
  {
    id: "bess-container-heavy",
    name: "Myzo Megawatt Container BESS",
    type: "Utility & Grid-Scale Storage",
    description: "Pre-engineered IP65 container solutions with liquid-cooling, fire suppression, and integrated high-voltage BMS.",
    specs: { capacity: "500 kWh – 3.2 MWh", chemistry: "High-grade LFP (LiFePO4)", thermalManagement: "Liquid Cooling System", rackConfiguration: "17S Series Racks", certifications: "UL 9540A, IEC 62619" },
    image: "https://media.gettyimages.com/id/1228786679/photo/a-worker-controls-batteries-in-an-electricity-storage-container-on-september-29-2020-in.jpg?s=612x612&w=0&k=20&c=4urkGvcKoTiwkkoN-P7Rt4aTJZz0ywUk03tMIxphPDY=",
    tag: "Grid-Scale",
    color: "from-blue-600 to-blue-900",
  },
  {
    id: "rack-telecom",
    name: "Myzo LFP Smart Rack Module",
    type: "C&I & Telecom Backup",
    description: "Standardized rack-mountable modules ideal for UPS, microgrids, telecom towers, and data centers.",
    specs: { nominalVoltage: "51.2 V", nominalCapacity: "100 Ah (5.12 kWh)", maxParallelUnits: "Up to 32 modules", interface: "CAN, RS485, Modbus TCP", cycleLife: "6000+ Cycles @ 80% DoD" },
    image: "https://media.gettyimages.com/id/1820451738/photo/lithium-ion-battery-pack-structure-for-electric-vehicles.jpg?s=612x612&w=0&k=20&c=ou_aQH0yXxAaS7OLSXvULJdLR9F_c_7IZX6vJj3J84Y=",
    tag: "Best Seller",
    color: "from-teal-500 to-teal-800",
  },
  {
    id: "lowtemp-pack",
    name: "Myzo Extreme Temp Arctic Pack",
    type: "Sub-Zero Temperature Storage",
    description: "Engineered with integrated heating film to allow charging and discharging in extreme sub-zero conditions.",
    specs: { operatingTemp: "-35°C to +55°C", integratedHeater: "Smart BMS Controlled (120W)", voltages: "12V / 24V / 48V packs", cycleLife: "4000+ Cycles in cold climates", enclosureClass: "IP66 Sealed Aluminum" },
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
    tag: "Low-Temp Tech",
    color: "from-sky-500 to-sky-900",
  },
  {
    id: "wall-ess",
    name: "Myzo Slimline Wall ESS",
    type: "Residential & Small Commercial",
    description: "Ultra-slim wall-mounted lithium energy storage units designed to provide reliable backup for offices and homes.",
    specs: { capacity: "10.24 kWh / 15.36 kWh", batteryVoltage: "51.2 V", widthDepth: "Slim profile (175mm thickness)", coolingType: "Natural Convection", scalability: "Parallel connection up to 8" },
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    tag: "Sleek ESS",
    color: "from-violet-600 to-violet-900",
  },
];

const statsData = [
  { label: "Annual Plant Capacity", value: 350, suffix: "+ MWh", icon: "⚡" },
  { label: "LFP Cycle Lifespan", value: 6000, suffix: "+", icon: "🔋" },
  { label: "Cities Served", value: 6, suffix: "+", icon: "📍" },
  { label: "Years of Expertise", value: 10, suffix: "+", icon: "🏭" },
];

const engineeringDivisions = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Utility BESS Containers",
    desc: "Walk-in ISO containers featuring automated liquid thermal management, clean fire containment grids, and internal climate sensors for multi-MW power station storage.",
    bg: "bg-blue-50", icon_bg: "bg-blue-100 text-blue-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: "Commercial Server Racks",
    desc: "High-density 48V LFP rack cabinets with integrated CAN/RS485 communication protocols, configured for seamless telecom station backup and commercial UPS rigs.",
    bg: "bg-emerald-50", icon_bg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Custom EV Pack Assembly",
    desc: "Precision cell testing, sorting, matching, and resistance grading. Spot-welding of high-capacity cells tailored for utility vehicles, electric machinery, and custom industrial loads.",
    bg: "bg-orange-50", icon_bg: "bg-orange-100 text-orange-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "BMS Development",
    desc: "Custom firmware deployment for cell balancing, voltage checking, smart thermal loops, and real-time remote telemetry mapping via Cloud IoT connection.",
    bg: "bg-purple-50", icon_bg: "bg-purple-100 text-purple-600",
  },
];

/* ── NEW: Why Choose Myzo Battery Data ── */
const whyChooseData = [
  {
    icon: "⚡",
    title: "4X Faster Charging",
    desc: "18A fast charging current gets you from empty to full in approximately 4 hours — 4 times faster than traditional inverter batteries.",
    color: "bg-amber-50 border-amber-100 hover:border-amber-300",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: "🔋",
    title: "12-Year Lifespan",
    desc: "Built with advanced lithium-ion chemistry that outlasts conventional lead-acid batteries by up to 3x, delivering consistent performance year after year.",
    color: "bg-teal-50 border-teal-100 hover:border-teal-300",
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    icon: "🛠️",
    title: "Zero Maintenance",
    desc: "No water top-ups, no acid checks, no terminal cleaning. Myzo batteries are completely sealed and maintenance-free from day one.",
    color: "bg-blue-50 border-blue-100 hover:border-blue-300",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: "🌿",
    title: "Eco-Friendly",
    desc: "No acid fumes, no toxic emissions, and a significantly smaller carbon footprint. Myzo batteries are designed for a cleaner, greener India.",
    color: "bg-emerald-50 border-emerald-100 hover:border-emerald-300",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: "🖥️",
    title: "LCD + LED Smart Display",
    desc: "Real-time charge status, battery health, and power metrics at a glance — engineered for complete visibility and intelligent management.",
    color: "bg-violet-50 border-violet-100 hover:border-violet-300",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    icon: "🏠",
    title: "Compact & Modern Design",
    desc: "Slim, lightweight form factor that fits any home or office without the bulk of conventional inverter systems. Built to complement modern interiors.",
    color: "bg-rose-50 border-rose-100 hover:border-rose-300",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

/* ── NEW: Li-Pro Product Specs ── */
const liProSpecs = [
  { label: "Capacity", value: "1000 VA" },
  { label: "Inbuilt Battery", value: "1280 Wh Li-Ion" },
  { label: "Lifespan", value: "Up to 12 Years" },
  { label: "Charging Current", value: "18A Fast Charge" },
  { label: "Full Charge Time", value: "~4 Hours" },
  { label: "Maintenance", value: "Zero" },
  { label: "Display", value: "LCD + LED Smart" },
  { label: "Emissions", value: "No Acid / No Fumes" },
  { label: "Technology", value: "Eco-Friendly Li-Ion" },
  { label: "Design", value: "Compact & Modern" },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Home() {
  const [aboutRef, aboutInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [divRef, divInView] = useInView();
  const [prodRef, prodInView] = useInView();
  const [techRef, techInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  /* NEW refs */
  const [MyzoAboutRef, MyzoAboutInView] = useInView();
  const [whyRef, whyInView] = useInView();
  const [liProRef, liProInView] = useInView();
  const [visionRef, visionInView] = useInView();
  const [missionRef, missionInView] = useInView();
  const [finalCtaRef, finalCtaInView] = useInView();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── Hero Slider ─────────────────── */}
      <Hero />

      {/* ── Animated Stats Bar ──────────── */}
      <section className="bg-[#011d37] text-white py-10 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-80 h-80 bg-[#20b2aa]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-[#033e74]/30 rounded-full blur-3xl" />
        </div>
        <div
          ref={statsRef}
          className={`max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 relative transition-all duration-1000 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {statsData.map((s, i) => (
            <div
              key={s.label}
              className="text-center group cursor-default"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <p className="text-3xl lg:text-4xl font-black text-[#20b2aa] tabular-nums tracking-tight">
                {statsInView ? <AnimatedCounter target={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── About Myzo Battery (Company)
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute -right-32 top-10 w-96 h-96 bg-[#20b2aa]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 bg-[#033e74]/4 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={MyzoAboutRef}
          className={`max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${MyzoAboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Left – Content */}
          <div className="space-y-7">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-[#20b2aa]/10 rounded-full inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20b2aa] animate-pulse" />
              About Myzo Battery
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Lucknow's Pioneer in{" "}
              <span className="text-[#033e74] relative inline-block">
                Lithium-Ion
                <span className="absolute bottom-0.5 left-0 w-full h-0.5 bg-[#20b2aa] rounded-full" />
              </span>{" "}
              Power Backup
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              <strong className="text-slate-800">Myzo Battery</strong> is a Lucknow-based company transforming the power backup industry with advanced lithium-ion battery technology. Our batteries are designed to replace traditional inverter systems by offering faster charging, longer lifespan, zero maintenance, and superior energy efficiency.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              With smart safety features, eco-friendly technology, and compact modern designs, Myzo Battery is committed to building a cleaner and more sustainable energy future — for homes, businesses, and solar energy applications across India.
            </p>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { icon: "🏙️", title: "Lucknow HQ", sub: "Made in India" },
                { icon: "☀️", title: "Solar Ready", sub: "Integrated Support" },
                { icon: "🔒", title: "Smart Safety", sub: "Built-In Protection" },
                { icon: "🌱", title: "Zero Emissions", sub: "No Acid Fumes" },
              ].map((b, i) => (
                <div
                  key={b.title}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-[#20b2aa]/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{b.title}</h4>
                    <p className="text-[11px] text-slate-500">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[#20b2aa]/20 pointer-events-none" style={{ animation: "spin 25s linear infinite" }} />
            <div className="relative bg-[#011d37] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Myzo Battery – Lithium Power Backup"
                className="w-full h-80 object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011d37] via-[#011d37]/50 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                <div className="flex gap-3 flex-wrap">
                  {["Lithium-Ion Tech", "Zero Maintenance", "12-Year Life"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold bg-[#20b2aa]/20 text-[#20b2aa] border border-[#20b2aa]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  Replacing outdated inverter systems with smarter, cleaner, and more sustainable energy — one home at a time.
                </p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#033e74] text-white rounded-2xl px-4 py-3 shadow-xl shadow-blue-900/30 text-sm font-bold" style={{ animation: "float 3s ease-in-out infinite" }}>
              🇮🇳 Made in India
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── Why Choose Myzo Battery
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#20b2aa_0%,_transparent_60%)] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
          {/* Heading */}
          <div
            ref={whyRef}
            className={`max-w-2xl mx-auto text-center space-y-4 transition-all duration-1000 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#033e74]" /> The Myzo Advantage <span className="w-8 h-px bg-[#033e74]" />
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why India Chooses Myzo Battery</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every feature is engineered to outperform traditional inverter systems — making your power backup smarter, safer, and more sustainable.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseData.map((item, i) => (
              <div
                key={item.title}
                className={`p-6 ${item.color} rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group cursor-default space-y-4 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-[#033e74] transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                <div className="h-0.5 bg-gradient-to-r from-[#033e74] to-[#20b2aa] rounded-full w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── Myzo Li-Pro Product Highlight
      ══════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute -right-20 top-20 w-80 h-80 bg-[#033e74]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section Label */}
          <div
            ref={liProRef}
            className={`mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 transition-all duration-1000 ${liProInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-3">
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#20b2aa]" /> Flagship Product
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Introducing Myzo Li-Pro</h2>
              <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
                An advanced lithium-ion inverter battery solution engineered for uninterrupted power backup and maximum efficiency — built for modern Indian homes and businesses.
              </p>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-2 text-white bg-[#033e74] hover:bg-[#022d55] font-bold text-sm tracking-wider uppercase px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shrink-0"
            >
              <span>View All Products</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Product Layout */}
          <div
            className={`grid lg:grid-cols-12 gap-10 items-stretch transition-all duration-1000 ${liProInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Left: Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#011d37] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group h-full min-h-[400px] flex flex-col justify-end relative">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
                  alt="Myzo Li-Pro Lithium Inverter Battery"
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011d37] via-[#011d37]/60 to-transparent" />
                <div className="relative z-10 p-7 space-y-3">
                  <span className="bg-[#20b2aa] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block">
                    Flagship Model
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">Myzo Li-Pro</h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Advanced Lithium-Ion Inverter Battery — 1000VA | 1280Wh | 12-Year Lifespan
                  </p>
                  <div className="flex gap-3 flex-wrap pt-1">
                    {["Zero Maintenance", "No Fumes", "Fast Charge"].map((t) => (
                      <span key={t} className="text-[10px] font-bold bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Specs + Features */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {/* Specs Table Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#20b2aa] inline-block" />
                  Technical Specs
                </h4>
                <ul className="space-y-2.5">
                  {liProSpecs.map(({ label, value }) => (
                    <li key={label} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-400 font-medium">{label}</span>
                      <span className="font-bold text-slate-800 text-right">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Highlights Stack */}
              <div className="space-y-4">
                {[
                  {
                    icon: "⚡",
                    title: "4X Faster Charging",
                    desc: "Full charge in ~4 hours with 18A fast charging — back to full power before you know it.",
                    border: "border-amber-100 hover:border-amber-300 bg-amber-50",
                  },
                  {
                    icon: "🔋",
                    title: "1280Wh Powerhouse",
                    desc: "Substantial energy reserve to keep your home or office running reliably through extended outages.",
                    border: "border-teal-100 hover:border-teal-300 bg-teal-50",
                  },
                  {
                    icon: "🛡️",
                    title: "Smart BMS Protection",
                    desc: "Intelligent battery management with overcharge, over-discharge, and short-circuit protection built in.",
                    border: "border-blue-100 hover:border-blue-300 bg-blue-50",
                  },
                  {
                    icon: "☀️",
                    title: "Solar Compatible",
                    desc: "Seamlessly integrates with rooftop solar panels for an off-grid or hybrid clean energy setup.",
                    border: "border-emerald-100 hover:border-emerald-300 bg-emerald-50",
                  },
                ].map((f, i) => (
                  <div
                    key={f.title}
                    className={`flex gap-4 p-4 ${f.border} rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-default`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 group-hover:text-[#033e74] transition-colors duration-300">{f.title}</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}

                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 w-full bg-[#033e74] hover:bg-[#022d55] text-white text-sm font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get a Quote
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Manufacturing ─────────── */}
      <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute -right-32 top-10 w-96 h-96 bg-[#033e74]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-64 h-64 bg-[#20b2aa]/5 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={aboutRef}
          className={`max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center transition-all duration-1000 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Left - Visual */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[#033e74]/15 pointer-events-none" style={{ animation: "spin 20s linear infinite" }} />
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Myzo Advanced Lithium-ion Testing Line"
                className="w-full h-80 object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011d37] via-[#011d37]/60 to-transparent" />
              <div className="absolute inset-0 bg-[#20b2aa]/0 group-hover:bg-[#20b2aa]/5 transition-all duration-700" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex gap-6 justify-between text-white">
                  <div className="group/stat">
                    <p className="text-2xl font-black text-[#20b2aa] group-hover/stat:scale-110 transition-transform inline-block">350+ MWh</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-300">Annual Plant Capacity</p>
                  </div>
                  <div className="border-l border-white/20 pl-6 group/stat">
                    <p className="text-2xl font-black text-white group-hover/stat:scale-110 transition-transform inline-block">6000+</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-300">LFP Cycle Lifespan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#20b2aa] text-white rounded-2xl px-5 py-3 shadow-xl shadow-teal-500/30 text-sm font-bold" style={{ animation: "float 3s ease-in-out infinite" }}>
              ⚡ ISO Certified Plant
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-[#033e74]/10 rounded-full inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#033e74] animate-pulse" />
              Advanced Battery Manufacturer
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              High-Performance{" "}
              <span className="text-[#033e74] relative">
                Lithium Iron Phosphate
                <span className="absolute bottom-0.5 left-0 w-full h-0.5 bg-[#20b2aa] rounded-full" />
              </span>{" "}
              &amp; BESS Solutions
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              <strong>Myzo Solution Solar Park Pvt. Ltd. (Myzo)</strong> is a state-of-the-art manufacturer of advanced energy storage systems. We build high-density lithium battery enclosures engineered specifically for heavy industrial peak-shaving, microgrid integration, and critical infrastructure backup.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Unlike general installers, we are dedicated battery manufacturers. We handle custom cell sorting, automated laser tab-welding, proprietary BMS configuration, and high-voltage climate testing at our production facilities.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {[
                { icon: "🔩", title: "Precision Laser", sub: "Zero Resistance Tabs", color: "bg-blue-50 border-blue-100 hover:border-blue-300" },
                { icon: "🖥️", title: "Custom BMS", sub: "Proprietary Telemetry", color: "bg-teal-50 border-teal-100 hover:border-teal-300" },
                { icon: "🏅", title: "ISO Standards", sub: "Fully Certified Plant", color: "bg-emerald-50 border-emerald-100 hover:border-emerald-300" },
              ].map((b, i) => (
                <div
                  key={b.title}
                  className={`flex items-center gap-3 p-3 ${b.color} rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl">{b.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{b.title}</h4>
                    <p className="text-[11px] text-slate-500">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Divisions ────────── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_#033e74_0%,_transparent_60%)] opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
          <div
            ref={divRef}
            className={`max-w-2xl mx-auto text-center space-y-4 transition-all duration-1000 ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#20b2aa]" /> Our Specializations <span className="w-8 h-px bg-[#20b2aa]" />
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lithium Battery Engineering Divisions</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We design, assemble, compile, and distribute specialized battery enclosures from the cell level to complete megawatt containers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringDivisions.map((d, i) => (
              <div
                key={d.title}
                className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 text-left space-y-4 cursor-default ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 120 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`w-12 h-12 rounded-xl ${d.icon_bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {d.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#033e74] transition-colors duration-300">{d.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{d.desc}</p>
                <div className="h-0.5 bg-gradient-to-r from-[#033e74] to-[#20b2aa] rounded-full w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12 relative">
          <div
            ref={prodRef}
            className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 transition-all duration-1000 ${prodInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#20b2aa]" /> Our Product Line
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Advanced LFP Enclosures &amp; Cabinets</h2>
              <p className="text-slate-500 text-sm max-w-xl">
                Explore our battery configurations, custom-built inside our certified plants for maximum lifecycle safety.
              </p>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-2 text-white bg-[#033e74] hover:bg-[#022d55] font-bold text-sm tracking-wider uppercase px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shrink-0"
            >
              <span>View All Products</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batteryProducts.map((p, i) => (
              <div
                key={p.id}
                className={`bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group hover:-translate-y-2 ${prodInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 130 + 150}ms`, transitionDuration: "700ms" }}
              >
                <div className="h-48 overflow-hidden relative bg-slate-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <span className="absolute top-3 left-3 bg-[#033e74] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
                    {p.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">{p.type}</p>
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#033e74] transition-colors duration-300">{p.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                  <div className="border-t border-slate-200/70 pt-3">
                    <ul className="space-y-1.5">
                      {Object.entries(p.specs).map(([key, val]) => (
                        <li key={key} className="flex justify-between text-[11px] text-slate-600">
                          <span className="capitalize text-slate-400">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-semibold text-right">{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-1">
                    <Link
                      to="/contact"
                      className="w-full bg-[#033e74]/5 hover:bg-[#033e74] hover:text-white text-[#033e74] text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-300 block text-center border border-[#033e74]/15 hover:border-[#033e74] hover:shadow-lg hover:shadow-[#033e74]/20"
                    >
                      Inquire Specs →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Advantages ─────────── */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#033e74]/25 rounded-full blur-[100px]" style={{ animation: "pulse 4s ease-in-out infinite" }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#20b2aa]/10 rounded-full blur-[80px]" style={{ animation: "pulse 6s ease-in-out infinite reverse" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative space-y-14">
          <div
            ref={techRef}
            className={`max-w-2xl mx-auto text-center space-y-4 transition-all duration-1000 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#20b2aa]" /> Technology Focus <span className="w-8 h-px bg-[#20b2aa]" />
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">The LFP Powerhouse Advantage</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We pack every storage solution with industrial-grade fail-safes, active balancing BMS chips, and custom busbar assembly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>),
                color: "text-[#20b2aa] bg-[#20b2aa]/10 border-[#20b2aa]/30",
                glow: "hover:shadow-[0_0_40px_#20b2aa20]",
                title: "3-Tier Smart Active BMS",
                desc: "Monitors single cell voltage, temperature, and internal resistance. Balances cells actively up to 2A, mitigating risk of thermal runaway and balancing capacity degradation dynamically.",
              },
              {
                icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>),
                color: "text-sky-400 bg-sky-400/10 border-sky-400/30",
                glow: "hover:shadow-[0_0_40px_#38bdf820]",
                title: "Grade-A LFP Chemistry",
                desc: "Utilizing strictly Grade-A cells from certified tier-1 manufacturers. Inherent chemical stability yields up to 6000 cycles at 80% Depth of Discharge without losing structural integrity.",
              },
              {
                icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>),
                color: "text-violet-400 bg-violet-400/10 border-violet-400/30",
                glow: "hover:shadow-[0_0_40px_#a78bfa20]",
                title: "Pre-Integrated Thermal Plates",
                desc: "Specialized heating modules enable stable charging/discharging down to -35°C. Optimized cooling channels support high c-rate loads during high ambient temperature up to 55°C.",
              },
            ].map((t, i) => (
              <div
                key={t.title}
                className={`p-8 bg-white/[0.04] border border-white/10 rounded-3xl space-y-4 hover:bg-white/[0.08] transition-all duration-500 group cursor-default ${t.glow} ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 150 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`w-11 h-11 rounded-xl border ${t.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {t.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
          </div>

          <div
            className={`bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#20b2aa]/30 hover:bg-white/[0.07] transition-all duration-500 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms", transitionDuration: "700ms" }}
          >
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white">System Architecture &amp; Communications</h4>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                Every BESS system links via CAN/RS485/Modbus protocol, transmitting cell telemetry directly to local SCADA controls or remote IoT cloud analytics.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap justify-center">
              {["Modbus TCP", "CANbus", "IoT Cloud", "RS485"].map((label, i) => (
                <span
                  key={label}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[#20b2aa] hover:border-[#20b2aa]/50 hover:text-white transition-all duration-300 cursor-default hover:scale-105"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── Vision & Mission
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#20b2aa_0%,_transparent_50%)] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#033e74_0%,_transparent_50%)] opacity-[0.04] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
          {/* Section Label */}
          <div
            ref={visionRef}
            className={`max-w-2xl mx-auto text-center space-y-4 transition-all duration-1000 ${visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#033e74]" /> Our Purpose <span className="w-8 h-px bg-[#033e74]" />
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vision &amp; Mission</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Driving India's transition to smarter, cleaner, and more reliable energy — guided by a clear purpose and unwavering commitment.
            </p>
          </div>

          {/* Vision + Mission Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div
              className={`relative bg-gradient-to-br from-[#011d37] to-[#033e74] rounded-3xl p-10 overflow-hidden group cursor-default transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "200ms" }}
            >
              {/* Glow blob */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#20b2aa]/15 rounded-full blur-3xl group-hover:bg-[#20b2aa]/25 transition-all duration-700 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#20b2aa]/20 border border-[#20b2aa]/30 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    🔭
                  </div>
                  <div>
                    <p className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Our Vision</p>
                    <h3 className="text-xl font-extrabold text-white">Leading Lithium Innovation</h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  To become a leading force in lithium battery innovation by replacing outdated inverter systems with smarter, cleaner, and more sustainable energy solutions.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  We envision a future where every home, office, and business has access to reliable, maintenance-free power backed by advanced lithium technology.
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-white/50 text-xs leading-relaxed italic">
                    "Contributing to environmental sustainability, energy efficiency, and technological advancement for future generations."
                  </p>
                </div>

                {/* Vision Pillars */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { icon: "🌱", label: "Sustainability" },
                    { icon: "⚡", label: "Innovation" },
                    { icon: "🚀", label: "Growth" },
                  ].map((p) => (
                    <div key={p.label} className="bg-white/[0.07] rounded-xl p-3 text-center hover:bg-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 cursor-default">
                      <div className="text-xl mb-1">{p.icon}</div>
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission */}
            <div
              ref={missionRef}
              className={`bg-slate-50 border border-slate-100 rounded-3xl p-10 group cursor-default hover:shadow-xl hover:-translate-y-1 transition-all duration-500 space-y-6 ${missionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#033e74]/10 border border-[#033e74]/20 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  🎯
                </div>
                <div>
                  <p className="text-[#033e74] text-xs font-bold uppercase tracking-widest">Our Mission</p>
                  <h3 className="text-xl font-extrabold text-slate-900">Powering India. Sustainably.</h3>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our mission is to provide innovative, high-performance lithium battery solutions that deliver reliable backup power, exceptional durability, and sustainable energy efficiency.
              </p>

              {/* Mission Points */}
              <div className="space-y-3 pt-2">
                {[
                  { icon: "🏆", text: "Delivering world-class lithium battery technology." },
                  { icon: "🌿", text: "Providing maintenance-free and eco-friendly power solutions." },
                  { icon: "🏠", text: "Supporting residential, commercial, and solar energy sectors." },
                  { icon: "🤝", text: "Building strong customer trust through quality and innovation." },
                  { icon: "🇮🇳", text: "Promoting clean energy adoption across India." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-[#20b2aa]/30 hover:shadow-sm transition-all duration-300 hover:-translate-x-0.5 cursor-default"
                    style={{ transitionDelay: `${i * 60 + 400}ms` }}
                  >
                    <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Animated bottom border */}
              <div className="h-1 bg-gradient-to-r from-[#033e74] via-[#20b2aa] to-[#033e74] rounded-full w-0 group-hover:w-full transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner (Original) ─────────── */}
      <section
        ref={ctaRef}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#033e74]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#20b2aa]/15 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#033e74]/40 rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out infinite reverse" }} />
        </div>

        <div
          className={`max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10 relative transition-all duration-1000 ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Ready to Power Up?</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Need custom battery sizing or <br className="hidden md:block" />
              <span className="text-[#20b2aa]">proprietary BMS configuration?</span>
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
              Get in touch with our cell testing and production engineers to customize pack shapes, high-discharge rates, or utility BESS parameters.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 bg-[#20b2aa] hover:bg-[#1a948e] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 text-sm"
            >
              Contact Engineering
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:-translate-y-0.5 text-sm backdrop-blur-sm"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── Final Myzo Battery CTA
      ══════════════════════════════════════ */}
      <section
        ref={finalCtaRef}
        className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#20b2aa_0%,_transparent_70%)] opacity-[0.04] pointer-events-none" />

        <div
          className={`max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-8 transition-all duration-1000 ${finalCtaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="space-y-4">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 justify-center">
              <span className="w-8 h-px bg-[#20b2aa]" /> Switch to Lithium Today <span className="w-8 h-px bg-[#20b2aa]" />
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ready to Upgrade to{" "}
              <span className="text-[#033e74] relative inline-block">
                Myzo Li-Pro?
                <span className="absolute bottom-0.5 left-0 w-full h-0.5 bg-[#20b2aa] rounded-full" />
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
              Join thousands of homes and businesses across India making the switch to zero-maintenance, eco-friendly lithium power backup. Faster charging, longer life, zero hassle.
            </p>
          </div>

          {/* Quick Specs Strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {["1000VA Capacity", "1280Wh Battery", "12-Year Life", "18A Fast Charge", "Zero Maintenance", "No Acid Fumes"].map((spec, i) => (
              <span
                key={spec}
                className="text-xs font-bold bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-full hover:border-[#20b2aa]/50 hover:text-[#033e74] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                ✓ {spec}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 bg-[#033e74] hover:bg-[#022d55] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 text-sm"
            >
              Get a Free Quote
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#033e74] font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-slate-200 hover:border-[#033e74]/30 hover:-translate-y-0.5 text-sm"
         >
              Explore Li-Pro
            </Link>
          </div>

          {/* Trust Line */}
          <p className="text-slate-400 text-xs">
            🔋 Advanced Lithium Technology &nbsp;·&nbsp; 🌿 Eco-Friendly &nbsp;·&nbsp; 🇮🇳 Made in India &nbsp;·&nbsp; 🛡️ Smart BMS Protected
          </p>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(4px); }
          66% { transform: translateY(6px) translateX(-4px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
