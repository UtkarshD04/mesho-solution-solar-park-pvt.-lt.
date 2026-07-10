import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useAdmin } from "../context/AdminContext";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const revenueData = [
  { month: "Jan", revenue: 420000, orders: 18 },
  { month: "Feb", revenue: 380000, orders: 15 },
  { month: "Mar", revenue: 510000, orders: 22 },
  { month: "Apr", revenue: 470000, orders: 19 },
  { month: "May", revenue: 620000, orders: 27 },
  { month: "Jun", revenue: 580000, orders: 24 },
  { month: "Jul", revenue: 710000, orders: 31 },
];

function SectionHeader({ label, title }) {
  return (
    <div className="relative pl-5 mb-5">
      <div className="absolute left-0 top-0.5 h-full w-[3px] rounded-full" style={{ background: TEAL }} />
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5" style={{ color: TEAL }}>{label}</p>
      <h2 className="text-base font-black uppercase text-gray-900 tracking-wide">{title}</h2>
    </div>
  );
}

export default function Dashboard() {
  const { getDashboardStats, getEnquiries, getServiceRequests } = useAdmin();
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentServiceRequests, setRecentServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getEnquiries(), getServiceRequests()])
      .then(([s, enquiries, serviceReqs]) => {
        setStats(s);
        setRecentEnquiries(enquiries.slice(0, 5));
        setRecentServiceRequests(serviceReqs.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const STATS = stats ? [
    { label: "Registered Users", value: stats.totalUsers, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: "Product Enquiries", value: stats.totalEnquiries, sub: `${stats.newEnquiries} new`, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { label: "Service Requests", value: stats.totalServiceRequests, sub: `${stats.openServiceRequests} open`, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { label: "Partner Applications", value: stats.totalPartners, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  ] : [];

  const ENQUIRY_STATUS = {
    new: { color: "#3b82f6", bg: "#eff6ff" },
    contacted: { color: "#f59e0b", bg: "#fffbeb" },
    closed: { color: "#10b981", bg: "#ecfdf5" },
  };

  const SERVICE_STATUS = {
    open: { color: "#ef4444", bg: "#fef2f2" },
    "in-progress": { color: "#f59e0b", bg: "#fffbeb" },
    resolved: { color: "#10b981", bg: "#ecfdf5" },
    closed: { color: "#6b7280", bg: "#f9fafb" },
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-28 animate-pulse" />)
          : STATS.map(({ label, value, sub, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#e8eef7", color: THEME }}>{icon}</div>
              </div>
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider">{label}</p>
              {sub && <p className="text-[10px] text-teal-500 font-bold mt-1">{sub}</p>}
            </div>
          ))
        }
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader label="Analytics" title="Revenue Overview" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={THEME} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={THEME} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke={THEME} strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader label="Analytics" title="Monthly Orders" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="orders" fill={TEAL} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <SectionHeader label="Overview" title="Recent Product Enquiries" />
        {loading ? (
          <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-10 bg-gray-50 rounded-xl animate-pulse" />)}</div>
        ) : recentEnquiries.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Name", "Email", "Phone", "Product", "Status"].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEnquiries.map(e => (
                  <tr key={e._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 pr-4 font-bold text-gray-900 text-xs">{e.firstName} {e.lastName}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{e.email}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{e.phone}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs truncate max-w-[140px]">{e.product}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: ENQUIRY_STATUS[e.status]?.color, background: ENQUIRY_STATUS[e.status]?.bg }}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Service Requests */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <SectionHeader label="Overview" title="Recent Customer Service Requests" />
        {loading ? (
          <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-10 bg-gray-50 rounded-xl animate-pulse" />)}</div>
        ) : recentServiceRequests.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No service requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Name", "Email", "Phone", "Model", "Issue", "Status"].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentServiceRequests.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 pr-4 font-bold text-gray-900 text-xs">{r.firstName} {r.lastName}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{r.email}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{r.phone}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{r.model}</td>
                    <td className="py-3 pr-4 text-gray-400 text-xs truncate max-w-[160px]">{r.issue}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: SERVICE_STATUS[r.status]?.color, background: SERVICE_STATUS[r.status]?.bg }}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
