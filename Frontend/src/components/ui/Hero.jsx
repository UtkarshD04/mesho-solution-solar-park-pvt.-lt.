import { useState, useEffect } from "react";

const slides = [
  {
    image: "/hero1.jpg",
    title: "Solar Power",
    description: "Harnessing clean solar energy for a sustainable and greener future.",
  },
  {
    image: "/hero2.jpg",
    title: "Energy Solutions",
    description: "Comprehensive energy solutions tailored for homes and businesses.",
  },
  {
    image: "/hero3.jpg",
    title: "Power Backup",
    description: "Reliable lithium-ion backup systems for uninterrupted power supply.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "85vh", marginTop: "88px" }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: "auto", willChange: "auto" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-16 left-10 md:left-20 space-y-3">
            <h2 className="text-white text-3xl md:text-5xl font-bold">{slide.title}</h2>
            <p className="text-white/80 text-sm md:text-base max-w-md">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
