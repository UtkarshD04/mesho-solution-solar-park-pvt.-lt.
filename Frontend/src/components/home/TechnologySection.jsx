export default function TechnologySection({ techRef, techInView }) {
  return (
    <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#033e74]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#20b2aa]/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative space-y-8">
        <div
          ref={techRef}
          className={`max-w-2xl mx-auto text-center space-y-4 transition-all duration-1000 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-[#20b2aa] text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#20b2aa]" /> Technology Focus <span className="w-8 h-px bg-[#20b2aa]" />
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">The LFP Powerhouse Advantage</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We pack every storage solution with industrial-grade fail-safes, active balancing BMS chips, and custom busbar assembly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>),
              color: "text-[#20b2aa] bg-[#20b2aa]/10 border-[#20b2aa]/30",
              title: "3-Tier Smart Active BMS",
              desc: "Monitors single cell voltage, temperature, and internal resistance. Balances cells actively up to 2A, mitigating risk of thermal runaway and balancing capacity degradation dynamically.",
            },
            {
              icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>),
              color: "text-sky-400 bg-sky-400/10 border-sky-400/30",
              title: "Grade-A LFP Chemistry",
              desc: "Utilizing strictly Grade-A cells from certified tier-1 manufacturers. Inherent chemical stability yields up to 6000 cycles at 80% Depth of Discharge without losing structural integrity.",
            },
            {
              icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>),
              color: "text-violet-400 bg-violet-400/10 border-violet-400/30",
              title: "Pre-Integrated Thermal Plates",
              desc: "Specialized heating modules enable stable charging/discharging down to -35°C. Optimized cooling channels support high c-rate loads during high ambient temperature up to 55°C.",
            },
          ].map((t, i) => (
            <div
              key={t.title}
              className={`p-8 bg-white/[0.04] border border-white/10 rounded-3xl space-y-4 hover:bg-white/[0.08] transition-all duration-500 group cursor-default ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms`, transitionDuration: "700ms" }}
            >
              <div className={`w-11 h-11 rounded-xl border ${t.color} flex items-center justify-center transition-all duration-300`}>
                {t.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{t.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>

        <div
          className={`bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#20b2aa]/30 hover:bg-white/[0.07] transition-all duration-500 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms", transitionDuration: "700ms" }}
        >
          <div className="space-y-2">
            <h4 className="text-base font-bold text-white">System Architecture & Communications</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
              Every BESS system links via CAN/RS485/Modbus protocol, transmitting cell telemetry directly to local SCADA controls or remote IoT cloud analytics.
            </p>
          </div>
          <div className="flex gap-2 shrink-0 flex-wrap justify-center">
            {['Modbus TCP', 'CANbus', 'IoT Cloud', 'RS485'].map((label, i) => (
              <span
                key={label}
                className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[#20b2aa] hover:border-[#20b2aa]/50 hover:text-white transition-all duration-300 cursor-default hover:scale-105"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
