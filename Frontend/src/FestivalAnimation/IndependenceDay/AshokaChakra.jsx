import React from "react";

/**
 * AshokaChakra
 * ------------
 * The 24-spoke navy-blue wheel at the centre of the white band.
 * Drawn programmatically (not as a raster asset) so it scales perfectly
 * and stays lightweight — a handful of <line> elements rotated in a loop.
 */
export default function AshokaChakra({ cx, cy, r, color = "#08233F" }) {
  const spokes = Array.from({ length: 24 });

  return (
    <g>
      {/* outer + inner rim */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={r * 0.055} />
      <circle cx={cx} cy={cy} r={r * 0.09} fill={color} />

      {/* 24 spokes, 15° apart */}
      {spokes.map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r * 0.92}
            stroke={color}
            strokeWidth={r * 0.045}
            strokeLinecap="round"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
    </g>
  );
}
