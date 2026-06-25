import { useState, useEffect } from "react";
import { seriesMeta, icons } from "../../data/productDetails";

function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-white/10 last:border-0">
      <span className="text-xs text-white/50 uppercase tracking-wider w-2/5">{label}</span>
      <span className="text-xs text-white font-medium text-right w-3/5">{value}</span>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (product) {
      setTab("overview");
    }
  }, [product]);

  if (!product) return null;

  const meta = seriesMeta[product.series] || { color: "#033e74", label: product.series };
  const highlights = product.highlights ?? product.useCases ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0a1628] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0a1628] border-b border-white/10 p-6 flex items-start justify-between z-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4a9eff]">{meta.label}</span>
            <h2 className="text-2xl font-bold text-white mt-1">{product.model}</h2>
            <p className="text-sm text-white/60 mt-1">{product.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-2xl font-bold ml-4 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="w-full h-48 rounded-xl flex items-center justify-center mb-6" style={{ background: `${meta.color}07`, border: `1px solid ${meta.color}15` }}>
            <div className="w-36 h-36" dangerouslySetInnerHTML={{ __html: icons[product.icon] || "" }} />
          </div>

          <div className="flex border-b border-white/10 px-6">
            {[
              { key: "overview", label: "Overview" },
              { key: "specs", label: "Full Specs" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="py-3 mr-6 text-sm font-semibold capitalize transition-colors"
                style={{ borderColor: tab === item.key ? meta.color : "transparent", color: tab === item.key ? meta.color : "#9ca3af" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto flex-1">
            {tab === "overview" && (
              <div className="p-6">
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    ["Capacity", product.capacity],
                    ["Output", product.power],
                    ["Cycles", product.cycles],
                    ["Protection", product.ip],
                  ].map(([label, value]) => (
                    <div key={label} className="text-center p-3 rounded-xl bg-gray-900/40">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                      <div className="text-xs font-bold text-white leading-tight">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-sm text-white/80 leading-relaxed">{product.description}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Runtime & Use Cases</p>
                  <div className="grid grid-cols-2 gap-2">
                    {highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ background: `${meta.color}0d`, color: meta.color }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: meta.color }}>
                  Request a Quote →
                </button>
                <p className="text-center text-xs text-white/40 mt-3">* Specs for reference only. Please refer to official datasheet.</p>
              </div>
            )}

            {tab === "specs" && (
              <div className="p-6">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  {product.specs.map((spec, i) => (
                    <SpecRow key={i} label={spec.label} value={spec.value} />
                  ))}
                </div>
                <p className="text-center text-xs text-white/40 mt-4">* Above is for reference only. Specification sheet shall prevail.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
