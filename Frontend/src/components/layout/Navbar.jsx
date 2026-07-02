import { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { products, seriesGroups, seriesMeta } from "../../data/productDetails";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [activeSeries, setActiveSeries] = useState(seriesGroups.find((series) => series !== "All") ?? "");
  const dropdownTimeout = useRef(null);
  const navigate = useNavigate();

  const categories = seriesGroups.filter((series) => series !== "All");

  const productOptions = categories.reduce((acc, series) => {
    acc[series] = products.filter((product) => product.series === series);
    return acc;
  }, {});

  return (
    <nav className="fixed top-8 w-full z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* Normal Navbar */}
      <div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-2 overflow-visible">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain -my-3" onError={(e) => { e.target.style.display = "none"; }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, index) => {
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
                        className="relative text-sm font-medium tracking-wide text-gray-600 hover:text-[#033e74] transition-colors duration-200 inline-flex items-center gap-1"
                        type="button"
                      >
                        Products
                        <span className="text-xs text-gray-400">▾</span>
                      </button>

                      <div
                        className={`absolute left-0 top-full mt-3 w-96 rounded-3xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5 transition duration-200 ${productsDropdown ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"}`}
                        onMouseEnter={() => {
                          clearTimeout(dropdownTimeout.current);
                          setProductsDropdown(true);
                        }}
                        onMouseLeave={() => {
                          clearTimeout(dropdownTimeout.current);
                          dropdownTimeout.current = setTimeout(() => setProductsDropdown(false), 120);
                        }}
                      >
                        <div className="flex overflow-hidden rounded-3xl">
                          <div className="w-44 border-r border-gray-100 p-4 space-y-2 bg-gray-50">
                            {categories.map((series) => (
                              <button
                                key={series}
                                type="button"
                                onMouseEnter={() => setActiveSeries(series)}
                                className={`block w-full text-left text-xs font-semibold uppercase tracking-wider rounded-2xl px-3 py-2 transition ${
                                  activeSeries === series ? "bg-[#033e74] text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {seriesMeta[series]?.label || series}
                              </button>
                            ))}
                          </div>

                          <div className="w-80 p-4">
                            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Choose a model</div>
                            <div className="space-y-2">
                              {(productOptions[activeSeries] || []).map((product) => (
                                <button
                                  key={product.id}
                                  type="button"
                                  className="w-full text-left rounded-2xl p-3 transition border border-transparent hover:border-[#033e74] hover:bg-[#f5fbff]"
                                  onMouseEnter={() => setProductsDropdown(true)}
                                  onClick={() => { setProductsDropdown(false); navigate(`/products/${product.id}`); }}
                                >
                                  <div className="text-sm font-semibold text-gray-900">{product.model}</div>
                                  <p className="text-xs text-gray-500">{product.type}</p>
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
                );
              })}
            </div>

            {/* Customer Support Link */}
            <Link
              to="/customer-support"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#033e74] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support
            </Link>
            <div className="flex lg:hidden items-center gap-1">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-10 py-3 space-y-1 shadow-lg">
          {/* Products accordion */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              Products
              <span className="text-xs text-gray-400">{mobileProductsOpen ? "▴" : "▾"}</span>
            </button>
            {mobileProductsOpen && (
              <div className="mt-1 mb-2 border border-gray-100 rounded-2xl overflow-hidden">
                {/* Series tabs */}
                <div className="flex gap-1 flex-wrap p-2 bg-gray-50 border-b border-gray-100">
                  {categories.map((series) => (
                    <button
                      key={series}
                      type="button"
                      onClick={() => setActiveSeries(series)}
                      className={`text-xs font-semibold uppercase tracking-wider rounded-xl px-3 py-1 transition ${
                        activeSeries === series ? "bg-[#033e74] text-white" : "text-gray-600 bg-white border border-gray-200"
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
                      onClick={() => { setMenuOpen(false); setMobileProductsOpen(false); navigate(`/products/${product.id}`); }}
                      className="w-full text-left block rounded-xl px-3 py-2 border border-transparent hover:border-[#033e74] hover:bg-[#f5fbff] transition"
                    >
                      <div className="text-sm font-semibold text-gray-900">{product.model}</div>
                      <p className="text-xs text-gray-500">{product.type}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks
            .filter((link) => link.label !== "Products")
            .map((link) => (
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
          <NavLink
            to="/customer-support"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block py-2 text-sm font-medium transition-colors duration-200 ${
                isActive ? "text-[#033e74]" : "text-gray-600 hover:text-[#033e74]"
              }`
            }
          >
            Customer Support
          </NavLink>
        </div>
      )}
    </nav>
  );
}
