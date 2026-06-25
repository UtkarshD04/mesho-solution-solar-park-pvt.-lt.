import { seriesMeta, icons } from "../../data/productDetails";

function ProductCard({ product, onClick }) {
  const meta = seriesMeta[product.series] || { color: "#033e74", label: product.series };

  return (
    <div
      className="group relative bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#033e74] transition-all duration-300 hover:shadow-2xl hover:shadow-[#033e74]/20 hover:-translate-y-1"
      onClick={() => onClick?.(product)}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[#033e74] to-[#0a5fa8]" />

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

        <div className="grid grid-cols-2 gap-3 mb-5">
          {product.specs.slice(0, 4).map((spec, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-2">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{spec.label}</div>
              <div className="text-xs font-semibold text-white">{spec.value}</div>
            </div>
          ))}
        </div>

        <button className="w-full py-2.5 rounded-xl border border-[#033e74] text-[#4a9eff] text-sm font-semibold hover:bg-[#033e74] hover:text-white transition-all duration-200 group-hover:bg-[#033e74] group-hover:text-white">
          View Full Specs →
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
