import React from "react";

function RandomData() {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });
  return data;
}

function Scatter() {
  const data = RandomData();
  const w = 600;
  const h = 600;
  const margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  };

  const width = w - margin.right - margin.left;
  const height = h - margin.top - margin.bottom;

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}></g>
      </svg>
    </div>
  );
}

export default Scatter;
