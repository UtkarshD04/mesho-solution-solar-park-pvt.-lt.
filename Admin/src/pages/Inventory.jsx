import { useState, useEffect } from "react";
import { PageShell, Table } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const STATUS_STYLE = {
  Active:         { color: "#10b981", bg: "#ecfdf5" },
  "Low Stock":    { color: "#f59e0b", bg: "#fffbeb" },
  "Out of Stock": { color: "#ef4444", bg: "#fef2f2" },
};

export default function Inventory() {
  const { getAllProducts, updateProduct } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState(null); // { id, stock, status }
  const [saving, setSaving] = useState(false);

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

  const handleUpdate = async () => {
    if (!editRow) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("stock", editRow.stock);
      fd.append("status", editRow.status);
      const updated = await updateProduct(editRow.id, fd);
      setProducts(prev => prev.map(p => p._id === editRow.id ? updated : p));
      setEditRow(null);
    } catch (_) {}
    finally { setSaving(false); }
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <PageShell label="Stock Management" title="Inventory">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-64 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition pl-9" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span className="text-xs text-gray-400 font-medium self-center">{products.length} products</span>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(5).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <Table
          headers={["Image", "Model", "Series", "Stock", "Status", "Last Updated", "Actions"]}
          rows={filtered}
          renderRow={(row) => (
            <tr key={row._id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3">
                {row.image
                  ? <img src={`${API_BASE}${row.image}`} alt={row.model} className="w-12 h-10 object-cover rounded-lg border border-gray-100" />
                  : <div className="w-12 h-10 rounded-lg bg-gray-100" />
                }
              </td>
              <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.model}</td>
              <td className="px-5 py-3 text-gray-500 text-xs">{row.series}</td>
              <td className="px-5 py-3">
                <span className={`font-black text-xs ${row.stock === 0 ? "text-red-500" : row.stock <= 5 ? "text-amber-500" : "text-gray-900"}`}>
                  {row.stock}
                </span>
              </td>
              <td className="px-5 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                  style={{ color: STATUS_STYLE[row.status]?.color, background: STATUS_STYLE[row.status]?.bg }}>
                  {row.status}
                </span>
              </td>
              <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(row.updatedAt)}</td>
              <td className="px-5 py-3">
                <button onClick={() => setEditRow({ id: row._id, stock: row.stock, status: row.status })}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                  Update
                </button>
              </td>
            </tr>
          )}
        />
      )}
      {!loading && filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No products found.</p>}

      {/* Edit Modal */}
      {editRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-black uppercase tracking-wide text-gray-900 mb-5">Update Stock</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Stock Quantity</label>
                <input type="number" min="0" value={editRow.stock}
                  onChange={e => setEditRow(r => ({ ...r, stock: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Status</label>
                <select value={editRow.status} onChange={e => setEditRow(r => ({ ...r, status: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                  <option>Active</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditRow(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleUpdate} disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
