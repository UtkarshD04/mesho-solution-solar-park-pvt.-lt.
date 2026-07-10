import { useState } from "react";
import { PageShell } from "../components/UI";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";
const TEAL = "#20b2aa";

function Field({ label, defaultValue, type = "text" }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</label>
      <input
        type={type}
        value={val}
        onChange={e => setVal(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#20b2aa] transition"
      />
    </div>
  );
}

export default function Settings() {
  const { authFetch } = useAdmin();
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError(""); setPwSuccess("");
    if (pw.newPassword !== pw.confirmPassword) return setPwError("New passwords do not match.");
    if (pw.newPassword.length < 6) return setPwError("New password must be at least 6 characters.");
    setPwLoading(true);
    try {
      await authFetch("/api/admin/change-password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword: pw.currentPassword, newPassword: pw.newPassword }),
      });
      setPwSuccess("Password changed successfully.");
      setPw({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwError(err.message || "Failed to change password.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <PageShell label="Configuration" title="Settings">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-black uppercase tracking-wider text-gray-700">Company Information</p>
          </div>
          <div className="p-6 space-y-4">
            <Field label="Company Name" defaultValue="Mesho Solution Solar Park Pvt. Ltd." />
            <Field label="Email" defaultValue="admin@myzo.com" type="email" />
            <Field label="Phone" defaultValue="+91 98765 43210" />
            <Field label="Address" defaultValue="Lucknow, Uttar Pradesh, India" />
            <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white transition hover:opacity-90" style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-black uppercase tracking-wider text-gray-700">Change Password</p>
          </div>
          <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
            {[
              { key: "currentPassword", label: "Current Password" },
              { key: "newPassword", label: "New Password" },
              { key: "confirmPassword", label: "Confirm New Password" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</label>
                <input
                  type="password"
                  value={pw[key]}
                  onChange={e => setPw(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#20b2aa] transition"
                  required
                />
              </div>
            ))}
            {pwError && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">{pwError}</p>}
            {pwSuccess && <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2">{pwSuccess}</p>}
            <button type="submit" disabled={pwLoading}
              className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}>
              {pwLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

      </div>
    </PageShell>
  );
}
