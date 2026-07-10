import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { PageShell } from "../components/UI";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const salesData = [
  { month: "Jan", sales: 18, revenue: 420000 },
  { month: "Feb", sales: 15, revenue: 380000 },
  { month: "Mar", sales: 22, revenue: 510000 },
  { month: "Apr", sales: 19, revenue: 470000 },
  { month: "May", sales: 27, revenue: 620000 },
  { month: "Jun", sales: 24, revenue: 580000 },
  { month: "Jul", sales: 31, revenue: 710000 },
];

const reportCards = [
  { label: "Total Sales (YTD)", value: "156 Units", sub: "Jan – Jul 2025" },
  { label: "Revenue (YTD)", value: "₹37.1L", sub: "Jan – Jul 2025" },
  { label: "Avg Order Value", value: "₹2.38L", sub: "Per transaction" },
  { label: "Top Product", value: "MaxPower 8 AIO", sub: "By revenue" },
];

export default function Reports() {
  return (
    <PageShell label="Analytics" title="Reports">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {reportCards.map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{label}</p>
            <p className="text-xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-black uppercase tracking-wider text-gray-700 mb-5">Monthly Sales Volume</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="sales" fill={THEME} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-black uppercase tracking-wider text-gray-700 mb-5">Revenue Trend</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke={TEAL} strokeWidth={2.5} dot={{ fill: TEAL, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageShell>
  );
}
