const THEME = "#033e74";
const TEAL = "#20b2aa";

export default function Orders() {
  return (
    <div className="space-y-8">

      {/* Section Header */}
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 h-full w-1 rounded-full" style={{ background: TEAL }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: THEME }}>Purchase History</p>
        <h2 className="text-2xl font-black uppercase text-gray-900 tracking-wide">My Orders</h2>
        <p className="text-sm text-gray-400 mt-1">Track and manage your purchases</p>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${THEME}, ${TEAL})` }} />

        {/* Hero image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
            alt="orders"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, white)` }} />
        </div>

        {/* Content */}
        <div className="px-8 pb-12 text-center -mt-8 relative">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: TEAL }}>No Activity Yet</p>
          <h3 className="text-xl font-black uppercase text-gray-900 tracking-wide mb-2">No Orders Yet</h3>
          <div className="w-12 h-[2px] mx-auto mb-4" style={{ background: TEAL }} />
          <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed mb-8">
            You haven't placed any orders yet. Explore our solar products and place your first order.
          </p>

          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${THEME}, #0a5a9e)` }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Browse Products
          </a>
        </div>
      </div>

    </div>
  );
}
