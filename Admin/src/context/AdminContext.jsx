import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/profile`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        if (data.admin) { setAdmin(data.admin); setIsLoggedIn(true); }
        else setIsLoggedIn(false);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const authFetch = async (url, options = {}) => {
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed.');
    return data;
  };

  const login = async (email, password) => {
    const data = await authFetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setAdmin(data.admin);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try { await authFetch('/api/admin/logout', { method: 'POST' }); } catch (_) {}
    setAdmin(null);
    setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{
      admin, isLoggedIn, login, logout, authFetch,
      getDashboardStats: () => authFetch('/api/admin/dashboard/stats'),
      getEnquiries: () => authFetch('/api/admin/enquiries'),
      updateEnquiryStatus: (id, status) => authFetch(`/api/admin/enquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
      getPartners: () => authFetch('/api/admin/partners'),
      updatePartnerStatus: (id, status) => authFetch(`/api/admin/partners/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
      getServiceRequests: () => authFetch('/api/admin/service-requests'),
      updateServiceStatus: (id, status) => authFetch(`/api/admin/service-requests/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
      getLeads: () => authFetch('/api/admin/leads'),
      createLead: (data) => authFetch('/api/admin/leads', { method: 'POST', body: JSON.stringify(data) }),
      updateLead: (id, data) => authFetch(`/api/admin/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      deleteLead: (id) => authFetch(`/api/admin/leads/${id}`, { method: 'DELETE' }),
      getEmployees: () => authFetch('/api/admin/employees'),
      createEmployee: (data) => authFetch('/api/admin/employees', { method: 'POST', body: JSON.stringify(data) }),
      updateEmployee: (id, data) => authFetch(`/api/admin/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      deleteEmployee: (id) => authFetch(`/api/admin/employees/${id}`, { method: 'DELETE' }),
      getUsers: () => authFetch('/api/admin/users'),
      getAllProducts: () => authFetch('/api/products/admin/all'),
      createProduct: (formData) => {
        return fetch(`${API_BASE}/api/products/admin`, {
          method: 'POST', credentials: 'include',
          body: formData,
        }).then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.message || 'Failed'); return d; });
      },
      updateProduct: (id, formData) => {
        return fetch(`${API_BASE}/api/products/admin/${id}`, {
          method: 'PUT', credentials: 'include',
          body: formData,
        }).then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.message || 'Failed'); return d; });
      },
      deleteProduct: (id) => authFetch(`/api/products/admin/${id}`, { method: 'DELETE' }),
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
