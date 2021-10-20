import React from "react";

export default function Cell({
  i,
  j,
  height,
  width,
  aliveColor,
  mainColor,
  status,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}) {
  return (
    <div
      style={{
        height: height,
        width: width,
        backgroundColor: status ? aliveColor : mainColor,
        border: `1px solid rgba(255, 255, 255, .7)`,
        transition: "all .2s ease",
      }}
      onMouseDown={() => onMouseDown(i, j)}
      onMouseUp={() => onMouseUp()}
      onMouseEnter={() => onMouseEnter(i, j)}
    ></div>
  );
}
