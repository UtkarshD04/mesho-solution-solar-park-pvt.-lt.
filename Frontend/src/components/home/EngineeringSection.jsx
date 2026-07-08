import { Link } from "react-router-dom";

export default function EngineeringSection({ divRef, divInView, engineeringDivisions }) {
  return (
    <section
      ref={divRef}
      className="relative overflow-hidden py-20"
      style={{ background: "linear-gradient(135deg, #f0f9f9 0%, #e8f4f8 50%, #f0f4ff 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#033e74 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className={`max-w-7xl mx-auto px-6 lg:px-16 relative transition-all duration-1000 ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-light text-slate-800 leading-snug mb-14 max-w-3xl">
          Focused Expertise Across{" "}
          <span className="font-extrabold text-slate-900">Every Battery Solution</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {engineeringDivisions.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col gap-4 group transition-all duration-700 ${divInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120 + 150}ms` }}
            >
              <div className={`w-[72px] h-[72px] rounded-full border-2 border-[#20b2aa]/40 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:border-[#20b2aa] group-hover:shadow-md transition-all duration-300 shrink-0 ${item.icon_bg}`}>
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#033e74] transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#20b2aa] hover:text-[#033e74] transition-colors duration-300 group/link"
              >
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
