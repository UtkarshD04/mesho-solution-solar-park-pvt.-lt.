const THEME = "#033e74";

export default function Topbar({ collapsed, title }) {
  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-30 transition-all duration-300"
      style={{ left: collapsed ? 64 : 240 }}
    >
      <div>
        <h1 className="text-base font-black uppercase tracking-wide text-gray-900">{title}</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Myzo Admin Panel</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#20b2aa] transition"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
        </button>
        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white cursor-pointer" style={{ background: `linear-gradient(135deg, #033e74, #0a5a9e)` }}>
          A
        </div>
      </div>
    </header>
  );
}
