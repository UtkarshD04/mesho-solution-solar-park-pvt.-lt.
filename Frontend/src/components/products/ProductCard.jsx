import { seriesMeta, icons } from "../../data/productDetails";

function ProductCard({ product, onClick }) {
  const meta = seriesMeta[product.series] || { color: "#20b2aa", label: product.series };
  const specs = product.specs.slice(0, 4);

  return (
    <div
      className="group relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#20b2aa]/30 hover:shadow-[#20b2aa]/20 cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#20b2aa] via-[#50e3c2] to-[#8dd5ff]" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{meta.label}</p>
            <h3 className="mt-3 text-2xl font-black text-white">{product.model}</h3>
          </div>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
            {product.badge}
          </span>
        </div>

        <div className="flex items-center justify-center rounded-[28px] bg-slate-900 border border-slate-800 p-8 mb-6">
          <div className="h-24 w-24" dangerouslySetInnerHTML={{ __html: icons[product.icon] || "" }} />
        </div>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed min-h-[72px]">{product.tagline || product.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {specs.map((spec, index) => (
            <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500 mb-1">{spec.label}</p>
              <p className="text-sm font-semibold text-white">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Learn more</span>
          <svg className="h-4 w-4 text-[#20b2aa] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/90 to-transparent" />
    </div>
  );
}

export default ProductCard;
