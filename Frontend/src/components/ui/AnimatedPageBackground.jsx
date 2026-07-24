import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   Canvas-based animated background:
   • Floating energy particles
   • Connecting circuit lines
   • Pulse rings on particle collisions
   • Slow aurora blob drift
   • Cursor glow spotlight
───────────────────────────────────────────── */

export default function AnimatedPageBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  /* ── Cursor tracking ── */
  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    setMouse({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);
  const onMouseLeave = useCallback(() => setVisible(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  /* ── Canvas particle system ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const COLORS = [
      "rgba(32,178,170,",   // teal
      "rgba(3,105,161,",    // ocean blue
      "rgba(45,212,191,",   // cyan
      "rgba(99,102,241,",   // indigo
      "rgba(20,184,166,",   // teal-600
    ];

    /* resize */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      init();
    };

    /* Particle class */
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 2.2 + 0.8;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const speed = Math.random() * 0.45 + 0.12;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = Math.random() * 0.55 + 0.25;
        this.pulseTimer = 0;
        this.pulseMax = 0;
      }
      pulse(strength = 60) {
        this.pulseTimer = strength;
        this.pulseMax = strength;
      }
      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
        if (this.pulseTimer > 0) this.pulseTimer--;
      }
      draw(ctx) {
        const pulse = this.pulseTimer / Math.max(this.pulseMax, 1);
        const radius = this.r + pulse * 5;
        // glow
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius * 4);
        grd.addColorStop(0, this.color + (this.alpha + pulse * 0.4) + ")");
        grd.addColorStop(1, this.color + "0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // solid dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.min(this.alpha + pulse * 0.3, 1) + ")";
        ctx.fill();
      }
    }

    /* Pulse ring entity */
    const rings = [];
    class Ring {
      constructor(x, y, color) {
        this.x = x; this.y = y;
        this.r = 0; this.alpha = 0.6;
        this.color = color;
        this.speed = 1.4;
      }
      update() { this.r += this.speed; this.alpha -= 0.012; }
      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = this.color + this.alpha + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      get dead() { return this.alpha <= 0; }
    }

    /* Beam / line drawing between close particles */
    function drawLine(ctx, p1, p2, dist, maxDist) {
      const alpha = (1 - dist / maxDist) * 0.22;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      // gradient line
      const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      grd.addColorStop(0, p1.color + alpha + ")");
      grd.addColorStop(1, p2.color + alpha + ")");
      ctx.strokeStyle = grd;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    /* Energy wave */
    let waveOffset = 0;
    function drawEnergyWave(ctx, w, h) {
      const waveCount = 3;
      for (let wi = 0; wi < waveCount; wi++) {
        ctx.beginPath();
        const alpha = 0.04 - wi * 0.01;
        ctx.strokeStyle = `rgba(32,178,170,${alpha})`;
        ctx.lineWidth = 1.5 - wi * 0.4;
        const freq = 0.003 + wi * 0.001;
        const amp = 18 + wi * 8;
        const yBase = h * (0.25 + wi * 0.25);
        for (let x = 0; x <= w; x += 2) {
          const y = yBase + Math.sin(x * freq + waveOffset + wi * 1.4) * amp
                        + Math.cos(x * 0.002 + waveOffset * 0.5 + wi) * (amp * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      waveOffset += 0.006;
    }

    /* Grid hex / circuit pattern (very subtle) */
    function drawCircuitGrid(ctx, w, h) {
      const size = 80;
      ctx.strokeStyle = "rgba(32,178,170,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += size) {
        for (let y = 0; y < h; y += size) {
          // random circuit-like L-shape per cell (seeded by position)
          const seed = ((x * 31 + y * 17) % 7);
          ctx.beginPath();
          if (seed < 3) {
            ctx.moveTo(x, y + size * 0.4);
            ctx.lineTo(x + size * 0.4, y + size * 0.4);
            ctx.lineTo(x + size * 0.4, y);
          } else if (seed < 5) {
            ctx.moveTo(x + size * 0.6, y);
            ctx.lineTo(x + size * 0.6, y + size * 0.6);
            ctx.lineTo(x + size, y + size * 0.6);
          } else {
            ctx.moveTo(x, y + size * 0.7);
            ctx.lineTo(x + size * 0.7, y + size * 0.7);
            ctx.lineTo(x + size * 0.7, y + size);
          }
          ctx.stroke();
        }
      }
    }

    const COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    const MAX_DIST = 140;
    let frameCount = 0;

    function init() {
      particlesRef.current = Array.from({ length: COUNT }, () => new Particle());
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* circuit grid */
      drawCircuitGrid(ctx, w, h);

      /* energy waves */
      drawEnergyWave(ctx, w, h);

      /* update rings */
      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i].update();
        rings[i].draw(ctx);
        if (rings[i].dead) rings.splice(i, 1);
      }

      /* lines */
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            drawLine(ctx, pts[i], pts[j], dist, MAX_DIST);
            /* occasional pulse ring on very close pair */
            if (frameCount % 90 === 0 && dist < 30 && Math.random() < 0.15) {
              rings.push(new Ring(
                (pts[i].x + pts[j].x) / 2,
                (pts[i].y + pts[j].y) / 2,
                pts[i].color
              ));
              pts[i].pulse(40);
              pts[j].pulse(40);
            }
          }
        }
      }

      /* particles */
      for (const p of pts) {
        p.update(w, h);
        p.draw(ctx);
      }

      frameCount++;
      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Canvas layer ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Aurora blobs (CSS animated) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Blob A – teal top-left */}
        <div style={{
          position: "absolute",
          width: "65vw", height: "65vw",
          top: "-20vh", left: "-18vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, rgba(32,178,170,0.22) 0%, rgba(13,148,136,0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
          animation: "apb-aurora1 22s ease-in-out infinite alternate",
        }} />

        {/* Blob B – blue bottom-right */}
        <div style={{
          position: "absolute",
          width: "55vw", height: "55vw",
          bottom: "0vh", right: "-12vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 60% 60%, rgba(3,62,116,0.22) 0%, rgba(3,105,161,0.14) 45%, transparent 72%)",
          filter: "blur(90px)",
          animation: "apb-aurora2 28s ease-in-out infinite alternate",
        }} />

        {/* Blob C – cyan center */}
        <div style={{
          position: "absolute",
          width: "45vw", height: "45vw",
          top: "35vh", left: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(45,212,191,0.14) 0%, rgba(20,184,166,0.08) 55%, transparent 80%)",
          filter: "blur(100px)",
          animation: "apb-aurora3 33s ease-in-out infinite alternate",
        }} />

        {/* Blob D – indigo bottom-left */}
        <div style={{
          position: "absolute",
          width: "38vw", height: "38vw",
          bottom: "10vh", left: "8vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.10) 0%, rgba(79,70,229,0.06) 55%, transparent 80%)",
          filter: "blur(115px)",
          animation: "apb-aurora4 38s ease-in-out infinite alternate",
        }} />

        {/* ── Cursor glow spotlight ── */}
        <div style={{
          position: "fixed",
          width: 560, height: 560,
          top: mouse.y - 280,
          left: mouse.x - 280,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(32,178,170,0.10) 0%, rgba(32,178,170,0.04) 40%, transparent 70%)",
          filter: "blur(10px)",
          opacity: visible ? 1 : 0,
          pointerEvents: "none",
          transition: "top 0.06s linear, left 0.06s linear, opacity 0.35s ease",
          zIndex: 1,
        }} />
        <div style={{
          position: "fixed",
          width: 140, height: 140,
          top: mouse.y - 70,
          left: mouse.x - 70,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(32,178,170,0.16) 0%, rgba(32,178,170,0.06) 50%, transparent 80%)",
          filter: "blur(4px)",
          opacity: visible ? 1 : 0,
          pointerEvents: "none",
          transition: "top 0.03s linear, left 0.03s linear, opacity 0.35s ease",
          zIndex: 1,
        }} />
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes apb-aurora1 {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          25%  { transform: translate(8vw, 12vh) scale(1.12) rotate(10deg); }
          50%  { transform: translate(14vw, -8vh) scale(0.92) rotate(-6deg); }
          75%  { transform: translate(5vw, 18vh) scale(1.08) rotate(5deg); }
          100% { transform: translate(-5vw, 5vh) scale(1.15) rotate(-3deg); }
        }
        @keyframes apb-aurora2 {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          25%  { transform: translate(-12vw, -10vh) scale(1.10) rotate(-12deg); }
          50%  { transform: translate(-6vw, 14vh) scale(0.88) rotate(20deg); }
          75%  { transform: translate(-18vw, 5vh) scale(1.15) rotate(-8deg); }
          100% { transform: translate(5vw, -12vh) scale(0.95) rotate(14deg); }
        }
        @keyframes apb-aurora3 {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          33%  { transform: translate(-10vw, -15vh) scale(1.20) rotate(25deg); }
          66%  { transform: translate(12vw, 10vh) scale(0.84) rotate(-20deg); }
          100% { transform: translate(-5vw, -8vh) scale(1.10) rotate(10deg); }
        }
        @keyframes apb-aurora4 {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          40%  { transform: translate(16vw, 10vh) scale(1.16) rotate(-16deg); }
          80%  { transform: translate(-8vw, -12vh) scale(0.90) rotate(22deg); }
          100% { transform: translate(5vw, 8vh) scale(1.06) rotate(-8deg); }
        }

        /* Floating solar particle effect */
        @keyframes apb-solar-particle {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
      `}</style>
    </>
  );
}
