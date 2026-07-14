import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const seriesMeta = {
  "LIGHT Series":    { label: "LIGHT Series" },
  "MaxPower Series": { label: "MaxPower Series" },
  "NeoPower Series": { label: "NeoPower Series" },
  "LEGEND Series":   { label: "LEGEND Series" },
};

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Why Myzo", to: "/why-myzo", dropdown: [
    { label: "Quality", to: "/quality" },
    { label: "Reliability", to: "/reliability" },
    { label: "Technology", to: "/technology" },
  ]},
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [whyDropdown, setWhyDropdown] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileWhyOpen, setMobileWhyOpen] = useState(false);
  const whyTimeout = useRef(null);
  const [activeSeries, setActiveSeries] = useState("");
  const [signupDropdown, setSignupDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const signupTimeout = useRef(null);
  const dropdownTimeout = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          const first = [...new Set(data.map(p => p.series))][0];
          if (first) setActiveSeries(first);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [...new Set(products.map(p => p.series))];
  const productOptions = categories.reduce((acc, series) => {
    acc[series] = products.filter(p => p.series === series);
    return acc;
  }, {});

  return (
    <nav
      className="fixed top-0 lg:top-12 w-full z-40"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Shutter background — desktop only, hide on mobile when menu open */}
      <div
        className="absolute inset-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 transition-transform duration-500 ease-in-out"
        style={{ transformOrigin: "top", transform: (scrolled && !menuOpen) ? "scaleY(1)" : "scaleY(0)" }}
      />

      {/* Navbar Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-1.5 overflow-visible">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105" style={{ filter: (scrolled && !menuOpen) ? "none" : "brightness(0) invert(1)" }} onError={(e) => { e.target.style.display = "none"; }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                if (link.label === "Why Myzo") {
                  return (
                    <div key={link.to} className="relative"
                      onMouseEnter={() => { clearTimeout(whyTimeout.current); setWhyDropdown(true); }}
                      onMouseLeave={() => { whyTimeout.current = setTimeout(() => setWhyDropdown(false), 120); }}
                    >
                      <button type="button"
                        className={`relative text-base font-bold tracking-wide transition-colors duration-200 inline-flex items-center gap-2 ${
                          scrolled ? "text-slate-700 hover:text-[#033e74]" : "text-white/90 hover:text-white"
                        }`}
                      >
                        Why Myzo
                        <svg className={`w-4 h-4 ${scrolled ? "text-[#20b2aa]" : "text-white/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    <div
                        className={`absolute left-0 top-full mt-4 w-44 rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${whyDropdown ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"}`}
                        onMouseEnter={() => { clearTimeout(whyTimeout.current); setWhyDropdown(true); }}
                        onMouseLeave={() => { whyTimeout.current = setTimeout(() => setWhyDropdown(false), 120); }}
                      >
                        {link.dropdown.map((item) => (
                          <Link key={item.to} to={item.to}
                            onClick={() => setWhyDropdown(false)}
                            className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#033e74] hover:bg-slate-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (link.label === "Products") {
                  return (
                    <div
                      key={link.to}
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(dropdownTimeout.current);
                        setProductsDropdown(true);
                      }}
                      onMouseLeave={() => {
                        clearTimeout(dropdownTimeout.current);
                        dropdownTimeout.current = setTimeout(() => setProductsDropdown(false), 120);
                      }}
                    >
                      <button
                        className={`relative text-base font-bold tracking-wide transition-colors duration-200 inline-flex items-center gap-2 ${
                          scrolled ? "text-slate-700 hover:text-[#033e74]" : "text-white/90 hover:text-white"
                        }`}
                        type="button"
                      >
                        Products
                        <svg className={`w-4 h-4 ${scrolled ? "text-[#20b2aa]" : "text-white/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div
                        className={`absolute left-0 top-full mt-4 w-[500px] rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ${productsDropdown ? "opacity-100 pointer-events-auto scale-100 translate-y-0" : "opacity-0 pointer-events-none scale-95 -translate-y-2"}`}
                        onMouseEnter={() => {
                          clearTimeout(dropdownTimeout.current);
                          setProductsDropdown(true);
                        }}
                        onMouseLeave={() => {
                          clearTimeout(dropdownTimeout.current);
                          dropdownTimeout.current = setTimeout(() => setProductsDropdown(false), 120);
                        }}
                      >
                        <div className="flex overflow-hidden rounded-2xl">
                          <div className="w-48 border-r border-slate-100 p-4 space-y-2 bg-gradient-to-b from-slate-50 to-white">
                            {categories.map((series) => (
                              <button
                                key={series}
                                type="button"
                                onMouseEnter={() => setActiveSeries(series)}
                                className={`block w-full text-left text-xs font-bold uppercase tracking-wider rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                  activeSeries === series ? "bg-[#033e74] text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                {seriesMeta[series]?.label || series}
                              </button>
                            ))}
                          </div>

                          <div className="w-80 p-5 bg-white">
                            <div className="text-xs font-bold uppercase tracking-widest text-[#033e74] mb-3 flex items-center gap-2">
                              <div className="w-1 h-4 bg-[#20b2aa] rounded-full" />
                              Choose a model
                            </div>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                              {(productOptions[activeSeries] || []).map((product) => (
                                <button
                                  key={product.id}
                                  type="button"
                                  className="w-full text-left rounded-xl p-3 transition-all duration-200 border border-transparent hover:border-[#20b2aa] hover:bg-gradient-to-r hover:from-[#f0f9f9] hover:to-white"
                                  onMouseEnter={() => setProductsDropdown(true)}
                                  onClick={() => { setProductsDropdown(false); navigate(`/products/${product._id}`); }}
                                >
                                  <div className="text-sm font-bold text-slate-900 group-hover:text-[#033e74]">{product.model}</div>
                                  <p className="text-xs text-slate-500 mt-0.5">{product.type}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative text-base font-bold tracking-wide transition-all duration-200 group ${
                        isActive 
                          ? (scrolled ? "text-[#033e74]" : "text-white") 
                          : (scrolled ? "text-slate-600 hover:text-[#033e74]" : "text-white/80 hover:text-white")
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#033e74] to-[#20b2aa] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Customer Support Link */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink
                to="/customer-support"
                className={({ isActive }) =>
                  `relative text-base font-bold tracking-wide transition-all duration-200 group ${
                    isActive
                      ? (scrolled ? "text-[#033e74]" : "text-white")
                      : (scrolled ? "text-slate-600 hover:text-[#033e74]" : "text-white/80 hover:text-white")
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Customer Support
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#033e74] to-[#20b2aa] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </>
                )}
              </NavLink>

              {/* Sign In / Logout */}
              {isLoggedIn ? (
                <Link
                  to="/my-account"
                  className={`flex items-center gap-2 text-base font-bold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                    scrolled
                      ? "text-white bg-gradient-to-r from-[#033e74] to-[#20b2aa] hover:from-[#022d55] hover:to-[#1a948e]"
                      : "text-white bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Account
                </Link>
              ) : (
                <div
                  className="relative"
                  onMouseEnter={() => { clearTimeout(signupTimeout.current); setSignupDropdown(true); }}
                  onMouseLeave={() => { signupTimeout.current = setTimeout(() => setSignupDropdown(false), 150); }}
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 text-base font-bold text-white bg-gradient-to-r from-[#033e74] to-[#20b2aa] hover:from-[#022d55] hover:to-[#1a948e] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign In
                  </button>

                  <div
                    className={`absolute right-0 top-full mt-3 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-200 ${signupDropdown ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"}`}
                    onMouseEnter={() => { clearTimeout(signupTimeout.current); setSignupDropdown(true); }}
                    onMouseLeave={() => { signupTimeout.current = setTimeout(() => setSignupDropdown(false), 150); }}
                  >
                    <Link
                      to="/signup"
                      onClick={() => setSignupDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-[#f0f9f9] hover:to-white hover:text-[#033e74] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#20b2aa]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#033e74]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold">Sign In</div>
                        <div className="text-xs text-slate-500">Access your account</div>
                      </div>
                    </Link>
                    <div className="h-px bg-slate-100 mx-3" />
                    <Link
                      to="/create-account"
                      onClick={() => setSignupDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-[#f0f9f9] hover:to-white hover:text-[#033e74] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#20b2aa]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#033e74]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold">Create Account</div>
                        <div className="text-xs text-slate-500">Join Myzo Battery</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="flex lg:hidden items-center gap-1">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  (scrolled && !menuOpen) ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen
                  ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                }
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-1 shadow-xl">
          {/* Products accordion */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full py-3 text-base font-bold text-slate-700"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              Products
              <svg className={`w-4 h-4 text-[#20b2aa] transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileProductsOpen && (
              <div className="mt-2 mb-3 border border-slate-200 rounded-xl overflow-hidden">
                {/* Series tabs */}
                <div className="flex gap-1 flex-wrap p-3 bg-slate-50 border-b border-slate-200">
                  {categories.map((series) => (
                    <button
                      key={series}
                      type="button"
                      onClick={() => setActiveSeries(series)}
                      className={`text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 transition-all ${
                        activeSeries === series ? "bg-[#033e74] text-white" : "text-slate-600 bg-white border border-slate-200"
                      }`}
                    >
                      {seriesMeta[series]?.label || series}
                    </button>
                  ))}
                </div>
                {/* Products list */}
                <div className="p-2 space-y-1">
                  {(productOptions[activeSeries] || []).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => { setMenuOpen(false); setMobileProductsOpen(false); navigate(`/products/${product._id}`); }}
                      className="w-full text-left block rounded-lg px-3 py-2.5 border border-transparent hover:border-[#20b2aa] hover:bg-[#f0f9f9] transition-all"
                    >
                      <div className="text-sm font-bold text-slate-900">{product.model}</div>
                      <p className="text-xs text-slate-500 mt-0.5">{product.type}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks
            .filter((link) => link.label !== "Products" && link.label !== "Why Myzo")
            .map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-base font-semibold transition-colors duration-200 ${
                    isActive ? "text-[#033e74]" : "text-slate-600 hover:text-[#033e74]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

          {/* Why Myzo mobile accordion */}
          <div>
            <button type="button"
              className="flex items-center justify-between w-full py-3 text-base font-bold text-slate-700"
              onClick={() => setMobileWhyOpen(!mobileWhyOpen)}
            >
              Why Myzo
              <svg className={`w-4 h-4 text-[#20b2aa] transition-transform ${mobileWhyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileWhyOpen && (
              <div className="mb-3 border border-slate-200 rounded-xl overflow-hidden">
                {[{ label: "Quality", to: "/quality" }, { label: "Reliability", to: "/reliability" }, { label: "Technology", to: "/technology" }].map((item) => (
                  <Link key={item.to} to={item.to}
                    onClick={() => { setMenuOpen(false); setMobileWhyOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f0f9f9] hover:text-[#033e74] border-b border-slate-100 last:border-0 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#20b2aa]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink
            to="/customer-support"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block py-3 text-base font-semibold transition-colors duration-200 ${
                isActive ? "text-[#033e74]" : "text-slate-600 hover:text-[#033e74]"
              }`
            }
          >
            Customer Support
          </NavLink>

          <div className="h-px bg-slate-200 my-2" />

          {isLoggedIn ? (
            <Link
              to="/my-account"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-base font-bold text-[#033e74] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Account
            </Link>
          ) : (
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-base font-semibold text-slate-600 hover:text-[#033e74] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}