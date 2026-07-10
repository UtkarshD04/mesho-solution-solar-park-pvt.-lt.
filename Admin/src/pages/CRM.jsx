import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageShell, Table, ActionButton } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";

const LEAD_STATUS = {
  Hot: { color: "#ef4444", bg: "#fef2f2" },
  Warm: { color: "#f59e0b", bg: "#fffbeb" },
  Cold: { color: "#3b82f6", bg: "#eff6ff" },
  Converted: { color: "#10b981", bg: "#ecfdf5" },
  Lost: { color: "#6b7280", bg: "#f9fafb" },
};

const ENQUIRY_STATUS = {
  new: { color: "#3b82f6", bg: "#eff6ff" },
  contacted: { color: "#f59e0b", bg: "#fffbeb" },
  closed: { color: "#10b981", bg: "#ecfdf5" },
};

const PARTNER_STATUS = {
  new: { color: "#3b82f6", bg: "#eff6ff" },
  reviewing: { color: "#f59e0b", bg: "#fffbeb" },
  approved: { color: "#10b981", bg: "#ecfdf5" },
  rejected: { color: "#ef4444", bg: "#fef2f2" },
};

const EMPTY_LEAD = { name: "", email: "", phone: "", source: "Website", status: "Cold", product: "", estValue: 0, notes: "" };

export default function CRM({ title = "Leads" }) {
  const { pathname } = useLocation();
  const { getLeads, createLead, updateLead, deleteLead, getEnquiries, updateEnquiryStatus, getPartners, updatePartnerStatus, getUsers } = useAdmin();

  const [leads, setLeads] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_LEAD);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEnquiries = pathname === "/crm/enquiries";
  const isDealers = pathname === "/crm/dealers";
  const isCustomers = pathname === "/crm/customers";

  useEffect(() => {
    setLoading(true);
    const fetches = [getLeads()];
    if (isEnquiries) fetches.push(getEnquiries());
    if (isDealers) fetches.push(getPartners());
    if (isCustomers) fetches.push(getUsers());

    Promise.all(fetches)
      .then(([l, extra]) => {
        setLeads(l);
        if (isEnquiries && extra) setEnquiries(extra);
        if (isDealers && extra) setPartners(extra);
        if (isCustomers && extra) setCustomers(extra);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathname]);

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY_LEAD); setError(""); setModal({ mode: "add" }); };
  const openEdit = (lead) => { setForm({ name: lead.name, email: lead.email, phone: lead.phone, source: lead.source, status: lead.status, product: lead.product, estValue: lead.estValue, notes: lead.notes }); setError(""); setModal({ mode: "edit", id: lead._id }); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      if (modal.mode === "add") {
        const created = await createLead(form);
        setLeads(prev => [created, ...prev]);
      } else {
        const updated = await updateLead(modal.id, form);
        setLeads(prev => prev.map(l => l._id === modal.id ? updated : l));
      }
      setModal(null);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    try { await deleteLead(id); setLeads(prev => prev.filter(l => l._id !== id)); } catch (_) {}
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // ── Enquiries view ────────────────────────────────────────────────────────
  if (isEnquiries) {
    return (
      <PageShell label="Customer Relations" title="Product Enquiries">
        {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div> : (
          <Table
            headers={["Name", "Email", "Phone", "Product", "Pin Code", "Heard From", "Date", "Status"]}
            rows={enquiries}
            renderRow={(row) => {
              const st = ENQUIRY_STATUS[row.status] || ENQUIRY_STATUS.new;
              return (
                <tr key={row._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.firstName} {row.lastName}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.email}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.phone}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs max-w-[120px] truncate">{row.product}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.pinCode}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.hearAbout}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(row.createdAt)}</td>
                  <td className="px-5 py-3">
                    <select value={row.status} onChange={e => updateEnquiryStatus(row._id, e.target.value).then(u => setEnquiries(prev => prev.map(r => r._id === row._id ? u : r)))}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border-none focus:outline-none cursor-pointer"
                      style={{ color: st.color, background: st.bg }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              );
            }}
          />
        )}
        {!loading && enquiries.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No enquiries yet.</p>}
      </PageShell>
    );
  }

  // ── Dealers / Partners view ───────────────────────────────────────────────
  if (isDealers) {
    return (
      <PageShell label="Customer Relations" title="Partner Applications">
        {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div> : (
          <Table
            headers={["Name", "Email", "Phone", "Business", "Type", "City", "Date", "Status"]}
            rows={partners}
            renderRow={(row) => {
              const st = PARTNER_STATUS[row.status] || PARTNER_STATUS.new;
              return (
                <tr key={row._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.firstName} {row.lastName}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.email}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.phone}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.businessName || "—"}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.businessType}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.interestedCity}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(row.createdAt)}</td>
                  <td className="px-5 py-3">
                    <select value={row.status} onChange={e => updatePartnerStatus(row._id, e.target.value).then(u => setPartners(prev => prev.map(r => r._id === row._id ? u : r)))}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border-none focus:outline-none cursor-pointer"
                      style={{ color: st.color, background: st.bg }}>
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            }}
          />
        )}
        {!loading && partners.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No partner applications yet.</p>}
      </PageShell>
    );
  }

  // ── Customers view ──────────────────────────────────────────────────────────
  if (isCustomers) {
    const filtered = customers.filter(c =>
      `${c.fullname?.firstname} ${c.fullname?.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <PageShell label="Customer Relations" title="Registered Customers">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
              className="w-64 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition pl-9" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <span className="text-xs text-gray-400 font-medium">{customers.length} registered</span>
        </div>
        {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div> : (
          <Table
            headers={["Name", "Email", "Phone", "Address", "Joined"]}
            rows={filtered}
            renderRow={(row) => (
              <tr key={row._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.fullname?.firstname} {row.fullname?.lastname}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.email}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.phone}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{row.address || "—"}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(row.createdAt)}</td>
              </tr>
            )}
          />
        )}
        {!loading && filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No customers registered yet.</p>}
      </PageShell>
    );
  }

  // ── Default Leads view ────────────────────────────────────────────────────
  return (
    <PageShell label="Customer Relations" title={title}>
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..."
            className="w-64 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition pl-9" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <ActionButton onClick={openAdd}>+ Add Lead</ActionButton>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <Table
          headers={["Name", "Email", "Phone", "Source", "Product", "Est. Value", "Status", "Actions"]}
          rows={filteredLeads}
          renderRow={(row) => {
            const st = LEAD_STATUS[row.status] || LEAD_STATUS.Cold;
            return (
              <tr key={row._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.name}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.email}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.phone}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.source}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{row.product || "—"}</td>
                <td className="px-5 py-3 font-bold text-gray-900 text-xs">₹{row.estValue?.toLocaleString("en-IN") || 0}</td>
                <td className="px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: st.color, background: st.bg }}>{row.status}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(row)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Edit</button>
                    <button onClick={() => handleDelete(row._id)} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">Delete</button>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      )}
      {!loading && filteredLeads.length === 0 && <p className="text-sm text-gray-400 text-center py-12">No leads found.</p>}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-black uppercase tracking-wide text-gray-900 mb-5">{modal.mode === "add" ? "Add Lead" : "Edit Lead"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", placeholder: "Rajesh Kumar" },
                  { key: "email", label: "Email", placeholder: "rajesh@example.com", type: "email" },
                  { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
                  { key: "product", label: "Product Interest", placeholder: "MaxPower 8 AIO" },
                  { key: "estValue", label: "Est. Value (₹)", placeholder: "124000", type: "number" },
                  { key: "notes", label: "Notes", placeholder: "Any notes..." },
                ].map(({ key, label, placeholder, type = "text" }) => (
                  <div key={key} className={key === "notes" ? "col-span-2" : ""}>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition" />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Source</label>
                  <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    {["Website", "Referral", "Exhibition", "Direct", "Social Media", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition">
                    {["Hot", "Warm", "Cold", "Converted", "Lost"].map(s => <option key={s}>{s}</option>)}
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
