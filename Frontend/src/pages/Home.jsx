import { useState, useEffect, useRef } from "react";
import Hero from "../components/ui/Hero";
import ProductShowcase from "../components/ui/ProductShowcase";
import AboutMyzoSection from "../components/home/AboutMyzoSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import EngineeringSection from "../components/home/EngineeringSection";
import TechnologySection from "../components/home/TechnologySection";
import VisionMissionSection from "../components/home/VisionMissionSection";
import ProductHighlightSection from "../components/home/ProductHighlightSection";
import EnergySolutionsSection from "../components/home/EnergySolutionsSection";
import { whyChooseData, batteryProducts, engineeringDivisions } from "../data/homePageData.jsx";
import { Link } from "react-router-dom";

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

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [aboutRef, aboutInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [divRef, divInView] = useInView();
  const [prodRef, prodInView] = useInView();
  const [techRef, techInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const [MyzoAboutRef, MyzoAboutInView] = useInView();
  const [whyRef, whyInView] = useInView();
  const [visionRef, visionInView] = useInView();
  const [missionRef, missionInView] = useInView();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">

      {/* ── Hero Slider ─────────────────── */}
      <Hero />

      {/* ── About Myzo Battery ──────────── */}
      <AboutMyzoSection aboutRef={MyzoAboutRef} aboutInView={MyzoAboutInView} />

      {/* ── Why Choose Myzo Battery ─────── */}
      <WhyChooseSection whyRef={whyRef} whyInView={whyInView} whyChooseData={whyChooseData} />

      {/* ── Stats Bar ───────────────────── */}
      <EnergySolutionsSection />

      {/* ── Featured Products ────────────── */}
      <ProductShowcase />

      <VisionMissionSection />

      {/* ── CTA Banner ─────────── */}
      <section
        ref={ctaRef}
        className="py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#011d37] via-[#033e74] to-[#033e74]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#20b2aa]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#033e74]/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10 relative">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-widest">Ready to Power Up?</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Need custom battery sizing or <br className="hidden md:block" />
              <span className="text-[#20b2aa]">proprietary BMS configuration?</span>
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
              Get in touch with our cell testing and production engineers to customize pack shapes, high-discharge rates, or utility BESS parameters.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 bg-[#20b2aa] hover:bg-[#1a948e] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 text-sm"
            >
              Contact Engineering
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:-translate-y-0.5 text-sm backdrop-blur-sm"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(4px); }
          66% { transform: translateY(6px) translateX(-4px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
