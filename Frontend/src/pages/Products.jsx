import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { products, seriesGroups, seriesMeta } from "../data/productDetails";

const BRAND = "#033e74";

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const visible = products.filter((product) => {
    const matchSeries = filter === "All" || product.series === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      product.model.toLowerCase().includes(q) ||
      product.type.toLowerCase().includes(q) ||
      product.series.toLowerCase().includes(q);
    return matchSeries && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <section className="bg-white border-b border-gray-100 pt-36">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Shenzhen Hithium Hero Energy</p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Great Cells.<br />
              <span style={{ color: BRAND }}>Great Power.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              LiFePO4 energy storage for homes, businesses, and beyond — engineered for 11,000 cycles and a lifetime of reliability.
            </p>
            <div className="flex flex-wrap gap-8">
              {[ ["9", "Products"], ["11,000+", "Battery Cycles"], ["4", "Product Series"], ["IP67", "Max Rating"] ].map(([value,label]) => (
                <div key={label}>
                  <div className="text-2xl font-black" style={{ color: BRAND }}>{value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[calc(2rem+4rem)] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
            <div className="flex flex-wrap gap-1.5">
              {seriesGroups.map((series) => {
                const isActive = filter === series;
                const color = series === "All" ? BRAND : (seriesMeta[series]?.color || BRAND);
                return (
                  <button
                    key={series}
                    onClick={() => setFilter(series)}
                    className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150"
                    style={{ background: isActive ? color : "transparent", color: isActive ? "#fff" : "#9ca3af", border: `1px solid ${isActive ? color : "#e5e7eb"}` }}
                  >
                    {series === "All" ? "All Products" : seriesMeta[series].label}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-52 text-sm bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-gray-300 text-gray-700 placeholder-gray-400"
              />
              <svg className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            {visible.length === products.length ? `All ${products.length} products` : `${visible.length} of ${products.length} products`}
          </p>
          {(filter !== "All" || search) && (
            <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors" onClick={() => { setFilter("All"); setSearch(""); }}>
              Clear filters ×
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 mb-4">No products match your search.</p>
            <button className="text-sm font-semibold" style={{ color: BRAND }} onClick={() => { setFilter("All"); setSearch(""); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} onClick={(p) => navigate(`/products/${p.id}`)} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border-t border-gray-100 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Browse by Series</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(seriesMeta).map(([series, meta]) => (
              <button
                key={series}
                onClick={() => { setFilter(series); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left p-5 rounded-xl border hover:shadow-sm transition-all"
                style={{ borderColor: `${meta.color}20`, background: `${meta.color}04` }}
              >
                <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: meta.color }}>{meta.label}</div>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{meta.desc}</p>
                <span className="text-xs font-bold" style={{ color: meta.color }}>Browse →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black" style={{ color: BRAND }}>HiTHIUM</span>
            <span className="text-sm text-gray-300">MyzoEE</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Shenzhen Hithium Hero Energy Equity Technology Co., Ltd · 601 Room, Building 2, San Yi Yun Du Industrial Park, Longhua New District</p>
          <a href="https://www.hero-ee.com" className="text-xs font-semibold" style={{ color: BRAND }}>www.hero-ee.com ↗</a>
        </div>
      </footer>
    </div>
  );
}
