import useInView from "../../hooks/useInView";

const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

const purpose = [
  {
    num: "01",
    accent: "#20b2aa",
    eyebrow: "Our Vision",
    title: "Leading India to a Smarter Energy Era",
    body: [
      "We envision an India where reliable, clean electricity is not a privilege — it is a right. By building intelligent, high-density lithium-ion storage at every level of the energy pyramid, Myzo is making a future where blackouts are extinct and every kilowatt-hour comes from the sun.",
      "That means decentralized clean energy accessible to every home, zero-emission backup replacing every diesel generator, and smart grid-ready storage from rooftop to utility scale.",
    ],
  },
  {
    num: "02",
    accent: "#033e74",
    eyebrow: "Our Mission",
    title: "Replace Lead-Acid with Intelligent Lithium",
    body: [
      "Our mission is precise: make advanced lithium-ion energy storage affordable, accessible, and maintainable for every tier of the Indian market. We engineer our batteries in-house — from cell selection to BMS firmware — so quality is never compromised.",
      "That includes in-house BMS firmware with Kalman filter SoC accuracy, precision cell-matching at ±0.5 mV pack tolerance, and end-to-end quality from cell welding to cloud telemetry.",
    ],
  },
];

function PurposeCard({ num, accent, eyebrow, title, body, inView, delay }) {
  return (
    <div
      className="rounded-lg bg-white overflow-hidden flex flex-col transition-all duration-700"
      style={{ boxShadow: CARD_SHADOW, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transitionDelay: delay }}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
      <div className="p-8 md:p-10 flex flex-col flex-1">
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-4xl font-black leading-none select-none" style={{ color: accent, opacity: 0.18 }}>{num}</span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: accent }}>{eyebrow}</span>
        </div>
        <h3 className="text-[22px] leading-[30px] md:text-[26px] md:leading-[34px] font-bold text-gray-900 mb-5">
          {title}
        </h3>
        <div className="h-0.5 w-14 rounded-full mb-5" style={{ backgroundColor: accent }} />
        {body.map((p, i) => (
          <p key={i} className={`text-gray-600 text-sm leading-relaxed ${i < body.length - 1 ? "mb-4" : ""}`}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function CorePurposeSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="bg-white py-14">
      <div ref={ref} className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          Our Core Purpose
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {purpose.map((p, i) => (
            <PurposeCard key={p.num} {...p} inView={inView} delay={`${i * 150}ms`} />
          ))}
        </div>
      </div>
    </section>
  );
}
