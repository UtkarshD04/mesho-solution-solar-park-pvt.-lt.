export default function TopBar() {
  return (
    <div className="hidden lg:block fixed top-0 w-full z-50 bg-[#011d37] border-b border-[#20b2aa]/25 h-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center gap-6 text-xs font-medium">
        <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
          <svg className="w-4 h-4 text-[#20b2aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Lithium Ion Phosphate Battery</span>
        </div>
        
        <span className="text-[#20b2aa]/40">|</span>
        
        <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
          <svg className="w-4 h-4 text-[#20b2aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
          <span>Power Battery</span>
        </div>
        
        <span className="text-[#20b2aa]/40">|</span>
        
        <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
          <svg className="w-4 h-4 text-[#20b2aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
          <span>Low Temperature Battery</span>
        </div>
        
        <span className="text-[#20b2aa]/40">|</span>
        
        <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
          <svg className="w-4 h-4 text-[#20b2aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Energy Storage Battery</span>
        </div>
      </div>
    </div>
  );
}