import React from "react";

export default function Cell({ sideLength, deadColor, borderColor, numba }) {
  return (
    <div
      style={{
        height: sideLength + "vh",
        width: sideLength + "vh",
        backgroundColor: numba === 0 ? deadColor : borderColor,
        border: `1px solid ${borderColor}`,
      }}
    ></div>
  );
}
