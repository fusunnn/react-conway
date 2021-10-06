import React from "react";

export default function Cell({ sideLength, cellColor }) {
  return (
    <div
      style={{
        height: sideLength,
        width: sideLength,
        borderWidth: 100,
        backgroundColor: cellColor,
        borderColor: "blue",
      }}
    ></div>
  );
}
