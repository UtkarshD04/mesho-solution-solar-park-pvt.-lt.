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
      <section className="bg-white relative pt-[76px] md:pt-[76px] lg:pt-[124px]">
        {/* INDEPENDENCE DAY BORDER — wavy tricolor lines flush against the navbar, no gap */}
        <div className="w-full mb-6 md:mb-8" aria-hidden="true">
          <svg viewBox="0 0 1440 54" preserveAspectRatio="none" className="w-full h-9 md:h-11 block">
            <path d="M0,0 L20,1.5 L40,4.5 L60,6 L80,4.5 L100,1.5 L120,0 L140,1.5 L160,4.5 L180,6 L200,4.5 L220,1.5 L240,0 L260,1.5 L280,4.5 L300,6 L320,4.5 L340,1.5 L360,0 L380,1.5 L400,4.5 L420,6 L440,4.5 L460,1.5 L480,0 L500,1.5 L520,4.5 L540,6 L560,4.5 L580,1.5 L600,0 L620,1.5 L640,4.5 L660,6 L680,4.5 L700,1.5 L720,0 L740,1.5 L760,4.5 L780,6 L800,4.5 L820,1.5 L840,0 L860,1.5 L880,4.5 L900,6 L920,4.5 L940,1.5 L960,0 L980,1.5 L1000,4.5 L1020,6 L1040,4.5 L1060,1.5 L1080,0 L1100,1.5 L1120,4.5 L1140,6 L1160,4.5 L1180,1.5 L1200,0 L1220,1.5 L1240,4.5 L1260,6 L1280,4.5 L1300,1.5 L1320,0 L1340,1.5 L1360,4.5 L1380,6 L1400,4.5 L1420,1.5 L1440,0 L1440,16 L1420,17.5 L1400,20.5 L1380,22 L1360,20.5 L1340,17.5 L1320,16 L1300,17.5 L1280,20.5 L1260,22 L1240,20.5 L1220,17.5 L1200,16 L1180,17.5 L1160,20.5 L1140,22 L1120,20.5 L1100,17.5 L1080,16 L1060,17.5 L1040,20.5 L1020,22 L1000,20.5 L980,17.5 L960,16 L940,17.5 L920,20.5 L900,22 L880,20.5 L860,17.5 L840,16 L820,17.5 L800,20.5 L780,22 L760,20.5 L740,17.5 L720,16 L700,17.5 L680,20.5 L660,22 L640,20.5 L620,17.5 L600,16 L580,17.5 L560,20.5 L540,22 L520,20.5 L500,17.5 L480,16 L460,17.5 L440,20.5 L420,22 L400,20.5 L380,17.5 L360,16 L340,17.5 L320,20.5 L300,22 L280,20.5 L260,17.5 L240,16 L220,17.5 L200,20.5 L180,22 L160,20.5 L140,17.5 L120,16 L100,17.5 L80,20.5 L60,22 L40,20.5 L20,17.5 L0,16 Z" fill="#FF9933" />
            <path d="M0,16 L20,17.5 L40,20.5 L60,22 L80,20.5 L100,17.5 L120,16 L140,17.5 L160,20.5 L180,22 L200,20.5 L220,17.5 L240,16 L260,17.5 L280,20.5 L300,22 L320,20.5 L340,17.5 L360,16 L380,17.5 L400,20.5 L420,22 L440,20.5 L460,17.5 L480,16 L500,17.5 L520,20.5 L540,22 L560,20.5 L580,17.5 L600,16 L620,17.5 L640,20.5 L660,22 L680,20.5 L700,17.5 L720,16 L740,17.5 L760,20.5 L780,22 L800,20.5 L820,17.5 L840,16 L860,17.5 L880,20.5 L900,22 L920,20.5 L940,17.5 L960,16 L980,17.5 L1000,20.5 L1020,22 L1040,20.5 L1060,17.5 L1080,16 L1100,17.5 L1120,20.5 L1140,22 L1160,20.5 L1180,17.5 L1200,16 L1220,17.5 L1240,20.5 L1260,22 L1280,20.5 L1300,17.5 L1320,16 L1340,17.5 L1360,20.5 L1380,22 L1400,20.5 L1420,17.5 L1440,16 L1440,32 L1420,33.5 L1400,36.5 L1380,38 L1360,36.5 L1340,33.5 L1320,32 L1300,33.5 L1280,36.5 L1260,38 L1240,36.5 L1220,33.5 L1200,32 L1180,33.5 L1160,36.5 L1140,38 L1120,36.5 L1100,33.5 L1080,32 L1060,33.5 L1040,36.5 L1020,38 L1000,36.5 L980,33.5 L960,32 L940,33.5 L920,36.5 L900,38 L880,36.5 L860,33.5 L840,32 L820,33.5 L800,36.5 L780,38 L760,36.5 L740,33.5 L720,32 L700,33.5 L680,36.5 L660,38 L640,36.5 L620,33.5 L600,32 L580,33.5 L560,36.5 L540,38 L520,36.5 L500,33.5 L480,32 L460,33.5 L440,36.5 L420,38 L400,36.5 L380,33.5 L360,32 L340,33.5 L320,36.5 L300,38 L280,36.5 L260,33.5 L240,32 L220,33.5 L200,36.5 L180,38 L160,36.5 L140,33.5 L120,32 L100,33.5 L80,36.5 L60,38 L40,36.5 L20,33.5 L0,32 Z" fill="#ffffff" />
            <path d="M0,32 L20,33.5 L40,36.5 L60,38 L80,36.5 L100,33.5 L120,32 L140,33.5 L160,36.5 L180,38 L200,36.5 L220,33.5 L240,32 L260,33.5 L280,36.5 L300,38 L320,36.5 L340,33.5 L360,32 L380,33.5 L400,36.5 L420,38 L440,36.5 L460,33.5 L480,32 L500,33.5 L520,36.5 L540,38 L560,36.5 L580,33.5 L600,32 L620,33.5 L640,36.5 L660,38 L680,36.5 L700,33.5 L720,32 L740,33.5 L760,36.5 L780,38 L800,36.5 L820,33.5 L840,32 L860,33.5 L880,36.5 L900,38 L920,36.5 L940,33.5 L960,32 L980,33.5 L1000,36.5 L1020,38 L1040,36.5 L1060,33.5 L1080,32 L1100,33.5 L1120,36.5 L1140,38 L1160,36.5 L1180,33.5 L1200,32 L1220,33.5 L1240,36.5 L1260,38 L1280,36.5 L1300,33.5 L1320,32 L1340,33.5 L1360,36.5 L1380,38 L1400,36.5 L1420,33.5 L1440,32 L1440,48 L1420,49.5 L1400,52.5 L1380,54 L1360,52.5 L1340,49.5 L1320,48 L1300,49.5 L1280,52.5 L1260,54 L1240,52.5 L1220,49.5 L1200,48 L1180,49.5 L1160,52.5 L1140,54 L1120,52.5 L1100,49.5 L1080,48 L1060,49.5 L1040,52.5 L1020,54 L1000,52.5 L980,49.5 L960,48 L940,49.5 L920,52.5 L900,54 L880,52.5 L860,49.5 L840,48 L820,49.5 L800,52.5 L780,54 L760,52.5 L740,49.5 L720,48 L700,49.5 L680,52.5 L660,54 L640,52.5 L620,49.5 L600,48 L580,49.5 L560,52.5 L540,54 L520,52.5 L500,49.5 L480,48 L460,49.5 L440,52.5 L420,54 L400,52.5 L380,49.5 L360,48 L340,49.5 L320,52.5 L300,54 L280,52.5 L260,49.5 L240,48 L220,49.5 L200,52.5 L180,54 L160,52.5 L140,49.5 L120,48 L100,49.5 L80,52.5 L60,54 L40,52.5 L20,49.5 L0,48 Z" fill="#138808" />
          </svg>
        </div>
        <div className="md:flex md:items-stretch">
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
