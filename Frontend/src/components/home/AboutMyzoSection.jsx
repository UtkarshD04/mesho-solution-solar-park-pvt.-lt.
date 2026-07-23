import { Link } from "react-router-dom";

export default function AboutMyzoSection({ aboutRef, aboutInView }) {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#e8f4f8] rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div
        ref={aboutRef}
        className={`max-w-[1400px] mx-auto px-8 lg:px-20 grid lg:grid-cols-2 gap-20 items-center transition-all duration-1000 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="relative">
          <div className="absolute -top-4 left-4 w-1.5 h-44 bg-[#20b2aa] rounded-full z-10" />
          <div className="absolute -bottom-4 right-4 w-1.5 h-44 bg-[#20b2aa]/50 rounded-full z-10" />

          <div className="grid grid-cols-2 gap-4 pl-8">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md h-56">
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                  alt="Solar Energy Storage Facility"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-56">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt="Lithium Battery Array"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-[480px] mt-8">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                alt="Myzo Battery Laboratory"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="mt-4 ml-6 inline-flex items-center gap-2">
            <div className="w-6 h-px bg-slate-400" />
            <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.18em]">Myzo Battery — Lucknow, India</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <p className="text-lg font-bold uppercase tracking-[0.2em] text-[#20b2aa] flex items-center gap-3 relative z-10">
            <span className="inline-block w-8 h-[2px] bg-[#20b2aa] rounded-full" />
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight relative z-10">
            Battery Energy Storage<br />
            <span className="text-[#033e74]">Systems (BESS)</span>
          </h2>

          <div className="w-14 h-1 bg-[#20b2aa] rounded-full" />

          <p className="text-slate-600 text-base leading-relaxed relative z-10">
            <strong className="text-slate-800">Myzo Battery</strong> is a Lucknow-based company transforming the power backup industry with advanced lithium-ion battery technology. Our batteries replace traditional inverter systems by offering faster charging, longer lifespan, zero maintenance, and superior energy efficiency.
          </p>
          <p className="text-slate-600 text-base leading-relaxed relative z-10">
            With smart safety features, eco-friendly technology, and compact modern designs, Myzo Battery is committed to building a cleaner and more sustainable energy future — for homes, businesses, and solar energy applications across India.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 relative z-10">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#20b2aa] hover:bg-[#1a948e] text-white text-xs font-bold uppercase tracking-[0.15em] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              About Us
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-[#20b2aa] text-slate-700 hover:text-[#033e74] text-xs font-bold uppercase tracking-[0.15em] px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
