import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const seriesMeta = {
  "LIGHT Series":    { label: "LIGHT Series" },
  "MaxPower Series": { label: "MaxPower Series" },
  "NeoPower Series": { label: "NeoPower Series" },
  "LEGEND Series":   { label: "LEGEND Series" },
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const seriesGroups = ["All", ...Object.keys(seriesMeta)];

  const visible = products.filter((p) => {
    const matchSeries = filter === "All" || p.series === filter;
    const q = search.toLowerCase();
    const matchSearch = !search || p.model.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.series.toLowerCase().includes(q);
    return matchSeries && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center text-white text-center">
        <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80" alt="Products Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto pt-24 pb-12">
          <h1 className="text-5xl sm:text-6xl font-black uppercase leading-tight mb-4">Our Products</h1>
          <div className="w-16 h-[3px] mx-auto mb-5" style={{ background: TEAL }} />
          <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
            Advanced LiFePO4 battery storage systems engineered for homes, businesses and industries across India.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
            {[["9", "Models"], ["30k+", "Cycles"], ["4", "Series"], ["IP67", "Protection"]].map(([val, lbl]) => (
              <div key={lbl} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4">
                <p className="text-2xl font-black text-white">{val}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {seriesGroups.map((series) => {
              const isActive = filter === series;
              return (
                <button key={series} onClick={() => setFilter(series)}
                  className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200"
                  style={isActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)`, color: "#fff" } : { background: "#f1f5f9", color: "#64748b" }}
                >
                  {series === "All" ? "All Products" : seriesMeta[series]?.label || series}
                </button>
              );
            })}
          </div>
          <div className="relative w-full max-w-sm">
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#20b2aa] transition" />
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="relative pl-6">
            <div className="absolute left-0 top-1 h-full w-1 rounded-full" style={{ background: TEAL }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: THEME }}>Product Catalog</p>
            <h2 className="text-2xl font-black uppercase text-gray-900 tracking-wide">Browse Energy Storage Solutions</h2>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            {loading ? "Loading..." : visible.length === products.length ? `All ${products.length} products` : `${visible.length} found`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array(6).fill(0).map((_, i) => <div key={i} className="h-80 rounded-2xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-16 text-center">
            <p className="text-lg font-black uppercase text-gray-900 mb-2">No Products Found</p>
            <p className="text-sm text-gray-400 mb-6">Try clearing filters or searching for another model.</p>
            <button className="rounded-xl px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}
              onClick={() => { setFilter("All"); setSearch(""); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product._id} product={product} onClick={() => navigate(`/products/${product._id}`)} />
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom Info Cards ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 lg:grid-cols-3">
          {[
            { tag: "Performance", title: "Maximum efficiency for every installation", desc: "Our modular storage systems are tuned to provide reliable backup power, fast charging, and long service life in harsh environments." },
            { tag: "Safety", title: "Smart thermal and battery management", desc: "The Myzo portfolio prioritizes safety and durability so you can deploy with confidence in any environment." },
            { tag: "Support", title: "End-to-end service and installation guidance", desc: "Our team helps you choose the right model, complete commissioning, and keep systems operating smoothly." },
          ].map(({ tag, title, desc }) => (
            <div key={tag} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${THEME}, ${TEAL})` }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: TEAL }}>{tag}</p>
              <p className="text-base font-black uppercase text-gray-900 mb-3 leading-tight">{title}</p>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
  const imgSrc = product.image ? `${API_BASE}${product.image}` : null;

  return (
    <div onClick={onClick} className="group bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
      <div className="absolute top-4 right-[-28px] z-10 rotate-45 w-28 text-center py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md" style={{ background: TEAL }}>
        Coming Soon
      </div>
      <div className="relative h-52 overflow-hidden bg-gray-100 flex items-center justify-center">
        {imgSrc ? (
          <img src={imgSrc} alt={product.model} className="w-full h-full object-cover blur-sm scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8eef7, #d0e2f6)" }}>
            <svg className="w-20 h-20 opacity-20" fill="none" stroke="#033e74" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white" style={{ background: `${THEME}cc` }}>
          {product.badge}
        </div>
      </div>
      <div className="p-6">
        <div className="h-1 w-8 rounded-full mb-4" style={{ background: TEAL }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: TEAL }}>{product.series}</p>
        <h3 className="text-lg font-black uppercase text-gray-900 tracking-wide mb-1">{product.model}</h3>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">{product.type}</p>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{product.tagline}</p>
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{product.specs?.[0]?.value}</span>
          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider" style={{ color: THEME }}>
            View Details
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
