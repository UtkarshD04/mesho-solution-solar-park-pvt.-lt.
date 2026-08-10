import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

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
  const [ref, inView] = useInView(0.05);

  return (
    <section className="bg-white py-14">
      <div ref={ref} className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <div>
            <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900">
              Our Products
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Clean, reliable energy for everyone — powering homes, businesses, and ambitions across India.
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 text-sm font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            style={{ color: "#033e74" }}
          >
            All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          {homeProducts.map((p, i) => (
            <div
              key={p.id}
              className="rounded-lg bg-white overflow-hidden flex flex-col shrink-0 snap-start w-[240px] sm:w-[260px] transition-all duration-700"
              style={{ boxShadow: CARD_SHADOW, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.model}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/f8f9fa/033e74?text=${encodeURIComponent(p.model)}`;
                    }}
                    className="max-h-[160px] w-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Image Pending</span>
                  </div>
                )}
                <span className="absolute top-3 right-3 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                  Coming Soon
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-900 leading-relaxed mb-1 line-clamp-2">{p.model}</h3>
                <p className="text-xs text-gray-500">{p.series}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
