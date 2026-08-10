import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";

const ACCENT = "#033e74";

export default function WhyChooseSection({ whyChooseData }) {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="bg-white py-20">
      <div ref={ref} className="max-w-[1220px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[340px_1fr] gap-14">
        <div
          className="lg:sticky lg:top-32 lg:self-start transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
            Why Myzo
          </span>
          <h2 className="text-[30px] leading-[36px] md:text-[36px] md:leading-[42px] font-bold text-gray-900 mb-4">
            Why Choose Myzo Battery?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Six reasons homes and businesses across India are replacing lead-acid backup with Myzo lithium-ion systems.
          </p>
          <Link
            to="/products"
            className="inline-block font-bold rounded px-6 py-3 border-2 transition-colors w-fit"
            style={{ backgroundColor: ACCENT, borderColor: ACCENT, color: "#fff" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = "#fff"; }}
          >
            See All Products
          </Link>
        </div>

        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {whyChooseData.map((item, i) => (
            <div
              key={item.title}
              className="py-7 flex gap-5 items-start transition-all duration-700"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <span className="hidden sm:block text-3xl font-black text-gray-100 shrink-0 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
