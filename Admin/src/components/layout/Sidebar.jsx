import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const CRM_ICON = <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const CRM_CHILDREN = [
  { to: "/crm/leads",         label: "Leads" },
  { to: "/crm/follow-ups",    label: "Follow Ups" },
  { to: "/crm/customers",     label: "Customers" },
  { to: "/crm/dealers",       label: "Dealers" },
  { to: "/crm/enquiries",     label: "Enquiries" },
  { to: "/crm/quotations",    label: "Quotations" },
  { to: "/crm/communication", label: "Communication History" },
];

const NAV = [
  {
    group: "Main",
    items: [
      { to: "/", label: "Dashboard", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg> },
      { to: "/products", label: "Products", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
      { to: "/orders", label: "Orders", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/inventory", label: "Inventory", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg> },
      { to: "/warranty", label: "Warranty", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
      { to: "/service-requests", label: "Service Requests", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
      { to: "/employees", label: "Employees", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    ],
  },
  {
    group: "System",
    items: [
      { to: "/cms", label: "Website CMS", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg> },
      { to: "/reports", label: "Reports", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
      { to: "/settings", label: "Settings", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
      { to: "/roles", label: "Roles & Permissions", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg> },
    ],
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const crmActive = pathname.startsWith("/crm");
  const [crmOpen, setCrmOpen] = useState(crmActive);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 z-40"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 shrink-0">
        <img src="/logo.png" alt="Myzo" className="h-9 w-auto object-contain shrink-0" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">

        {/* Main group — with CRM dropdown inserted after Dashboard */}
        <div>
          {!collapsed && <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 px-3 mb-2">Main</p>}
          <div className="space-y-0.5">

            {/* Dashboard */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${isActive ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
              }
              style={({ isActive }) => isActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
              title={collapsed ? "Dashboard" : ""}
            >
              <span className="shrink-0"><svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg></span>
              {!collapsed && <span className="truncate">Dashboard</span>}
            </NavLink>

            {/* CRM Dropdown */}
            <div>
              <button
                onClick={() => !collapsed && setCrmOpen(o => !o)}
                title={collapsed ? "CRM" : ""}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${crmActive ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                style={crmActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
              >
                <span className="shrink-0">{CRM_ICON}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">CRM</span>
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${crmOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Sub items */}
              {!collapsed && crmOpen && (
                <div className="mt-0.5 ml-3 pl-4 border-l-2 border-gray-100 space-y-0.5">
                  {CRM_CHILDREN.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${isActive ? "text-white shadow-sm" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`
                      }
                      style={({ isActive }) => isActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
                    >
                      <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Products & Orders */}
            {[
              { to: "/products", label: "Products", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
              { to: "/orders", label: "Orders", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
            ].map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${isActive ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
                }
                style={({ isActive }) => isActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
                title={collapsed ? label : ""}
              >
                <span className="shrink-0">{icon}</span>
                {!collapsed && <span className="truncate">{label}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Remaining groups */}
        {NAV.slice(1).map(({ group, items }) => (
          <div key={group}>
            {!collapsed && <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 px-3 mb-2">{group}</p>}
            <div className="space-y-0.5">
              {items.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${isActive ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
                  }
                  style={({ isActive }) => isActive ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
                  title={collapsed ? label : ""}
                >
                  <span className="shrink-0">{icon}</span>
                  {!collapsed && <span className="truncate">{label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom user */}
      <div className="border-t border-gray-100 p-3 shrink-0">
        <button onClick={handleLogout} title={collapsed ? 'Logout' : ''}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50 transition">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
