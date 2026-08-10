import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const ACCENT = "#033e74";
const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

const solutionTiles = [
  {
    title: "Commercial Energy Storage Systems",
    image: "/quality-lab-v3.jpg",
    href: "/products",
    description: "Utility-scale lithium-ion battery containers designed for grid stability, peak shaving, and high-capacity backup.",
    featured: true,
  },
  {
    title: "Commercial PV Systems",
    image: "/commercial-pv.png",
    href: "/products",
    description: "High-yield commercial solar PV systems for business rooftops and solar parks.",
  },
  {
    title: "Residential Energy Storage Systems",
    image: "/residential-bess.png",
    href: "/products",
    description: "Compact wall-mounted home storage with seamless blackout protection.",
  },
  {
    title: "Residential PV Systems",
    image: "/residential-pv.png",
    href: "/products",
    description: "Sleek residential solar arrays engineered for modern homes.",
  },
];

export default function EnergySolutionsSection() {
  const [ref, inView] = useInView(0.05);
  const [featured, ...rest] = solutionTiles;

  return (
    <section className="bg-[#f1f1f1] py-14">
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          Energy Solutions for Every Scale
        </h2>

        {/* Featured banner tile */}
        <Link
          to={featured.href}
          className="rounded-lg bg-white overflow-hidden flex flex-col md:flex-row md:h-48 mb-8 hover:-translate-y-0.5 transition-all duration-700"
          style={{ boxShadow: CARD_SHADOW, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="h-52 md:h-full md:w-[480px] shrink-0 overflow-hidden bg-gray-50">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block self-start rounded-full text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 mb-4" style={{ backgroundColor: ACCENT }}>
              Featured
            </span>
            <h3 className="text-[22px] leading-[28px] font-bold text-gray-900 mb-3">{featured.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{featured.description}</p>
          </div>
        </Link>

        {/* Supporting tiles row */}
        <div className="grid sm:grid-cols-3 gap-8">
          {rest.map((tile, i) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="rounded-lg bg-white overflow-hidden flex flex-col hover:-translate-y-0.5 transition-all duration-700"
              style={{ boxShadow: CARD_SHADOW, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="h-36 overflow-hidden bg-gray-50">
                <img src={tile.image} alt={tile.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-[17px] leading-[23px] font-bold text-gray-900 mb-2">{tile.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tile.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
