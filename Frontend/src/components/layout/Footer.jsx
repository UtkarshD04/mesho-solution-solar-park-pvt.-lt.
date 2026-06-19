import { useState } from "react";
import { Link } from "react-router-dom";
 import Contact from "../pages/Contact.jsx";

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
  {
    name: "Facebook",
    href: "#",
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    name: "X",
    href: "#",
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.847-8.151-10.653h6.13l4.263 5.633 5.533-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
];

export default function Footer() {
  

  
  return (
    <footer className="bg-[#178f88] text-white">

      {/* Top Section - Info + Contact Form */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left - Brand + Info */}
          <div className="lg:col-span-1 space-y-8">

            {/* Brand */}
            <div>
              <img src="/logo2.png" alt="Myzo Logo" className="h-14 w-auto object-contain mb-3" onError={(e) => { e.target.style.display = "none"; }} />
              <p className="text-white/75 text-sm leading-relaxed">
                Revolutionizing Energy Storage with Advanced BESS Solutions. Delivering Reliable, Efficient and Sustainable Power Systems.
              </p>
            </div>

            {/* Head Office */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 border-b border-white/20 pb-2">Head Office</h4>
              <div className="flex items-start gap-2 text-sm text-white/75">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Yogiraj Tower, Vibhuti Khand, Gomatinagar, Lucknow UP 226002</span>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 border-b border-white/20 pb-2">Contact Info</h4>
              <ul className="space-y-2 text-sm text-white/75">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+917275565700" className="hover:text-white transition-colors">+91 7275565700</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:aseemmishra82@gmail.com" className="hover:text-white transition-colors">aseemmishra82@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Mon – Fri: 9AM – 6PM</span>
                </li>
              </ul>
            </div>

            {/* Branches */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 border-b border-white/20 pb-2">Our Branches</h4>
              <div className="grid grid-cols-2 gap-1.5 text-sm text-white/75">
                {["Lucknow", "Gorakhpur", "Noida", "Jaipur", "Gujarat", "Uttarakhand"].map((city) => (
                  <div key={city} className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {city}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 border-b border-white/20 pb-2">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a key={s.name} href={s.href} title={s.name} className="w-8 h-8 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right - Contact Form (larger) */}
          {/* <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>

            {sent ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-lg font-bold mb-1">Message Sent!</h3>
                <p className="text-white/70 text-sm mb-4">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-white underline text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Country <span className="text-red-300">*</span></label>
                    <select name="country" required value={form.country} onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white placeholder-white/50">
                      <option value="" className="text-gray-800">Select Country</option>
                      {["India", "United States", "United Kingdom", "UAE", "Australia", "Canada", "Germany", "Singapore"].map(c => (
                        <option key={c} className="text-gray-800">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">City <span className="text-red-300">*</span></label>
                    <input type="text" name="city" required placeholder="Enter your city" value={form.city} onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Postal Code <span className="text-red-300">*</span></label>
                    <input type="text" name="postalCode" required placeholder="Enter postal code" value={form.postalCode} onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Mobile No. <span className="text-red-300">*</span></label>
                    <input type="tel" name="mobile" required placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Telephone</label>
                    <input type="tel" name="telephone" placeholder="Enter telephone number" value={form.telephone} onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-3">I want to contact for <span className="text-red-300">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {contactReasons.map((reason) => (
                      <label key={reason} className={`flex items-center gap-3 border rounded-lg px-4 py-2.5 cursor-pointer transition-colors ${
                        form.reason === reason ? "border-white bg-white/20" : "border-white/20 hover:border-white/50"
                      }`}>
                        <input type="radio" name="reason" value={reason} checked={form.reason === reason} onChange={handleChange} className="accent-white" />
                        <span className="text-sm text-white/90">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-white text-[#178f88] font-semibold text-sm hover:bg-white/90 transition-colors">
                  Send Message
                </button>

              </form>
            )}
          </div> */}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Mesho Solution Solar Park Pvt. Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
