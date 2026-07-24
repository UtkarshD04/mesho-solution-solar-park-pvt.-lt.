import { useState, useEffect } from 'react';
import VisionMissionSection from '../components/home/VisionMissionSection';
import useInView from '../hooks/useInView';

const stats = [
  { value: 2015, label: 'Founded', plain: true },
  { value: 500, suffix: '+', label: 'MW Installed' },
  { value: 200, suffix: '+', label: 'Projects Done' },
  { value: 14, suffix: '+', label: 'Years Leadership' },
]

function CountUp({ value, suffix = "", start, duration = 1500, plain = false }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const begin = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [start, value, duration]);
  return <>{plain ? display : display.toLocaleString()}{suffix}</>;
}

export default function About() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [statsRef, statsInView] = useInView(0.3);
  const [briefRef, briefInView] = useInView();
  const [ownerRef, ownerInView] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div
          className="relative z-10 px-6 max-w-4xl mx-auto pt-20 transition-all duration-1000"
          style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Our Story</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight mb-5">
            About Us
          </h1>
          <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
            A decade of driving India's clean energy revolution through innovation, expertise and commitment.
          </p>
        </div>
      </section>

      {/* STATS STRIP */}
      <div ref={statsRef} className="bg-[#011d37] py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center transition-all duration-700"
              style={{ opacity: statsInView ? 1 : 0, transform: statsInView ? "translateY(0)" : "translateY(18px)", transitionDelay: `${i * 130}ms` }}
            >
              <p className="text-3xl sm:text-4xl font-black text-white">
                <CountUp value={s.value} suffix={s.suffix} plain={s.plain} start={statsInView} duration={1400 + i * 150} />
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-1 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INDIA'S FIRST BESS HEADING */}
      <div className="bg-white py-10 text-center border-b border-gray-100">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033e74] uppercase leading-tight tracking-tight">
          India's First
        </h2>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight mt-1" style={{ color: '#20b2aa' }}>
          Battery Energy Storage System Company
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[2px] w-16 bg-[#20b2aa] rounded-full" />
          <span className="w-2 h-2 rounded-full bg-[#033e74]" />
          <div className="h-[2px] w-16 bg-[#033e74] rounded-full" />
        </div>
      </div>

      {/* COMPANY BRIEFING — right image, left text */}
      <section className="py-20 bg-white">
        <div ref={briefRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Left — Text */}
          <div
            className="relative pl-6 sm:pl-8 transition-all duration-1000"
            style={{ opacity: briefInView ? 1 : 0, transform: briefInView ? "translateX(0)" : "translateX(-32px)" }}
          >
            <div className="absolute left-0 top-2 h-[88%] w-1 rounded-full bg-[#20b2aa]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#033e74] mb-3">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight mb-6">
              Mesho Solution<br />Solar Park Pvt. Ltd.
            </h2>
            <div className="w-24 h-[2px] bg-[#20b2aa] mb-6" />
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              <strong className="text-gray-900">MESHO SOLUTION SOLAR PARK PVT. LTD. (Myzo)</strong> was founded in 2015 and is a dynamic and forward-thinking energy solutions company committed to driving innovation in the renewable energy and energy storage sector.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              With a strong focus on advanced BESS (Energy Battery Storage Systems) battery technologies, sustainable power solutions, and customer-centric services, the company delivers reliable and high-performance products tailored to evolving market needs.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Backed by a dedicated team and a vision for a greener future, Myzo continuously invests in technology, quality, and operational excellence. Through its commitment to innovation, productivity, and sustainability, the company aims to empower businesses and communities with efficient energy solutions while building a strong presence across domestic and international markets.
            </p>
          </div>

          {/* Right — Image */}
          <div
            className="relative group overflow-hidden rounded-2xl transition-all duration-1000"
            style={{ opacity: briefInView ? 1 : 0, transform: briefInView ? "translateX(0)" : "translateX(32px)", transitionDelay: "150ms" }}
          >
            <img
              src="OfficeImage.jpeg"
              alt="BESS Battery"
              className="rounded-2xl w-100 h-[520px] object-cover shadow-xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* OWNER SECTION — left image, right speech */}
      <section className="py-20 bg-gray-50">
        <div ref={ownerRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* Left — Owner Image */}
          <div
            className="relative flex justify-center transition-all duration-1000"
            style={{ opacity: ownerInView ? 1 : 0, transform: ownerInView ? "translateX(0)" : "translateX(-32px)" }}
          >
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="SirImage.jpeg"
                alt="Mr. Aseem Mishra"
                className="rounded-2xl w-100 h-[520px] object-cover shadow-xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right — Speech */}
          <div
            className="relative pt-8 md:pt-0 pl-6 sm:pl-8 transition-all duration-1000"
            style={{ opacity: ownerInView ? 1 : 0, transform: ownerInView ? "translateX(0)" : "translateX(32px)", transitionDelay: "150ms" }}
          >
            <div className="absolute left-0 top-2 h-[88%] w-1 rounded-full bg-[#20b2aa]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#033e74] mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight mb-6">
              Message from<br />Our Business Head
            </h2>
            <div className="w-24 h-[2px] bg-[#20b2aa] mb-6" />

            <div className="text-[#20b2aa] text-6xl font-black leading-none mb-2 opacity-30 select-none">"</div>

            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Mr. Aseem Mishra, Circle Business Head of Myzo, brings over <strong className="text-gray-900">14 years of extensive experience</strong> in the Battery and Solar service sector. With a strong background in product development, manufacturing, and strategic business growth, he has established himself as a respected leader in the field.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Under his leadership, Myzo Battery is committed to delivering innovative, high-performance lithium-ion battery solutions for BESS (Battery Energy Storage Systems) and industrial applications. His deep industry expertise, customer-centric approach, and focus on operational excellence drive the company's mission to create reliable, efficient, and sustainable energy solutions.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Through his strategic vision and commitment to innovation, Mr. Mishra continues to position Myzo at the forefront of the clean energy revolution, fostering long-term growth, technological advancement, and exceptional value for customers and stakeholders alike.
            </p>

            <div className="mt-8 flex items-center gap-4 border-l-2 border-[#20b2aa] pl-4">
              <div>
                <p className="font-black text-gray-900 text-sm uppercase">Mr. Aseem Mishra</p>
                <p className="text-[#033e74] text-xs font-semibold"> Circle Business Head — Myzo </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <VisionMissionSection />

      {/* CTA */}
      <section className="py-20 bg-[#033e74] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-4">Ready to Partner With Us?</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Join hundreds of businesses that trust Mesho Solution for their energy needs.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#033e74] hover:bg-gray-100 font-black uppercase tracking-wider px-10 py-4 rounded-lg text-sm inline-block transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>

    </div>
  )
}
