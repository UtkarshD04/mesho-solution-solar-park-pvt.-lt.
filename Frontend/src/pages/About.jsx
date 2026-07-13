import VisionMissionSection from '../components/home/VisionMissionSection';

const stats = [
  { value: '2015', label: 'Founded' },
  { value: '500+', label: 'MW Installed' },
  { value: '200+', label: 'Projects Done' },
  { value: '14+', label: 'Years Leadership' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto pt-20">
          {/* India's First Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#20b2aa] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white">
              India's First Battery Energy Storage System
            </span>
            <span className="w-2 h-2 rounded-full bg-[#20b2aa] animate-pulse" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Our Story</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight mb-5">
            About Us
          </h1>
          <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
            A decade of driving India's clean energy revolution through innovation, expertise and commitment.
          </p>
        </div>
      </section>



      {/* INDIA'S FIRST BESS HEADING */}
      <div className="bg-white py-10 text-center border-b border-gray-100">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033e74] uppercase leading-tight tracking-tight">
          India's First
        </h2>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight mt-1" style={{ color: '#20b2aa' }}>
          Battery Energy Storage System
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[2px] w-16 bg-[#20b2aa] rounded-full" />
          <span className="w-2 h-2 rounded-full bg-[#033e74]" />
          <div className="h-[2px] w-16 bg-[#033e74] rounded-full" />
        </div>
      </div>

      {/* COMPANY BRIEFING — right image, left text */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Left — Text */}
          <div className="relative pl-6 sm:pl-8">
            <div className="absolute left-0 top-2 h-[88%] w-1 rounded-full bg-[#20b2aa]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#033e74] mb-3">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight mb-6">
              Mesho Solution<br />Solar Park Pvt. Ltd.
            </h2>
            <div className="w-24 h-[2px] bg-[#20b2aa] mb-6" />
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              <strong className="text-gray-900">MESHO SOLUTION SOLAR PARK PVT. LTD. (Myzo)</strong> was founded in 2015 and is a dynamic and forward-thinking energy solutions company committed to driving innovation in the renewable energy and energy storage sector.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              With a strong focus on advanced BESS (Energy Battery Storage Systems) battery technologies, sustainable power solutions, and customer-centric services, the company delivers reliable and high-performance products tailored to evolving market needs.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Backed by a dedicated team and a vision for a greener future, Myzo continuously invests in technology, quality, and operational excellence. Through its commitment to innovation, productivity, and sustainability, the company aims to empower businesses and communities with efficient energy solutions while building a strong presence across domestic and international markets.
            </p>
          </div>

          {/* Right — Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1680169291906-ce51dad35dc7?w=900&q=80"
              alt="BESS Battery"
              className="rounded-2xl w-full h-[420px] object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-[#033e74] rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-white text-center">
                <p className="text-2xl font-black">10+</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold leading-tight">Years of<br/>Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER SECTION — left image, right speech */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* Left — Owner Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                alt="Mr. Aseem Mishra"
                className="rounded-2xl w-80 h-[420px] object-cover shadow-xl"
              />
              {/* Name card */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#033e74] text-white px-6 py-3 rounded-xl shadow-lg text-center whitespace-nowrap">
                <p className="font-black text-sm uppercase">Mr. Aseem Mishra</p>
                <p className="text-[10px] text-white/70 mt-0.5 uppercase tracking-wider">Business Head, Myzo</p>
              </div>
            </div>
          </div>

          {/* Right — Speech */}
          <div className="relative pt-8 md:pt-0 pl-6 sm:pl-8">
            <div className="absolute left-0 top-2 h-[88%] w-1 rounded-full bg-[#20b2aa]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#033e74] mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight mb-6">
              Message from<br />Our Business Head
            </h2>
            <div className="w-24 h-[2px] bg-[#20b2aa] mb-6" />

            <div className="text-[#20b2aa] text-6xl font-black leading-none mb-2 opacity-30 select-none">"</div>

            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Mr. Aseem Mishra, Business Head of Myzo, brings over <strong className="text-gray-900">14 years of extensive experience</strong> in the renewable energy industry. With a strong background in product development, manufacturing, and strategic business growth, he has established himself as a respected leader in the field.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Under his leadership, Myzo Battery is committed to delivering innovative, high-performance lithium-ion battery solutions for BESS (Energy Battery Storage Systems) energy storage systems, and industrial applications. His deep industry expertise, customer-centric approach, and focus on operational excellence drive the company's mission to create reliable, efficient, and sustainable energy solutions.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Through his strategic vision and commitment to innovation, Mr. Mishra continues to position Myzo at the forefront of the clean energy revolution, fostering long-term growth, technological advancement, and exceptional value for customers and stakeholders alike.
            </p>

            <div className="mt-8 flex items-center gap-4 border-l-2 border-[#20b2aa] pl-4">
              <div>
                <p className="font-black text-gray-900 text-sm uppercase">Mr. Aseem Mishra</p>
                <p className="text-[#033e74] text-xs font-semibold">Business Head — Myzo </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <VisionMissionSection />

      {/* CTA */}
      <section className="py-20 bg-[#033e74] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-4">Ready to Partner With Us?</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Join hundreds of businesses that trust Mesho Solution for their energy needs.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#033e74] hover:bg-gray-100 font-black uppercase tracking-wider px-10 py-4 rounded-lg text-sm inline-block transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>

    </div>
  )
}
