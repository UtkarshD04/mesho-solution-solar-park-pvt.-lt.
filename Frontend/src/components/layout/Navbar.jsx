import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="fixed top-8 w-full z-40 bg-white shadow-md border-b border-gray-100">

      {/* Search Bar - smooth transition */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex items-center w-full px-6 lg:px-10 gap-3 py-4">
          <svg className="w-6 h-6 text-[#20b2aa] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            autoFocus={searchOpen}
            placeholder="Search..."
            className="flex-1 text-lg focus:outline-none"
          />
          <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-500 hover:text-[#20b2aa] transition-colors shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Normal Navbar - smooth transition */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "max-h-0 opacity-0" : "max-h-28 opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Myzo Logo"
                className="h-20 w-auto object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "Customer Review", to: "/customer-review" },
                { label: "Articles", to: "/article" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative text-2xl font-serif transition-colors duration-200 group ${
                      isActive ? "text-[#20b2aa]" : "text-gray-600 hover:text-[#20b2aa]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#20b2aa] rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Search Icon - desktop only */}
            <button
              className="hidden lg:block p-2 rounded-lg text-gray-600 hover:text-[#20b2aa] transition-colors duration-200"
              onClick={() => setSearchOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Mobile: search + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                className="p-2 rounded-lg text-gray-600 hover:text-[#20b2aa] transition-colors duration-200"
                onClick={() => setSearchOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <span className="text-3xl">✕</span> : <span className="text-3xl">☰</span>}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && !searchOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2 shadow-lg">
          {[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: "About Us", to: "/about" },
            { label: "Customer Review", to: "/customer-review" },
            { label: "Articles", to: "/article" },
            { label: "Contact Us", to: "/contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-xl font-normal transition-colors duration-200 ${
                  isActive ? "text-[#20b2aa]" : "text-gray-600 hover:text-[#20b2aa]"
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
