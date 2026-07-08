export default function VisionMissionSection() {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#033e74 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#033e74] text-xs font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 bg-[#e8eef7] border border-[#033e74]/20 rounded-full inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#033e74] animate-pulse" />
                Our Core Purpose
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Shaping the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Sustainable Power</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                We are driven by a singular commitment: to replace inefficient, high-maintenance energy systems with smart, clean lithium technology.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div>
                <h4 className="text-3xl font-extrabold text-slate-900">100%</h4>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Clean Tech Focused</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-[#033e74]">Zero</h4>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Maintenance Hassle</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-teal-400/60 hover:shadow-lg transition-all duration-500">
              <div className="absolute top-0 right-8 w-24 h-24 bg-teal-100/50 rounded-full blur-2xl group-hover:bg-teal-200/60 transition-all duration-500" />
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 text-2xl group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-500 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Our Vision</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                    Leading India toward a smarter, cleaner energy future.
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We envision a world where energy dependency is decentralized, reliable, and ecologically sound. By engineering intelligent, high-density energy storage, we make zero-emission backup possible for every home, business, and utility-scale grid.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-400/60 hover:shadow-lg transition-all duration-500">
              <div className="absolute top-0 right-8 w-24 h-24 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/60 transition-all duration-500" />
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Mission</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                    Delivering power that is reliable, sustainable, and zero-hassle.
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Our mission is to replace high-cost, high-emission, lead-acid inverter systems with advanced, zero-maintenance lithium-ion batteries. We achieve this through precision cell-matching, in-house BMS design, and an unwavering commitment to safe, reliable manufacturing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
