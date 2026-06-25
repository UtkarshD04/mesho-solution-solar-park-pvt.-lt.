import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

const contactTypes = [
  {
    key: "inquiry",
    label: "Product Enquiry",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Have questions about our products?",
    desc: "Get detailed information about our battery systems, specifications, pricing, and availability. Our product specialists are ready to help you find the perfect solution for your energy storage needs.",
    accent: "#033e74",
    accentLight: "#e8eef7",
    route: "/contact/product-enquiry",
  },
  {
    key: "partner",
    label: "Become a Partner",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Join our growing network",
    desc: "Become part of India's fastest-growing solar distribution network. We offer competitive margins, technical training, marketing support, and exclusive territory rights for qualified partners.",
    accent: "#033e74",
    accentLight: "#e8eef7",
    route: "/contact/become-partner",
  },
];

export default function Contact() {
  const navigate = useNavigate();
  const [cardsRef, cardsInView] = useInView();
  const [infoRef, infoInView] = useInView();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero + Cards combined ── */}
      <div className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative min-h-[75vh] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-48">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Get In Touch</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-5">
              Contact Us
            </h1>
            <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
              Whether you need product information, want to become a partner, or require after-sales support — our team is ready to assist you.
            </p>
          </div>
        </div>

        {/* Cards overlapping hero bottom */}
        <div ref={cardsRef} className="relative z-10 max-w-4xl mx-auto px-6 -mt-36 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {contactTypes.map((type, i) => (
              <div
                key={type.key}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl bg-white border border-gray-100 ${cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
                onClick={() => navigate(type.route)}
              >
                <div className="p-10">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: type.accentLight, color: type.accent }}
                  >
                    {type.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{type.label}</h3>
                  <p className="text-sm font-semibold text-gray-700 mb-3">{type.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">{type.desc}</p>

                  {/* Button */}
                  <div
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg"
                    style={{ background: type.accentLight, color: type.accent }}
                  >
                    Get Started
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: type.accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full Image Banner ── */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="Solar Energy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#033e74]/90 via-[#033e74]/70 to-[#033e74]/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">Our Commitment</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Powering a Cleaner,
              <br />
              <span className="text-cyan-400">Smarter Future</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Committed to excellence in energy storage solutions and customer satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* ── Full Image Banner ── */}
      {/* <div className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#033e74] mb-3">Contact Information</p>
            <h2 className="text-3xl font-black text-gray-900">Reach Out Anytime</h2>
          </div>

          <div
            ref={infoRef}
            className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${infoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Phone",
                value: "+91 XXXXX XXXXX",
                accent: "#0ea5e9",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: "contact@myzosolar.com",
                accent: "#8b5cf6",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Address",
                value: "Lucknow, Uttar Pradesh, India",
                accent: "#10b981",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.accent}15`, color: item.accent }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
