import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
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

const steps = [
  {
    label: "Solar",
    title: "Generate",
    desc: "Solar panels on your roof convert sunlight into clean electricity.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    label: "Store",
    title: "Store",
    desc: "MYZO lithium storage banks the surplus energy safely and efficiently.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 7h18M3 17h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    label: "Use",
    title: "Power",
    desc: "Stored energy runs your home, business, or industrial loads on demand.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Backup",
    title: "Protect",
    desc: "During a power cut, MYZO switches over automatically to keep essentials running.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-24 bg-[#F5F8FA] relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16 relative">

        <div
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="inline-flex items-center gap-2 text-[#159A7C] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <span className="w-6 h-px bg-[#159A7C]" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#10202F] leading-tight">
            From Sunlight to Reliable Power
          </h2>
          <p className="mt-3 text-sm text-[#5D6975] leading-relaxed">
            A simple, automatic cycle — Solar, Grid and MYZO storage work together so your appliances never lose power.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#159A7C]/0 via-[#159A7C]/40 to-[#159A7C]/0" />

          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative flex flex-col items-center text-center transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 140 + 100}ms`,
              }}
            >
              <div
                className="relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center text-white shadow-lg shrink-0"
                style={{ background: "linear-gradient(135deg, #08233F 0%, #159A7C 100%)" }}
              >
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#32B86C] text-white text-[11px] font-black flex items-center justify-center border-2 border-[#F5F8FA]">
                  {i + 1}
                </span>
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#159A7C]">{step.label}</p>
              <h3 className="mt-1 text-base font-bold text-[#10202F]">{step.title}</h3>
              <p className="mt-2 text-xs text-[#5D6975] leading-relaxed max-w-[190px]">{step.desc}</p>

              {i < steps.length - 1 && (
                <svg className="lg:hidden w-5 h-5 text-[#159A7C]/50 mt-4 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
