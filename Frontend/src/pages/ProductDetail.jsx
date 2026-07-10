import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { seriesMeta, icons } from "../data/productDetails";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const seriesIconMap = {
  "LIGHT Series": "portable",
  "MaxPower Series": "stack",
  "NeoPower Series": "battery",
  "LEGEND Series": "industrial",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [featuresRef, featuresInView] = useInView();
  const [specsRef, specsInView] = useInView();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setImgLoaded(false);
    setLoading(true);
    fetch(`${API_BASE}/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setTimeout(() => setVisible(true), 40); })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product || product.message) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0a0f1a]">
        <p className="text-gray-400 text-lg">Product not found.</p>
      </div>
    );
  }

  const meta = seriesMeta[product.series] || { color: "#033e74", label: product.series };
  const iconKey = seriesIconMap[product.series] || "home";
  const iconSvg = icons[iconKey] || "";

  // Extract key features from first 6 specs
  const keyFeatures = [
    { icon: "⚡", title: "Battery Type", value: product.specs[0]?.value || "LiFePO4", desc: "Advanced lithium iron phosphate chemistry for maximum safety and longevity" },
    { icon: "🔋", title: "Capacity", value: product.specs[1]?.value || "High Capacity", desc: "Extended runtime to power your essential devices through outages" },
    { icon: "🔄", title: "Lifecycle", value: product.specs[3]?.value || "11,000+ Cycles", desc: "Industry-leading cycle life ensures decades of reliable operation" },
    { icon: "🌡️", title: "Operating Temp", value: product.specs[11]?.value || "Wide Range", desc: "Performs reliably in extreme temperature conditions" },
    { icon: "⚙️", title: "Output Power", value: product.specs[4]?.value || "High Power", desc: "Sufficient power output for a wide range of applications" },
    { icon: "🛡️", title: "Protection", value: product.specs[10]?.value || "IP20+", desc: "Built-in protection against environmental and electrical hazards" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b18] text-white">
      <div className="absolute inset-0 bg-[#02050f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),transparent_24%)] pointer-events-none" />

      <div className="relative min-h-screen bg-[rgba(10,14,30,0.76)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.85)_0%,_rgba(15,23,42,0.45)_55%,_rgba(15,23,42,0.95)_100%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-60px_rgba(14,165,233,0.65)] backdrop-blur-2xl">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="space-y-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  {meta.label}
                </span>
                <h1 className="text-5xl sm:text-6xl font-black leading-tight text-white">
                  {product.model}
                </h1>
                <p className="text-lg text-cyan-300">{product.tagline}</p>
                <p className="max-w-xl text-gray-300">{product.description}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {product.specs.slice(0, 4).map((spec, i) => (
                    <div key={spec.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-gray-400">{spec.label}</p>
                      <p className="mt-3 text-sm font-semibold text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
                {product.image ? (
                  <img
                    src={`${API_BASE}${product.image}`}
                    alt={product.model}
                    onLoad={() => setImgLoaded(true)}
                    className="w-full h-full min-h-[420px] object-cover transition-all duration-700 ease-out"
                    style={{ opacity: imgLoaded ? 1 : 0 }}
                  />
                ) : (
                  <div className="flex h-96 items-center justify-center bg-white/5">
                    <div className="w-56 h-56" dangerouslySetInnerHTML={{ __html: iconSvg }} />
                  </div>
                )}
                <div className="absolute top-6 right-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-xl">
                  {product.type}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-8 z-20">
          <div className="relative w-full max-w-xl rounded-[2rem] border border-white/15 bg-black/75 p-10 text-center shadow-[0_30px_80px_-30px_rgba(14,165,233,0.8)] backdrop-blur-3xl transition duration-700 ease-out">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),transparent_30%)] opacity-90" />
            <div className="relative z-10 space-y-5">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300 animate-pulse">Coming Soon</p>
              <h2 className="text-4xl font-black text-white">Product page is coming soon</h2>
              <p className="max-w-xl mx-auto text-sm text-slate-300">We’re preparing the full product experience. Everything is intentionally blurred until the page is ready.</p>
              <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]">
                Smooth launch transition
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
