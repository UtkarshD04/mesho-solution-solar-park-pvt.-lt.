import { useState, useEffect } from "react";
import { PageShell, Table, ActionButton } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const STATUS = {
  Active: { color: "#10b981", bg: "#ecfdf5" },
  "On Leave": { color: "#f59e0b", bg: "#fffbeb" },
  Inactive: { color: "#6b7280", bg: "#f9fafb" },
};

const ROLES = ["Sales Associate", "Sales Manager", "Regional Sales Manager", "Business Development Executive", "Service Engineer", "Warehouse Staff", "Content Editor", "Accounts Executive", "HR Manager", "Super Admin"];

const EMPTY_FORM = { empId: "", name: "", email: "", phone: "", role: "", department: "", status: "Active", password: "" };

export default function Employees() {
  const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = useAdmin();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', data }
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getEmployees().then(setEmployees).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setError(""); setModal({ mode: "add" }); };
  const openEdit = (emp) => { setForm({ empId: emp.empId, name: emp.name, email: emp.email, phone: emp.phone, role: emp.role, department: emp.department, status: emp.status, password: "" }); setError(""); setModal({ mode: "edit", id: emp._id }); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      if (modal.mode === "add") {
        const created = await createEmployee(form);
        setEmployees(prev => [created, ...prev]);
      } else {
        const updated = await updateEmployee(modal.id, form);
        setEmployees(prev => prev.map(e => e._id === modal.id ? updated : e));
      }
      setModal(null);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this employee?")) return;
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e._id !== id));
    } catch (_) {}
  };

  return (
    <PageShell label="Human Resources" title="Employees">
      <div className="flex justify-end">
        <ActionButton onClick={openAdd}>+ Add Employee</ActionButton>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <Table
          headers={["Emp ID", "Name", "Role", "Department", "Email", "Phone", "Status", "Actions"]}
          rows={employees}
          renderRow={(row) => (
            <tr key={row._id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.empId}</td>
              <td className="px-5 py-3 font-semibold text-gray-800 text-xs">{row.name}</td>
              <td className="px-5 py-3 text-gray-500 text-xs">{row.role}</td>
              <td className="px-5 py-3 text-gray-500 text-xs">{row.department}</td>
              <td className="px-5 py-3 text-gray-400 text-xs">{row.email}</td>
              <td className="px-5 py-3 text-gray-400 text-xs">{row.phone}</td>
              <td className="px-5 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: STATUS[row.status]?.color, background: STATUS[row.status]?.bg }}>{row.status}</span>
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(row)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Edit</button>
                  <button onClick={() => handleDelete(row._id)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">Remove</button>
                </div>
              </td>
            </tr>
          )}
        />
      )}
      {!loading && employees.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No employees found.</p>}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-base font-black uppercase tracking-wide text-gray-900 mb-5">{modal.mode === "add" ? "Add Employee" : "Edit Employee"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "empId", label: "Emp ID", placeholder: "EMP-001" },
                  { key: "name", label: "Full Name", placeholder: "John Doe" },
                  { key: "email", label: "Email", placeholder: "john@myzo.com", type: "email" },
                  { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },

                  { key: "department", label: "Department", placeholder: "Sales" },
                ].map(({ key, label, placeholder, type = "text", required = true }) => (
                  <div key={key} className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} required={required}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition" />
                  </div>
                ))}
                {/* Role Dropdown */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Role</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    <option value="">-- Select Role --</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                {/* Password Field */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    {modal.mode === "add" ? "Password" : "New Password (leave blank to keep)"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••"
                      required={modal.mode === "add"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pr-9 text-sm focus:outline-none focus:border-[#20b2aa] transition"
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                      {showPassword
                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition disabled:opacity-50" style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
}
