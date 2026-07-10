import { useState, useEffect } from "react";
import { PageShell, Table, ActionButton } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const PRIORITY_MAP = { open: "High", "in-progress": "Medium", resolved: "Low", closed: "Low" };
const PRIORITY = { High: { color: "#ef4444", bg: "#fef2f2" }, Medium: { color: "#f59e0b", bg: "#fffbeb" }, Low: { color: "#3b82f6", bg: "#eff6ff" } };
const STATUS = {
  open: { color: "#ef4444", bg: "#fef2f2", label: "Open" },
  "in-progress": { color: "#f59e0b", bg: "#fffbeb", label: "In Progress" },
  resolved: { color: "#10b981", bg: "#ecfdf5", label: "Resolved" },
  closed: { color: "#6b7280", bg: "#f9fafb", label: "Closed" },
};

export default function ServiceRequests() {
  const { getServiceRequests, updateServiceStatus } = useAdmin();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getServiceRequests()
      .then(setRequests)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      const updated = await updateServiceStatus(id, status);
      setRequests(prev => prev.map(r => r._id === id ? updated : r));
    } catch (_) {}
    setUpdating(null);
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <PageShell label="After Sales" title="Service Requests">
      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <Table
          headers={["Customer", "Product", "Issue", "Date", "Priority", "Status", "Actions"]}
          rows={requests}
          renderRow={(row) => {
            const priority = PRIORITY_MAP[row.status] || "Medium";
            const st = STATUS[row.status] || STATUS.open;
            return (
              <tr key={row._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.firstName} {row.lastName}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.model}</td>
                <td className="px-5 py-3 text-gray-500 text-xs max-w-[160px] truncate">{row.issue}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(row.createdAt)}</td>
                <td className="px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: PRIORITY[priority].color, background: PRIORITY[priority].bg }}>{priority}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={row.status}
                    disabled={updating === row._id}
                    onChange={e => handleStatusChange(row._id, e.target.value)}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-gray-100 text-gray-600 border-none focus:outline-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            );
          }}
        />
      )}
      {!loading && requests.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-12">No service requests yet.</p>
      )}
    </PageShell>
  );
}
