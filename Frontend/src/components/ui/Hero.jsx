import { useState } from "react";

const panels = [
  {
    image: "https://media.gettyimages.com/id/1228786679/photo/a-worker-controls-batteries-in-an-electricity-storage-container-on-september-29-2020-in.jpg?s=612x612&w=0&k=20&c=4urkGvcKoTiwkkoN-P7Rt4aTJZz0ywUk03tMIxphPDY=",
    title: "LiFePO4 Battery",
    description: "High-performance lithium iron phosphate batteries for industrial use.",
    cta: "Explore",
  },
  {
    image: "https://media.gettyimages.com/id/2173662786/photo/a-starcharge-energy-pte-energy-storage-system-during-the-international-energy-storage-and.jpg?s=612x612&w=0&k=20&c=KugM9NNJI_dYS0o_2tcnNy3QjeMWU2pwWBWBmFFrTpA=",
    title: "Energy Storage",
    description: "Large scale energy storage solutions for commercial applications.",
    cta: "Discover",
  },
  {
    image: "https://media.gettyimages.com/id/1820451738/photo/lithium-ion-battery-pack-structure-for-electric-vehicles.jpg?s=612x612&w=0&k=20&c=ou_aQH0yXxAaS7OLSXvULJdLR9F_c_7IZX6vJj3J84Y=",
    title: "EV Battery Pack",
    description: "Advanced lithium-ion battery packs for electric vehicles.",
    cta: "Learn More",
  },
  {
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    title: "Power Battery",
    description: "Reliable power batteries engineered for maximum output.",
    cta: "View More",
  },
  {
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
    title: "Low Temp Battery",
    description: "Batteries designed to perform in extreme cold conditions.",
    cta: "See Details",
  },
  {
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    title: "Manufacturing",
    description: "State-of-the-art battery manufacturing facilities.",
    cta: "Visit Us",
  },
];

export default function Hero() {
  const [active, setActive] = useState(null);

  return (
    <div
      className="flex w-full overflow-hidden"
      style={{ height: "85vh", marginTop: "88px" }}
      onMouseLeave={() => setActive(null)}
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          onMouseEnter={() => setActive(i)}
          className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
          style={{ flex: active === i ? "6" : "1" }}
        >
          {/* Background Image */}
          <img
            src={panel.image}
            alt={panel.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
            style={{ transform: active === i ? "scale(1.06)" : "scale(1)" }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{ background: active === i ? "linear-gradient(to top, rgba(3,62,116,0.85) 0%, rgba(0,0,0,0.3) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 100%)" }}
          />

          {/* Vertical title — inactive */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{ opacity: active === i ? 0 : 1 }}
          >
            <span
              className="text-white/90 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {panel.title}
            </span>
          </div>

          {/* Content — active */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="w-8 h-0.5 mb-3 bg-white" />
            <h2 className="text-white font-bold text-xl md:text-2xl mb-2 leading-tight">{panel.title}</h2>
            <p className="text-white/75 text-sm mb-4 leading-relaxed">{panel.description}</p>
            <button
              className="text-xs font-bold tracking-widest uppercase px-5 py-2 border border-white text-white hover:bg-white transition-colors duration-300"
              style={{ letterSpacing: "0.15em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#033e74"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {panel.cta}
            </button>
          </div>

          {/* Top number */}
          <div className="absolute top-4 left-4 text-white/30 text-xs font-bold">
            {String(i + 1).padStart(2, "0")}
          </div>
        </div>
      ))}
    </div>
  );
}
