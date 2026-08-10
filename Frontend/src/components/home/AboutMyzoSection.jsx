import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const TEAL = "#20b2aa";

const quickFacts = [
  {
    title: "In-House BMS",
    desc: "Custom firmware engineered end-to-end, not outsourced.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>
    ),
  },
  {
    title: "Lucknow Engineered",
    desc: "Designed, tested and certified from our own facility.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    title: "Zero Maintenance",
    desc: "Sealed lithium packs — no water top-ups, no acid checks.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /></svg>
    ),
  },
  {
    title: "Decade of Trust",
    desc: "10+ years engineering energy storage for Indian conditions.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

export default function AboutMyzoSection() {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#011d37" }}>
      <img src="/OfficeImage.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" />
      <div ref={ref} className="relative max-w-[1220px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: TEAL }}>
            In India, For India
          </span>
          <h2 className="text-[32px] leading-[38px] md:text-[40px] md:leading-[46px] font-bold text-white mb-5">
            About Myzo
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Myzo Battery</strong> is a Lucknow-based Battery Energy Storage System (BESS) company transforming the power backup industry with advanced lithium-ion technology — faster charging, longer lifespan, zero maintenance, and superior energy efficiency.
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            Backed by an in-house engineered Battery Management System and rigorously tested for India's toughest conditions, every Myzo product is built to be intelligent, durable, and dependable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-block font-bold rounded px-6 py-3 border-2 border-white bg-white text-[#033e74] hover:bg-transparent hover:text-white transition-colors w-fit"
            >
              About Us
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center font-bold rounded px-6 py-3 border-2 border-white/30 text-white hover:border-white transition-colors w-fit"
            >
              View Products
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: "150ms" }}
        >
          {quickFacts.map((f) => (
            <div key={f.title} className="border border-white/15 rounded-lg p-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${TEAL}26`, color: TEAL }}>
                {f.icon}
              </div>
              <div className="text-white font-bold text-sm mb-1">{f.title}</div>
              <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
