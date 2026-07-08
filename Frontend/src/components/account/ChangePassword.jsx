import { useState } from "react";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

const EyeIcon = ({ open }) => open ? (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
) : (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);

const FIELDS = [
  { key: "currentPassword", label: "Current Password",     showKey: "current" },
  { key: "newPassword",     label: "New Password",         showKey: "new" },
  { key: "confirmPassword", label: "Confirm New Password", showKey: "confirm" },
];

const TIPS = [
  "At least 8 characters long",
  "Mix of uppercase & lowercase",
  "Include numbers & symbols",
  "Avoid using personal info",
  "Don't reuse old passwords",
];

export default function ChangePassword() {
  const [form, setForm]       = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow]       = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.newPassword !== form.confirmPassword) return setError("New passwords do not match.");
    if (form.newPassword.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to change password.");
      setSuccess("Password changed successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8">

      {/* Section Header */}
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 h-full w-1 rounded-full" style={{ background: TEAL }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: THEME }}>Security</p>
        <h2 className="text-2xl font-black uppercase text-gray-900 tracking-wide">Change Password</h2>
        <p className="text-sm text-gray-400 mt-1">Keep your account safe with a strong password</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Form Card */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ background: "#f8fafc" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5", color: "#10b981" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-sm font-black uppercase tracking-wide text-gray-700">Update Password</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {FIELDS.map(({ key, label, showKey }) => (
              <div key={key}>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</label>
                <div
                  className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all"
                  onFocus={() => {}}
                  style={{ transition: "border-color 0.2s" }}
                >
                  <input
                    type={show[showKey] ? "text" : "password"}
                    value={form[key]}
                    onChange={e => handle(key, e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 text-sm text-gray-900 bg-transparent focus:outline-none placeholder-gray-300"
                    onFocus={e => e.target.closest("div").style.borderColor = TEAL}
                    onBlur={e => e.target.closest("div").style.borderColor = "#e5e7eb"}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(s => ({ ...s, [showKey]: !s[showKey] }))}
                    className="text-gray-300 hover:text-gray-500 transition ml-2"
                  >
                    <EyeIcon open={show[showKey]} />
                  </button>
                </div>
              </div>
            ))}

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
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
                  Updating...
                </>
              ) : "Update Password"}
            </button>
          </form>
        </div>

        {/* Tips Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-fit">
          <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${THEME}, ${TEAL})` }} />
          <div className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">Password Tips</p>
            <ul className="space-y-3">
              {TIPS.map(tip => (
                <li key={tip} className="flex items-start gap-3 text-sm text-gray-500">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: TEAL }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
