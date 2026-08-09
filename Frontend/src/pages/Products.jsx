import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import { resolveImageUrl } from "../utils/resolveImage";
import { useCart } from "../context/CartContext";
import SEO from "../components/common/SEO";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const seriesMeta = {
  "LIGHT Series": { label: "LIGHT Series" },
  "MaxPower Series": { label: "MaxPower Series" },
  "NeoPower Series": { label: "NeoPower Series" },
  "LEGEND Series": { label: "LEGEND Series" },
};
const seriesList = Object.keys(seriesMeta);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const [gridRef, gridInView] = useInView(0.05);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = filter === "All" ? products : products.filter((p) => p.series === filter);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Batteries & Energy Storage Products"
        description="Browse Myzo's full range of lithium-ion batteries across LIGHT, MaxPower, NeoPower, and LEGEND series for home and commercial energy storage."
        path="/products"
      />

      {/* ── Hero ── */}
      <section className="relative h-64 sm:h-80 flex items-end overflow-hidden">
        <img src="/hero1.png" alt="Myzo Products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8 w-full">
          <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
            <Link to="/" className="hover:text-white">Home</Link> / Products
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Products</h1>
        </div>
      </section>

      {/* ── Shop by Series ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Shop by Series</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {seriesList.map((series) => {
            const rep = products.find((p) => p.series === series && p.image);
            const active = filter === series;
            return (
              <button
                key={series}
                onClick={() => setFilter(active ? "All" : series)}
                className={`group text-left border rounded-lg overflow-hidden bg-white transition ${active ? "ring-1" : "border-gray-200 hover:border-gray-300"}`}
                style={active ? { borderColor: THEME, boxShadow: `0 0 0 1px ${THEME}` } : undefined}
              >
                <div className="h-28 sm:h-36 bg-gray-50 overflow-hidden flex items-center justify-center">
                  {rep ? (
                    <img
                      src={resolveImageUrl(rep.image)}
                      alt={seriesMeta[series].label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{seriesMeta[series].label}</span>
                  )}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{seriesMeta[series].label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">
              {filter === "All" ? "All Products" : seriesMeta[filter]?.label}
            </h2>
            {filter !== "All" && (
              <button
                onClick={() => setFilter("All")}
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: TEAL }}
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-sm text-gray-400">
            {loading ? "" : `${visible.length} product${visible.length === 1 ? "" : "s"}`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array(8).fill(0).map((_, i) => <div key={i} className="h-64 rounded-lg bg-gray-100 animate-pulse" />)}
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-lg p-16 text-center">
            <p className="text-base font-semibold text-gray-900 mb-2">No products in this series yet</p>
            <button
              className="text-sm font-semibold underline"
              style={{ color: THEME }}
              onClick={() => setFilter("All")}
            >
              View all products
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-6 lg:grid-cols-4 transition-opacity duration-700"
            style={{ opacity: gridInView ? 1 : 0 }}
          >
            {visible.map((product) => (
              <ProductCard key={product._id} product={product} onClick={() => navigate(`/products/${product._id}`)} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

function ProductCard({ product, onClick }) {
  const imgSrc = resolveImageUrl(product.image);
  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onClick={onClick}
      className="group border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer transition hover:border-gray-300 hover:shadow-sm"
    >
      <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.model}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Image Pending</span>
        )}
        {product.badge && (
          <span
            className="absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: THEME }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{product.series}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{product.model}</h3>
        <p className="text-[11px] text-orange-600 font-semibold uppercase tracking-wide mt-2 mb-3">Coming Soon</p>
        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold uppercase tracking-wide text-white transition-all duration-200 active:scale-95"
          style={{ background: added ? "#16a34a" : TEAL }}
        >
          {added ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Added
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.591-7.159a1.125 1.125 0 00-1.087-1.391H5.106M7.5 14.25L5.106 5.106" />
              </svg>
              {isInCart(product._id) ? "Add More" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
