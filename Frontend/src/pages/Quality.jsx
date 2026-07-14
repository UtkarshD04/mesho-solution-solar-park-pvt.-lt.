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

const standards = [
  { step: "01", title: "Grade-A Cells Only", desc: "We source only Grade-A LiFePO4 cells — no B-grade, no refurbished. Every cell is tested before assembly." },
  { step: "02", title: "100% EOL Testing", desc: "Every finished battery undergoes End-of-Line testing: capacity check, BMS calibration, and safety scan." },
  { step: "03", title: "Thermal Stress Testing", desc: "Batteries are cycled through extreme temperatures to validate performance before leaving the factory." },
  { step: "04", title: "11,000 Cycle Validation", desc: "Our cycle-life claims are backed by independent lab testing — not marketing estimates." },
];

const certifications = [
  { name: "CE", desc: "European Conformity — meets EU safety, health & environmental standards." },
  { name: "IEC 62619", desc: "International standard for safety requirements of secondary lithium cells." },
  { name: "UN 38.3", desc: "United Nations transport testing for lithium batteries — air, sea & road." },
  { name: "CB Scheme", desc: "International electrotechnical safety certification accepted in 50+ countries." },
  { name: "IP65 / IP67", desc: "Dust-tight and water-resistant enclosures for outdoor and harsh environments." },
  { name: "MSDS", desc: "Material Safety Data Sheet — full chemical safety documentation for every cell." },
];

export default function Quality() {
  const [heroRef, heroInView] = useInView(0.1);
  const [stepsRef, stepsInView] = useInView(0.1);
  const [certRef, certInView] = useInView(0.1);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── Hero Image ── */}
      <div className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden">
        <img src="/hero2.jpg" alt="Quality" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div
          ref={heroRef}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#20b2aa]/20 border border-[#20b2aa]/60 text-[#20b2aa] text-xs font-bold uppercase tracking-widest mb-5">
            Why Myzo → Quality
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Quality is Not a Feature —<br /><span className="text-[#20b2aa]">It's a Standard</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Every Myzo battery is built, tested, and certified to the highest international standards before it reaches your hands.
          </p>
        </div>
      </div>

      {/* ── Process Steps ── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #dff0f0 0%, #e8f4f8 40%, #d4eaf0 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#20b2aa 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div
          ref={stepsRef}
          className={`max-w-7xl mx-auto px-6 lg:px-16 relative transition-all duration-1000 ${stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-14">
            <div className="w-10 h-1 bg-[#20b2aa] rounded-full mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 leading-snug">
              Our{" "}
              <span className="font-extrabold text-slate-900">Quality Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((s, i) => (
              <div
                key={i}
                className={`bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-7 flex gap-6 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#20b2aa]/10 transition-all duration-500 ${stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120 + 150}ms` }}
              >
                <div className="text-5xl font-extrabold text-[#20b2aa]/25 leading-none shrink-0 group-hover:text-[#20b2aa]/40 transition-colors duration-300">{s.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#033e74] transition-colors duration-300">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8f4f8] rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div
          ref={certRef}
          className={`max-w-7xl mx-auto px-6 lg:px-16 relative transition-all duration-1000 ${certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-14">
            <div className="w-10 h-1 bg-[#20b2aa] rounded-full mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-light text-slate-800">
              International{" "}
              <span className="font-extrabold text-slate-900">Certifications</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.map((c, i) => (
              <div
                key={i}
                className={`border border-slate-200 rounded-2xl p-6 text-center group hover:border-[#20b2aa] hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                <div className="text-2xl font-extrabold text-[#033e74] mb-3 group-hover:text-[#20b2aa] transition-colors duration-300">{c.name}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
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
          <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Certified. Tested. Trusted.</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mt-3 mb-4">
            Every Battery. Every Time. No Exceptions.
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Our certifications aren't just badges — they're proof that every Myzo battery has passed the world's toughest safety and quality tests.
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
