import { useState, useEffect } from 'react';
import VisionMissionSection from '../components/home/VisionMissionSection';
import useInView from '../hooks/useInView';

export default function About() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [briefRef, briefInView] = useInView();
  const [ownerRef, ownerInView] = useInView();
  const [galleryRef, galleryInView] = useInView();

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
          backgroundImage: "url('/site-racking-array.jpg')",
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


      {/* PROJECT SITE GALLERY */}
      <section className="py-20 bg-white">
        <div ref={galleryRef} className="max-w-7xl mx-auto px-6">
          <div
            className="text-center max-w-2xl mx-auto mb-14 transition-all duration-1000"
            style={{ opacity: galleryInView ? 1 : 0, transform: galleryInView ? "translateY(0)" : "translateY(24px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#20b2aa] mb-3">On the Ground</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight">
              Projects In Action
            </h2>
            <div className="w-24 h-[2px] bg-[#033e74] mx-auto mt-6" />
            <p className="text-gray-600 text-sm leading-relaxed mt-6">
              Real execution from our solar park sites — from module racking and transformer commissioning
              to switchgear installation and field engineering visits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: "/site-transformer-inspection.jpg", alt: "Power transformer inspection on-site", caption: "Power Transformer Inspection", tall: true },
              { src: "/site-panel-walkthrough.jpg", alt: "Field team walking through installed module rows", caption: "Module Row Walkthrough" },
              { src: "/site-team-visit.jpg", alt: "Engineering team on-site visit near substation works", caption: "Site Engineering Visit" },
              { src: "/site-switchgear-equipment.jpg", alt: "33kV switchgear and RMU installation", caption: "Switchgear & RMU Installation" },
              { src: "/site-engineer-panels.jpg", alt: "Field engineer at a commissioned module row", caption: "Field Engineering Team", tall: true },
              { src: "/site-panel-delivery.jpg", alt: "Solar module delivery and quality check on-site", caption: "Module Delivery & QC" },
              { src: "/site-panel-closeup.jpg", alt: "Close view of installed solar modules", caption: "Module Installation" },
              { src: "/site-racking-overview.jpg", alt: "Module mounting structure racking overview", caption: "Mounting Structure Racking" },
            ].map((img, i) => (
              <div
                key={img.src}
                className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ${img.tall ? "row-span-2" : ""}`}
                style={{
                  opacity: galleryInView ? 1 : 0,
                  transform: galleryInView ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 90 + 100}ms`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.tall ? "h-full min-h-[420px]" : "h-52 sm:h-56"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold uppercase tracking-wider leading-snug">
                  {img.caption}
                </p>
              </div>
            ))}
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
