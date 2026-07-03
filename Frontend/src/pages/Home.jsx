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
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8eef7] rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div
          ref={MyzoAboutRef}
          className={`max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${MyzoAboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Left – Content */}
          <div className="space-y-6">
            <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 bg-[#e8eef7] rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#033e74] animate-pulse" />
              About Myzo Battery
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Lucknow's Pioneer in{" "}
              <span className="text-[#033e74] relative inline-block">
                Lithium-Ion
                <span className="absolute bottom-1 left-0 w-full h-1 bg-teal-300 rounded-full opacity-70" />
              </span>{" "}
              Power Backup
            </h2>
            <div className="w-14 h-1 bg-[#033e74] rounded-full" />
            <p className="text-slate-600 text-base leading-relaxed">
              <strong className="text-slate-800">Myzo Battery</strong> is a Lucknow-based company transforming the power backup industry with advanced lithium-ion battery technology. Our batteries replace traditional inverter systems by offering faster charging, longer lifespan, zero maintenance, and superior energy efficiency.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              With smart safety features, eco-friendly technology, and compact modern designs, Myzo Battery is committed to building a cleaner and more sustainable energy future — for homes, businesses, and solar energy applications across India.
            </p>
          </div>

          {/* Right – Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80"
                alt="Solar Energy Storage"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011d37]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-2 flex-wrap">
                  {["Lithium-Ion Tech", "Zero Maintenance", "12-Year Life"].map((tag) => (
                    <span key={tag} className="text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#033e74] text-white rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-lg font-black">10+</p>
              <p className="text-[10px] uppercase tracking-wider text-white/70">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────── */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8 relative">
          <div
            ref={prodRef}
            className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 transition-all duration-1000 ${prodInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#20b2aa]" /> Our Product Line
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Products</h2>
              <p className="text-slate-500 text-sm max-w-xl">
                From portable power stations to large-scale energy storage systems — explore our complete range of advanced lithium battery solutions built for every need.
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
            {batteryProducts.map((p, i) => {
              const specs = Object.entries(p.specs);
              const visibleSpecs = specs.slice(0, 3);
              const hiddenSpecs = specs.slice(3);

              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group ${prodInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{ transitionDelay: `${i * 130 + 150}ms`, transitionDuration: "700ms" }}
                >
                  <div className="h-48 overflow-visible relative bg-slate-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 opacity-90"
                      style={{ filter: "blur(6px) brightness(0.75)", transform: "scale(1.03)" }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "12px",
                        width: "118px",
                        textAlign: "center",
                        padding: "4px 0",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: "#fff",
                        background: "linear-gradient(90deg, #ff6a00, #ee0979)",
                        transform: "rotate(25deg)",
                        boxShadow: "0 2px 10px rgba(238,9,121,0.25)",
                        zIndex: 30,
                      }}
                    >
                      ⚡ COMING SOON
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">{p.type}</p>
                      <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#033e74] transition-colors duration-300">{p.name}</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>
                    </div>
                    <div className="border-t border-slate-200/70 pt-3">
                      <ul className="space-y-1.5">
                        {visibleSpecs.map(([key, val]) => (
                          <li key={key} className="flex justify-between text-[11px] text-slate-600">
                            <span className="capitalize text-slate-400">{key.replace(/([A-Z])/g, " $1")}</span>
                            <span className="font-semibold text-right">{val}</span>
                          </li>
                        ))}
                      </ul>
                      {hiddenSpecs.length > 0 && (
                        <div className="relative mt-3 rounded-2xl overflow-hidden border border-slate-200/70">
                          <div className="grid grid-cols-2 gap-3 p-3 blur-[3px] select-none pointer-events-none">
                            {hiddenSpecs.map(([key, val], index) => (
                              <div key={index} className="rounded-2xl bg-slate-100/80 p-3">
                                <div className="text-[10px] text-slate-500 uppercase tracking-[0.18em] mb-1">{key.replace(/([A-Z])/g, " $1")}</div>
                                <div className="text-xs font-semibold text-slate-600">{'█'.repeat(Math.min(val.length, 10))}</div>
                              </div>
                            ))}
                          </div>
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center px-3 text-center text-[11px] text-slate-500 font-semibold">
                            Full details show after launch
                          </div>
                        </div>
                      )}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ── Why Choose Myzo Battery
      ══════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#20b2aa_0%,_transparent_40%)] opacity-[0.05] pointer-events-none" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#033e74]/8 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
          <div
            ref={whyRef}
            className={`grid lg:grid-cols-[1.1fr_0.9fr] items-end gap-8 transition-all duration-1000 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#033e74]" /> The Myzo Advantage <span className="w-8 h-px bg-[#033e74]" />
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why India Chooses Myzo Battery</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                Reliable backup, long life, and simple ownership — designed to make everyday power more dependable.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20b2aa]/10 text-[#20b2aa] text-lg">
                  ⚡
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Cleaner energy, smarter backup</p>
                  <p className="text-xs text-slate-500">Built for modern homes and businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {whyChooseData.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-md cursor-default ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} text-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Manufacturing ─────────── */}
      <section className="py-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute -right-32 top-10 w-96 h-96 bg-[#033e74]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-64 h-64 bg-[#20b2aa]/5 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={aboutRef}
          className={`max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center transition-all duration-1000 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Left - Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Myzo Advanced Lithium-ion Testing Line"
                className="w-full h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011d37] via-[#011d37]/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex gap-6 justify-between text-white">
                  <div>
                    <p className="text-2xl font-black text-[#20b2aa]">350+ MWh</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-300">Annual Plant Capacity</p>
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <p className="text-2xl font-black text-white">6000+</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-300">LFP Cycle Lifespan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#20b2aa] text-white rounded-2xl px-5 py-3 shadow-lg text-sm font-bold">
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
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_#033e74_0%,_transparent_60%)] opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
          <div
            ref={divRef}
            className={`max-w-3xl mx-auto text-center space-y-3 transition-all duration-1000 ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#20b2aa]" /> Our Specializations <span className="w-8 h-px bg-[#20b2aa]" />
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Focused Expertise Across Every Battery Solution</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              From compact backup packs to large-scale energy storage systems, we bring deep engineering focus to every stage of battery development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {engineeringDivisions.map((d, i) => (
              <div
                key={d.title}
                className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-sm cursor-default ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${d.icon_bg}`}>
                  {d.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800">{d.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Advantages ─────────── */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#033e74]/25 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#20b2aa]/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative space-y-8">
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
                className={`p-8 bg-white/[0.04] border border-white/10 rounded-3xl space-y-4 hover:bg-white/[0.08] transition-all duration-500 group cursor-default ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 150 + 200}ms`, transitionDuration: "700ms" }}
              >
                <div className={`w-11 h-11 rounded-xl border ${t.color} flex items-center justify-center transition-all duration-300`}>
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

      {/* ── Vision & Mission Redesign ─────────────── */}
      <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-100/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-100/60 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#033e74 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left side: Heading and Stats/Purpose details */}
            <div
              ref={visionRef}
              className={`lg:col-span-5 space-y-8 transition-all duration-1000 ${visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 bg-[#e8eef7] border border-[#033e74]/20 rounded-full inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#033e74] animate-pulse" />
                  Our Core Purpose
                </span>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  Shaping the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Sustainable Power</span>
                </h2>
                <p className="text-slate-500 text-base leading-relaxed">
                  We are driven by a singular commitment: to replace inefficient, high-maintenance energy systems with smart, clean lithium technology.
                </p>
              </div>

              {/* Mini-grid of stats/commitments */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <h4 className="text-3xl font-extrabold text-slate-900">100%</h4>
                  <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Clean Tech Focused</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-[#033e74]">Zero</h4>
                  <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Maintenance Hassle</p>
                </div>
              </div>
            </div>

            {/* Right side: Vision & Mission Cards */}
            <div
              ref={missionRef}
              className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${missionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              {/* Vision Card */}
              <div className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-teal-400/60 hover:shadow-lg transition-all duration-500">
                <div className="absolute top-0 right-8 w-24 h-24 bg-teal-100/50 rounded-full blur-2xl group-hover:bg-teal-200/60 transition-all duration-500" />
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 text-2xl group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-500 shadow-inner">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Our Vision</span>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                      Leading India toward a smarter, cleaner energy future.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      We envision a world where energy dependency is decentralized, reliable, and ecologically sound. By engineering intelligent, high-density energy storage, we make zero-emission backup possible for every home, business, and utility-scale grid.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-400/60 hover:shadow-lg transition-all duration-500">
                <div className="absolute top-0 right-8 w-24 h-24 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/60 transition-all duration-500" />
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500 shadow-inner">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Mission</span>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                      Delivering power that is reliable, sustainable, and zero-hassle.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Our mission is to replace high-cost, high-emission, lead-acid inverter systems with advanced, zero-maintenance lithium-ion batteries. We achieve this through precision cell-matching, in-house BMS design, and an unwavering commitment to safe, reliable manufacturing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner (Original) ─────────── */}
      <section
        ref={ctaRef}
        className="py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#033e74]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#20b2aa]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#033e74]/40 rounded-full blur-3xl" />
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
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
