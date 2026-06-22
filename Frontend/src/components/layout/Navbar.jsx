import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Customer Review", to: "/customer-review" },
  { label: "Articles", to: "/article" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="fixed top-8 w-full z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* Search Bar */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex items-center w-full px-6 lg:px-10 gap-3 py-3">
          <svg className="w-5 h-5 text-[#033e74] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input type="text" autoFocus={searchOpen} placeholder="Search..." className="flex-1 text-sm focus:outline-none" />
          <button onClick={() => setSearchOpen(false)} className="p-1 text-gray-500 hover:text-[#033e74] transition-colors shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Normal Navbar */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "max-h-0 opacity-0" : "max-h-20 opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-2">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" onError={(e) => { e.target.style.display = "none"; }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium tracking-wide transition-colors duration-200 group ${
                      isActive ? "text-[#033e74]" : "text-gray-600 hover:text-[#033e74]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#033e74] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Search Icon */}
            <button className="hidden lg:block p-2 text-gray-500 hover:text-[#033e74] transition-colors duration-200" onClick={() => setSearchOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Mobile icons */}
            <div className="flex lg:hidden items-center gap-1">
              <button className="p-2 text-gray-500 hover:text-[#033e74] transition-colors" onClick={() => setSearchOpen(true)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && !searchOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#033e74]" : "text-gray-600 hover:text-[#033e74]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
