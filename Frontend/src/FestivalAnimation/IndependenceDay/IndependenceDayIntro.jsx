import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Flag from "./Flag";
import "./IndependenceDayIntro.css";

/**
 * ============================================================================
 * IndependenceDayIntro
 * ============================================================================
 * A one-time, full-screen cinematic opener:
 *
 *   white canvas --> "Happy 80th Independence Day" --> light bridge -->
 *   pole --> flag hoist --> flag holds & breathes --> dissolves into MYZO
 *
 * Design notes:
 *  - Every scene is driven off a single elapsed-time timeline (see PHASE_MS
 *    below) instead of chaining "onComplete" callbacks. That's what makes
 *    scenes OVERLAP instead of playing one-after-another: Scene N+1 is
 *    scheduled to start visibly *before* Scene N has fully faded, so there
 *    is always something bridging the cut (the light sweep, mostly).
 *  - Nothing here plays as a video or GIF — it's Framer Motion + one SVG
 *    turbulence filter (see Flag.jsx) for the cloth movement.
 * ============================================================================
 */

// ---- Public config -----------------------------------------------------
// Flip this to false to retire the campaign without deleting the component.
export const SHOW_INDEPENDENCE_INTRO = true;

// ---- Headline copy --------------------------------------------------------
// Each entry becomes its own <motion.span>, revealed one after another
// (staggerChildren) instead of the whole headline fading in as one block.
const HEADLINE_LINES = [
  { text: "Myzo presents", className: "idi-eyebrow" },
  { text: "Wishing you a very", className: "idi-lead" },
  { text: "80th", className: "idi-number" },
  { text: "Independence Day", className: "idi-title" },
];
const LINE_STAGGER = 0.26; // seconds between each line starting
const LINE_DURATION = 0.62; // seconds each line takes to settle

// ---- Timeline (ms) — tune choreography here, in one place ---------------
// Line reveal adds ~1.6s over a single fade-in, so downstream phases are
// pushed back by roughly that amount to keep every transition overlapping
// rather than waiting on a hard stop.
const PHASE_MS = {
  ambientLightIn: 0, // soft saffron/green atmospheric light begins
  message: 550, // first headline line begins revealing
  bridgeStart: 2510, // headline begins dissolving into the light sweep
  poleIn: 2710, // pole starts rising (overlaps the bridge + message fade)
  hoistStart: 3210, // flag begins climbing the pole
  hold: 4910, // flag has settled at the top, gentle idle wave
  transitionStart: 5610, // flag + intro begin dissolving into the homepage
  done: 6700, // overlay unmounts, scroll restored
};

// Shortened, simplified path when the user prefers reduced motion.
const REDUCED_PHASE_MS = {
  ambientLightIn: 0,
  message: 150,
  bridgeStart: 1000,
  poleIn: 1050,
  hoistStart: 1050,
  hold: 1600,
  transitionStart: 1800,
  done: 2300,
};

export default function IndependenceDayIntro({ onFinish }) {
  // Plays on every full page load/refresh — no once-per-session gating.
  const shouldPlay = SHOW_INDEPENDENCE_INTRO;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const timeline = prefersReducedMotion ? REDUCED_PHASE_MS : PHASE_MS;

  // Individual scene flags rather than one big enum — this is what lets
  // several scenes be "on" at once (overlap) instead of a strict switch.
  const [showMessage, setShowMessage] = useState(false);
  const [messageFading, setMessageFading] = useState(false);
  const [showBridge, setShowBridge] = useState(false);
  const [flagStage, setFlagStage] = useState("hidden"); // hidden -> hoisting -> flying
  const [showHomepage, setShowHomepage] = useState(false);
  const [visible, setVisible] = useState(shouldPlay);

  const timers = useRef([]);

  useEffect(() => {
    if (!shouldPlay) {
      onFinish?.();
      return;
    }

    // --- Scroll lock while the intro plays ---
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const schedule = (fn, ms) => timers.current.push(setTimeout(fn, ms));

    schedule(() => setShowMessage(true), timeline.message);
    schedule(() => setMessageFading(true), timeline.bridgeStart);
    schedule(() => setShowBridge(true), timeline.bridgeStart);
    schedule(() => setFlagStage("hoisting"), timeline.poleIn);
    schedule(() => setFlagStage("flying"), timeline.hold);
    schedule(() => setShowHomepage(true), timeline.transitionStart);
    schedule(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow || "";
      onFinish?.();
    }, timeline.done);

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = previousOverflow || "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="idi-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: showHomepage ? 0 : 1 }}
      transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1], delay: showHomepage ? 0.35 : 0 }}
      style={{ pointerEvents: showHomepage ? "none" : "auto" }}
    >
      {/* SCENE 1 — ambient saffron / sea-green atmosphere on white */}
      <div className="idi-ambient" aria-hidden="true">
        <div className="idi-glow idi-glow--saffron" />
        <div className="idi-glow idi-glow--green" />
      </div>

      {/* SCENE 3 — the light bridge that carries the eye from text to flag */}
      {showBridge && (
        <motion.div
          className="idi-bridge"
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: [0, 1, 0], scaleX: [0.2, 1.15, 1] }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}

      {/* SCENE 2 — the headline, revealed one line at a time */}
      {showMessage && (
        // Outer element owns the exit: once the light bridge takes over,
        // the whole headline dissolves together rather than line-by-line —
        // staggering only reads as "premium" on the way in, not the way out.
        <motion.div
          className="idi-message"
          initial={{ opacity: 1 }}
          animate={
            messageFading
              ? { opacity: 0, y: -18, scale: 1.02, filter: "blur(6px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={{
            duration: messageFading ? 1.1 : 0.3,
            ease: messageFading ? [0.4, 0, 1, 1] : "linear",
          }}
        >
          {/* Inner element owns the entrance stagger */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: LINE_STAGGER } },
            }}
          >
            {HEADLINE_LINES.map((line) => (
              <motion.span
                key={line.text}
                className={line.className}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.97, filter: "blur(6px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: LINE_DURATION, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {line.text}
              </motion.span>
            ))}
            {/* thin tricolour rule, draws in only after the last line settles */}
            <motion.span
              className="idi-rule"
              variants={{
                hidden: { width: "0%" },
                visible: {
                  width: "56%",
                  transition: {
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: HEADLINE_LINES.length * LINE_STAGGER + 0.15,
                  },
                },
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* SCENES 4–6 — pole, hoist, and the flag settling in to wave */}
      <div className="idi-flag-wrap">
        <Flag stage={flagStage} reduceMotion={prefersReducedMotion} />
      </div>
    </motion.div>
  );
}
