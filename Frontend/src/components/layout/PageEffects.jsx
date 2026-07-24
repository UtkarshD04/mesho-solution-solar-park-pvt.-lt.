import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PageLoader({ onComplete, isTransition = false }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const word = "MYZO";

  // Speed depends on whether it's initial load or a fast page transition
  const letterDelay = isTransition ? 120 : 250;
  const totalDuration = word.length * letterDelay + 800;

  useEffect(() => {
    // Reveal letters one by one
    const letterTimers = word.split("").map((_, index) => {
      return setTimeout(() => {
        setVisibleLetters(index + 1);
      }, (index + 1) * letterDelay);
    });

    // After all letters are shown, wait a bit then fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 300); // fade out duration
    }, totalDuration);

    return () => {
      letterTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(fadeTimer);
    };
  }, [letterDelay, totalDuration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft gradient background glow */}
      <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#20b2aa]/8 to-blue-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />

      {/* MYZO Text - Letters appear one by one */}
      <div className="text-center z-10 px-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-[#033e74] tracking-wider flex items-center justify-center gap-1 sm:gap-2">
          {word.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300"
              style={{
                opacity: index < visibleLetters ? 1 : 0,
                transform: index < visibleLetters ? "translateY(0)" : "translateY(20px)",
                filter: index < visibleLetters ? "blur(0px)" : "blur(4px)",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}

export function PageRouteTransition({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top on path changes
  }, [pathname]);

  return (
    <div key={pathname} style={{ animation: "fadeUp 0.35s ease" }}>
      {children}
    </div>
  );
}
