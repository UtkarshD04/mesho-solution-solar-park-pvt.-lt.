import { useEffect, useRef } from "react";

/**
 * SilkFlowBackground — Pure Canvas Silk Ribbon Effect
 * Flowing silk-like color ribbons gently undulate across the page.
 * Theme colors: teal (#20b2aa), deep blue (#033e74), cyan (#2dd4bf), indigo (#6366f1)
 */
export default function SilkFlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Silk ribbon definitions — each flows at a different y-band, speed, amplitude, and color
    const silks = [
      { yRatio: 0.10, speed: 0.00045, amp: 0.07, freq: 0.55, phase: 0.0,            c1: [32,178,170], c2: [20,184,166], alpha: 0.18 },
      { yRatio: 0.28, speed: 0.00032, amp: 0.09, freq: 0.40, phase: Math.PI * 0.7,  c1: [3,62,116],   c2: [3,105,161],  alpha: 0.14 },
      { yRatio: 0.45, speed: 0.00060, amp: 0.06, freq: 0.70, phase: Math.PI * 1.3,  c1: [45,212,191], c2: [32,178,170], alpha: 0.11 },
      { yRatio: 0.62, speed: 0.00038, amp: 0.11, freq: 0.38, phase: Math.PI * 0.4,  c1: [99,102,241], c2: [79,70,229],  alpha: 0.08 },
      { yRatio: 0.78, speed: 0.00050, amp: 0.08, freq: 0.60, phase: Math.PI * 1.8,  c1: [32,178,170], c2: [2,132,199],  alpha: 0.13 },
      { yRatio: 0.92, speed: 0.00028, amp: 0.05, freq: 0.45, phase: Math.PI * 0.9,  c1: [3,62,116],   c2: [20,184,166], alpha: 0.09 },
    ];

    const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const t = frame;

      ctx.clearRect(0, 0, W, H);

      for (const s of silks) {
        const yCenter = H * s.yRatio;
        const thickness = H * 0.22; // vertical thickness of each ribbon
        const SEGS = 80;

        // Build wave points along the ribbon center line
        const pts = [];
        for (let i = 0; i <= SEGS; i++) {
          const x = (W * i) / SEGS;
          // Composite of two sine waves for organic flow
          const y = yCenter
            + Math.sin(i * s.freq * 0.08 + t * s.speed * 10000) * H * s.amp
            + Math.sin(i * s.freq * 0.04 + t * s.speed * 5500 + s.phase) * H * s.amp * 0.5;
          pts.push({ x, y });
        }

        // ── Draw ribbon top half → bottom half with closed path ──
        ctx.beginPath();

        // Top edge (ribbon center - half thickness)
        ctx.moveTo(pts[0].x, pts[0].y - thickness / 2);
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          ctx.quadraticCurveTo(
            p0.x, p0.y - thickness / 2,
            (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 - thickness / 2
          );
        }

        // Right cap
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y + thickness / 2);

        // Bottom edge (ribbon center + half thickness, reversed)
        for (let i = pts.length - 1; i >= 1; i--) {
          const p0 = pts[i];
          const p1 = pts[i - 1];
          ctx.quadraticCurveTo(
            p0.x, p0.y + thickness / 2,
            (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 + thickness / 2
          );
        }
        ctx.closePath();

        // Vertical gradient: transparent → color → transparent (silk sheen)
        const grad = ctx.createLinearGradient(0, yCenter - thickness, 0, yCenter + thickness);
        grad.addColorStop(0.00, rgba(s.c1, 0));
        grad.addColorStop(0.25, rgba(s.c1, s.alpha * 0.7));
        grad.addColorStop(0.50, rgba(s.c2, s.alpha));
        grad.addColorStop(0.75, rgba(s.c1, s.alpha * 0.7));
        grad.addColorStop(1.00, rgba(s.c1, 0));

        ctx.fillStyle = grad;
        ctx.fill();

        // ── Inner sheen line — gives silk the "light catching" highlight ──
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
        }
        ctx.strokeStyle = rgba(s.c2, s.alpha * 0.45);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        filter: "blur(18px)",   // soft silk blur — makes ribbons look like fabric not lines
        opacity: 0.9,
      }}
    />
  );
}
