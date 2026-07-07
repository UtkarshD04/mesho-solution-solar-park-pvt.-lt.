import { useState, useEffect } from "react";

const slides = [
  {
    image: "/hero1.jpg",
    tag: "Clean Energy",
    headline1: "Power the Future",
    headline2: "With Solar Intelligence",
    sub: "Next-gen lithium storage meets solar — built for India's energy revolution.",
  },
  {
    image: "/hero2.jpg",
    tag: "Energy Storage",
    headline1: "Never Run Out",
    headline2: "Of Power. Ever.",
    sub: "Industrial-grade LFP batteries engineered for zero downtime, zero maintenance.",
  },
  {
    image: "/hero3.jpg",
    tag: "Made in India",
    headline1: "Built Tough.",
    headline2: "Charged Smarter.",
    sub: "From homes to utility grids — Myzo delivers power you can trust for 12+ years.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.headline1}
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: "auto", willChange: "auto" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
              <div
                className="max-w-2xl space-y-5"
                style={{ opacity: i === current ? 1 : 0, transform: i === current ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s" }}
              >
                {/* Tag pill */}
                <div className="inline-flex items-center gap-2 bg-[#20b2aa]/20 border border-[#20b2aa]/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20b2aa] animate-pulse" />
                  <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em]">{slide.tag}</span>
                </div>

                {/* 3D Headline */}
                <div className="space-y-1">
                  <h1
                    className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight"
                    style={{
                      textShadow: "2px 2px 0px #0B3C5D, 4px 4px 0px #033e74, 6px 6px 0px rgba(3,62,116,0.4), 0 8px 32px rgba(0,0,0,0.6)",
                    }}
                  >
                    {slide.headline1}
                  </h1>
                  <h1
                    className="text-5xl lg:text-7xl font-black leading-none tracking-tight"
                    style={{
                      color: "#20b2aa",
                      textShadow: "2px 2px 0px #0e6b65, 4px 4px 0px #0a4f4b, 6px 6px 0px rgba(10,79,75,0.4), 0 8px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.headline2}
                  </h1>
                </div>

                {/* Divider */}
                <div className="w-16 h-1 rounded-full bg-[#20b2aa]" />

                {/* Subtext */}
                <p className="text-white/75 text-base lg:text-lg leading-relaxed max-w-lg font-light">
                  {slide.sub}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 ${i === current ? "bg-white scale-125 border-white" : "bg-transparent hover:border-white"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats Strip – inside hero image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              {
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
                value: "350+", unit: "MWh", label: "Annual Plant Capacity",
              },
              {
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>),
                value: "6,000+", unit: "Cycles", label: "LFP Cycle Lifespan",
              },
              {
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                value: "6+", unit: "Cities", label: "Cities Served",
              },
              {
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>),
                value: "10+", unit: "Years", label: "Years of Expertise",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-8 py-5">
                <div className="w-10 h-10 rounded-xl bg-[#20b2aa]/20 border border-[#20b2aa]/40 flex items-center justify-center text-[#20b2aa] shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-black text-2xl leading-none">
                    {s.value} <span className="text-[#20b2aa] text-sm font-bold">{s.unit}</span>
                  </p>
                  <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
