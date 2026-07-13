import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [user, setUser]       = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/users/profile`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        const currentUser = data.user || data;
        if (currentUser?._id) { setUser(currentUser); setIsLoggedIn(true); }
      })
      .catch(() => {});
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/users/logout`, {
        credentials: 'include',
      });
    } catch (_) {}
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
        credentials: 'include',
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
      const res = await fetch(fetchUrl, { method: 'POST', credentials: 'include', body: formData });
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
