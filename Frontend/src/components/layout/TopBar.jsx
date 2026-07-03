export default function TopBar() {
  return (
    <div className="fixed top-0 w-full z-50 bg-[#033e74] border-b border-[#022d55] py-1.5 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm text-white font-medium">

        {/* Vertical Line */}
        <div className="w-px h-4 bg-white/40" />

        {/* Email */}
      
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <span>Lithium Ion Phosphate Battery</span>
          <span className="text-white/40">|</span>
          <span>Power Battery</span>
          <span className="text-white/40">|</span>
          <span>Low Temperature Battery</span>
          <span className="text-white/40">|</span>
          <span>Energy Storage Battery</span>
        </div> 
      </div>
    </div>
  );
}
