import { Link } from "react-router-dom";

export default function WhyChooseSection({ whyRef, whyInView, whyChooseData }) {
  return (
    <section
      ref={whyRef}
      className="relative overflow-hidden py-12"
      style={{ background: "linear-gradient(135deg, #dff0f0 0%, #e8f4f8 40%, #d4eaf0 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(#20b2aa 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className={`max-w-7xl mx-auto px-6 lg:px-16 relative transition-all duration-1000 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-light text-slate-800 leading-snug mb-8 max-w-3xl">
          Why Choose{" "}
          <span className="font-extrabold text-slate-900">Myzo Battery</span>{" "}
          for Your Energy Needs?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {whyChooseData.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col gap-3 group transition-all duration-700 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120 + 150}ms` }}
            >
              <div className={`w-[72px] h-[72px] rounded-full border-2 border-[#20b2aa]/40 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:border-[#20b2aa] group-hover:shadow-md transition-all duration-300 shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#033e74] transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#20b2aa] hover:text-[#033e74] transition-colors duration-300 group/link">
                Read More
                <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
