import React from "react";

export default function Cell({ sideLength, aliveColor, mainColor, status }) {
  return (
    <div
      style={{
        height: sideLength + "vh",
        width: sideLength + "vh",
        backgroundColor: status ? aliveColor : mainColor,
        border: `1px solid ${mainColor}`,
      }}
    ></div>
  );
}
