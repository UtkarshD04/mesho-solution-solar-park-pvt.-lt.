import { useState, useCallback, useEffect } from "react";

export default function AuroraMeshSpotlight() {
  const [mouse, setMouse] = useState({ x: -99999, y: -99999 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    // pageX/pageY = document-relative coords — works correctly with absolute positioning
    setMouse({ x: e.pageX, y: e.pageY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ════════════════════════════════════════
          LAYER 1 ─ AURORA (Slow Floating Blobs)
          ════════════════════════════════════════ */}

      {/* Aurora Blob A — large teal top-left */}
      <div className="absolute rounded-full"
        style={{
          width: "70vw", height: "70vw",
          top: "-25vh", left: "-20vw",
          background: "radial-gradient(circle at 40% 40%, rgba(32,178,170,0.30) 0%, rgba(13,148,136,0.18) 40%, transparent 70%)",
          filter: "blur(70px)",
          animation: "aurora1 20s ease-in-out infinite alternate",
        }}
      />

      {/* Aurora Blob B — deep blue bottom-right */}
      <div className="absolute rounded-full"
        style={{
          width: "60vw", height: "60vw",
          bottom: "5vh", right: "-15vw",
          background: "radial-gradient(circle at 60% 60%, rgba(3,62,116,0.28) 0%, rgba(3,105,161,0.18) 45%, transparent 72%)",
          filter: "blur(85px)",
          animation: "aurora2 25s ease-in-out infinite alternate",
        }}
      />

      {/* Aurora Blob C — teal-cyan midscreen */}
      <div className="absolute rounded-full"
        style={{
          width: "50vw", height: "50vw",
          top: "30vh", left: "28vw",
          background: "radial-gradient(circle at 50% 50%, rgba(45,212,191,0.18) 0%, rgba(20,184,166,0.10) 55%, transparent 80%)",
          filter: "blur(95px)",
          animation: "aurora3 28s ease-in-out infinite alternate",
        }}
      />

      {/* Aurora Blob D — indigo accent bottom-left */}
      <div className="absolute rounded-full"
        style={{
          width: "42vw", height: "42vw",
          bottom: "-8vh", left: "10vw",
          background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(79,70,229,0.07) 55%, transparent 80%)",
          filter: "blur(110px)",
          animation: "aurora4 32s ease-in-out infinite alternate",
        }}
      />

      {/* ════════════════════════════════════════
          LAYER 2 ─ MESH GRADIENT (Static grid of color nodes)
          ════════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 50% 35% at 15% 20%, rgba(32,178,170,0.14) 0%, transparent 100%),
            radial-gradient(ellipse 40% 30% at 85% 12%, rgba(3,62,116,0.12) 0%, transparent 100%),
            radial-gradient(ellipse 45% 40% at 50% 50%, rgba(20,184,166,0.08) 0%, transparent 100%),
            radial-gradient(ellipse 35% 30% at 75% 80%, rgba(3,105,161,0.11) 0%, transparent 100%),
            radial-gradient(ellipse 40% 35% at 20% 75%, rgba(99,102,241,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 50% 25% at 90% 50%, rgba(45,212,191,0.09) 0%, transparent 100%),
            radial-gradient(ellipse 30% 40% at 5% 50%,  rgba(32,178,170,0.08) 0%, transparent 100%)
          `,
        }}
      />

      {/* Mesh dot grid overlay (SVG pattern) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <defs>
          <pattern id="mesh-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.2" fill="#033e74" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh-dots)" />
      </svg>

      {/* ════════════════════════════════════════
          LAYER 3 ─ CURSOR SPOTLIGHT
          ════════════════════════════════════════ */}
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: "520px",
          height: "520px",
          top: mouse.y - 260,
          left: mouse.x - 260,
          background: "radial-gradient(circle at center, rgba(32,178,170,0.09) 0%, rgba(32,178,170,0.04) 40%, transparent 70%)",
          filter: "blur(8px)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: "none",
          willChange: "top, left",
          transition: "top 0.08s linear, left 0.08s linear, opacity 0.4s ease",
        }}
      />

      {/* Tighter inner spotlight core */}
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: "160px",
          height: "160px",
          top: mouse.y - 80,
          left: mouse.x - 80,
          background: "radial-gradient(circle at center, rgba(32,178,170,0.13) 0%, rgba(32,178,170,0.06) 45%, transparent 75%)",
          filter: "blur(4px)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: "none",
          willChange: "top, left",
          transition: "top 0.04s linear, left 0.04s linear, opacity 0.4s ease",
        }}
      />

      {/* ════════════════════════════════════════
          AURORA KEYFRAME ANIMATIONS
          ════════════════════════════════════════ */}
      <style>{`
        @keyframes aurora1 {
          0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
          25%  { transform: translate(10vw, 14vh) scale(1.14) rotate(12deg); }
          50%  { transform: translate(16vw, -10vh) scale(0.9) rotate(-8deg); }
          75%  { transform: translate(6vw, 20vh) scale(1.1) rotate(6deg); }
          100% { transform: translate(-6vw, 6vh) scale(1.18) rotate(-4deg); }
        }
        @keyframes aurora2 {
          0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
          25%  { transform: translate(-14vw, -12vh) scale(1.12) rotate(-14deg); }
          50%  { transform: translate(-8vw, 16vh) scale(0.88) rotate(22deg); }
          75%  { transform: translate(-20vw, 6vh) scale(1.18) rotate(-9deg); }
          100% { transform: translate(6vw, -14vh) scale(0.93) rotate(16deg); }
        }
        @keyframes aurora3 {
          0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
          33%  { transform: translate(-12vw, -18vh) scale(1.22) rotate(28deg); }
          66%  { transform: translate(14vw, 12vh) scale(0.82) rotate(-22deg); }
          100% { transform: translate(-6vw, -10vh) scale(1.12) rotate(12deg); }
        }
        @keyframes aurora4 {
          0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
          40%  { transform: translate(18vw, 12vh) scale(1.18) rotate(-18deg); }
          80%  { transform: translate(-10vw, -14vh) scale(0.88) rotate(24deg); }
          100% { transform: translate(6vw, 10vh) scale(1.08) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}
