import { Link } from "react-router-dom";
import Hero from "../components/ui/Hero";
import ProductShowcase from "../components/ui/ProductShowcase";
import AboutMyzoSection from "../components/home/AboutMyzoSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import EnergySolutionsSection from "../components/home/EnergySolutionsSection";
import MissionBand from "../components/home/MissionBand";
import VideoShowcase from "../components/common/VideoShowcase";
import { whyChooseData } from "../data/homePageData.jsx";
import SEO from "../components/common/SEO";
import useInView from "../hooks/useInView";

const ACCENT = "#033e74";

export default function Home() {
  const [ctaRef, ctaInView] = useInView();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title="Battery Energy Storage System (BESS) Company in India"
        description="In India, For India — Myzo is a Battery Energy Storage System (BESS) company offering reliable lithium-ion batteries, energy storage systems, and power solutions for home, commercial, and industrial use."
        path="/"
      />

      {/* ── Hero Slider ─────────────────── */}
      <Hero />

      {/* ── About Myzo Battery ──────────── */}
      <AboutMyzoSection />

      {/* ── Why Choose Myzo Battery ─────── */}
      <WhyChooseSection whyChooseData={whyChooseData} />

      {/* ── Energy Solutions ───────────── */}
      <EnergySolutionsSection />

      {/* ── Featured Products ────────────── */}
      <ProductShowcase />

      {/* ── Our Mission ──────────────────── */}
      <MissionBand />

      {/* ── Watch Myzo in Action ────────── */}
      <VideoShowcase title="Watch Myzo in Action" src="/video1.mp4" poster="/hero1.png" fullWidth heightClass="h-[220px] md:h-[280px]" autoPlay />

      {/* ── CTA Banner ─────────── */}
      <section ref={ctaRef} className="py-14 text-center text-white" style={{ backgroundColor: ACCENT }}>
        <div className="max-w-[760px] mx-auto px-6 transition-all duration-1000" style={{ opacity: ctaInView ? 1 : 0, transform: ctaInView ? "translateY(0)" : "translateY(16px)" }}>
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold mb-4">
            Need custom battery sizing or a proprietary BMS configuration?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Get in touch with our cell testing and production engineers to customize pack shapes, high-discharge rates, or utility BESS parameters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block font-bold rounded px-6 py-3 border-2 border-white bg-white transition-colors"
              style={{ color: ACCENT }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = ACCENT; }}
            >
              Contact Engineering
            </Link>
            <Link
              to="/products"
              className="inline-block font-bold rounded px-6 py-3 border-2 border-white text-white hover:bg-white transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
