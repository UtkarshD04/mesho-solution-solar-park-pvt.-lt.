import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/orders': 'Orders',
  '/inventory': 'Inventory',
  '/warranty': 'Warranty',
  '/service-requests': 'Service Requests',
  '/employees': 'Employees',
  '/crm/leads': 'Leads',
  '/crm/follow-ups': 'Follow Ups',
  '/crm/customers': 'Customers',
  '/crm/dealers': 'Dealers',
  '/crm/enquiries': 'Enquiries',
  '/crm/quotations': 'Quotations',
  '/crm/communication': 'Communication History',
  '/cms': 'Website CMS',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/roles': 'Roles & Permissions',
};

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Topbar collapsed={collapsed} title={title} />
      <main
        className="transition-all duration-300 pt-16 p-6"
        style={{ marginLeft: collapsed ? 64 : 240 }}
      >
        {children}
      </main>
    </div>
  );
}
