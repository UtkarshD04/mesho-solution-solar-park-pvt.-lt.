import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Warranty from "./pages/Warranty";
import ServiceRequests from "./pages/ServiceRequests";
import Employees from "./pages/Employees";
import CMS from "./pages/CMS";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Roles from "./pages/Roles";

function ProtectedRoutes() {
  const { isLoggedIn } = useAdmin();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/crm/leads" element={<CRM title="Leads" />} />
        <Route path="/crm/follow-ups" element={<CRM title="Follow Ups" />} />
        <Route path="/crm/customers" element={<CRM title="Customers" />} />
        <Route path="/crm/dealers" element={<CRM title="Dealers" />} />
        <Route path="/crm/enquiries" element={<CRM title="Enquiries" />} />
        <Route path="/crm/quotations" element={<CRM title="Quotations" />} />
        <Route path="/crm/communication" element={<CRM title="Communication History" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/cms" element={<CMS />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginGuard />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

function LoginGuard() {
  const { isLoggedIn } = useAdmin();
  if (isLoggedIn) return <Navigate to="/" replace />;
  return <Login />;
}
