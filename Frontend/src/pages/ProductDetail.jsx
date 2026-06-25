import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products, seriesMeta, icons } from "../data/productDetails";

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
  const product = products.find((p) => p.id === Number(id));
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [featuresRef, featuresInView] = useInView();
  const [specsRef, specsInView] = useInView();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setImgLoaded(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) {
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
    <div className="min-h-screen bg-[#0a0f1a]">

      {/* ── Hero Section with Full-Screen Product Showcase ── */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0f1829] to-[#1a1f35]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
        </div>

        {/* Back navigation */}
        <div
          className="absolute top-28 left-6 z-20"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
        >
       
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Product Image/Icon */}
            <div
              className="relative"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.9)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-10 shadow-2xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.model}
                    onLoad={() => setImgLoaded(true)}
                    className="w-full h-auto transition-all duration-700 hover:scale-105"
                    style={{ opacity: imgLoaded ? 1 : 0 }}
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="w-64 h-64 transition-transform duration-500 hover:scale-110" dangerouslySetInnerHTML={{ __html: iconSvg }} />
                  </div>
                )}
                
                {/* Floating badge */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl" style={{ background: `${meta.color}30`, color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {product.type}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right - Product Info */}
            <div
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4 inline-block">
                {meta.label}
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {product.model}
              </h1>
              <p className="text-xl font-medium text-cyan-400 mb-6">{product.tagline}</p>
              <p className="text-gray-400 leading-relaxed mb-8 text-base">{product.description}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.specs.slice(0, 4).map((spec, i) => (
                  <div
                    key={spec.label}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
                    style={{ transitionDelay: `${i * 80 + 500}ms` }}
                  >
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">{spec.label}</div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{spec.value}</div>
                  </div>
                ))}
              </div>

              <button
                className="px-10 py-4 rounded-xl text-white text-base font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" }}
              >
                <span className="relative z-10">Request a Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Features Section ── */}
      <div className="relative py-24 bg-gradient-to-b from-[#0a0f1a] to-[#0f1520]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div
            ref={featuresRef}
            className={`text-center mb-16 transition-all duration-700 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3 inline-block">Advanced Technology</span>
            <h2 className="text-4xl font-black text-white mb-4">Product Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Engineered with cutting-edge technology for unmatched performance and reliability</p>
          </div>

          {/* Features Grid with Hero-style Images */}
          <div className="grid lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, i) => (
              <div
                key={i}
                className={`relative group transition-all duration-700 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  
                  {/* Feature Image with minimal overlay */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        i === 0 ? '1620714223084-8fcacc2dbe4d' :
                        i === 1 ? '1558618666-fcd25c85cd64' :
                        i === 2 ? '1451187580459-43490279c0fa' :
                        i === 3 ? '1473341304170-971dccb5ac1e' :
                        i === 4 ? '1581091226825-a6a2a5aee158' :
                        '1565008576549-57569a49371d'
                      }?w=600&q=80`}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Only title and value at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-2xl font-black text-cyan-400">{feature.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full Specifications ── */}
      <div className="relative py-24 bg-[#0a0f1a]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div
            ref={specsRef}
            className={`text-center mb-12 transition-all duration-700 ${specsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3 inline-block">Technical Data</span>
            <h2 className="text-4xl font-black text-white mb-4">Full Specifications</h2>
          </div>

          <div
            className={`rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-700 ${specsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {product.specs.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-8 py-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all duration-200 group"
              >
                <span className="text-sm text-gray-400 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{spec.label}</span>
                <span className="text-base text-white font-semibold text-right">{spec.value}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-8">
            * Specifications are for reference only. Official datasheet shall prevail.
          </p>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              className="px-12 py-5 rounded-xl text-white text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" }}
            >
              <span className="relative z-10">Download Datasheet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
