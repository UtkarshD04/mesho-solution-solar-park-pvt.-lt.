const THEME = "#033e74";
const TEAL = "#20b2aa";

const ACTIONS = [
  { tab: "orders",   label: "My Orders",   desc: "View and track all your orders",    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { tab: "account",  label: "Edit Profile", desc: "Update your personal information", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  { tab: "password", label: "Security",     desc: "Manage your password & security",  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
];

export default function Dashboard({ user, setActiveTab }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ACTIONS.map(({ tab, label, desc, icon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="bg-white rounded-2xl p-10 text-left shadow-lg border border-gray-100 w-full"
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              style={{ background: "#e8eef7", color: THEME }}
            >
              {icon}
            </div>
            <p className="font-black uppercase text-gray-900 text-base tracking-wide mb-2">{label}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
