import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [user, setUser]       = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsLoggedIn(true);
    fetch(`${API_BASE}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => { if (data.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/users/logout`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (_) {}
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  // ── Generic POST helper ────────────────────────────────────────────────────
  async function postJSON(url, data) {
    setLoading(true);
    setError(null);
    try {
      const fetchUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
      const res = await fetch(fetchUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Something went wrong.');
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ── Multipart POST helper (for file uploads) ───────────────────────────────
  async function postFormData(url, formData) {
    setLoading(true);
    setError(null);
    try {
      const fetchUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
      const res = await fetch(fetchUrl, { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Something went wrong.');
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ── Form submission functions ──────────────────────────────────────────────
  const submitProductEnquiry = (data) =>
    postJSON('/api/forms/product-enquiry', data);

  const submitBecomePartner = (data) =>
    postJSON('/api/forms/become-partner', data);

  const submitAfterSales = (data, invoiceFile) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    if (invoiceFile) fd.append('invoice', invoiceFile);
    return postFormData('/api/forms/after-sales', fd);
  };

  return (
    <UserContext.Provider value={{ loading, error, user, isLoggedIn, login, logout, submitProductEnquiry, submitBecomePartner, submitAfterSales }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
