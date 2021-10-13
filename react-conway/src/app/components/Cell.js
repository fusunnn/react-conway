import React from "react";

export default function Cell({ sideLength, deadColor, borderColor, numba }) {
  return (
    <div
      style={{
        height: sideLength,
        width: sideLength,
        backgroundColor: numba === 0 ? deadColor : borderColor,
        border: `1px solid ${borderColor}`,
      }}
    ></div>
  );
}
