import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const homeProducts = [
  {
    id: 1,
    series: "Portable Compact Package",
    model: "MyzoEE HC200 — 200W Portable Solar Panel for IPS",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
  },
  {
    id: 2,
    series: "Portable Compact Package",
    model: "MyzoEE 1 — Portable Power Station | Lithium IPS India",
    image: "",
  },
  {
    id: 3,
    series: "Energy Storage System",
    model: "MyzoEE 16 — 16kWh LiFePO4 Battery Pack | Home Energy Storage",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    id: 4,
    series: "Portable Compact Package",
    model: "MyzoEE 2 — 2kWh Portable IPS Station | Best Lithium IPS",
    image: "https://images.unsplash.com/photo-1591129844517-4c84e9acac8f?w=800&q=80",
  }
];

export default function ProductShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-14 pb-4 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        
        {/* Title Area */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Products
            </h2>
            <p className="text-slate-500 text-xs mt-1.5 font-medium">
              Let green energy benefit all mankind and help the strugglers achieve their dreams
            </p>
          </div>
          <Link
            to="/products"
            className="text-[#339db9] hover:text-[#25768c] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors duration-200 shrink-0"
          >
            All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Tab */}
        <div className="mb-8 border-b border-slate-100 pb-2">
          <span className="text-[#339db9] text-xs font-bold uppercase tracking-wider border-b-2 border-[#339db9] pb-2 inline-block">
            New Arrivals In Stock
          </span>
        </div>

        {/* Static Grid (No Slider) with Staggered Animation */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeProducts.map((p, index) => {
            return (
              <div
                key={p.id}
                className="w-full flex flex-col group transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Container with Coming Soon overlay */}
                <div className="relative w-full h-[260px] bg-[#f8f9fa] rounded-sm overflow-hidden flex items-center justify-center p-4 border border-slate-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.model}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/f8f9fa/339db9?text=${encodeURIComponent(p.model)}`;
                      }}
                      className="max-h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <svg className="w-12 h-12 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Image Pending</span>
                    </div>
                  )}

                  {/* Coming Soon Glass Overlay over Image */}
                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px] flex items-center justify-center z-10">
                    <span className="px-3 py-1.5 rounded-sm bg-orange-600/90 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-md">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Metadata centered underneath */}
                <div className="mt-4 text-center px-1 space-y-1.5 flex-1 flex flex-col justify-start">
                  <h3 className="text-xs font-bold text-slate-800 leading-relaxed hover:text-[#339db9] transition-colors duration-200 line-clamp-2">
                    {p.model}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {p.series}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

