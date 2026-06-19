export default function TopBar() {
  return (
    <div className="fixed top-0 w-full z-50 bg-[#178f88] border-b border-[#147a74] py-1.5 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm text-white font-medium">

        {/* Phone */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href="tel:+919876543210" className="hover:text-white/80 transition-colors">+91 7275565700</a>
        </div>

        {/* Vertical Line */}
        <div className="w-px h-4 bg-white/40" />

        {/* Email */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="aseemmishra@gmail.com" className="hover:text-white/80 transition-colors">aseemmishra82@gmail.com</a>
        </div>
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <span>Lithium iron phosphate battery</span>
          <span className="text-white/40">|</span>
          <span>Power battery</span>
          <span className="text-white/40">|</span>
          <span>low temperature battery</span>
          <span className="text-white/40">|</span>
          <span>Energy storage battery</span>
        </div> 
      </div>
    </div>
  );
}
