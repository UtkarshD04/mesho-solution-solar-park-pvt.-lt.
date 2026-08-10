import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const TEAL = "#20b2aa";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/myzobess?utm_source=qr&igsh=aXJkMnJocmM1NXlz",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
  {
    name: "X",
    href: "#",
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.847-8.151-10.653h6.13l4.263 5.633 5.533-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/108724933/admin/page-posts/published/",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
];

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Customer Support", to: "/customer-support" },
  { label: "Contact", to: "/contact" },
];

const whyMyzoLinks = [
  { label: "Quality", to: "/quality" },
  { label: "Reliability", to: "/reliability" },
  { label: "Technology", to: "/technology" },
];

const officeAddresses = [
  {
    title: "Corporate Office",
    address: "Yograj Tower, Near Madhurima Sweets, Vibhuti Khand, Gomati Nagar, Lucknow, UP 226002",
  },
  {
    title: "Head Office",
    address: "413 - Fortune Gateway, TP-13, Channi, Vadodara, Gujarat - 390024",
  },
];

export default function Footer() {
  const [ref, inView] = useInView(0.05);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="text-white bg-[#011d37] relative">

      {/* Thin top accent line */}
      <div className="h-0.5 w-full" style={{ backgroundColor: TEAL }} />

      {/* Main Footer Grid */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >

          {/* Column 1 - Brand */}
          <div className="space-y-5 lg:col-span-2">
            <img
              src="/logofooter.png"
              alt="Myzo Logo"
              className="h-16 w-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Revolutionizing energy storage with advanced Battery Energy Storage System (BESS) solutions — delivering reliable, efficient, and sustainable power systems for homes, businesses, and industrial applications across India.
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              From Lucknow, we engineer, test, and certify every battery pack in-house — backed by a dedicated engineering team and a decade of experience in lithium-ion energy storage.
            </p>

            {/* Social Icons */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-3">Follow Us</p>
              <div className="flex gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    aria-label={s.name}
                    className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-md flex items-center justify-center transition-colors duration-200 border border-white/10 hover:border-[#20b2aa] focus-visible:ring-2 focus-visible:ring-[#20b2aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#011d37]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div className="space-y-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest after:block after:w-6 after:h-0.5 after:bg-[#20b2aa] after:mt-2">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Why Myzo */}
          <div className="space-y-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest after:block after:w-6 after:h-0.5 after:bg-[#20b2aa] after:mt-2">
              Why Myzo
            </h4>
            <ul className="space-y-2.5">
              {whyMyzoLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest after:block after:w-6 after:h-0.5 after:bg-[#20b2aa] after:mt-2">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-white/60">

              {/* Address */}
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#20b2aa] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">Yograj Tower, Vibhuti Khand, Gomati Nagar, Lucknow, UP 226002</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#20b2aa] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918756992444" className="hover:text-white transition-colors">+91 8756992444</a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#20b2aa] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:aseemmishra@mmyzo.com" className="hover:text-white transition-colors break-all min-w-0">aseemmishra@mmyzo.com</a>
              </li>

              {/* Working Hours */}
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#20b2aa] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon – Fri: 9AM – 6PM</span>
              </li>

            </ul>
          </div>

          {/* Column 5 - Office Addresses */}
          <div className="space-y-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest after:block after:w-6 after:h-0.5 after:bg-[#20b2aa] after:mt-2">
              Office Addresses
            </h4>
            <div className="space-y-4">
              {officeAddresses.map((office) => (
                <div key={office.title} className="rounded-md border border-white/10 p-3">
                  <div className="text-sm font-semibold text-[#20b2aa] mb-1">{office.title}</div>
                  <p className="text-sm leading-relaxed text-white/70">{office.address}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block text-sm font-bold text-white border-2 px-5 py-2.5 rounded transition-colors duration-200"
                style={{ borderColor: TEAL }}
              >
                Get In Touch
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()}  Mesho Solution Solar Park Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
            >
              Back to top
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
