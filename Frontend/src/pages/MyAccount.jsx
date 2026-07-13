import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/account/Dashboard";
import AccountDetails from "../components/account/AccountDetails";
import ChangePassword from "../components/account/ChangePassword";
import Orders from "../components/account/Orders";

const THEME = "#033e74";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

const NAV_ITEMS = [
  {
    key: "dashboard", label: "Dashboard",
    icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg>
  },
  {
    key: "orders", label: "My Orders",
    icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  },
  {
    key: "account", label: "Account Details",
    icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  },
  {
    key: "password", label: "Change Password",
    icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
  },
];

export default function MyAccount() {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) { navigate("/"); return; }
    fetch(`${API_BASE}/users/profile`, {
      headers: {},
      credentials: "include",
    }).then(r => r.json()).then(setUser).catch(() => {});
  }, [isLoggedIn]);

  const handleLogout = async () => { await logout(); navigate("/"); };

  const initials = `${user?.fullname?.firstname?.[0] ?? ""}${user?.fullname?.lastname?.[0] ?? ""}`.toUpperCase() || "U";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard user={user} setActiveTab={setActiveTab} />;
      case "orders":    return <Orders />;
      case "account":   return <AccountDetails user={user} setUser={setUser} />;
      case "password":  return <ChangePassword />;
      default:          return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative min-h-[45vh] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80"
          alt="My Account"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto pt-24 pb-12">
          <h1 className="text-5xl sm:text-6xl font-black uppercase leading-tight mb-4">My Account</h1>
          <div className="w-16 h-[3px] mx-auto mb-4" style={{ background: TEAL }} />
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Manage your profile, orders, and account settings.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="flex gap-8 items-start">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-5">

            {/* Nav */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">My Account</p>
              </div>
              <div className="p-2">
                {NAV_ITEMS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200 mb-0.5 ${
                      activeTab === key
                        ? "text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    style={activeTab === key ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
                <div className="h-px bg-gray-100 my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>


          </aside>

          {/* ── Mobile top bar ── */}
          <div className="lg:hidden w-full mb-4">
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
              <p className="text-sm font-black uppercase tracking-wide text-gray-900">My Account</p>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl bg-gray-50 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
            {mobileOpen && (
              <div className="mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                {NAV_ITEMS.map(({ key, label, icon }) => (
                  <button key={key} onClick={() => { setActiveTab(key); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition mb-0.5 ${activeTab === key ? "text-white" : "text-gray-500 hover:bg-gray-50"}`}
                    style={activeTab === key ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` } : {}}>
                    {icon}{label}
                  </button>
                ))}
                <div className="h-px bg-gray-100 my-2" />
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide text-red-400 hover:bg-red-50">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
