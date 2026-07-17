import { Link } from "react-router-dom";

const homeProducts = [
  {
    id: 1,
    series: "LIGHT Series",
    model: "MyzoEE 1",
    tagline: "Compact portable power for everyday home backup.",
    comingSoon: true,
    image: "https://picsum.photos/seed/battery1/600/400",
    highlights: [
      { icon: "🔋", label: "1004.8 Wh" },
      { icon: "♻️", label: "11,000 Cycles" },
      { icon: "🛡", label: "Smart BMS" },
      { icon: "⚡", label: "200W Output" },
    ],
  },
  {
    id: 2,
    series: "LIGHT Series",
    model: "MyzoEE LIGHT 1",
    tagline: "Plug and play power, anywhere you need it.",
    comingSoon: true,
    image: "https://picsum.photos/seed/battery2/600/400",
    highlights: [
      { icon: "🔋", label: "1004.8 Wh" },
      { icon: "♻️", label: "11,000 Cycles" },
      { icon: "🛡", label: "Smart BMS" },
      { icon: "⚡", label: "500W Output" },
    ],
  },
  {
    id: 3,
    series: "LIGHT Series",
    model: "MyzoEE 2",
    tagline: "Double the power, double the peace of mind.",
    comingSoon: true,
    image: "https://picsum.photos/seed/battery3/600/400",
    highlights: [
      { icon: "🔋", label: "2009.6 Wh" },
      { icon: "♻️", label: "11,000 Cycles" },
      { icon: "🛡", label: "Smart BMS" },
      { icon: "⚡", label: "1000W Output" },
    ],
  },
  {
    id: 4,
    series: "MaxPower Series",
    model: "MaxPower 8 AIO",
    tagline: "All-in-one residential energy storage system.",
    comingSoon: true,
    image: "https://picsum.photos/seed/battery4/600/400",
    highlights: [
      { icon: "🔋", label: "8038 Wh" },
      { icon: "♻️", label: "11,000 Cycles" },
      { icon: "🛡", label: "Smart BMS" },
      { icon: "⚡", label: "5000W" },
    ],
  },
];

export default function ProductShowcase() {
  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#F8FAFC" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #20b2aa18 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#20b2aa]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B3C5D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 space-y-14 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-[#20b2aa]" />
              <span className="text-[#20b2aa] text-[11px] font-bold uppercase tracking-[0.3em]">Our Product Line</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Our <span className="text-[#0B3C5D]">Product</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
              From portable power stations to industrial-grade energy storage — engineered for every scale.
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-[#0B3C5D] hover:bg-[#20b2aa] text-white text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0"
          >
            View All Products
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeProducts.map((p) => {
            const isComingSoon = p.comingSoon;

            return (
              <div
                key={p.id}
                className="group relative flex flex-col rounded-[24px] overflow-hidden bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(32,178,170,0.15)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Top glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#20b2aa] via-[#0B3C5D] to-[#20b2aa] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Image Area */}
                <div className="relative h-56 overflow-hidden rounded-t-[24px]">
                  <img
                    src={p.image}
                    alt={p.model}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/1e293b/20b2aa?text=${encodeURIComponent(p.model)}`; }}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isComingSoon ? "blur-sm brightness-75" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Wishlist top-right */}
                  <button className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200 group/heart">
                    <svg className="w-4 h-4 text-slate-300 group-hover/heart:text-rose-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Coming Soon ribbon */}
                  {isComingSoon && (
                    <div className="absolute top-6 -right-7 w-32 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest text-center py-1.5 rotate-45 shadow-lg z-20 pointer-events-none">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] text-[#20b2aa] uppercase tracking-[0.22em] font-bold">{p.series}</p>
                    <h3 className="text-base font-black text-slate-900 mt-0.5 group-hover:text-[#0B3C5D] transition-colors duration-300">{p.model}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{p.tagline}</p>
                  </div>

                  {/* Spec Pills */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {p.highlights.map((h) => (
                      <div key={h.label} className="flex items-center gap-1.5 bg-slate-50 hover:bg-[#20b2aa]/5 rounded-xl px-2.5 py-1.5 transition-colors duration-200">
                        <span className="text-sm leading-none">{h.icon}</span>
                        <span className="text-[10px] font-semibold text-slate-600 leading-tight">{h.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto pt-2 flex items-center gap-2">
                    {isComingSoon ? (
                      <button disabled className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-[0.1em] py-2.5 rounded-full cursor-not-allowed">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Coming Soon
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/products"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-[#0B3C5D] hover:bg-[#20b2aa] text-white text-[11px] font-bold uppercase tracking-[0.1em] py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                        >
                          View Details
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <button className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#20b2aa]/10 border border-slate-200 hover:border-[#20b2aa]/40 flex items-center justify-center transition-all duration-200 shrink-0" title="Compare">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
