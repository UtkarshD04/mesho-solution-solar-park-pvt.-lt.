import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const TITLES = {
  "/": "Dashboard",
  "/crm": "CRM",
  "/products": "Products",
  "/orders": "Orders",
  "/inventory": "Inventory",
  "/warranty": "Warranty",
  "/service-requests": "Service Requests",
  "/employees": "Employees",
  "/cms": "Website CMS",
  "/reports": "Reports",
  "/settings": "Settings",
  "/roles": "Roles & Permissions",
};

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const title = TITLES[pathname] || "Admin";

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Topbar collapsed={collapsed} title={title} />
      <main
        className="transition-all duration-300 pt-16"
        style={{ marginLeft: collapsed ? 64 : 240 }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
