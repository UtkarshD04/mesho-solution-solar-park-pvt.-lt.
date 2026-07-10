import { PageShell, Table, ActionButton } from "../components/UI";

const warranties = [
  { id: "WRN-001", customer: "Rajesh Kumar", product: "MaxPower 8 AIO", serial: "MP8-2024-0042", start: "01 Jan 2024", expiry: "01 Jan 2029", status: "Active" },
  { id: "WRN-002", customer: "Priya Sharma", product: "MyzoEE 2", serial: "EE2-2023-0118", start: "15 Mar 2023", expiry: "15 Mar 2026", status: "Active" },
  { id: "WRN-003", customer: "Amit Verma", product: "NeoPower 4", serial: "NP4-2022-0033", start: "10 Jun 2022", expiry: "10 Jun 2025", status: "Expiring Soon" },
  { id: "WRN-004", customer: "Sunita Patel", product: "MaxPower 16", serial: "MP16-2021-0007", start: "20 Aug 2021", expiry: "20 Aug 2024", status: "Expired" },
];

const STATUS = {
  Active: { color: "#10b981", bg: "#ecfdf5" },
  "Expiring Soon": { color: "#f59e0b", bg: "#fffbeb" },
  Expired: { color: "#ef4444", bg: "#fef2f2" },
};

export default function Warranty() {
  return (
    <PageShell label="After Sales" title="Warranty">
      <div className="flex justify-end">
        <ActionButton>+ Register Warranty</ActionButton>
      </div>
      <Table
        headers={["Warranty ID", "Customer", "Product", "Serial No.", "Start", "Expiry", "Status", "Actions"]}
        rows={warranties}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3 font-bold text-gray-900 text-xs">{row.id}</td>
            <td className="px-5 py-3 text-gray-600 text-xs">{row.customer}</td>
            <td className="px-5 py-3 text-gray-500 text-xs">{row.product}</td>
            <td className="px-5 py-3 text-gray-400 text-xs font-mono">{row.serial}</td>
            <td className="px-5 py-3 text-gray-400 text-xs">{row.start}</td>
            <td className="px-5 py-3 text-gray-400 text-xs">{row.expiry}</td>
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
