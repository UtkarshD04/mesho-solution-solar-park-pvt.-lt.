import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";

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
    external: false,
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
    external: false,
  },
];

const officeContactCards = [
  {
    key: "office-email",
    label: "Office Email",
    value: "aseemmishra@mmyzo.com",
    href: "mailto:aseemmishra@mmyzo.com",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "mobile-number",
    label: "Mobile Number",
    value: "+91 8756992444",
    href: "tel:+918756992444",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    key: "corporate-office",
    label: "Corporate Office",
    value: "Yograj Tower, Near Madhurima Sweets, Vibhuti Khand, Gomati Nagar, Lucknow, UP 226002",
    href: "https://www.google.com/maps/search/?api=1&query=Yograj%20Tower%20Near%20Madhurima%20Sweets%20Vibhuti%20Khand%20Gomati%20Nagar%20Lucknow%20UP%20226002",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: "head-office",
    label: "Head Office",
    value: "413 - Fortune Gateway, TP-13, Channi, Vadodara, Gujarat - 390024",
    href: "https://www.google.com/maps/search/?api=1&query=413%20Fortune%20Gateway%20TP-13%20Channi%20Vadodara%20Gujarat%20390024",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [officeRef, officeInView] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero + Cards combined ── */}
      <div className="relative overflow-hidden">
        <div className="relative min-h-[75vh] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
          <div
            className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-48 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)" }}
          >
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
        <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-36 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {contactTypes.map((type, i) => (
              <div
                key={type.key}
                className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl bg-white border border-gray-100"
                style={{
                  opacity: heroLoaded ? 1 : 0,
                  transform: heroLoaded ? "translateY(0)" : "translateY(32px)",
                  transitionDelay: `${i * 150 + 200}ms`,
                }}
                onClick={() => type.external ? window.open(type.route, "_blank") : navigate(type.route)}
              >
                <div className="p-10">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: type.accentLight, color: type.accent }}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{type.label}</h3>
                  <p className="text-sm font-semibold text-gray-700 mb-3">{type.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">{type.desc}</p>
                  <div
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg"
                    style={{ background: type.accentLight, color: type.accent }}
                  >
                    {type.external ? "mmyzo.com" : "Get Started"}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.external ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M9 5l7 7-7 7"} />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: type.accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Office Locations ── */}
      <section ref={officeRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeContactCards.map((card, i) => (
              <a
                key={card.key}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/70 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  opacity: officeInView ? 1 : 0,
                  transform: officeInView ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#e8eef7]" />
                <div className="relative flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#e8eef7] text-[#033e74] flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {card.icon}
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-3">{card.label}</h2>
                  <p className="text-sm font-bold leading-relaxed text-gray-700 break-words">{card.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
