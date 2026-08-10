import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import SEO from '../components/common/SEO';

const ACCENT = '#033e74';
const TEAL = '#20b2aa';

const stats = [
  { value: '2015', label: 'Founded' },
  { value: '10+', label: 'Years of Expertise' },
  { value: '14+', label: 'Years Leadership Experience' },
];

const missionVision = [
  {
    title: 'Our Mission',
    desc: 'Make advanced lithium-ion energy storage affordable, accessible, and maintainable for every tier of the Indian market — engineered in-house, from cell selection to cloud telemetry.',
    desc2: 'That means in-house BMS firmware, precision cell-matching, and end-to-end quality control — so every pack performs the way it was designed to, for years.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Our Vision',
    desc: 'Lead India to a smarter energy era — one where reliable, clean electricity is not a privilege but a right, and every kilowatt-hour comes from the sun.',
    desc2: 'Decentralized clean power for every home, zero-emission backup replacing every diesel generator, and smart grid-ready storage from rooftop to utility scale.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const pillars = [
  {
    title: 'Quality',
    desc: 'Rigorous testing and certified manufacturing behind every battery pack we ship.',
    href: '/quality',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    desc: 'Engineered for consistent performance under real-world Indian grid conditions.',
    href: '/reliability',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Technology',
    desc: 'In-house BMS firmware and precision cell-matching for every pack we build.',
    href: '/technology',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  },
];

const offices = [
  {
    title: 'Corporate Office',
    address: 'Yograj Tower, Near Madhurima Sweets, Vibhuti Khand, Gomati Nagar, Lucknow, UP 226002',
  },
  {
    title: 'Head Office',
    address: '413 - Fortune Gateway, TP-13, Channi, Vadodara, Gujarat - 390024',
  },
];

function IconCard({ icon, title, desc, desc2 }) {
  return (
    <div className="rounded-lg bg-white border border-gray-200 p-8 text-center flex flex-col items-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${ACCENT}0D` }}>
        {icon}
      </div>
      <h3 className="text-[20px] font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      {desc2 && <p className="text-gray-600 text-sm leading-relaxed mt-3">{desc2}</p>}
    </div>
  );
}

function PillarCard({ title, desc, icon, href }) {
  return (
    <Link
      to={href}
      className="w-full md:max-w-[360px] rounded-lg bg-white border border-gray-200 flex flex-col items-center text-center p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${ACCENT}0D` }}>
        {icon}
      </div>
      <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
        Know More
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

function OfficeCard({ title, address }) {
  return (
    <div className="rounded-lg bg-white border border-gray-200 p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${TEAL}1A` }}>
        <svg className="w-6 h-6" fill="none" stroke={TEAL} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{address}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [statsRef, statsInView] = useInView(0.2);
  const [mvRef, mvInView] = useInView(0.1);
  const [pillarsRef, pillarsInView] = useInView(0.05);
  const [officesRef, officesInView] = useInView(0.1);
  const [ownerRef, ownerInView] = useInView();
  const [ctaRef, ctaInView] = useInView(0.2);

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

      {/* HERO — split, text left / real photo right */}
      <section className="md:flex md:items-stretch bg-white relative pt-24 md:pt-24 lg:pt-36">
        <div
          className="md:w-1/2 px-6 pb-12 md:pb-16 md:pl-16 lg:px-12 lg:pb-20 flex flex-col justify-center transition-all duration-1000"
          style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-5" style={{ color: ACCENT }}>
            In India, For India
          </span>
          <h1 className="text-[34px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-gray-900 mb-6">
            Who <span style={{ color: ACCENT }}>We Are</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            <strong className="text-gray-900">Mesho Solution Solar Park Pvt. Ltd. (Myzo)</strong> is a dedicated Battery Energy Storage System (BESS) company, engineering advanced lithium-ion technology to replace lead-acid and diesel backup — built for homes, businesses, and industry across India.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Since 2015, we've stayed focused on one thing: making reliable, maintenance-free energy storage that works for Indian conditions — designed in-house, tested rigorously, and backed by a team that answers the phone.
          </p>
        </div>
        <div className="md:w-1/2 relative overflow-hidden min-h-[280px] md:min-h-0 bg-[#e8f2fa] md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
          <img
            src="OfficeImage.jpeg"
            alt="Myzo office, Lucknow"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* STATS — thin strip, no cards */}
      <section className="bg-[#f1f1f1] py-10">
        <div ref={statsRef} className="max-w-2xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="transition-all duration-700"
              style={{ opacity: statsInView ? 1 : 0, transform: statsInView ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-[28px] md:text-[32px] font-bold leading-none" style={{ color: ACCENT }}>{s.value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-20">
        <div ref={mvRef} className="max-w-4xl mx-auto px-6">
          <h2
            className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-12 transition-all duration-700"
            style={{ opacity: mvInView ? 1 : 0, transform: mvInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            Our Mission &amp; Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {missionVision.map((m, i) => (
              <div
                key={m.title}
                className="transition-all duration-700"
                style={{ opacity: mvInView ? 1 : 0, transform: mvInView ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 120}ms` }}
              >
                <IconCard {...m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS — Quality / Reliability / Technology */}
      <section className="bg-[#f1f1f1] py-20">
        <div ref={pillarsRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <h2
            className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-12 transition-all duration-700"
            style={{ opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            Why Choose Myzo
          </h2>
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

      {/* WHO WE ARE — narrative + offices */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-6">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-4">
            Founded in 2015, Mesho Solution Solar Park Pvt. Ltd. is a dynamic, forward-thinking energy solutions company committed to driving innovation in renewable energy and energy storage. With a strong focus on advanced BESS technologies, sustainable power solutions, and customer-centric service, we deliver reliable, high-performance products tailored to evolving market needs.
          </p>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-12">
            Backed by a dedicated team and a vision for a greener future, Myzo continuously invests in technology, quality, and operational excellence — building a presence across domestic and international markets.
          </p>
          <h3 className="text-[18px] font-bold text-gray-900 text-center mb-6">Where We Operate</h3>
          <div ref={officesRef} className="grid sm:grid-cols-2 gap-6">
            {offices.map((o, i) => (
              <div
                key={o.title}
                className="transition-all duration-700"
                style={{ opacity: officesInView ? 1 : 0, transform: officesInView ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 120}ms` }}
              >
                <OfficeCard {...o} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP — feature split card, real photo */}
      <section className="bg-[#f1f1f1] py-20">
        <div ref={ownerRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-lg bg-white overflow-hidden flex flex-col md:flex-row md:h-[480px] transition-all duration-700"
            style={{ boxShadow: '0px 1px 8px 0px rgba(102,102,102,0.24)', opacity: ownerInView ? 1 : 0, transform: ownerInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            <div className="md:w-1/2 h-60 md:h-full">
              <img src="SirImage.jpeg" alt="Mr. Aseem Mishra" className="w-full h-full object-cover object-top" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: ACCENT }}>
                Leadership
              </span>
              <h2 className="text-[26px] leading-[32px] md:text-[28px] md:leading-[36px] font-bold text-gray-900 mb-4">
                Message from Our Business Head
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Mr. Aseem Mishra, Circle Business Head of Myzo, brings over{' '}
                <strong className="text-gray-900">14 years of extensive experience</strong> in the Battery and Solar service sector — a respected leader in product development, manufacturing, and strategic business growth.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Under his leadership, Myzo is committed to delivering innovative, high-performance lithium-ion battery solutions for BESS and industrial applications. His deep industry expertise, customer-centric approach, and focus on operational excellence drive the company's mission to create reliable, efficient, and sustainable energy solutions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Through his strategic vision and commitment to innovation, Mr. Mishra continues to position Myzo at the forefront of the clean energy revolution, fostering long-term growth and exceptional value for customers and stakeholders alike.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-bold text-gray-900 text-sm">Mr. Aseem Mishra</p>
                <p className="text-gray-500 text-sm">Circle Business Head — Myzo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — solid colour */}
      <section ref={ctaRef} className="py-24 text-center text-white" style={{ backgroundColor: ACCENT }}>
        <div
          className="max-w-2xl mx-auto px-6 transition-all duration-1000"
          style={{ opacity: ctaInView ? 1 : 0, transform: ctaInView ? 'translateY(0)' : 'translateY(16px)' }}
        >
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
