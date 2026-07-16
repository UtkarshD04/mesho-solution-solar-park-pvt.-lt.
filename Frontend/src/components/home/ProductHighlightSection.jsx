import { Link } from "react-router-dom";

const products = [
  {
    tag: "All-in-One Battery",
    tagColor: "bg-teal-100 text-teal-700 border-teal-200",
    accentColor: "from-teal-500 to-[#033e74]",
    borderHover: "hover:border-teal-400/60",
    iconBg: "bg-teal-50 border-teal-200 text-teal-600",
    badgeDot: "bg-teal-500",
    title: "Myzo All-in-One Smart Battery",
    subtitle: "Inverter + Battery — One Unit",
    desc: "Myzo ka All-in-One Battery system ek hi unit mein inverter aur lithium battery dono combine karta hai. Yeh lead-acid battery ka perfect replacement hai — bina maintenance ke, bina acid ke, aur bina noise ke.",
    specs: [
      { label: "Capacity", value: "100Ah / 150Ah / 200Ah" },
      { label: "Voltage", value: "12V / 24V / 48V" },
      { label: "Lifespan", value: "10–12 Years" },
      { label: "Charging Time", value: "~4 Hours (Fast Charge)" },
      { label: "Maintenance", value: "Zero — Fully Sealed" },
      { label: "Display", value: "LCD + LED Smart Panel" },
    ],
    highlights: ["Lead-Acid ka Direct Replacement", "4x Faster Charging", "Zero Maintenance", "Eco-Friendly — No Acid Fumes"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    tag: "Hybrid Inverter",
    tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    accentColor: "from-blue-500 to-[#033e74]",
    borderHover: "hover:border-blue-400/60",
    iconBg: "bg-blue-50 border-blue-200 text-blue-600",
    badgeDot: "bg-blue-500",
    title: "Myzo Hybrid Solar Inverter",
    subtitle: "Solar + Grid + Battery — Intelligent Switching",
    desc: "Myzo Hybrid Inverter solar panels, grid power aur battery teeno ko ek saath manage karta hai. Yeh automatically best power source choose karta hai — diesel generator ki zaroorat khatam karta hai aur bijli bill drastically kam karta hai.",
    specs: [
      { label: "Power Range", value: "1 kVA – 10 kVA" },
      { label: "Solar Input", value: "Up to 5000W MPPT" },
      { label: "Efficiency", value: "98% Peak Efficiency" },
      { label: "Battery Compatible", value: "Lithium / LFP / Lead-Acid" },
      { label: "Grid + Solar", value: "Simultaneous Dual Input" },
      { label: "Monitoring", value: "Wi-Fi App + LCD Display" },
    ],
    highlights: ["Diesel Generator Replace karta hai", "Solar + Grid Intelligent Switching", "Wi-Fi Remote Monitoring", "Pure Sine Wave Output"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
];

export default function ProductHighlightSection() {
  return (
    <>
      {/* ── Company Motto Banner ─────────────────── */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#011d37]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#20b2aa 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative space-y-6">
          <span className="inline-flex items-center gap-2 text-[#20b2aa] text-xs font-bold uppercase tracking-[0.25em] px-4 py-1.5 bg-[#20b2aa]/10 border border-[#20b2aa]/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#20b2aa] animate-pulse" />
            Myzo Mission
          </span>

          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Lead-Acid Battery aur Diesel Generator —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20b2aa] to-blue-400">
              Ab Purana Ho Gaya
            </span>
          </h2>

          <p className="text-white/70 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Myzo ka mission hai India ke har ghar aur business se <strong className="text-white">lead-acid batteries</strong> aur{" "}
            <strong className="text-white">diesel generators</strong> ko hamesha ke liye replace karna — clean, smart aur zero-maintenance lithium technology ke saath.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[
              { icon: "🔋", text: "Lead-Acid Replace" },
              { icon: "⚡", text: "Diesel Generator Replace" },
              { icon: "☀️", text: "Solar Ready" },
              { icon: "🌿", text: "Zero Emissions" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-sm font-semibold backdrop-blur-sm">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Details ─────────────────── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#033e74 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((p) => (
              <div
                key={p.tag}
                className={`group relative bg-white border border-slate-200 rounded-3xl p-8 ${p.borderHover} hover:shadow-xl transition-all duration-500`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r ${p.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center ${p.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {p.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{p.title}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{p.subtitle}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.desc}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {p.specs.map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.badgeDot}`} />
                      {h}
                    </div>
                  ))}
                </div>

                <Link
                  to="/products"
                  className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${p.accentColor} text-white px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}
                >
                  Details Dekhein
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
