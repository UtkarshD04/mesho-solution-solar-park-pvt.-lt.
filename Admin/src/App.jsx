import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Warranty from './pages/Warranty';
import ServiceRequests from './pages/ServiceRequests';
import Employees from './pages/Employees';
import CRM from './pages/CRM';
import CMS from './pages/CMS';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Roles from './pages/Roles';

function LoginGuard({ children }) {
  const { isLoggedIn } = useAdmin();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

function ProtectedRoutes() {
  const { isLoggedIn } = useAdmin();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/crm/*" element={<CRM />} />
        <Route path="/crm/leads" element={<CRM title="Leads" />} />
        <Route path="/crm/enquiries" element={<CRM />} />
        <Route path="/crm/dealers" element={<CRM />} />
        <Route path="/crm/customers" element={<CRM />} />
        <Route path="/cms" element={<CMS />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginGuard><Login /></LoginGuard>} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
