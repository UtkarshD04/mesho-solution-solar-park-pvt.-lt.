import { useState } from "react";
import { PageShell, Table, ActionButton } from "../components/UI";

const orders = [
  { id: "#ORD-1042", customer: "Rajesh Kumar", product: "MaxPower 8 AIO", date: "12 Jul 2025", amount: "₹1,24,000", status: "Delivered" },
  { id: "#ORD-1041", customer: "Priya Sharma", product: "MyzoEE 2", date: "11 Jul 2025", amount: "₹38,500", status: "Processing" },
  { id: "#ORD-1040", customer: "Amit Verma", product: "NeoPower 4", date: "10 Jul 2025", amount: "₹52,000", status: "Shipped" },
  { id: "#ORD-1039", customer: "Sunita Patel", product: "MaxPower 16", date: "09 Jul 2025", amount: "₹2,18,000", status: "Pending" },
  { id: "#ORD-1038", customer: "Vikram Singh", product: "LEGEND 112C", date: "08 Jul 2025", amount: "₹8,40,000", status: "Delivered" },
];

const STATUS = {
  Delivered: { color: "#10b981", bg: "#ecfdf5" },
  Processing: { color: "#f59e0b", bg: "#fffbeb" },
  Shipped: { color: "#3b82f6", bg: "#eff6ff" },
  Pending: { color: "#6b7280", bg: "#f9fafb" },
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(o => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageShell label="Order Management" title="Orders">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="w-64 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#20b2aa] transition pl-9" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <ActionButton>+ New Order</ActionButton>
      </div>
      <Table
        headers={["Order ID", "Customer", "Product", "Date", "Amount", "Status", "Actions"]}
        rows={filtered}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.id}</td>
            <td className="px-5 py-3 text-gray-500 text-xs">{row.customer}</td>
            <td className="px-5 py-3 text-gray-500 text-xs">{row.product}</td>
            <td className="px-5 py-3 text-gray-400 text-xs">{row.date}</td>
            <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.amount}</td>
            <td className="px-5 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ color: STATUS[row.status].color, background: STATUS[row.status].bg }}>{row.status}</span>
            </td>
            <td className="px-5 py-3">
              <button className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">View</button>
            </td>
          </tr>
        )}
      />
    </PageShell>
  );
}
