import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CorePurposeSection from '../components/about/CorePurposeSection';
import useInView from '../hooks/useInView';
import SEO from '../components/common/SEO';

const ACCENT = '#033e74';

const highlights = [
  {
    badge: 'Est. 2015',
    title: 'A Dedicated BESS Company',
    desc: 'Focused on advanced lithium-ion Battery Energy Storage Systems for the Indian market since day one.',
    img: 'OfficeImage.jpeg',
  },
  {
    badge: '10+ Years',
    title: 'A Decade of Innovation',
    desc: "From cell selection to BMS firmware, we've spent a decade engineering energy storage built for Indian conditions.",
    img: '/site-panel-walkthrough.jpg',
  },
  {
    badge: '14+ Years',
    title: 'Trusted Leadership',
    desc: 'Led by industry veterans with deep expertise across the battery and solar service sector.',
    img: 'SirImage.jpeg',
  },
];

const pillars = [
  {
    title: 'Quality',
    desc: 'Rigorous testing and certified manufacturing behind every battery pack we ship.',
    img: '/hero-quality-v5.png',
    href: '/quality',
  },
  {
    title: 'Reliability',
    desc: 'Engineered for consistent performance under real-world Indian grid conditions.',
    img: '/hero-reliability-v5.png',
    href: '/reliability',
  },
  {
    title: 'Technology',
    desc: 'In-house BMS firmware and precision cell-matching for every pack we build.',
    img: '/hero-technology-v5.png',
    href: '/technology',
  },
];

function HighlightCard({ badge, title, desc, img }) {
  return (
    <div className="w-full lg:flex-1 min-w-[280px] md:max-w-[340px]">
      <div className="h-full rounded-lg bg-white overflow-hidden flex flex-col" style={{ boxShadow: '0px 1px 8px 0px rgba(102,102,102,0.24)' }}>
        <div className="h-60 overflow-hidden">
          <img src={img} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="inline-block self-start rounded-full bg-gray-100 text-gray-500 text-xs font-bold px-4 py-2 mb-4">
            {badge}
          </span>
          <h3 className="text-[20px] leading-[28px] font-bold mb-3" style={{ color: ACCENT }}>{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function PillarCard({ title, desc, img, href }) {
  return (
    <Link
      to={href}
      className="w-full md:max-w-[360px] rounded-lg bg-white overflow-hidden flex flex-col hover:-translate-y-1 transition-transform"
      style={{ boxShadow: '0px 1px 8px 0px rgba(102,102,102,0.24)' }}
    >
      <div className="h-60 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}

export default function About() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [highlightsRef, highlightsInView] = useInView(0.05);
  const [briefRef, briefInView] = useInView();
  const [pillarsRef, pillarsInView] = useInView(0.05);
  const [ownerRef, ownerInView] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Us — Battery Energy Storage System (BESS) Company"
        description="In India, For India — learn about Myzo Solar Park, a Battery Energy Storage System (BESS) company committed to delivering reliable energy storage and battery solutions."
        path="/about"
      />

      {/* HERO — split, text left / angled image right */}
      <section className="md:flex md:items-stretch bg-white relative pt-24 md:pt-24 lg:pt-36">
        <div
          className="md:w-1/2 px-6 pb-12 md:pb-16 md:pl-16 lg:px-12 lg:pb-20 flex flex-col justify-center transition-all duration-1000"
          style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
            In India, For India
          </span>
          <h1 className="text-[34px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-gray-900 mb-6">
            About Myzo
          </h1>
          <p className="text-gray-700 text-base leading-relaxed">
            As a dedicated <Link to="/technology" className="font-medium underline" style={{ color: ACCENT }}>Battery Energy Storage System company</Link>, we're busy building the lithium-ion infrastructure that will replace lead-acid and diesel backup — with{' '}
            <Link to="/quality" className="font-medium underline" style={{ color: ACCENT }}>certified quality</Link> and{' '}
            <Link to="/reliability" className="font-medium underline" style={{ color: ACCENT }}>proven reliability</Link> at every step.
          </p>
        </div>
        <div className="md:w-1/2 relative overflow-hidden min-h-[280px] md:min-h-0 bg-[#e8f2fa] md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
          <img
            src="/hero-technology-v5.png"
            alt="Myzo battery energy storage"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* HIGHLIGHTS — grey stripe, 3-card grid */}
      <section className="bg-[#f1f1f1] py-14">
        <div ref={highlightsRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <h2
            className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-10 transition-all duration-700"
            style={{ opacity: highlightsInView ? 1 : 0, transform: highlightsInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            Highlights from Myzo
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {highlights.map((h) => (
              <HighlightCard key={h.title} {...h} />
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE — feature split card, white bg */}
      <section className="bg-white py-14">
        <div ref={briefRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-lg bg-white overflow-hidden flex flex-col md:flex-row md:h-[400px] transition-all duration-700"
            style={{ boxShadow: '0px 1px 8px 0px rgba(102,102,102,0.24)', opacity: briefInView ? 1 : 0, transform: briefInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-bold text-gray-900 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong className="text-gray-900">MESHO SOLUTION SOLAR PARK PVT. LTD. (Myzo)</strong> was founded in 2015 — a dynamic, forward-thinking energy solutions company committed to driving innovation in renewable energy and energy storage.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Backed by a dedicated team and a vision for a greener future, Myzo continuously invests in technology, quality, and operational excellence across domestic and international markets.
              </p>
              <Link
                to="/technology"
                className="inline-block font-bold rounded px-6 py-3 border-2 transition-colors w-fit"
                style={{ backgroundColor: ACCENT, borderColor: ACCENT, color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = ACCENT; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = '#fff'; }}
              >
                Explore our technology
              </Link>
            </div>
            <div className="md:w-1/2 h-60 md:h-full order-1 md:order-2">
              <img src="OfficeImage.jpeg" alt="Myzo office" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* INVESTING IN — centered text block */}
      <section className="bg-white pb-14">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 mb-4">
            We're investing in reliable energy storage
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Businesses shifting to <Link to="/quality" className="underline font-medium" style={{ color: ACCENT }}>certified quality manufacturing</Link>,{' '}
            <Link to="/reliability" className="underline font-medium" style={{ color: ACCENT }}>field-proven reliability</Link> and{' '}
            <Link to="/technology" className="underline font-medium" style={{ color: ACCENT }}>advanced BMS technology</Link> are cutting downtime and diesel dependence. We're committed to all three.
          </p>
        </div>
      </section>

      {/* PILLARS — 3-column card grid linking to Quality / Reliability / Technology */}
      <section className="bg-white pb-14">
        <div ref={pillarsRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            className="flex flex-wrap lg:flex-nowrap justify-center gap-8 transition-all duration-700"
            style={{ opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            {pillars.map((p) => (
              <PillarCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP — feature split card, grey stripe, image left */}
      <section className="bg-[#f1f1f1] py-14">
        <div ref={ownerRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-lg bg-white overflow-hidden flex flex-col md:flex-row md:h-[400px] transition-all duration-700"
            style={{ boxShadow: '0px 1px 8px 0px rgba(102,102,102,0.24)', opacity: ownerInView ? 1 : 0, transform: ownerInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            <div className="md:w-1/2 h-60 md:h-full">
              <img src="SirImage.jpeg" alt="Mr. Aseem Mishra" className="w-full h-full object-cover object-top" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <h2 className="text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-bold text-gray-900 mb-4">
                Message from Our Business Head
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Mr. Aseem Mishra, Circle Business Head of Myzo, brings over{' '}
                <strong className="text-gray-900">14 years of extensive experience</strong> in the Battery and Solar service sector — a respected leader in product development, manufacturing, and strategic business growth.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Under his leadership, Myzo is committed to delivering innovative, high-performance lithium-ion battery solutions for BESS and industrial applications, fostering long-term growth and exceptional value for customers and stakeholders alike.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-bold text-gray-900 text-sm">Mr. Aseem Mishra</p>
                <p className="text-gray-500 text-sm">Circle Business Head — Myzo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CorePurposeSection />

      {/* CTA — solid colour stripe */}
      <section className="py-14 text-center text-white" style={{ backgroundColor: ACCENT }}>
        <div className="max-w-[760px] mx-auto px-6">
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold mb-4">
            Ready to partner with us?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Join hundreds of businesses that trust Myzo for their energy needs.
          </p>
          <Link
            to="/contact"
            className="inline-block font-bold rounded px-6 py-3 border-2 border-white bg-white transition-colors"
            style={{ color: ACCENT }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = ACCENT; }}
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  )
}
