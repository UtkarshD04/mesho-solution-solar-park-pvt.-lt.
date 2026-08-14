import React from "react";
import { motion } from "framer-motion";
import AshokaChakra from "./AshokaChakra";

/**
 * Flag
 * ----
 * Renders the pole + tricolour together so the hoist can be choreographed
 * as one physical system (rope pulls flag up the pole) rather than two
 * unrelated animations happening to share a timeline.
 *
 * Cloth realism comes from an SVG <feTurbulence> + <feDisplacementMap>
 * filter, not from hand-authored keyframes. Turbulence is cheap for the
 * browser to composite, never repeats identically (so it never reads as
 * a looping GIF), and needs almost no code — a good match for "organic,
 * lightweight, not robotic."
 *
 * Props:
 *  - stage: "hidden" | "hoisting" | "flying"  (drives the choreography)
 *  - reduceMotion: bool — collapses to a simple settled flag, no turbulence loop
 */
export default function Flag({ stage, reduceMotion = false }) {
  const POLE_X = 200;
  const POLE_TOP = 40;
  const POLE_BOTTOM = 420;
  const FLAG_TOP_Y = 52; // y of the flag when fully hoisted
  const FLAG_START_Y = 300; // y of the (furled) flag before hoisting begins
  const FLAG_W = 190;
  const FLAG_H = 126; // 2:3 ratio approximation for a compact, elegant proportion

  return (
    <svg
      viewBox="0 0 420 460"
      width="min(78vw, 380px)"
      height="auto"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Organic fabric displacement — subtle, continuous, never identical twice */}
        <filter id="clothWave" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.045"
            numOctaves="2"
            seed="7"
            result="turbulence"
          >
            {!reduceMotion && (
              <animate
                attributeName="baseFrequency"
                dur="7s"
                values="0.010 0.035;0.016 0.05;0.010 0.035"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            {!reduceMotion && (
              <animate
                attributeName="scale"
                dur="5s"
                values="6;10;6"
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
        </filter>

      </defs>

      {/* ---------- POLE ---------- */}
      {/* Faint contact shadow first, so the wood-tone pole reads with weight
          against a pure-white background instead of floating flat on it. */}
      <line
        x1={POLE_X + 3}
        x2={POLE_X + 3}
        y1={POLE_BOTTOM + 4}
        y2={POLE_TOP - 4}
        stroke="#000000"
        strokeOpacity="0.08"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <motion.line
        x1={POLE_X}
        x2={POLE_X}
        y1={POLE_BOTTOM}
        y2={POLE_TOP}
        stroke="#5B4632"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          stage === "hidden"
            ? { pathLength: 0, opacity: 0 }
            : { pathLength: 1, opacity: 1 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* base plate the pole "stands" in */}
      <motion.rect
        x={POLE_X - 14}
        y={POLE_BOTTOM - 2}
        width="28"
        height="8"
        rx="2"
        fill="#5B4632"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "hidden" ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />
      {/* golden finial at the top, settles in just after the pole finishes rising */}
      <motion.circle
        cx={POLE_X}
        cy={POLE_TOP}
        r={5.5}
        fill="#C79A4B"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "hidden" ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />

      {/* ---------- FLAG GROUP (hoisted along the pole) ---------- */}
      <motion.g
        style={{ filter: reduceMotion ? "none" : "url(#clothWave)" }}
        initial={{ y: FLAG_START_Y, opacity: 0, scaleX: 0.55 }}
        animate={
          stage === "hidden"
            ? { y: FLAG_START_Y, opacity: 0, scaleX: 0.55 }
            : stage === "hoisting"
            ? { y: FLAG_TOP_Y, opacity: 1, scaleX: 1 }
            : { y: FLAG_TOP_Y, opacity: 1, scaleX: 1 }
        }
        transition={
          stage === "hoisting" || stage === "flying"
            ? {
                y: { duration: 1.7, ease: [0.16, 0.9, 0.24, 1] }, // slow start, fast middle, soft settle
                opacity: { duration: 0.5 },
                scaleX: { duration: 1.9, ease: [0.34, 1.42, 0.4, 1] }, // gentle unfurl overshoot
              }
            : { duration: 0.4 }
        }
        transformOrigin={`${POLE_X}px ${FLAG_TOP_Y}px`}
      >
        {/* the three bands anchored to the pole on the left edge */}
        <g transform={`translate(${POLE_X + 4}, 0)`}>
          <rect x="0" y="0" width={FLAG_W} height={FLAG_H / 3} fill="#FF9933" />
          <rect x="0" y={FLAG_H / 3} width={FLAG_W} height={FLAG_H / 3} fill="#FFFFFF" />
          <rect x="0" y={(2 * FLAG_H) / 3} width={FLAG_W} height={FLAG_H / 3} fill="#138808" />
          <AshokaChakra
            cx={FLAG_W / 2}
            cy={FLAG_H / 2}
            r={FLAG_H / 8}
            color="#08233F"
          />
        </g>
      </motion.g>
    </svg>
  );
}
