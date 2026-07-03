import { seriesMeta, icons } from "../../data/productDetails";

const ribbonStyle = {
  position: "absolute",
  top: "22px",
  left: "-32px",
  width: "130px",
  textAlign: "center",
  padding: "5px 0",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "0.08em",
  color: "#fff",
  background: "linear-gradient(90deg, #ff6a00, #ee0979)",
  transform: "rotate(-45deg)",
  boxShadow: "0 2px 8px rgba(238,9,121,0.4)",
  zIndex: 10,
  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

function ProductCard({ product, onClick }) {
  const meta = seriesMeta[product.series] || { color: "#033e74", label: product.series };
  const visibleSpecs = product.specs.slice(0, 3);
  const hiddenSpecs = product.specs.slice(3);

  return (
    <div
      className="group relative bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#033e74] transition-all duration-300 hover:shadow-2xl hover:shadow-[#033e74]/20 hover:-translate-y-1"
      onClick={() => onClick?.(product)}
    >
      {/* Diagonal Ribbon */}
      <div style={ribbonStyle} className="ribbon-shine">
        ⚡ COMING SOON
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-[#ff6a00] to-[#ee0979]" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4a9eff]">
            {meta.label}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-[#033e74] border border-[#033e74]/20">
            {product.badge}
          </span>
        </div>

        <div className="w-full h-36 rounded-xl bg-gradient-to-br from-[#033e74]/30 to-[#0a1628] border border-white/5 flex items-center justify-center mb-5">
          <div className="w-20 h-20" dangerouslySetInnerHTML={{ __html: icons[product.icon] || "" }} />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{product.model}</h3>
        <p className="text-sm text-[#4a9eff] mb-3 font-medium">{product.tagline}</p>
        <p className="text-xs text-white/50 leading-relaxed mb-5 line-clamp-2">{product.description}</p>

        {/* Visible specs */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {visibleSpecs.map((spec, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-2">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{spec.label}</div>
              <div className="text-xs font-semibold text-white">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Blurred hidden specs with frosted overlay */}
        {hiddenSpecs.length > 0 && (
          <div className="relative mb-5 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 gap-3 p-3 blur-[3px] select-none pointer-events-none">
              {hiddenSpecs.slice(0, 6).map((spec, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-2">
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{spec.label}</div>
                  <div className="text-xs font-semibold text-white/60">{"█".repeat(Math.min(spec.value.length, 10))}</div>
                </div>
              ))}
            </div>
            {/* Frosted glass overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{
                background: "rgba(10,22,40,0.55)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-[11px] font-semibold text-white/80 text-center px-3 leading-snug">
                🔒 Full Specifications Available<br />After Official Launch
              </p>
            </div>
          </div>
        )}

        {/* Notify Me CTA */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-bold tracking-wide text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(90deg, #ff6a00, #ee0979)", boxShadow: "0 4px 14px rgba(238,9,121,0.3)" }}
          onClick={(e) => e.stopPropagation()}
        >
          🔔 Notify Me
        </button>
      </div>

      <style>{`
        .ribbon-shine::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: ribbonGloss 2.8s infinite;
        }
        @keyframes ribbonGloss {
          0% { left: -60%; }
          60%, 100% { left: 130%; }
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
