import { useState, useEffect, useRef } from "react";
import { PageShell, Table, ActionButton } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const SERIES_OPTIONS = ["LIGHT Series", "MaxPower Series", "NeoPower Series", "LEGEND Series"];
const STATUS_STYLE = {
  Active:          { color: "#10b981", bg: "#ecfdf5" },
  "Low Stock":     { color: "#f59e0b", bg: "#fffbeb" },
  "Out of Stock":  { color: "#ef4444", bg: "#fef2f2" },
};

const EMPTY_FORM = {
  series: "LIGHT Series", model: "", tagline: "", type: "", badge: "",
  description: "", color: "#033e74", stock: 0, status: "Active",
  isPublished: true, specs: [], useCases: [],
};

export default function Products() {
  const { getAllProducts, createProduct, updateProduct, deleteProduct } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [specInput, setSpecInput] = useState({ label: "", value: "" });
  const [useCaseInput, setUseCaseInput] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.model.toLowerCase().includes(search.toLowerCase()) ||
    p.series.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(EMPTY_FORM); setImageFile(null); setImagePreview(null); setError("");
    setModal({ mode: "add" });
  };

  const openEdit = (p) => {
    setForm({
      series: p.series, model: p.model, tagline: p.tagline, type: p.type,
      badge: p.badge, description: p.description, color: p.color || "#033e74",
      stock: p.stock, status: p.status, isPublished: p.isPublished,
      specs: p.specs || [], useCases: p.useCases || [],
    });
    setImageFile(null);
    setImagePreview(p.image ? `${API_BASE}${p.image}` : null);
    setError("");
    setModal({ mode: "edit", id: p._id });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "specs" || k === "useCases") fd.append(k, JSON.stringify(v));
        else fd.append(k, v);
      });
      if (imageFile) fd.append("image", imageFile);

      let saved;
      if (modal.mode === "add") {
        saved = await createProduct(fd);
        setProducts(prev => [...prev, saved]);
      } else {
        saved = await updateProduct(modal.id, fd);
        setProducts(prev => prev.map(p => p._id === modal.id ? saved : p));
      }
      setModal(null);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product? It will be removed from the website too.")) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (_) {}
  };

  const addSpec = () => {
    if (!specInput.label || !specInput.value) return;
    setForm(f => ({ ...f, specs: [...f.specs, { label: specInput.label, value: specInput.value }] }));
    setSpecInput({ label: "", value: "" });
  };

  const removeSpec = (i) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const addUseCase = () => {
    if (!useCaseInput.trim()) return;
    setForm(f => ({ ...f, useCases: [...f.useCases, useCaseInput.trim()] }));
    setUseCaseInput("");
  };

  const removeUseCase = (i) => setForm(f => ({ ...f, useCases: f.useCases.filter((_, idx) => idx !== i) }));

  return (
    <PageShell label="Product Management" title="Products">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-64 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition pl-9" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <ActionButton onClick={openAdd}>+ Add Product</ActionButton>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(5).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <Table
          headers={["Image", "Model", "Series", "Type", "Stock", "Status", "Published", "Actions"]}
          rows={filtered}
          renderRow={(row) => (
            <tr key={row._id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3">
                {row.image
                  ? <img src={`${API_BASE}${row.image}`} alt={row.model} className="w-12 h-10 object-cover rounded-lg border border-gray-100" />
                  : <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                }
              </td>
              <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.model}</td>
              <td className="px-5 py-3 text-gray-500 text-xs">{row.series}</td>
              <td className="px-5 py-3 text-gray-500 text-xs">{row.type}</td>
              <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.stock}</td>
              <td className="px-5 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                  style={{ color: STATUS_STYLE[row.status]?.color, background: STATUS_STYLE[row.status]?.bg }}>
                  {row.status}
                </span>
              </td>
              <td className="px-5 py-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${row.isPublished ? "text-emerald-600 bg-emerald-50" : "text-gray-400 bg-gray-100"}`}>
                  {row.isPublished ? "Live" : "Hidden"}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(row)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Edit</button>
                  <button onClick={() => handleDelete(row._id)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">Delete</button>
                </div>
              </td>
            </tr>
          )}
        />
      )}
      {!loading && filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No products found.</p>}

      {/* ── Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-base font-black uppercase tracking-wide text-gray-900">
                {modal.mode === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">

              {/* Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-20 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                    {imagePreview
                      ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      : <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    }
                  </div>
                  <div>
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </button>
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, WEBP — max 5MB</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "model", label: "Model Name", placeholder: "MyzoEE 1", full: true },
                  { key: "tagline", label: "Tagline", placeholder: "Portable Power for Daily Life", full: true },
                  { key: "type", label: "Type", placeholder: "Power Station" },
                  { key: "badge", label: "Badge", placeholder: "Best Seller" },
                  { key: "stock", label: "Stock", placeholder: "0", type: "number" },
                ].map(({ key, label, placeholder, full, type = "text" }) => (
                  <div key={key} className={full ? "col-span-2" : ""}>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition" />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Series</label>
                  <select value={form.series} onChange={e => setForm(f => ({ ...f, series: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    {SERIES_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    <option>Active</option><option>Low Stock</option><option>Out of Stock</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Product description..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition resize-none" />
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="published" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                    className="w-4 h-4 rounded accent-[#033e74]" />
                  <label htmlFor="published" className="text-sm font-semibold text-gray-700">Publish on website</label>
                </div>
              </div>

              {/* Specs */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Specifications</label>
                <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto">
                  {form.specs.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <span className="text-xs font-bold text-gray-600 flex-1">{s.label}</span>
                      <span className="text-xs text-gray-500 flex-1">{s.value}</span>
                      <button type="button" onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600 transition">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={specInput.label} onChange={e => setSpecInput(s => ({ ...s, label: e.target.value }))} placeholder="Label (e.g. Battery Type)"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#20b2aa] transition" />
                  <input value={specInput.value} onChange={e => setSpecInput(s => ({ ...s, value: e.target.value }))} placeholder="Value (e.g. LiFePO4)"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#20b2aa] transition" />
                  <button type="button" onClick={addSpec}
                    className="px-3 py-2 rounded-xl text-xs font-black text-white transition" style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
                    Add
                  </button>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Use Cases</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.useCases.map((u, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {u}
                      <button type="button" onClick={() => removeUseCase(i)} className="text-gray-400 hover:text-red-500 transition">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={useCaseInput} onChange={e => setUseCaseInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addUseCase())}
                    placeholder="e.g. Full Home Backup"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#20b2aa] transition" />
                  <button type="button" onClick={addUseCase}
                    className="px-3 py-2 rounded-xl text-xs font-black text-white transition" style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
                    Add
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-black text-white transition disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
                  {saving ? "Saving..." : modal.mode === "add" ? "Add Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
}
