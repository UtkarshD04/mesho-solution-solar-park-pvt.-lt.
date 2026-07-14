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

const pillars = [
  { icon: "⚡", title: "LiFePO4 Cell Chemistry", desc: "We use Grade-A Lithium Iron Phosphate cells — the safest, most stable lithium chemistry available. No thermal runaway, no toxic gases, no compromise." },
  { icon: "🔋", title: "11,000+ Cycle Life", desc: "Our batteries are engineered to last over 11,000 charge-discharge cycles at 70% State of Health — that's 30+ years of daily use." },
  { icon: "🛡️", title: "Advanced BMS", desc: "Every unit ships with a multi-layer Battery Management System that monitors cell voltage, temperature, current, and SOC in real time." },
  { icon: "☀️", title: "Smart MPPT Integration", desc: "Our all-in-one systems feature 99.5% efficient MPPT solar charge controllers, maximising every watt your panels produce." },
  { icon: "📡", title: "Multi-Protocol Communication", desc: "CAN, RS485, RS232, Ethernet — our batteries speak every language your inverter or EMS needs for seamless smart-grid integration." },
  { icon: "🌡️", title: "Wide Temperature Range", desc: "Engineered to charge from 0°C and discharge down to -20°C, our batteries perform reliably in Indian summers and Himalayan winters alike." },
];

export default function Technology() {
  const [heroRef, heroInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── Hero Image ── */}
      <div className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden">
        <img src="/hero1.jpg" alt="Technology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div
          ref={heroRef}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#20b2aa]/20 border border-[#20b2aa]/60 text-[#20b2aa] text-xs font-bold uppercase tracking-widest mb-5">
            Why Myzo → Technology
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Built on <span className="text-[#20b2aa]">Next-Gen</span><br />Technology
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Every Myzo product is engineered from the cell up — using the world's most advanced battery technology to deliver power you can depend on.
          </p>
        </div>
      </div>

      {/* ── Pillars Grid ── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #dff0f0 0%, #e8f4f8 40%, #d4eaf0 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#20b2aa 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div
          ref={gridRef}
          className={`max-w-7xl mx-auto px-6 lg:px-16 relative transition-all duration-1000 ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-14">
            <div className="w-10 h-1 bg-[#20b2aa] rounded-full mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 leading-snug">
              What Makes Our{" "}
              <span className="font-extrabold text-slate-900">Technology Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-7 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#20b2aa]/10 transition-all duration-500 ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#20b2aa]/40 bg-white flex items-center justify-center text-2xl mb-5 group-hover:border-[#20b2aa] group-hover:shadow-md transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#033e74] transition-colors duration-300">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#033e74]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#20b2aa]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#033e74]/40 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Powered by Innovation</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mt-3 mb-4">
            Technology That Works While You Sleep
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            From portable power stations to 112kWh industrial systems — Myzo technology scales with your energy needs.
          </p>
          <a href="/products" className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a948e] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 text-sm">
            Explore Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  );
}
