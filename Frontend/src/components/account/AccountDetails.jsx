import { useState, useEffect } from "react";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

const FIELDS = [
  { key: "firstname", label: "First Name",    type: "text",  placeholder: "John",                    col: 1 },
  { key: "lastname",  label: "Last Name",     type: "text",  placeholder: "Doe",                     col: 1 },
  { key: "email",     label: "Email Address", type: "email", placeholder: "you@example.com",          col: 2 },
  { key: "phone",     label: "Phone Number",  type: "tel",   placeholder: "+91 98765 43210",          col: 1 },
  { key: "address",   label: "Address",       type: "text",  placeholder: "Street, City, State, PIN", col: 2 },
];

export default function AccountDetails({ user, setUser }) {
  const [form, setForm]       = useState({ firstname: "", lastname: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  useEffect(() => {
    if (user) setForm({
      firstname: user.fullname?.firstname || "",
      lastname:  user.fullname?.lastname  || "",
      email:     user.email   || "",
      phone:     user.phone   || "",
      address:   user.address || "",
    });
  }, [user]);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/users/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
        body: JSON.stringify({ fullname: { firstname: form.firstname, lastname: form.lastname }, email: form.email, phone: form.phone, address: form.address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");
      setUser(data.user);
      setSuccess("Profile updated successfully.");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8">

      {/* Section Header */}
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 h-full w-1 rounded-full" style={{ background: TEAL }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: THEME }}>Your Profile</p>
        <h2 className="text-2xl font-black uppercase text-gray-900 tracking-wide">Account Details</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your personal information</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ background: "#f8fafc" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#e8eef7", color: THEME }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sm font-black uppercase tracking-wide text-gray-700">Personal Information</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {FIELDS.map(({ key, label, type, placeholder, col }) => (
              <div key={key} className={col === 2 ? "sm:col-span-2" : ""}>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => handle(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white transition-all"
                  style={{ "--tw-ring-color": THEME }}
                  onFocus={e => { e.target.style.borderColor = TEAL; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
                />
              </div>
            ))}
          </div>

          {error   && (
            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-5">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                Saving...
              </>
            ) : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
