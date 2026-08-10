import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const ACCENT = "#033e74";

const heroStats = [
  { value: "350+", unit: "MWh", label: "Annual Plant Capacity" },
  { value: "30,000+", unit: "Cycles", label: "LFP Cycle Lifespan" },
  { value: "10+", unit: "Years", label: "Years of Expertise" },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [statsRef, statsInView] = useInView(0.3);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white">
      {/* HERO — split, text left / angled video right, larger scale than interior pages */}
      <section className="md:flex md:items-stretch bg-white relative pt-28 md:pt-28 lg:pt-40">
        <div
          className="md:w-1/2 px-6 pb-16 md:pb-20 md:pl-16 lg:px-12 lg:pb-28 flex flex-col justify-center transition-all duration-1000"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-5" style={{ color: ACCENT }}>
            In India, For India
          </span>
          <h1 className="text-[38px] leading-[44px] md:text-[56px] md:leading-[62px] font-bold text-gray-900 mb-6">
            India's Battery Energy Storage System (BESS) Company
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-xl">
            Myzo builds next-generation{" "}
            <Link to="/technology" className="font-medium underline" style={{ color: ACCENT }}>Battery Energy Storage Systems (BESS)</Link>{" "}
            engineered for India's grid — industrial-grade LFP batteries built for zero downtime, backed by a decade of{" "}
            <Link to="/products" className="font-medium underline" style={{ color: ACCENT }}>proven products</Link>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-block font-bold rounded px-7 py-3.5 border-2 transition-colors"
              style={{ backgroundColor: ACCENT, borderColor: ACCENT, color: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = "#fff"; }}
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="inline-block font-bold rounded px-7 py-3.5 border-2 transition-colors"
              style={{ borderColor: ACCENT, color: ACCENT }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = ACCENT; }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative overflow-hidden min-h-[280px] md:min-h-[540px] lg:min-h-[620px] bg-[#e8f2fa] md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
          <video
            src="/video2.mp4"
            poster="/hero1.png"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Covers the AI-generation watermark baked into the video's bottom-right corner */}
          <div className="absolute bottom-0 right-10 z-10 bg-white/95 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-md">
            <img src="/logo.png" alt="Myzo" className="h-5 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* STATS STRIPE — signature homepage element, not used on interior pages */}
      <section className="bg-[#f1f1f1] py-10">
        <div ref={statsRef} className="max-w-[1220px] mx-auto px-4 sm:px-6 grid grid-cols-3 gap-y-8">
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className="text-center transition-all duration-700"
              style={{ opacity: statsInView ? 1 : 0, transform: statsInView ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-[28px] md:text-[36px] font-bold leading-none" style={{ color: ACCENT }}>
                {s.value} <span className="text-[14px] font-semibold text-gray-500">{s.unit}</span>
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
