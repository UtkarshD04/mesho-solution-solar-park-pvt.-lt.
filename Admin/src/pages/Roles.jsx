import { PageShell, ActionButton } from "../components/UI";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const roles = [
  { name: "Super Admin", users: 1, permissions: ["All Access"], desc: "Full system access" },
  { name: "Sales Manager", users: 3, permissions: ["CRM", "Orders", "Reports"], desc: "Manage leads and orders" },
  { name: "Warehouse Staff", users: 5, permissions: ["Inventory", "Orders"], desc: "Stock and dispatch management" },
  { name: "Service Engineer", users: 4, permissions: ["Service Requests", "Warranty"], desc: "Handle after-sales support" },
  { name: "Content Editor", users: 2, permissions: ["Website CMS"], desc: "Manage website content" },
];

const MODULES = ["Dashboard", "CRM", "Products", "Orders", "Inventory", "Warranty", "Service Requests", "Employees", "Website CMS", "Reports", "Settings", "Roles & Permissions"];

export default function Roles() {
  return (
    <PageShell label="Access Control" title="Roles & Permissions">
      <div className="flex justify-end">
        <ActionButton>+ Add Role</ActionButton>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {roles.map(({ name, users, permissions, desc }) => (
          <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-gray-900">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">{users} user{users > 1 ? "s" : ""}</span>
                <button className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Edit</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {permissions.map(p => (
                <span key={p} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ background: "#e8eef7", color: THEME }}>{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-black uppercase tracking-wider text-gray-700">Permissions Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 px-5 py-3 min-w-[140px]">Module</th>
                {roles.map(r => (
                  <th key={r.name} className="text-center text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 px-4 py-3 min-w-[100px]">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MODULES.map(mod => (
                <tr key={mod} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-2.5 font-semibold text-gray-700">{mod}</td>
                  {roles.map(r => {
                    const has = r.permissions.includes("All Access") || r.permissions.includes(mod);
                    return (
                      <td key={r.name} className="px-4 py-2.5 text-center">
                        {has
                          ? <svg className="w-4 h-4 mx-auto" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          : <svg className="w-4 h-4 mx-auto" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
